# 🔐 Supabase Control Playbook

The Daren Prince platform runs entirely on a single Supabase project (`ogftwcrihcihqahfasmg`). This playbook folds every moving piece—database schema, row-level policies, edge functions, and the new admin console—into one actionable reference. Use it to provision environments, validate migrations, and operate the system without guesswork.

---

## 1. Runtime configuration

`supabase/env.js` resolves credentials in descending priority:

1. `Deno.env` (edge functions)
2. `process.env` (local tooling/tests)
3. `assets/js/env.js` (generated at build time)

Set the following keys for Netlify, local CLI sessions, and any secure automation:

```bash
SUPABASE_DATABASE_URL=https://<project>.supabase.co
SUPABASE_ANON_KEY=<anon>
SUPABASE_SERVICE_ROLE_KEY=<service-role>
SUPABASE_JWT_SECRET=<jwt-secret>
```

Aliases (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, etc.) are supported out of the box. Run `npm run build` whenever credentials change to regenerate `assets/js/env.js`.

---

## 2. Database + policy snapshot

### `auth.users`
Seeded by Supabase Auth. A trigger keeps `public.profiles` mirrored with user metadata.

### `public.profiles`
- Columns: `id` (identity PK), `user_id` (uuid, unique FK to `auth.users`), personal metadata, `avatar_url`, `role` (`profile_role` enum), timestamps.
- Trigger: `sync_profile_from_auth` keeps metadata aligned with auth payloads.
- Policies: consolidated owner policies (`select/insert/update/delete`) gated by `auth.uid()`.

### `public.folder_access`
- Columns: `id`, `user_id`, `file_name`, `created_at`.
- Policies: users manage only their own rows. Elevated roles bypass checks in the UI guard.

### `private.profile_audit`
Immutable audit log populated by `trg_profiles_audit`. Stores `{ profile_id, user_id, action, changed_at, changed_by, snapshots }` for every profile mutation.

### `private.admin_action_log` **(new)**
- Tracks every elevated action taken through the admin console and future automation.
- Columns: `id`, `actor_user_id`, `target_user_id`, `action`, `detail` (jsonb payload), `created_at` (UTC).
- Indexed on actor, target, and `created_at desc` for quick audits.

### Storage buckets
- `avatars` (public): `<user_id>.jpg`
- `user-data` (private): `<user_id>/<filename>` tree
- Row level security enforced by policies defined in `supabase/sql_editor_setup.sql`.

### Validation checklist
- `supabase db push` + `supabase/migrations/*` keep prod + staging aligned.
- After migrations: rerun the SQL validation script from the Supabase brief to confirm RLS policies, triggers, and indexes.
- Document each verification in `docs/audit/` (see `PROFILES_AUDIT.md` for format).

---

## 3. Client entry points

| Layer | File | Responsibility |
|-------|------|----------------|
| Browser | `supabase/client.js` | Instantiates Supabase JS client (anon key) with top-level await |
| Browser | `js/auth.js` | Handles sign-in/up, password reset flows, metadata sync |
| Browser | `js/auth-guard.js` | Locks pages until session, role, and folder checks succeed |
| Browser | `js/admin-user-console.js` | Powers the new admin management surface |
| Edge | `supabase/functions/secure-storage/index.ts` | Authenticated uploads into Supabase Storage |
| Edge | `supabase/functions/admin-users/index.ts` | Admin API for listing users, mutating roles/folder access, password resets, and deletion |

`js/supabase-helper.js` exposes a safe accessor that alerts when credentials are missing.

---

## 4. Access control model

1. **Auth guard** (`enforceAuthGuard`) checks session, fetches profile role, resolves folder grants, and dispatches:
   - `auth:ready` with `{ supabase, user, role, folderAccess }`
   - `auth:denied` with `{ reason, role?, folderAccess? }`
2. **Folder keys** (from `js/folder-catalog.js`):
   - `components`
   - `style-classes`
   - `image-index`
   - `components/book-details`
   - `press-kit`
3. Elevated roles (`developer`, `admin`) bypass folder enforcement automatically.
4. Pages redirect to `login.html?redirect=/requested/page` when the guard detects missing sessions.

To gate a page:

```html
<script type="module">
  import { enforceAuthGuard } from './js/auth-guard.js';
  enforceAuthGuard({
    requiredFolders: ['components'],
    loadFolderAccess: true,
  });
</script>
```

For admin-only surfaces use `requireElevated: true` plus `allowedRoles: ['admin']`.

---

## 5. Admin user management console

**Frontend:** `admin-user-management.html` + `js/admin-user-console.js`
- Requires admin role via `enforceAuthGuard`.
- Lists all users with email, full name, role, created date, last sign-in, and granted folders.
- Live search filters by email, name, role, or folder keywords.
- Role selector updates `public.profiles`, `user_metadata`, and `app_metadata` via `admin-users` function.
- Folder toggles rewrite `public.folder_access` grants with debounced Supabase calls.
- Password reset button triggers `auth.admin.generateLink` (link auto-copies to clipboard when supported).
- Delete button cleans up storage (`avatars` + `user-data`), folder grants, profile rows, and the auth user. Self-deletion is blocked.
- Toast messaging communicates success/error states; admin actions auto-log to `private.admin_action_log`.

**Edge API:** `supabase/functions/admin-users/index.ts`
- Validates the bearer token, confirms admin status via `public.profiles.role`.
- `GET` &rarr; `{ users, folders }` (folders echo the canonical list from the function).
- `POST action="update-role"` &rarr; updates profile + auth metadata.
- `POST action="set-folder-access"` &rarr; rewrites folder grants with deduplication and whitelist filtering.
- `POST action="send-password-reset"` &rarr; generates recovery link (optional `redirectTo`).
- `POST action="delete-user"` &rarr; removes storage artifacts, folder rows, profile, and the auth record.
- Every branch records an entry in `private.admin_action_log`.

Deploy via Supabase CLI (`supabase functions deploy admin-users`).

---

## 6. Testing & observability

- `npm test` runs Vitest suites, including new coverage for env resolution.
- Edge functions log to Supabase’s function dashboard; watch for warnings about missing storage permissions during deletes.
- Consider wiring Netlify build hooks to fail when required env keys are absent (the helper already surfaces browser alerts).

---

## 7. Next steps

- Expand Vitest coverage around `auth-guard` with mocked Supabase responses and `CustomEvent` dispatch checks.
- Add UI for manual password set + invite flows once Supabase Admin API exposes them.
- Stream admin action log entries into an analytics destination (BigQuery/S3) if compliance retention grows.
- Monitor `private.admin_action_log` size; archive or prune based on retention policy.

Stay bold: every control surface now routes through Supabase with full auditing.
