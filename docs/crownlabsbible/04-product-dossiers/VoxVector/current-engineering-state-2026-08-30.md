# VoxVector Current Engineering State — Crown Labs Mirror

**Status date:** 2026-09-01

This document mirrors the current technical state recorded in `VoxVector/docs/CURRENT_ENGINEERING_STATE_2026-08-30.md`.

## Current engineering stage

**Post-analysis Results / Review Evidence**

The repaired production path has crossed the basic operational boundary:

`create case → upload WAV → persist private source → secure playback path → case-bound analysis → analysis completion`

The immediate dependency is now:

`Analysis complete → Analysis Results → Review Evidence`

The infrastructure work now underway is granular stage telemetry: real lifecycle timing at the actual pipeline execution points, persisted stage audit records, and console presentation of that audit trail.

## Current QA

A fresh QA run is required for the latest `main` commit before current `main` is recorded as green. Earlier passing runs remain historical evidence tied to their exact source revision.

## Engineering status model

The Developer Console separates:

- BUILT
- FUNCTIONAL
- TESTED
- VALIDATED

GitHub workflow results are compared against the runtime source revision. A mismatched revision is displayed as `STALE` instead of current.

## 21-stage build

Current pipeline state remains:

- 14 implemented runtime foundations
- 4 conditional or intentionally not invoked
- 3 queued for deeper integration

The new `VoxVector/src/voxvector/stage_telemetry.py` utility provides real monotonic elapsed timing, UTC lifecycle timestamps, explicit running/completed/failed/not-run/pending states, outcomes, errors, deterministic snapshots, and lifecycle transition guards. The utility is built and regression-tested, but is not yet wired into every internal pipeline execution boundary. Existing case runs therefore do not gain retroactive fabricated per-stage timing.

## Console workflow

Current Developer Console capabilities include runtime health, case management, compatible WAV intake, upload diagnostics/progress, secure playback path, case-bound analysis, stage-state inspection, diagnostic logs/errors, GitHub-backed QA/deployment status, methodology navigation, MVP task tracking, and engineering traceability.

The Analysis Workspace includes the persisted run result review: eligibility, observations, evidence, candidate state, disposition, limitations, provenance, and stage state.

## Observability

The canonical diagnostic implementation retains immutable sanitized Storage records and projects operational data to the relational console surfaces. Case-specific source rejection/failure events are classified as diagnostic errors as well as lifecycle events.

Production relational-row proof remains an explicit verification gate.

## Hosting boundary

- public React frontend: GitHub Pages
- FastAPI analysis backend: Render
- authentication/persistence/diagnostics/private media: Supabase

Vercel is retired and prohibited for VoxVector.

## Scientific boundary

Software build, runtime execution, deployment, and QA do not establish scientific deception-detection validity. The validation program remains separate and task-specific.
