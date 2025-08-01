#!/bin/bash
# start_dev.sh - Watch SCSS and launch Netlify dev server

npm run watch &
NETLIFY_PID=$!

npx netlify-cli dev

# kill the watch process on exit
kill $NETLIFY_PID
