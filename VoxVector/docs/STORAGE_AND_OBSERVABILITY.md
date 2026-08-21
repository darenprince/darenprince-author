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
