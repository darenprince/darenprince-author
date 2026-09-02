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

The supplied QA log for the preceding feature slice reported `127 passed, 1 failed`. The failure was `tests/test_observability.py::test_diagnostic_store_survives_storage_failure`, caused by `storage_result` being returned after a storage exception without assignment. The canonical diagnostic store has been repaired to initialize the result and safely return after storage persistence failure.

A fresh exact-commit GitHub Actions run remains the authoritative verification gate for the repair and UI changes.

## Speech intelligence state

The primary next engine layer is implemented as a provider-backed evidence acquisition system:

- media profile and integrity metadata;
- speech and silence timeline;
- faster-whisper transcription adapter with word-level timestamps;
- pyannote Community-1 diarization adapter;
- transcript/speaker overlap alignment;
- normalized multimodal timeline artifact;
- explicit provider states and failure-tolerant degradation;
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
- Render Runtime service/deployment/log surface.

## UI integrity rule

Numeric progress is shown only when it represents measured transfer or persisted runtime state. Active startup and composite analysis work may use motion to communicate activity, but animation must not be interpreted as a fabricated percentage or proof that an internal method executed.

## Current engineering priorities

1. Verify the repaired exact-commit QA and React build.
2. Verify the live Render API bridge on the deployed VoxVector service.
3. Verify startup, initial scroll position, sidebar scrolling, workbench collapse, and case-history reopen in authenticated desktop and mobile browsers.
4. Execute faster-whisper in a controlled speech-enabled runtime and verify real transcript output/timestamps.
5. Execute pyannote Community-1 and verify speaker-turn output.
6. Persist transcript, speaker, and alignment artifacts under canonical case/run identity.
7. Connect transcript-derived data to linguistic/disfluency analysis.
8. Make acoustic aggregation speaker-aware and build real baseline inputs.
9. Wire actual internal pipeline callback boundaries without duplicating the engine.
10. Expand the Evidence Explorer and assessment/report workflow.

## Integrity boundary

Provider output is data produced by the provider. Provider confidence is not deception confidence. Speaker labels are cluster labels, not verified identities. Transcript content is not evidence of truth by itself. No individual vocal or linguistic feature proves deception.

Historical checkpoints remain historical evidence and are not current status sources.
