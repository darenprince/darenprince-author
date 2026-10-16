# Emergency 911 Workspace

The public `911.html` path now redirects to the Supabase-authenticated owner portal. Emergency profile information must not be embedded in static HTML.

## Crown SOS full-information sharing
- Owner portal: `../911-owner.html`
- Login-free SOS recipient page: `../911-share.html`
- Supabase Edge Function source: `../supabase/functions/crown-sos/index.ts`
- Database schema: `../supabase/migrations/20261016163000_crown_sos_private_emergency_sharing.sql`
- Database and share records are accessed through the Edge Function. Browser roles have no direct grants to emergency tables.
- The owner saves the full emergency profile as JSON. Every saved field is returned to the bearer-link recipient, together with the latest location shared in that session.
- Tokens are random, 256-bit, hashed before storage, and time-limited (1–24 hours). Owners can revoke shares immediately. Recipients do not need an account.
- The owner must explicitly start GPS sharing. Updates require permission and an open browser page. Offline or closed-page conditions mean the recipient sees the last known fix, not guaranteed live tracking.
- Anyone who possesses a valid SOS link can see its full shared profile until expiration or revocation. Only send it to a trusted person.
- This is not an emergency dispatch service.

## Important data migration note
The former static page contained information in its HTML source. This change removes that content from the current page, but it does not automatically import it into the private database or erase historical Git commits/caches. Review the emergency profile in the authenticated owner portal and populate/verify every field before relying on a link. Rotate any real credential that was ever committed or shared.