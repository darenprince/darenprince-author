# VoxVector Project Decision Log

## 2026-08-19 — Product objective and deception detection identity

**Decision:** VoxVector's canonical product objective is vocal and audio deception detection. Product, executive, and technical documentation must describe VoxVector as a deception detection system while separately reporting current implementation and scientific validation status.

**Reason:** Lack of validated inference today is a maturity state, not a change to the product being built. Documentation must not accidentally downgrade deception detection from the core product being built to an incidental research topic.

**Resolution:**

* product identity: vocal and audio deception detection system
* current runtime: observational analysis foundation with guarded indeterminate classification
* future inferential capability: validated task specific deception classification, subject to the validation program
* documentation must distinguish product objective, implementation state, research candidates, and validated capability

## 2026-08-19 — Canonical application root and deployment layout

**Decision:** `./VoxVector/` is the canonical VoxVector backend and analysis engine root. The public React application is a separate `./voxvector/` workspace in the same repository and is deployed by GitHub Pages. The root level `./api/` directory is not part of VoxVector and must not be used as its deployment root.

**Resolution:**

* Backend HTTP adapter: `VoxVector/api/app.py`
* Analysis engine: `VoxVector/src/voxvector/`
* Backend API dependencies: `VoxVector/api/requirements.txt`
* Render root: `VoxVector`
* Render entry point: `api.app:app`
* Public frontend workspace: `voxvector/`
* GitHub Pages public path: `/voxvector/`
* GitHub Pages developer path: `/voxvector/developer/`
* Legacy `voxvector.html`: compatibility redirect only

The adapter is an interface and runtime boundary only and must not become a second analysis engine.

## 2026-08-19 — Documentation capability preservation

**Decision:** Features and analysis methods documented as planned, research candidates, or future capabilities remain part of the canonical VoxVector project context even when they are not currently implemented.

**Reason:** Documentation is also the research and product roadmap. Removing a capability because implementation is pending destroys traceability and incorrectly converts a development gap into an apparent retirement decision.

**Rule:** A capability may move between `planned`, `implemented`, `integrated`, and `validated` states. It may be retired only by an explicit project decision. No feature is considered obsolete solely because it is not yet present in code.

**Canonical records:** `docs/CAPABILITY_STATUS.md` and `docs/ROADMAP.md` preserve the full future development map.

## 2026-08-19 — Render compatible dependency baseline

**Decision:** Pin the production Render runtime to Python 3.11.9 and use NumPy 2.4.6 with the reviewed API dependency set.

**Reason:** The deployed VoxVector service successfully builds and runs on Python 3.11.9, while NumPy 2.5.1 requires Python 3.12 or newer and therefore cannot resolve in the pinned production runtime. The earlier 3.12 decision was superseded by the observed deployment compatibility requirement.

**Pinned baseline:** Python 3.11.9, NumPy 2.4.6, FastAPI 0.140.8, Uvicorn 0.51.0, python multipart 0.0.32.

**Boundary:** Dependency upgrades are software compatibility changes, not scientific validation.

## 2026-08-19 — MFCC primary pipeline integration

**Decision:** Integrate the existing MFCC implementation into the primary `VoxVectorPipeline` as an observational feature family.

**Implementation:** Thirteen MFCC coefficient means are now emitted with per coefficient summary statistics and provenance. Processing remains bounded by the existing frame chunk architecture.

**Boundary:** MFCC observations are evidence inputs only. Integration does not make MFCC a validated deception indicator or enable deception inference.

## 2026-08-19 — Public deployment target and verification

**Decision:** The intended public VoxVector product target is split by function: GitHub Pages hosts the public React application at `darenprince.com/voxvector`, while Render hosts the canonical FastAPI backend at `voxvector.crownlabs.tech`.

