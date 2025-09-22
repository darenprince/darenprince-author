# 🔐 Supabase Integration Overview

_Last updated: 2025-02-15_

This guide documents how Supabase is wired across the repo—environment variables, client helpers, schema, storage, and edge functions.

## Environment variables

| Variable                          | Purpose               | Consumed by                                                              |
| --------------------------------- | --------------------- | ------------------------------------------------------------------------ |
| `SUPABASE_DATABASE_URL`           | Project REST URL      | `scripts/generate-env.js`, `supabase/env.js`, edge functions             |
| `SUPABASE_URL`                    | Legacy URL alias      | Fallback for env resolver                                                |
| `SUPABASE_ANON_KEY`               | Public anon key       | Same as above                                                            |
| `SUPABASE_SERVICE_ROLE_KEY`       | Service role key      | `scripts/bootstrap-admin.js`, administrative scripts                     |
| `SUPABASE_JWT_SECRET`             | JWT secret            | Required by Supabase auth; set in Netlify even if not read directly here |
| `NEXT_PUBLIC_SUPABASE_URL`        | Optional alias        | Fallback for env resolver                                                |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`   | Optional alias        | Fallback for env resolver                                                |
| `PUBLIC_SUPABASE_URL`             | Runtime/browser alias | Fallback for env resolver                                                |
| `PUBLIC_SUPABASE_ANON_KEY`        | Runtime/browser alias | Fallback for env resolver                                                |
| `PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Runtime/browser alias | Fallback for env resolver                                                |

`scripts/generate-env.js` resolves the URL + anon key (preferring the public aliases when provided) and writes `assets/js/env.js` for browser imports. It never serializes the service-role key.

`supabase/env.js` checks `Deno.env`, `process.env`, then `../assets/js/env.js` so the same helper works in edge functions, Node scripts/tests, and the browser.

> **Reality Check:** There is no hard-coded Supabase project ID. Every environment must provide URL + anon key explicitly to avoid leaking credentials.

## Client helpers

| File                                        | Role                                                                                                               |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `supabase/client.js` / `supabase/client.ts` | Instantiate the Supabase client with top-level await; log warnings when env vars are missing.                      |
| `js/supabase-helper.js`                     | Provides `getSupabase(onMissing)` to gate UI buttons until credentials exist and defines `SUPABASE_SETUP_MESSAGE`. |
| `js/supabase-logger.js`                     | Wraps client calls, persists logs, and exposes a Konami/tap-triggered overlay for debugging without a console.     |
| `js/user-role.js`                           | Normalizes roles (`member`, `developer`, `admin`) and fetches `public.profiles.role` when metadata is missing.     |
| `js/auth-guard.js`                          | Protects gated pages by checking session, role, and folder access before revealing content.                        |

## Database schema

Migrations in `supabase/migrations` define the following objects:

| Object                     | Description                                                                                                                                                                                         |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `public.profiles`          | Profile metadata synced from `auth.users` (first/last name, phone, shipping, avatar URL, role). Owner policies enforce `auth.uid() = user_id`. Trigger `sync_profile_from_auth` keeps rows aligned. |
| `public.folder_access`     | Grants per-user access to gated folders/files. Owner policies allow users to manage their own rows.                                                                                                 |
| `private.profile_audit`    | Immutable audit log capturing profile inserts/updates/deletes via `log_profile_change`.                                                                                                             |
| `private.admin_action_log` | Tracks every admin action from the console (role change, folder update, reset, deletion).                                                                                                           |
| Storage buckets            | `avatars` (public `<user_id>.jpg`), `user-data` (private `<user_id>/<filename>`); row-level policies enforce user ownership.                                                                        |

## Folder access model

- `js/folder-catalog.js` defines the canonical folder IDs: `components`, `style-classes`, `image-index`, `components/book-details`, `press-kit`.
- `js/auth-guard.js` uses the catalog to check `public.folder_access` grants before showing a page unless the user has an elevated role.
- Elevated roles (`developer`, `admin`) bypass folder checks.

## Edge functions

### `supabase/functions/admin-users/index.ts`

- Validates caller as an admin via `public.profiles`.
- `GET` lists auth users joined with profile + folder access data.
- `POST action=update-role` updates both `public.profiles.role` and auth metadata.
- `POST action=set-folder-access` rewrites folder grants with whitelist validation.
- `POST action=send-password-reset` generates recovery links.
- `POST action=delete-user` removes storage objects (`avatars`, `user-data`), folder rows, profile, and auth user.
- Logs every action to `private.admin_action_log`.

### `supabase/functions/secure-storage/index.ts`

- Accepts authenticated uploads to Supabase Storage, storing files under `<user.id>/<filename>`.
- Rejects missing params and unauthorized requests.

Deploy functions with `supabase functions deploy admin-users secure-storage` after updating code.

## Frontend flows

| Surface             | Files                                                                        | Supabase usage                                                                                                      |
| ------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Auth portal         | `login.html`, `js/auth.js`, `js/password-strength.js`                        | Sign in/up, password reset, role-based redirects.                                                                   |
| Member dashboard    | `dashboard.html`, `js/dashboard.js`                                          | Session enforcement, storage listing/upload (`avatars`, `user-data`), profile updates.                              |
| Admin console       | `admin-user-management.html`, `js/admin-user-console.js`, `js/auth-guard.js` | Lists users, edits roles, manages folder access, triggers resets/deletions via `admin-users` function.              |
| Auth guard surfaces | `components.html`, `style-classes.html`, `admin-dashboard.html`, prototypes  | `enforceAuthGuard` hides `.site-wrap` until session/role checks pass; redirects unauthorized users to `login.html`. |

## Bootstrap & tooling

- `scripts/bootstrap-admin.js` uses the service role key to create/elevate an admin user, sync metadata, and print credentials.
- `scripts/deploy-supabase.js` orchestrates `supabase db push` plus function deploys; wire it up via `npm run deploy:supabase` or the chained `npm run deploy:auto`.
- `tests/` (Vitest) cover env resolution, auth guard behavior, storage helpers, the deployment orchestrator, and Netlify rules. Run `npm test` after editing Supabase helpers or migrations.

## Operational guardrails

> **Reality Check:** Missing Supabase env vars disable login buttons (`SUPABASE_SETUP_MESSAGE`) and trigger `js/supabase-logger.js` warnings. Set env vars before QA demos.

> **Reality Check:** Search payloads ship empty today; even authenticated search surfaces show nothing until `/content/` is populated.

## New environment checklist

- [ ] Install Supabase CLI (`npm install -g supabase`) and authenticate (`supabase login`).
- [ ] Configure `.env` with URL, anon key, service role key, JWT secret.
- [ ] Run `supabase db push` to apply migrations in `supabase/migrations/`.
- [ ] Deploy edge functions: `supabase functions deploy admin-users secure-storage`.
- [ ] Execute `node scripts/bootstrap-admin.js --email you@example.com --name "Admin User"` to seed an admin account.
- [ ] Run `npm run build` and `npm test` to verify env wiring.
