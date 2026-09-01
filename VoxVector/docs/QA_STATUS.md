# VoxVector QA Status

**State date:** 2026-09-01

This document records repository-level software QA. It is not a scientific validation report.

## Current source and verification state

The current canonical `main` commit is:

`2a57cffd769dc0516f9f8511283c9bd57d51a683`

The latest verified QA result is `VoxVector QA` run `33505148274` on the immediately preceding implementation revision `5c88299679515604bfb9c0903c48b2b95650e6aa`. Its test job `99847332204` passed API package installation, the VoxVector API test suite, React dependency installation, and the React production build.

A fresh `VoxVector QA` run `33505471299` is currently executing against `2a57cffd769dc0516f9f8511283c9bd57d51a683`. Therefore the current `main` revision is **not yet recorded as QA-green**. The repository must use the exact-commit workflow result as the authoritative gate.

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
| Results envelope | identity, explicit gaps, composed result shape | implemented + tested | none |
| Stage telemetry | timing, failure, non-execution states, transitions | implemented + tested | none |
| Classification | guarded boundary | controlled | no validated inference |
| Disposition | guarded boundary | controlled | no validated inference |
| Speaker diarization | integration coverage | planned / queued | none |
| Transcription | integration coverage | planned / queued | none |
| Alignment | integration coverage | planned / queued | none |
| Analysis Workspace | browser workflow | active implementation | none |
| Developer Console | connected workflow foundation | implemented | none |

## Debug finding — 2026-09-01

Source inspection of the canonical `VoxVector/src/voxvector/pipeline.py` found that the newly added `StageTelemetry` utility is not yet wired into each internal analytical boundary of the monolithic pipeline. The pipeline therefore does not currently produce a trustworthy independently timed record for every implemented stage.

The `VoxVector/src/voxvector/results_envelope.py` composer is present and regression-tested, but the case-analysis HTTP route does not yet return it as the canonical response envelope.

These are implementation gaps, not QA failures. The correct status is:

- telemetry utility: **BUILT + TESTED**;
- results envelope utility: **BUILT + TESTED**;
- full internal stage telemetry integration: **OPEN**;
- case-analysis results-envelope integration: **OPEN**;
- end-to-end persistence of granular stage timing: **NOT VERIFIED**.

No production run should be credited with granular stage timings that the runtime did not emit.

## Connected workflow QA

The intended MVP QA path remains:

1. case creation
2. source upload
3. provenance
4. decode
5. playback
6. waveform
7. pipeline lifecycle
8. speaker processing
9. transcription
10. alignment
11. analytical tracks
12. evidence
13. assessment
14. report
15. history
16. reopen

The CI workflow verifies backend tests and the production frontend build. Browser-level authenticated verification remains a separate requirement.

## Current engineering gates

- exact-commit QA result for current `main`
- authenticated browser Analysis Workspace verification
- signed playback verification
- real internal per-stage lifecycle telemetry verification
- canonical composed results-envelope response verification
- Developer Console diagnostics verification against real deployed data
- mobile and keyboard verification
- reduced-motion verification
- API failure, timeout, and cancellation verification
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
- `docs/DOCS_ALIGNMENT_2026-09-01.md`
