# VoxVector Storage and Observability

## Purpose

VoxVector uses Supabase as the durable persistence layer for case metadata media access and operational diagnostics within the canonical backend architecture.

## Storage architecture

The backend now separates durable storage into two private Supabase Storage roles:

### `voxvector-logs`

JSON only operational diagnostics and case metadata.

Case metadata is stored under:

`cases/<user_id>/<case_id>.json`

### `voxvector-media`

Private audio source assets for case workflows.

Media is stored under:

`media/<user_id>/<case_id>/<source_id>.wav`

The media bucket is never public. The API verifies authenticated case ownership before issuing a time-limited signed playback URL.

The Supabase service-role key exists only as a Render secret and is never exposed to the browser or returned by the API.

## Case persistence

The case spine preserves:

- case identity
- owner identity
- case title
- lifecycle status
- source assets
- source identity
- filename
- media storage reference
- SHA-256 source hash
- sample rate
- channel handling
- duration
- peak level
- clipping ratio
- analysis run identity
- request identity
- pipeline version
- 21 stage state
- run result
- creation and update timestamps

Case routes are authenticated through the existing Supabase developer-role verification boundary.

## Media access

The case API provides:

- authenticated source upload
- private media persistence
- signed playback URL generation
- server-side media retrieval for case-bound analysis

The browser never receives the Supabase service-role key and does not access the private bucket directly with administrative credentials.

## WAV intake compatibility

The case intake contract remains PCM WAV audio. The backend first uses Python's native WAV reader for standard PCM files and then applies the compatibility parser in `api/wav_compat.py` when the native reader rejects a container variation.

The compatibility layer accepts standard RIFF/WAVE, WAVE_FORMAT_EXTENSIBLE PCM, RF64/BW64 PCM containers, and RIFX PCM containers while normalizing supported PCM sample widths to the existing analysis path.

The WAVE_FORMAT_EXTENSIBLE subtype comparison uses the complete 16-byte `KSDATAFORMAT_SUBTYPE_PCM` GUID:

`01000000-0000-0010-8000-00AA00389B71`

This is important because an incomplete GUID literal can make a valid extensible PCM recording fail with the misleading generic error `Only PCM WAV audio is supported by the initial runtime`.

The compatibility tests cover standard PCM, extensible PCM, RF64 PCM, and continued native decoding of standard PCM.

## Live Render console stream

Every enabled diagnostic event is emitted as a single sanitized JSON line to the application's standard output with the prefix:

`VOXVECTOR_DIAGNOSTIC`

Render captures application stdout/stderr as the service's live process logs.

## Protected Error Reports

The Developer Console's **Error Reports** surface uses:

`GET /v1/diagnostics/errors`

The endpoint requires a valid Supabase access token and verifies that the authenticated user's trusted `app_metadata.role` or `app_metadata.voxvector_role` is `developer`.

Error events are indexed under:

`error-index/YYYY/MM/DD/`

in addition to the canonical per-request event hierarchy.

## Storage configuration

Required Render environment variables:

- `VOXVECTOR_STORAGE_PROVIDER=supabase`
- `VOXVECTOR_LOG_BUCKET=voxvector-logs`
- `VOXVECTOR_MEDIA_BUCKET=voxvector-media`
- `SUPABASE_URL=https://<project>.supabase.co`
- `SUPABASE_SERVICE_ROLE_KEY=<server-side secret>`

Optional:

- `VOXVECTOR_DIAGNOSTICS_ENABLED=true`
- `VOXVECTOR_MEDIA_MAX_BYTES=262144000`
- `VOXVECTOR_STORAGE_TIMEOUT_SECONDS=5`

The API creates private buckets when the configured service role has permission to do so.

## 2026-08-31 production upload incident

A production verification of the connected VoxVector Supabase project found that `voxvector-logs` existed but the required `voxvector-media` bucket did not exist. This allowed case metadata and diagnostic operations to continue while case audio persistence could fail at the media-storage boundary.

The missing `voxvector-media` bucket was provisioned as a private bucket with the documented 250 MB limit and compatible WAV MIME types:

- `audio/wav`
- `audio/x-wav`
- `audio/wave`
- `application/octet-stream`

This was an infrastructure remediation, not a frontend simulation. The repository backend already contains the canonical media-storage path and the required media-bucket configuration. The production storage configuration is now aligned with that contract.

The incident also confirmed that diagnostic log storage was functioning independently; the production project was actively writing and reading the `voxvector-logs` bucket during the investigation.

## What is stored in diagnostics

Diagnostics deliberately exclude raw audio and raw transcript content. Each request is assigned a request ID and can produce lifecycle objects under:

`events/YYYY/MM/DD/<request_id>/`

Error events are additionally indexed under:

`error-index/YYYY/MM/DD/`

Records may include request method/path HTTP status stage timing sample rate sample count error type/message pipeline version source revision and request ID.

## Event types

Event families include:

- `request.started`
- `request.completed`
- `request.rejected`
- `stage.completed`
- `request.analysis_error`
- `request.unhandled_exception`
- `case.created`
- `case.source_uploaded`
- `case.analysis_completed`

## Failure behavior

Diagnostic storage is deliberately non-fatal. If Supabase diagnostics storage is unavailable the service emits a sanitized storage failure marker to the Render process log.

Case and media persistence is part of the case workflow itself. A case operation that cannot persist its required source or case record returns an explicit API error rather than presenting the case as durably saved.

## Access and security

Do not make either bucket public.

Do not place the Supabase service-role key in frontend code GitHub documentation or API responses.

Case media is owner-scoped through the authenticated developer session before signed playback or server-side analysis access is granted.

## Verification checklist

After configuring Render:

1. redeploy the exact repository commit;
2. call `/health`;
3. confirm diagnostics and media storage configuration state;
4. create an authenticated case;
5. upload a known WAV source;
6. confirm source metadata and SHA-256 provenance are persisted;
7. request a signed playback URL and verify it expires as configured;
8. execute the case-bound analysis route;
9. confirm the case contains the analysis run and 21 stage state records;
10. verify diagnostic lifecycle events;
11. confirm no service key or raw audio is emitted in diagnostic records;
12. document the verified deployment revision in the active checkpoint.


## 2026-09-01 production analysis evidence and observability repair

A real production case upload and analysis completed successfully on 2026-09-01, establishing that the repaired private media upload path and case-bound analysis path can execute end to end. The production Render logs also exposed a relational observability schema mismatch: `api_request_logs.duration_ms` is an integer column while diagnostic events preserve fractional milliseconds. The canonical projection now rounds duration values to an integer for the relational table while the immutable JSON diagnostic event retains the original fractional precision.

## 2026-09-01 observability projection audit and repair

Connected Supabase inspection found Storage diagnostics populated while public.api_request_logs and public.error_reports contained zero rows. The canonical repair now keeps immutable JSON records in voxvector-logs, projects enabled lifecycle events into public.api_request_logs, projects error events into public.error_reports, and lets diagnostic APIs prefer relational records with Storage archive fallback.

Production verification remains required after deployment. Audit record: VoxVector/docs/audits/SYSTEM_ARCHITECTURE_AND_OBSERVABILITY_2026-09-01.md.
