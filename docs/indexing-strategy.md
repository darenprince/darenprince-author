# Indexing Strategy Playbook

_Last updated: 2025-02-14_

The goal is to surface public marketing pages while keeping prototypes, auth flows, and dashboards out of the index. `js/seo-indexing.js` enforces these rules at runtime.

## Pages to index

- **Home** (`/`, `/index.html`) — Primary marketing hub and conversion gateway.
- **Book** (`/book`, `/book.html`) — Core product offer.
- **Press** (`/press`, `/press.html`) — Media coverage and press assets.
- **Contact** (`/contact`, `/contact.html`) — Lead capture surface.
- **Image Index** (`/image-index`, `/image-index.html`) — Reference for approved creative assets.
- **Sitemap** (`/sitemap`, `/sitemap.html`) — Crawl map for search engines.
- **Search results** (`/pages/search`, `/pages/search.html`) — Minisearch output page.

## Pages to keep out of index

- **Auth** (`/login`, `/reset-password`, `/verify-email`) — Protects credentials and avoids thin content.
- **Dashboards** (`/dashboard`, `/admin-dashboard`, `/member`) — Member-only or internal tools.
- **Design system & experiments** (`/components`, `/style-classes`, `/themes`, `/All-heroes-demos`, `/brandon`, `/shhh`, `/home`) — Sandboxes that should stay internal until hardened.

## Implementation details

- `js/seo-indexing.js` exports `applyIndexingMeta()` and `getIndexingRule()` to set `<meta name="robots">` on load.
- `js/main.js` imports and executes `applyIndexingMeta()` so all marketing surfaces receive directives automatically.
- Standalone pages (e.g., auth flows) include `js/seo-indexing.js` directly to pick up the configuration.
- Default directive is `index, follow` unless a path is explicitly listed in the noindex configuration arrays inside `js/seo-indexing.js`.
- `seo-enrich.js` reinforces canonical URLs, JSON-LD schema, and sitemap entries during the build so crawlers get consistent metadata across HTML outputs.

> **Reality Check:** The Minisearch results page (`/pages/search.html`) is indexable, but the repo ships empty payloads until `/content/` is populated. Seed content before promoting on-site search in SEO campaigns.

## Updating the rules

1. Add paths to `INDEXABLE_PAGES` or `NON_INDEXABLE_PAGES` in `js/seo-indexing.js`.
2. Export the updated bundle via `npm run build` (or rerun `npm run watch`).
3. Run `npm run postprocess:seo` with `DOMAIN` set so sitemap/robots output mirrors the new rules.
4. Audit pages in staging to confirm `<meta name="robots">` reflects the new directive.

Keep indexation aligned with real launch status to avoid leaking unfinished experiences.
