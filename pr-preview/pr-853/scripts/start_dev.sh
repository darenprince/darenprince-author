#!/bin/bash
# start_dev.sh - Watch SCSS and launch a local static server

command -v python3 >/dev/null || { echo "Python 3 required"; exit 1; }

PORT=${PORT:-8080}

npm run watch &
WATCH_PID=$!
trap 'kill $WATCH_PID' EXIT

echo "Serving at http://localhost:${PORT}"
python3 -m http.server "${PORT}"

wait
