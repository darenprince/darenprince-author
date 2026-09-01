# VoxVector QA Status

**State date:** 2026-09-01

This document records repository-level software QA. It is not a scientific validation report.

## Current source and verification state

The current `main` revision contains speech-intelligence provider, acquisition, and observability changes after the latest verified code gate. The exact current revision must pass its own GitHub Actions workflow before it can be recorded as QA-green.

Latest previously verified code-affecting gate: `VoxVector QA` run `33505986385` on commit `661377afed8b5493b62bd7f13121f53f45895d6a`. That run completed successfully.

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
| faster-whisper adapter | provider implementation, timestamp extraction, Render-visible progress | implemented, provider-gated | none |
| pyannote Community-1 adapter | provider implementation, speaker turns, Render-visible progress | implemented, provider-gated | none |
| Transcript/speaker alignment | timestamp overlap foundation | implemented + tested | none |
| Results envelope | identity, acquisition, explicit gaps, composed result shape | implemented + tested | none |
| Stage telemetry | timing, failure, non-execution states, transitions | implemented + tested | none |
| Analysis execution trace | request/trace/run correlation, lifecycle events, progress | implemented + tested | none |
| Classification | guarded boundary | controlled | no validated inference |
| Disposition | guarded boundary | controlled | no validated inference |
| Analysis Workspace | browser workflow | active implementation | none |
| Developer Console | connected workflow + speech runtime readiness | implemented | none |

## Current integration state — 2026-09-01

The case-analysis path integrates the acquisition artifact and canonical results envelope. Configured speech providers are selected lazily through the acquisition layer.

Default deployments with no provider configuration remain functional and explicitly report `not_configured` states. When a speech-enabled runtime is configured, the acquisition layer can invoke the faster-whisper transcription adapter and pyannote diarization adapter.

The provider adapters now emit structured `VOXVECTOR_SPEECH` stdout events for model loading, start, progress, completion, and failure. These logs are directly visible to Render Live Tail and can be correlated with request and trace identifiers.

The repository also includes `VoxVector/scripts/render-observe.sh` and `VoxVector/docs/RENDER_OBSERVABILITY.md` for repeatable Render CLI debugging and centralized log-stream operations.

The current repository contains provider integration code and contract tests, but production model execution and target-condition evaluation are not yet verified.

## Internal telemetry boundary

The route now measures decode/normalization, provenance/integrity, and recording assessment independently. The monolithic analytical engine still does not expose callbacks for every internal method family, so those composite stages must not be assigned fabricated durations.

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

The CI workflow verifies backend tests and the production frontend build. Browser-level authenticated verification remains a separate requirement.

## Current engineering gates

- exact-commit QA result for current `main`
- speech-enabled provider smoke test in an isolated environment
- real model acquisition and execution verification
- pyannote model-access verification
- persisted transcript/speaker/alignment artifact verification
- real internal per-stage lifecycle telemetry verification
- Developer Console diagnostics verification against real deployed data
- authenticated browser Analysis Workspace verification
- signed playback verification
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
- `docs/DOCS_ALIGNMENT_2026-09-01.md`
