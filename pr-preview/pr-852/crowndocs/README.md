# CrownDocs

Nuxt Content documentation platform for Crown Labs.

## Runtime + Shell Baseline

- Node 20 LTS recommended.
- npm 10+ recommended.
- `NITRO_PRESET=netlify` is optional for local parity checks.

## Run

- `npm install`
- `npm run dev`

## Build

- `npm run generate`

## Deployment (Netlify)

- Build command: `npm run generate`
- Publish directory: `.output/public`

## Public Docs QA Checklist

- Verify home and docs routes render with no console errors.
- Verify theme toggle persistence (localStorage key: `crowndocs-theme`).
- Verify logo alternates correctly:
  - Dark mode: `https://www.darenprince.com/labs/assets/crown-labs-logo.png`
  - Light mode: `https://www.darenprince.com/assets/images/30F807E6-DA8A-413C-8564-116375DDE082%202.png`
- Verify metadata tags for `theme-color`, OG, and Twitter are present in generated HTML.
- Treat `docs/crownlabsbible/` as the canonical Crown Labs Bible source; do not reintroduce competing product inventories in crowndocs content.
