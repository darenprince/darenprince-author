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

The complete VoxVector product architecture contains 21 connected stages:

1. File upload and ingest
2. Decode and normalization
3. Provenance and integrity
4. Recording and channel assessment
5. Speaker identification and diarization
6. Speech segmentation
7. Transcription generation
8. Transcript alignment
9. Eligibility and reliability
10. Acoustic analysis
11. Prosodic and voice-quality analysis
12. Temporal and pause analysis
13. Linguistic and disfluency analysis
14. Question and answer alignment
15. Within-speaker baseline
16. Evidence assembly
17. Evidence convergence and conflict
18. Candidate classification
19. Validation and calibration
20. Final classification and disposition
21. Audit and provenance output

**[View the detailed 21-stage pipeline →](/docs/product-dossiers/voxvector/analysis-pipeline)**

## Analysis Engine

`VoxVectorPipeline.analyze()` provides the foundational reliability assessment and structured feature extraction layer across acoustic, prosodic, spectral, formant, temporal, baseline, interaction, and transcript observations.

The broader product architecture extends this foundation with speaker intelligence, transcription, alignment, richer linguistic analysis, multimethod evidence synthesis, calibrated classification, and validated inference.

## Evidence Architecture

VoxVector preserves identifiers, input hashing, schema and software versions, eligibility state, observation provenance, evidence relationships, uncertainty, and the complete analytical pathway.

Reliability and evidence relationships are first-class components of the architecture. Multiple evidence families are brought together through a stage-separated analytical workflow rather than an opaque single score.

## Analysis Workspace

The target application is a persistent case-centered workspace connecting:

- source metadata
- audio playback
- synchronized waveform
- speaker regions
- transcript
- analytical tracks
- evidence timeline
- evidence explorer
- pipeline state
- assessment
- reports
- history

The shared timeline connects audio, speaker, transcript, analytical observations, and evidence events so a selected interval can be inspected across the relevant analytical layers.

## Implementation Boundary

The 21 stage architecture is the canonical product model. Runtime implementation state is tracked separately in the VoxVector capability records and MVP engineering plan.

The frontend must represent actual backend stage state. It must not manufacture execution progress or present planned analytical stages as completed runtime behavior.

## Deployment Boundary

Render uses `VoxVector` as the root directory and `api.app:app` as the entry point. The intended public target is `voxvector.crownlabs.tech`.
