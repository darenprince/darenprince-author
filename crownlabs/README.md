# Crown Labs Web App (Standalone)

This directory contains a **complete, standalone Crown Labs portfolio web app** with independent resources.

## Contents

- `index.html` – Full single-page experience.
- `assets/styles.css` – App styling and responsive layout.
- `assets/app.js` / `assets/data.js` – Rendering and interactive filtering.
- `assets/logo.svg`, `assets/favicon.svg`, `assets/og-image.svg` – Branding and social assets.
- `assets/site.webmanifest` – Browser install metadata.

## Deployment (GitHub Pages ready)

This app is static and uses only relative paths, so it can be published on GitHub Pages from this folder or from repository root.

### Option A: Serve from repository root

- Keep folder as `crownlabs/`.
- Access via `https://<org>.github.io/<repo>/crownlabs/`.

### Option B: Publish as its own Pages site

- Set Pages source to the branch/folder containing this directory.
- If needed, copy folder contents to the publish root.

## SEO & Metadata Included

`index.html` includes:

- title + meta description
- robots + theme color
- Open Graph tags
- Twitter card tags
- favicon + apple touch icon + web manifest

## Notes

- Netlify-specific configuration is intentionally not used.
- Theme colors are matched to Crown Labs dark branding.
- Social preview image is local (`assets/og-image.svg`) and deploys with the app.
