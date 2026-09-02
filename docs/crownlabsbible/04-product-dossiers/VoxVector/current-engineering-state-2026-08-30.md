# VoxVector Current Engineering State — Crown Labs Mirror

**Status date:** 2026-09-02

This document mirrors the current technical state recorded in the canonical `VoxVector/docs/` engineering records. The filename is retained for historical traceability; the content is maintained as the current mirror.

## Current engineering stage

**Evidence acquisition, runtime observability, and connected case workflow**

The repaired production path has crossed the basic operational boundary:

`create case → upload WAV → persist private source → secure playback path → case-bound analysis → analysis completion`

The active dependency chain is now:

`live analysis state → evidence acquisition → speaker/transcription execution → alignment → evidence workspace → assessment/reporting`

## Current QA

The software QA path is maintained separately from scientific validation. The current memory-pressure mitigation and console refinement are undergoing fresh repository verification before merge.

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

The case-analysis route persists a `running` record before the main analysis call and updates real route-boundary state during execution. The monolithic analytical engine is still not internally callback-instrumented at every stage, so the console uses honest determinate counts plus indeterminate activity while the composite engine executes.

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
- compact data presentation with restrained tonal gradients

### Case History

Case History reads the authenticated case list and opens persisted case records for later review. It does not fabricate case data and does not create a new run merely by opening a prior case.

### Render Runtime

The console's Render Runtime page uses server-side authenticated API routes to read the configured Render service, deployment history, instance state, and recent service logs.

The deployed Render service uses protected `RENDER_API_KEY` and `RENDER_SERVICE_ID` environment variables. GitHub repository secrets with those names are used independently by GitHub Actions. Render credentials are never exposed to the browser.

## Render memory incident evidence — 2026-09-02

Render reported that an instance of `voxvector-api` exceeded its memory limit and was automatically restarted. The connected runtime evidence confirms a **512 MB RAM** free web-service budget.

The incident-window memory series rose from approximately 94.9 MB at 02:10:00 UTC to 193.5 MB at 02:10:30, 197.0 MB at 02:11:00, 198.3 MB at 02:11:30, and 198.5 MB at 02:12:00 and 02:12:30. At 02:13:00 it dropped to approximately 73.6 MB and then stabilized near 89–93 MB.

The discontinuity supports a runtime reset pattern. It does not prove that a speech model caused the incident because the observed sampled peak was below the 512 MB service budget and the telemetry resolution does not capture the exact instantaneous peak.

The same runtime window contained slow `/v1/cases` requests of approximately 10.35 seconds and 8.11 seconds. Those are separate reliability signals requiring correlation.

Raw incident evidence was captured into GitHub Actions artifact `9829899743` from workflow run `33585450916`.

## Observability repair

The diagnostic storage regression was repaired. The Render observability workflow now resolves the authenticated workspace, collects service and deployment state, retrieves recent and incident-window logs, and captures memory telemetry for reproducible incident analysis.

## Console visual refinement — 2026-09-02

The shared console visual language is being tightened around compact analytical presentation:

- shared analytical cards use restrained 5–6% warm tonal gradients;
- data-heavy surfaces use the same subtle tonal shift for continuity;
- card and metadata padding is reduced where density benefits readability;
- log/history/runtime surfaces use more compact vertical rhythm;
- shared card rounding is reduced;
- the API startup preloader uses a much smaller logo and restrained glow;
- motion remains state-driven and must not masquerade as measured analytical progress.

## Hosting boundary

- public React frontend: GitHub Pages
- FastAPI analysis backend: Render
- authentication/persistence/diagnostics/private media: Supabase

## Current engineering records

Canonical synchronization records include:

- `VoxVector/docs/ENGINEERING_PLAN_2026-09-01.md`
- `VoxVector/docs/ENGINEERING_SYNC_2026-09-01.md`
- `VoxVector/docs/DEVELOPER_CONSOLE_DOC_SYNC_RULES.md`
- `VoxVector/docs/PIPELINE_BUILD_STATUS.md`
- `VoxVector/docs/QA_STATUS.md`
- `VoxVector/docs/ENGINEERING_AUDIT_2026-09-02.md`
- `VoxVector/api/README.md`
- `.github/workflows/render-observability.yml`

## Scientific boundary

Software build, runtime execution, deployment, telemetry, case history, transcription readiness, diarization labels, acoustic observations, and QA do not establish scientific deception-detection validity. Scientific validation remains separate and task-specific.
