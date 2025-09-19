# 🖥️ Daren Prince Author Platform & Website

_Last updated: 2025-02-14_

This repository powers the public marketing site, component demos, and private dashboards for **Daren M. Prince**. The build is a dark-mode-first CodyHouse-inspired stack with Supabase authentication and Netlify deploys.

## ⚡️ Mission
- Spotlight the current catalog (Game On!) with cinematic hero treatments and interactive book tooling.
- Provide a single source of truth for brand tokens, layouts, and reusable UI.
- Prepare for member-only drops (files, dashboards, live experiences) without leaking unfinished surfaces.
- Keep deploys fast and scriptable for Netlify + Supabase integrations.

## 🔧 Stack Overview
| Layer | Details |
| --- | --- |
| Markup | Static HTML pages (`index.html`, `book.html`, `components.html`, dashboards, prototypes) |
| Styles | Modular Sass in `scss/` compiled to `assets/styles.css` via Dart Sass |
| JavaScript | Vanilla ES modules in `/js` plus Minisearch worker in `/src/search` |
| Auth & data | Supabase JS client (auth, storage, admin edge functions) |
| Build tooling | Node 20+, npm scripts (see `docs/BUILD_PIPELINE.md`), Netlify CLI |
| Search | Minisearch index built from `/content/**/*.md` and `/pages/**/*.html` |

> **Reality Check:** Netlify’s build command only runs Sass + env generation. You must run `npm run build:search` and `npm run generate:images` locally before committing if you need refreshed search or image manifests.

## 🧭 Navigation & Theme Controls
- `js/main.js` handles the mega menu, search toggle, and auth toggle defaults.
- `js/theme-toggle.js` wires the dark/light switch in headers; most marketing surfaces ship the toggle, but admin utilities like `admin-user-management.html` omit it to prioritize vertical space.
- Profile dropdown and logout are controlled by `js/profile-dropdown.js` once a Supabase session exists.

> **Reality Check:** `components.html` still loads `./js/mobile-nav.js`, but that file was removed. Drop the tag or reinstate the module to avoid 404s.

## 🎨 Design System
- Tokens live in `scss/tokens/_css-vars.scss` (77 CSS variables) and `scss/tokens/_colors.scss` (Sass bindings).
- Base variables provide Helvetica Neue stacks, spacing from `0.25rem`–`3rem`, and gradient utilities.
- Component partials (`scss/components/*.scss`) cover buttons, hero demos, book layouts, admin dashboards, press hubs, and search results.
- Utility classes in `scss/utilities/_helpers.scss` expose spacing, flex, typography, and `.styledh1` (League Spartan accent) helpers.

> **Reality Check:** League Spartan is referenced but not bundled. Load the font before using `.styledh1` on public pages or accept the Helvetica fallback.

## 🧩 Component & Page Map
See `docs/SITE_STRUCTURE.md` and `docs/UI_COMPONENTS.md` for the full tree. Highlights:
- `index.html` — hero rail, book CTA, testimonials, contact CTA.
- `book.html` — tabbed format selector with trailer modal and 3D viewer.
- `components.html` — live documentation for UI partials (requires auth guard for gated folders).
- `dashboard.html` — member storage, profile editor, Supabase-driven uploads.
- `admin-user-management.html` — admin console hitting the `admin-users` edge function.
- `pages/search.html` — Minisearch-rendered search results (empty until `/content/` is populated).

## 🔐 Supabase Integration
- Environment variables resolved via `scripts/generate-env.js` → `assets/js/env.js`.
- `supabase/env.js` supports Deno (edge), Node (tests/scripts), and browser import fallbacks.
- Edge functions: `admin-users` (user management) and `secure-storage` (uploads).
- Database tables: `public.profiles`, `public.folder_access`, `private.profile_audit`, `private.admin_action_log`.
- Storage buckets: `avatars` (public) and `user-data` (private).

Troubleshoot with `js/supabase-logger.js` (Konami/tap to open overlay) and the Vitest suite in `/tests`.

## 🔍 Search Workflow
1. Add Markdown to `/content/` (front matter optional) or static pages under `/pages/`.
2. Run `npm run build:search` to regenerate `public/search/index.json` + `docs.json`.
3. `src/js/search.js` powers auto-complete; `src/js/search-results.js` renders the results page.

> **Reality Check:** The repo currently ships empty search payloads because `/content/` is not checked in. Seed content before demoing the feature.

## 🚀 Development & Deployment
- `npm install` (or `./scripts/local_setup.sh`) installs dependencies and compiles Sass once.
- `npm run watch` (or `./scripts/start_dev.sh`) watches Sass and launches `netlify dev` locally.
- `npm run build` runs search → env → image manifest → Sass in sequence.
- `npm test` executes Vitest specs for Supabase helpers, auth guard, and Netlify redirects.
- Deploy by pushing to the `main` branch (Netlify) or running `npm run deploy` with Netlify CLI auth.

## 📚 Documentation Index
- **Audit & status:** `docs/REPORT_SITE_DOC_AUDIT.md`
- **Structure & components:** `docs/SITE_STRUCTURE.md`, `docs/UI_COMPONENTS.md`, `docs/FILE_STRUCTURE.md`
- **Design system:** `docs/STYLE_GUIDE.md`
- **Build & ops:** `docs/BUILD_PIPELINE.md`, `docs/indexing-strategy.md`
- **Supabase:** `docs/SUPABASE_INTEGRATION.md`, `docs/supabase.md`, `docs/supabase/README.md`
- **Changelog:** `docs/CHANGELOG_DOC_SYNC.md`

Stay bold, stay accurate—keep docs in lockstep with the code.
