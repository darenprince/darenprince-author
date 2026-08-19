# VoxVector Developer Console

## Purpose

The Developer Console is the authenticated operational interface for VoxVector engineering and diagnostics. It is deliberately separate from the public analysis workflow.

## Access model

The console is served at `/developer`. Login is proxied through the VoxVector API to Supabase Auth. The browser receives only a short-lived access token and never receives the Supabase service-role key.

After authentication, the API verifies the bearer token with Supabase Auth and requires an active row in `public.developer_roles`. Authorization is therefore based on the server-side developer role table rather than editable user metadata.

## Current surfaces

- **Overview** — operational summary, persisted error counts, diagnostic bucket, and roadmap state.
- **API Interface** — live route inventory from the running FastAPI application.
- **Error Reports** — persisted error records including request/correlation IDs, source revision, pipeline version, traceback, context, and resolution state.
- **Diagnostic Logs** — latest objects from the private `voxvector-logs` bucket through a server-side Storage request.
- **Documentation** — navigation through canonical Markdown documentation under `VoxVector/docs/`.
- **Next Phase** — roadmap items stored in Supabase, including priority, phase, status, dependencies, and acceptance criteria.

## Security boundary

`SUPABASE_SERVICE_ROLE_KEY` remains server-side only. It must never be included in HTML, JavaScript, API responses, logs, GitHub, or documentation.

The console does not expose raw audio or raw transcript content. Diagnostic access is restricted to authenticated developers and uses the existing private storage architecture.

## Required deployment configuration

Set these Render secrets/environment variables:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_PUBLISHABLE_KEY`
- `VOXVECTOR_LOG_BUCKET=voxvector-logs`

The publishable key is used only by the server-side password-login proxy. It is not a secret equivalent to the service-role key, but keeping it server-side here keeps the browser surface simpler.

## Verification

1. Deploy the branch/commit.
2. Open `/developer`.
3. Authenticate with an account represented by an active `developer_roles` row.
4. Confirm the console loads Overview.
5. Confirm API Interface lists the runtime routes.
6. Confirm Error Reports can read persisted `error_reports` rows.
7. Confirm Diagnostic Logs can list the private storage bucket.
8. Open a canonical document through Documentation.
9. Confirm Next Phase reads `roadmap_items`.
10. Log out and verify the protected console cannot be reopened without authentication.

## Scientific boundary

The console reports engineering state and operational evidence. It does not alter the scientific status of VoxVector. Current runtime analysis remains observational and guarded; successful API operation is not scientific validation of deception inference.
