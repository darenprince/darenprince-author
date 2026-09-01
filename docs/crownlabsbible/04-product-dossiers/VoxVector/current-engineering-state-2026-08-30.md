# VoxVector Current Engineering State — Crown Labs Mirror

**Status date:** 2026-08-30

This document mirrors the canonical technical state recorded in `VoxVector/docs/CURRENT_ENGINEERING_STATE_2026-08-30.md`.

## Current engineering stage

**Upload and intake reliability**

The immediate connected workflow remains:

`create case → select compatible WAV → upload → persist → secure playback → run case-bound analysis → inspect stage state → Analysis Workspace`

The next dependency is **real per-stage telemetry and lifecycle reporting**.

## Engineering status model

The Developer Console now has a dedicated authenticated engineering status surface that explicitly separates:

- **BUILT** — implementation/build evidence
- **FUNCTIONAL** — runtime execution evidence
- **TESTED** — actual test evidence
- **VALIDATED** — scientific or operational validation evidence

A successful build is never treated as proof that a workflow is functional or scientifically validated.

## 21-stage build

The canonical pipeline contains 21 stages. Current engineering state is:

- 14 implemented runtime foundations
- 4 conditional or intentionally not invoked without required inputs
- 3 queued for deeper integration

The status surface exposes the current engineering stage, next dependency, source revision, detailed QA checks, and GitHub traceability. Authenticated browser workflow checks remain explicitly unverified until actually exercised.

## QA and traceability

The console QA surface is designed to distinguish current test evidence from historical baselines and to expose backend tests, frontend build, runtime self-test, upload/persistence, secure playback, case-bound analysis, pipeline execution, browser/E2E verification, artifact/deployment verification, and scientific validation.

Material status should remain traceable through:

`GitHub → repository path → workflow → commit → artifact/deployment → runtime → console`

The console includes clickable GitHub references and copy controls for the source path/documentation URLs.

## Console workflow

Current Developer Console capabilities include runtime health, case management, compatible WAV intake, upload diagnostics/progress, secure playback path, case-bound analysis, stage-state inspection, diagnostic logs/errors, developer profile/sign-out, methodology navigation, MVP task tracking, and engineering status/traceability.

State-changing workflows must refresh relevant status sources so stale operator claims are not retained.

## Documentation synchronization

The current implementation and roadmap are mirrored against the canonical records:

- `VoxVector/docs/MVP_BUILD_PLAN.md`
- `VoxVector/docs/PIPELINE_BUILD_STATUS.md`
- `VoxVector/docs/CAPABILITY_STATUS.md`
- `VoxVector/docs/ROADMAP.md`
- `VoxVector/docs/CURRENT_ENGINEERING_STATE_2026-08-30.md`
- `VoxVector/docs/DEVELOPER_CONSOLE_DOC_SYNC_RULES.md`

The current console engineering status implementation is in:

`voxvector/src/components/DeveloperEngineeringStatus.jsx`

and its dedicated stylesheet:

`voxvector/src/components/DeveloperEngineeringStatus.css`

## QA boundary

The repository contains automated backend and frontend build workflows. A successful build is **BUILT**, not automatically FUNCTIONAL, TESTED, or VALIDATED. Historical baselines remain historical evidence.

Authenticated production browser verification of the protected case workflow remains required before declaring upload, playback, and analysis end-to-end verified.

## Hosting boundary

VoxVector production architecture remains:

- public React frontend: GitHub Pages
- canonical FastAPI analysis backend: Render
- authentication/persistence/diagnostic operational services: Supabase

Vercel is retired and prohibited for VoxVector.


## 2026-08-31 upload incident mirror

Production Supabase Storage evidence showed that WAV media persistence succeeded, but the subsequent update of the owning case JSON failed with HTTP 400. The root cause was create-style JSON object persistence without Storage upsert semantics. Canonical backend storage now uses `x-upsert: true` for case/log JSON writes, with regression coverage added. Browser MIME labels are no longer allowed to reject a selected recording before authoritative upload validation. Deployment and end-to-end browser verification remain required before marking the workflow functional.

## 2026-09-01 production analysis milestone

A real production case subsequently completed the repaired connected path through source upload, private media persistence, case-bound analysis, and analysis completion. Production `/health`, `/v1/cases`, and `/v1/cases/{case_id}` returned `200 OK`, and the Render runtime emitted valid `VOXVECTOR_DIAGNOSTIC` records.

The engineering picture therefore changes at the operational boundary: the basic upload, persistence, PCM WAV intake, and case-bound analysis path has now been **production executed** for the observed workflow. Scientific validation remains a separate requirement.

## 2026-09-01 observability repair mirror

Production logs isolated the remaining Developer Console Logs issue to the relational projection of fractional diagnostic durations into the integer `api_request_logs.duration_ms` column. The canonical backend now normalizes that value at the projection boundary while preserving fractional precision in immutable diagnostic Storage records.

Regression coverage includes decimal, string, zero/sub-millisecond, null, and invalid duration values. The remaining verification is to deploy the repaired revision and confirm real relational records populate Live Logs and Error Reports.

## Next engineering phase

The primary next product step is no longer basic upload reliability. It is the completed-analysis experience:

`Analysis complete → Review Evidence / Analysis Results`

followed by full run/stage audit telemetry, speaker and transcript integration, evidence presentation, assessment, reporting, and then broader validation work.
