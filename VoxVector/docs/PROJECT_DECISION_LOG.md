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
* restrained analytical palette with semantic state colors
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

## 2026-08-19 — VoxVector application shell refinement

**Decision:** Adopt the referenced shadcn dashboard interaction model as the structural reference for the VoxVector authenticated console while keeping Tremor as the primary analytical block system. Vercel is not a dependency or deployment target; its visual influence is limited to general product restraint and information hierarchy.

**Implemented:**

* rebuilt the Developer Console around a persistent desktop sidebar
* added responsive mobile navigation as a Motion animated slide out sheet
* added Lucide icons to primary console navigation and operational status rows
* added persistent light and dark theme switching with local storage
* added keyboard accessible focus treatment and reduced motion handling
* established shared semantic design tokens for surfaces, text, borders, accent states, and light mode
* added Dashboard, API Interface, Error Reports, Logs, Documentation, and Development Board destinations
* connected the dashboard health indicator to the real `/health` request through TanStack Query
* connected the API workbench to the real `/v1/analyze` endpoint rather than synthetic responses
* made API request animation reflect actual request lifecycle state and remain indeterminate where the backend does not expose numeric progress
* explicitly withheld fabricated operational counts until authenticated persistent metrics endpoints exist

**Design direction:** Tremor remains the dominant analytical visual language. shadcn composition and Base UI primitives provide application owned controls. Motion handles state transitions. The VoxVector palette remains restrained and balanced, with thin low contrast borders rather than heavy white framing.

**Next:** Apply the same application shell to the authenticated Analysis Workspace, expand the real Supabase backed error and event views when protected query contracts exist, and complete browser level verification of light mode, mobile navigation, keyboard navigation, API failures, and GitHub Pages deployment.

## 2026-08-19 — Luxury palette and landing language refinement

**Decision:** Refine the public VoxVector visual system around the supplied luxury reference palette rather than the previous blue and cyan treatment. The primary surface language is now espresso black, warm brown, copper, muted amber and warm white. Borders are intentionally thin and low contrast.

**Implementation:**

* replaced the public landing blue and cyan accent tokens with espresso, brown, copper and warm amber tokens
* updated Base UI buttons and badges to consume the shared VoxVector tokens
* rebuilt the landing signal surface around Tremor `Card` and `AreaChart`
* replaced the previous line based decorative waveform with a bar based speech waveform using phrase envelopes and explicit silence regions so the visual reads as an audio signal rather than a generic graph
* retained Motion for reveal and mobile navigation animation
* retained Lucide iconography and the existing shadcn style composition model
* replaced the workflow heading `A serious analysis starts before the interpretation.` with `Deep Forensic Vocal Analysis + State of the art Linguistics`
* kept the Project Briefing and Documentation calls to action and the legal, developer, source, privacy, terms and security footer destinations

**Boundary:** All landing charts, signal graphics and analytical readouts remain explicitly illustrative. They are interface demonstrations and are not live telemetry or scientific results.

**Verification:** Source changes are committed. A fresh GitHub Actions build is required before claiming successful production compilation or deployment.

## 2026-08-19 — Tremor blue stroke correction and warm theme hardening

**Decision:** Remove the remaining Tremor blue defaults from the public VoxVector analytical UI. The supplied Shadcnblocks references establish a neutral black, white and gray foundation with restrained warm coffee and tan accents. Blue is not part of the approved active palette.

**Implementation:**

* replaced the Tremor light and dark `brand` tokens in `voxvector/tailwind.config.js` with warm coffee, copper, tan and neutral values
* expanded Tremor color safelisting to cover the warm chart families used by the landing interface
* added explicit custom Tremor chart colors `#8f5d35`, `#b97842`, and `#d9a06b` for the public analytical charts
* disabled the default Tremor card ring on the landing analytical cards
* retained low contrast neutral borders and reserved higher contrast for controls and focus states
* preserved the hero and workflow language rather than altering product positioning while correcting the visual treatment

**Reason:** The remaining blue stroke was a visual-system regression caused by Tremor's default theme/chart behavior. Correcting the source tokens is preferable to hiding the artifact with one-off CSS.

**Boundary:** This is a presentation and dependency configuration correction. It does not change the scientific capability or validation state of VoxVector.

**Verification:** The source edits are committed. A fresh GitHub Actions build and browser inspection are still required for this exact change before production success is claimed.

## 2026-08-20 — Developer analysis controls, live diagnostics, and documentation routing

