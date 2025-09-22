# 🔐 Supabase Quick Reference

The canonical integration guide lives in [`docs/SUPABASE_INTEGRATION.md`](SUPABASE_INTEGRATION.md). Use this page when you need a fast checklist.

- **Project:** Configure via env vars (`SUPABASE_DATABASE_URL`, `SUPABASE_ANON_KEY`); no IDs are hard-coded.
- **Key surfaces:** `js/auth-guard.js`, `admin-user-management.html`, `dashboard.html`, `supabase/functions/*`.
- **Edge functions:** `admin-users` (user admin API) and `secure-storage` (uploads).
- **Buckets:** `avatars` (public) and `user-data` (private) with per-user RLS; analytics + multipart metadata available via `storage.*` tables for diagnostics.
- **Background jobs:** `net.http_request_queue` + `net._http_response` now enabled for async webhooks (enqueue via `net.http_enqueue`).
- **Latest schema upgrades:** profile sync trigger refresh, folder access policies, `private.admin_action_log`.
- **Troubleshooting:** Use `js/supabase-logger.js` (Konami/tap overlay) and run `npm test` for env coverage.

Jump to the full playbook in [`docs/supabase/README.md`](supabase/README.md) for diagrams, policies, and deployment steps.
