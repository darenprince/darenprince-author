# VoxVector Current Engineering State — 2026-09-02

## Purpose

This is the current engineering synchronization record for the connected VoxVector application. The repository remains the technical source of truth.

## Current implementation audit

### Public React application — `voxvector/`

Current connected surfaces include the public landing page, shared `SiteHeader`, authenticated Developer Gate, Developer Console, Case Workbench, Case History, Analysis Workspace, audio upload/playback primitives, local waveform/spectrogram visualization, methodology/documentation navigation, MVP task board, diagnostic views, GitHub-backed engineering status, developer profile controls, and persisted Analysis Results / Review Evidence presentation.

The Developer Console uses the canonical case API contracts for case creation, case listing/retrieval, WAV source upload, signed playback, and case-bound analysis. It also has authenticated Render Runtime status/log surfaces through server-side API routes.

### Backend — `VoxVector/`

The canonical FastAPI adapter exposes `/health`, direct `/v1/analyze`, authenticated case creation/list/retrieval, authenticated case-source upload, secure signed playback, authenticated case-bound analysis, diagnostic events/errors, and developer-only Render runtime status/log routes.

The canonical analysis engine remains under `VoxVector/src/voxvector/` and is invoked by the API adapter.

## Current production execution state

The observed configured production path has completed:

`case workflow → source upload → private media persistence → case-bound analysis → analysis completion`

Case records preserve source metadata, SHA-256 provenance, run identity, and pipeline state. Private media uses Supabase Storage with signed playback access.

## QA state

The diagnostic storage regression was repaired. The speech execution telemetry slice and the memory-pressure mitigation are under repository verification on their respective feature branches before merge.

## Speech intelligence state

The primary next engine layer is implemented as a provider-backed evidence acquisition system:

- media profile and integrity metadata;
- speech and silence timeline;
- faster-whisper transcription adapter with word-level timestamps;
- pyannote Community-1 diarization adapter;
- transcript/speaker overlap alignment;
- normalized multimodal timeline artifact;
- explicit provider states and failure-tolerant degradation;
- measured provider execution timing;
- heavy-provider cache release after execution in the memory-pressure repair branch;
- Developer Console speech-runtime readiness reporting through `/health`.

The heavy ML dependencies remain in the optional speech runtime profile rather than the lightweight base API requirements.

## Observability state

`voxvector.diagnostic.v2` carries run-correlatable `request_id`, `trace_id`, and, when used by the execution coordinator, `analysis_run_id`, together with UTC timestamps and measured durations. Immutable diagnostic records preserve precise timing while the relational projection remains integer-compatible.

`VoxVector/src/voxvector/execution_trace.py` provides an analysis-run execution coordinator with explicit stage start, completion, failure, progress, and overall-run events. Complete internal pipeline callback instrumentation remains a separate integration task.

Case-bound analysis persists a `running` case run before main processing and updates actual route-boundary state. The Developer Console polls the selected case while the analysis is active and projects stored state into the live workflow indicator.

## Render Developer Console integration

The authenticated console reads Render infrastructure through server-side routes:

- `GET /v1/developer/render/status`
- `GET /v1/developer/render/logs`

The bridge reads protected `RENDER_API_KEY` and `RENDER_SERVICE_ID` from the API runtime environment and never exposes the key to React/browser code.

GitHub Actions separately consumes repository secrets `RENDER_API_KEY` and `RENDER_SERVICE_ID` for infrastructure inspection. The Render service also needs the protected runtime variables for the live console bridge.

Render deployment state, instance state, and logs are infrastructure evidence. They do not replace application timing truth.

## Render memory incident evidence — 2026-09-02

Render reported that an instance of `voxvector-api` exceeded its memory limit and was automatically restarted. The account/service runtime evidence confirms the applicable free web-service budget is **512 MB RAM**.

The captured Render memory telemetry for the incident window recorded approximately:

- 02:10:00 UTC — 94.9 MB
- 02:10:30 UTC — 193.5 MB
- 02:11:00 UTC — 197.0 MB
- 02:11:30 UTC — 198.3 MB
- 02:12:00 UTC — 198.5 MB
- 02:12:30 UTC — 198.5 MB
- 02:13:00 UTC — 73.6 MB
- 02:13:30 UTC — 89.0 MB
- 02:14:00 UTC — 93.0 MB

