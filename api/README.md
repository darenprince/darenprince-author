# VoxVector Analysis API

This directory contains the deployable HTTP adapter for the canonical VoxVector Python engine.

## Local contract

- `GET /health` — runtime health check
- `POST /v1/analyze` — accepts a supported PCM WAV upload and returns the canonical `AnalysisResult`
- Initial upload limit: 20 MB
- Initial runtime format: PCM WAV

The API adapter does not implement a second analysis engine. It imports `VoxVectorPipeline` from `VoxVector/src/voxvector/` and returns its structured result.

## Render

The repository includes `render.yaml` at the repository root. The Render service uses:

```text
Root Directory: api
Build Command: pip install -r requirements.txt
Start Command: uvicorn voxvector.app:app --host 0.0.0.0 --port $PORT
Health Check: /health
```

Set `CORS_ORIGINS` to the exact deployed VoxVector web origin before exposing the API publicly. Do not leave unrestricted CORS in the finished product.

## Current capability boundary

The initial HTTP adapter supports PCM WAV only. It does not decode MP3/M4A and does not manufacture a Deception Probability. Until a validated calibrated inference model is connected and its gates are satisfied, the product result must remain observational/insufficient-evidence as defined by the canonical pipeline.
