# VoxVector QA Status

**State date:** 2026-09-01

This document records repository-level software QA. It is not a scientific validation report.

## Current source and verification state

The current canonical `main` revision is documentation synchronization following the latest code-affecting integration commits.

The latest verified code-affecting QA gate is `VoxVector QA` run `33505986385` on commit `661377afed8b5493b62bd7f13121f53f45895d6a`. The run completed successfully.

The immediately preceding API integration commit `c2307293789124be29b6c8d7a0c7df7234f82776` also passed `VoxVector QA` run `33505919157`.

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

## Integration update — 2026-09-01

The canonical case-analysis route now returns and persists the composed results envelope and records independently measured route-boundary timing for decode/normalization, provenance/integrity, and recording assessment.

The monolithic pipeline remains only partially instrumented internally. Internal analytical stages without emitted callbacks continue to report no independent duration rather than fabricated timing.

The exact current commit remains subject to the GitHub Actions QA gate after each source revision.
