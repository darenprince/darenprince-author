# Crown Labs Web App (Production Static Build)

Crown Labs now ships as a production-ready static web app designed for **GitHub Pages-first deployment** and fully compatible with Vercel static hosting.

## Current Stack

- Static HTML, CSS, and vanilla JavaScript modules.
- No runtime framework dependency.
- Product ecosystem rendered from `assets/data.js` into `index.html`.
- Dedicated investor-facing product brief pages in `products/`.

## Deployment

### GitHub Pages (primary)

1. Push repository changes to your Pages branch.
2. In GitHub repository settings, set Pages source to the branch/folder containing `crownlabs/`.
3. Publish at `https://<org>.github.io/<repo>/crownlabs/` or copy this folder to repo root for root deployment.

### Vercel (optional)

- Framework preset: `Other`.
- Output directory: `crownlabs`.
- Build command: none required.

## SEO / Social / Browser Metadata

- Metadata and social tags are embedded in `index.html`.
- Favicon, Apple touch icon, and web manifest are included under `assets/`.
- Theme color and dark UI tokens aligned to Crown Labs branding.

## Project Status (May 4, 2026)

- Homepage upgraded with investor-ready positioning copy and premium dark UI.
- Product ecosystem includes:
  - Crown Psychology
  - CrownCode Intelligence
  - Crown SOS
  - CrownCam
  - JustUs.chat
  - AI Cherry Pie
  - Pic Detective
  - LumiLogix
- Each product now has a dedicated page with summary, financial outlook, visual, and signup CTA.