**Verification:** Render successfully deployed the canonical backend, `/health` returned 200 with `runtime_self_test: passed`, the runtime reported canonical package paths and source fingerprints, and prior live `/v1/analyze` execution produced structured observational analysis with guarded indeterminate disposition.

**Remaining requirement:** Full deception inference remains a research and validation objective, not a current validated runtime capability.

## 2026-08-19 — Runtime 502 incident and diagnostic hardening

**Observation:** A public Swagger `/v1/analyze` request returned HTTP 502. The response identified Cloudflare as the edge server and Render as the origin, with zero response content. Render health checks remained successful around the deployment period.

**Decision:** Treat the event as an unresolved runtime reliability incident. Do not classify it as a scientific or analytical result. Do not assume the cause without evidence.

**Required engineering response:** Add request correlation, stage level diagnostics, persistent sanitized error logging, resource and timeout safeguards, controlled reproduction, and exact source revision verification. The investigation must distinguish application exception, process termination or OOM, timeout, and infrastructure failure.

**Status:** Open. Tracked in `docs/PROJECT_CHECKPOINT_2026-08-19.md` and the Phase A roadmap hardening work.

## 2026-08-19 — Durable diagnostic storage backend

**Decision:** Use the existing Supabase architecture as the durable operational storage backend for VoxVector diagnostics. Do not add a second storage provider solely for error logs.

**Implementation:** Added a dependency free Supabase Storage adapter under `VoxVector/api/storage.py` and request observability under `VoxVector/api/observability.py`. `/v1/analyze` now receives a request correlation ID, emits lifecycle and stage diagnostics, and returns `X Request ID`. Diagnostic objects are sanitized JSON and exclude raw audio and raw transcript content.

**Storage model:** Private `voxvector-logs` bucket, organized by UTC date and request ID. The service role key is server side only. Storage failure is non fatal to the analysis API and falls back to a sanitized Render process log marker.

**Reason:** The current 502 investigation requires durable evidence that survives Render instance restarts. A `request.started` record is particularly valuable when the process terminates before a response or application exception can be recorded.

**Boundary:** Durable diagnostics improve operational observability only. They do not establish scientific validation or deception inference.

**Verification still required:** Configure Render secrets, verify the private bucket, run a known analysis, confirm stored lifecycle records and `X Request ID`, then reproduce and investigate the 502 with the new evidence.

## 2026-08-19 — Frontend application stack standardization

**Decision:** Standardize the next VoxVector frontend development phase on React, shadcn style application owned components, Base UI, Tremor React, Tailwind CSS, Motion for React, and TanStack Query.

**Reason:** VoxVector needs a polished, responsive, accessible product interface with real API and data behavior and state driven animation without replacing the existing Render and Supabase infrastructure or locking the application into a proprietary UI platform. The chosen stack keeps components application owned, uses Tremor for analytical interface blocks, and allows animation to follow actual runtime state.

**Architecture:**

* React: application shell and route composition
* shadcn style components: product owned composition and visual language
* Base UI: headless interaction primitives
* Tremor React: analytical cards, charts, progress indicators, and dashboard blocks
* Tailwind CSS: styling, tokens, responsive layouts, and theming
* Lucide React: interface iconography
* Motion for React: state driven transitions and interaction animation
* TanStack Query: server state requests, caching, retries where safe, mutations, and invalidation
* FastAPI on Render: canonical VoxVector API remains unchanged
* Supabase: existing auth, persistent data, and diagnostic storage architecture remains unchanged

**Critical boundary:** The frontend is an interface over the canonical API. It must not duplicate the analysis engine, fabricate telemetry, or represent animation as evidence that analysis occurred.

## 2026-08-19 — Vercel retirement

**Decision:** Vercel is retired from the VoxVector deployment architecture.

**Resolution:**

* GitHub Pages is the only canonical public frontend host
* Render is the canonical backend host
* `voxvector/package.json` contains no Vercel dependency
* the VoxVector frontend contains no Vercel configuration
* no VoxVector GitHub Actions workflow deploys to Vercel
* historical Vercel references are documentation history only and are not implementation instructions

