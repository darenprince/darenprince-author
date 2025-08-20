#!/bin/bash
# start_dev.sh - Watch SCSS and launch Netlify dev server

command -v netlify >/dev/null || { echo "Netlify CLI required"; exit 1; }

npm run watch &
NETLIFY_PID=$!
trap 'kill $NETLIFY_PID' EXIT

netlify dev

wait
