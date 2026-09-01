# VoxVector Current Engineering State — Crown Labs Mirror

**Status date:** 2026-09-01

This document mirrors the current technical state recorded in the canonical `VoxVector/docs/` engineering records. The filename is retained for historical traceability; the content is maintained as the current mirror.

## Current engineering stage

**Evidence acquisition, runtime observability, and connected case workflow**

The repaired production path has crossed the basic operational boundary:

`create case → upload WAV → persist private source → secure playback path → case-bound analysis → analysis completion`

The active dependency chain is now:

`live analysis state → evidence acquisition → speaker/transcription execution → alignment → evidence workspace → assessment/reporting`

## Current QA

A fresh QA run is required for the feature branch before the new console/Render integration is recorded as green. Earlier passing runs remain historical evidence tied to their exact source revision.

## Engineering status model

The Developer Console separates:

- BUILT
- FUNCTIONAL
- TESTED
- VALIDATED
- CONDITIONAL
- QUEUED
- NOT INVOKED
- FAILED
- BLOCKED

Green source/build status must never be interpreted as scientific validation.

## 21-stage build

Current pipeline state remains:

- 14 implemented runtime foundations
- 4 conditional or intentionally not invoked
- 3 queued for deeper integration

The `VoxVector/src/voxvector/stage_telemetry.py` utility provides real monotonic elapsed timing, UTC lifecycle timestamps, explicit running/completed/failed/not-run/pending states, outcomes, errors, deterministic snapshots, and lifecycle transition guards.

The case-analysis route now persists a `running` record before the main analysis call and updates real route-boundary state during execution. The monolithic analytical engine is still not internally callback-instrumented at every stage, so the console uses honest determinate counts plus indeterminate activity while the composite engine executes.

## Developer Console workflow

Current console capabilities include:

- runtime health
- case creation and source intake
- compatible WAV upload and progress
- secure playback preparation
- case-bound analysis
- persisted live run-state polling
- 21-stage state inspection
- Case History with persisted case reopen
- Analysis Workspace
- diagnostic logs and error reports
- Render Runtime service/deployment/log status
- GitHub-backed engineering QA/deployment surfaces
- methodology and architecture navigation
- MVP task tracking
- engineering traceability
- collapsible workbench steps
- scroll-safe desktop/mobile navigation
- moving initialization progress

### Case History

Case History reads the authenticated case list and opens persisted case records for later review. It does not fabricate case data and does not create a new run merely by opening a prior case.

### Render Runtime

The console's Render Runtime page uses server-side authenticated API routes to read the configured Render service, deployment history, instance state, and recent service logs.

Render credentials are not exposed to the browser. The deployed Render service must separately contain protected `RENDER_API_KEY` and `RENDER_SERVICE_ID` environment variables. GitHub repository secrets with those names are available to GitHub Actions only.

## Observability

The canonical diagnostic implementation retains immutable sanitized Storage records and projects operational data to the relational console surfaces. Case-specific source rejection/failure events are classified as diagnostic errors as well as lifecycle events.

Application timing truth remains the backend monotonic duration measurement. Render timestamps/logs/deployments are infrastructure correlation evidence.

## Hosting boundary

- public React frontend: GitHub Pages
- FastAPI analysis backend: Render
- authentication/persistence/diagnostics/private media: Supabase

## Current engineering records

Canonical synchronization records now include:

- `VoxVector/docs/ENGINEERING_PLAN_2026-09-01.md`
- `VoxVector/docs/ENGINEERING_SYNC_2026-09-01.md`
- `VoxVector/docs/DEVELOPER_CONSOLE_DOC_SYNC_RULES.md`
- `VoxVector/docs/PIPELINE_BUILD_STATUS.md`
- `VoxVector/docs/QA_STATUS.md`
- `VoxVector/api/README.md`
- `.github/workflows/render-observability.yml`

## Scientific boundary

Software build, runtime execution, deployment, telemetry, case history, transcription readiness, diarization labels, acoustic observations, and QA do not establish scientific deception-detection validity. Scientific validation remains separate and task-specific.
