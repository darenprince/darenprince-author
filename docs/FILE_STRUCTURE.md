# 🗂 Project File Structure

_Last updated: 2025-02-14_

This reference outlines the actual directories and key files in the repo. Use it alongside `docs/SITE_STRUCTURE.md` when onboarding or wiring automation.

## Root layout
```
/
├── assets/                  # Compiled CSS, generated env.js, imagery, press kits
├── scss/                    # Sass source (base, layout, components, utilities, themes)
├── js/                      # Browser modules (auth, dashboards, hero demos, helpers)
├── src/                     # Search worker + build scripts
├── scripts/                 # Node/python tooling (env generator, manifests, icons, admin bootstrap)
├── supabase/                # Client helpers, env resolver, migrations, edge functions
├── docs/                    # Documentation, prompts, audits
├── pages/                   # Search results shell (`search.html`)
├── public/search/           # Generated Minisearch payloads
├── tests/                   # Vitest suites
├── member/                  # Legacy member dashboard prototype
├── components/              # HTML demos (e.g., `book-details-tab-demo.html`)
├── *.html                   # Marketing, auth, dashboard pages
├── package.json             # npm scripts + dev dependencies
├── netlify.toml             # Netlify build command + plugin config
└── tsconfig.json            # TypeScript configuration for tests/functions
```

> **Reality Check:** The `/components/` directory now stores HTML demos only. All Sass partials live under `scss/components/` and compile through `scss/styles.scss`.

## Sass entry points
```
/scss
├── styles.scss              # Main entry importing tokens, base, layout, components, utilities, themes
├── style.scss               # Legacy mega-menu styles (imported by `scss/styles.scss` at the end)
├── base/                    # Variables, mixins, globals, typography, reset
├── layout/                  # Header, footer, grid, component nav, demo sections
├── components/              # 33 component partials (buttons, hero, book, dashboard, admin, search, etc.)
├── utilities/               # Spacing, typography, gradient helpers
├── tokens/                  # CSS custom properties + Sass bindings
└── themes/                  # Dark/light theme overrides
```

## JavaScript modules
```
/js
├── main.js                  # Mega menu, search toggle, auth toggle defaults
├── theme-toggle.js          # Dark/light toggle persistence
├── auth.js                  # Login/signup flows + redirects
├── auth-guard.js            # Protects gated pages using Supabase
├── dashboard.js             # Member dashboard interactions
├── admin-user-console.js    # Admin management UI (roles, folders, resets, deletes)
├── supabase-helper.js       # Safe Supabase accessor with UI messaging
├── supabase-logger.js       # Debug overlay + logging proxy
├── user-role.js             # Role normalization + profile fetch helpers
├── book-rail.js / book-tabs.js / book-3d-viewer.js / trailer-modal.js
├── hero-demos.js / hero-video.js / hero-auto-zoom.js
├── ui.js                    # Toast + progress utilities (exposed as `window.GameOnUI`)
└── ...                      # Additional modules (image index, contact form helpers, etc.)
```

`src/js/` hosts browser-side search controllers (`search.js`, `search-results.js`). `src/search/` contains the worker, stopwords, synonyms, and build script.

## Supabase assets
```
/supabase
├── client.js / client.ts           # Supabase client factories
├── env.js / env.d.ts               # Environment resolution helpers
├── functions/
│   ├── admin-users/index.ts        # Admin API edge function
│   └── secure-storage/index.ts     # Authenticated storage uploads
├── migrations/
│   ├── 0001_create_profiles.sql
│   ├── 0002_create_folder_access_and_policies.sql
│   ├── 0003_update_profile_sync.sql
│   ├── 0004_profiles_audit.sql
│   └── 0005_admin_action_log.sql
└── sql_editor_setup.sql            # Legacy policy bootstrap (reference)
```

## Scripts directory
```
/scripts
├── generate-env.js                 # Writes assets/js/env.js from env vars
├── generate-image-manifest.js      # Builds assets/image-manifest.json
├── materialize-apple-assets.mjs    # Restores Apple icons from base64 sprite
├── check-apple-assets.mjs          # Validates Apple icon payload
├── bootstrap-admin.js              # Seeds/elevates admin user (service role required)
├── local_setup.sh                  # Installs deps + compiles Sass once
├── start_dev.sh                    # Watches Sass then runs `netlify dev`
└── optimize-images.js / seo-enrich.js / inject_apple_meta.py / generate_apple_icons.py
```

## Tests
```
/tests
├── auth.spec.ts                    # Auth guard + login behaviors
├── supabase-env.spec.ts            # Env resolver coverage
├── storage.spec.ts                 # Storage helper expectations
└── netlify-rules.spec.ts           # Redirect/header validation
```

## Generated artifacts to track
- `assets/styles.css` — compiled Sass
- `assets/js/env.js` — generated Supabase env payload
- `assets/image-manifest.json` — asset catalog for image index tooling
- `public/search/index.json` + `public/search/docs.json` — Minisearch payloads (empty until `/content/` is populated)

Keep these files committed after running `npm run build` so Netlify serves the latest versions.
