# 📁 File Structure Cheatsheet

_Last updated: 2025-02-14_

Use this as a quick reference when navigating the repository or onboarding collaborators.

```
.
├── assets/                     # Compiled CSS, JS, imagery, icons, press kit
│   ├── styles.css              # Generated via Sass (`scss/styles.scss`)
│   └── image-manifest.json     # Output from `scripts/generate-image-manifest.js`
├── components/                 # HTML demos + partials for marketing and dashboard UI
├── docs/                       # Project documentation (build pipeline, migration plan, style guides)
├── js/                         # Browser modules (nav, auth placeholders, dashboards, utilities)
│   ├── auth-service.js         # Placeholder interface for future authentication provider
│   ├── auth.js                 # Login/signup UI logic + migration messaging
│   ├── auth-guard.js           # Displays downtime overlays on gated pages
│   ├── dashboard.js            # Member dashboard placeholder (disables uploads, shows notices)
│   ├── admin-user-console.js   # Admin console placeholder (renders migration status)
│   ├── profile-dropdown.js     # Avatar dropdown + login redirect while auth is offline
│   ├── ui.js                   # Toast/progress helpers exposed globally
│   └── ...                     # Book demos, hero controllers, password strength helpers
├── pages/                      # Standalone HTML shells (e.g., search results)
├── scss/                       # Modular Sass (tokens, base, layout, components, utilities)
├── scripts/                    # Node utilities (icon generation, image manifest, setup scripts)
├── src/                        # Search worker + Minisearch build scripts
├── tests/                      # Vitest suites (redirect rules, OG image automation)
├── netlify/                    # Netlify Functions (contact email handler)
└── package.json                # npm scripts + dependencies
```

## Key directories & files

### `/js/`

- `auth-service.js` — central auth placeholder returning downtime status.
- `auth.js` — login/signup UI (delegates to the placeholder for future provider swap).
- `auth-guard.js` — ensures gated pages surface migration messaging.
- `dashboard.js` — disables forms/uploads and shows the migration card.
- `admin-user-console.js` — renders downtime notice in the admin console shell.
- `profile-dropdown.js` — toggles the avatar menu and routes to login while auth is offline.
- `ui.js` — toast and progress helpers attached to `window.GameOnUI`.
- `password-strength.js` — password meter + validation shared across auth forms.

### `/scripts/`

- `generate-icons.mjs` — builds favicons, Apple touch icons, and startup images.
- `generate-image-manifest.js` — catalogues imagery for internal reference tools.
- `local_setup.sh` — bootstraps dependencies and runs an initial Sass build.
- `start_dev.sh` — kicks off the watch task and launches `netlify dev`.

### `/docs/`

- `BUILD_PIPELINE.md` — npm scripts, Netlify configuration, deployment checklist.
- `SITE_STRUCTURE.md` — page inventory, module mapping, migration state for auth surfaces.
- `data-platform-migration.md` — roadmap for reintroducing authentication + database features.
- `STYLE_GUIDE.md`, `UI_COMPONENTS.md`, `FILE_STRUCTURE.md` (this doc) — brand and component references.

### `/tests/`

- `netlify-rules.spec.ts` — validates redirect rules and headers.
- `og-image.spec.ts` — ensures Open Graph automation builds as expected.

## Generated artifacts

- `assets/styles.css` — compiled CSS. Run `npm run build` or `npm run watch` after editing Sass.
- `assets/image-manifest.json` — output of `npm run generate:images`.
- `public/search/*.json` — Minisearch payloads from `npm run build:search`.

> **Reality Check:** With the data platform offline, no scripts should attempt to read or write runtime credentials. Keep `.env` limited to SendGrid and analytics keys until the new provider is ready.
