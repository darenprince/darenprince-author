# VoxVector Current Engineering State — 2026-09-01

## Purpose

This is the current engineering synchronization record for the connected VoxVector application. The repository remains the technical source of truth.

## Current implementation audit

### Public React application — `voxvector/`

Current connected surfaces include the public landing page, shared `SiteHeader`, authenticated Developer Gate, Developer Console, Case Workbench, Analysis Workspace, audio upload/playback primitives, local waveform/spectrogram visualization, methodology/documentation navigation, MVP task board, diagnostic views, GitHub-backed engineering status, and developer profile controls.

The Developer Console uses the canonical case API contracts for case creation, case retrieval, WAV source upload, signed playback, and case-bound analysis.

### Backend — `VoxVector/`

The canonical FastAPI adapter exposes `/health`, direct `/v1/analyze`, authenticated case creation/list/retrieval, authenticated case-source upload, secure signed playback, authenticated case-bound analysis, and diagnostic events/errors.

The canonical analysis engine remains under `VoxVector/src/voxvector/` and is invoked by the API adapter.

## Current production execution state

The observed configured production path has completed:

`case workflow → source upload → private media persistence → case-bound analysis → analysis completion`

Case records preserve source metadata, SHA-256 provenance, run identity, and pipeline state. Private media uses Supabase Storage with signed playback access.

## Current CI state

A fresh QA run is required for the latest `main` commit before current `main` is recorded as green. Earlier passing runs remain historical evidence tied to their exact source revision.

## 21-stage pipeline state

The canonical pipeline contains 21 stages:

- 14 implemented runtime foundations
- 4 conditional or intentionally not invoked without required inputs
- 3 queued for deeper runtime integration

Stage state is persisted per run. The newly added `VoxVector/src/voxvector/stage_telemetry.py` provides a persistence-neutral recorder with monotonic duration timing, UTC lifecycle timestamps, explicit running/completed/failed/not-run/pending states, outcomes, errors, deterministic snapshots, and transition guards.

The telemetry recorder is now **BUILT** and **TESTED**. It is not yet wired into every internal `VoxVectorPipeline.analyze()` boundary, so existing runs must not be described as having complete per-stage timing. The next integration task is to connect the recorder to the real execution points for the implemented analytical stages and persist those snapshots through the canonical case run and diagnostics paths.

## Current engineering stage

**Post-analysis results and auditability.**

The basic upload/intake blocker is cleared for the observed production path. The immediate product dependency is:

`Analysis complete → Analysis Results → Review Evidence`

The infrastructure dependency now being executed is:

`stage telemetry recorder → real pipeline stage callbacks → persisted stage audit trail → Developer Console telemetry view`

## Developer Console operating state

The engineering status surface consumes live GitHub Actions status and compares workflow commit SHA to the backend runtime source revision. A QA or deployment run from another revision is displayed as `STALE` rather than current.

The console continues to distinguish:

- BUILT
- FUNCTIONAL
- TESTED
- VALIDATED

GitHub workflow results are software verification evidence only.

## Active priorities

1. Canonical composed Analysis Results contract.
2. Review Evidence surface driven by the persisted run result.
3. Wire `StageTelemetry` into real internal pipeline boundaries and persist lifecycle events.
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
