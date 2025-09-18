# 🔐 Supabase Integration Overview

The full Supabase control guide now lives in [`docs/supabase/README.md`](supabase/README.md). Use this summary for the quickest hits when you need to orient fast.

- **Project:** `ogftwcrihcihqahfasmg`
- **Primary surfaces:** `js/auth-guard.js`, `admin-user-management.html`, `supabase/functions/*`
- **Latest upgrades:**
  - Admin action audit log (`private.admin_action_log`) with indexed history.
  - `admin-users` edge function handling role changes, folder grants, password resets, and account deletion.
  - Supabase Command Center UI for administrators.
- **Must-run validation:** `npm test`, Supabase SQL validation block, Netlify env check.

Jump into the [playbook](supabase/README.md) for detailed schema diagrams, API callouts, and ops checklists.
