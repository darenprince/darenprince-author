# VoxVector Pipeline Build Status

**Crown Labs executive/product mirror**

Canonical technical owner: `VoxVector/docs/PIPELINE_BUILD_STATUS.md`.

## Current maturity

- Canonical contract: **21 stages**
- Implemented analytical/runtime foundations: approximately **16**
- Conditional or intentionally not-invoked stages: **4**
- Current cloud-primary speaker execution/persistence: **open**
- Historical faster-whisper execution: **proven on an older controlled run**
- Current same-revision transcription/durability/Stage 10 proof: **open**
- Scientific validation: **separate program; not implied by engineering maturity**

## Canonical order

1. File Upload / Ingest
2. File Decode and Normalization
3. Provenance and Integrity
4. Channel and Recording Assessment
5. Speech Segmentation
6. Speaker Identification / Diarization
7. Transcription Generation
8. Transcript Alignment
9. Eligibility and Reliability
10. Acoustic Feature Extraction
11. Prosodic and Voice Quality Analysis
12. Temporal and Pause Analysis
13. Linguistic and Disfluency Analysis
14. Question / Answer Alignment
15. Within Speaker Baseline
16. Cross Method Evidence Assembly
17. Evidence Convergence and Conflict
18. Candidate Classification
19. Validation and Calibration Gate
20. Final Classification / Disposition
21. Audit and Provenance Output

## Frontend status projection

The source correction previously tracked as PR #993 is **merged**.

The existing Developer Console pipeline component now:

- uses the canonical Stage 05 Speech Segmentation → Stage 06 Speaker Identification / Diarization order;
- prefers backend `pipeline_build.status_by_stage` for mutable stage state;
- presents explicit loading/offline fallback state;
- does not hard-code Stage 07/08 as obsolete queued work when backend source reports implemented foundations;
- keeps provider readiness separate from provider execution;
- remains the single pipeline status owner rather than creating a second competing component.

The Developer Console startup sequence also labels its 21-stage check as **Pipeline contract**. COMPLETE on that startup row means the backend reported the canonical contract. The separate foundations count remains the maturity indicator.

## Current release path

1. #941 controlled current-revision transcription/durability/Stage 10 proof
2. #970 real cloud-primary diarization and speaker persistence
3. #971 persisted transcript/audio/speaker alignment
4. #963 historical-case artifact rehydration
5. #930 upload reliability bounding
6. #959 production observability/debug-bundle acceptance
7. authenticated desktop/mobile acceptance for already-merged frontend/auth work
8. #972 two complete golden cases on one frozen revision/configuration
9. scientific validation separately

## Source baseline

The 2026-09-12 reconciliation baseline was `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80`; exact-baseline VoxVector QA run `34679916767` succeeded. Later documentation synchronization commits legitimately make `main` newer.

## Boundary

A 21-stage contract is not 21 completed stages. Implemented foundations are not 16 validated deception indicators. Configuration is not provider execution. Engineering repeatability is not scientific validation.
