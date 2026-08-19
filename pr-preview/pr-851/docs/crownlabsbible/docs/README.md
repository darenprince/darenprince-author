# Crown Labs Docs Platform

## Deployment (GitHub Pages)

This docs platform is built as static HTML/CSS/JS and is ready for GitHub Pages hosting.

1. Go to the repository **Settings → Pages**.
2. Set **Source** to **Deploy from a branch**.
3. Select the publishing branch (for example `main` or your release branch).
4. Select the folder that contains `docs/crownlabsbible/docs` (typically `/root`).
5. Save and verify published URLs.

## Core Routes

- `docs/crownlabsbible/docs/index.html`
- `docs/crownlabsbible/docs/viewer.html`
- `docs/crownlabsbible/docs/categories.html`
- `docs/crownlabsbible/docs/products.html`
- `docs/crownlabsbible/docs/investor-mode.html`
- `docs/crownlabsbible/docs/executive-dashboard.html`
- `docs/crownlabsbible/docs/ecosystem-map.html`
- `docs/crownlabsbible/docs/roadmap-tracker.html`

## Platform Standards (Current)

All routes are aligned to the viewer-style documentation shell and include:

- shared `assets/css/platform.css`
- shared viewer-style sidebar navigation, toolbar controls, and footer shell
- shared platform footer links and social icons
- dark/light theme toggle support plus collapsible desktop/mobile navigation state
- Iconify icon usage for visual language consistency
- route-level SEO/social metadata (`description`, Open Graph, Twitter cards)
- unified toolbar header pattern: brand mark left, mobile navigation toggle right, breadcrumb stack below
- mobile layering fix: off-canvas menu and scrim now stack above sticky toolbar to prevent header/menu overlap
- active route highlighting uses solid Crown red text for reliable contrast (replaces conic-gradient text fill)

## Brand and Browser Assets

Current docs pages include:

- favicon integration via Crown icon asset
- social preview image references for Open Graph + Twitter
- theme color metadata aligned to platform dark mode branding

## Next Build Enhancements

- add local docs-specific favicon variants (`favicon.ico`, `apple-touch-icon`) in `docs/assets`
- add a dedicated GitHub Pages workflow for branch-to-pages publishing
- centralize shared head metadata generation to reduce manual duplication

## Public-Facing Copy & Navigation Standards

To keep launch messaging investor-ready and consumer-digestible across all documentation landing pages:

- hero and intro copy should communicate commercial outcomes, deployment readiness, and strategic value in plain language
- primary calls-to-action should map to **Portfolio**, **Investor Brief**, and **Documentation Hub** journeys
- sidebar labels are standardized as `Documentation Hub`, `Ecosystem Map`, and `Release Roadmap`
- each landing route should include metadata that is publication-ready for search and social sharing
- route titles should avoid placeholder filenames (for example `index.html`, `products.html`) and use human-readable page names

These standards are now reflected across `index`, `products`, `investor`, `executive`, `ecosystem`, `categories`, and `roadmap` routes.
