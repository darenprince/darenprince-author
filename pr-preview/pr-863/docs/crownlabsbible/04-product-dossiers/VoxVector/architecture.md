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
21 stage VoxVector pipeline
          |
          v
Supabase persistence and diagnostics
```

The FastAPI layer is the interface boundary.

The analysis engine remains canonical under `VoxVector/src/voxvector/`.

The public React application is maintained under `voxvector/` and is hosted separately from the backend.

## Complete Product Pipeline

1. File Upload / Ingest
2. File Decode and Normalization
3. Provenance and Integrity
4. Channel and Recording Assessment
5. Speaker Identification / Diarization
6. Speech Segmentation
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

**[Detailed 21-stage pipeline →](./analysis-pipeline.md)**

## Product Experience Target

The product target is a connected case centered intelligence workspace containing:

- recording intake
- source metadata
- audio playback
- synchronized waveform
- speaker regions
- transcript
- analytical tracks
- evidence markers
- evidence timeline
- pipeline state
- evidence synthesis
- assessment
- reports
- history

The supplied reference screens define the target interaction architecture.

## Current Analysis Foundation

`VoxVectorPipeline.analyze()` provides reliability assessment and structured feature extraction across acoustic prosodic spectral formant temporal baseline interaction and supplied transcript observations.

The broader product architecture adds production speaker processing transcription alignment richer linguistic analysis evidence synthesis calibrated classification validation reporting and final disposition.

## Primary Implementation Boundary

- `VoxVector/src/voxvector/` — canonical analysis engine
- `VoxVector/api/app.py` — HTTP adapter
- `VoxVector/tests/` — software QA
- `VoxVector/docs/` — technical source of truth
- `voxvector/` — public React application

Render uses `VoxVector` as the backend root and `api.app:app` as the entry point.

GitHub Pages hosts the React application under `/voxvector/`.

## Developer Console

The Developer Console is the engineering cockpit for the connected MVP path.

It exposes:

- runtime health
- API workbench
- request inspection
- lifecycle events
- errors
- methodology
- documentation
- MVP task board
- task checkoffs
- phase completion

## Design Properties

- bounded frame processing
- deterministic extraction where practical
- explicit data state handling
- immutable input fingerprinting
- reproducible configuration
- auditable evidence provenance
- stage separated analytical architecture
- synchronized audio and evidence time axis
- preserved full capability roadmap
