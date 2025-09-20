#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: $0 <PR-number>" >&2
  exit 1
}

if [[ $# -ne 1 || ! "$1" =~ ^[0-9]+$ ]]; then
  usage
fi

PR_NUMBER="$1"

REMOTE_URL="$(git remote get-url origin 2>/dev/null || true)"
if [ -z "$REMOTE_URL" ]; then
  echo "Error: Unable to determine origin remote URL." >&2
  exit 1
fi

# Convert remote URL to https://github.com/<owner>/<repo>
if [[ "$REMOTE_URL" =~ ^git@github.com:(.+)\.git$ ]]; then
  REPO_PATH="${BASH_REMATCH[1]}"
  BASE_URL="https://github.com/${REPO_PATH}"
elif [[ "$REMOTE_URL" =~ ^https://github.com/(.+)\.git$ ]]; then
  REPO_PATH="${BASH_REMATCH[1]}"
  BASE_URL="https://github.com/${REPO_PATH}"
elif [[ "$REMOTE_URL" =~ ^https://github.com/(.+)$ ]]; then
  REPO_PATH="${BASH_REMATCH[1]}"
  BASE_URL="https://github.com/${REPO_PATH%/}"
else
  echo "Error: Unsupported origin remote URL format: $REMOTE_URL" >&2
  exit 1
fi

PATCH_URL="${BASE_URL}/pull/${PR_NUMBER}.patch"
PATCH_FILE="$(mktemp)"
trap 'rm -f "$PATCH_FILE"' EXIT

if ! curl -fsSL "$PATCH_URL" -o "$PATCH_FILE" || [ ! -s "$PATCH_FILE" ]; then
  echo "Error: Unable to download patch from $PATCH_URL or patch is empty." >&2
  exit 1
fi

echo "Applying patch from $PATCH_URL"

if git am --3way "$PATCH_FILE"; then
  echo "Patch applied with git am."
  exit 0
fi

if [ -d .git/rebase-apply ]; then
  echo "\nConflicts detected during git am. Resolve conflicts, then run:"
  cat <<'INSTRUCTIONS'
  git status
  # Keep remote changes:
  git checkout --theirs <file>
  # Keep local changes:
  git checkout --ours <file>
  git add <file>
  git am --continue
INSTRUCTIONS
  exit 1
fi

git am --abort 2>/dev/null || true

echo "git am failed, attempting git apply --3way..."

if git apply --3way "$PATCH_FILE"; then
  echo "Patch applied with git apply. Review, stage, and commit the changes."
  exit 0
fi

echo "\nConflicts detected during git apply. Resolve conflicts and finish with a commit:"
cat <<'INSTRUCTIONS'
  git status
  # Keep remote changes:
  git checkout --theirs <file>
  # Keep local changes:
  git checkout --ours <file>
  git add <file>
  git commit
INSTRUCTIONS

exit 1
