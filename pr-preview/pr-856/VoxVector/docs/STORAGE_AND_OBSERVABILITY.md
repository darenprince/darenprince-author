# VoxVector Storage and Observability

## Purpose

VoxVector now has a durable backend path for operational diagnostics so a Render instance restart does not erase the evidence needed to investigate API failures such as the 2026-08-19 public `/v1/analyze` 502.

## Backend decision

The canonical deployment architecture already identifies **Supabase** for database and private audio storage where configured. VoxVector uses Supabase Storage for a dedicated private diagnostics bucket rather than adding another infrastructure provider.

Supabase private buckets are appropriate for operational diagnostics because private objects remain access-controlled and server-side service keys can perform trusted Storage operations. The service key must exist only as a Render secret and must never be exposed to the browser or returned by the API. Supabase documents private buckets and service-key access control in its Storage documentation.

## Storage configuration

Required Render environment variables:

- `VOXVECTOR_DIAGNOSTICS_ENABLED=true`
- `VOXVECTOR_STORAGE_PROVIDER=supabase`
- `VOXVECTOR_LOG_BUCKET=voxvector-logs`
- `SUPABASE_URL=https://<project>.supabase.co`
- `SUPABASE_SERVICE_ROLE_KEY=<server-side secret>`

Optional:

- `VOXVECTOR_STORAGE_TIMEOUT_SECONDS=2`

The API automatically attempts to create the bucket as private if it does not already exist. The intended bucket contains JSON diagnostics only and is restricted to `application/json` with a 1 MB object limit.

## What is stored

Diagnostics deliberately exclude raw audio and raw transcript content. Each request is assigned a UUID-like request ID and can produce lifecycle objects under:

`events/YYYY/MM/DD/<request_id>/`

Event types currently include:

- `request.started`
- `request.completed`
- `request.rejected`
- `stage.completed`
- `request.analysis_error`
- `request.unhandled_exception`

Records may include request method/path, content length/type, HTTP status, stage timing, sample rate, sample count, error type/message, pipeline version, source revision, and request ID.

The purpose is operational diagnosis and provenance, not storing the user's audio as a side effect of an analysis request.

## Why request.started matters

A 502 can occur when the origin process terminates before a usable HTTP response reaches Cloudflare. A `request.started` record written before the analysis pipeline begins gives the investigation a durable marker that the request reached the application. If the corresponding `request.completed` or error record is absent, that gap is evidence of an abrupt termination or loss of the process between lifecycle stages; it does not by itself prove OOM.

## Failure behavior

Diagnostic storage is deliberately non-fatal. If Supabase is unavailable, the analysis request must not be converted into a storage outage. A sanitized `VOXVECTOR_DIAGNOSTIC_STORAGE_FAILURE` record is emitted to the Render process log instead.

This creates two layers:

1. **Durable diagnostics:** Supabase Storage when configured and reachable.
2. **Immediate fallback:** Render process logs when durable storage is unavailable.

## Access and security

Do not make the diagnostics bucket public. Do not place the Supabase service-role key in frontend code, GitHub, documentation, or API responses.

The current API does not expose a public log browser. Operational log retrieval should be performed through the Supabase dashboard or a future authenticated operator console. A future operator endpoint must require explicit authorization and must never expose secrets or unrestricted bucket contents.

## Verification checklist

After configuring Render:

1. redeploy the exact repository commit;
2. call `/health`;
3. confirm `diagnostic_storage` reports `configured`;
4. run a known WAV through `/v1/analyze`;
5. verify `request.started` and `request.completed` objects appear in the private bucket;
6. intentionally exercise a controlled validation error and verify `request.analysis_error` or `request.rejected` is stored;
7. confirm the response includes `X-Request-ID`;
8. confirm no audio bytes, raw transcript, service key, or other secrets are stored in diagnostic records;
9. document the verified deployment revision in the active checkpoint.

## Current limitation

The storage layer can preserve application-level lifecycle evidence, but it cannot log a process that is killed before the application executes the storage write. Render-level resource metrics and platform logs remain necessary for diagnosing hard OOM/process termination. The diagnostic system is therefore an evidence layer, not a substitute for host telemetry.

## External reference

Supabase Storage supports private buckets, server-side object operations, and access controls through Storage policies. The implementation follows the documented Storage object API model.
