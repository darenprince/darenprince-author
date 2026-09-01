#!/usr/bin/env bash
set -euo pipefail

# Render CLI helper for live VoxVector debugging.
# Requires: Render CLI v2.10+ and authentication via `render login`
# or RENDER_API_KEY for non-interactive use.
#
# Usage:
#   ./render-observe.sh <service-id-or-name> [path/text filter]

SERVICE="${1:-}"
FILTER="${2:-}"

if [[ -z "$SERVICE" ]]; then
  echo "Usage: $0 <service-id-or-name> [text-filter]" >&2
  exit 2
fi

if ! command -v render >/dev/null 2>&1; then
  echo "Render CLI is not installed. See docs/RENDER_OBSERVABILITY.md." >&2
  exit 127
fi

ARGS=(logs --resources "$SERVICE" --tail=true --limit 200)
if [[ -n "$FILTER" ]]; then
  ARGS+=(--text "$FILTER")
fi

exec render "${ARGS[@]}"
