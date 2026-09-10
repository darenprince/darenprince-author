# VoxVector Storage and Observability

## Purpose

VoxVector uses Supabase as the durable persistence layer for case metadata, private media access, and operational diagnostics within the canonical backend architecture. Render remains the native provider/runtime log surface for the Render-hosted API. VoxVector intentionally preserves both views: Render keeps its native logs, while sanitized VoxVector-owned events and Render log observations collected through the protected bridge are durably archived in Supabase.

## Storage architecture

The backend separates durable storage into two private Supabase Storage roles:

### `voxvector-logs`

JSON-only operational diagnostics, mirrored Render log snapshots, and case metadata.

Case metadata is stored under:

`cases/<user_id>/<case_id>.json`

Sanitized VoxVector event archives are stored under:

`events/YYYY/MM/DD/<request_id>/`

Sanitized Render snapshots collected through the protected bridge are stored under:

`render-snapshots/YYYY/MM/DD/<service_id>/`

### `voxvector-media`

Private audio source assets for case workflows.

Media is stored under:

`media/<user_id>/<case_id>/<source_id>.wav`

The media bucket is never public. The API verifies authenticated case ownership before issuing a time-limited signed playback URL.

The Supabase service-role key exists only in trusted server runtime configuration and is never exposed to the browser or returned by the API.

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

Case routes are authenticated through the existing Supabase trusted-role verification boundary.

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

## Dual Render and Supabase log model

Every enabled VoxVector diagnostic event continues to be emitted as a single sanitized JSON line to application standard output with the prefix:

`VOXVECTOR_DIAGNOSTIC`

Speech/provider runtime events continue to be emitted with:

`VOXVECTOR_SPEECH`

Render captures the API process stdout/stderr as its native provider/runtime log stream. That copy is deliberately retained for immediate infrastructure debugging.

The same sanitized VoxVector diagnostic and speech/provider records are also sent through the canonical durable observability emitter. The emitter projects searchable fields into Supabase relational diagnostics and writes the immutable/bounded JSON event archive into the private `voxvector-logs` bucket. Speech/provider records therefore no longer depend on Render retention alone for durable history.

The authenticated Render log bridge remains available. When VoxVector fetches a Render log window through that bridge, the returned provider lines are sanitized and a snapshot is mirrored into `voxvector-logs` with service/revision/correlation provenance. Render remains the original provider log source; the Supabase copy is VoxVector's durable observed archive.

A Supabase write failure does not suppress the Render-native line. The application emits only a bounded fallback marker to provider telemetry and does not dump event bodies, audio, transcripts, request bodies, credentials, or tokens into the fallback.

## Protected Error Reports

The Developer Console's **Error Reports** surface uses:

`GET /v1/diagnostics/errors`

The endpoint requires a valid Supabase access token and a trusted VoxVector developer/admin role.

Error events are indexed under:

`error-index/YYYY/MM/DD/`

in addition to the canonical per-request event hierarchy.

## One-click debug bundle

The authenticated Developer Console Analysis Workspace exposes **Download Debug Bundle** once a persisted analysis run ID exists. The control is intentionally available for completed, failed, interrupted, or apparently stuck runs so a process restart does not prevent evidence collection.

The browser calls the protected server endpoint:

`GET /v1/developer/render/debug-bundle?case_id=<case>&run_id=<run>`

The server gathers the bounded evidence window and returns one ZIP. The browser does not receive Render or Supabase administrative credentials and does not stitch protected sources together client-side.

The default archive contains, when available:

- `manifest.json` — case/run IDs, request ID, source revision, pipeline version, generation time, bounded time window, correlation basis, included counts, and explicit missing evidence;
- `case-run.json` — sanitized case/source/run/stage/provenance/failure metadata;
- `voxvector-events.jsonl` — correlated Supabase-backed VoxVector diagnostic and speech/provider events;
- `errors.jsonl` — correlated Supabase error projections;
- `render-logs.jsonl` — sanitized Render provider logs for the bounded analysis window;
- `render-status.json` — observed Render service/deployment/revision state when available;
- `runtime-health.json` — safe API health/version/readiness information when available;
- `README.txt` — evidence-source and privacy notes.

Exact request/case/run identifiers are preferred. Speech/provider events with child-process identifiers and Render provider lines that cannot be structurally tied to a run may be included by the documented analysis start/end window plus a small bounded buffer. The manifest labels this as time-window correlation rather than exact attribution.

The default debug archive excludes raw audio, transcript text, request bodies, passwords, access/refresh tokens, cookies, signed URLs, Supabase service-role credentials, Render API keys, deploy-hook URLs, and other protected secrets.

