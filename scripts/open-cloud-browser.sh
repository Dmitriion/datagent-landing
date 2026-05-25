#!/usr/bin/env bash
# Открыть лендинг во встроенном браузере Cloud Desktop (без port forward на ПК).
set -euo pipefail

URL="${1:-http://127.0.0.1:${LANDING_PORT:-8080}/}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

cd "$ROOT"
./scripts/cloud-dev-up.sh start >/dev/null 2>&1 || ./scripts/cloud-dev-up.sh restart

export DISPLAY="${DISPLAY:-:1}"

if command -v xdg-open >/dev/null 2>&1; then
  xdg-open "$URL" >/dev/null 2>&1 &
elif command -v google-chrome >/dev/null 2>&1; then
  google-chrome --no-sandbox "$URL" >/dev/null 2>&1 &
else
  echo "Браузер не найден. Откройте вручную: $URL" >&2
  exit 1
fi

echo "Открыто в Cloud Desktop: $URL"
