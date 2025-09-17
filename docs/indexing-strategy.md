# Indexing Strategy Playbook

Launching the public site means every crawl should reinforce the brand story while keeping prototypes and auth flows private. The following map balances discoverability with security.

## Pages to Index
- **Home (`/`, `/index.html`)** — Primary authority signal and conversion gateway.
- **Books (`/book`)** — Core offer that should rank for branded and product-intent queries.
- **Press (`/press`)** — Media coverage that boosts expertise and trust.
- **Contact (`/contact`)** — Lead capture surface for speaking, coaching, and partnerships.
- **Image Index (`/image-index`)** — Asset library that legitimizes brand creatives and helps journalists.
- **Sitemap (`/sitemap`)** — Crawl aid that gives bots a clean view of the architecture.
- **Search (`/pages/search`)** — Utility page that supports user navigation and long-tail discovery.

## Pages to Keep Out of Index
- **Authentication surfaces (`/login`, `/reset-password`, `/verify-email`)** — Avoid thin-content penalties and brute-force attention.
- **Member dashboards (`/dashboard`, `/admin-dashboard`, `/member`)** — Protect gated experiences and internal tooling.
- **Design system & experiments (`/components`, `/style-classes`, `/themes`, `/All-heroes-demos`, `/brandon`, `/shhh`, `/home`)** — Internal sandboxes that should stay invisible to preserve brand polish.

## Implementation Details
- `js/seo-indexing.js` exports `applyIndexingMeta()` and `getIndexingRule()` which normalize URLs, look up the directive, and enforce `<meta name="robots">` content on every load.
- `js/main.js` imports the module so all primary marketing pages automatically receive the correct directive; standalone pages include the module directly.
- Default behavior is **index, follow** so new marketing content is crawlable unless explicitly flagged otherwise. Update the configuration arrays in `js/seo-indexing.js` when new sections launch.
