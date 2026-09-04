# Developer Console Documentation Synchronization Rules

**Status:** Canonical active instruction
**Effective:** 2026-09-01

This document supplements the general VoxVector editing workflow with the specific synchronization requirements for the Developer Console and connected case workflow.

## Required synchronization

When a Developer Console feature, API workflow, pipeline stage, task, diagnostic surface, infrastructure integration, or user workflow changes, the agent must evaluate and update the relevant current records before calling the work complete.

At minimum, evaluate:

- `VoxVector/docs/MVP_BUILD_PLAN.md`
- `VoxVector/docs/PIPELINE_BUILD_STATUS.md`
- `VoxVector/docs/CAPABILITY_STATUS.md`
- `VoxVector/docs/ROADMAP.md`
- `VoxVector/docs/ANALYSIS_PIPELINE.md`
- `VoxVector/docs/DEVELOPMENT_WORKFLOW.md`
- `VoxVector/docs/CHATGPT_PROJECT_INSTRUCTIONS.md`
- `VoxVector/docs/ENGINEERING_PLAN_2026-09-01.md`
- `VoxVector/docs/ENGINEERING_SYNC_2026-09-01.md`
- `VoxVector/docs/PROJECT_DECISION_LOG_DEVCONSOLE_2026-09-01.md`
- `docs/crownlabsbible/04-product-dossiers/VoxVector/`

## Dashboard synchronization

The Developer Console dashboard is an operator-facing projection of canonical engineering state.

It must not invent progress. Build counts, current engineering stage, QA state, dependencies, deployment state, and stage status must be derived from documented implementation state or a real API response.

The 21-stage build card must remain aligned with:

- the canonical 21 stage identifiers;
- the backend stage definitions;
- the current build-status matrix;
- the documented implementation/conditional/queued states.

The expanded build view may show all 21 stages with semantic state indicators. A live run view must distinguish persisted runtime state from static implementation status.

## Engineering status semantics

The console must distinguish engineering states rather than treating a successful build as proof of functionality.

Use these independent dimensions wherever applicable:

- **BUILT** — source implementation compiles or exists in the intended canonical owner.
- **FUNCTIONAL** — the implemented workflow has executed successfully with its required runtime inputs.
- **TESTED** — an actual automated or manual test has passed for the behavior being reported.
- **VALIDATED** — the relevant scientific, operational, or performance validation has actually been completed and documented.
- **CONDITIONAL** — the behavior requires inputs or conditions not currently supplied.
- **NOT INVOKED** — the stage is intentionally not executed by the current workflow.
- **QUEUED** — the capability is represented in the architecture but deeper runtime integration remains outstanding.
- **FAILED** — an execution or verification attempt failed.
- **BLOCKED** — work cannot proceed because a documented dependency or environment constraint remains.

A green build must never automatically produce a green FUNCTIONAL or VALIDATED state.

## Human-readable status vocabulary

The console should normalize low-level status values into stable operator language.

Approved examples:

- `Ready`
- `Checking`
- `Uploading`
- `Converting`
- `Persisting`
- `Running`
- `Completed`
- `Queued`
- `Not run`
- `Not invoked`
- `Failed`
- `Unavailable`
- `Blocked`

Technical identifiers such as request IDs, run IDs, stage IDs, commit SHAs, and HTTP codes remain available as secondary metadata.

## Main dashboard stats

Primary dashboard statistics must use consistent all-caps labels and semantic status treatment.

Required primary categories are:

- **API** — current health/reachability state.
- **RUNTIME** — runtime self-test or operational state.
- **PIPELINE** — 21-stage implementation and execution state.
- **QA** — current test/build verification state.

When infrastructure integration is configured, **RENDER** may be shown as an additional primary status for deployment/runtime evidence. It must never masquerade as a case-analysis metric.

Each primary stat should have a meaningful icon and color-coded status. Color is supplementary; the text state must remain explicit and accessible.

## QA checks

QA checks must expose more than a single historical test count. Where data exists, the console should distinguish:

- backend tests
- frontend production build
- runtime self-test
- upload contract
- case creation
- source persistence
- secure playback
- case-bound analysis
- pipeline execution
- browser/E2E verification
- deployment/artifact verification
- scientific validation

Historical baselines must be explicitly labeled **HISTORICAL** and must never be displayed as current QA.

## Current engineering state

The dashboard must expose enough detail to answer:

1. What is the current engineering stage?
2. What is its BUILD state?
3. What is its FUNCTIONAL state?
4. What TEST evidence exists?
5. What VALIDATION evidence exists?
6. What is blocked or still unverified?
7. What is the next dependency?
8. Which source files, workflow, commit, and documentation establish the status?

## Render infrastructure integration

The Developer Console may expose Render deployment and log state through server-side authenticated API routes.

Canonical console routes:

- `GET /v1/developer/render/status`
- `GET /v1/developer/render/logs`
- `POST /v1/developer/render/deploy`

