# VoxVector Project Checkpoint — 2026-08-19

## Purpose

This is the current frontend and deployment checkpoint. Earlier checkpoint text is preserved in repository history; this file records the corrected repository and deployment state.

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
- evidence first positioning
- four stage analytical workflow
- current observational method presentation
- scientific status presentation
- Tremor analytical components
- Motion interactions
- Base UI backed application owned Button primitive
- Lucide iconography
- accessible mobile navigation
- keyboard focus treatment
- skip to content control
- reduced motion support
- Developer Console entry
- real API client boundary
- navigable privacy, terms, security, contact, documentation, and project briefing destinations

The historical root file:

```text
voxvector.html
```

is now a compatibility redirect only. It contains no second VoxVector implementation and redirects to `/voxvector/`.

## Frontend dependency baseline

The public application is currently version `0.2.31`.

The frontend intentionally uses React `18.3.1` and React DOM `18.3.1` because the selected Tremor React package declares React 18 compatibility and npm otherwise rejects the previous React 19 dependency tree during normal installation.

The primary frontend analytical and interaction stack is:

- React
- Tremor React
- shadcn style application owned components
- Base UI
- Tailwind CSS
- Lucide React
- Motion for React
- TanStack Query

The application does not use Vercel dependencies or Vercel configuration.

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

The workflow receives these browser safe configuration values through GitHub Actions secrets:

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

- Supabase Auth sign in gate
- trusted developer role check using `app_metadata`
- awaited sign out with error handling
- operational dashboard
- real `/health` query through TanStack Query
- real `/v1/analyze` WAV workbench
- HTTP status
- request timing
- `X-Request-ID`
- backend error visibility
- raw and structured response visibility
- canonical documentation navigator
- development board
- state driven API activity visualization
- explicit unavailable states for backend telemetry capabilities that do not yet have protected query contracts

The browser gate is not treated as sufficient backend authorization. FastAPI JWT validation and server side developer authorization remain the next security milestone.

## Live state animation contract

Motion animations follow actual query and mutation state.

The current API visualizer deliberately uses indeterminate activity rather than fabricated percentages because `/health` and `/v1/analyze` do not currently expose numeric progress.

The UI may show:

- idle
- request in flight
- completed or ready
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

Render remains the backend host. Supabase remains the existing authentication, persistence, and diagnostic storage architecture.

The current backend is an observational analysis foundation. It is not yet a scientifically validated deception inference engine.

## Unmerged work

Pull request **#853 — Build authenticated VoxVector Developer Console** remains open and draft. It targets an older `agent/developer-console` branch and has not been merged into `main`.

That PR contains a separate server side FastAPI developer console implementation, including:

- `VoxVector/api/developer_console.py`
- `VoxVector/api/developer_console.html`
- server side auth and authorization work
- persistent error report browsing
- diagnostic log browsing
- developer console tests

It is **not required for the current React Pages deployment** and is not the source of the current stale landing page problem. Its useful backend authorization and telemetry work should be reviewed and selectively integrated in a future backend security phase rather than blindly merged over the React architecture.

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

## QA log investigation

A GitHub Actions log archive was provided and inspected on 2026-08-19.

The run checked out commit `b505e84bb8f0c3bd812970490cde090260e8188a` and successfully installed and tested the backend. The API test step completed with:

```text
91 passed in 0.56s
```

The run then failed before the React build during `npm install` with:

```text
npm error ERESOLVE unable to resolve dependency tree
```

The exact conflict was:

```text
Found: react@19.2.8
peer react@"^18.0.0" from @tremor/react@3.18.7
```

This was a real frontend dependency failure, not a Vercel failure and not a scientific failure.

The corrective change is now committed:

- frontend version `0.2.31`
- React `18.3.1`
- React DOM `18.3.1`
- QA Node runtime `22`
- npm cache enabled for the frontend package manifest
- normal `npm install` retained so peer dependency resolution is exercised rather than bypassed

No `--force` or `--legacy-peer-deps` workaround was added.

## Vercel status investigation

Vercel is retired from the VoxVector architecture.

Repository source inspection showed no Vercel dependency, no `.vercel` configuration, and no VoxVector GitHub Actions workflow that deploys to Vercel.

The GitHub combined status for the affected commit still contains an external status named `Vercel` with a failure target pointing to the Crown Labs Vercel account and a build rate limit message.

That status is external to the VoxVector source and remains separate from the GitHub Pages workflow and the actual QA failure documented above.

The correct cleanup is to disconnect the old repository from the Vercel project or integration. Vercel's current documentation exposes `vercel git disconnect` for disconnecting a Git provider repository. No Vercel configuration should be reintroduced into VoxVector to silence the check.

## Current implementation checkpoint

### Implemented in repository

- React landing refinement at version `0.2.31`
- Tremor first visual language with Vercel and Linear influence
- direct Tremor Card, AreaChart, DonutChart, and ProgressBar usage
- shadcn style application owned composition
- Base UI backed Button primitive
- Lucide iconography
- Motion interactions and reduced motion support
- restrained analytical palette
- thin neutral borders and low contrast surfaces
- responsive mobile navigation
- professional legal, developer, resource, source, and company footer
- canonical Project Briefing and Documentation actions
- dependency compatibility correction for Tremor
- QA Node runtime update
- synchronized UI architecture, decision log, version map, and checkpoint documentation

### Verification status

The uploaded log proves the backend test suite passed and identifies the exact React dependency failure. The corrective commits have been pushed, but a fresh GitHub Actions QA run after the dependency correction has not yet been observed. Therefore a passing React production build is **not** being claimed yet.

A local build could not be reproduced in the current execution environment because outbound access to GitHub and npm is unavailable. This is an environment limitation rather than a successful test result.

## Still requiring deployment verification

A fresh GitHub Pages run after the frontend hardening changes must be observed and must pass its artifact verification and deployment jobs.

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

1. Verify the fresh QA run after the dependency correction.
2. Verify the public Pages deployment.
3. Verify the public React landing on desktop and mobile.
4. Verify direct Developer Console navigation and Supabase developer gating.
5. Review PR #853 backend work for selective extraction.
6. Implement FastAPI JWT validation and developer authorization.
7. Expose protected persistent error and lifecycle telemetry through the existing Supabase architecture.
8. Continue formalizing shadcn compatible components on Base UI primitives.
9. Continue the Analysis Workspace only against verified API contracts.

## Scientific status

No deployment change alters VoxVector's scientific status. Individual vocal, acoustic, linguistic, behavioral, emotional, or psychological features remain signals and evidence only. The current runtime must continue to report observations, reliability, convergence and conflict, uncertainty, alternatives, and limitations without presenting probabilistic inference as certainty.
