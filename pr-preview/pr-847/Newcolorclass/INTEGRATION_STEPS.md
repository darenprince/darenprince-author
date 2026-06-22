# Integration Steps – Author Website (Exact Canva Swatches)

This guide integrates the **exact** two-stop gradients, borders, and cloud/text colours from your Canva swatch grid.
It is **additive** and will not break existing styles.

## Files to add
- `assets/css/canva-swatches.generated.css` (from this package: canva-swatches.ALL.generated.css)
- `docs/canva-swatches.generated.html` (from this package: canva-swatches.ALL.generated.html)
- Optional generator: `tools/extract_swatches.py` if you want to re-generate later.

## Update `docs/style-guide.html`
1. In `<head>`:
```html
<link rel="stylesheet" href="../assets/css/canva-swatches.generated.css">
<style>
  #canva-swatches .swatch-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:1rem; }
  #canva-swatches .swatch { background:#1f1f1f0d; padding:1rem; border-radius:.6rem; border:1px solid #e5e5e5; }
  #canva-swatches .tokens { display:block; margin-top:.75rem; font-size:.85rem; word-break:break-word; }
  #canva-swatches .preview svg { margin-right:.5rem; vertical-align:-2px; }
</style>
```
2. In BODY, paste the contents of `docs/canva-swatches.generated.html` where you want the catalog to render.

## Git flow
```bash
git checkout -b feature/canva-swatches
mkdir -p assets/css docs
cp canva-swatches.ALL.generated.css assets/css/canva-swatches.generated.css
cp canva-swatches.ALL.generated.html docs/canva-swatches.generated.html
git add assets/css/canva-swatches.generated.css docs/canva-swatches.generated.html docs/style-guide.html
git commit -m "Add Canva swatch gradients, borders, and text colours (exact 2-stop) + style-guide catalog"
git push origin feature/canva-swatches
# open PR to main
```

## Data sources
- `swatch_catalog_all.csv` and `.json` contain all per-swatch values (top, bottom, border, text).
- These were extracted directly from your screenshots (no approximations).

## Notes
- Icons should be inline SVGs with `fill="currentColor"` so they match each swatch’s `--text-<id>` colour.
- If a specific tile looks slightly off, crop that tile tightly and re-extract to reduce anti-aliasing drift.