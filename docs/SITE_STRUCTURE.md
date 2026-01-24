# 🗺 Site Structure & Content Sources

_Last updated: 2026-02-20_

This map captures the current layout of the repository, the active pages, and the supporting modules. Use it as the starting point before creating new surfaces or wiring automation.

## Root directory overview

| Path                                                                  | Purpose                             | Notes                                                                                                                                           |
| --------------------------------------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `/index.html`                                                         | Public landing page                 | Hero rail, testimonials, contact CTA; loads `js/main.js`, `js/hero-demos.js`, `js/theme-toggle.js`.                                             |
| `/book.html`                                                          | Book detail surface                 | Tabbed format selector, trailer modal, 3D viewer; requires `js/book-tabs.js`, `js/trailer-modal.js`, `js/book-3d-viewer.js`.                    |
| `/books/gameon.html`                                                  | Game On! test landing page          | Marketing-first long-form landing page using the global nav/footer and inline scoped styles.                                                    |
| `/components.html`                                                    | Component gallery & docs            | Component navigation driven by `js/main.js` and `js/ui.js`.                                                                                     |
| `/style-classes.html`                                                 | Token & utility showcase            | Demonstrates helper classes from `scss/utilities/`.                                                                                             |
| `/dashboard.html`                                                     | Member dashboard                    | Displays migration messaging and disables forms via `js/dashboard.js`.                                                                          |
| `/admin-dashboard.html`                                               | Operator overview                   | Links to admin tooling; uses shared dashboard cards.                                                                                            |
| `/admin-user-management.html`                                         | Operations command console          | Shows downtime notice via `js/admin-user-console.js`.                                                                                           |
| `/login.html`, `/reset-password.html`, `/verify-email.html`           | Auth flows                          | Use `js/auth.js`, `js/password-strength.js`; all rely on `js/auth-service.js` placeholders for now.                                             |
| `/contact.html`, `/press.html`, `/meet-daren-prince.html`             | Marketing pages                     | Share the CodyHouse layout, hero modules, and theme toggle controls.                                                                            |
| `/leanin.html`                                                        | Lean In therapeutic workbook        | Gated via a lightweight in-page credential modal with persistent login, autosave, local session archiving, and a mobile-friendly dropdown menu. |
| `/home.html`, `/brandon.html`, `/shhh.html`, `/All-heroes-demos.html` | Prototypes / archived demos         | Keep behind auth or update before shipping.                                                                                                     |
| `/member/`                                                            | Legacy member shell                 | Currently ungated—treat as prototype until new auth is wired in.                                                                                |
| `/assets/`                                                            | Compiled CSS/JS, imagery, press kit | `assets/styles.css` is generated from `scss/styles.scss`; JS modules live under `/js`.                                                          |
| `/scss/`                                                              | Sass source                         | `scss/styles.scss` imports base, layout, component, theme, and utility layers.                                                                  |
| `/js/`                                                                | Browser modules                     | Theme toggle, auth placeholders, book demos, admin tooling, UI helpers.                                                                         |
| `/src/`                                                               | Search worker + build scripts       | `src/search/build-index.mjs` constructs Minisearch payloads.                                                                                    |
| `/scripts/`                                                           | Node helpers                        | Icon builder, image manifest tooling, setup scripts.                                                                                            |
| `/docs/`                                                              | Documentation & prompts             | Build notes, migration plan, style references.                                                                                                  |
| `/tests/`                                                             | Vitest suites                       | Cover redirect logic and asset helpers.                                                                                                         |

> **Reality Check:** The search builder expects Markdown in `/content/`, but that directory is absent. Until content is seeded, `public/search/index.json` and `docs.json` remain empty and the live search UI has nothing to show.

## Page inventory

| Page                         | Description                    | Primary modules/styles                                                                                                                       |
| ---------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `index.html`                 | Marketing homepage             | `js/main.js`, `js/hero-demos.js`, `js/theme-toggle.js`, `scss/components/_hero.scss`, `_testimonials.scss`.                                  |
| `book.html`                  | Game On! detail page           | `js/book-tabs.js`, `js/trailer-modal.js`, `js/book-3d-viewer.js`, `scss/components/_book-tabs.scss`, `_book-3d.scss`.                        |
| `books/gameon.html`          | Game On! test landing page     | Inline scoped styles + shared nav/footer from `assets/styles.css`; anchors within the page.                                                  |
| `components.html`            | Component documentation        | `js/main.js`, `js/ui.js`, `scss/layout/_component-nav.scss`, `scss/components/_component-docs.scss`.                                         |
| `style-classes.html`         | Utility gallery                | `scss/utilities/_helpers.scss`, `_gradients.scss`.                                                                                           |
| `login.html`                 | Member login/create account    | `js/auth.js`, `js/password-strength.js`, `scss/components/_login.scss`, `_forms.scss`.                                                       |
| `reset-password.html`        | Reset flow UI                  | `js/password-strength.js`, shared form styles.                                                                                               |
| `verify-email.html`          | Email verification prompt      | Uses base typography + alert components.                                                                                                     |
| `dashboard.html`             | Authenticated member dashboard | `js/dashboard.js`, `scss/components/_dashboard.scss`, `_cards.scss`, `_forms.scss`.                                                          |
| `admin-user-management.html` | Admin console                  | `js/admin-user-console.js`, `js/auth-guard.js`, `scss/components/_dashboard.scss`, `_profile-dropdown.scss`.                                 |
| `admin-dashboard.html`       | Operator hub                   | `js/auth-guard.js`, `scss/components/_dashboard.scss`, `_cards.scss`.                                                                        |
| `contact.html`               | Contact CTA page               | Relies on hero, form, and CTA partials.                                                                                                      |
| `press.html`                 | Press kit distribution         | `scss/components/_press-page.scss`, `_downloads.scss`, `_viewer.scss`.                                                                       |
| `meet-daren-prince.html`     | Bio narrative                  | `scss/components/_bio-page.scss`, `.styledh1` utilities.                                                                                     |
| `leanin.html`                | Lean In workbook               | Standalone HTML with modal credential gate, persistent login, autosave, session archive, print-to-PDF action, and zoom-locked mobile layout. |
| `image-index.html`           | Internal image manifest viewer | `js/image-index.js`, `scss/components/_viewer.scss`.                                                                                         |
| `All-heroes-demos.html`      | Experimental hero set          | `js/hero-demos.js`, `scss/components/_hero-demos.scss`.                                                                                      |
| `pages/search.html`          | Search results shell           | `src/js/search-results.js`, `scss/components/_search.scss`.                                                                                  |
| `member/index.html`          | Legacy member dashboard        | Uses global CSS but lacks current auth guard.                                                                                                |

