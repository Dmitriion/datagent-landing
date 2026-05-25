#!/usr/bin/env bash
# Dev-сервер лендинга для Cursor Cloud Agent / Cloud Desktop Environment.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${LANDING_PORT:-8080}"
CONF="${ROOT}/docker/nginx.dev.conf"
PID_FILE="/tmp/datagent-nginx.pid"
MODE="${1:-start}"

ensure_dirs() {
  mkdir -p /tmp/nginx-body /tmp/nginx-proxy /tmp/nginx-fastcgi /tmp/nginx-uwsgi /tmp/nginx-scgi
}

ensure_nginx() {
  if ! command -v nginx >/dev/null 2>&1; then
    sudo apt-get update -qq
    sudo apt-get install -y -qq nginx
  fi
  chmod +x "${ROOT}/scripts/test-env.sh" 2>/dev/null || true
}

is_running() {
  ss -tln 2>/dev/null | grep -q ":${PORT} " && return 0
  [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null
}

print_urls() {
  echo "=== Datagent landing (dev) ==="
  echo "port=${PORT}"
  if [ -d "${ROOT}/.git" ]; then
    echo "revision=$(git -C "${ROOT}" log -1 --format='%h %s' 2>/dev/null || echo unknown)"
  fi
  echo "url_local=http://127.0.0.1:${PORT}/"
  echo "refresh: ./scripts/cloud-dev-refresh.sh"
  echo "browser: ./scripts/open-cloud-browser.sh"
  echo "Cursor: Ports → Forward ${PORT} → Open in Browser"
  for ip in $(hostname -I 2>/dev/null); do
    [[ "$ip" == "127.0.0.1" ]] && continue
    echo "url_lan=http://${ip}:${PORT}/"
  done
}

stop_server() {
  if [ -f "$PID_FILE" ]; then
    nginx -c "$CONF" -s stop 2>/dev/null || true
  fi
  pkill -f "nginx.*nginx.dev.conf" 2>/dev/null || true
  sleep 0.3
  rm -f "$PID_FILE" /tmp/datagent-nginx-access.log /tmp/datagent-nginx-error.log
}

start_background() {
  stop_server
  ensure_dirs
  nginx -c "$CONF"
  sleep 0.4
  if ! is_running; then
    echo "nginx failed to start; see /tmp/datagent-nginx-error.log" >&2
    exit 1
  fi
  print_urls
}

start_foreground() {
  stop_server
  ensure_dirs
  print_urls
  echo "foreground: nginx (Ctrl+C to stop)"
  exec nginx -c "$CONF" -g 'daemon off;'
}

case "$MODE" in
  start) ensure_nginx && start_background ;;
  foreground) ensure_nginx && start_foreground ;;
  stop) stop_server && echo stopped ;;
  restart) ensure_nginx && start_background ;;
  status)
    if is_running; then
      print_urls
      curl -fsS -o /dev/null -w "health: HTTP %{http_code}\n" "http://127.0.0.1:${PORT}/" || true
    else
      echo "not running"
      exit 1
    fi
    ;;
  *)
    echo "Usage: $0 [start|foreground|stop|restart|status]" >&2
    exit 1
    ;;
esac
