# 🔐 Supabase Integration

Supabase powers authentication, profile sync, and secure storage across the Daren Prince platform. The production project (`ogftwcrihcihqahfasmg`) already includes all migrations from `/supabase/migrations`, so the schema described here matches the live environment.

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
Mirror table for `auth.users`. A trigger (`sync_profile_from_auth`) creates a row the moment an auth user appears. Columns include role (`member` default), contact info, and timestamps. RLS allows users to manage only their own record.

### `public.folder_access`
Text-based permissions that gate engineering surfaces. Each row grants a user access to a named folder/page (`file_name`). Users can create/update/delete only their own entries. Elevated roles (`developer`, `admin`) bypass the check.

### Storage buckets
- `avatars` (public) – one JPEG per user (`<user_id>.jpg`)
- `user-data` (private) – personal files (`<user_id>/<filename>`)

RLS rules defined in `0002_create_folder_access_and_policies.sql` secure both buckets.

## 🧠 Client entry points

- `supabase/client.js` (browser ESM) and `supabase/client.ts` (Deno) create the shared client.
- `js/main.js`, `js/auth.js`, `js/dashboard.js`, and `js/profile-dropdown.js` consume the client for session handling, logout, profile updates, and storage operations.
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

`enforceAuthGuard` workflow:

1. Resolve the Supabase client (gracefully handles missing config).
2. Redirect unauthenticated visitors to `login.html?redirect=<current path>`.
3. Fetch the user’s role via `public.profiles`.
4. Optionally fetch `public.folder_access` for folder-level checks.
5. Reveal `.site-wrap` when access is granted or render a branded blocker with next steps when it is not.

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

## 🔑 Authentication flow

`login.html` (powered by `js/auth.js`) now respects the `redirect` query parameter so users land back on the protected page they initially requested. Invalid or elevated-only targets fall back to the appropriate dashboard based on role. Password reset links point to `reset-password.html`, and metadata updates (`first_name`, `phone`, etc.) flow through `sb.auth.updateUser`.

## 📦 Storage ops

- Dashboard uploads land in `user-data/<user_id>/…`.
- Avatar uploads overwrite `<user_id>.jpg` in the `avatars` bucket and refresh the preview immediately via `getPublicUrl`.
- The secure-storage edge function can be extended for additional buckets; it already validates the caller with `supabase.auth.getUser(token)`.

## ✅ Verification

The validation SQL block provided with the task confirms:

- All auth users own a profile row and vice versa.
- `profile_role` enum + `role` column exist.
- `folder_access` has indexes and RLS in place.
- Storage buckets `avatars` + `user-data` exist with RLS enabled.

Run the block again after future migrations or policy tweaks.

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

