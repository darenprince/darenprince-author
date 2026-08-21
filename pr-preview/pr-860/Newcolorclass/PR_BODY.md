## What’s in this PR

Adds a comprehensive swatch library generated from Canva screenshots. Each swatch is mapped 1:1 with:
- exact **two-stop gradient** (top/bottom),
- exact **border**,
- exact **cloud/text colour**.

### Files
- `assets/css/canva-swatches.generated.css` – tokens + `.btn-<id>` / `.container-<id>` classes.
- `docs/canva-swatches.generated.html` – Style-guide catalog fragment (button + container + tokens per swatch).

### Safety
- 100% additive: no existing classes removed or renamed.
- Contrast in light mode is handled by using the exact cloud/text colour per swatch.
- Icons use `currentColor` so they inherit text colour correctly.

### Regeneration
Use `tools/extract_swatches.py` to regenerate from new screenshots.