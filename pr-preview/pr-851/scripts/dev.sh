#!/bin/bash
set -euo pipefail

# dev.sh - Run Sass watch + Vite together so SCSS changes are always reflected.

node scripts/prepare-nexuswho-html.mjs

npm run styles:watch &
SASS_WATCH_PID=$!

cleanup() {
  if kill -0 "$SASS_WATCH_PID" >/dev/null 2>&1; then
    kill "$SASS_WATCH_PID" >/dev/null 2>&1 || true
  fi
}
trap cleanup EXIT INT TERM

vite --host