The debug ZIP is an engineering troubleshooting artifact. It is not scientific-validation evidence.

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

Diagnostics deliberately exclude raw audio and raw transcript content. Records may include request method/path, HTTP status, stage timing, sample rate, sample count, error type/message, provider state, pipeline version, source revision, request/trace ID, case/source/run IDs, and other sanitized operational provenance.

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
- `transcription.started`
- `transcription.model_loaded`
- `transcription.progress`
- `transcription.completed`
- `transcription.failed`
- diarization/provider runtime counterparts where invoked
- `case.debug_bundle_generated`

## Failure behavior

Diagnostic storage is deliberately non-fatal to the API request. If Supabase diagnostics storage is unavailable, the Render process stream retains the normal application/provider event and receives a bounded sanitized persistence-failure marker.

Case and media persistence is part of the case workflow itself. A case operation that cannot persist its required source or case record returns an explicit API error rather than presenting the case as durably saved.

Render log mirroring is also non-fatal. Failure to mirror a provider window is reported as missing evidence in the bundle/bridge state rather than making the native Render log view unavailable.

## Access and security

Do not make either bucket public.

Do not place the Supabase service-role key, Render API key, deploy-hook URL, or other provider credentials in frontend code, GitHub documentation values, diagnostic payloads, debug bundles, or API responses.

Case media is owner-scoped through the authenticated session before signed playback or server-side analysis access is granted. Debug-bundle generation is developer/admin protected and resolves the case through the same owner-scoped CaseStore boundary.

## Verification checklist

After deploying the exact reviewed revision:

1. call `/health` and record the returned backend source revision;
2. create/open an authenticated case and run an analysis;
3. confirm the same VoxVector diagnostic event is visible in Render and persisted in Supabase;
4. confirm speech/provider start/progress/completion/failure events are visible in Render and persisted in Supabase when those events execute;
5. fetch the protected Render log view and confirm a sanitized Render snapshot is written to `voxvector-logs`;
6. download the case/run debug bundle from the Analysis Workspace;
7. inspect `manifest.json` for exact/time-window correlation and missing evidence;
8. confirm the ZIP contains the expected sanitized files and no raw audio/transcript or protected credentials;
9. confirm a process restart does not erase successfully persisted Supabase event evidence;
10. record exact source, deployment, Supabase readback, and browser evidence separately.

## 2026-09-01 production analysis evidence and observability repair

A real production case upload and analysis completed successfully on 2026-09-01, establishing that the repaired private media upload path and case-bound analysis path can execute end to end. The production Render logs also exposed a relational observability schema mismatch: `api_request_logs.duration_ms` is an integer column while diagnostic events preserve fractional milliseconds. The canonical projection now rounds duration values to an integer for the relational table while the immutable JSON diagnostic event retains the original fractional precision.

## 2026-09-01 observability projection audit and repair

Connected Supabase inspection found Storage diagnostics populated while `public.api_request_logs` and `public.error_reports` contained zero rows. The canonical repair keeps immutable JSON records in `voxvector-logs`, projects enabled lifecycle events into `public.api_request_logs`, projects error events into `public.error_reports`, and lets diagnostic APIs prefer relational records with Storage archive fallback.

Production verification remains required after deployment. Audit record: `VoxVector/docs/audits/SYSTEM_ARCHITECTURE_AND_OBSERVABILITY_2026-09-01.md`.

## 2026-09-01 production verification update

The 2026-09-01 production run subsequently demonstrated successful case upload, private media persistence, and case-bound analysis completion. Production `/health`, `/v1/cases`, and case retrieval calls returned `200 OK`, and the Render runtime emitted valid `VOXVECTOR_DIAGNOSTIC` records during the run.

The remaining observability defect at that historical checkpoint was isolated to the relational projection boundary. `VoxVector/api/observability.py` applies `_duration_ms_for_projection()` so the existing integer database schema receives normalized values while the immutable Storage record preserves fractional timing precision. Regression coverage in `VoxVector/tests/test_observability.py` covers decimal, string, zero/sub-millisecond, null, and invalid duration inputs.

## 2026-09-01 relational date-window correction

The relational diagnostic endpoints apply their requested `days` window directly to Supabase queries using an `occurred_at >= cutoff` filter before ordering and limiting results.

This fixes the prior behavior where relational rows could be returned outside the requested time window even though the immutable Storage fallback respected the date range.

## 2026-09-10 dual-log/debug-bundle implementation status

Issue #959 owns the dual Render/Supabase logging and one-click debug-bundle change. Source implementation is being reviewed on its linked feature branch/PR. Until the exact reviewed revision is merged, deliberately deployed, and exercised, the behavior above is a source implementation contract rather than a production-verification claim.
