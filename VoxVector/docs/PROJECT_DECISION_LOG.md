# VoxVector Project Decision Log

## 2026-08-19 — Product objective and deception detection identity

**Decision:** VoxVector's canonical product objective is vocal and audio deception detection. Product, executive, and technical documentation must describe VoxVector as a deception detection system while separately reporting current implementation and scientific validation status.

**Reason:** Lack of validated inference today is a maturity state, not a change to the product being built. Documentation must not accidentally downgrade deception detection from the core product objective to an incidental research topic.

**Resolution:**

- product identity: vocal/audio deception detection system
- current runtime: observational analysis foundation with guarded indeterminate classification
- future inferential capability: validated task-specific deception classification, subject to the validation program
- documentation must distinguish product objective, implementation state, research candidates, and validated capability

## 2026-08-19 — Canonical application root and deployment layout

**Decision:** `./VoxVector/` is the canonical VoxVector application root. The root-level `./api/` directory is not part of VoxVector and must not be used as its deployment root.

**Resolution:**

- HTTP adapter: `VoxVector/api/app.py`
- Analysis engine: `VoxVector/src/voxvector/`
- API dependencies: `VoxVector/api/requirements.txt`
- Render root: `VoxVector`
- Render entry point: `api.app:app`
- conflicting root-level VoxVector API files removed

The adapter is an interface/runtime boundary only and must not become a second analysis engine.

## 2026-08-19 — Documentation capability preservation

**Decision:** Features and analysis methods documented as planned, research candidates, or future capabilities remain part of the canonical VoxVector project context even when they are not currently implemented.

**Reason:** Documentation is also the research and product roadmap. Removing a capability because implementation is pending destroys traceability and incorrectly converts a development gap into an apparent retirement decision.

**Rule:** A capability may move between `planned`, `implemented`, `integrated`, and `validated` states. It may be retired only by an explicit project decision. No feature is considered obsolete solely because it is not yet present in code.

**Canonical records:** `docs/CAPABILITY_STATUS.md` and `docs/ROADMAP.md` preserve the full future-development map.

## 2026-08-19 — Render-compatible dependency baseline

**Decision:** Pin the production Render runtime to Python 3.11.9 and use NumPy 2.4.6 with the reviewed API dependency set.

**Reason:** The deployed VoxVector service successfully builds and runs on Python 3.11.9, while NumPy 2.5.1 requires Python >=3.12 and therefore cannot resolve in the pinned production runtime. The earlier 3.12 decision was superseded by the observed deployment compatibility requirement.

**Pinned baseline:** Python 3.11.9, NumPy 2.4.6, FastAPI 0.140.8, Uvicorn 0.51.0, python-multipart 0.0.32.

**Boundary:** Dependency upgrades are software compatibility changes, not scientific validation.

## 2026-08-19 — MFCC primary-pipeline integration

**Decision:** Integrate the existing MFCC implementation into the primary `VoxVectorPipeline` as an observational feature family.

**Implementation:** Thirteen MFCC coefficient means are now emitted with per-coefficient summary statistics and provenance. Processing remains bounded by the existing frame-chunk architecture.

**Boundary:** MFCC observations are evidence inputs only. Integration does not make MFCC a validated deception indicator or enable deception inference.

## 2026-08-19 — Public deployment target and verification

**Decision:** The intended public VoxVector product target is `voxvector.crownlabs.tech`.

**Verification:** Render successfully deployed the canonical application, `/health` returned 200 with `runtime_self_test: passed`, the runtime reported canonical package paths and source fingerprints, and a prior live `/v1/analyze` execution successfully produced structured observational analysis with guarded indeterminate disposition.

**Remaining requirement:** Full deception inference remains a research and validation objective, not a current validated runtime capability.

## 2026-08-19 — Runtime 502 incident and diagnostic hardening

**Observation:** A public Swagger `/v1/analyze` request returned HTTP 502. The response identified Cloudflare as the edge server and Render as the origin, with zero response content. Render health checks remained successful around the deployment period.

**Decision:** Treat the event as an unresolved runtime reliability incident. Do not classify it as a scientific or analytical result. Do not assume the cause without evidence.

**Required engineering response:** Add request correlation, stage-level diagnostics, persistent sanitized error logging, resource/timeout safeguards, controlled reproduction, and exact source-revision verification. The investigation must distinguish application exception, process termination/OOM, timeout, and infrastructure failure.