## Sass modules

### Tokens & themes

- `scss/tokens/_css-vars.scss` — 77 CSS variables (grayscale ramp, brand greens, gradients, focus ring).
- `scss/tokens/_colors.scss` — Sass bindings to those variables.
- `scss/themes/_dark.scss`, `_light.scss` — Theme wrappers toggled via `.theme-dark` / `.theme-light`.

### Base layers

- `scss/base/_variables.scss` — Font stacks, spacing scale, breakpoints, border radius.
- `scss/base/_mixins.scss` — `respond-to` breakpoint mixin, gradient button mixin, `visually-hidden` helper.
- `scss/base/_globals.scss` — Container utilities (`.container`, `.container--spaced`, `.container--border`, `.container--light`) and layout resets.
- `scss/base/_typography.scss` — Heading scale (`h1` 2.25rem → `h6` 0.875rem) with Helvetica Neue baseline.

### Utilities

- `scss/utilities/_helpers.scss` — Flex helpers, spacing utilities, `.styledh1`, gradient text helpers, button sizing.
- `scss/utilities/_gradients.scss` — Background gradient classes (lemon-lime, charcoal-mint, light container, etc.).

### Layouts & components

- `scss/layout/` — Header, nav, component side navigation, demo sections, footer, grid helpers.
- `scss/components/` — 33 partials covering buttons, forms, alerts, hero modules, book experiences, dashboard cards, admin UI, press downloads, search, modals, loaders, and more (see `docs/UI_COMPONENTS.md`).

> **Reality Check:** Older docs listed Sass partials directly under `/components/`. In this repo the `/components/` directory holds HTML demos, while Sass lives under `scss/components/`.

## JavaScript modules

| Module                                                                 | Role                                                                         |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `js/main.js`                                                           | Mega menu, search toggle, auth toggle defaults, component modal controls.    |
| `js/theme-toggle.js`                                                   | Handles dark/light toggle and persists preference.                           |
| `js/auth.js`                                                           | Sign in/up UI handling, password validation, migration messaging.            |
| `js/auth-guard.js`                                                     | Displays gating notices while auth is offline.                               |
| `js/dashboard.js`                                                      | Member dashboard placeholder (disables uploads, shows migration card).       |
| `js/admin-user-console.js`                                             | Admin management placeholder (renders offline notice).                       |
| `js/profile-dropdown.js`                                               | Avatar dropdown interactions with login redirect while auth is offline.      |
| `js/book-tabs.js`, `js/trailer-modal.js`, `js/book-3d-viewer.js`       | Interactive book experiences.                                                |
| `js/ui.js`                                                             | Toast + progress utilities exposed via `window.GameOnUI`.                    |
| `js/image-index.js`, `js/folder-catalog.js`, `js/password-strength.js` | Supporting utilities for manifests, folder display, and password validation. |
| `src/js/search.js`, `src/js/search-results.js`, `src/search/worker.js` | Minisearch autocomplete and results rendering.                               |

## Search index pipeline

1. `src/search/build-index.mjs` globs `/content/**/*.md` and `/pages/**/*.html` (excluding `search.html`).
2. Markdown is parsed with `gray-matter` + `marked`; HTML is parsed with `cheerio`.
3. Minisearch index + document store are written to `public/search/index.json` and `public/search/docs.json`.
4. `src/js/search.js` consumes the JSON, with keyboard navigation and “View all results” linking to `/search`.

> **Reality Check:** Without `/content/`, the build logs “Indexed 0 documents” and ships empty JSON files. Address this before marketing the search feature.

## Testing footprint

- `tests/public-site.spec.ts` — Verifies public site availability checks.
- `tests/og-image.spec.ts` — Ensures Open Graph automation runs without regressions.

> **Reality Check:** The legacy `member/` templates are not protected. Wire the future auth guard or document them as prototypes before exposing links to production users.