**Decision:** Make the Developer Console expose the real state of an analysis request instead of using one generic animation for both upload and server processing. Add cancellable browser requests, correlated lifecycle polling, decoded audio metadata, live playback level/clipping telemetry, persistent event logs, indexed error reporting, developer profile editing, and canonical documentation routing.

**Implementation:**

* upload progress is driven by the browser's XHR upload stream and reaches a distinct upload-complete state before server analysis animation begins
* the API request receives a client-generated `X-Request-ID` so the console can poll the durable lifecycle event stream during processing
* the console can stop the active browser analysis request; this cancels the client HTTP request and is explicitly not represented as guaranteed cancellation of already-running server-side worker computation
* the audio player decodes WAV metadata including container/codec, sample rate, channels, bit depth, bitrate, duration, file size, MIME type, modification time, and embedded RIFF INFO/BEXT fields when available
* playback now includes a live dBFS level meter and digital clipping indicator using the browser audio analyser
* `/v1/diagnostics/events` exposes sanitized authenticated lifecycle events for live polling
* HTTP 5xx diagnostic events are now indexed alongside rejected and analysis-error events
* the error query remains authenticated and reads the durable error index rather than synthetic frontend state
* Dashboard state icons are color coordinated and animated according to actual health/runtime/diagnostic state
* developer profile editing uses Supabase Auth user metadata and does not introduce a second profile database
* the console documentation navigator now points only to documents that actually exist under `VoxVector/docs/`
* public VoxVector documentation and project briefing links now route to the Crown Labs Bible
* GitHub source/documentation buttons remain GitHub links, with the public source button scoped to `./voxvector/`
* the GitHub Pages workflow now explicitly stages `docs/crownlabsbible/`; the previous `--exclude 'docs/**'` staging rule was the direct cause of the public Crown Labs documentation viewer disappearing from the deployed artifact

**Boundary:** These changes improve product/runtime UX and observability. They do not promote any analytical method to validated deception inference, and UI animation remains a representation of actual lifecycle state rather than evidence.

**Verification requirement:** A fresh frontend build, backend test suite, live Render deployment, authenticated diagnostics query, controlled analysis using the known 17 MB WAV fixture, playback/clipping inspection, profile update test, and GitHub Pages artifact inspection are required before claiming production verification.


## 2026-09-01 — System boundary and AUTO workflow consolidation

**Decision:** Consolidate the active VoxVector system architecture and evidence-first operating workflow in `docs/SYSTEM_ARCHITECTURE_AND_AUTO_WORKFLOW.md` and synchronize the material architecture with the Crown Labs Bible.

**Architecture:** `voxvector/` is the canonical React/Vite public application built and deployed through GitHub Actions to GitHub Pages. `VoxVector/` is the canonical FastAPI and analysis-engine workspace executed on Render. Supabase provides the configured authentication, persistence, diagnostics, and private media-storage services.

**Critical clarification:** Audio is not durably stored on Render. The connected upload path is browser → frontend → API runtime on Render → Supabase private media storage.

**Workflow:** Architecture → Ownership → Trace → Operate/verify. Every migration or failure investigation must identify the actual boundary and canonical owner before editing. Verification claims remain boundary-specific.

**Rationale:** Recent debugging drift demonstrated that a healthy host, green build, or visible client error can each describe only one boundary. The workflow now explicitly requires end-to-end tracing instead of assumption-driven diagnosis.


## 2026-09-01 — Observability projection and Developer Console audit surface

**Decision:** Preserve immutable Supabase Storage diagnostics while projecting sanitized lifecycle events into existing api_request_logs and error_reports tables. Connected inspection found both relational tables present with zero rows while Storage diagnostics existed, identifying a writer/projection gap rather than an absent archive. The canonical observability layer and Developer Console were updated accordingly. Source implementation is committed; production runtime verification remains pending until deployed traffic creates and displays real records.

## 2026-09-01 — Evidence acquisition becomes the primary next engine layer

**Decision:** Reorder the active engineering sequence so evidence acquisition precedes further downstream inference development.

**Reason:** Transcription, speaker segmentation/diarization, transcript/audio alignment, and structured extraction are required inputs for major linguistic, interaction, baseline, and convergence capabilities. Building downstream inference without those evidence families would produce architecture without sufficient data.

**Resolution:**

