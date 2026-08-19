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
final disposition gate
```

The FastAPI layer is an interface boundary only. The analysis engine remains canonical under `VoxVector/src/voxvector/`.

## Current Pipeline

`VoxVectorPipeline.analyze()` performs reliability assessment and structured feature extraction, including acoustic, prosodic, spectral, formant, temporal, baseline, interaction, and optional transcript observations.

The pipeline records run identifiers, input hashing, schema and software versions, eligibility state, observation provenance, evidence, limitations, and disposition.

## Runtime Stages

1. Ingest and provenance
2. Eligibility and reliability
3. Evidence collection and analysis
4. Evidence grouping and convergence
5. Candidate classification
6. Final disposition

The current classifier remains indeterminate-only. The final disposition is abstention or insufficient evidence depending on eligibility state.

## Primary Implementation Boundary

- `VoxVector/src/voxvector/` — canonical analysis engine
- `VoxVector/api/app.py` — HTTP adapter
- `VoxVector/tests/` — software QA
- `VoxVector/docs/` — technical source of truth

Render uses `VoxVector` as the root directory and `api.app:app` as the entry point.

## Scientific Boundary

Reliability is not deception probability. Observations are not deception labels. Correlated measurements are not silently treated as independent evidence. Missing data and alternative explanations remain explicit.

## Design Properties

- bounded frame processing for constrained deployments
- deterministic extraction where practical
- explicit missing-data behavior
- immutable input fingerprinting
- reproducible configuration
- auditable evidence provenance
- first-class abstention
- separation of implementation from scientific validation
- preserved future capability roadmap
