Crown Shield DNS Console

Private Crown Labs DNS filtering console. Separate deployable app; does not alter the public Crown Labs landing page.

Required configuration:
- Frontend: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_API_BASE_URL.
- Worker secrets: SUPABASE_URL, SUPABASE_ANON_KEY, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN, ADMIN_EMAILS (comma-separated admin email allowlist).
- Worker variable: ALLOWED_ORIGIN set to the exact deployed frontend origin.
- Cloudflare Zero Trust/Gateway must be initialized. Keep the API token server-side only.

Run: npm install && npm run dev

DNS policies only apply to devices whose DNS is actually routed through Gateway. DNS filtering cannot guarantee that every adult site or alternate access method is blocked. The app must report the provider's actual status, never assume protection is active.
