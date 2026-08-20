# VoxVector Runtime Memory Constraints

**Status:** Active runtime guidance
**Updated:** 2026-08-19

## Incidents

The initial Render Free deployment successfully started the FastAPI service and passed `/health`, but `/v1/analyze` could terminate the instance when processing a larger WAV. Render reported that the instance exceeded its 512 MB memory ceiling.

The cause was identified in the canonical analysis pipeline: overlapping audio frames and FFT spectra were being materialized for the entire recording at once.

After bounded framing was deployed, the API remained healthy but analysis exposed a separate spectral feature dimension mismatch: an FFT spectrum width and its frequency vector could diverge, producing a matrix multiplication error such as `size 258 is different from 601`.

A subsequent runtime fingerprinting change caused a Render deployment to exit before Uvicorn became available. The deployment failure was isolated to the wrapper's boot-time self-test behavior rather than the canonical spectral implementation. The wrapper now performs the same self-test without terminating the worker at import time and exposes the result through `/health`; `/v1/analyze` refuses analysis with HTTP 503 if that runtime self-test fails.

## Resolutions

VoxVector now processes audio frames in bounded chunks of 256 frames while preserving the existing 25 ms frame size and 10 ms hop.

The expensive frame and spectrum matrices are therefore bounded. Compact one-dimensional feature streams are retained for the existing observational summaries, prosodic dynamics, pause topology, baseline comparisons, and evidence construction.

Spectral flux preserves continuity across chunk boundaries by carrying only the final spectrum from the preceding chunk into the next flux calculation.

Spectral centroid and spread now derive their frequency vector directly from the actual FFT output width. This makes the matrix/vector dimensions explicit and prevents the observed 258/601 mismatch. Regression tests cover both the 514-sample analysis frame size and a 1200-sample frame.

The API wrapper explicitly places `VoxVector/src` before the API namespace package so the canonical `voxvector` implementation cannot be silently shadowed by a same-named wrapper package. The wrapper also reports the loaded acoustic and pipeline module paths and SHA-256 fingerprints through `/health`.

The HTTP adapter no longer imposes an application-level file-size limit or an artificial duration cutoff. Upload capacity should not silently change the product contract. Resource protection belongs in the streaming/upload infrastructure and bounded analysis pipeline rather than an arbitrary API file-size ceiling.

A **48 kHz maximum sample rate** remains an analysis-format constraint because the current decoder/runtime explicitly guards against unsupported sample rates.

## Current request limits

- Application-level maximum upload size: **none**
- Maximum sample rate: 48,000 Hz
- Initial format: PCM WAV
- Application-level duration cutoff: **none**

`GET /health` exposes only the active sample-rate constraint under `analysis_limits`.

Infrastructure or hosting providers may impose their own transport/request limits independently; those are deployment constraints, not VoxVector product limits, and must not be represented in the API contract as an arbitrary file-size cap.

## Scientific and architectural boundary

These are runtime correctness and resource changes only. They do not promote any analytical method to validated deception inference and do not change the required separation between:

1. eligibility and reliability;
2. evidence collection and analysis;
3. candidate classification;
4. final classification or disposition.

The pipeline remains observational and returns `insufficient_evidence` for an otherwise eligible recording when no validated final inference gate is available.

## Verification requirement

A deployment is not considered verified solely because the service starts. The following checks are required after deployment:

- `GET /health` returns success.
- `/health` reports the expected canonical package path.
- `/health` reports the expected acoustic module path and runtime self-test result.
- `/health` reports the active sample-rate constraint.
- `/v1/analyze` accepts the known 17 MB WAV regression fixture.
- The service remains alive during analysis.
- Spectral feature dimensions remain aligned for the deployed sample rate/frame size.
- The result includes provenance and the expected observational disposition.
- Unsupported sample rates are rejected without killing the worker.
- No deception probability is fabricated.

## Deployment note

The canonical HTTP adapter is `api/app.py`. The Render service is configured by the repository deployment configuration and imports the canonical engine from `VoxVector/src/voxvector`. `VoxVector/` is the canonical application and deployment root.
