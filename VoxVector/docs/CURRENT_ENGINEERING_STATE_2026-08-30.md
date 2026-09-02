# VoxVector Current Engineering State — 2026-09-02

## Purpose

This is the current engineering synchronization record for the connected VoxVector application. The repository remains the technical source of truth.

## Current implementation audit

### Public React application — `voxvector/`

Current connected surfaces include the public landing page, shared `SiteHeader`, authenticated Developer Gate, Developer Console, Case Workbench, Case History, Analysis Workspace, audio upload/playback primitives, local waveform/spectrogram visualization, methodology/documentation navigation, MVP task board, diagnostic views, GitHub-backed engineering status, developer profile controls, and persisted Analysis Results / Review Evidence presentation.

The Developer Console uses canonical case API contracts for case creation, case listing/retrieval, WAV source upload, signed playback, and case-bound analysis. It also has authenticated Render Runtime status/log surfaces through server-side API routes.

### Backend — `VoxVector/`

The canonical FastAPI adapter exposes `/health`, direct `/v1/analyze`, authenticated case creation/list/retrieval, authenticated case-source upload, secure signed playback, authenticated case-bound analysis, diagnostic events/errors, and developer-only Render runtime status/log routes.

The canonical analysis engine remains under `VoxVector/src/voxvector/` and is invoked by the API adapter.

## Current production execution state

The observed configured production path has completed:

`case workflow → source upload → private media persistence → case-bound analysis → analysis completion`

Case records preserve source metadata, SHA-256 provenance, run identity, and pipeline state. Private media uses Supabase Storage with signed playback access.

## Render incident evidence

Render reported repeated `voxvector-api` instance failures that explicitly exceeded the **512 MB** memory budget. User-provided dashboard evidence shows separate OOM failures on September 1 at approximately 7:54 PM and 8:09 PM with service recovery after each, plus a separate deployment health-check timeout earlier that day.

The connected Render observability workflow captured a matching memory-window series that rose from approximately 94.9 MB to 193.5 MB, 197.0 MB, 198.3 MB, and 198.5 MB before an abrupt drop to 73.6 MB and stabilization near 89–93 MB. The sampled platform series does not resolve the instantaneous >512 MB peak, but the Render instance events independently establish that the service crossed the platform budget.

The same incident evidence includes `/v1/cases` requests taking approximately 10.35 seconds and 8.11 seconds. Those are tracked separately as API reliability signals.

Raw incident evidence is preserved in GitHub Actions artifact `9829899743` from workflow run `33585450916`.

## Memory-efficiency engineering state

The canonical primary pipeline already uses bounded analysis frame chunks. The speech evidence-acquisition path has now been aligned with that principle and computes RMS in bounded frame groups rather than materializing a full-recording frame matrix.

Heavy transcription and diarization provider phases are serialized in-process, provider caches are explicitly released after each attempt, and post-provider cleanup performs garbage collection plus best-effort Linux allocator trimming.

The constrained faster-whisper default is `base` / CPU / `int8` / beam size `3`, with environment overrides for larger memory budgets. Runtime memory boundaries emit `VOXVECTOR_MEMORY` records with current Linux RSS, phase duration, and cleanup state.

This is an engineering resource-management measure, not a scientific-method change.

## Speech intelligence state

The evidence-acquisition system includes:

- media profile and integrity metadata;
- speech and silence timeline;
- faster-whisper transcription adapter with word-level timestamps;
- pyannote Community-1 diarization adapter;
- transcript/speaker overlap alignment;
- normalized multimodal timeline artifact;
- explicit provider states and failure-tolerant degradation;
- measured provider execution timing;
- explicit heavy-provider release behavior;
- constrained-runtime memory telemetry.

The heavy ML dependencies remain in the optional speech runtime profile rather than the lightweight base API requirements.

## Developer Console state

The Developer Console includes Case History, persisted live run state, Render Runtime infrastructure visibility, collapsible workbench sections, scroll-safe navigation, consistent status language, animated startup activity based on real readiness state, and the recent premium visual refinement with subtle tonal gradients and tighter data density.

## Current engineering priorities

1. Run the full QA suite and React production build against the memory-efficiency branch.
2. Deploy the constrained speech runtime to Render and capture real `VOXVECTOR_MEMORY` telemetry.
3. Execute a controlled short WAV through faster-whisper and verify transcript/timestamps.
4. Execute Community-1 and verify speaker turns.
5. Correlate provider memory, request concurrency, and Render instance lifecycle behavior.
6. Persist transcript, speaker, and alignment artifacts under canonical case/run identity.
7. Connect transcript-derived data to linguistic/disfluency analysis.
8. Make acoustic aggregation speaker-aware and build real baseline inputs.
9. Wire complete internal pipeline callback boundaries without duplicating the engine.
10. Expand the Evidence Explorer and assessment/report workflow.

## Integrity boundary

Provider output is data produced by the provider. Provider confidence is not deception confidence. Speaker labels are diarization clusters, not verified real-world identities. Transcript content is not evidence of truth by itself. No individual vocal or linguistic feature proves deception.

Historical checkpoints remain historical evidence and are not current status sources.
