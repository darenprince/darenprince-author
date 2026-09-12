# VoxVector Pipeline Build Status

**Crown Labs executive/product mirror**

Canonical technical owner: `VoxVector/docs/PIPELINE_BUILD_STATUS.md`.

## Current maturity

- Canonical contract: **21 stages**
- Health/source maturity: approximately **16 implemented analytical/runtime foundations**, **1 queued**, **4 conditional/not invoked**
- Current controlled runtime result: **17 complete / 0 failed / 4 intentionally not run**
- Current cloud-primary speaker execution/persistence: **open**
- Current same-revision faster-whisper execution: **proven**
- Current transcript durability/alignment before Stage 10: **proven**
- Current bounded Stage 10 completion: **proven**
- Scientific validation: **separate program**

## September 12 proof

The deployed 0.2.27 backend at `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80` completed one controlled 183.3-second run:

- Stage 05: 26 speech segments
- Stage 07: faster-whisper ~150.1 s
- acquisition checkpoint: 58 transcript segments / 246 words
- Stage 08 transcript/audio alignment available
- Stage 10 start: 118.6 MB RSS
- Stage 10 admission ceiling: 416 MB
- service memory limit: 512 MB
- Stage 10 acoustic extraction: ~73.8 s
- Stage 10 after-GC RSS: 128.63 MB
- no uncontrolled API restart

#941 is complete.

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

## Runtime state by important stage

- 01–05: completed in the controlled run
- 06: intentionally not run; next P0 is #970
- 07: completed
- 08: completed
- 09–13: completed
- 14: not run because question context was absent
- 15: not run because baseline was absent
- 16–18: completed
- 19: intentionally not invoked
- 20–21: completed

## Current release path

1. #970 real cloud diarization and persisted speaker evidence
2. #971 speaker-inclusive persisted alignment
3. #963 historical-case artifact rehydration
4. #930 upload reliability bounding
5. #998 observability persistence isolation
6. #959 full dual-copy/debug correlation
7. authenticated desktop/mobile acceptance
8. #972 two complete golden cases on one frozen revision/configuration
9. scientific validation separately

## Boundary

The source health maturity count and one-run runtime completion count answer different questions. Neither is a count of scientifically validated deception indicators.
