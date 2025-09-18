# Project Audit & Implementation Log — Profiles Audit

**Generated for:** Site coder / engineering team  \
**Prepared by:** Supabase Postgres expert  \
**Schemas involved:** `public`, `private`, `auth`, `storage`

---

## 1. Summary of work implemented
- Converted `public.profiles` to use a surrogate identity primary key while keeping `user_id` as the unique FK to `auth.users`.
- Created `public.profile_role` enum, normalised the `role` column, and added consolidated RLS policies that rely on `SELECT auth.uid()`.
- Added an index on `public.profiles(user_id)` to support policy checks and joins.
- Created schema `private` (if missing) and table `private.profile_audit` to store profile change history.
- Created SECURITY DEFINER trigger function `private.log_profile_change()` that writes audit rows on INSERT/UPDATE/DELETE and revoked EXECUTE from the `public`, `anon`, and `authenticated` roles.
- Created trigger `trg_profiles_audit` on `public.profiles` to call the audit function after each DML operation.
- Refreshed storage + folder access policies to use the consolidated auth UID pattern.

All DDL and policy SQL blocks are available in `supabase/migrations/0004_profiles_audit.sql` and `supabase/sql_editor_setup.sql`. They have already been executed in production. Re-run them as migrations or copy blocks into the Supabase SQL editor as needed.

---

## 2. Exact SQL objects, locations, and rationale

### Index
- **Location:** `public.idx_profiles_user_id`
- **Purpose:** Speeds up joins/filters on `profiles.user_id` used by RLS and application queries.

### Audit table
- **Location:** `private.profile_audit`
- **Columns:**
  - `id bigint` (identity, primary key)
  - `profile_id bigint` (FK to `public.profiles.id`)
  - `user_id uuid`
  - `full_name text`
  - `avatar_url text`
  - `phone text`
  - `action text` (`insert`\|`update`\|`delete`)
  - `changed_at timestamptz` (defaults to `timezone('utc', now())`)
  - `changed_by uuid`
- **Rationale:** Store an immutable audit trail of profile changes. Keeping it in the `private` schema prevents automatic API exposure and reduces RLS bypass risk.

### Audit function
- **Location:** `private.log_profile_change()`
- **Type:** SECURITY DEFINER trigger function (`LANGUAGE plpgsql`, `SET search_path = ''`).
- **Behaviour:** On INSERT/UPDATE/DELETE, inserts an audit row with the changed data and action type, capturing the actor via `(SELECT auth.uid())`.
- **Security:** EXECUTE revoked from `anon` and `authenticated` so only the trigger (or privileged roles) can invoke it.

### Trigger
- **Location:** `public.trg_profiles_audit`
- **Type:** `AFTER INSERT OR UPDATE OR DELETE` FOR EACH ROW on `public.profiles`.
- **Action:** Executes `private.log_profile_change()`.

### Row level security policies
- **Location:** `public.profiles`
- **Policies created:**
  - `Profiles: select owner`
  - `Profiles: insert owner`
  - `Profiles: update owner`
  - `Profiles: delete owner`
- **Rationale:** Enforce that only the authenticated owner may view or mutate their profile row. All policies use `(SELECT auth.uid()) = user_id`.

---

## 3. Full SQL (for reference / commit)

All statements live in:

- `supabase/migrations/0004_profiles_audit.sql` – canonical migration for the production project.
- `supabase/sql_editor_setup.sql` – idempotent SQL editor script.

Execute via Supabase CLI (`supabase db push`), psql, or the SQL editor while connected with a service role/owner account.

---

## 4. Security considerations & notes for the coder
- Do not create a separate users table—`auth.users` + `public.profiles` cover authentication + profile data.
- The audit table lives in the `private` schema to avoid public API exposure. Keep it out of `public`.
- `private.log_profile_change()` is SECURITY DEFINER; EXECUTE was explicitly revoked from the `public`, `anon`, and `authenticated` roles. Confirm no broad grants are added later.
- The Supabase service role bypasses RLS, so never embed it client-side. Use it only in secure contexts (Edge Functions, CI/CD migrations).
- The audit function uses `(SELECT auth.uid())` to populate `changed_by`. Service role executions may produce `NULL`; plan accordingly if you need to tag service automation.

---

## 5. Testing checklist (how to verify)
1. **Index check:** `EXPLAIN` a representative query filtering by `profiles.user_id`; confirm `idx_profiles_user_id` is used.
2. **Audit rows:** As user A, insert/update/delete a profile row. Confirm `private.profile_audit` logs the three actions with `changed_by = auth.uid()`.
3. **RLS enforcement:**
   - As user A, attempt to `SELECT` user B’s profile — should return zero rows.
   - Attempt `INSERT/UPDATE/DELETE` where `user_id != auth.uid()` — should be rejected.
4. **Function permissions:** Attempt to call `private.log_profile_change()` as `anon` (should fail). `has_function_privilege` can also confirm revocations.
5. **Edge case:** Using the service role to update profiles leaves `changed_by` NULL. Decide if you want additional columns (e.g., `changed_by_source`) for future automation.

---

## 6. Rollback steps
1. Disable auditing temporarily: `ALTER TABLE public.profiles DISABLE TRIGGER trg_profiles_audit;`
2. Full removal (reverse migration order):
   - `DROP TRIGGER IF EXISTS trg_profiles_audit ON public.profiles;`
   - `DROP FUNCTION IF EXISTS private.log_profile_change();`
   - `DROP TABLE IF EXISTS private.profile_audit;`
   - `DROP SCHEMA IF EXISTS private;`
   - `DROP POLICY ...` (all four consolidated policies) and recreate legacy ones if needed.
   - `DROP INDEX IF EXISTS idx_profiles_user_id;`
3. Restore previous schema (if ever required) by recreating the old UUID primary key and removing the audit infrastructure—document separately if you choose to do this.

Always capture an export of `private.profile_audit` before dropping it.

---

## 7. Ops / deployment notes
- **Deployment method:** Add the SQL blocks to your migration system (pg-migrate, Sqitch, Flyway, etc.) as a paired up/down change set.
- **Execution permissions:** Run migrations with a project owner account or the Supabase service-role connection string.
- **Monitoring:** Create an alert or scheduled job to watch the size of `private.profile_audit`. Archive or purge old rows if retention policies require it.
- **Backups:** Include the `private` schema in automated backups; it contains compliance-critical history.

---

## 8. Suggested improvements & next steps
- If you need richer actor context, add `changed_by_source` (text) or `changed_by_ip` columns and populate them from secure middleware.
- If audit volume grows rapidly, consider partitioning `private.profile_audit` by `changed_at` or archiving to object storage.
- To capture diffs, add `old_data`/`new_data` JSONB columns and extend the trigger to store them.
- Replicate this auditing pattern for other sensitive tables (e.g., folder grants, admin actions).

---

## 9. Files to commit (already added in this repo)
- `supabase/migrations/0004_profiles_audit.sql`
- Updated `supabase/sql_editor_setup.sql`
- Documentation refresh in `docs/supabase.md` and `supabase/supabase-integration.md`
- This audit log: `docs/audit/PROFILES_AUDIT.md`

---

## 10. Need anything else?
- I can export this markdown as PDF if desired.
- I can scaffold migration down scripts that fully revert the audit objects.
- I can generate test SQL scripts to run as different roles for validation.
- I can extend the audit trigger to log JSON payloads or service metadata—just ask.