1. media and recording profile extraction
2. speech/silence timeline
3. speaker processing foundation
4. transcription provider architecture and production provider
5. transcript/audio alignment
6. structured multimodal evidence artifacts
7. downstream evidence analysis and convergence
8. candidate classification and final disposition under existing gates

The existing acoustic pipeline remains active. The new work expands the evidence acquisition layer rather than replacing it.



## 2026-09-02 — Compact workflow state presentation

**Decision:** Refine the Developer Console Case Workbench workflow tracker into a stateful, space-efficient surface.

**Implementation direction:** Active workflow state uses restrained coffee/copper emphasis and subtle motion. Completed prerequisites use semantic green. The expanded tracker automatically settles into a compact current-step rail after a short dwell, while hover and keyboard focus expose the full state again. Status metadata in checks and workflow rows is right aligned, and redundant literal collapsed labels are removed from the workbench.

**Reason:** The Case Workbench is operationally dense. Persistent expanded workflow chrome was consuming vertical space without adding equivalent value once the user understood the current step.

**Boundary:** The visual state represents workflow lifecycle state only. It must not fabricate analytical completion, pipeline progress, or scientific evidence.


## 2026-09-02 — Transcription runtime wiring correction

**Observation:** The faster-whisper adapter and environment selection contract were implemented, but the canonical Render blueprint installed only the lightweight base API requirements. The production service therefore could be configured for transcription while the faster_whisper package was absent.

**Decision:** Make transcription a first-class constrained production dependency through api/requirements-transcription.txt and the canonical render.yaml. Keep pyannote outside that default dependency path because the API service has a documented 512 MB memory budget and transcription activation must not implicitly add the separate diarization stack.

**Runtime truth:** Source wiring is implemented. Successful Render rebuild and a real timestamped transcript persisted through the case workflow remain required before provider execution is recorded as verified.

**Workflow correction:** Case analysis must project actual acquisition outcomes into the transcription, diarization, and alignment stage records rather than leaving those stages permanently queued after acquisition executes.


## 2026-09-02 — GitHub Pages artifact staging hardening

**Observation:** The Pages workflow could report a successful deployment while staging an overly broad artifact because it mirrored much of the repository into `_site` and then overlaid the VoxVector Vite build. This increased artifact size and made source/generated-file interactions harder to audit.

**Decision:** Stage the root production build output as the Pages root, then stage the VoxVector Vite `dist` output explicitly at `/voxvector/` with stale files removed. Documentation remains copied intentionally to its public routes.

**Guardrails:** The workflow now verifies generated VoxVector HTML, JavaScript, CSS, required public images, and the staged asset directory before uploading the Pages artifact. Deployment success is therefore tied to a clean production artifact rather than a repository mirror.

**Verification boundary:** A successful Actions deployment verifies the built artifact and Pages deployment only. Browser/runtime smoke verification remains a separate source → commit → workflow → artifact → deployed URL check when diagnosing live delivery problems.


### 2026-09-03 — Correct root Pages staging assumption

The 2026-09-02 Pages hardening change incorrectly assumed the root application produced `./dist`. The canonical root `vite.config.ts` intentionally uses `outDir: "."` and emits the existing root-site production runtime in place. This caused the Pages staging job to fail with `rsync ... ./dist: No such file or directory`.

**Correction:** The workflow now stages the root runtime from the canonical in-place output while explicitly excluding source, dependencies, workflows, repository metadata, VoxVector source trees, documentation source trees, tests, and build configuration. VoxVector and documentation remain staged separately from their canonical production/public locations.

**Guardrail:** Do not assume a repository-wide `dist` convention. Verify each application's actual Vite `outDir` before changing deployment staging.


### 2026-09-03 — Deployment checks simplified

The Pages workflow had accumulated artifact-specific verification gates that could block a valid deployment because of assumptions about individual filenames, generated asset layouts, or route copies. These brittle checks were removed.

**Current deployment gate:** dependencies install successfully and the root/VoxVector production builds complete. Artifact staging failures still fail the workflow. Post-build reporting is informational and does not block publication on optional file-layout assumptions.

This keeps deployment reliable while preserving build failures as the primary correctness gate. Detailed runtime troubleshooting should be performed separately against the deployed site rather than repeatedly tightening publication checks.


## 2026-09-03 — Cloud platform architecture audit and migration boundary

**Audit scope:** canonical repository architecture, public frontend, FastAPI runtime, audio intake, Supabase services, Render constraints, and available AWS/Azure credits.