The Render API key and deploy hook must remain server-side. Never place `RENDER_API_KEY` or `RENDER_DEPLOY_HOOK_URL` in browser JavaScript, client configuration, repository source, case artifacts, or dashboard exports. The deploy route may return trigger state but must never return the hook URL.

GitHub Actions and Render runtime have separate secret scopes. `RENDER_API_KEY` and `RENDER_SERVICE_ID` configured as GitHub repository secrets are available to Actions only. The Render service itself must separately contain protected environment variables with those names before the backend Render bridge can authenticate to the Render API.

The repository Render observability workflow uses `RENDER_SERVICE_ID` as its default target and permits an optional controlled service override.

Infrastructure state is evidence about the runtime environment. It is not application timing truth and is not scientific validation.

## Case history synchronization

Case History is a first-class Developer Console surface.

The console must read persisted cases from the authenticated case API rather than a browser-only cache.

Each history entry should make it possible to understand:

- case title
- case ID
- current case status
- last updated time
- source count
- latest analysis run identity/state when available

Opening an existing case must retrieve the persisted case record and its stored analysis history. It must not silently create a new analysis run.

## Live analysis workflow synchronization

A live analysis view must use actual persisted run state.

The canonical case-analysis flow is:

`case selected → run record created as RUNNING → measured lifecycle updates → composite analysis → completed or failed run persisted → console reads final run`

Where the current engine does not expose granular internal callbacks, the console must show an explicit indeterminate activity state rather than inventing per-stage timing.

Determinate progress may be derived from the count of persisted completed stages. Animated activity is allowed as an interface treatment, but the animation itself is not evidence that a specific stage executed.

## Workbench synchronization

The Case Workbench consists of three canonical sections:

- Step 01 — Analysis Case
- Step 02 — File Upload
- Step 03 — Playback + Analysis

Each section may be independently collapsed. The workbench may expose Expand All and Collapse All controls.

Collapsing a section must preserve the underlying state, selected case, upload state, and current run.

## Scroll and navigation behavior

Authenticated console route changes must restore the main work surface to the top so pages do not begin partway down from a previously scrolled view.

The desktop/mobile navigation surface must remain vertically scrollable when the item count exceeds the available viewport height. Navigation items must never be permanently clipped by the shell.

## Startup progress

Initialization UI must represent actual state transitions or an explicitly labeled startup animation. A fixed-width progress bar with no movement is not acceptable for an active initialization screen.

For the current startup preloader, the displayed initialization percentage is an interface animation after real `/health` readiness has been observed. The percentage must not be presented as a runtime measurement.

## Source traceability

Every material dashboard status should have a traceable source when a repository or workflow source exists.

The operator-facing trace should support:

`GitHub → repository path → workflow → commit → artifact/deployment`

Where applicable, expose clickable GitHub source/documentation link, repository path, commit SHA, workflow name or run reference, artifact/deployment reference, and copy-to-clipboard controls.

The trace is evidence of provenance, not evidence that the underlying capability is scientifically validated.

## Workflow synchronization

Every substantive workflow must refresh or invalidate relevant dashboard status data after a state-changing event. At minimum, case creation, upload, persistence, playback preparation, analysis execution, diagnostics, case history, and deployment verification must not leave stale operator statistics displayed.

The preferred state flow is:

`SOURCE → COMMIT → WORKFLOW → TEST RESULT → ARTIFACT/DEPLOYMENT → RUNTIME STATUS → CONSOLE`

If a workflow cannot update a downstream status automatically, the limitation must be documented rather than simulated.

## Editing workflow synchronization

Every substantive change must leave the project understandable to the next engineer.

Record:

1. the task completed;
2. the actual canonical owner;
3. the current implementation state;
4. the tests that actually ran;
5. the verification still required;
6. the current engineering stage;
7. the next engineering dependency;
8. documentation surfaces synchronized;
9. any historical document moved to archive.

## Feature implementation status

Use distinct labels for:

- implemented
- integrated
- conditional
- queued
- not invoked
- failed
- blocked
- planned research
- validated inferential
- retired

Do not mark a stage complete merely because its UI exists.

## Audio workflow gate

The connected case workflow remains:

`create case → select compatible WAV → upload → persist source → secure playback → run analysis → inspect stage state → Analysis Workspace`

The upload path must be verified independently before downstream presentation is described as operational.

## Documentation lifecycle

Active documents describe current behavior.

Historical documents preserve traceability.

Superseded records may be archived only after reviewing what information they contain and ensuring that required behavior or decisions are represented in current canonical documents.

Never archive a document merely because its filename looks old or inconvenient.

## Verification rule

A repository write is not verification.

For substantive changes, build/test/browser verification must be performed when available. If a protected authenticated path cannot be exercised in the available environment, record that limitation explicitly rather than claiming success.

## Audits and observability surfaces

The Developer Console includes structured Audits, Live Logs, Error Reports, Render Runtime, and Case History surfaces. These must use real persisted or server-observed data. Synthetic records, fabricated telemetry, fabricated QA, and decorative values presented as runtime evidence are prohibited.
