# VoxVector Engineering Plan — 2026-09-01 / 2026-09-02

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
- provider execution timing capture: implemented
- heavy-provider cache release: implemented in current repair branch

Configured speech providers are invoked by `build_evidence_acquisition`; each provider attempt records measured wall-clock execution duration in `provider_timings_ms`. Provider failures remain explicit acquisition states and do not silently become successful evidence. Heavy provider caches are released after each attempt so a long-lived API worker does not retain both model families between provider phases.

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
- startup activity feedback that distinguishes measured readiness from indeterminate work

## Phase 5 — Scientific validation

Separate from software QA. Requires frozen task definitions, speaker-disjoint evaluation, calibration, robustness, leakage testing, uncertainty analysis, replication, and documented datasets/protocols before inferential claims.

## Developer Console integration architecture

The Developer Console remains a frontend over canonical API contracts. It does not duplicate the analysis engine and does not fabricate progress.

### Case workflow

`case history → open case → case workbench → source intake → analysis → live run state → Analysis Workspace`

Case history is backed by the authenticated `/v1/cases` and `/v1/cases/{case_id}` routes. Existing runs remain persisted in the case record and can be reopened for later review.

### Live analysis workflow

The case-analysis route writes a run record in `running` state before processing begins, updates persisted stage state at measured route boundaries, and replaces the live record with the completed or failed run record at termination.

The console polls the selected case while analysis is active and projects the stored lifecycle state into:

- current stage
- completed stages
- queued/pending stages
- failed stages
- measured route-boundary duration
- active run/request identity
- determinate completion percentage where persisted stage state supports it
- indeterminate animated activity while the canonical composite pipeline is executing without internal callbacks

The UI must never turn indeterminate activity animation into a claim of granular internal stage timing.

## Render integration architecture

### GitHub Actions

`.github/workflows/render-observability.yml` is the repository-side infrastructure evidence workflow.

Required GitHub repository secrets:

- `RENDER_API_KEY`
- `RENDER_SERVICE_ID`

The service ID is the default workflow target. An optional manual service-ID override is supported for controlled inspection of another service.

### Developer Console

The authenticated console exposes a `Render Runtime` surface backed by server-side Render API calls.

Canonical frontend endpoints:

- `GET /v1/developer/render/status`
- `GET /v1/developer/render/logs`

These endpoints use `RENDER_API_KEY` and `RENDER_SERVICE_ID` from the API runtime environment. They must never receive or expose the secret through browser JavaScript.

The deployed Render service must be configured separately from GitHub repository secrets. Both boundaries use protected secret storage.

## Console UX hardening

Implemented in the current feature work:

- route navigation resets scroll position to the top of the console main surface;
- sidebar navigation is vertically scrollable instead of clipping lower items;
- workbench steps can be individually collapsed or expanded;
- Expand All / Collapse All control is available for the workbench;
- case history is a first-class navigation destination;
- checks, pipeline state, logs, error metadata, and QA state use consistent human-readable labels;
- startup preloader progress is stateful and active bars visually move without pretending to report exact work completed;
- dashboard surfaces live Render connection state when the bridge is configured;
- active analysis shows a visible live workflow indicator while persisted run state is changing.

## QA repair checkpoint — 2026-09-02

The diagnostic storage regression was repaired and merged. The exact post-repair GitHub Actions run for commit `04ac252b1497cc150c3b5058e8d240229c24a042` completed successfully for both `VoxVector QA` and `VoxVector PR Preview Build`.

## Render memory incident checkpoint — 2026-09-02

Render reported that the `voxvector-api` web service exceeded its memory limit and an instance was automatically restarted. The notification establishes a real infrastructure incident but does not by itself establish the root cause.

Code inspection identified an important memory-pressure risk in the current speech integration: faster-whisper and pyannote provider model loaders are process-cached with `lru_cache`, and the case acquisition flow invokes both providers in sequence. The repair branch now clears each provider's heavy model cache immediately after its execution attempt while preserving the resulting transcript/diarization data.

The incident remains a runtime verification gate. Render logs/metrics must establish whether provider model residency was the actual trigger and whether the cache-release repair is sufficient under controlled audio execution.

## Observability architecture

Application timing truth:

- UTC wall-clock lifecycle timestamps
- monotonic duration measurements
- request_id
- trace_id
- analysis_run_id
- stage_id
- provider/model metadata
- measured speech-provider execution durations when configured

Infrastructure evidence:

- Render logs
- Render deployment state
- Render service metrics
- GitHub Actions QA/deploy workflows

## Current gates

- live Render API bridge verification
- authenticated browser desktop/mobile verification
- speech-enabled runtime deployment
- real short-WAV transcription
- real Community-1 diarization
- memory/CPU measurement
- verification of heavy-provider cache release under repeated execution
- persisted transcript/speaker/multimodal readback
- full internal 21-stage callback telemetry

## Engineering rule

Do not add downstream inference merely to fill UI space. Every downstream method must consume real acquired evidence, declare provenance and limitations, and remain separate from scientific validation claims.
