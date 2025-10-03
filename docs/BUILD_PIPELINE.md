# 🏗 Build & Deployment Pipeline

_Last updated: 2025-02-14_

This doc captures how assets are generated locally and in Netlify. Follow it before adjusting npm scripts or automation.

## NPM scripts

| Script               | Command                                                                                                                                                | Purpose                                                                                           | Notes                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------- | ------------------------------ |
| `build:search`       | `node ./src/search/build-index.mjs`                                                                                                                    | Build Minisearch index + docs payload (`public/search/*.json`).                                   | Requires Markdown under `/content/`; currently indexes 0 docs until content exists.         |
| `generate:icons`     | `node scripts/generate-icons.mjs`                                                                                                                      | Produce favicons, Apple touch icons, and inline head snippet from `assets/icons/icon-master.PNG`. | Updates `/assets/icons/generated` and refreshes head markup inside HTML templates.          |
| `generate:images`    | `node scripts/generate-image-manifest.js`                                                                                                              | Catalog `/assets/**/*.{png,jpg,jpeg,gif,svg,webp}` into `assets/image-manifest.json`.             | Powers `image-index.html` and press tooling.                                                |
| `build`              | `npm run build:search && node scripts/generate-env.js && npm run generate:icons && npm run generate:images && sass scss/styles.scss assets/styles.css` | Full local build.                                                                                 | Emits Supabase warnings when env vars missing; still writes placeholder `assets/js/env.js`. |
| `watch`              | `node scripts/generate-env.js && npm run generate:icons && npm run generate:images && sass scss/styles.scss assets/styles.css --watch`                 | Rebuild CSS + env on file changes.                                                                | Run alongside `netlify dev` during development.                                             |
| `test`               | `vitest run`                                                                                                                                           | Run Supabase/env/auth/redirect unit tests.                                                        | Requires Node 18+; no secrets needed.                                                       |
| `prepare`            | `command -v sass >/dev/null 2>&1                                                                                                                       |                                                                                                   | npm install --no-save sass`                                                                 | Ensure Dart Sass is present. | Runs automatically on install. |
| `deploy`             | `netlify deploy --prod --site darenprince.netlify.app`                                                                                                 | Manual Netlify deploy.                                                                            | Requires `netlify login`.                                                                   |
| `postprocess:assets` | `node optimize-images.js --root .`                                                                                                                     | Optional image optimization pass.                                                                 | Use after importing large imagery.                                                          |
| `postprocess:seo`    | `node seo-enrich.js --root . --domain $DOMAIN`                                                                                                         | Optional metadata enrichment.                                                                     | Requires `DOMAIN` env var for canonical URLs.                                               |

> **Reality Check:** Netlify’s `build` command (in `netlify.toml`) runs `node scripts/generate-env.js`, `node scripts/generate-icons.mjs`, and Sass. Run `npm run build:search` and `npm run generate:images` locally before commit to keep search and manifest artifacts fresh.

## Environment file generation

- `scripts/generate-env.js` reads `SUPABASE_DATABASE_URL`, `SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_DATABASE_URL`, plus anon key aliases (`SUPABASE_ANON_KEY`, `SUPABASE_PUBLIC_ANON_KEY`, `PUBLIC_SUPABASE_ANON_KEY`, `PUBLIC_SUPABASE_PUBLISHABLE_KEY`) and writes `assets/js/env.js`.
- Outputs named exports and attaches `window._env_` for legacy scripts.
- Warns if URL or anon key are missing but still writes placeholder strings (empty) so imports do not crash.

## Supabase env resolution

- `supabase/env.js` resolves config in this order: `Deno.env` (edge functions) → `process.env` (Node scripts/tests) → dynamic import of `../assets/js/env.js` (browser fallback).
- `resolveSupabaseConfig()` returns `{ url, key }` strings (empty when unresolved). `resolveSupabaseConfigSync()` handles synchronous scripts.

## Netlify configuration

`netlify.toml`:

```toml
[build]
  publish = "./"
  command = "node scripts/generate-env.js && node scripts/generate-icons.mjs && sass scss/styles.scss assets/styles.css"
[[plugins]]
  package = "@netlify/plugin-emails"
```

- Netlify environment variables must include SendGrid credentials: `SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL`, and either
  `SENDGRID_CONTACT_TO` or `SENDGRID_TO_EMAIL` (defaults to the from address). These power the contact form function and route
  payloads that now include topic, urgency, preferred channel, and source metadata.
- Configure Netlify env vars (`SUPABASE_DATABASE_URL`, `SUPABASE_ANON_KEY`, etc.) to match local settings.
- When search or image manifests change, commit the generated JSON so Netlify serves updated data.

## Local development workflow

1. `./scripts/local_setup.sh` — installs dependencies, ensures Sass, and compiles `assets/styles.css` once.
2. `./scripts/start_dev.sh` — runs `npm run watch` in the background then launches `netlify dev` (requires Netlify CLI).
3. Development loop:
   - Edit Sass → watch task rebuilds automatically.
   - Update env vars → rerun `node scripts/generate-env.js`.
   - Add/remove assets → rerun `npm run generate:images`.
   - Update icon artwork → rerun `npm run generate:icons`.
   - Update content/pages → rerun `npm run build:search`.

## Search index lifecycle

1. Add Markdown to `/content/` or HTML to `/pages/`.
2. Run `npm run build:search` (Minisearch logs document counts and payload size).
3. Commit `public/search/index.json` and `public/search/docs.json`.

> **Reality Check:** Until `/content/` is populated, `build:search` logs “Indexed 0 documents.” Ship content before showcasing search.

## Image management

- `scripts/generate-image-manifest.js` should run after adding/removing assets; the manifest powers `image-index.html` and admin tooling.
- `optimize-images.js` can shrink heavy assets post-import; not part of default build.

## Testing & quality gates

- `npm test` — Vitest suites covering Supabase env resolution, auth flows, storage helpers, Netlify redirect rules.
- `npm run build` — Quick smoke test (watch for Sass deprecation warnings when upgrading Dart Sass).
- Supabase CLI (not bundled) — Use `supabase db push` and `supabase functions deploy` when schema or edge functions change.

## Deployment checklist

- [ ] Populate `.env` (local) and Netlify env vars with Supabase URL + anon key.
- [ ] Run `npm run build` to regenerate CSS, env.js, search index, and image manifest.
- [ ] Commit generated artifacts (`assets/styles.css`, `assets/js/env.js`, `assets/image-manifest.json`, `public/search/*.json`).
- [ ] Push to `main` (Netlify auto-deploy) or run `npm run deploy`.
- [ ] After deploy, smoke-test auth flows (login, dashboard, admin console) and ensure Supabase warnings do not appear.
