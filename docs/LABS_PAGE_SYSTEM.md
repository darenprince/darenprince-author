# Labs Page System (labs.html)

## Canonical Route

- `labs.html` is the public-facing Crown Labs portfolio page.
- `labs/index.html` remains a redirect-only entrypoint to preserve canonical routing.

## Rendering Rules

- Product cards are rendered from `assets/labs-data.json` through `assets/labs.js`.
- Filtering is state-driven through explicit search, status, and category controls.
- Documentation narrative sections are statically authored from canonical `crowndocs/content/*.md` source text.
- No unsafe `innerHTML` mutation from user input; only curated dataset fields are rendered.

## Architecture Decisions

- The page uses an institutional shell pattern and keeps a direct "Documentation Source" section that mirrors the Crown Docs master index purpose and integration model.
- Product portfolio controls remain data-driven to preserve operational filtering and readiness metrics.
- Header navigation now aligns the page with foundation, portfolio, and docs-sync anchors plus the documentation hub route.

## Canonical Documentation Sources For This Page

- `crowndocs/content/index.md`
- `crowndocs/content/corporate-infrastructure/index.md`
- `crowndocs/content/product-dossiers/index.md`

## Deprecated System Notes

- Legacy hero copy that was not mapped to documented source text was replaced.
- `labs.html` is now explicitly documented as a docs-synchronized surface instead of a standalone marketing layout.
