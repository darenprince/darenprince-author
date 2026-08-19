# VoxVector UI Application Architecture

## Status

**Approved and in active implementation.** The public React application is deployed at `/voxvector/`. The Developer Console foundation, Supabase developer gate, and state-driven API activity visualization are implemented. Backend-protected operational telemetry remains the next security/integration phase.

## Architecture

| Layer | Choice | Role |
|---|---|---|
| Application | React 19 | Product shell and route composition |
| UI | shadcn/ui-compatible application-owned composition | Accessible primitives; formal component installation remains incremental |
| Styling | Tailwind CSS | Responsive layout, typography, tokens, theming |
| Animation | Motion for React | State-driven transitions and interaction |
| Server state | TanStack Query | API lifecycle, caching, retries, mutations, refresh |
| Authentication | Supabase Auth | Developer identity/session handling |
| Authorization | Supabase trusted `app_metadata` + future FastAPI enforcement | Developer role gating |
| API | FastAPI on Render | Canonical backend |
| Persistence/diagnostics | Supabase | Existing operational architecture |
| Deployment | GitHub Pages | Public React frontend under `/voxvector/` |

Render and Supabase remain unchanged as infrastructure boundaries.

## Current implementation

### Public application

Implemented:

- React/Vite entrypoint at `voxvector/index.html`
- responsive product landing page
- evidence-first product positioning
- four-stage analytical workflow presentation
- current observational-method presentation
- scientific-state communication
- Motion-based progressive presentation
- `/voxvector/developer` entry point
- canonical documentation entry point

### Developer Console

Implemented at `/voxvector/developer`:

- Supabase Auth sign-in gate
- trusted developer-role check using `app_metadata`
- sign-out
- operational dashboard
- real `/health` query through TanStack Query
- API workbench for the actual `/v1/analyze` endpoint
- WAV upload and real request execution
- HTTP status, client timing, `X-Request-ID`, and response JSON visibility
- canonical documentation navigator
- development board
- explicit unavailable states for telemetry/error endpoints that do not yet exist
- Motion-based API activity visualization tied to real query/mutation state

The console does not fabricate request counts, error counts, 5xx totals, analysis totals, lifecycle events, or storage records.

## Developer access boundary

The browser gate is an interface authorization layer. It is not sufficient to secure sensitive backend data.

Current developer admission requires:

```text
Supabase session exists
AND
user.app_metadata.role == "developer"
OR
user.app_metadata.voxvector_role == "developer"
```

Only trusted server/admin processes should assign these metadata values.

The next backend security milestone must validate Supabase access tokens in FastAPI and enforce the developer role on diagnostic/operational endpoints before those endpoints expose sensitive data.

See `docs/DEVELOPER_ACCESS.md`.

## API/data contract

`voxvector/src/lib/api.js` is the frontend API boundary. It preserves:

- HTTP status
- request ID
- response payload
- client-observed timing
- backend error detail

The canonical API base defaults to `https://voxvector.crownlabs.tech` and can be overridden with `VITE_VOXVECTOR_API_URL`.

## State-driven animation

Motion may animate actual query/mutation state, but it may not manufacture analytical progress.

The current console uses an indeterminate activity waveform for real `/health` and `/v1/analyze` requests because the backend does not expose numeric progress. Completed, idle, and error states are also rendered from actual request state.

If the backend later provides discrete lifecycle events, the UI will present discrete lifecycle states. Numerical percentages require an actual defined backend progress metric.

## Analysis Workspace

The Analysis Workspace remains the next major product surface. It will be connected only to actual API contracts and will preserve:

1. eligibility and reliability
2. evidence collection and analysis
3. candidate classification
4. final classification/disposition

It must expose uncertainty, convergence/conflict, alternatives, data quality, and abstention rather than collapsing the process into a single score.

## Telemetry roadmap

The console currently marks these areas as unavailable rather than simulating them:

- persistent error browser
- protected diagnostic detail
- lifecycle event stream
- request/error/5xx/analysis aggregates
- recurrence and resolution tracking

These require backend query contracts over the existing Supabase diagnostic architecture.

## Accessibility

The interface must retain:

- readable text sizes
- strong contrast
- keyboard-accessible controls
- semantic form labels
- visible focus states
- reduced-motion support
- mobile usability
- explicit error/loading/unavailable states
- non-color-only status communication

## Deployment

The GitHub Pages workflow builds `voxvector/` with Vite and stages the compiled application at `/voxvector/`. The workflow also stages a concrete `/voxvector/developer/index.html` route and a local `/voxvector/404.html` fallback. The root `voxvector.html` is a compatibility redirect only and must not contain a second landing implementation.

## Acceptance principle

The frontend is complete only when important workflows operate against real VoxVector API/data behavior, authorization boundaries are enforced, failures are visible, and browser/accessibility/deployment verification succeeds. A polished mockup is not completion.
