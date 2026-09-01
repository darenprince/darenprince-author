# VoxVector QA Status

**State date:** 2026-09-01

This document records repository-level software QA. It is not a scientific validation report.

## Current source and verification state

This feature slice is developed on `feature/devconsole-render-live-history` from the canonical `main` branch. A repository write is not a QA result. The branch must pass its GitHub Actions workflow before this slice is recorded as QA-green.

Latest previously verified code-affecting gate remains historical evidence only. The current feature branch requires a fresh backend test run and React production build.

The verified software suite establishes implementation behavior for the tested paths. It does not establish scientific deception-detection validity.

## Current QA coverage map

| Area | Coverage | Current status | Inferential claim |
|---|---|---|---|
| Acoustic | regression and dimensionality | implemented | none |
| Temporal | observation and boundary | implemented | none |
| Voice quality | boundary | implemented | none |
| Pulse and period | regression | implemented | none |
| MFCC and cepstral | regression and boundary | implemented | none |
| Formant candidates | boundary | implemented | none |
| Reliability | deterministic and non-finite controls | implemented | eligibility only |
| Evidence | grouping and convergence | implemented | neutral |
| Evidence acquisition | media profile, speech/silence timeline, provider states | implemented foundation | none |
| faster-whisper adapter | provider implementation, timestamp extraction, runtime events | implemented, provider-gated | none |
| pyannote Community-1 adapter | provider implementation, speaker turns, runtime events | implemented, provider-gated | none |
| Transcript/speaker alignment | timestamp overlap foundation | implemented + tested | none |
| Results envelope | identity, acquisition, explicit gaps, composed result shape | implemented + tested | none |
| Stage telemetry | timing, failure, non-execution states, transitions | implemented + tested | none |
| Analysis execution trace | request/trace/run correlation, lifecycle events, progress | implemented + tested | none |
| Case persistence | case/source/run storage and owner scoping | implemented | none |
| Live case run state | running → lifecycle updates → completed/failed persistence | implemented | none |
| Render API bridge | server-side service/deploy/instance/log read path | implemented, environment-gated | none |
| Classification | guarded boundary | controlled | no validated inference |
| Disposition | guarded boundary | controlled | no validated inference |
| Analysis Workspace | browser workflow | active implementation | none |
| Developer Console | case workflow, history, live run projection, Render surface | active implementation | none |

## Current integration state — 2026-09-01

The case-analysis path integrates acquisition artifacts and the canonical results envelope. Configured speech providers are selected lazily through the acquisition layer.

The case-analysis route now persists a run record before entering the measured analysis path, updates the case record as route-boundary stages progress, and persists a completed or failed final state. The console polls the selected case so the active run becomes visible while it is executing.

The current analytical engine remains composite. The internal engine has not yet gained callbacks for every canonical stage, so the Developer Console uses determinate completion counts only for persisted stage states and an explicit indeterminate activity treatment while the composite engine is executing.

The repository contains a server-side Render API bridge under `VoxVector/api/render_api.py`. The bridge is protected by the same Developer Console authentication boundary and reads `RENDER_API_KEY` and `RENDER_SERVICE_ID` from the API runtime environment. These values must be configured separately in Render; GitHub repository secrets are not automatically inherited by the Render process.

The repository workflow `.github/workflows/render-observability.yml` consumes the GitHub `RENDER_API_KEY` and `RENDER_SERVICE_ID` secrets for infrastructure inspection from GitHub Actions. It defaults to the repository service ID and supports a controlled manual override.

## Console UX QA targets

The feature branch adds:

- Case History page backed by the authenticated case list/retrieve routes;
- reopen behavior that retrieves an existing case without silently creating a new run;
- collapsible Step 01, Step 02, and Step 03 workbench sections;
- Expand All / Collapse All controls;
- sidebar vertical scrolling;
- route scroll reset to the top of the console main surface;
- human-readable status normalization for runs, tests, logs, and infrastructure;
- animated startup initialization progress after real API readiness;
- live Render Runtime service/deployment/log surface;
- live analysis run indicator and persisted stage progress.

Authenticated browser verification remains required for all of the above.

## Connected workflow QA

The intended MVP QA path remains:

1. case creation
2. source upload
3. provenance
4. decode
5. playback
6. acquisition
7. speaker processing
8. transcription
9. alignment
10. analytical tracks
11. evidence
12. assessment
13. report
14. history
15. reopen

The CI workflow verifies backend tests and the production frontend build. Browser-level authenticated verification remains separate.

## Current engineering gates

- fresh exact-commit GitHub Actions QA result for this feature branch
- speech-enabled provider smoke test in an isolated environment
- real model acquisition and execution verification
- pyannote model-access verification
- persisted transcript/speaker/alignment artifact verification
- real internal per-stage lifecycle telemetry verification
- authenticated Developer Console verification against real deployed case data
- authenticated Render API bridge verification after Render environment configuration
- signed playback verification
- case-history reopen verification
- mobile and keyboard verification
- reduced-motion verification
- API failure, timeout, and provider-unavailable verification
- Render CPU/memory benchmark for speech runtime
- deployment readback

## Scientific boundary

A passing software suite establishes implementation behavior only. Scientific validation remains separate and requires the validation program defined in `docs/VALIDATION.md`.

## Related records

- `docs/VERSION_MAP.md`
- `docs/METHOD_QA_MATRIX.md`
- `docs/VALIDATION.md`
- `docs/MVP_BUILD_PLAN.md`
- `docs/CURRENT_ENGINEERING_STATE_2026-08-30.md`
- `docs/PIPELINE_BUILD_STATUS.md`
- `docs/SPEECH_INTELLIGENCE_ENGINEERING.md`
- `docs/SPEECH_RUNTIME_DEPLOYMENT.md`
- `docs/RENDER_OBSERVABILITY.md`
- `docs/RENDER_GITHUB_ACTIONS_OBSERVABILITY.md`
- `docs/ENGINEERING_PLAN_2026-09-01.md`
- `docs/ENGINEERING_SYNC_2026-09-01.md`
