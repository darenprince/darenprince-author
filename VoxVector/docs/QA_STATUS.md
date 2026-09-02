# VoxVector QA Status

**State date:** 2026-09-02

This document records repository-level software QA. It is not a scientific validation report.

## Current source and verification state

This audit and repair slice is developed from the canonical `main` branch on `fix/voxvector-observability-console-audit`. A repository write is not a QA result. The repair branch requires a fresh GitHub Actions backend test run and React production build before it is recorded as QA-green.

The supplied QA artifact for the preceding runtime slice reported **127 passed and 1 failed**. The failure was `tests/test_observability.py::test_diagnostic_store_survives_storage_failure`, where `storage_result` could be returned after a storage exception without being initialized. The canonical diagnostic store has been repaired to initialize the result before the persistence boundary and return safely after storage failure.

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

## Console UX QA targets

The current console implementation includes:

- Case History backed by authenticated case persistence;
- reopen behavior that retrieves an existing case without silently creating a new run;
- independently collapsible Case, Upload, and Analysis workbench sections;
- Expand All / Collapse All controls;
- dedicated desktop sidebar scrolling;
- console route scroll reset;
- human-readable status normalization;
- state-derived startup readiness with animated indeterminate active bars;
- live Render Runtime service/deployment/log inspection;
- live case run polling and persisted stage-state projection.

Authenticated browser verification remains required for these behaviors.

## Render configuration

The VoxVector Render service is intended to receive `RENDER_API_KEY` and `RENDER_SERVICE_ID` as server-side environment variables. The browser never receives the Render credential. GitHub Actions independently consumes repository secrets with those names for infrastructure inspection.

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

- fresh exact-commit GitHub Actions QA result for the repair branch
- authenticated Render API bridge verification on the deployed service
- authenticated browser verification of Developer Console startup, navigation, case history, and Render Runtime
- real speech-provider execution and resource profiling
- persisted transcript/speaker/alignment artifact verification
- real internal per-stage lifecycle telemetry verification
- mobile and keyboard verification
- reduced-motion verification
- API failure, timeout, and provider-unavailable verification
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
- `docs/CONSOLE_ENGINEERING_STATUS_2026-09-02.md`
- `docs/ENGINEERING_AUDIT_2026-09-02.md`
