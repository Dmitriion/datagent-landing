#!/usr/bin/env bash
# Обновить тестовый стенд в Cursor Cloud после pull/правок дизайна.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${LANDING_PORT:-8080}"
DO_PULL=1
OPEN_BROWSER=0

usage() {
  echo "Usage: $0 [--no-pull] [--open]" >&2
  echo "  --no-pull  не делать git pull" >&2
  echo "  --open     открыть в браузере Cloud Desktop" >&2
}

while [ $# -gt 0 ]; do
  case "$1" in
    --no-pull) DO_PULL=0 ;;
    --open) OPEN_BROWSER=1 ;;
    -h | --help) usage; exit 0 ;;
    *) echo "Unknown: $1" >&2; usage; exit 1 ;;
  esac
  shift
done

cd "$ROOT"

if [ "$DO_PULL" = 1 ] && [ -d .git ]; then
  echo "== git pull =="
  git pull --ff-only origin "$(git branch --show-current)" 2>/dev/null || git pull --ff-only 2>/dev/null || true
fi

echo "== commit =="
git log -1 --oneline 2>/dev/null || echo "(no git)"

echo "== restart dev server =="
"${ROOT}/scripts/cloud-dev-up.sh" restart

echo "== health =="
curl -fsS -o /dev/null -w "HTTP %{http_code}\n" "http://127.0.0.1:${PORT}/"

echo ""
echo "Просмотр в Cursor Cloud Desktop:"
echo "  ./scripts/open-cloud-browser.sh"
echo "  или http://127.0.0.1:${PORT}/ (Ctrl+Shift+R после правок CSS)"
echo "Port forward на ПК: Cursor → Ports → 8080"

if [ "$OPEN_BROWSER" = 1 ]; then
  "${ROOT}/scripts/open-cloud-browser.sh"
fi
