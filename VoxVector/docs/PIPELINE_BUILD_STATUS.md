# VoxVector 21 Stage Pipeline — Build Status

**Status date:** 2026-09-01

This document is an engineering status record, not a claim that every pipeline stage is currently implemented or scientifically validated.

## Current build matrix

| # | Stage | Current build state | Runtime state | QA state |
|---:|---|---|---|---|
| 01 | File Upload / Ingest | **implemented** | persisted case source intake | production executed on observed case path |
| 02 | File Decode and Normalization | **implemented** | PCM WAV decode and mono normalization | covered by API/runtime tests; production executed |
| 03 | Provenance and Integrity | **implemented** | SHA-256 source/run provenance | covered by case-store tests; production executed |
| 04 | Channel and Recording Assessment | **implemented** | sample rate, duration, peak, clipping profile | runtime exercised by pipeline; production executed |
| 05 | Speaker Identification / Diarization | **queued** | not executed by current case run | test plan required |
| 06 | Speech Segmentation | **implemented foundation** | deterministic energy/voicing segmentation | deterministic tests exist; production executed |
| 07 | Transcription Generation | **queued** | production transcription not attached | integration test required |
| 08 | Transcript Alignment | **queued** | transcript alignment not attached | integration test required |
| 09 | Eligibility and Reliability | **implemented** | recording eligibility/reliability result | covered by pipeline tests; production executed |
| 10 | Acoustic Feature Extraction | **implemented** | RMS, intensity, ZCR, centroid, spread, F0, harmonicity, MFCC and related observations | covered by acoustic/pipeline tests; production executed |
| 11 | Prosodic and Voice Quality Analysis | **implemented foundation** | F0/intensity dynamics and HNR | feature tests exist; scientific validation separate; production executed |
| 12 | Temporal and Pause Analysis | **implemented foundation** | pause topology and timing observations | feature tests exist; production executed |
| 13 | Linguistic and Disfluency Analysis | **conditional** | requires supplied transcript | unit tests exist; transcript integration required |
| 14 | Question / Answer Alignment | **conditional** | requires question/context boundaries | timing unit tests exist; product integration required |
| 15 | Within Speaker Baseline | **conditional** | requires independent baseline input | baseline unit tests exist |
| 16 | Cross Method Evidence Assembly | **implemented foundation** | normalized evidence records from observations | evidence tests exist; production executed |
| 17 | Evidence Convergence and Conflict | **implemented foundation** | evidence relationships and conflict/convergence structures | convergence tests exist; production result persisted |
| 18 | Candidate Classification | **implemented guarded foundation** | candidate remains indeterminate in current observational runtime | classification tests exist; production executed |
| 19 | Validation and Calibration Gate | **not invoked** | inferential validation gate is not executed by current run | validation harness is roadmap work |
| 20 | Final Classification / Disposition | **implemented guarded foundation** | current runtime returns indeterminate/insufficient-evidence disposition | disposition tests exist; production executed |
| 21 | Audit and Provenance Output | **implemented foundation** | run, stage, method, source and provenance records persisted | case-store/provenance coverage exists |

### Current count

- **14 stages have implemented runtime foundations**
- **4 stages are conditional or intentionally not invoked without required inputs**
- **3 stages remain queued for deeper runtime integration**
- **21 stages are represented in the canonical pipeline contract**

The 14 implemented foundations do not mean fourteen validated deception indicators. Individual measurements remain evidence only, and inferential capability requires a separate validation program.

## Stage telemetry foundation — 2026-09-01

Added `VoxVector/src/voxvector/stage_telemetry.py`, a persistence-neutral lifecycle recorder for the canonical 21-stage contract. It records real monotonic elapsed duration, UTC start/completion timestamps, explicit running/completed/failed/not-run/pending states, outcomes, and errors, and returns deterministic ordered snapshots suitable for case runs and diagnostic records.

Regression coverage was added in `VoxVector/tests/test_stage_telemetry.py` for successful timing, failure timing, explicit non-execution states, deterministic snapshot ordering, and invalid lifecycle transitions.

## Results envelope — 2026-09-01

Added `VoxVector/src/voxvector/results_envelope.py`, a pure composer for the documented post-analysis result contract. It preserves case/source/run identity, result schema, pipeline state, observations, evidence, candidate state, disposition, provenance, and explicit downstream capability gaps. Regression coverage was added in `VoxVector/tests/test_results_envelope.py`.

