# Supabase Audit Log — Admin Console Rollout (2025-02-09)

**Author:** Platform engineer  \
**Scope:** Auth, profiles, folder_access, storage, private schema, edge functions

---

## 1. Summary
- Added `private.admin_action_log` table + indexes to capture elevated operations.
- Shipped `admin-users` edge function that authenticates admins, lists users, mutates roles/folders, triggers password resets, and deletes accounts with storage clean-up.
- Launched `admin-user-management.html` surface backed by `js/admin-user-console.js` for real-time management.
- Updated `admin-dashboard.html` with an entry point to the Supabase Command Center.
- Consolidated Supabase documentation inside `docs/supabase/README.md` with quick links from legacy files.

---

## 2. Implementation references
- Migration: `supabase/migrations/0005_admin_action_log.sql`
- SQL Editor helper: `supabase/sql_editor_setup.sql` (new admin action block)
- Edge function: `supabase/functions/admin-users/index.ts`
- Frontend: `admin-user-management.html`, `js/admin-user-console.js`, `js/folder-catalog.js`
- Documentation: `docs/supabase/README.md`, `docs/supabase.md`, `supabase/supabase-integration.md`

---

## 3. Testing & validation
- `npm test` (Vitest) — ensures environment helpers behave predictably; Supabase-specific suites auto-skip without credentials.
- Manual review of `admin-users` function for error branches (missing token, non-admin access, invalid actions).
- Local linting via Prettier/ESM conventions (no automated run required; files formatted via editor tooling).

---

## 4. Security notes
- `admin-users` verifies bearer tokens with `auth.getUser` and confirms admin role from `public.profiles` before performing any mutation.
- Folder updates whitelist valid keys and deduplicate before writing.
- Password reset endpoint returns `action_link`; UI copies to clipboard and never surfaces the link publicly.
- User deletion removes storage objects (`avatars`, `user-data`), folder rows, profile rows, and the auth user in a single flow.
- Every admin action is logged with actor, target, action verb, optional JSON payload, and UTC timestamp.

---

## 5. Follow-up recommendations
- Add integration tests hitting `admin-users` via the Supabase Functions testing harness once service credentials are available in CI.
- Extend the admin console with manual password set + invite workflows when supported.
- Consider rate limiting or additional confirmation modals for destructive actions (folder purge, delete user).
- Pipe `private.admin_action_log` into downstream analytics or retention storage if compliance requires longer history.
