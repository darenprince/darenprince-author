# VoxVector QA Status

This document records repository level software QA.

It is not a scientific validation report.

## Latest verified QA evidence

The latest explicitly observed workflow evidence in the repository records is not a green run on the current main commit.

The documented run `32212539187` checked out commit `b66551897170b035dd8b2ca7c3d843d18124d00f` and failed.

That run reported 72 passed and 11 failed before the repository advanced with subsequent repairs.

A later uploaded QA record established that the backend suite reached 91 passed before the React dependency installation failure.

The dependency repair aligned React with Tremor and advanced the frontend QA runtime.

A fresh workflow run on the current main commit is still required before the current repository state is recorded as green.

## Current QA coverage map

| Area | Coverage | Current status | Inferential claim |
|---|---|---|---|
| Acoustic | regression and dimensionality | implemented | none |
| Temporal | observation and boundary | implemented | none |
| Voice quality | boundary | implemented | none |
| Pulse and period | regression | implemented | none |
| MFCC and cepstral | regression and boundary | implemented | none |
| Formant candidates | boundary | implemented | none |
| Reliability | deterministic and non finite controls | implemented | eligibility only |
| Evidence | grouping and convergence | implemented | neutral |
| Classification | guarded boundary | controlled | no validated inference |
| Disposition | guarded boundary | controlled | no validated inference |
| Speaker diarization | integration coverage | planned | none |
| Transcription | integration coverage | planned | none |
| Alignment | integration coverage | planned | none |
| Analysis Workspace | browser workflow | active implementation | none |
| Developer Console | browser workflow | implemented foundation | none |

## Connected workflow QA

The MVP QA path must cover:

1. case creation
2. upload
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

## Verification rule

A configured workflow is not evidence of a passing run.

A passing software suite establishes implementation behavior only.

Scientific validation remains a separate program.

## Current verification requirements

- fresh current commit CI run
- backend regression suite
- frontend production build
- browser Analysis Workspace verification
- Developer Console verification
- API failure verification
- upload cancellation verification
- mobile verification
- keyboard verification
- reduced motion verification
- deployment readback

## Related records

- `docs/VERSION_MAP.md`
- `docs/METHOD_QA_MATRIX.md`
- `docs/VALIDATION.md`
- `docs/MVP_BUILD_PLAN.md`
- `docs/DOCS_ALIGNMENT_2026-08-20.md`
