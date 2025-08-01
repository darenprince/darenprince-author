#!/bin/bash
# local_setup.sh - Install dependencies and compile initial assets

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required but not installed. Please install Node.js." >&2
  exit 1
fi

# install npm packages
npm install

# ensure sass is available
if ! command -v sass >/dev/null 2>&1; then
  npx sass --version >/dev/null 2>&1 || npm install --no-save sass
fi

# compile initial stylesheet
npx sass scss/styles.scss assets/styles.css

echo "Project dependencies installed and styles compiled."
