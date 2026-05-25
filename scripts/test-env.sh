#!/usr/bin/env bash
# Dev/test среда лендинга (Cursor Cloud, локальная сеть).
# Docker — VPS/CI; host nginx — fallback когда overlay Docker недоступен.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${LANDING_PORT:-8080}"
BIND="${LANDING_BIND:-0.0.0.0}"
MODE="${LANDING_TEST_MODE:-auto}"

print_urls() {
  local mode="$1"
  echo "mode=${mode}"
  echo "url_local=http://127.0.0.1:${PORT}/"
  echo "url_hostname=http://$(hostname -f 2>/dev/null || hostname):${PORT}/"
  for ip in $(hostname -I 2>/dev/null); do
    [[ "$ip" == "127.0.0.1" ]] && continue
    echo "url_lan=http://${ip}:${PORT}/"
  done
}

docker_cmd() {
  if docker info >/dev/null 2>&1; then
    docker "$@"
  else
    sudo docker "$@"
  fi
}

try_docker() {
  command -v docker >/dev/null 2>&1 || return 1
  docker_cmd info >/dev/null 2>&1 || return 1

  local NAME="${LANDING_CONTAINER_NAME:-datagent-landing-test}"
  docker_cmd rm -f "$NAME" 2>/dev/null || true
  if docker_cmd run -d --name "$NAME" -p "${BIND}:${PORT}:80" \
    -v "${ROOT}/index.html:/usr/share/nginx/html/index.html:ro" \
    -v "${ROOT}/assets:/usr/share/nginx/html/assets:ro" \
    -v "${ROOT}/docker/nginx.conf:/etc/nginx/conf.d/default.conf:ro" \
    nginx:1.27-alpine 2>/dev/null; then
    print_urls "docker"
    return 0
  fi
  return 1
}

start_host_nginx() {
  command -v nginx >/dev/null 2>&1 || {
    echo "nginx не установлен: sudo apt install nginx" >&2
    return 1
  }
  if [ -f /tmp/datagent-nginx.pid ] && kill -0 "$(cat /tmp/datagent-nginx.pid)" 2>/dev/null; then
    print_urls "host-nginx (already running)"
    return 0
  fi
  mkdir -p /tmp/nginx-body /tmp/nginx-proxy /tmp/nginx-fastcgi /tmp/nginx-uwsgi /tmp/nginx-scgi
  export LANDING_PORT="${PORT}"
  # Порт в конфиге фиксирован 8080; для другого порта — docker compose
  if [ "${PORT}" != "8080" ]; then
    echo "host-nginx: только порт 8080 (задайте LANDING_PORT=8080 или используйте docker)" >&2
  fi
  nginx -c "${ROOT}/docker/nginx.dev.conf"
  sleep 0.3
  print_urls "host-nginx"
}

stop_host_nginx() {
  if [ -f /tmp/datagent-nginx.pid ]; then
    nginx -c "${ROOT}/docker/nginx.dev.conf" -s stop 2>/dev/null || kill "$(cat /tmp/datagent-nginx.pid)" 2>/dev/null || true
    rm -f /tmp/datagent-nginx.pid /tmp/datagent-nginx-access.log /tmp/datagent-nginx-error.log
  fi
}

case "${1:-start}" in
  start)
    if [ "$MODE" = "docker" ]; then
      try_docker
    elif [ "$MODE" = "host" ]; then
      start_host_nginx
    else
      try_docker || start_host_nginx
    fi
    ;;
  stop)
    docker_cmd rm -f datagent-landing-test 2>/dev/null || true
    stop_host_nginx
    echo "stopped"
    ;;
  status)
    if [ -f /tmp/datagent-nginx.pid ] && kill -0 "$(cat /tmp/datagent-nginx.pid)" 2>/dev/null; then
      print_urls "host-nginx (running)"
    elif docker_cmd ps --filter name=datagent-landing-test --format '{{.Names}}' 2>/dev/null | grep -q datagent-landing-test; then
      print_urls "docker (running)"
    else
      echo "not running"
      exit 1
    fi
    ;;
  *)
    echo "Usage: $0 [start|stop|status]" >&2
    exit 1
    ;;
esac
