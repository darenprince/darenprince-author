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

## Current CI state

The latest post-change QA workflow is the authoritative verification gate for the current source revision. Historical passing or failing runs remain tied to their exact commits and are not substituted for current evidence.

## 21-stage pipeline state

The canonical pipeline contains 21 stages:

- 14 implemented runtime foundations
- 4 conditional or intentionally not invoked without required inputs
- 3 queued for deeper runtime integration

`VoxVector/src/voxvector/stage_telemetry.py` provides a persistence-neutral recorder with monotonic duration timing, UTC lifecycle timestamps, explicit running/completed/failed/not-run/pending states, outcomes, errors, deterministic snapshots, and transition guards. `VoxVector/src/voxvector/results_envelope.py` now provides the canonical composed post-analysis envelope that joins case, source, run, pipeline, observations, evidence, candidate, disposition, provenance, and explicit downstream capability gaps.

The stage telemetry recorder is built and unit-tested, but the existing monolithic pipeline is not yet wired at every internal boundary. Existing production runs must not be described as having complete granular stage timing until those callbacks are integrated.

## Current engineering stage

**Post-analysis results and auditability.**

The basic upload/intake blocker is cleared for the observed production path. The product dependency is:

`Analysis complete → Analysis Results → Review Evidence`

The infrastructure sequence now being implemented is:

`stage telemetry recorder → real pipeline stage callbacks → persisted stage audit trail → Developer Console telemetry view`

The canonical composed result sequence is:

`engine result + case/source/run state → composed results envelope → Results / Evidence UI`

## Developer Console operating state

The engineering status surface consumes live GitHub Actions status and compares workflow commit SHA to the backend runtime source revision. A QA or deployment run from another revision is displayed as `STALE` rather than current.

The console continues to distinguish:

- BUILT
- FUNCTIONAL
- TESTED
- VALIDATED

GitHub workflow results are software verification evidence only.

## Active priorities

1. Wire `StageTelemetry` into real internal pipeline boundaries and persist lifecycle events.
2. Connect `compose_result_envelope()` to the canonical case-analysis API response path.
3. Expand Review Evidence into an evidence explorer and audio-linked timeline.
4. Production verification of relational diagnostic projections and Developer Console rendering.
5. Speaker identification/diarization.
6. Production transcription and transcript/audio alignment.
7. Real analytical tracks and normalized evidence.
8. Evidence synthesis, assessment, reporting, and history/reopen.
9. Browser-level connected workflow verification.
10. Scientific validation program.

## Documentation synchronization

Current alignment record: `docs/DOCS_ALIGNMENT_2026-09-01.md`.

Current versions: backend `0.2.26`, frontend `0.2.36`, engine result schema `0.3`.

Historical checkpoints remain historical evidence and are not current status sources.
