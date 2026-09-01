# VoxVector 21 Stage Pipeline — Build Status

**Status date:** 2026-09-01

This document is an engineering status record, not a claim that every pipeline stage is currently implemented or scientifically validated.

## Current build matrix

| # | Stage | Current build state | Runtime state | QA state |
|---:|---|---|---|---|
| 01 | File Upload / Ingest | **implemented** | persisted case source intake | production executed on observed case path |
| 02 | File Decode and Normalization | **implemented** | PCM WAV decode and mono normalization; persisted run boundary | covered by API/runtime tests; production executed |
| 03 | Provenance and Integrity | **implemented** | SHA-256 source verification; persisted run boundary | covered by case-store tests; production executed |
| 04 | Channel and Recording Assessment | **implemented** | sample rate, duration, peak, clipping profile; persisted run boundary | runtime exercised by pipeline; production executed |
| 05 | Speaker Identification / Diarization | **queued** | provider adapter implemented; production provider execution pending | contract tests; model execution required |
| 06 | Speech Segmentation | **implemented foundation** | deterministic energy/voicing segmentation | deterministic tests exist; production executed |
| 07 | Transcription Generation | **queued** | provider adapter implemented; production transcription execution pending | contract tests; model execution required |
| 08 | Transcript Alignment | **foundation implemented** | transcript-to-speaker timestamp overlap alignment | regression tests exist; provider-backed execution pending |
| 09 | Eligibility and Reliability | **implemented** | recording eligibility/reliability result | covered by pipeline tests; production executed |
| 10 | Acoustic Feature Extraction | **implemented** | RMS, intensity, ZCR, centroid, spread, F0, harmonicity, MFCC and related observations | covered by acoustic/pipeline tests; production executed |
| 11 | Prosodic and Voice Quality Analysis | **implemented foundation** | F0/intensity dynamics and HNR | feature tests exist; scientific validation separate; production executed |
| 12 | Temporal and Pause Analysis | **implemented foundation** | pause topology and timing observations | feature tests exist; production executed |
| 13 | Linguistic and Disfluency Analysis | **conditional** | requires transcript | unit tests exist; provider-backed transcript integration required |
| 14 | Question / Answer Alignment | **conditional** | requires question/context boundaries | timing unit tests exist; product integration required |
| 15 | Within Speaker Baseline | **conditional** | requires independent baseline input | baseline unit tests exist |
| 16 | Cross Method Evidence Assembly | **implemented foundation** | normalized evidence records from observations | evidence tests exist; production executed |
| 17 | Evidence Convergence and Conflict | **implemented foundation** | evidence relationships and conflict/convergence structures | convergence tests exist; production result persisted |
| 18 | Candidate Classification | **implemented guarded foundation** | candidate remains indeterminate in current observational runtime | classification tests exist; production executed |
| 19 | Validation and Calibration Gate | **not invoked** | inferential validation gate is not executed by current run | validation harness is roadmap work |
| 20 | Final Classification / Disposition | **implemented guarded foundation** | current runtime returns indeterminate/insufficient-evidence disposition | disposition tests exist; production executed |
| 21 | Audit and Provenance Output | **implemented foundation** | run, stage, method, source and provenance records persisted | case-store/provenance coverage exists |

### Current maturity count

- **14 stages have implemented analytical/runtime foundations**
- **4 stages remain conditional or intentionally not invoked without required inputs**
- **3 stages remain queued for deeper production integration**
- **Speech-intelligence adapters are built, but provider execution remains deployment-gated**
- **21 stages remain represented in the canonical pipeline contract**

The maturity count does not mean fourteen validated deception indicators. Individual measurements remain evidence only, and inferential capability requires a separate validation program.

## Evidence acquisition pipeline — 2026-09-01

The canonical acquisition layer now provides a normalized media profile, speech/silence timeline, transcript and diarization provider contracts, provider selection, transcript-to-speaker alignment, and a multimodal timeline artifact.

The supported provider architecture is:

- transcription: faster-whisper
- speaker diarization: pyannote Community-1
- alignment: VoxVector-owned timestamp overlap layer

Heavy speech ML dependencies are optional and are intentionally excluded from the default runtime package. Provider execution activates only when the corresponding environment configuration and model/runtime requirements are present.

faster-whisper documents word-level timestamps and integrated VAD support.

pyannote Community-1 requires acceptance of model conditions and a Hugging Face token for model access.

## Stage telemetry foundation — 2026-09-01

Added `VoxVector/src/voxvector/stage_telemetry.py`, a persistence-neutral lifecycle recorder for the canonical 21-stage contract. It records real monotonic elapsed duration, UTC start/completion timestamps, explicit running/completed/failed/not-run/pending states, outcomes, and errors, and returns deterministic ordered snapshots suitable for case runs and diagnostic records.

## Live case-run lifecycle — 2026-09-01

The case-analysis API now persists a `running` run record before the main analysis call. The record is updated after the actual route-boundary stages for decode, provenance, and recording assessment, with `current_stage` and completed-stage counts available to the console during execution.

When the composite analytical engine completes, the live record is replaced by the final persisted run with its canonical result, acquisition artifact, result envelope, and explicit pending/not-run states for unavailable downstream inputs. On failure, a failed run record is attempted so the case history retains the failure state and sanitized error metadata.

The current composite engine remains only partially internally instrumented. The live console therefore shows real persisted state plus an indeterminate activity indicator during composite execution rather than fabricating durations for internal stages.

## Route telemetry and result envelope — 2026-09-01

The case-analysis API measures route-boundary stages 02–04, persists the composed `result_envelope`, and returns the composed envelope directly. The monolithic internal pipeline remains only partially instrumented; stages without real callbacks retain null independent durations.

## Render infrastructure bridge — 2026-09-01

The Developer Console exposes server-side Render status and recent log observations through authenticated developer routes. The repository Actions workflow separately gathers Render service, deployment, and log artifacts using `RENDER_API_KEY` and `RENDER_SERVICE_ID` GitHub secrets.

GitHub repository secrets do not automatically enter the Render service environment. The Render process must separately receive protected `RENDER_API_KEY` and `RENDER_SERVICE_ID` variables for the in-console bridge to authenticate successfully.

## Current engineering stage

**Evidence acquisition, runtime observability, and live case workflow.**

The correct dependency order remains:

**media extraction → speech segmentation → speaker diarization → transcription → timestamp normalization → transcript/audio alignment → multimodal evidence → downstream analysis.**

Telemetry instruments those real engines rather than substituting for them.

## Verification boundary

A successful build means the software compiled and tests that actually ran passed. It is not scientific validation.

A successful provider adapter test does not establish model quality.

A successful transcription output does not establish truthfulness of the transcript.

Speaker cluster labels are not verified identities.

A completed analysis run does not prove any individual vocal feature proves deception.

## Current next steps

1. Execute faster-whisper in an isolated speech-enabled runtime and verify real transcript segments and word timestamps.
2. Execute pyannote Community-1 in an isolated runtime with required model access and verify speaker segments.
3. Persist normalized transcript, speaker, and multimodal alignment artifacts under case/run identity.
4. Feed acquired transcript data into linguistic/disfluency analysis.
5. Add speaker-aware acoustic aggregation and baseline inputs.
6. Add question/answer context ingestion and interaction timing.
7. Instrument the canonical internal pipeline boundaries where real method boundaries exist.
8. Verify Developer Console Render bridge after protected Render environment configuration.
9. Verify Case History reopen and live run polling against a deployed case.
10. Complete authenticated browser/mobile verification.
11. Begin scientific evaluation only after engineering evidence is stable.
