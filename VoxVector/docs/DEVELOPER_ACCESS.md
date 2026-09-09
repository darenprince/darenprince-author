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

The backend validates Supabase access tokens for owner-scoped case routes and uses a trusted developer authorization dependency for protected developer infrastructure routes. Public `/health` and compatibility `/v1/analyze` retain their documented API contracts. Sensitive credentials remain server-side.

## Remaining security verification

1. Continue automated unauthorized and authorized endpoint coverage as routes expand.
2. Verify row and object ownership behavior with more than one real account before claiming cross-user isolation.
3. Keep service-role and infrastructure credentials server-side.
4. Preserve sanitized audit context without storing sensitive audio or transcript content in operational logs.

## Failure behavior

- Supabase configuration missing: deny developer access and explain configuration state.
- Authentication failure: remain at the sign-in gate.
- Authenticated non-developer: deny console access.
- Developer authenticated: render the console.
- Backend telemetry unavailable: display an explicit unavailable state; never fabricate metrics.

## Scientific boundary

Developer access controls are an operational security feature. They do not change VoxVector's scientific validation status or confer deception-inference capability.
