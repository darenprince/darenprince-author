# Crown Labs Web App (GitHub Pages Production)

Crown Labs is delivered as a **single-page, static, investor-ready site** with inline CSS/JS for deployment reliability on GitHub Pages.

## Current State (May 4, 2026)

- `index.html` is a complete standalone landing page implementation with:
  - sticky glass navigation
  - desktop mega menu + mobile expandable navigation
  - interactive product ecosystem filtering
  - featured product spotlight updates
  - ecosystem layer architecture section
  - investor/partner CTA block
- Dark luxury visual direction with muted red brand accents and semantic sections.
- Accessibility features include keyboard-friendly controls, focus-visible styles, and reduced-motion support.

## Deployment (Primary: GitHub Pages)

1. Publish the `crownlabs/` folder to your Pages branch/path.
2. Confirm public URL resolves at:
   - `https://www.darenprince.com/crownlabs/` (custom domain), or
   - `https://<org>.github.io/<repo>/crownlabs/`.

No build step is required for this page.

## SEO / Metadata / Social

`index.html` includes production metadata:

- canonical URL
- robots directives
- Open Graph tags
- Twitter card tags
- theme-color and dark color-scheme
- web app manifest, favicon, and Apple touch icon links

## Brand Browser Assets

Assets deployed in `crownlabs/assets/`:

- `favicon.svg`
- `og-image.svg`
- `site.webmanifest`

All branding colors in metadata/browser surfaces are aligned to Crown Labs dark palette.

## Validation and Build Scripts (Repository Level)

From repository root:

- `npm run lint:metadata` validates deploy metadata conventions.
- `npm run deploy:github-pages` prepares the full site pipeline for GitHub Pages deployment.
