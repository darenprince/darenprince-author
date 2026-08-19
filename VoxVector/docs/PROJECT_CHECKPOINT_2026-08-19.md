# VoxVector Project Checkpoint — 2026-08-19

## Checkpoint purpose

This document records the current engineering, runtime, deployment, and documentation state so development can resume from repository truth rather than conversation memory.

## Canonical state

- **Product:** VoxVector
- **Product objective:** vocal and audio deception detection for defined interview and conversational tasks.
- **Canonical application root:** `VoxVector/`
- **Analysis engine:** `VoxVector/src/voxvector/`
- **HTTP adapter:** `VoxVector/api/app.py`
- **QA:** `VoxVector/tests/`
- **Technical documentation:** `VoxVector/docs/`
- **Public API target:** `https://voxvector.crownlabs.tech`
- **Deployment:** Render
- **Current repository pipeline version:** `0.2.25`

## Completed since the previous checkpoint

- Established the canonical VoxVector application root and Render deployment boundary.
- Corrected the production Python/dependency baseline to Python 3.11.9 and NumPy 2.4.6 after Render compatibility testing.
- Integrated 13 MFCC coefficient observations into the primary pipeline.
- Added bounded frame-chunk processing to reduce peak memory pressure.
- Hardened formant FFT peak selection against the final/Nyquist spectrum-bin boundary.
- Advanced the pipeline software version from `0.2.24` to `0.2.25` and updated the affected contract expectation.
- Render successfully built and started the API with `uvicorn api.app:app --host 0.0.0.0 --port $PORT`.
- Render health checks returned HTTP 200 and the runtime self-test reported `passed` during the successful deployment.
- Added a dependency-free Supabase Storage adapter for durable operational diagnostics.
- Added request correlation IDs and `/v1/analyze` lifecycle/stage/error diagnostics.
- Added `X-Request-ID` to successful analysis responses.
- Added a private JSON diagnostics bucket configuration and production environment template.
- Added documentation for the storage/observability architecture and its security boundary.

## Current verification state

### Repository QA

The last reported GitHub Actions run before the formant/version fixes was **82 passed, 2 failed**. The failures were:

1. A stale test expecting pipeline version `0.2.24` while the implementation had advanced to `0.2.25`.
2. An `IndexError` in formant peak detection when a candidate peak occurred at the last FFT bin.

Both defects were addressed in source. A fresh green CI run must still be recorded before this checkpoint is considered QA-complete.

### Render runtime

The API has successfully deployed and passed `/health` checks. The service reported the canonical package path and runtime self-test.

A subsequent `/v1/analyze` request using the public Swagger interface returned **HTTP 502** with Cloudflare in front of a Render origin. The response had zero content length and identified Render as the origin server. This is treated as a runtime reliability incident, not as evidence of successful or failed deception analysis.

### Runtime incident interpretation

The 502 indicates that the edge did not receive a usable application response. It does not by itself identify whether the underlying cause was process termination, memory exhaustion, timeout, application crash, or another origin failure.

The current pipeline processes audio in bounded frame chunks but still accumulates multiple feature arrays across the full recording before final result construction. This remains a potential resource-pressure path on the constrained Render instance and requires measurement rather than assumption.

## New observability architecture

VoxVector now has a durable diagnostics path using the existing Supabase architecture:

- `VoxVector/api/storage.py` — dependency-free Supabase Storage adapter
- `VoxVector/api/observability.py` — request correlation and sanitized diagnostic events
- `VoxVector/api/app.py` — lifecycle instrumentation and `X-Request-ID`
- `VoxVector/docs/STORAGE_AND_OBSERVABILITY.md` — configuration, security, storage model, and verification procedure
- `VoxVector/api/.env.example` — Render environment template

Diagnostic objects are private JSON files organized by UTC date and request ID. Raw audio and raw transcript content are not persisted by this diagnostic layer.

The first lifecycle event is `request.started`. This is intentionally written before analysis so that an abrupt process termination can leave durable evidence that the request reached the application even when no normal response is produced.

Storage failure is non-fatal. If Supabase cannot be reached, the API continues and emits a sanitized `VOXVECTOR_DIAGNOSTIC_STORAGE_FAILURE` marker to the Render process log.

## Immediate next engineering work

1. Configure the Render environment with `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `VOXVECTOR_STORAGE_PROVIDER=supabase`, and `VOXVECTOR_LOG_BUCKET=voxvector-logs`.
2. Redeploy the exact commit containing the observability implementation.
3. Confirm `/health` reports `diagnostic_storage: configured`.
4. Run a known WAV through `/v1/analyze` and record the returned `X-Request-ID`.
5. Verify the private Supabase bucket contains `request.started`, `stage.completed`, and `request.completed` records for that request.
6. Exercise a controlled invalid request and verify a persisted rejection/error record.
7. Reproduce the 502 with a controlled fixture and correlate the request ID with durable events and Render logs.
8. Add explicit request/resource limits that fail safely before origin process termination.
9. Run the complete test suite and record a fresh CI result.
10. Deploy the verified commit to Render.
11. Verify `/health` and `/v1/analyze` against the exact deployed source revision.

## Documentation synchronization required

The following canonical records must remain synchronized with this checkpoint:

- `docs/OPERATING_CHARTER.md`
- `docs/PROJECT_DECISION_LOG.md`
- `docs/CAPABILITY_STATUS.md`
- `docs/ROADMAP.md`
- `docs/STORAGE_AND_OBSERVABILITY.md`
- Crown Labs Bible VoxVector product listing and dossier

## Scientific status

The current runtime remains an observational analysis foundation. It does not currently establish scientifically validated deception inference. Product documentation must continue to describe deception detection as the product objective while clearly separating implementation maturity and validation status.

## Stop conditions

Do not promote the 502 incident to a scientific finding. Do not claim `/v1/analyze` is production-stable until the failure is reproduced or otherwise explained and the repaired deployment passes controlled endpoint verification. Do not claim deception-detection validation from successful API execution.
