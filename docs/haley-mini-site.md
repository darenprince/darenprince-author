# Haley Mini Site (`haley.html`)

## Overview

The `haley.html` page is a standalone, GitHub Pages-ready mini site containing:

- PIN-gated access (`1203`) using client-side `sessionStorage`.
- A quick-digest clinical summary section.
- Expandable documentation sections (`<details>` / `<summary>`).
- Downloadable handoff assets from `assets/haley/`.
- Green brand-forward dark UI styling.

## Hosting and deployment

This page is static and works with the existing GitHub Pages workflow in this repository.

- Build/deploy command: `npm run deploy:github-pages`.
- Output is compatible with direct static hosting (no Netlify dependency).

## SEO and social metadata included

`haley.html` includes:

- `description` and `robots` metadata.
- Open Graph tags (`og:title`, `og:description`, `og:image`).
- Twitter tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`).

Social image path:

- `assets/haley/haley-social-card.svg`

## Favicons included

Dedicated favicon links in `haley.html`:

- `assets/haley/favicon.svg`

## Download assets included

- `assets/haley/clinical-summary.json`
- `assets/haley/er-handoff.txt`
- `assets/haley/home-checklist.txt`

## Security note

The PIN gate is suitable for lightweight obfuscation and user flow control only.
It is not server-side access control.
