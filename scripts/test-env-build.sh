#!/usr/bin/env bash
# Полная среда через собранный образ (VPS / CI). Требует рабочий docker build.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${LANDING_PORT:-8080}"

cd "$ROOT"
export DOCKER_BUILDKIT="${DOCKER_BUILDKIT:-0}"
docker compose up --build -d

echo "Landing (compose): http://127.0.0.1:${PORT}/"
echo "Stop: docker compose down"
