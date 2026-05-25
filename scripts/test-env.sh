#!/usr/bin/env bash
# Тестовая среда лендинга.
# Docker — на VPS и в CI; nginx на хосте — fallback для Cursor Cloud.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${LANDING_PORT:-8080}"
MODE="${LANDING_TEST_MODE:-auto}"

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
  if docker_cmd run -d --name "$NAME" -p "127.0.0.1:${PORT}:80" \
    -v "${ROOT}/index.html:/usr/share/nginx/html/index.html:ro" \
    -v "${ROOT}/assets:/usr/share/nginx/html/assets:ro" \
    -v "${ROOT}/docker/nginx.conf:/etc/nginx/conf.d/default.conf:ro" \
    nginx:1.27-alpine 2>/dev/null; then
    echo "mode=docker"
    echo "url=http://127.0.0.1:${PORT}/"
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
    echo "mode=host-nginx (already running)"
    echo "url=http://127.0.0.1:${PORT}/"
    return 0
  fi
  mkdir -p /tmp/nginx-body /tmp/nginx-proxy /tmp/nginx-fastcgi /tmp/nginx-uwsgi /tmp/nginx-scgi
  nginx -c "${ROOT}/docker/nginx.dev.conf"
  sleep 0.3
  echo "mode=host-nginx"
  echo "url=http://127.0.0.1:${PORT}/"
}

stop_host_nginx() {
  if [ -f /tmp/datagent-nginx.pid ]; then
    nginx -c "${ROOT}/docker/nginx.dev.conf" -s stop 2>/dev/null || kill "$(cat /tmp/datagent-nginx.pid)" 2>/dev/null || true
    rm -f /tmp/datagent-nginx.pid /tmp/datagent-nginx-error.log
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
  *)
    echo "Usage: $0 [start|stop]" >&2
    exit 1
    ;;
esac
