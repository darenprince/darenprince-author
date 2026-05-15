# Labs Page System (labs.html)

## Canonical Route

- `labs.html` is the public-facing Crown Labs portfolio page.

## Rendering Rules

- Product cards are rendered from `assets/labs-data.json` through `assets/labs.js`.
- Filtering is state-driven through explicit search, status, and category controls.
- No unsafe `innerHTML` mutation from user input; only curated dataset fields are rendered.

## Architecture Decisions

- The page now follows a restrained institutional shell pattern inspired by Crown Labs Bible docs (`crownlabsbible/docs/`).
- Shared portfolio intelligence fields (status, readiness, valuation, time-to-market) are surfaced as card metadata.
- Header navigation links to documentation hub for continuity with the documentation platform.

## Deprecated System Notes

- Static hardcoded product sections in `labs.html` were removed in favor of data-driven rendering from `assets/labs-data.json`.
- Mobile hamburger-only navigation behavior was replaced with a consistent desktop shell nav and responsive collapse.