The abrupt reduction from approximately 198.5 MB to 73.6 MB is consistent with a process/instance lifecycle reset around the notification window. The telemetry does **not** prove that faster-whisper or pyannote caused the restart, because the observed peak sample remained below the published 512 MB service budget and the exact sub-sample peak/cause is not captured by the 30-second memory resolution.

The same incident window contains slow case-list requests: one `/v1/cases` request recorded 10,353.41 ms and another 8,109.76 ms. These are reliability signals worth investigation but are not themselves evidence of the memory root cause.

The repository Render observability workflow now captures the incident-window memory telemetry and logs as a reproducible Actions artifact. The raw evidence captured for this incident was artifact `9829899743` from workflow run `33585450916`.

## Memory-efficiency engineering response — 2026-09-02

The canonical primary pipeline already uses bounded analysis frame chunks. The speech evidence-acquisition path is now aligned with that principle and computes RMS in bounded frame groups rather than materializing a full-recording frame matrix.

Heavy transcription and diarization provider phases are serialized in-process. Provider caches are explicitly released after each attempt, including failed attempts, followed by garbage collection and best-effort Linux allocator trimming.

The constrained faster-whisper default is `base` / CPU / `int8` / beam size `3`, with environment overrides for larger memory budgets. Runtime memory boundaries emit `VOXVECTOR_MEMORY` records with current Linux RSS, phase duration, and cleanup state.

These changes are resource-management and observability changes only. They do not alter analytical methodology or scientific validation state.

## Developer Console presentation refinement — 2026-09-02

The console visual system is being tightened around compact analytical presentation:

- shared Card surfaces use restrained 5–6% warm tonal gradients rather than flat fills;
- analytical card padding is reduced to tighten information density;
- non-card runtime/data surfaces use the same subtle tonal treatment;
- log, history, file metadata, upload, and runtime panels use more compact vertical spacing;
- rounded treatment is reduced on the shared Card primitive to keep the interface more technical and less decorative;
- the startup preloader logo is reduced substantially and given only a restrained local glow;
- motion continues to communicate activity without turning animation into fabricated progress.

These changes are presentation improvements only. They do not change analytical methodology, runtime capability, or scientific status.

## Developer Console workflow state

The Developer Console includes:

- first-class Case History backed by persisted case records;
- reopen of prior case analysis without creating a new run;
- persisted live run status and completed-stage count;
- visible current stage where known;
- indeterminate activity treatment during uninstrumented composite execution;
- individually collapsible Case Workbench steps;
- Expand All / Collapse All controls;
- vertically scrollable desktop/mobile navigation;
- console main viewport scroll reset;
- consistent human-readable labels for pipeline, QA, logs, errors, and infrastructure states;
- state-derived startup readiness with animated active bars;
- Render Runtime service/deployment/log surface;
- compact, provenance-oriented data presentation with restrained tonal gradients.

## UI integrity rule

Numeric progress is shown only when it represents measured transfer or persisted runtime state. Active startup and composite analysis work may use motion to communicate activity, but animation must not be interpreted as a fabricated percentage or proof that an internal method executed.

## Current engineering priorities

1. Complete and verify the memory-pressure mitigation before merge.
2. Continue Render incident correlation using memory, CPU, deployment, instance, and request timing evidence.
3. Execute faster-whisper in a controlled speech-enabled runtime and verify real transcript output/timestamps.
4. Execute pyannote Community-1 and verify speaker-turn output.
5. Measure memory before, during, and after each provider and across repeated runs.
6. Persist transcript, speaker, and alignment artifacts under canonical case/run identity.
7. Connect transcript-derived data to linguistic/disfluency analysis.
8. Make acoustic aggregation speaker-aware and build real baseline inputs.
9. Wire actual internal pipeline callback boundaries without duplicating the engine.
10. Expand the Evidence Explorer and assessment/report workflow.

## Integrity boundary

Provider output is data produced by the provider. Provider confidence is not deception confidence. Speaker labels are cluster labels, not verified identities. Transcript content is not evidence of truth by itself. No individual vocal or linguistic feature proves deception.

Historical checkpoints remain historical evidence and are not current status sources.
