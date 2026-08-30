# VoxVector 21 Stage Pipeline — Build Status

**Status date:** 2026-08-30

This document is an engineering status record, not a claim that every pipeline stage is currently implemented or scientifically validated.

## Current build matrix

| # | Stage | Current build state | Runtime state | QA state |
|---:|---|---|---|---|
| 01 | File Upload / Ingest | **implemented** | persisted case source intake | upload contract hardening in progress |
| 02 | File Decode and Normalization | **implemented** | PCM WAV decode and mono normalization | covered by existing API/runtime tests |
| 03 | Provenance and Integrity | **implemented** | SHA-256 source/run provenance | covered by case-store tests |
| 04 | Channel and Recording Assessment | **implemented** | sample rate, duration, peak, clipping profile | runtime exercised by pipeline |
| 05 | Speaker Identification / Diarization | **queued** | not executed by current case run | test plan required |
| 06 | Speech Segmentation | **implemented foundation** | deterministic energy/voicing segmentation | deterministic tests exist |
| 07 | Transcription Generation | **queued** | production transcription not attached | integration test required |
| 08 | Transcript Alignment | **queued** | transcript alignment not attached | integration test required |
| 09 | Eligibility and Reliability | **implemented** | recording eligibility/reliability result | covered by pipeline tests |
| 10 | Acoustic Feature Extraction | **implemented** | RMS, intensity, ZCR, centroid, spread, F0, harmonicity, MFCC and related observations | covered by acoustic/pipeline tests |
| 11 | Prosodic and Voice Quality Analysis | **implemented foundation** | F0/intensity dynamics and HNR | feature tests exist; scientific validation separate |
| 12 | Temporal and Pause Analysis | **implemented foundation** | pause topology and timing observations | feature tests exist |
| 13 | Linguistic and Disfluency Analysis | **conditional** | requires supplied transcript | unit tests exist; transcript integration required |
| 14 | Question / Answer Alignment | **conditional** | requires question/context boundaries | timing unit tests exist; product integration required |
| 15 | Within Speaker Baseline | **conditional** | requires independent baseline input | baseline unit tests exist |
| 16 | Cross Method Evidence Assembly | **implemented foundation** | normalized evidence records from observations | evidence tests exist |
| 17 | Evidence Convergence and Conflict | **implemented foundation** | evidence relationships and conflict/convergence structures | convergence tests exist |
| 18 | Candidate Classification | **implemented guarded foundation** | candidate remains indeterminate in current observational runtime | classification tests exist |
| 19 | Validation and Calibration Gate | **not invoked** | inferential validation gate is not executed by current run | validation harness is roadmap work |
| 20 | Final Classification / Disposition | **implemented guarded foundation** | current runtime returns indeterminate/insufficient-evidence disposition | disposition tests exist |
| 21 | Audit and Provenance Output | **implemented foundation** | run, stage, method, source and provenance records persisted | case-store/provenance coverage exists |

### Current count

- **14 stages have implemented runtime foundations**
- **4 stages are conditional or intentionally not invoked without required inputs**
- **3 stages remain queued for deeper runtime integration**
- **21 stages are represented in the canonical pipeline contract**

The 14 implemented foundations do not mean fourteen validated deception indicators. Individual measurements remain evidence only, and inferential capability requires a separate validation program.

## Console engineering status surface

The authenticated Developer Console now includes an operator-facing **Engineering Status** surface supplied by `voxvector/src/components/DeveloperEngineeringStatus.jsx`.

It explicitly separates:

- **BUILT** — implementation/build state;
- **FUNCTIONAL** — runtime workflow state;
- **TESTED** — actual current test evidence;
- **VALIDATED** — scientific or operational validation state.

The surface also exposes the current engineering stage, next dependency, source revision, a QA checklist, and GitHub source traceability with open and copy controls.

The status panel reads the canonical `/health` response for runtime and pipeline information. It intentionally reports authenticated browser workflow checks as **UNVERIFIED** until those workflows are actually exercised.

## Dashboard representation

The Developer Console dashboard must remain an operator projection of this canonical document. The status surface is not an independent source of truth and must never turn source existence or build success into a functionality or validation claim.

## Current engineering stage

**Upload and intake reliability** is the current engineering stage because downstream case workflow reliability depends on successful source acceptance, persistence, retrieval, and playback.

**Next dependency:** stage telemetry and real per-stage lifecycle reporting.

After that, the immediate dependency chain is:

**speaker and transcript foundation → evidence workspace → validation and calibration gate.**

## Verification boundary

A successful build means the software compiled and tests that actually ran passed. It is not scientific validation.

A successful upload means the source was accepted and persisted. It is not evidence that the recording contains reliable deception indicators.

A completed pipeline run means the configured software stages executed. It is not proof that any individual vocal feature proves deception.