**Status:** Open. Tracked in `docs/PROJECT_CHECKPOINT_2026-08-19.md` and the Phase A roadmap hardening work.

## 2026-08-19 — Durable diagnostic storage backend

**Decision:** Use the existing Supabase architecture as the durable operational storage backend for VoxVector diagnostics. Do not add a second storage provider solely for error logs.

**Implementation:** Added a dependency-free Supabase Storage adapter under `VoxVector/api/storage.py` and request observability under `VoxVector/api/observability.py`. `/v1/analyze` now receives a request correlation ID, emits lifecycle/stage diagnostics, and returns `X-Request-ID`. Diagnostic objects are sanitized JSON and exclude raw audio and raw transcript content.

**Storage model:** Private `voxvector-logs` bucket, organized by UTC date and request ID. The service-role key is server-side only. Storage failure is non-fatal to the analysis API and falls back to a sanitized Render process-log marker.

**Reason:** The current 502 investigation requires durable evidence that survives Render instance restarts. A `request.started` record is particularly valuable when the process terminates before a response or application exception can be recorded.

**Boundary:** Durable diagnostics improve operational observability only. They do not establish scientific validation or deception inference.

**Verification still required:** Configure Render secrets, verify the private bucket, run a known analysis, confirm stored lifecycle records and `X-Request-ID`, then reproduce/investigate the 502 with the new evidence.

## 2026-08-19 — Frontend application stack standardization

**Decision:** Standardize the next VoxVector frontend development phase on **React + shadcn/ui + Tailwind CSS + Motion for React + TanStack Query**.

**Reason:** VoxVector needs a polished, responsive, accessible product interface with real API/data behavior and state-driven animation without replacing the existing Render and Supabase infrastructure or locking the application into a proprietary UI platform. The chosen stack keeps components application-owned, separates presentation from server state, and allows animation to follow actual runtime state.

**Architecture:**

- React: application shell and route composition
- shadcn/ui: accessible application-owned UI foundation
- Tailwind CSS: styling, tokens, responsive layouts, and theming
- Motion for React: state-driven transitions and interaction animation
- TanStack Query: server-state requests, caching, retries where safe, mutations, and invalidation
- FastAPI on Render: canonical VoxVector API remains unchanged
- Supabase: existing auth, persistent data, and diagnostic storage architecture remains unchanged

**Critical boundary:** The frontend is an interface over the canonical API. It must not duplicate the analysis engine, fabricate telemetry, or represent animation as evidence that analysis occurred.

**Developer Console scope:** `/developer` will become a functional operational console exposing real API status, telemetry, API request/response behavior, persistent error diagnostics, lifecycle events, documentation navigation, and development state as supported by actual backend data.

**Analysis Workspace scope:** The application will provide upload/record entry, interview context, waveform/input state, eligibility/reliability, live lifecycle state, evidence panels, convergence/conflict, uncertainty, alternatives, candidate classification, and final disposition presentation while preserving the four-stage analytical boundary.

**Status:** Architecture approved; frontend implementation is planned and has not yet been represented as implemented capability.

**Canonical documentation:** `docs/UI_APPLICATION_ARCHITECTURE.md`, `docs/ARCHITECTURE.md`, and `docs/ROADMAP.md`.

## 2026-08-19 — React landing refinement and Developer Console foundation

**Decision:** Continue the React migration as the canonical VoxVector public application and implement the first functional `/developer` console slice rather than extending the static landing page.

**Implemented:**

- refined public landing experience in `voxvector/src/App.jsx`
- `/voxvector/developer` route with GitHub Pages SPA fallback
- Supabase Auth sign-in gate
- trusted developer role check using `app_metadata`
- real TanStack Query `/health` integration
- real `/v1/analyze` API workbench with WAV upload
- request timing, HTTP status, `X-Request-ID`, errors, and raw/structured JSON response visibility
- canonical documentation navigator
- development board
- explicit unavailable states for telemetry/error endpoints not yet exposed by FastAPI
- frontend environment contract in `voxvector/.env.example`

**Security boundary:** Browser gating is not considered backend authorization. Sensitive diagnostics and operational telemetry must remain server-protected before corresponding endpoints are exposed to the console.

**Next:** Add Supabase JWT validation and developer-role enforcement to FastAPI, then expose protected diagnostic/error/event query contracts over the existing Supabase storage architecture.

**Canonical documentation:** `docs/UI_APPLICATION_ARCHITECTURE.md` and `docs/DEVELOPER_ACCESS.md`.
