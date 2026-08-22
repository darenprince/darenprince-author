# VoxVector Developer Access

## Status

Developer Console access is implemented in the React frontend at `/voxvector/developer`.

## Authentication

The frontend uses Supabase Auth with browser-safe configuration:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

No service-role key or privileged Supabase secret may be shipped to the browser.

## Developer authorization

An authenticated user is admitted only when trusted Supabase `app_metadata` contains one of:

```text
role = developer
```

or

```text
voxvector_role = developer
```

The role must be assigned through a trusted server-side/admin workflow. It must never be granted from ordinary client-controlled `user_metadata`.

## Console route

```text
/voxvector/developer
```

GitHub Pages deployment copies the React entrypoint to `voxvector/404.html` so direct navigation to the developer route can be recovered by the SPA.

## Current security boundary

The developer gate protects access to the developer interface. It does **not** by itself secure backend endpoints.

The current Developer Console workbench calls the existing `/health` and `/v1/analyze` endpoints, which remain governed by the current FastAPI contract. Persistent diagnostics, operational telemetry, and future administrative endpoints must receive server-side authentication and authorization before sensitive data is exposed to the browser.

## Required next backend security work

1. Accept and validate Supabase access tokens in the FastAPI adapter.
2. Establish a trusted developer authorization dependency.
3. Protect diagnostic and operational endpoints with that dependency.
4. Pass the authenticated user's request context into audit events without storing sensitive audio/transcript content.
5. Add automated unauthorized/authorized endpoint tests.
6. Keep service-role credentials server-side only.

## Failure behavior

- Supabase configuration missing: deny developer access and explain configuration state.
- Authentication failure: remain at the sign-in gate.
- Authenticated non-developer: deny console access.
- Developer authenticated: render the console.
- Backend telemetry unavailable: display an explicit unavailable state; never fabricate metrics.

## Scientific boundary

Developer access controls are an operational security feature. They do not change VoxVector's scientific validation status or confer deception-inference capability.
