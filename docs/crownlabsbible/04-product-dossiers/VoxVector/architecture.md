# VoxVector Architecture

## Canonical Runtime Boundary

```text
voxvector.crownlabs.tech / client
          |
          v
VoxVector/api/app.py
          |
          v
VoxVector/src/voxvector/
          |
          v
eligibility / reliability
          |
          v
evidence collection and analysis
          |
          v
candidate classification
          |
          v
final classification / disposition
```

The FastAPI layer is the interface boundary. The analysis engine remains canonical under `VoxVector/src/voxvector/`.

## Complete Product Pipeline

1. File Upload / Ingest
2. Decode & Normalize
3. Provenance & Integrity
4. Recording & Channel Assessment
5. Speaker Identification / Diarization
6. Speech Segmentation
7. Transcription Generation
8. Transcript Alignment
9. Eligibility & Reliability
10. Acoustic Analysis
11. Prosodic & Voice Quality Analysis
12. Temporal & Pause Analysis
13. Linguistic & Disfluency Analysis
14. Question / Answer Alignment
15. Within Speaker Baseline
16. Evidence Assembly
17. Evidence Convergence & Conflict
18. Candidate Classification
19. Validation & Calibration
20. Final Classification / Disposition
21. Audit & Provenance Output

## Current Analysis Foundation

`VoxVectorPipeline.analyze()` provides reliability assessment and structured feature extraction across acoustic, prosodic, spectral, formant, temporal, baseline, interaction, and transcript observations.

The broader product architecture adds speaker intelligence, transcription, alignment, richer linguistic analysis, evidence synthesis, calibrated classification, and validated inference.

## Primary Implementation Boundary

- `VoxVector/src/voxvector/` — canonical analysis engine
- `VoxVector/api/app.py` — HTTP adapter
- `VoxVector/tests/` — software QA
- `VoxVector/docs/` — technical source of truth

Render uses `VoxVector` as the root directory and `api.app:app` as the entry point.

## Design Properties

- bounded frame processing
- deterministic extraction where practical
- explicit data-state handling
- immutable input fingerprinting
- reproducible configuration
- auditable evidence provenance
- stage-separated analytical architecture
- preserved full capability roadmap
