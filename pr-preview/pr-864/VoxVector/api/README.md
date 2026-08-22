# VoxVector Analysis API

This directory contains the deployable HTTP adapter for the canonical VoxVector Python engine. It is part of the `VoxVector/` project and is not a second analysis implementation.

## Runtime contract

### Health

- `GET /health` — runtime health and source fingerprint

### Direct compatibility analysis

- `POST /v1/analyze` — accepts a supported PCM WAV upload and returns the canonical `AnalysisResult`

### Case centered workflow

- `POST /v1/cases` — create an authenticated analysis case
- `GET /v1/cases` — list authenticated cases
- `GET /v1/cases/{case_id}` — retrieve an authenticated case
- `POST /v1/cases/{case_id}/sources` — persist a WAV source asset and provenance
- `GET /v1/cases/{case_id}/sources/{source_id}/playback` — issue a time-limited signed media URL
- `POST /v1/cases/{case_id}/sources/{source_id}/analyze` — execute the canonical pipeline against a persisted source and save the analysis run

Case routes require an authenticated Supabase developer session.

## Intake

The current backend intake accepts PCM WAV audio and enforces a maximum sample rate of 48 kHz. The media storage size ceiling is configured through `VOXVECTOR_MEDIA_MAX_BYTES` and defaults to 250 MB.

Source records preserve:

- case identity
- source identity
- filename
- format
- sample rate
- channel handling
- duration
- peak level
- clipping ratio
- SHA-256 source hash
- private media storage path
- source creation time

Signed playback URLs are issued only after case ownership and source ownership are verified.

## Analysis run state

Case bound analysis persists the canonical 21 stage state contract. Stages that execute in the current runtime are recorded as completed. Stages that depend on speaker processing transcription or other unavailable inputs remain pending or not-run rather than being presented as completed.

The run record preserves:

- run identity
- request identity
- pipeline version
- stage state
- stage timing
- stage outcome
- source identity
- canonical analysis result

## Render

Render is configured from the repository root with:

```text
Root Directory: VoxVector
Build Command: pip install -r api/requirements.txt
Start Command: uvicorn api.app:app --host 0.0.0.0 --port $PORT
Health Check: /health
```

The public VoxVector deployment must point at the canonical `VoxVector/` project. No root-level `api/` directory is required.

## Architecture boundary

The adapter imports `VoxVectorPipeline` from `VoxVector/src/voxvector/`. All analysis remains in the canonical engine.

The case persistence and media layer provides case identity source storage provenance and orchestration state around the canonical engine. It does not duplicate analytical feature extraction.
