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
- funnel deeper exploration toward `/docs/` and `/docs/crownlabsbible/`.

The page must not duplicate product dossiers, architecture, roadmap, valuation, or governance documentation. Those subjects remain owned by `docs/crownlabsbible/` and its generated documentation app.

## Rendering Rules

- Product cards are rendered from `assets/labs-data.json` through `assets/labs.js`.
- The landing page passes `data-labs-data="../assets/labs-data.json"` so the shared renderer resolves data correctly from `/labs/`.
- Product rendering uses explicit DOM creation and `textContent`; do not inject raw HTML or regex-rewrite rendered markup.
- Public cards are summaries only. Brief and source links must point visitors into generated product pages or canonical documentation.

## Architecture Decisions

- `/labs/` is now a clean, public, marketing-safe route while `labs.html` remains only for backward compatibility.
- The design follows a quiet luxury infrastructure UI: restrained contrast, measured spacing, square geometry, and documentation-forward hierarchy.
- CrownCode.ai receives a high-level platform explanation on the landing page, but its authoritative source remains `docs/crownlabsbible/02-products/crowncode-ai.md`.
- Product inventory remains generated from the Crown Labs Bible by `npm run build:labs`.

## Canonical Documentation Sources For This Page

- `docs/crownlabsbible/README.md`
- `docs/crownlabsbible/02-products/crowncode-ai.md`
- `assets/labs-data.json` generated from `docs/crownlabsbible/`
- `meet-daren-prince.html` for public founder biography context

## Deprecated System Notes

- The former `labs/index.html` redirect-only entrypoint is deprecated.
- `labs.html` is deprecated as a content route and retained only as a redirect with valid metadata for existing links and deployment checks.
- Do not reintroduce a second hand-maintained Crown Labs product inventory outside the generated metadata pipeline.