## Debug verification finding — 2026-09-01

Source inspection of the canonical `VoxVector/src/voxvector/pipeline.py` on `main` showed that the monolithic engine is still using its prior internal execution structure. The new telemetry recorder is not yet invoked at every internal stage boundary, and the composed result envelope is not yet the canonical HTTP response of the case-analysis route.

This means:

- the telemetry utility is **BUILT + TESTED**;
- the results envelope utility is **BUILT + TESTED**;
- actual end-to-end granular stage telemetry is **OPEN**;
- canonical API results-envelope delivery is **OPEN**;
- existing production runs must not be described as having granular internal stage timings that were never emitted.

This finding supersedes any earlier wording that implied those integrations were complete.

## Console engineering status surface

The authenticated Developer Console includes an operator-facing **Engineering Status** surface supplied by `voxvector/src/components/DeveloperEngineeringStatus.jsx`.

It explicitly separates:

- **BUILT** — implementation/build state;
- **FUNCTIONAL** — runtime workflow state;
- **TESTED** — actual current test evidence;
- **VALIDATED** — scientific or operational validation state.

The surface also exposes the current engineering stage, next dependency, source revision, a QA checklist, and GitHub source traceability with open and copy controls.

## Current engineering stage

**Post-analysis Results / Review Evidence** is the current engineering stage following the successful production case execution through source intake, persistence, case-bound analysis, and analysis completion.

**Next dependency:** wire telemetry into the real internal pipeline stage boundaries, connect the composed result envelope to the case-analysis response, and persist both under the existing case/run identity.

After that, the immediate dependency chain is:

**evidence explorer → speaker/transcript foundation → alignment → synthesis/assessment/reporting → browser verification → validation.**

## Verification boundary

A successful build means the software compiled and tests that actually ran passed. It is not scientific validation.

A successful upload means the source was accepted and persisted. It is not evidence that the recording contains reliable deception indicators.

A completed pipeline run means the configured software stages executed. It is not proof that any individual vocal feature proves deception.

## 2026-09-01 production milestone

A real production case completed the connected operational path through source upload, private media persistence, case-bound analysis, and analysis completion. During the successful run, `/health`, `/v1/cases`, and `/v1/cases/{case_id}` returned `200 OK`, and valid `VOXVECTOR_DIAGNOSTIC` records were emitted.

This execution upgrades the operational status of Stages 01–04, 09, 10–12, 16–18, 20–21 from merely source-present to **production executed for the configured case path**, without changing their scientific validation status.

The 21-stage counts remain unchanged because production execution of one configured path does not make queued, conditional, or not-invoked stages implemented.

## 2026-09-01 observability repair

Production logs isolated the Developer Console log persistence defect to `public.api_request_logs.duration_ms`, whose integer schema rejected fractional diagnostic timings such as `9339.07`, `0.26`, `635.3`, and `597.92` milliseconds.

`VoxVector/api/observability.py` now normalizes relational duration values at the projection boundary while preserving fractional precision in immutable diagnostic Storage records. `VoxVector/tests/test_observability.py` covers decimal, string, zero/sub-millisecond, null, and invalid inputs.

The next engineering target is therefore **full internal stage-boundary instrumentation plus canonical case-analysis results-envelope delivery**, with the completed Analysis Results / Review Evidence surface remaining the operator-facing destination for the resulting audit record.

## API integration update — 2026-09-01

The case-analysis API now composes and persists the canonical `result_envelope` under the existing case/run identity and returns it directly from the analysis response.

Route-boundary telemetry now records independently measured timing for:

- Stage 02 File Decode and Normalization
- Stage 03 Provenance and Integrity
- Stage 04 Channel and Recording Assessment

Stage 01 preserves its prior persisted-source lifecycle evidence without fabricating a new analysis-time duration.

The current monolithic `VoxVectorPipeline` still does not expose independently timed callbacks for every internal analytical boundary. Those stages therefore remain explicitly marked as completed inside the composite pipeline with `duration_ms: null` rather than receiving fabricated per-stage durations.

The run now records `pipeline_duration_ms` separately from route-boundary stage telemetry and declares its telemetry scope. Full internal callback instrumentation remains an open engineering task.
