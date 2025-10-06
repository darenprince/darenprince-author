# 🖥️ Daren Prince Author Platform & Website

_Last updated: 2025-02-14_

Welcome to the development hub for **Daren M. Prince**, bestselling author of _Game On! Master the Conversation & Win Her Heart_. This repository houses the public marketing site, live component demos, and the private dashboards that power the brand’s ecosystem.

- **Live Site:** [darenprince.netlify.app](https://darenprince.netlify.app)
- **Documentation Folder:** [`/docs`](./docs/)
- **Game On! Press Kit:** [`/assets/brand/`](./assets/brand/)

---

## ⚡️ Mission

This project exists to:

- Spotlight the book catalog with cinematic hero treatments and interactive tooling.
- Deliver confident, psychology-backed messaging that matches the Game On! identity.
- Provide a single source of truth for brand tokens, layouts, and reusable UI.
- Prepare for member-only experiences without exposing unfinished surfaces.
- Keep deploys fast, automated, and ready for the upcoming data platform relaunch.

---

## 🔧 Stack Overview

| Layer         | Details                                                                                                                          |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Markup        | Static HTML pages (`index.html`, `book.html`, `components.html`, dashboards, prototypes)                                         |
| Styles        | Modular Sass in `scss/` compiled to `assets/styles.css` via Dart Sass (dark mode by default)                                     |
| JavaScript    | Vanilla ES modules in `/js` plus Minisearch worker in `/src/search`                                                              |
| Data platform | Authentication and storage provider under migration (see [`docs/data-platform-migration.md`](./docs/data-platform-migration.md)) |
| Build tooling | Node 20+, npm scripts (see [`docs/BUILD_PIPELINE.md`](./docs/BUILD_PIPELINE.md)), Netlify CLI                                    |
| Search        | Minisearch index built from `/content/**/*.md` and `/pages/**/*.html`                                                            |

> **Reality Check:** Netlify’s build command only runs Sass compilation and environment generation. Run `npm run build:search` and `npm run generate:images` locally before committing if you need refreshed search or image manifests.
>
> **USWDS Sass modules:** The Sass build passes `--load-path=node_modules/@uswds/uswds/packages` so that components under `scss/` can `@use` and `@forward` USWDS packages directly. Keep the `@uswds/uswds` dependency installed before running `npm run build` or `npm run watch`.

---

## 🧭 Navigation, Theme & UI Utilities

- `js/main.js` manages the mega menu, search toggle, and auth defaults.
- `js/theme-toggle.js` wires the dark/light switch. Marketing pages ship with the toggle; admin utilities may omit it to save space.
- `js/profile-dropdown.js` toggles the profile menu and routes visitors to login while auth is offline.
- `js/ui.js` exposes toast + progress helpers:
  ```html
  <script type="module" src="/js/ui.js"></script>
  ```
  ```javascript
  GameOnUI.showToast('Saved!', 'success')
  const bar = document.querySelector('.progress')
  GameOnUI.showProgress(bar)
  GameOnUI.setProgress(bar, 50)
  ```
- `components.html` still references `./js/mobile-nav.js`, but that file was removed. Remove the tag or restore the module to avoid 404s.

---

## 🎨 Design System

Brand identity is governed by the Game On! press assets and CodyHouse-inspired SCSS architecture.

**Fonts**

- Futura Bold (Primary headline)
- Helvetica Medium (Secondary headline / navigation)
- Knockout Welterweight (Accents & stylized labels)
- Helvetica Now (Body, system, utility)

> **Reality Check:** League Spartan appears in `.styledh1`. Load the font before using that class publicly, or accept the Helvetica fallback.

**Color Palette**

- `#FDFDFD` White
- `#D5D5D5` Light Gray
- `#B8BAB7` Medium Gray
- `#3B3C3B` Charcoal
- `#070A06` Black
- `#456F3A` Deep Green
- `#6DA667` Medium Green
- `#87BD72` Bright Green
- `#8CD679` Light Lime Green
- `#C2E9C1` Mint Green

Design principles: bold, dark-mode-first, generous spacing, masculine energy, no gimmicks.

**Tokens & Variables**

- CSS custom properties live in `scss/tokens/_css-vars.scss` and include light theme overrides for the toggle.
- Sass bindings live in `scss/tokens/_colors.scss`. Reference these tokens throughout components so color changes stay centralized.
- Utility classes (spacing, flex, typography) reside in `scss/utilities/_helpers.scss`.

_Adding a new token_

1. Declare `--color-name` in `_css-vars.scss`.
2. Map it in `_colors.scss` (`$name: var(--color-name);`).
3. Run `npm run build` to refresh the compiled CSS.

> Do not edit existing tokens unless explicitly requested. Prefer adding new variables or utility classes.

---

## 🌐 Site & File Structure

```plaintext
📁 /assets/         # Logos, icons, images, compiled CSS
📁 /scss/           # Modular SCSS (base, layout, components, utilities)
📁 /js/             # Custom scripts (nav, theme toggle, auth placeholders, UI utilities)
📁 /member/         # Gated content area (future)
📁 /docs/           # Prompts, logic, visual guides, build notes, audits
📁 /pages/          # Additional static page entries (e.g., search results)
📄 index.html       # Homepage
📄 components.html  # Master demo sheet for UI components
📄 setup.sh         # Local setup script
📄 netlify.toml     # Redirect and build config
```

**Apple icon workflow**

- Favicons, Apple touch icons, and launch screens are generated from `assets/icons/icon-master.PNG` via `scripts/generate-icons.mjs`.
- Run `npm run generate:icons` whenever the master icon changes to refresh `/assets/icons/generated` and inline head snippets.
- Netlify executes the same script during deploys (`netlify.toml` build command) so committed HTML stays in sync.

---

## Smart App Banner

- Test in Safari on iPhone and iPad
- Confirm the custom Game On banner appears with the book art, Apple-inspired typography, and CTA
- Tapping **View** launches Apple Books directly to the Game On listing
- Dismiss the banner and verify it stays hidden on reload (local storage)
- Install the PWA and confirm the banner remains hidden in the standalone view

---

## 🧩 Component & Page Highlights

Consult [`docs/SITE_STRUCTURE.md`](./docs/SITE_STRUCTURE.md) and [`docs/UI_COMPONENTS.md`](./docs/UI_COMPONENTS.md) for full coverage. Key surfaces include:

- `index.html` — hero rail, featured book CTA, testimonials, contact capture.
- `book.html` — tabbed format selector with trailer modal and 3D viewer.
- `components.html` — live documentation for UI partials (add auth guard before exposing gated folders).
- `dashboard.html` — member dashboard placeholder with migration messaging.
- `admin-user-management.html` — admin console backed by the `admin-users` edge function.
- `pages/search.html` — Minisearch-rendered results (requires seeded `/content/`).

---

## 🔄 Data Platform Migration

The previous database integration has been fully retired. Authentication, storage, and admin tooling are paused while we select and wire up a new provider. During this window:

- UI surfaces now display clear migration messaging instead of warning dialogs.
- All scripts import from `js/auth-service.js`, which returns `null` until the new provider is ready.
- Build scripts no longer generate runtime credentials or call legacy database CLIs.

_What to do next_

1. Review [`docs/data-platform-migration.md`](./docs/data-platform-migration.md) for milestones, required environment variables, and sequencing guidance.
2. Draft integration adapters under `js/` that conform to the `auth-service` interface before re-enabling secure routes.
3. Update `.env` with the new provider keys once available (see `.env.example`).

---

## 🔍 Search Workflow

1. Add Markdown to `/content/` (front matter optional) or static pages under `/pages/`.
2. Run `npm run build:search` to regenerate `public/search/index.json` and `docs.json`.
3. `src/js/search.js` powers auto-complete; `src/js/search-results.js` renders search results.

> The repository ships empty search payloads because `/content/` is not tracked. Seed content before demoing search.

---

## ✍️ Voice & Content Rules

The brand voice is confident, real, psychology-backed, and emotionally intelligent. Approved phrases:

- “Master the conversation”
- “Authentic attraction”
- “Magnetic energy”
- “Unfiltered honesty”
- “Modern dating decoded”
- “Conversations that hit different”

Use bold, magnetic copy. Avoid fluff, gimmicks, or generic advice.

---

## 🚀 Development & Deployment

```bash
./scripts/local_setup.sh   # install deps and compile once
./scripts/start_dev.sh     # watch files & launch Netlify dev server
npm run build              # build search → icons → images → Sass
npm run watch              # watch Sass and run Netlify dev
npm test                   # run Vitest suite
```

Local preview with Netlify CLI:

```bash
npm install -g netlify-cli
netlify dev
```

Pushing to `main` triggers Netlify CI/CD. Environment variables can now be managed directly in Netlify without additional integrations.

### Pull request previews on GitHub Pages

- Workflow: [`.github/workflows/deploy-pr-preview.yml`](./.github/workflows/deploy-pr-preview.yml) installs [Deploy PR Preview](https://github.com/marketplace/actions/deploy-pr-preview) so every in-repo pull request publishes a temporary GitHub Pages build under `pr-preview/pr-<number>/`.
- Configure **Settings → Pages** to deploy from the `gh-pages` branch (or update `preview-branch` in the workflow to match your Pages branch).
- Grant the repository **Actions → General → Workflow permissions → Read and write** access so the action can push preview commits and update sticky comments.
- The workflow skips forked pull requests until upstream support lands in the action; local branches within this repo receive previews automatically.
- Closing a pull request automatically removes its preview, keeping the `gh-pages` branch tidy.

### Dashboard Access on Netlify

1. Deploy the site and review `/login.html` to confirm migration messaging is visible.
2. Disable access toggles in Netlify until the new provider is wired up.
3. Track progress in [`docs/data-platform-migration.md`](./docs/data-platform-migration.md).

---

## 📚 Documentation Index

- **Audit & status:** [`docs/REPORT_SITE_DOC_AUDIT.md`](./docs/REPORT_SITE_DOC_AUDIT.md)
- **Structure & components:** [`docs/SITE_STRUCTURE.md`](./docs/SITE_STRUCTURE.md), [`docs/UI_COMPONENTS.md`](./docs/UI_COMPONENTS.md), [`docs/FILE_STRUCTURE.md`](./docs/FILE_STRUCTURE.md)
- **Design system:** [`docs/STYLE_GUIDE.md`](./docs/STYLE_GUIDE.md)
- **Build & ops:** [`docs/BUILD_PIPELINE.md`](./docs/BUILD_PIPELINE.md), [`docs/indexing-strategy.md`](./docs/indexing-strategy.md)
- **Data platform:** [`docs/data-platform-migration.md`](./docs/data-platform-migration.md)
- **Changelog:** [`docs/CHANGELOG_DOC_SYNC.md`](./docs/CHANGELOG_DOC_SYNC.md)

Stay bold, stay accurate—keep docs in lockstep with the code.

---

## 🔒 Licensing

Protected under [CC BY-NC 4.0](http://creativecommons.org/licenses/by-nc/4.0/).

> No commercial reuse. No alteration of branding. Attribution required.

---

## 📬 Contact

- Official Site: [darenprince.com](https://darenprince.com)
- Press & Media: [press@darenprince.com](mailto:press@darenprince.com)
- Publisher: [publishing@darenprince.com](mailto:publishing@darenprince.com)

---

Built with 🔥 by Daren Prince & OpenAI Codex
