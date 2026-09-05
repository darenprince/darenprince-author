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
- heavy-provider cache release: implemented in memory-pressure repair branch

Configured speech providers are invoked by `build_evidence_acquisition`; each provider attempt records measured wall-clock execution duration in `provider_timings_ms`. Provider failures remain explicit acquisition states and do not silently become successful evidence. Heavy providers that expose a release path are released after each attempt so the long-lived API process does not retain cached model references between provider phases.

### Render runtime evidence checkpoint — 2026-09-02

The connected Render service is running on a **512 MB RAM** free web-service budget. The incident capture around 02:10–02:14 UTC showed memory rising from approximately 94.9 MB to 198.5 MB, followed by an abrupt drop to 73.6 MB and stabilization around 93 MB. This supports an instance/process reset pattern but does not prove the exact root cause or establish that a speech provider caused it.

The incident capture also surfaced slow `/v1/cases` requests of approximately 10.35 seconds and 8.11 seconds in the same general runtime period. These are independent reliability signals requiring correlation rather than assumption.

The Render observability workflow now collects service state, deployments, recent logs, incident-window logs, and memory metrics as a reproducible Actions artifact.

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
- compact, provenance-oriented data presentation
- restrained 5–8% tonal gradients across analytical surfaces

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

`.github/workflows/render-observability.yml` is the repository-side infrastructure evidence workflow. It can collect service inventory, deployment state, recent logs, a fixed incident window, and memory telemetry using the protected repository credentials.

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

## Console UX hardening and visual refinement

Implemented direction:

- route navigation resets scroll position to the top of the console main surface;
- sidebar navigation is vertically scrollable instead of clipping lower items;
- workbench steps can be individually collapsed or expanded;
- Expand All / Collapse All control is available for the workbench;
- case history is a first-class navigation destination;
- checks, pipeline state, logs, error metadata, and QA state use consistent human-readable labels;
- startup preloader progress is stateful and active bars visually move without pretending to report exact work completed;
- dashboard surfaces live Render connection state when the bridge is configured;
- active analysis shows a visible live workflow indicator while persisted run state is changing;
- shared analytical Cards use tighter padding, reduced rounding, and a restrained warm tonal gradient;
- runtime, history, file metadata, upload, analysis, and log surfaces use compact spacing and coordinated tonal treatment;
- startup branding uses a substantially smaller logo footprint and restrained local glow.

## QA repair checkpoint — 2026-09-02

The diagnostic storage regression was repaired and merged. The exact post-repair GitHub Actions run completed successfully for the relevant backend and React build gates before the subsequent runtime incident investigation.

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
- Render instance state
- Render service memory metrics
- GitHub Actions QA/deploy workflows

## Current gates

- complete memory-pressure mitigation QA
- correlate Render memory, CPU, request latency, and instance lifecycle around the restart
- authenticated browser desktop/mobile verification of the refined console surfaces
- speech-enabled runtime deployment
- real short-WAV transcription
- real Community-1 diarization
- memory/CPU measurement before/during/after each provider
- repeated-provider execution stress check
- persisted transcript/speaker/multimodal readback
- full internal 21-stage callback telemetry

## Engineering rule

Do not add downstream inference merely to fill UI space. Every downstream method must consume real acquired evidence, declare provenance and limitations, and remain separate from scientific validation claims.


## 2026-09-05 case archive latency debugging

Live Render diagnostics reproduced severe latency on authenticated `GET /v1/cases` requests, including observed successful responses around 69–87 seconds during concurrent archive refresh activity. The route was completing with HTTP 200 rather than failing, which explains refresh controls appearing to spin for a long time.

Root cause identified in the canonical storage projection: the case archive listed storage object metadata and then fetched every case JSON payload sequentially. Each Supabase Storage round trip accumulated into the user-visible request duration.

Mitigation implemented in `api/case_store.py`: archive payload reads now use a bounded pool of up to eight concurrent storage reads, preserving owner filtering and updated-time sorting while removing sequential round-trip amplification. Regression coverage was added in `tests/test_case_store.py` for archive ownership and ordering.

A Render deploy of commit `03fadc1a12c53882942d4270c602c6ba90673164` was explicitly triggered because the production service has auto-deploy disabled. Runtime latency improvement remains pending post-deploy measurement and must not be considered verified until new production diagnostics are observed.
