# VoxVector 21 Stage Pipeline — Build Status

**Living engineering status**

This record describes engineering maturity. It does not claim every stage is production-verified or scientifically validated.

## Canonical build matrix

| # | Stage | Current build state | Current evidence / remaining boundary |
|---:|---|---|---|
| 01 | File Upload / Ingest | **implemented** | persisted case-source intake; intermittent authenticated pre-handler 400 remains #930 |
| 02 | File Decode and Normalization | **implemented** | source/tests and historical controlled execution |
| 03 | Provenance and Integrity | **implemented** | SHA-256/source persistence and case-store coverage |
| 04 | Channel and Recording Assessment | **implemented** | source/tests and historical controlled execution |
| 05 | Speech Segmentation | **implemented foundation** | deterministic segmentation; historical controlled run completed 26 segments |
| 06 | Speaker Identification / Diarization | **cloud-primary provider path built** | pyannoteAI architecture wired; real current execution and persisted speaker artifact remain #970 |
| 07 | Transcription Generation | **implemented integration** | historical real faster-whisper beam-1 execution; current controlled repeatability remains #941 |
| 08 | Transcript Alignment | **implemented synchronized foundation** | historical alignment state exists; persisted transcript/audio/speaker proof remains #971 |
| 09 | Eligibility and Reliability | **implemented** | analytical eligibility/reliability; separate from operational memory admission |
| 10 | Acoustic Feature Extraction | **implemented with bounded admission foundation** | source safety merged; controlled production proof remains #941 |
| 11 | Prosodic and Voice Quality Analysis | **implemented foundation** | F0/intensity dynamics and HNR; validation separate |
| 12 | Temporal and Pause Analysis | **implemented foundation** | pause topology/timing observations; validation separate |
| 13 | Linguistic and Disfluency Analysis | **conditional** | requires available persisted transcript evidence |
| 14 | Question / Answer Alignment | **conditional** | requires question/context boundaries |
| 15 | Within Speaker Baseline | **conditional** | requires independent baseline input |
| 16 | Cross Method Evidence Assembly | **implemented foundation** | normalized evidence structures after dependencies resolve |
| 17 | Evidence Convergence and Conflict | **implemented foundation** | convergence/conflict structures and tests |
| 18 | Candidate Classification | **implemented guarded foundation** | current observational path remains guarded/indeterminate |
| 19 | Validation and Calibration Gate | **not invoked** | requires scientific validation program and authorization |
| 20 | Final Classification / Disposition | **implemented guarded foundation** | guarded disposition architecture |
| 21 | Audit and Provenance Output | **implemented foundation** | run/stage/method/source/provenance and failure/report foundations |

## Maturity summary

- approximately **16 stages** have implemented analytical/runtime foundations;
- **4 stages** are conditional or intentionally not invoked without required inputs/authorization;
- Stage 06 current cloud-primary execution/persistence remains unproven;
- Stage 07 has historical real provider execution but not current same-revision repeatability proof;
- the canonical contract remains **21 stages**;
- the maturity count is not a count of scientifically validated deception indicators.

## Frontend projection — merged

The prior Stage 05/06 order and stale Stage 07/08 fallback problem is fixed in current `main` through merged PR #993.

Current frontend behavior:

- Stage 05 = Speech Segmentation;
- Stage 06 = Speaker Identification / Diarization;
- `PipelineBuildCard.jsx` prefers backend `pipeline_build.status_by_stage` for mutable stage status;
- static source data is only a contract-matching fallback when backend data is unavailable;
- loading/offline fallback is explicit;
- Stage 07/08 are not hard-coded as obsolete queued work when backend source reports implemented foundations;
- backend readiness does not get relabeled as provider execution;
- no duplicate pipeline component or second status owner was introduced.

The 2026-09-12 reconciliation baseline was `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80`; exact-baseline VoxVector QA run `34679916767` succeeded.

Authenticated desktop/mobile rendered acceptance of the pipeline surface remains separate from source/CI acceptance.

## Runtime and durability contract

The canonical heavy-analysis order is:

`provider completion → provider cleanup → durable upstream checkpoint → Stage 10 route preflight → fail-fast shared Stage 10 admission + locked RSS recheck → downstream composite analysis`

Source foundations include:

- no PyTorch import solely for cleanup on the constrained CPU faster-whisper path;
- upstream provider/transcript/alignment checkpoint before downstream heavy work;
- operational Stage 10 memory admission before running state;
- fail-fast process-wide single-flight admission;
- stable persisted route-owned `run_id` and separate `pipeline_run_id`;
- separate Python process and hosting-instance provenance.

#941 remains the controlled production proof gate for those behaviors.

## Provider sequence

1. persisted source intake
2. decode/integrity/channel assessment
3. speech segmentation
4. speaker diarization when enabled/ready
5. transcription generation when ready
6. timestamp normalization/alignment
7. durable upstream checkpoint
8. operational Stage 10 memory admission
9. acoustic/prosodic/temporal analysis
10. transcript-derived analysis when evidence exists
11. evidence assembly/convergence/conflict
12. guarded candidate classification
13. validation/calibration only when authorized
14. guarded disposition and audit/provenance persistence

## Current release path

1. #941 controlled current-revision transcription/durability/Stage 10 proof
2. #970 real cloud-primary diarization and persisted speaker evidence
3. #971 persisted transcript/audio/speaker alignment
4. #963 historical-case artifact rehydration
5. #930 upload reliability bounding
6. #959 production observability/debug-bundle acceptance
7. authenticated desktop/mobile acceptance for already-merged frontend/auth work
8. #972 two complete golden cases on one frozen revision/configuration
9. scientific validation separately

## Verification boundary

Configuration is not execution. Execution is not persistence. Persistence is not browser verification. Engineering repeatability is not scientific validation.
