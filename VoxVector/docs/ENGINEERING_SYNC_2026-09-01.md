# VoxVector Engineering Synchronization — 2026-09-01 / 2026-09-02

## Current source of truth

Canonical production branch: `main`.

This audit/repair slice is developed on an isolated feature branch and must pass repository QA before merge.

## Operational foundation

Previously demonstrated:

- production case workflow from case creation through source upload, private media persistence, and case-bound analysis;
- canonical results envelope at the case-analysis API boundary;
- durable sanitized diagnostics;
- diagnostic relational duration normalization;
- relational diagnostic date filtering;
- synchronized backend package/runtime versioning.

## Evidence acquisition

Implemented foundation and contracts:

- media profile;
- speech/silence timeline;
- provider-neutral transcript artifact;
- provider-neutral diarization artifact;
- faster-whisper adapter;
- pyannote Community-1 adapter;
- transcript/speaker overlap alignment;
- multimodal timeline artifact;
- configured, unavailable, and provider-state handling.

Production execution of heavy providers remains an external runtime verification gate.

## Execution observability

Implemented:

- request_id;
- trace_id;
- analysis_run_id;
- UTC lifecycle timestamps;
- monotonic duration measurements;
- stage lifecycle records;
- speech runtime diagnostic lines;
- persistent sanitized diagnostics;
- GitHub Actions Render observability workflow;
- Developer Console live case polling.

The monolithic analytical pipeline still lacks complete internal callback instrumentation. The console therefore shows measured route-boundary stage state plus explicitly indeterminate activity during composite execution rather than fabricated internal timings.

## Render integration

### Repository automation

`.github/workflows/render-observability.yml` consumes:

- `RENDER_API_KEY`
- `RENDER_SERVICE_ID`

`RENDER_SERVICE_ID` is the default target; the workflow also accepts an optional manual override.

### Authenticated Developer Console

The backend provides a server-side Render API bridge:

- `GET /v1/developer/render/status`
- `GET /v1/developer/render/logs`

The frontend polls these endpoints only from the authenticated console. Render credentials are never passed to browser code.

The deployed VoxVector Render service should contain protected `RENDER_API_KEY` and `RENDER_SERVICE_ID` environment variables. GitHub repository secrets are separate from Render runtime environment configuration.

### Infrastructure versus application timing

Render timestamps, deploy state, logs, and service metrics provide infrastructure evidence. Application `perf_counter` derived stage/run durations remain the source of truth for application timing.

## Developer Console changes

### Navigation

Added first-class `Case History` and `Render Runtime` destinations. The desktop sidebar has an independent vertical scroll region so lower navigation items remain reachable.

### Case history

The console lists authenticated persisted cases using the existing case APIs. Selecting a case opens the persisted case in the Analysis Workspace without creating a new run.

### Workbench interaction

The three canonical workbench sections can be independently collapsed:

- Step 01 — Analysis Case
- Step 02 — File Upload
- Step 03 — Playback + Analysis

The workbench also provides Expand All and Collapse All controls.

### Live analysis progress

A case run is persisted in `running` state before the analysis work begins. Route-boundary lifecycle updates are persisted as execution proceeds. The console polls the case at short intervals while the workbench/workspace is active.

The visible progress model distinguishes completed stages, current running state where known, pending/queued stages, failed stages, measured durations where available, and indeterminate animated activity while the composite pipeline is running without granular callbacks.

### Startup experience

Startup readiness is derived from real `/health` state and authenticated session state. Active checks receive animated indeterminate activity without fabricated numeric progress. Completed checks contribute to the aggregate readiness percentage.

### Consistent status language

The console normalizes status terms into readable labels such as `Ready`, `Uploading`, `Converting`, `Persisting`, `Running`, `Completed`, `Queued`, `Not run`, `Not invoked`, and `Failed`.

## QA incident and repair — 2026-09-02

The supplied QA artifact for the preceding source revision reported `127 passed, 1 failed`. The failure was `tests/test_observability.py::test_diagnostic_store_survives_storage_failure`, where `storage_result` could be returned after a storage exception without first being initialized.

The canonical diagnostic implementation now initializes `storage_result` before the persistence attempt and safely returns after a storage failure. This restores the documented non-fatal diagnostic-storage contract.

A fresh exact-commit QA run is required before the repair branch is recorded as green.

## Documentation synchronization

Current synchronized records include:

- `VoxVector/docs/DEVELOPER_CONSOLE_DOC_SYNC_RULES.md`
- `VoxVector/docs/ENGINEERING_PLAN_2026-09-01.md`
- `VoxVector/docs/ENGINEERING_SYNC_2026-09-01.md`
- `VoxVector/docs/QA_STATUS.md`
- `VoxVector/docs/PIPELINE_BUILD_STATUS.md`
- `VoxVector/docs/CAPABILITY_STATUS.md`
- `VoxVector/docs/ROADMAP.md`
- `VoxVector/docs/RENDER_GITHUB_ACTIONS_OBSERVABILITY.md`
- `VoxVector/docs/CONSOLE_ENGINEERING_STATUS_2026-09-02.md`
- `VoxVector/docs/ENGINEERING_AUDIT_2026-09-02.md`
- `VoxVector/docs/CONSOLE_RENDER_CONFIGURATION.md`
- `VoxVector/docs/audits/`
- `docs/crownlabsbible/04-product-dossiers/VoxVector/`

Historical checkpoints remain historical evidence.

## Verification state

Repository source writes are complete for this engineering slice.

Still required before production claims:

- exact-commit GitHub Actions backend tests and React production build;
- authenticated browser verification of console scroll reset, sidebar scrolling, collapsible sections, case history reopen, Render Runtime state, and live run behavior;
- controlled Render API verification against the deployed service;
- controlled audio analysis with visible persisted progress;
- final source → commit → workflow → artifact → runtime trace.

## Scientific boundary

Case history, infrastructure telemetry, run lifecycle, transcription readiness, diarization state, acoustic measurements, transcript artifacts, and UI progress are engineering and evidence-acquisition state. None of these changes establish scientific deception-detection validity. Scientific inference remains governed by the separate validation program.


## Runtime UI incident and canonical repair — 2026-09-04

**Observed from mobile production screenshots**

- case-workbench upload flow reached the transfer/processing boundary and then presented a failure surface without preserving enough structured error detail;
- Render Runtime rendered provider data inconsistently, including a literal `[object Object]` log message and incomplete deployment/runtime fields;
- the live engineering overlay and profile menu remained vulnerable to stale or lower-layer rendering when an older frontend artifact was still being served;
- retired AWS status remained in the engineering-status component despite the later decision to remove AWS checks from QA/console gating.

**Canonical repair**

- upload progress now reserves the final completion state for a successful server response and serializes structured API error payloads instead of collapsing them into unhelpful object output;
- the server-side Render bridge normalizes nested provider payloads and converts log messages to display-safe text;
- the Render console view defensively formats object-valued provider fields and no longer renders `[object Object]`;
- AWS status chips/checks were removed from the live engineering status component;
- the existing high overlay stack remains canonical in the shared console styles. Production verification must confirm the deployed artifact actually contains the current source rather than assuming a source commit is live.

**Verification boundary**

These changes correct source behavior. They still require the normal source → commit → workflow → artifact → GitHub Pages/Render → browser verification chain before being represented as deployed.