**Boundary:** If a Vercel check remains visible on GitHub after source cleanup, it is an external repository or Vercel integration rather than a VoxVector application file. The correct response is to remove the external integration, not to add Vercel code back into VoxVector.

## 2026-08-19 — Tremor first landing implementation

**Decision:** Replace the prior mostly custom analytical presentation with direct Tremor React components while retaining VoxVector specific shadcn style composition and Base UI interaction primitives.

**Implemented:**

* Tremor `Card` for analytical surfaces
* Tremor `AreaChart` for signal behavior visualization
* Tremor `DonutChart` for evidence direction visualization
* Tremor `ProgressBar` for illustrative evidence activity
* application owned shadcn style Card and Badge composition
* Base UI backed Button controls
* Lucide iconography throughout the public landing experience
* Motion reveal and interaction animation with reduced motion support
* restrained blue and cyan analytical palette with semantic state colors
* thin neutral borders and low contrast surfaces instead of heavy white framing
* responsive mobile navigation and desktop information hierarchy

**Boundary:** Landing charts are interface illustrations. They do not represent live production telemetry, scientific validation, or fabricated deception results.

## 2026-08-19 — Landing hardening and Base UI component foundation

**Decision:** Keep Tremor as the dominant analytical visual language while making Base UI the headless interaction primitive underneath VoxVector's application owned components. shadcn patterns remain the composition model above those primitives.

**Implemented:**

* added `@base-ui/react` to the public application dependency set
* added an application owned `src/components/ui/Button.jsx` primitive backed by Base UI
* wired the public mobile navigation control and developer authentication controls through the primitive
* hardened developer sign out to await Supabase Auth completion and expose sign out errors
* added keyboard focus treatment and reduced motion support
* added a skip to content control for keyboard users
* reduced decorative violet treatment while retaining color balance and semantic state use
* corrected the Project Briefing link to the canonical Crown Labs VoxVector product brief
* replaced dead legal footer placeholders with navigable privacy, terms, security, and contact destinations
* added product specific privacy and terms policy drafts under `VoxVector/docs/`

**Boundary:** The landing page remains an interface illustration. Its metrics and waveform are not live telemetry and must not be represented as production analysis results.

**Verification status:** The changes are committed to GitHub. GitHub Actions workflow verification is still required before claiming a successful production build or deployment.

**Next:** Verify the public build and deployment, then continue the same component system into the Analysis Workspace and Developer Console without introducing a competing visual language.

## 2026-08-19 — QA dependency failure found and corrected

**Observation:** The uploaded GitHub Actions log for commit `b505e84bb8f0c3bd812970490cde090260e8188a` showed the backend suite passing with `91 passed in 0.56s`, then the React dependency installation failing before the build. npm reported `ERESOLVE` because the application declared React `^19.0.0` while `@tremor/react@3.18.7` declares a React `^18.0.0` peer requirement.

**Decision:** Keep Tremor as a first class dependency and align the VoxVector frontend to the supported Tremor React runtime instead of bypassing peer resolution with `--force` or `--legacy-peer-deps`.

**Resolution:**

* `voxvector/package.json` version advanced to `0.2.31`
* React pinned to `18.3.1`
* React DOM pinned to `18.3.1`
* `npm install` remains the QA installation command so dependency resolution is checked normally
* QA Node runtime advanced from Node 20 to Node 22
* npm cache is enabled using `voxvector/package.json` as the cache dependency path

Tremor's current installation documentation requires React 18.2.0 or newer. The currently published `@tremor/react` package is 3.18.7.

**Boundary:** This is a dependency compatibility correction. It does not change the scientific status of VoxVector.

**Verification:** The uploaded log establishes the exact pre fix failure and the successful 91 test backend result. A fresh QA run after the fix is required before claiming the React production build passes.
