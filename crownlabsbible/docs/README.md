# Crown Labs Docs Platform

## Deployment (GitHub Pages)

This docs platform is built as static HTML/CSS/JS and is ready for GitHub Pages hosting.

1. Go to the repository **Settings → Pages**.
2. Set **Source** to **Deploy from a branch**.
3. Select the publishing branch (for example `main` or your release branch).
4. Select the folder that contains `crownlabsbible/docs` (typically `/root`).
5. Save and verify published URLs.

## Core Routes

- `crownlabsbible/docs/index.html`
- `crownlabsbible/docs/viewer.html`
- `crownlabsbible/docs/categories.html`
- `crownlabsbible/docs/products.html`
- `crownlabsbible/docs/investor-mode.html`
- `crownlabsbible/docs/executive-dashboard.html`
- `crownlabsbible/docs/ecosystem-map.html`
- `crownlabsbible/docs/roadmap-tracker.html`

## Platform Standards (Current)

All footer destinations are aligned to the shared platform shell and include:

- shared `assets/css/platform.css`
- shared Crown Labs header + navigation hierarchy
- shared platform footer links and social icons
- dark/light theme toggle support with theme-aware logo switching
- Iconify icon usage for visual language consistency
- route-level SEO/social metadata (`description`, Open Graph, Twitter cards)

## Brand and Browser Assets

Current docs pages include:

- favicon integration via Crown icon asset
- social preview image references for Open Graph + Twitter
- theme color metadata aligned to platform dark mode branding

## Next Build Enhancements

- add local docs-specific favicon variants (`favicon.ico`, `apple-touch-icon`) in `docs/assets`
- add a dedicated GitHub Pages workflow for branch-to-pages publishing
- centralize shared head metadata generation to reduce manual duplication
