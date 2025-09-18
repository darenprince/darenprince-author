# 🔐 Supabase Integration

Supabase powers authentication, profile sync, secure storage, and now full auditing across the Daren Prince platform. The production project (`ogftwcrihcihqahfasmg`) already includes all migrations from `/supabase/migrations`, so the schema described here matches the live environment.

## ⚙️ Environment bootstrapping

`supabase/env.js` resolves credentials from three places (in order): `Deno.env`, `process.env`, and the generated `assets/js/env.js`. Run `npm run build` locally to refresh `assets/js/env.js` with the project URL + anon key before testing in the browser.

Set these variables in Netlify or your shell:

```bash
SUPABASE_DATABASE_URL=<https://YOUR-PROJECT.supabase.co>
SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role>
SUPABASE_JWT_SECRET=<jwt-secret>
```

Aliases such as `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` are supported automatically.

## 🗂️ Schema recap

### `public.profiles`
Mirror table for `auth.users`. A trigger (`sync_profile_from_auth`) creates or updates a row the moment an auth user appears. The table now uses a surrogate identity primary key (`id` bigint) alongside the `user_id` UUID reference to `auth.users`. Key columns:

- `user_id` (uuid, unique) – required FK to `auth.users.id`
- `first_name`, `last_name`, `phone`, `shipping_address`, `avatar_url`
- `role` (`profile_role` enum) – defaults to `member`, allows `developer` and `admin`
- `created_at` (timestamptz) – defaults to UTC `now()`

RLS is consolidated into:

- `Profiles: select owner`
- `Profiles: insert owner`
- `Profiles: update owner`
- `Profiles: delete owner`

Each policy uses `(SELECT auth.uid()) = user_id` to follow Supabase’s latest security guidance.

### `private.profile_audit`
Tracks every INSERT/UPDATE/DELETE on `public.profiles`. Trigger `trg_profiles_audit` calls a SECURITY DEFINER function that writes `{ profile_id, user_id, full_name, avatar_url, phone, action, changed_at, changed_by }` with the acting `auth.uid()`. Execution is revoked from the `public`, `anon`, and `authenticated` roles to prevent direct invocation.

### `public.folder_access`
Text-based permissions that gate engineering surfaces. Each row grants a user access to a named folder/page (`file_name`). Users can create/update/delete only their own entries. Elevated roles (`developer`, `admin`) bypass the check in the front-end guard.

### Storage buckets
- `avatars` (public) – one JPEG per user (`<user_id>.jpg`)
- `user-data` (private) – personal files (`<user_id>/<filename>`)

RLS rules defined in `0002_create_folder_access_and_policies.sql` plus the storage policy refresh inside `sql_editor_setup.sql` keep both buckets locked to their owners.

## 🧠 Client entry points

- `supabase/client.js` (browser ESM) and `supabase/client.ts` (Deno) create the shared client.
- `js/auth.js` handles sign-in/sign-up, redirect logic, and metadata sync.
- `js/auth-guard.js` enforces session, role, and folder checks before revealing gated pages.
- `supabase/functions/secure-storage/index.ts` validates bearer tokens before streaming uploads into Supabase Storage.

## 🛡️ Role & folder gating

Pages that were previously protected by a static password now import `js/auth-guard.js`:

```html
<script type="module">
  import { enforceAuthGuard } from './js/auth-guard.js';
  enforceAuthGuard({
    requiredFolders: ['components'],
    loadFolderAccess: true,
  });
</script>
```

Standard folder keys:

| Page                                   | Folder key             |
|----------------------------------------|------------------------|
| `components.html`                      | `components`           |
| `style-classes.html`                   | `style-classes`        |
| `image-index.html`                     | `image-index`          |
| `components/book-details-tab-demo.html`| `components/book-details` |
| `admin-dashboard.html`                 | *(role check only)*    |

Hook into `window` events:

- `auth:ready` – emitted after a successful check with `{ supabase, user, role, folderAccess }`.
- `auth:denied` – emitted whenever the guard blocks access.

## 🧾 SQL deployment & validation

1. Run the migrations in `/supabase/migrations` sequentially (CLI or SQL Editor). `0004_profiles_audit.sql` performs the schema restructuring, creates the audit trail, and refreshes policies.
2. For ad-hoc fixes, execute the corresponding blocks from `supabase/sql_editor_setup.sql`; it is idempotent and safe to re-run.
3. Re-run the validation script from the Supabase brief. Confirm:
   - `idx_profiles_user_id` exists and is used by RLS queries.
   - `private.profile_audit` receives rows for insert/update/delete with `changed_by` populated (service role executions may log `NULL`).
   - Consolidated profile and folder policies remain enabled.
   - Storage policies for `avatars` and `user-data` are still in place.
4. Document verification results, rollback plan, and next steps in `docs/audit/PROFILES_AUDIT.md`.

## 🔑 Authentication flow

`login.html` (powered by `js/auth.js`) respects the `redirect` query parameter so users land back on the protected page they initially requested. Invalid or elevated-only targets fall back to the appropriate dashboard based on role. Password reset links point to `reset-password.html`, and metadata updates (`first_name`, `phone`, `shipping_address`, optional `avatar_url`) flow through `sb.auth.updateUser` and into `public.profiles` via the trigger.

## 📦 Storage ops

- Dashboard uploads land in `user-data/<user_id>/…`.
- Avatar uploads overwrite `<user_id>.jpg` in the `avatars` bucket and refresh the preview immediately via `getPublicUrl`.
- The secure-storage edge function can be extended for additional buckets; it already validates the caller with `supabase.auth.getUser(token)`.

## ✅ Verification checklist

- Profiles and audit rows sync automatically when a user signs up or edits metadata.
- `profile_role` enum + `role` column exist and default to `member`.
- Folder RLS policies allow users to manage only their own records.
- Storage buckets `avatars` + `user-data` exist with RLS enabled.

## 🚀 Next build orders

### Admin User Management Console

Create an elevated-only page in the admin dashboard to:
- list users and metadata,
- toggle roles (`member`/`developer`/`admin`),
- manage folder grants via interactive toggles,
- trigger password resets or set new passwords,
- delete users (including storage clean-up), and
- surface the Supabase storage tree for context.

Log every admin action in a dedicated audit table.

### Automated testing & observability

- Expand Vitest coverage to include the new guard (`auth-guard.js`) via mocking `window.dispatchEvent` and Supabase responses.
- Add observability (console or logging) when folder checks fail due to configuration gaps.
