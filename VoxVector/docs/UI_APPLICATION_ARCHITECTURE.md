# VoxVector UI Application Architecture

## Status

**Decision:** Approved architecture for the frontend development phase.

**Implementation state:** React public application shell is now implemented at `voxvector/index.html` with source under `voxvector/src/`. The Developer Console, Analysis Workspace, and live API data integration remain in active development.

**Purpose:** Define the frontend architecture so UI work extends the existing runtime rather than creating a parallel product or inventing API behavior.

## Architecture decision

VoxVector uses a small, open-source React application stack:

| Layer | Standard | Role |
|---|---|---|
| Application | React | Product application shell and route composition |
| UI foundation | shadcn/ui-compatible composition | Application-owned accessible components and interface primitives; formal shadcn component installation remains planned |
| Styling | Tailwind CSS | Design tokens, responsive layout, typography, spacing, and theming |
| Animation | Motion for React | State-driven transitions, loading states, progressive disclosure, gestures, and visualization motion |
| Server state | TanStack Query | API requests, caching, retries, mutations, invalidation, and request lifecycle handling |
| Authentication | Supabase Auth | User authentication and session handling when authenticated workflows are enabled |
| Persistent operational data | Existing Supabase architecture | Application data, operational events, and diagnostics according to existing security boundaries |
| API | FastAPI on Render | Canonical VoxVector HTTP interface; remains in place |
| Visualization | SVG / native charting as appropriate | Waveforms, evidence displays, timing, reliability, and analysis visualization |
| Documentation | VoxVector canonical docs | Product and technical source of truth |
| Deployment | Existing repository GitHub Pages workflow for the public frontend | Builds `voxvector/` with Vite and stages the compiled application at `/voxvector/`; Render API infrastructure is unchanged |

## Current frontend implementation

The first migration milestone is complete:

- `voxvector/index.html` is the React/Vite application entrypoint.
- `voxvector/src/App.jsx` contains the public VoxVector application shell.
- `voxvector/src/main.jsx` establishes React and TanStack Query.
- `voxvector/src/index.css` establishes the frontend styling baseline.
- `voxvector/tailwind.config.js` and `voxvector/postcss.config.js` define the frontend styling pipeline.
- `voxvector/vite.config.js` defines the `/voxvector/` deployment base.
- `.github/workflows/voxvector-qa.yml` builds the React application in CI.
- `.github/workflows/deploy-pages.yml` builds and stages the compiled frontend under `/voxvector/`.

The migration is deliberately limited to the public application shell at this stage. It does not claim that the Developer Console or Analysis Workspace are complete.

The current repository did not contain a root `voxvector.html` file when the migration was performed. Therefore no nonexistent file was deleted. `labs/products/voxvector.html` remains a separate Crown Labs product-page artifact and is not silently repurposed.

## Infrastructure boundary

The existing backend remains authoritative:

```text
                         VOXVECTOR
                              |
             +----------------+----------------+
             |                                 |
        React application                 FastAPI API
          /voxvector/                          |
             |                               Render
       Tailwind + UI                          |
             |                         /health /v1/analyze
           Motion                              |
             |                                 |
      TanStack Query                           |
             |                                 |
             +---------------+-----------------+
                             |
                         Supabase
                    Auth / data / diagnostics
```

The frontend must consume the canonical API. It must not duplicate analysis logic, invent analysis stages, or create client-only interpretations that masquerade as backend results.

Render remains the VoxVector API runtime. Supabase remains the existing persistence, authentication, and operational diagnostics layer. The frontend is an interface layer over those services.

## Application shell

### Public application

Implemented initial shell:

- VoxVector identity and product explanation
- evidence-based positioning
- deception-analysis workflow explanation
- current observational method summary
- scientific-status communication
- responsive navigation and layout
- product/API entry point
- repository documentation entry point
- Motion-based presentation transitions

Next public-application work:

- formal shadcn component installation and shared component primitives
- deeper product imagery/visual analysis elements where useful
- documentation navigator integration
- API-backed product entry flow

### Analysis Workspace

Planned/next major product surface:

- upload or recording entry point where supported by the runtime
- interview/question context
- audio waveform and input metadata
- eligibility and reliability state
- live processing lifecycle
- evidence panels
- acoustic observations
- linguistic observations when transcript data is available
- timing and prosody observations
- evidence convergence and conflict
- uncertainty and alternative explanations
- candidate classification state
- final disposition state

The workspace must distinguish data received from the API from UI presentation state. It must never imply that a visual animation represents analysis unless corresponding API state exists.

### Developer/Admin Console

The `/developer` area is an operational interface over real VoxVector telemetry and API behavior.

Planned sections:

- Dashboard
- API Interface
- Error Reports
- Logs
- Documentation Navigator
- Development Board
- system/runtime status

The console should expose actual values where available, including API health, pipeline version, source revision, request counts, error counts, lifecycle events, request IDs, and diagnostic records. Placeholder metrics must not be presented as live telemetry.

## Developer Console contract

### Dashboard

Display live or explicitly labeled historical values for:

- API status
- storage status
- logging/diagnostic status
- pipeline version
- deployed source revision when available
- Render runtime status when available
- request volume
- error volume
- 5xx volume
- completed analysis count when persisted data supports it
- current development phase
- next development item

### API Interface

This must be a functional API workbench, not fake API documentation.

The interface should support, subject to endpoint permissions and the actual API contract:

