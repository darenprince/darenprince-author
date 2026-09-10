# Render Free Server Wake Experience

## Purpose

VoxVector allows the Render backend to wind down when it is unused. The frontend must wake the API when a person actually enters an authenticated workflow without creating artificial background keep-alive traffic or pretending that a wake request means the service is already ready.

## Runtime behavior

1. The public React application does not continuously ping `/health` merely to prevent Render inactivity shutdown.
2. `AuthGate.jsx` remains the canonical browser authentication owner. After a successful explicit email/password login, it starts one non-blocking API wake request before applying the returned session to role routing.
3. The login wake is `GET /health` through the canonical `voxvector/src/lib/api.js` boundary. `wakeApi()` uses `cache: 'no-store'` and `keepalive: true` so the browser can continue the request when the immediate trusted-role redirect unloads the login document where supported.
4. Login does not wait for the Render cold start to finish. A wake attempt is therefore separate from backend readiness.
5. Session restoration and normal auth-state observation do not call `wakeApi()`. A restored session, token refresh, or sign-out is not used as a hidden keep-alive mechanism.
6. Developer and administrator accounts route to the existing Developer Gate. That surface independently polls the real `/health` endpoint while startup is unresolved and renders `ApiStartup.jsx` from returned health/runtime evidence.
7. The Developer startup interaction remains indeterminate during backend wake. It does not fabricate a backend completion percentage. It transitions only from actual `/health` evidence, including the canonical health status and runtime self-test fields.
8. Approved user accounts route to `/voxvector/app`. Their successful login still sends the same one-shot API wake request, but the user workspace does not manufacture a developer startup screen or claim readiness it has not observed.

## Keep-awake policy

VoxVector does **not** use an artificial external ping loop to defeat Render Free inactivity behavior. A successful login may issue one real wake request because the user is entering the product. An open Developer Console may continue making its documented operational health requests while that console is active. Those are user-driven application requests, not a background service created only to keep Render awake.

## Evidence boundary

A `/health` request is a wake attempt, not proof that Render finished waking. A Render deployment record is also not browser verification.

The canonical startup state is based on actual backend `/health` responses. Health/runtime information must not be represented as proof that audio analysis occurred, a speech provider executed, or a deception determination was scientifically validated.

## Canonical implementation

* Authentication and login-triggered wake owner: `voxvector/src/components/AuthGate.jsx`
* Frontend API boundary and one-shot wake helper: `voxvector/src/lib/api.js`
* Developer/admin startup controller: `voxvector/src/components/DeveloperGate.jsx`
* Developer/admin startup presentation: `voxvector/src/components/ApiStartup.jsx`
* React entrypoint and role routes: `voxvector/src/main.jsx`
* Canonical backend health endpoint: `VoxVector/api/app.py`

`voxvector/public/server-wake.js` is a historical DOM/fetch interception implementation. The current `voxvector/index.html` does not load it, so it is not evidence of active runtime behavior and is not the canonical wake owner.

## Verification status

Source-level regression coverage for the login-triggered wake belongs with the frontend tests and exact-head PR QA. An authenticated desktop/mobile login against the published candidate plus a real cold Render wake remain separate runtime/browser evidence and must be recorded before this behavior is called browser verified.
