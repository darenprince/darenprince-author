# VoxVector Current Engineering State — 2026-09-01

## Purpose

This is the current engineering synchronization record for the connected VoxVector application. The repository remains the technical source of truth.

## Current implementation audit

### Public React application — `voxvector/`

Current connected surfaces include the public landing page, shared `SiteHeader`, authenticated Developer Gate, Developer Console, Case Workbench, Analysis Workspace, audio upload/playback primitives, local waveform/spectrogram visualization, methodology/documentation navigation, MVP task board, diagnostic views, GitHub-backed engineering status, developer profile controls, and persisted Analysis Results / Review Evidence presentation.

The Developer Console uses the canonical case API contracts for case creation, case retrieval, WAV source upload, signed playback, and case-bound analysis.

### Backend — `VoxVector/`

The canonical FastAPI adapter exposes `/health`, direct `/v1/analyze`, authenticated case creation/list/retrieval, authenticated case-source upload, secure signed playback, authenticated case-bound analysis, and diagnostic events/errors.

The canonical analysis engine remains under `VoxVector/src/voxvector/` and is invoked by the API adapter.

## Current production execution state

The observed configured production path has completed:

`case workflow → source upload → private media persistence → case-bound analysis → analysis completion`

Case records preserve source metadata, SHA-256 provenance, run identity, and pipeline state. Private media uses Supabase Storage with signed playback access.

## Current verified QA

The latest verified QA result before the current speech-integration source revision is `VoxVector QA` run `33505986385` on commit `661377afed8b5493b62bd7f13121f53f45895d6a`. That run passed.

The current source revision has a fresh QA workflow running; its result is required before the current revision is called green.

## Speech intelligence state — 2026-09-01

The primary next engine layer is now implemented as a provider-backed evidence acquisition system:

- media profile and integrity metadata;
- speech and silence timeline;
- faster-whisper transcription adapter with word-level timestamps;
- pyannote Community-1 diarization adapter;
- transcript/speaker overlap alignment;
- normalized multimodal timeline artifact;
- explicit provider states and failure-tolerant degradation;
- Developer Console speech-runtime readiness reporting through `/health`.

The heavy ML dependencies remain in the optional speech runtime profile rather than the lightweight base API requirements.

The user has configured the Hugging Face token and Community-1 access conditions in Render. The repository does not inspect or store the secret.

## Observability state — 2026-09-01

`voxvector.diagnostic.v2` now carries a run-correlatable `request_id`, `trace_id`, and, when used by the execution coordinator, `analysis_run_id`, together with UTC timestamps and measured durations. Immutable diagnostic records preserve precise timing while the relational projection remains integer-compatible.

`VoxVector/src/voxvector/execution_trace.py` provides an analysis-run execution coordinator with explicit stage start, completion, failure, progress, and overall-run events. The application-side foundation is present and tested; complete internal pipeline callback instrumentation remains a separate integration task.

The repository includes `VoxVector/scripts/render-observe.sh` and `VoxVector/docs/RENDER_OBSERVABILITY.md` for Render Live Tail and centralized-log operations.

## Current engineering priorities

1. Run the optional speech runtime in a controlled deployed environment.
2. Verify faster-whisper model acquisition, transcription segments, word timestamps, runtime duration, and resource behavior.
3. Verify pyannote Community-1 model access and speaker-turn output.
4. Persist and inspect transcript, speaker, and multimodal alignment artifacts under the canonical case/run.
5. Connect transcript-derived data to the existing linguistic/disfluency analysis path.
6. Make acoustic aggregation speaker-aware and feed real speaker-separated baselines.
7. Add question/answer context and interaction timing ingestion.
8. Expand the Analysis Results / Review Evidence UI around the real multimodal timeline.
9. Wire the execution coordinator into every actual internal analysis boundary without duplicating the pipeline.
10. Begin task-specific scientific evaluation only after engineering stability is established.

## Integrity boundary

Provider output is data produced by the provider. Provider confidence is not deception confidence. Speaker labels are cluster labels, not verified identities. Transcript content is not evidence of truth by itself. No individual vocal or linguistic feature proves deception.

Historical checkpoints remain historical evidence and are not current status sources.

## 2026-09-01 speech runtime hardening

The acquisition layer now treats configured-provider failures as explicit `unavailable` states with limitations so optional speech capabilities cannot silently take down the base analysis path.

The faster-whisper adapter no longer converts `avg_logprob` into a probability-like segment confidence value. Segment confidence remains null unless an actual probability field is provided.

The pyannote adapter prefers Community-1 exclusive speaker diarization when the provider exposes it, improving alignment with transcript timestamps.

Deployment procedure: `VoxVector/docs/SPEECH_RUNTIME_DEPLOYMENT.md`.
