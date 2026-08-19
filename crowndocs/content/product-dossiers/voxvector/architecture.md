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

`VoxVectorPipeline.analyze()` performs reliability assessment and structured feature extraction across acoustic, prosodic, spectral, formant, temporal, baseline, interaction, and optional transcript observations.

Runs preserve identifiers, input hashing, schema and software versions, eligibility state, observation provenance, evidence, limitations, and disposition.

## Scientific Boundary

Reliability is not deception probability. Observations are not deception labels. Correlated measurements are not silently treated as independent evidence. Missing data and alternative explanations remain explicit.

## Deployment Boundary

Render uses `VoxVector` as the root directory and `api.app:app` as the entry point. The intended public target is `voxvector.crownlabs.tech`.
