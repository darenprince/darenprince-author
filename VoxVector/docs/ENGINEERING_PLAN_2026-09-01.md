# VoxVector Engineering Plan — 2026-09-01

## Current objective

Turn the repaired production case workflow into a real, evidence-producing speech intelligence system with an auditable runtime and a live engineering cockpit.

## Phase 1 — Operational foundation

Status: operationally demonstrated.

- case identity and ownership
- private media persistence
- WAV intake
- case-bound analysis execution
- canonical results envelope
- durable diagnostics
- Render/GitHub observability bridge

## Phase 2 — Evidence acquisition

Status: active build.

- media profile: implemented
- speech/silence timeline: implemented foundation
- transcription provider contract: implemented
- faster-whisper adapter: implemented, provider-gated
- diarization provider contract: implemented
- pyannote Community-1 adapter: implemented, provider-gated
- transcript/speaker alignment: implemented foundation
- multimodal timeline: implemented foundation

Next:

1. controlled faster-whisper deployment execution;
2. controlled pyannote execution;
3. persisted transcript and speaker artifacts;
4. word/segment timestamp normalization;
5. audio/transcript alignment validation;
6. failure and resource profiling.

## Phase 3 — Evidence consumers

- connect transcript data to linguistic/disfluency analysis
- make acoustic aggregation speaker-aware
- add within-speaker baseline acquisition
- add question/answer context
- expand temporal interaction features
- build evidence relationship graph
- expose convergence, conflict, uncertainty, and alternatives

## Phase 4 — Results and operator experience

Status: active integration.

- complete Analysis Results workspace
- multimodal timeline explorer
- evidence detail and provenance
- live 21-stage workflow state projection
- stage lifecycle timeline
- report generation
- case history and reopen workflow
- persistent analysis run readback
- Render runtime/deployment/log visibility from the Developer Console
- responsive, scroll-safe, collapsible workbench interaction
- consistent human-readable status vocabulary across checks, tests, pipeline stages, and infrastructure state

## Phase 5 — Scientific validation

Separate from software QA. Requires frozen task definitions, speaker-disjoint evaluation, calibration, robustness, leakage testing, uncertainty analysis, replication, and documented datasets/protocols before inferential claims.

## Developer Console integration architecture

The Developer Console remains a frontend over canonical API contracts. It does not duplicate the analysis engine and does not fabricate progress.

### Case workflow

`case history → open case → case workbench → source intake → analysis → live run state → Analysis Workspace`

Case history is backed by the authenticated `/v1/cases` and `/v1/cases/{case_id}` routes. Existing runs remain persisted in the case record and can be reopened for later review.

### Live analysis workflow

The case-analysis route now writes a run record in `running` state before processing begins, updates persisted stage state at measured route boundaries, and replaces the live record with the completed or failed run record at termination.

The console polls the selected case while analysis is active and projects the stored lifecycle state into:

- current stage
- completed stages
- queued/pending stages
- failed stages
- measured route-boundary duration
- active run/request identity
- determinate completion percentage where the persisted stage state supports it
- indeterminate animated activity while the canonical composite pipeline is executing without internal callbacks

The UI must never turn the indeterminate activity animation into a claim of granular internal stage timing.

## Render integration architecture

### GitHub Actions

`.github/workflows/render-observability.yml` is the repository-side infrastructure evidence workflow.

Required GitHub repository secrets:

- `RENDER_API_KEY`
- `RENDER_SERVICE_ID`

The service ID is now the default workflow target. An optional manual service-ID override is supported for controlled inspection of another service.

The workflow retrieves service inventory, deployment history, and recent logs and stores a seven-day artifact.

### Developer Console

The authenticated console exposes a `Render Runtime` surface backed by server-side Render API calls.

Canonical frontend endpoints:

- `GET /v1/developer/render/status`
- `GET /v1/developer/render/logs`

These endpoints use `RENDER_API_KEY` and `RENDER_SERVICE_ID` from the API runtime environment. They must never receive or expose the secret through browser JavaScript.

Important environment boundary: a GitHub repository secret is available to GitHub Actions, not automatically to the deployed Render process. The Render service must separately receive the same secret values as protected environment variables before the in-console Render API bridge can return live infrastructure state.

Render infrastructure timing remains correlation evidence. Application timing truth remains the backend monotonic measurements.

## Console UX hardening

Implemented in the current feature work:

- route navigation resets scroll position to the top of the console main surface;
- sidebar navigation is vertically scrollable instead of clipping lower items;
- workbench steps can be individually collapsed or expanded;
- Expand All / Collapse All control is available for the workbench;
- case history is a first-class navigation destination;
- checks, pipeline state, logs, error metadata, and QA state use consistent human-readable labels;
- startup preloader progress is stateful rather than a permanently static bar;
- dashboard surfaces live Render connection state when the bridge is configured;
- active analysis shows a visible live workflow indicator while persisted run state is changing.

## Observability architecture

Application timing truth:

- UTC wall-clock lifecycle timestamps
- monotonic duration measurements
- request_id
- trace_id
- analysis_run_id
- stage_id
- provider/model metadata

Infrastructure evidence:

- Render logs
- Render deployment state
- Render service metrics
- GitHub Actions QA/deploy workflows

## Current gates

- Render runtime environment configured with `RENDER_API_KEY` and `RENDER_SERVICE_ID`
- GitHub Actions Render workflow execution
- exact current commit QA
- speech-enabled runtime deployment
- real short-WAV transcription
- real Community-1 diarization
- memory/CPU measurement
- persisted transcript/speaker/multimodal readback
- browser verification of authenticated console desktop/mobile behavior
- full internal 21-stage callback telemetry

## Engineering rule

Do not add downstream inference merely to fill UI space. Every downstream method must consume real acquired evidence, declare provenance and limitations, and remain separate from scientific validation claims.
