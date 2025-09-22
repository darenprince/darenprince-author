# 🗺 Site Structure & Content Sources

_Last updated: 2025-02-14_

This map captures the current layout of the repository, the active pages, and the supporting modules. Use it as the starting point before creating new surfaces or wiring automation.

## Root directory overview

| Path                                                                  | Purpose                                          | Notes                                                                                                                        |
| --------------------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `/index.html`                                                         | Public landing page                              | Hero rail, testimonials, contact CTA; loads `js/main.js`, `js/hero-demos.js`, `js/theme-toggle.js`.                          |
| `/book.html`                                                          | Book detail surface                              | Tabbed format selector, trailer modal, 3D viewer; requires `js/book-tabs.js`, `js/trailer-modal.js`, `js/book-3d-viewer.js`. |
| `/components.html`                                                    | Component gallery & docs                         | Auth-gated folder in production; component navigation driven by `js/main.js` and `js/ui.js`.                                 |
| `/style-classes.html`                                                 | Token & utility showcase                         | Demonstrates helper classes from `scss/utilities/`.                                                                          |
| `/dashboard.html`                                                     | Member dashboard                                 | Uploads, profile editing, folder cards; powered by `js/dashboard.js` with Supabase.                                          |
| `/admin-dashboard.html`                                               | Operator overview                                | Links to admin tooling; uses shared dashboard cards.                                                                         |
| `/admin-user-management.html`                                         | Supabase admin console                           | Calls the `admin-users` edge function; requires `js/auth-guard.js` and `js/admin-user-console.js`.                           |
| `/login.html`, `/reset-password.html`, `/verify-email.html`           | Auth flows                                       | Use `js/auth.js`, `js/password-strength.js` for validation and redirects.                                                    |
| `/contact.html`, `/press.html`, `/meet-daren-prince.html`             | Marketing pages                                  | Share the CodyHouse layout, hero modules, and theme toggle controls.                                                         |
| `/home.html`, `/brandon.html`, `/shhh.html`, `/All-heroes-demos.html` | Prototypes / archived demos                      | Keep behind auth or update before shipping.                                                                                  |
| `/member/`                                                            | Legacy member shell                              | Currently ungated—treat as prototype until `auth-guard.js` is wired in.                                                      |
| `/assets/`                                                            | Compiled CSS/JS, imagery, press kit              | `assets/styles.css` is generated from `scss/styles.scss`; `assets/js/env.js` from `scripts/generate-env.js`.                 |
| `/scss/`                                                              | Sass source                                      | `scss/styles.scss` imports base, layout, component, theme, and utility layers.                                               |
| `/js/`                                                                | Browser modules                                  | Theme toggle, auth guard, book demos, admin tooling, UI helpers.                                                             |
| `/src/`                                                               | Search worker + build scripts                    | `src/search/build-index.mjs` constructs Minisearch payloads.                                                                 |
| `/scripts/`                                                           | Node helpers                                     | Environment generator, icon builder, image manifest tooling, admin bootstrap.                                                |
| `/supabase/`                                                          | Client, env resolver, migrations, edge functions | Includes `functions/admin-users`, `functions/secure-storage`, and SQL migrations for profiles + folder access.               |
| `/docs/`                                                              | Documentation & prompts                          | This audit lives here alongside style, build, and Supabase guides.                                                           |
| `/tests/`                                                             | Vitest suites                                    | Cover Supabase env resolution, auth guard behavior, Netlify redirects.                                                       |

> **Reality Check:** The search builder expects Markdown in `/content/`, but that directory is absent. Until content is seeded, `public/search/index.json` and `docs.json` remain empty and the live search UI has nothing to show.

## Page inventory

