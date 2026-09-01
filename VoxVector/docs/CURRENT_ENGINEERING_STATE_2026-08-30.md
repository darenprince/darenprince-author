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

The latest verified QA result is `VoxVector QA` run `33505148274` on commit `5c88299679515604bfb9c0903c48b2b95650e6aa`. Its test job passed API tests, React dependency installation, and the production React build.

Subsequent documentation changes create a new source revision and therefore require a new exact-commit QA result before that revision is called green.

## 21-stage pipeline state

The canonical pipeline contains 21 stages:

- 14 implemented runtime foundations
- 4 conditional or intentionally not invoked without required inputs
- 3 queued for deeper runtime integration

`VoxVector/src/voxvector/stage_telemetry.py` provides a persistence-neutral recorder with monotonic duration timing, UTC lifecycle timestamps, explicit running/completed/failed/not-run/pending states, outcomes, errors, deterministic snapshots, and transition guards. `VoxVector/src/voxvector/results_envelope.py` provides the composed post-analysis result model joining case, source, run, pipeline, observations, evidence, candidate, disposition, provenance, and explicit downstream capability gaps.

### Debug verification finding — 2026-09-01

Source inspection of the canonical `VoxVector/src/voxvector/pipeline.py` on `main` found that the telemetry utility has **not** been wired into every internal execution boundary of the monolithic pipeline. The pipeline continues to compute the implemented analytical families directly without emitting a recorder callback around each family.

The results-envelope utility is likewise present and tested, but is not yet connected as the canonical response envelope of the case-analysis HTTP route.

Therefore:

- telemetry utility: **BUILT + TESTED**;
- results envelope utility: **BUILT + TESTED**;
- internal stage telemetry integration: **OPEN**;
- case-analysis results-envelope integration: **OPEN**;
- end-to-end persisted granular stage timing: **NOT YET VERIFIED**.

No existing production run is retroactively credited with per-stage timings that were not actually emitted.

## Current engineering stage

**Post-analysis results and auditability.**

The immediate implementation sequence is:

`StageTelemetry → real pipeline stage boundaries → run persistence → diagnostic lifecycle events → Developer Console audit timeline`

in parallel with:

`engine result + case/source/run state → composed results envelope → canonical API response → Results / Evidence UI`

## Developer Console operating state

The engineering status surface compares GitHub workflow commit SHA to the backend runtime source revision and marks mismatched workflow evidence as `STALE` rather than current.

The console continues to distinguish:

- BUILT
- FUNCTIONAL
- TESTED
- VALIDATED

GitHub workflow results are software verification evidence only.

## Active priorities

1. Wire `StageTelemetry` into the real internal pipeline stage boundaries without creating a parallel pipeline implementation.
2. Connect `compose_result_envelope()` to the canonical case-analysis API response path.
3. Persist the composed result and stage audit data under the existing case/run identity.
4. Expand Review Evidence into an audio-linked evidence explorer and timeline.
5. Verify relational diagnostic projections and Developer Console rendering against real deployed data.
6. Speaker identification/diarization.
7. Production transcription and transcript/audio alignment.
8. Real analytical tracks and normalized evidence.
9. Evidence synthesis, assessment, reporting, history/reopen, and browser-level verification.
10. Scientific validation program.

## Documentation synchronization

Current alignment record: `docs/DOCS_ALIGNMENT_2026-09-01.md`.

Current versions: backend `0.2.26`, frontend `0.2.36`, engine result schema `0.3`.

Historical checkpoints remain historical evidence and are not current status sources.
