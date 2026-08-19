# VoxVector Analysis API

This directory contains the deployable HTTP adapter for the canonical VoxVector Python engine. It is part of the `VoxVector/` project and is not a second analysis implementation.

## Local contract

- `GET /health` — runtime health check
- `POST /v1/analyze` — accepts a supported PCM WAV upload and returns the canonical `AnalysisResult`
- Initial upload limit: 20 MB
- Initial runtime format: PCM WAV

The adapter imports `VoxVectorPipeline` from `VoxVector/src/voxvector/`. All analysis remains in the canonical engine.

## Render

Render is configured from the repository root with:

```text
Root Directory: VoxVector
Build Command: pip install -r api/requirements.txt
Start Command: uvicorn api.app:app --host 0.0.0.0 --port $PORT
Health Check: /health
```

The public VoxVector deployment must point at the canonical `VoxVector/` project. No root-level `api/` directory is required.

## Capability boundary

The initial HTTP adapter supports PCM WAV only. It does not manufacture a Deception Probability. Until a validated calibrated inference model is connected and its gates are satisfied, the product result remains observational/insufficient-evidence as defined by the canonical pipeline.