| Page                         | Description                    | Primary modules/styles                                                                                                |
| ---------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `index.html`                 | Marketing homepage             | `js/main.js`, `js/hero-demos.js`, `js/theme-toggle.js`, `scss/components/_hero.scss`, `_testimonials.scss`.           |
| `book.html`                  | Game On! detail page           | `js/book-tabs.js`, `js/trailer-modal.js`, `js/book-3d-viewer.js`, `scss/components/_book-tabs.scss`, `_book-3d.scss`. |
| `components.html`            | Component documentation        | `js/main.js`, `js/ui.js`, `scss/layout/_component-nav.scss`, `scss/components/_component-docs.scss`.                  |
| `style-classes.html`         | Utility gallery                | `scss/utilities/_helpers.scss`, `_gradients.scss`.                                                                    |
| `login.html`                 | Member login/create account    | `js/auth.js`, `js/password-strength.js`, `scss/components/_login.scss`, `_forms.scss`.                                |
| `reset-password.html`        | Reset flow UI                  | `js/password-strength.js`, shared form styles.                                                                        |
| `verify-email.html`          | Email verification prompt      | Uses base typography + alert components.                                                                              |
| `dashboard.html`             | Authenticated member dashboard | `js/dashboard.js`, `scss/components/_dashboard.scss`, `_cards.scss`, `_forms.scss`.                                   |
| `admin-user-management.html` | Admin console                  | `js/admin-user-console.js`, `js/auth-guard.js`, `scss/components/_dashboard.scss`, `_profile-dropdown.scss`.          |
| `admin-dashboard.html`       | Operator hub                   | `js/auth-guard.js`, `scss/components/_dashboard.scss`, `_cards.scss`.                                                 |
| `contact.html`               | Contact CTA page               | Relies on hero, form, and CTA partials.                                                                               |
| `press.html`                 | Press kit distribution         | `scss/components/_press-page.scss`, `_downloads.scss`, `_viewer.scss`.                                                |
| `meet-daren-prince.html`     | Bio narrative                  | `scss/components/_bio-page.scss`, `.styledh1` utilities.                                                              |
| `image-index.html`           | Internal image manifest viewer | `js/image-index.js`, `scss/components/_viewer.scss`.                                                                  |
| `All-heroes-demos.html`      | Experimental hero set          | `js/hero-demos.js`, `scss/components/_hero-demos.scss`.                                                               |
| `pages/search.html`          | Search results shell           | `src/js/search-results.js`, `scss/components/_search.scss`.                                                           |
| `member/index.html`          | Legacy member dashboard        | Uses global CSS but lacks current auth guard.                                                                         |

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

| Module                                                                 | Role                                                                                              |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `js/main.js`                                                           | Mega menu, search toggle, auth toggle defaults, component modal controls, Supabase session check. |
| `js/theme-toggle.js`                                                   | Handles dark/light toggle and persists preference.                                                |
| `js/auth.js`                                                           | Sign in/up handling, redirects, password reset initiation.                                        |
| `js/auth-guard.js`                                                     | Protects gated pages; reveals `.site-wrap` only after role/folder checks pass.                    |
| `js/dashboard.js`                                                      | Member dashboard logic (storage listing/upload, profile updates, sign-out).                       |
| `js/admin-user-console.js`                                             | Admin management surface (list users, change roles, folder access, password resets, deletions).   |
| `js/profile-dropdown.js`                                               | Avatar dropdown interactions and Supabase logout.                                                 |
| `js/book-tabs.js`, `js/trailer-modal.js`, `js/book-3d-viewer.js`       | Interactive book experiences.                                                                     |
| `js/ui.js`                                                             | Toast + progress utilities exposed via `window.GameOnUI`.                                         |
| `js/supabase-helper.js`, `js/user-role.js`, `js/supabase-logger.js`    | Environment-safe Supabase client access, role normalization, logging overlay.                     |
| `src/js/search.js`, `src/js/search-results.js`, `src/search/worker.js` | Minisearch autocomplete and results rendering.                                                    |

## Search index pipeline

1. `src/search/build-index.mjs` globs `/content/**/*.md` and `/pages/**/*.html` (excluding `search.html`).
2. Markdown is parsed with `gray-matter` + `marked`; HTML is parsed with `cheerio`.
3. Minisearch index + document store are written to `public/search/index.json` and `public/search/docs.json`.
4. `src/js/search.js` consumes the JSON, with keyboard navigation and “View all results” linking to `/search`.

> **Reality Check:** Without `/content/`, the build logs “Indexed 0 documents” and ships empty JSON files. Address this before marketing the search feature.

## Supabase footprint

- Client: `supabase/client.js` + `supabase/client.ts` (ESM + TS helpers).
- Env resolver: `supabase/env.js` (Deno → Node → browser fallback).
- Edge functions: `supabase/functions/admin-users/index.ts`, `supabase/functions/secure-storage/index.ts`.
- Migrations: `supabase/migrations/0001_create_profiles.sql` through `0005_admin_action_log.sql` (profiles, folder access, audits).
- Folder catalog: `js/folder-catalog.js` (IDs used for gating and admin UI).

## Testing footprint

- `tests/supabase-env.spec.ts` — Env resolution coverage.
- `tests/auth.spec.ts` — Auth guard and login behaviors.
- `tests/storage.spec.ts`, `tests/netlify-rules.spec.ts` — Storage helpers + Netlify redirect expectations.
- Run `npm test` after editing Supabase helpers, auth guard, or routing logic.

> **Reality Check:** The legacy `member/` templates are not protected. Wire `auth-guard.js` or document them as prototypes before exposing links to production users.