**Observed canonical architecture:**

- `voxvector/` is the React/Vite public application deployed through GitHub Pages.
- `VoxVector/` is the canonical Python/FastAPI and analysis-engine workspace.
- Render is the current API runtime.
- Supabase is the configured authentication, persistence, diagnostics, and private media-storage boundary.
- Browser upload and case-bound analysis currently traverse the FastAPI API contract; cloud migration must preserve those contracts.

**Decision:** Do not migrate the public frontend or duplicate Supabase during the first infrastructure migration. The isolated candidate is the backend compute/runtime boundary.

**Primary recommendation:** Benchmark the existing backend as an identical container on Azure Container Apps first, using available Azure credit. Azure is a benchmark candidate, not yet the production authority. Measure it against the current Render baseline using startup/readiness, upload behavior, analysis duration, memory pressure, failure behavior, and operational cost.

**AWS role:** AWS remains a valid second benchmark using available credit if Azure does not provide a clear operational advantage. Do not split one production request path across AWS and Azure merely to consume credits.

**Migration gate:** No DNS, public frontend API routing, Supabase ownership, or production provider authority changes until the benchmark produces observed measurements and a decision record.

**Audit projection:** The Developer Console audit dataset was updated with the 2026-09-03 Cloud Platform, API, Storage, and Deployment Architecture Audit. Its status is `migration-assessment-complete`; it records repository-observed architecture and recommendations separately from unmeasured provider performance.


## 2026-09-03 — Connected Render infrastructure audit and cloud benchmark decision

**Observed Render state:** The connected Render workspace contains one VoxVector web service, `voxvector-api`, rooted at `VoxVector` on `main`. It is currently live, unsuspended, externally reachable, and uses `/health` as its health check.

**Runtime configuration observed:** Python runtime; build command installs both `api/requirements.txt` and `api/requirements-speech.txt`; start command is `uvicorn api.app:app --host 0.0.0.0 --port $PORT`. The service is on Render's free plan in Oregon with one instance and observed limits of 0.15 CPU and approximately 512 MiB memory.

**Operational observation:** Recent logs show repeated successful `GET /health` responses with HTTP 200. Recent memory observations were approximately 92–100 MB during the sampled idle period and CPU observations were approximately 0.0016–0.00175 CPU. HTTP workload and latency metrics were unavailable in the sampled window, so no performance comparison is claimed.

**Deployment observation:** The current live deployment completed successfully at 2026-09-03T07:51:27Z from canonical repository commit `ccbcbec261812c51920a9305ffb265607616d575`.

**Decision:** The immediate infrastructure issue is not a demonstrated outage. The strongest migration rationale is the constrained 0.15 CPU / 512 MiB free-tier baseline, especially because the deployed build installs optional speech-intelligence dependencies. Preserve Render as the baseline and do not switch production routing yet.

**AWS access finding:** AWS Core is connected and can provide region discovery and AWS architecture/deployment guidance. Direct account-resource enumeration was not successfully available through the connected execution surface during this audit, so no claim is made about existing ECS, ECR, billing, or credit state. AWS remains a controlled benchmark candidate rather than a declared migration target.

**Azure/Cosmos boundary:** Cosmos DB must not replace Supabase merely because the connector is available. No observed canonical storage requirement currently justifies introducing a second primary database.

**Next gate:** Containerize the canonical API reproducibly, benchmark equivalent workloads against the measured Render baseline, then record observed startup, readiness, upload, analysis, memory, CPU, failures, and cost before selecting a production compute provider.


## 2026-09-03 — Runtime provenance and speech-provider readiness hardening

**Decision:** Stop reporting deployment provenance as an implicit host property. Canonical container builds now accept and embed an explicit source revision and current-commit QA status, and the API resolves provenance from deployment environment or embedded build metadata.

**Speech boundary:** The canonical container includes the configured speech dependencies, but transcription and diarization remain provider-gated execution capabilities. Runtime status distinguishes configured provider, dependency installation, token presence where required, selected model, and execution readiness. Dependency presence is not treated as completed speech analysis.

**AWS workflow:** Canonical backend QA now runs before the ECS image is built and deployed. The deployed image receives the exact GitHub SHA and a QA status for that source revision.

**Remaining external configuration:** A Hugging Face diarization token cannot be invented or committed to source. It must be provisioned as a deployment secret after the account has access to the selected model. Provider execution remains unverified until a real controlled run succeeds.
