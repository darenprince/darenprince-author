# Supabase Integration Playbook

This project is wired to the Supabase project `ogftwcrihcihqahfasmg`. The migrations in `/supabase/migrations` have already been executed in the hosted database, so the schema below reflects production reality. Use this guide to understand how the client is initialised, how auth gates work across the site, and what is left to build next.

## Runtime configuration

The browser client resolves environment variables in this order:

1. `Deno.env` (edge functions)
2. `process.env` (Node-based tooling)
3. `assets/js/env.js` (statically generated for the browser)

Set the following keys locally or in Netlify:

```bash
SUPABASE_DATABASE_URL=<https://YOUR-PROJECT.supabase.co>
SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role>
SUPABASE_JWT_SECRET=<jwt-secret>
```

`npm run build` automatically regenerates `assets/js/env.js` with the URL + anon key so the public bundle stays lean. Additional aliases (`NEXT_PUBLIC_SUPABASE_URL`, etc.) are supported by `supabase/env.js`.

## Repo structure

```text
supabase/
├── client.js                # Browser ESM client (used by UI scripts)
├── client.ts                # Deno client for edge functions
├── env.js / env.d.ts        # Environment resolution helpers
├── functions/
│   └── secure-storage/
│       └── index.ts         # Authenticated upload handler
├── migrations/
│   ├── 0001_create_profiles.sql
│   ├── 0002_create_folder_access_and_policies.sql
│   └── 0003_update_profile_sync.sql
├── sql_editor_setup.sql     # Enables required extensions + helper schema
└── supabase-integration.md  # This playbook
```

## Database & RLS snapshot

### `auth.users`
Seeded by Supabase authentication. A trigger defined in `0001_create_profiles.sql` keeps `public.profiles` in sync via `sync_profile_from_auth`.

### `public.profiles`
Stores the public profile for every authenticated user.

| column      | type      | notes                                      |
|-------------|-----------|---------------------------------------------|
| `id`        | uuid      | Primary key, mirrors `auth.users.id`       |
| `email`     | text      | Automatically copied from auth metadata    |
| `role`      | enum      | `member`, `developer`, or `admin`          |
| `first_name`, `last_name`, `phone`, `shipping_address`, `birthdate` | text/date | Optional metadata |
| `created_at`| timestamptz | Default `now()`                          |

Row level security allows users to read/update only their own row.

### `public.folder_access`
Grants per-user access to restricted content buckets. Records are simple `{ id, user_id, file_name, created_at }`. Authenticated users can select/insert/update/delete rows for their own `user_id` only.

The new front-end guard uses this table to decide whether a signed-in member can view `components.html`, `style-classes.html`, `image-index.html`, and other engineering surfaces. Elevated roles (`developer`, `admin`) bypass folder checks automatically.

### Storage buckets

- `avatars` (public) – One JPEG per user (`<user_id>.jpg`)
- `user-data` (private) – User-owned file tree (`<user_id>/<filename>`)

Row level security on `storage.objects` enforces bucket ownership.

## Client usage

`js/auth-guard.js` is the central gatekeeper. Pages that previously relied on the static password overlay now import:

```html
<script type="module">
  import { enforceAuthGuard } from './js/auth-guard.js';
  enforceAuthGuard({
    requiredFolders: ['components'],
    loadFolderAccess: true,
  });
</script>
```

`requiredFolders` should match the `file_name` values inserted into `public.folder_access`. For example:

| Page                                   | Required folder key            |
|----------------------------------------|--------------------------------|
| `components.html`                      | `components`                   |
| `style-classes.html`                   | `style-classes`                |
| `image-index.html`                     | `image-index`                  |
| `components/book-details-tab-demo.html`| `components/book-details`      |
| `admin-dashboard.html`                 | *no folder* (requires elevated role) |

The guard will:

1. Resolve the Supabase client via `supabase/client.js`.
2. Redirect to `login.html?redirect=/requested/page` if the session is missing.
3. Fetch the signed-in user’s role via `public.profiles`.
4. Load the user’s folder grants when required.
5. Reveal the page (`.site-wrap`) once authorised or display a branded blocker with next steps when access is denied.

Successful authorisations emit `window` events:

- `auth:ready` – `{ supabase, user, role, folderAccess }`
- `auth:denied` – `{ reason, role?, folderAccess? }`

Hook into these events for future dynamic tooling.

## Authentication UX

`login.html` uses `js/auth.js` to handle sign-in/sign-up, password resets, and redirect flows. If a guard sends a visitor to the login screen with `?redirect=/components.html`, the login script now returns them to that page after a successful role check. Elevated-only destinations fall back to the member dashboard when a user lacks permissions.

## Edge function

`supabase/functions/secure-storage/index.ts` validates bearer tokens with Supabase Auth before streaming uploads into the requested bucket. The function expects a `multipart/form-data` payload with `file` and `bucket` fields.

## Validation checklist

The following SQL sanity checks have been executed against the live database (see task log). Highlights:

- Profiles are automatically created for every auth user (`sync_profile_from_auth` trigger).
- `profile_role` enum + `role` column exist and default to `member`.
- `folder_access` table & RLS policies allow users to manage their own folder permissions.
- Storage buckets `avatars` and `user-data` exist with row-level security enabled.

Re-run the validation block in the Supabase SQL editor after migrations or policy changes.

## Follow-up build order: Admin user management console

A dedicated management surface still needs to be built inside the admin dashboard. Requirements:

- List all users (email, role, created date, last sign-in when available).
- Toggle role assignments (`member` ↔ `developer` ↔ `admin`).
- Display folder access grants with interactive toggles per folder group.
- Provide buttons to reset passwords, trigger password recovery emails, or manually set a new password.
- Support user deletion (with confirmation and clean-up of storage objects/folder grants).
- Surface Supabase storage structure (buckets and folders) in the UI so admins understand what each toggle controls.
- Log every admin action to a Supabase table for auditing.

Add a new page in the `admin-dashboard` section that consumes `enforceAuthGuard({ requireElevated: true })` and surfaces these controls once the design is approved.

