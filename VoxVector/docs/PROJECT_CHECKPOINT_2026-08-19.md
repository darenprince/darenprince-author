# VoxVector Project Checkpoint — 2026-08-19

## Purpose

This is the current frontend/deployment checkpoint. Earlier checkpoint text is preserved in repository history; this file records the corrected repository and deployment state.

## Canonical split architecture

VoxVector intentionally has two application workspaces in the monorepo:

| Surface | Repository path | Host | Purpose |
|---|---|---|---|
| Public React application | `voxvector/` | `https://darenprince.com/voxvector/` | Landing page and future user application |
| FastAPI backend | `VoxVector/` | `https://voxvector.crownlabs.tech` | API, analysis engine, reliability and diagnostics |

The Render API is **not** the landing page. GitHub Pages is **not** the backend API.

## Public frontend

The canonical React entrypoint is:

```text
voxvector/index.html
```

It mounts the React application from `voxvector/src/main.jsx` and uses Vite with:

```text
base: /voxvector/
```

The current React application includes:

- public landing page
- evidence-first positioning
- four-stage analytical workflow
- current observational-method presentation
- scientific-status presentation
- Motion interactions
- Developer Console entry
- real API client boundary

The historical root file:

```text
voxvector.html
```

is now a compatibility redirect only. It contains no second VoxVector implementation and redirects to `/voxvector/`.

## GitHub Pages deployment

`.github/workflows/deploy-pages.yml` is the canonical Pages deployment workflow.

It now explicitly:

1. builds the existing author site
2. builds `voxvector/` with Vite
3. stages the compiled React output at `_site/voxvector/`
4. stages `_site/voxvector/developer/index.html`
5. stages `_site/voxvector/404.html`
6. verifies the required VoxVector Pages files exist
7. uploads the complete artifact through GitHub Pages Actions

The workflow receives these browser-safe configuration values through GitHub Actions secrets:

```text
VOXVECTOR_SUPABASE_URL
VOXVECTOR_SUPABASE_ANON_KEY
```

The backend URL is explicitly configured as:

```text
https://voxvector.crownlabs.tech
```

## Developer Console

The Developer Console is part of the React frontend.

Canonical URL:

```text
https://darenprince.com/voxvector/developer/
```

Current implemented functions:

- Supabase Auth sign-in gate
- trusted developer-role check using `app_metadata`
- sign-out
- operational dashboard
- real `/health` query through TanStack Query
- real `/v1/analyze` WAV workbench
- HTTP status
- request timing
- `X-Request-ID`
- backend error visibility
- raw/structured response visibility
- canonical documentation navigator
- development board
- state-driven API activity visualization
- explicit unavailable states for backend telemetry capabilities that do not yet have protected query contracts

The browser gate is not treated as sufficient backend authorization. FastAPI JWT validation and server-side developer authorization remain the next security milestone.

## Live-state animation contract

Motion animations follow actual query/mutation state.

The current API visualizer deliberately uses indeterminate activity rather than fabricated percentages because `/health` and `/v1/analyze` do not currently expose numeric progress.

The UI may show:

- idle
- request in flight
- completed/ready
- error

It must not invent:

- analysis percentages
- lifecycle events
- request totals
- error totals
- 5xx totals
- analysis counts
- scientific results

## Backend

The canonical backend remains:

```text
VoxVector/api/app.py
VoxVector/src/voxvector/
```

Render remains the backend host. Supabase remains the existing authentication, persistence, and diagnostic-storage architecture.

The current backend is an observational analysis foundation. It is not yet a scientifically validated deception inference engine.

## Unmerged work

Pull request **#853 — Build authenticated VoxVector Developer Console** remains open and draft. It targets an older `agent/developer-console` branch and has not been merged into `main`.

That PR contains a separate server-side FastAPI developer-console implementation, including:

- `VoxVector/api/developer_console.py`
- `VoxVector/api/developer_console.html`
- server-side auth/authorization work
- persistent error-report browsing
- diagnostic log browsing
- developer-console tests

It is **not required for the current React Pages deployment** and is not the source of the current stale landing-page problem. Its useful backend authorization/telemetry work should be reviewed and selectively integrated in a future backend security phase rather than blindly merged over the React architecture.

## Root cause of the stale public landing

The repository contained both:

```text
voxvector.html
voxvector/index.html
```

The first was the old static VoxVector landing implementation while the second was the new React application. This created two competing VoxVector entry artifacts in the Pages publishing tree and made the intended public route ambiguous.

The conflict is now removed at the implementation level:

```text
voxvector.html
    ↓ compatibility redirect
voxvector/index.html
    ↓ React application
```

The Pages workflow additionally stages the React build explicitly under `/voxvector/`, so the public application no longer depends on the source tree being interpreted as a build directory.

## Current status

### Verified in repository

- React entrypoint exists
- React application source exists
- Vite base is `/voxvector/`
- Motion and TanStack Query dependencies exist
- Developer Console exists
- developer gate exists
- legacy static landing is now a redirect
- Pages workflow explicitly builds and stages React output
- developer route is explicitly staged
- canonical documentation has been updated to distinguish Pages frontend from Render API

### Still requiring deployment verification

A fresh GitHub Pages run after the routing correction must be observed and must pass its artifact verification and deployment jobs.

The live browser result should then be tested at:

```text
https://darenprince.com/voxvector/
https://darenprince.com/voxvector/developer/
```

The API remains separately testable at:

```text
https://voxvector.crownlabs.tech
```

## Immediate next work

1. Verify the fresh Pages deployment.
2. Verify the public React landing on desktop and mobile.
3. Verify direct Developer Console navigation and Supabase developer gating.
4. Review PR #853 backend work for selective extraction.
5. Implement FastAPI JWT validation and developer authorization.
6. Expose protected persistent error/lifecycle telemetry through the existing Supabase architecture.
7. Formalize shadcn/ui components and design tokens.
8. Continue the Analysis Workspace only against verified API contracts.

## Scientific status

No deployment change alters VoxVector's scientific status. Individual vocal, acoustic, linguistic, behavioral, emotional, or psychological features remain signals/evidence only. The current runtime must continue to report observations, reliability, convergence/conflict, uncertainty, alternatives, and limitations without presenting probabilistic inference as certainty.
