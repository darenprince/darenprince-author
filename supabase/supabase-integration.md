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
│   ├── 0003_update_profile_sync.sql
│   └── 0004_profiles_audit.sql
├── sql_editor_setup.sql     # Enables required extensions + helper schema
└── supabase-integration.md  # This playbook
```

## Database & RLS snapshot

### `auth.users`
Seeded by Supabase authentication. A security-definer trigger (`sync_profile_from_auth`) keeps `public.profiles` in sync whenever a user signs up or edits their metadata.

### `public.profiles`
Stores the public profile for every authenticated user. Recent restructuring introduced a surrogate identity primary key so we can attach audit logs without exposing UUIDs in the private schema.

| column        | type                  | notes                                                     |
|---------------|-----------------------|-----------------------------------------------------------|
| `id`          | `bigint` identity     | Surrogate primary key, used by triggers/auditing          |
| `user_id`     | `uuid`                | FK to `auth.users.id`, unique + indexed                   |
| `first_name`, `last_name` | `text`    | Optional personal data                                    |
| `phone`       | `text`                | Format validated by `phone_format_check`                  |
| `shipping_address` | `text`          | Optional contact info                                     |
| `avatar_url`  | `text`                | Mirrors metadata supplied during signup/profile updates   |
| `role`        | `profile_role` enum   | `member` (default), `developer`, or `admin`               |
| `created_at`  | `timestamptz`         | Defaults to `timezone('utc', now())`                      |

Row level security restricts all operations to the owning `auth.uid()` via consolidated policies:

- `Profiles: select owner`
- `Profiles: insert owner`
- `Profiles: update owner`
- `Profiles: delete owner`

### `public.folder_access`
Grants per-user access to restricted content buckets. Records are simple `{ id, user_id, file_name, created_at }`. Authenticated users can select/insert/update/delete rows for their own `user_id` only. Elevated roles (`developer`, `admin`) bypass folder checks automatically on the front end.

### `private.profile_audit`
Immutable audit log written by the trigger `trg_profiles_audit` whenever `public.profiles` changes. Columns capture the profile surrogate ID, the owning auth user ID, concatenated full name, avatar URL, phone number, action (`insert`/`update`/`delete`), timestamp, and the actor returned by `auth.uid()`. Execution of the security-definer function is revoked from the `public`, `anon`, and `authenticated` roles so only triggers (or privileged callers) can write to the table.

### Storage buckets

- `avatars` (public) – One JPEG per user (`<user_id>.jpg`)
- `user-data` (private) – User-owned file tree (`<user_id>/<filename>`)

Row level security on `storage.objects` enforces bucket ownership for both buckets.

## SQL deployment workflow

1. Apply migrations in order (including `0004_profiles_audit.sql`) using the Supabase CLI (`supabase db push`), the SQL Editor, or your migration runner with the service role connection string.
2. For manual execution, copy the relevant blocks from `supabase/sql_editor_setup.sql` into the SQL Editor. The file is idempotent and safe to re-run in staging/production.
3. Re-run the validation script provided in the project brief to confirm:
   - Each auth user has a matching profile row and vice versa.
   - `idx_profiles_user_id`, the `private.profile_audit` table, and the `trg_profiles_audit` trigger exist.
   - Consolidated RLS policies are active on `public.profiles` and `public.folder_access`.
   - Storage RLS remains intact for `avatars` and `user-data`.
4. Capture the executed SQL, test notes, and rollback plan in `docs/audit/PROFILES_AUDIT.md` (see new log file).

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
3. Fetch the signed-in user’s role via `public.profiles` (using `user_id`).
4. Load the user’s folder grants when required.
5. Reveal the page (`.site-wrap`) once authorised or display a branded blocker with next steps when access is denied.

Successful authorisations emit `window` events:

- `auth:ready` – `{ supabase, user, role, folderAccess }`
- `auth:denied` – `{ reason, role?, folderAccess? }`

Hook into these events for future dynamic tooling.

## Authentication UX

`login.html` uses `js/auth.js` to handle sign-in/sign-up, password resets, and redirect flows. If a guard sends a visitor to the login screen with `?redirect=/components.html`, the login script now returns them to that page after a successful role check. Elevated-only targets fall back to the member dashboard when a user lacks permissions. Metadata captured at signup (`first_name`, `last_name`, `phone`, `shipping_address`, optional `avatar_url`) is synchronised into `public.profiles` via the trigger.

## Edge function

`supabase/functions/secure-storage/index.ts` validates bearer tokens with Supabase Auth before streaming uploads into the requested bucket. The function expects a `multipart/form-data` payload with `file` and `bucket` fields.

## Validation checklist

The following SQL sanity checks should be executed after each deployment:

- Profiles automatically mirror auth users (`sync_profile_from_auth` trigger fires and audit rows are generated).
- `profile_role` enum exists, `profiles.role` defaults to `member`, and `idx_profiles_user_id` supports RLS queries.
- `private.profile_audit` contains rows for inserts/updates/deletes with `changed_by` set to the acting `auth.uid()` (service role executions may yield `NULL`).
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
- Surface Supabase storage structure (buckets and folders) in the UI so admins understand what each toggle controls).
- Log every admin action to a Supabase table for auditing.

Add a new page in the `admin-dashboard` section that consumes `enforceAuthGuard({ requireElevated: true })` and surfaces these controls once the design is approved.