- endpoint inventory
- `/health`
- `/v1/analyze`
- request method and URL
- headers
- payload editor
- request execution
- response viewer
- HTTP status
- timing
- request ID / correlation ID
- source revision
- pipeline version
- raw JSON
- formatted response

The workbench must surface actual backend errors and status codes rather than converting failures into generic success states.

### Error Reports

The console should consume durable diagnostics when available and present:

- severity
- timestamp
- request ID
- pipeline version
- source revision
- route and HTTP method
- stage
- error type/message
- timing
- sanitized request/response metadata
- related lifecycle events
- previous occurrences when the data model supports recurrence tracking
- resolution status

Raw audio and raw transcript content must remain excluded from the current diagnostic storage model.

### Logs

The UI should present the actual lifecycle event stream, for example:

```text
REQUEST_STARTED
AUDIO_ACCEPTED
ELIGIBILITY_COMPLETE
ACOUSTIC_COMPLETE
PIPELINE_COMPLETE
RESPONSE_SENT
```

The UI may animate these events, but the event source must be real API/Supabase telemetry. A locally generated animation is not a substitute for an event.

### Documentation Navigator

The console should link directly to canonical documentation, including:

- Architecture
- Methodology
- API
- Pipeline
- Acoustic analysis
- Linguistic analysis
- Reliability
- Validation
- Security
- Deployment
- Research
- Decision log
- Capability status
- Roadmap

The navigator is intended to connect the product interface to the maintained documentation rather than creating a disconnected second documentation system.

### Development Board

The console should expose development state from a maintainable source of truth rather than hard-coded marketing copy.

Initial categories:

- **CURRENT** — Developer Console
- **NEXT** — Persistent Error Intelligence
- **NEXT** — API Observability
- **NEXT** — Documentation Navigator
- **NEXT** — Production Hardening
- **RESEARCH** — Future deception-analysis methods
- **BLOCKED** — Work waiting on an actual dependency

Each work item should support:

- priority
- status
- dependencies
- acceptance criteria
- implementation notes
- source documentation
- verification state

## State-driven animation

Motion is an interaction layer, not an analysis engine.

The intended pattern is:

```text
API request begins
        |
        v
request lifecycle state
        |
        +--> eligibility progress
        |
        +--> evidence stage completion
        |
        +--> result data arrival
        |
        v
Motion progressively reveals the corresponding UI
```

Percentages are allowed only when the backend provides a defined progress metric. If the API provides only discrete lifecycle states, the UI must use discrete states rather than fabricating numerical progress.

## TanStack Query data contract

TanStack Query owns server-state concerns such as:

- request lifecycle
- loading/error/success states
- caching
- retries where safe
- invalidation
- mutations
- background refresh where appropriate
- stale-data indicators

Local React state remains responsible for transient presentation concerns such as panel selection, editor state, open dialogs, and animation state.

The frontend must preserve backend request IDs and error metadata through the query layer so operational debugging remains possible from the UI.

## Accessibility and responsive design

The UI architecture must prioritize:

- readable text sizes
- strong contrast
- keyboard accessibility
- semantic controls
- visible focus states
- reduced-motion support
- responsive layouts
- mobile usability
- clear error and loading states
- non-color-only status communication

Animation must never be required to understand analysis results.

## Scientific presentation boundary

The frontend must preserve the VoxVector evidence model:

1. eligibility and reliability
2. evidence collection and analysis
3. candidate classification
4. final classification/disposition

The interface must not collapse these into a single dramatic score. It must communicate observations, convergence/conflict, uncertainty, alternative explanations, data quality, and abstention where applicable.

No visual treatment may imply that stress, hesitation, pitch, silence, arousal, emotion, cognitive load, speaking rate, pauses, prosody, or any other individual feature proves deception.

## Implementation sequence

### UI-01 — React application foundation — IMPLEMENTED

- establish the React application boundary at `voxvector/`
- establish Tailwind/PostCSS styling
- establish responsive public application shell
- establish Motion
- establish TanStack Query client boundary
- establish GitHub Pages build and deployment path

### UI-02 — API client foundation — NEXT

- define typed API contracts from the actual FastAPI schemas
- implement TanStack Query API hooks
- preserve request IDs and error metadata
- implement health and analysis request hooks
- implement explicit unavailable/error states

### UI-03 — Developer Console — NEXT

- dashboard backed by actual health/telemetry
- API workbench
- error report views
- live/polling event stream as supported by the backend
- documentation navigator
- development board

### UI-04 — Analysis Workspace

- input/upload workflow
- waveform and input metadata
- eligibility/reliability display
- lifecycle-driven analysis state
- evidence panels
- uncertainty and alternative explanations
- candidate/disposition presentation

### UI-05 — Public product experience

- deepen the migrated landing experience
- formal shadcn component system
- methodology and documentation integration
- purposeful visual analysis elements
- accessibility and responsive refinement

### UI-06 — Verification and hardening

- browser-level workflow verification
- API integration verification
- responsive/mobile verification
- accessibility checks
- error-state verification
- reduced-motion verification
- deployment verification against the exact API revision

## Non-goals

- replacing Render with another API platform
- replacing Supabase solely to support the frontend
- implementing a second analysis engine in React
- fabricating progress metrics or telemetry
- presenting unvalidated deception inference as a production capability
- using animation to conceal missing or failed backend state

## Acceptance principle

The frontend is complete only when its important workflows operate against real VoxVector API/data behavior, failure states are visible, and the UI remains faithful to the repository's scientific and operational contracts. A polished mockup without functional data flow does not satisfy this architecture.
