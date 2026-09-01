# VoxVector Current Engineering State — 2026-09-01

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

## Current verified QA

The latest previously verified QA result is historical evidence tied to its exact source revision. The current console/Render feature slice requires a fresh GitHub Actions QA run before it is recorded as green.

## Speech intelligence state — 2026-09-01

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

The user-configured Hugging Face token and Community-1 access conditions remain deployment configuration. The repository does not inspect or store the secret.

## Observability state — 2026-09-01

`voxvector.diagnostic.v2` carries run-correlatable `request_id`, `trace_id`, and, when used by the execution coordinator, `analysis_run_id`, together with UTC timestamps and measured durations. Immutable diagnostic records preserve precise timing while the relational projection remains integer-compatible.

`VoxVector/src/voxvector/execution_trace.py` provides an analysis-run execution coordinator with explicit stage start, completion, failure, progress, and overall-run events. The application-side foundation is present and tested; complete internal pipeline callback instrumentation remains a separate integration task.

Case-bound analysis now persists a `running` case run before main processing and updates actual route-boundary state. The Developer Console polls the selected case while the analysis is active and projects the stored state into a live workflow indicator.

The repository includes `VoxVector/scripts/render-observe.sh`, `VoxVector/docs/RENDER_OBSERVABILITY.md`, and `.github/workflows/render-observability.yml` for Render infrastructure inspection.

## Render Developer Console integration — 2026-09-01

The authenticated console now reads Render infrastructure through server-side routes:

- `GET /v1/developer/render/status`
- `GET /v1/developer/render/logs`

The bridge reads protected `RENDER_API_KEY` and `RENDER_SERVICE_ID` from the API runtime environment and never exposes the key to React/browser code.

GitHub Actions separately consumes repository secrets `RENDER_API_KEY` and `RENDER_SERVICE_ID`. These GitHub secrets are not automatically injected into the Render service. The Render service must separately contain the protected variables before the live console bridge can authenticate.

Render deployment state, instance state, logs, and metrics are infrastructure evidence. They do not replace application timing truth.

## Developer Console workflow state — 2026-09-01

The Developer Console now includes:

- first-class Case History backed by persisted case records;
- reopen of prior case analysis without creating a new run;
- persisted live run status and completed-stage count;
- visible current stage where known;
- indeterminate activity treatment during uninstrumented composite execution;
- individually collapsible Case Workbench steps;
- Expand All / Collapse All controls;
- vertically scrollable desktop/mobile sidebar;
- route navigation scroll reset to the top of the main workspace;
- consistent human-readable labels for pipeline, QA, logs, errors, and infrastructure states;
- visibly moving startup initialization progress after real API readiness;
- Render Runtime service/deployment/log surface.

These are implementation changes. Authenticated browser verification and deployed runtime verification remain required.

## Current engineering priorities

1. Configure and verify Render-side `RENDER_API_KEY` and `RENDER_SERVICE_ID`.
2. Verify GitHub Actions Render observability with the repository secrets.
3. Verify faster-whisper model acquisition, transcription segments, word timestamps, runtime duration, and resource behavior.
4. Verify pyannote Community-1 model access and speaker-turn output.
5. Persist and inspect transcript, speaker, and multimodal alignment artifacts under the canonical case/run.
6. Connect transcript-derived data to the existing linguistic/disfluency analysis path.
7. Make acoustic aggregation speaker-aware and feed real speaker-separated baselines.
8. Add question/answer context and interaction timing ingestion.
9. Expand the Analysis Results / Review Evidence UI around the real multimodal timeline.
10. Wire the execution coordinator into every actual internal analysis boundary without duplicating the pipeline.
11. Complete authenticated browser/mobile verification of the Developer Console.
12. Begin task-specific scientific evaluation only after engineering stability is established.

## Integrity boundary

Provider output is data produced by the provider. Provider confidence is not deception confidence. Speaker labels are cluster labels, not verified identities. Transcript content is not evidence of truth by itself. No individual vocal or linguistic feature proves deception.

Historical checkpoints remain historical evidence and are not current status sources.

## 2026-09-01 speech runtime hardening

The acquisition layer treats configured-provider failures as explicit `unavailable` states with limitations so optional speech capabilities cannot silently take down the base analysis path.

The faster-whisper adapter does not convert `avg_logprob` into a probability-like segment confidence value. Segment confidence remains null unless an actual probability field is provided.

The pyannote adapter prefers Community-1 exclusive speaker diarization when the provider exposes it, improving alignment with transcript timestamps.

Deployment procedure: `VoxVector/docs/SPEECH_RUNTIME_DEPLOYMENT.md`.
