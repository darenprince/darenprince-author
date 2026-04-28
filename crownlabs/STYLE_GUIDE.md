# Crown Labs Standalone Style Guide

This style guide applies to the independent app in `./crownlabs/`.

## Design System Foundation

- **Theme:** Dark-first interface.
- **Primary brand accent:** `#FF3B46`.
- **Panel color:** `#111826`.
- **Background color:** `#090E17`.
- **Text color:** `#E9EEF8`.
- **Muted text:** `#9AA6BD`.

## Icon System (Iconify API)

The app uses the Iconify API runtime for scalable iconography:

- Script source: `https://code.iconify.design/3/3.1.1/iconify.min.js`
- Pattern: `<span class="iconify app-icon" data-icon="mdi:...">`
- Icon names are stored in `assets/data.js` so section cards and components remain data-driven.

## Components

- Header with red progress line + sticky shell.
- Hero with flagship panel.
- Stat blocks.
- Product cards with status badges and valuation signal strip.
- Framework, books/IP, status table, valuation cards, and ethics cards.

## GitHub Pages Readiness

- Uses relative URLs for assets and links.
- No Netlify-specific dependencies.
- Includes local favicon, OG image, and webmanifest.

## Accessibility + UX

- Color contrast tuned for dark UI.
- Search and status filtering on product portfolio.
- Scroll progress + back-to-top shortcut.
