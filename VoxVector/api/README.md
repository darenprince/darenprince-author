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
- `GET /v1/cases/{case_id}` — retrieve an authenticated case and persisted runs
- `DELETE /v1/cases/{case_id}` — permanently delete an authenticated case and its persisted source media
- `POST /v1/cases/{case_id}/sources` — persist a WAV source asset and provenance
- `GET /v1/cases/{case_id}/sources/{source_id}/playback` — issue a time-limited signed media URL
- `POST /v1/cases/{case_id}/sources/{source_id}/analyze` — execute the canonical pipeline against a persisted source and save the analysis run lifecycle

Case routes require an authenticated Supabase developer session. Case deletion is owner-scoped and irreversible; the API deletes persisted source media before removing the case record and emits a `case.deleted` diagnostic event when the operation completes.

### Developer infrastructure

- `GET /v1/developer/render/status` — authenticated server-side Render service, deployment, and instance state
- `GET /v1/developer/render/logs` — authenticated server-side Render log window for the configured service

Render bridge routes are developer-only and keep the Render API key on the server. Browser code receives observed infrastructure data, never the credential.

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

Case-bound analysis persists the canonical 21-stage state contract. A run is persisted in `running` state before processing begins, route-boundary lifecycle state is updated during execution, and the final run is persisted as `completed` or `failed`.

The live run record preserves:

- run identity
- request identity
- pipeline version
- current stage where known
- stage state
- measured stage timing where available
- stage outcomes
- source identity
- canonical analysis result after completion

The current composite analytical pipeline does not expose internal callbacks for every stage. The API therefore records route-boundary timing and explicitly avoids fabricating granular internal durations.

## Case history

The case store is durable and owner-scoped. `GET /v1/cases` returns saved cases ordered by `updated_at`; `GET /v1/cases/{case_id}` returns persisted sources and prior analysis runs. This enables the Developer Console Case History surface to reopen prior work without creating a new run.

`DELETE /v1/cases/{case_id}` permanently removes the owner-scoped case record and every persisted source-media path recorded by that case. The Developer Console requires explicit confirmation before issuing this request. The operation is not a soft delete and does not provide an undo path.

Case records are stored through the existing private Supabase Storage-backed case store. The storage layer does not duplicate analytical feature extraction.

## Developer and API Product Surface

VoxVector is designed to operate both as an analytical application and as an intelligence service.

The canonical FastAPI API currently exposes:

- runtime health
- direct WAV analysis
- authenticated case creation
- case listing, retrieval, and deletion
- source upload and provenance
- signed media playback
- case-bound analysis execution
- persisted pipeline stage state
- request correlation and diagnostics
- server-side Render service/deployment/log observability for approved developers

The API is an interface to the canonical VoxVector analysis engine. It does not duplicate feature extraction or maintain a separate analytical implementation.

## Render

Render is configured from the repository root with:

```text
Root Directory: VoxVector
Build Command: pip install -r api/requirements.txt
Start Command: uvicorn api.app:app --host 0.0.0.0 --port $PORT
Health Check: /health
```

The public VoxVector deployment must point at the canonical `VoxVector/` project. No root-level `api/` directory is required.

### Render API bridge configuration

The Developer Console Render bridge expects these protected Render service environment variables:

```text
RENDER_API_KEY=<Render API key>
RENDER_SERVICE_ID=<VoxVector Render service ID>
```

Do not put the API key in Vite variables, React source, GitHub files, case artifacts, or browser network calls. The GitHub repository secrets of the same names are a separate scope used by GitHub Actions.

The repository automation workflow `.github/workflows/render-observability.yml` uses the repository `RENDER_SERVICE_ID` secret as its default target and consumes `RENDER_API_KEY` only inside the GitHub Actions runner.

## Architecture boundary

The adapter imports `VoxVectorPipeline` from `VoxVector/src/voxvector/`. All analysis remains in the canonical engine.

The case persistence and media layer provides case identity, source storage, provenance, and orchestration state around the canonical engine. It does not duplicate analytical feature extraction.