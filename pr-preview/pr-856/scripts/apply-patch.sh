#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -ne 1 ]; then
  echo "Usage: scripts/apply-patch.sh <patch-file>" >&2
  exit 1
fi

patch_file="$1"

if [ ! -f "$patch_file" ]; then
  echo "Patch file '$patch_file' not found." >&2
  exit 1
fi

echo "Applying patch with git am --3way..."
if git am --3way "$patch_file"; then
  echo "Patch applied with git am. Review the commit and continue working."
  exit 0
fi

echo "git am failed. Aborting and attempting git apply --3way."
git am --abort 2>/dev/null || true

if git apply --3way "$patch_file"; then
  echo "Patch applied with git apply --3way. Review the working tree, stage fixes, and commit when ready."
  exit 0
fi

echo "Patch still conflicted. Inspect 'git status' and resolve manually." >&2
echo "Quick-accept helpers:" >&2
echo "  Keep remote: git checkout --theirs <file> && git add <file>" >&2
echo "  Keep local:  git checkout --ours <file> && git add <file>" >&2
echo "Generated/minified assets are marked merge=ours; rerun builds after resolving." >&2
echo "For package.json/package-lock.json, prefer the remote copy and rerun npm install." >&2
exit 1
