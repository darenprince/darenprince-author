# VoxVector QA Status

**State date:** 2026-09-01

This document records repository-level software QA. It is not a scientific validation report.

## Current verified QA evidence

The current canonical `main` commit is:

`5c88299679515604bfb9c0903c48b2b95650e6aa`

GitHub Actions `VoxVector QA` run `33505148274` completed successfully on this commit. Its test job `99847332204` completed API package installation, the VoxVector API test suite, React dependency installation, and the React production build. No listed test/build step was skipped. This verifies the current source revision rather than relying on an older passing commit. 

The QA run also validates the newly added results-envelope and telemetry test modules because they are included in the API test suite for this revision.

A successful QA workflow establishes software execution behavior for the tested paths. It does not establish scientific deception-detection validity.

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

The current CI workflow verifies backend tests and the production frontend build. Browser-level authenticated verification remains a separate requirement.

## Current engineering gate

The next QA gates are not another generic repository build. They are:

- authenticated browser Analysis Workspace verification
- signed playback verification
- actual internal per-stage lifecycle telemetry verification
- Developer Console diagnostics verification against real deployed data
- production validation that composed result envelopes are returned through the case-analysis API
- mobile and keyboard verification
- reduced-motion verification
- API failure, timeout, and cancellation verification
- deployment readback

## Debug finding — 2026-09-01

The new `StageTelemetry` utility and `results_envelope` module are present and covered by the current API test suite, but source inspection of `VoxVector/src/voxvector/pipeline.py` showed that the canonical monolithic pipeline still uses its prior internal execution structure and does not yet emit `StageTelemetry` callbacks at every internal boundary.

This is a real implementation gap and is intentionally tracked as open work. The QA result therefore proves the telemetry and result-envelope utilities are healthy in isolation; it does not prove end-to-end persistence of per-stage telemetry or API delivery of the composed result envelope.

No documentation or status surface should represent those two integrations as complete until they are wired and exercised.

## Scientific boundary

A passing software suite establishes implementation behavior only. Scientific validation remains separate and requires the validation program defined in `docs/VALIDATION.md`.

## Related records

- `docs/VERSION_MAP.md`
- `docs/METHOD_QA_MATRIX.md`
- `docs/VALIDATION.md`
- `docs/MVP_BUILD_PLAN.md`
- `docs/CURRENT_ENGINEERING_STATE_2026-08-30.md`
- `docs/DOCS_ALIGNMENT_2026-09-01.md`
