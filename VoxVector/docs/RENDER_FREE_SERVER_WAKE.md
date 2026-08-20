# Render Free Server Wake Experience

## Purpose

The VoxVector Developer Console uses an explicit startup interaction for the Render Free backend runtime. This avoids artificial keep awake traffic while giving developers a clear, state driven way to wake the analysis API when they need it.

## Runtime behavior

1. The public React application does not continuously ping `/health` merely to prevent Render inactivity shutdown.
2. On the Developer Console, the dashboard initially presents the runtime as inactive and provides **Start VoxVector Engine**.
3. The startup controller releases the health request only after the developer explicitly starts the engine. That request is the wake signal received by the Render service.
4. While Render starts, the console displays a staged startup sequence covering the wake request, Render response, application process, health check, and engine readiness.
5. The startup sequence remains active until the canonical `/health` response reports `status: ok` and `runtime_self_test: passed`.
6. After readiness, the console refreshes its existing TanStack Query health state so the normal dashboard metrics are populated from the real backend response.
7. Once ready, the startup controller stops its short interval polling. The existing console health refresh behavior remains responsible for normal dashboard verification while the console is open.

## Keep awake policy

VoxVector does **not** use an artificial external ping loop to defeat Render Free's inactivity behavior. The service is allowed to wind down when unused. An active Developer Console session naturally makes real health requests while it is open, but no hidden background service is introduced solely to consume runtime resources.

## Evidence boundary

The startup animation is UI state, not analytical evidence. It must never be presented as proof that audio analysis occurred, that a model ran, or that a deception determination was produced.

The final operational state is based on the actual backend `/health` response. The health endpoint currently performs the canonical runtime self test and reports the deployed source fingerprints and diagnostic storage state.

## Implementation

* Frontend controller: `voxvector/public/server-wake.js`
* Frontend bootstrap: `voxvector/index.html`
* Existing health client: `voxvector/src/lib/api.js`
* Existing Developer Console: `voxvector/src/components/DeveloperConsole.jsx`
* Canonical backend health endpoint: `VoxVector/api/app.py`

## Verification status

The change is committed to GitHub. A repository GitHub Actions run was not present for the implementation commit at the time of this record. Production browser verification and a cold Render wake test remain required before claiming end to end verification.
