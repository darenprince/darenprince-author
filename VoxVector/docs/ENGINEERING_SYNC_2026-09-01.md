# VoxVector Engineering Synchronization — 2026-09-01

## Current source of truth

Canonical production branch: `main`.

This feature slice is developed on an isolated branch and must pass repository QA before merge.

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

`.github/workflows/render-observability.yml` now consumes:

- `RENDER_API_KEY`
- `RENDER_SERVICE_ID`

`RENDER_SERVICE_ID` is the default target; the workflow also accepts an optional manual override.

The workflow retrieves service inventory, deployment history, and recent logs and stores a seven-day diagnostic artifact.

### Authenticated Developer Console

The backend now provides a server-side Render API bridge:

- `GET /v1/developer/render/status`
- `GET /v1/developer/render/logs`

The frontend polls these endpoints only from the authenticated console. Render credentials are never passed to browser code.

Critical deployment boundary: GitHub repository secrets are scoped to GitHub Actions. The Render service must separately contain protected `RENDER_API_KEY` and `RENDER_SERVICE_ID` environment variables before the server-side console bridge can make authenticated Render API calls.

### Infrastructure versus application timing

Render timestamps, deploy state, logs, and service metrics provide infrastructure evidence. Application `perf_counter` derived stage/run durations remain the source of truth for application timing.

## Developer Console changes

### Navigation

Added first-class `Case History` and `Render Runtime` destinations.

The sidebar now has constrained vertical scrolling so lower navigation items remain reachable on short desktop windows and mobile layouts.

### Case history

The console now lists authenticated persisted cases using the existing case APIs. Each entry exposes title, case ID, update time, source count, and most recent run summary. Selecting a case opens the persisted case in the Analysis Workspace without creating a new run.

### Workbench interaction

The three canonical workbench sections can be independently collapsed:

- Step 01 — Analysis Case
- Step 02 — File Upload
- Step 03 — Playback + Analysis

The workbench also provides Expand All and Collapse All controls.

### Live analysis progress

A case run is persisted in `running` state before the analysis work begins. Route-boundary lifecycle updates are persisted as the run progresses. The console polls the case at short intervals while the workbench/workspace is active.

The visible progress model distinguishes:

- reported completed stages;
- current running stage where known;
- pending/queued stages;
- failed stages;
- measured stage duration where available;
- indeterminate animated activity while the composite pipeline is running without granular callbacks.

No animation is presented as proof of a specific internal stage having executed.

### Startup experience

The Developer Console startup preloader now exposes a visibly advancing initialization percentage instead of a static bar. API readiness remains tied to the real `/health` request.

### Consistent status language

The console normalizes statuses into readable labels such as `Ready`, `Uploading`, `Converting`, `Persisting`, `Running`, `Completed`, `Queued`, `Not run`, `Not invoked`, and `Failed`. Logs and test surfaces use human-readable `Request`, `HTTP`, `Revision`, `Stages complete`, and `QA state` labels rather than raw field fragments.

## Dashboard

The dashboard now surfaces the live Render connection/deployment state when the Render bridge is configured and keeps case navigation, analysis workspace navigation, and the engineering plan in the primary workflow.

The dashboard remains an operator projection. It must not fabricate production metrics or scientific results.

## Documentation synchronization

This change updates the active engineering plan and synchronization record and should be reflected in the following canonical/current surfaces as applicable:

- `VoxVector/docs/DEVELOPER_CONSOLE_DOC_SYNC_RULES.md`
- `VoxVector/docs/ENGINEERING_PLAN_2026-09-01.md`
- `VoxVector/docs/ENGINEERING_SYNC_2026-09-01.md`
- `VoxVector/docs/PROJECT_DECISION_LOG_DEVCONSOLE_2026-09-01.md`
- `VoxVector/docs/PIPELINE_BUILD_STATUS.md`
- `VoxVector/docs/ROADMAP.md`
- `VoxVector/docs/QA_STATUS.md`
- `VoxVector/api/README.md`
- `VoxVector/docs/audits/`
- `docs/crownlabsbible/04-product-dossiers/VoxVector/`

Historical checkpoints remain historical evidence and are not overwritten merely because the implementation has advanced.

## Verification state

Repository source writes completed on the feature branch.

Still required before production claims:

- GitHub Actions backend tests and React build for the feature branch;
- authenticated browser verification of console scroll reset, sidebar scroll, collapsible sections, case history reopen, Render Runtime state, and live run behavior;
- Render environment configuration verification for `RENDER_API_KEY` and `RENDER_SERVICE_ID`;
- controlled Render API request verification;
- controlled analysis run with visible persisted progress;
- final source → commit → workflow → artifact → runtime trace.

## Scientific boundary

Case history, infrastructure telemetry, run lifecycle, transcription readiness, diarization state, acoustic measurements, transcript artifacts, and UI progress are engineering and evidence-acquisition state. None of these changes establish scientific deception-detection validity. Scientific inference remains governed by the separate validation program.
