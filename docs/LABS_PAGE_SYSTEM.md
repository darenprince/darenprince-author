# Labs Page System (`/labs/`)

## Canonical Route

- `/labs/` (`labs/index.html`) is the canonical public-facing Crown Labs landing page.
- `labs.html` is a legacy compatibility redirect to `/labs/` and should not regain a separate shell or competing content model.
- Generated product brief pages live under `labs/products/*.html` and link back to `/labs/#products`.

## Public Landing Purpose

The landing page is a discovery layer for visitors who need a high-level introduction before entering the documentation system. It must:

- explain Crown Labs as the institutional product portfolio and systems lab;
- explain CrownCode.ai as the reusable intelligence and engineering layer beneath Crown Labs;
- display products from generated metadata only;
- introduce founder context for Daren Prince;
- funnel deeper exploration toward the Crown Labs Bible documentation application at `/docs/crownlabsbible/docs/`.

The page must not duplicate product dossiers, architecture, roadmap, valuation, or governance documentation. Those subjects remain owned by `docs/crownlabsbible/` and are consumed publicly through the generated Crown Labs Bible documentation app.

## Public Navigation Contract

The `/labs/` landing page and `labs/products/*.html` product brief pages share a modern Crown Labs navigation model:

| Label         | Landing target                           | Product-page target                         |
| ------------- | ---------------------------------------- | ------------------------------------------- |
| Home          | `#top`                                   | `../`                                       |
| Products      | `#products`                              | `../#products`                              |
| Technology    | `#crowncode`                             | `../#crowncode`                             |
| Founder       | `#founder`                               | `../#founder`                               |
| Documentation | `../docs/crownlabsbible/docs/index.html` | `../../docs/crownlabsbible/docs/index.html` |
| Contact       | `mailto:apps@crownlabs.tech`             | `mailto:apps@crownlabs.tech`                |

Navigation uses API-backed Tabler icons through the existing Iconify web component (`iconify-icon`) and an accessible hamburger disclosure on mobile. The docs app has its own sidebar, quick links, mobile sidebar, reader toolbar, and footer navigation; preserve that documentation navigation rather than replacing it with the public marketing shell.

## Documentation Routing Rules

- Crown Labs public pages must not send users to generic repo docs (`/docs/`) for product documentation.
- Crown Labs public pages must not use raw Markdown files or raw documentation directories as primary documentation destinations.
- Use `/docs/crownlabsbible/docs/index.html` as the default documentation entry.
- Use `/docs/crownlabsbible/docs/crowncode-ai.html` for CrownCode.ai documentation.
- Use `/docs/crownlabsbible/docs/viewer.html?doc=<canonical-markdown-path>#<label>` when a public product page needs to deep-link to an exact Bible dossier through the documentation application.
- The viewer supports the `doc` query parameter while preserving the hash label, sidebar tree, search, quick links, and all existing documentation routes.

## Rendering Rules

- Product cards are rendered from `assets/labs-data.json` through `assets/labs.js`.
- The landing page passes `data-labs-data="../assets/labs-data.json"` so the shared renderer resolves data correctly from `/labs/`.
- Product rendering uses explicit DOM creation and `textContent`; do not inject raw HTML or regex-rewrite rendered markup.
- Public cards are summaries only. Brief and documentation links must point visitors into generated product pages or the Crown Labs Bible documentation app.

## Architecture Decisions

- `/labs/` is now a clean, public, marketing-safe route while `labs.html` remains only for backward compatibility.
- The design follows a quiet luxury infrastructure UI: restrained contrast, measured spacing, square geometry, and documentation-forward hierarchy.
- CrownCode.ai receives a high-level platform explanation on the landing page, but its authoritative source remains the Crown Labs Bible and its public destination is the documentation application.
- Product inventory remains generated from the Crown Labs Bible by `npm run build:labs`.
- Navigation audit files for this modernization live at `audit/navigation-map-before.md` and `audit/navigation-map-after.md`.

## Canonical Documentation Sources For This Page

- Crown Labs Bible documentation app: `docs/crownlabsbible/docs/index.html`
- Crown Labs Bible viewer: `docs/crownlabsbible/docs/viewer.html`
- CrownCode.ai documentation app page: `docs/crownlabsbible/docs/crowncode-ai.html`
- `assets/labs-data.json` generated from `docs/crownlabsbible/`
- `meet-daren-prince.html` for public founder biography context

## Deprecated System Notes

- The former `labs/index.html` redirect-only entrypoint is deprecated.
- `labs.html` is deprecated as a content route and retained only as a redirect with valid metadata for existing links and deployment checks.
- Do not reintroduce a second hand-maintained Crown Labs product inventory outside the generated metadata pipeline.
- Do not route Crown Labs product documentation to repo utility docs or raw Markdown files when an equivalent Crown Labs Bible documentation app route exists.
