# Supabase Integration Quickstart

The canonical playbook now lives at [`docs/supabase/README.md`](../docs/supabase/README.md). This file remains inside `/supabase` so engineers working on migrations, edge functions, or CLI tasks have an immediate checkpoint.

## Project coordinates

- **Project ID:** `ogftwcrihcihqahfasmg`
- **Local CLI:** `supabase/config.toml` is not tracked—export the service role connection string before running migrations.
- **Runtime env resolution:** `env.js` prefers `SUPABASE_SERVICE_ROLE_KEY`/`SUPABASE_DATABASE_URL`, falls back to anon + generated browser env.

## Schema checkpoints

| Object | Location | Notes |
|--------|----------|-------|
| `public.profiles` | `migrations/0001` + `0004` | Surrogate identity PK, role enum, sync trigger, audit trigger |
| `public.folder_access` | `migrations/0002` | Per-user folder gating with consolidated policies |
| `private.profile_audit` | `migrations/0004` | Trigger-driven audit trail |
| `private.admin_action_log` | `migrations/0005` | **New.** Captures admin console actions. Indexed on actor/target/created_at |

Storage policies, bucket bootstrap, and idempotent helpers are mirrored in `sql_editor_setup.sql`.

## Edge functions

| Function | Path | Purpose |
|----------|------|---------|
| `secure-storage` | `functions/secure-storage/index.ts` | Validates bearer tokens and streams uploads into Supabase Storage |
| `admin-users` | `functions/admin-users/index.ts` | **New.** Admin API for listing users, updating roles, managing folders, password resets, and full deletion. Logs everything into `private.admin_action_log`. |

Deploy via Supabase CLI:

```bash
supabase functions deploy secure-storage
supabase functions deploy admin-users
```

## Admin Command Center

- **Page:** `admin-user-management.html`
- **Script:** `js/admin-user-console.js`
- **Guard:** `enforceAuthGuard({ requireElevated: true, allowedRoles: ['admin'] })`
- **Capabilities:** list users, role toggles, folder grants, recovery link generation, and deletion (with storage cleanup).
- **Audit:** every action inserts into `private.admin_action_log`.

## Testing & verification

- `npm test` (Vitest) now covers env resolution helpers.
- After running migrations, re-run the Supabase SQL validation block to confirm policies, triggers, and buckets.
- Use Supabase dashboard & function logs to monitor `admin-users` executions—warning logs are emitted for optional failures (e.g., missing avatar during delete).

Grab the full context, diagrams, and next steps inside [`docs/supabase/README.md`](../docs/supabase/README.md).
