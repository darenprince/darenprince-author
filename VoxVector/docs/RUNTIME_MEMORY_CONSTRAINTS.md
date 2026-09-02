# VoxVector Runtime Memory Constraints

**Status:** Active runtime guidance
**Updated:** 2026-09-02

## Incidents

The initial Render Free deployment successfully started the FastAPI service and passed `/health`, but `/v1/analyze` could terminate the instance when processing a larger WAV. Render reported that the instance exceeded its 512 MB memory ceiling.

The cause was identified in the canonical analysis pipeline: overlapping audio frames and FFT spectra were being materialized for the entire recording at once.

After bounded framing was deployed, the API remained healthy but analysis exposed a separate spectral feature dimension mismatch: an FFT spectrum width and its frequency vector could diverge, producing a matrix multiplication error such as `size 258 is different from 601`.

A subsequent runtime fingerprinting change caused a Render deployment to exit before Uvicorn became available. The deployment failure was isolated to the wrapper's boot-time self-test behavior rather than the canonical spectral implementation. The wrapper now performs the same self-test without terminating the worker at import time and exposes the result through `/health`; `/v1/analyze` refuses analysis with HTTP 503 if that runtime self-test fails.

On 2026-08-20, the known 17 MB, 48 kHz WAV regression fixture reached the deployed API successfully and completed the decode stage. The diagnostic record reported 17,597,131 request bytes, 17,596,936 decoded bytes, 8,798,400 samples, and approximately 183.3 seconds of audio. The worker then restarted before an `analysis_pipeline` completion or application exception was emitted. This indicates a runtime termination during the CPU-heavy analysis stage; the supplied logs do not by themselves prove whether the termination was OOM or another host-level restart mechanism.

The same deployment showed Render health checks succeeding before analysis and then the process restarting during analysis. The HTTP adapter was executing the CPU-heavy pipeline directly inside the FastAPI async request handler, which can starve the event loop while long-running Python/NumPy analysis executes. The adapter has therefore been changed to offload the analysis call with `asyncio.to_thread(...)`, while `/health` is now an async handler. This keeps the event loop available for health probes and lifecycle diagnostics during long recordings.

## September 2026 Render incident evidence

Render subsequently reported repeated instance failures for `voxvector-api` with the explicit message that the instance **used over 512 MB**. The incident screenshots show separate failures on September 1 at approximately 7:54 PM and 8:09 PM, each followed by service recovery. A separate deployment at approximately 2:49 PM failed waiting for the internal health check. These events establish recurring production resource/startup incidents rather than a single isolated restart.

The captured Render memory telemetry around the September 2 investigation window showed a rise from approximately 94.9 MB to 193.5 MB, 197.0 MB, 198.3 MB, and 198.5 MB before a sharp drop to 73.6 MB and later stabilization near 93 MB. Because Render's service message records actual usage above 512 MB while the captured metric resolution was 30 seconds, the observed series is consistent with a short-lived peak or lifecycle reset that the sampled series did not resolve precisely.

The same incident evidence included slow `/v1/cases` requests of approximately 10.35 seconds and 8.11 seconds. Those requests are tracked as separate reliability signals and are not attributed to the memory failures without additional correlation.

## Resolutions

VoxVector processes its primary analysis frames in bounded chunks of 256 frames while preserving the existing 25 ms frame size and 10 ms hop. Spectral state is also carried between chunks rather than retaining a full-recording spectrum matrix.

The evidence-acquisition speech/silence detector now uses the same bounded-frame principle. It no longer materializes a complete frame matrix for the entire recording before calculating RMS. It evaluates bounded frame groups and retains only the compact one-dimensional RMS stream needed for segmentation.

Speech-provider execution is serialized through a process-local heavyweight-phase guard so concurrent transcription and diarization work does not unnecessarily compete for the same constrained memory budget. Provider model caches are explicitly cleared after each provider attempt, followed by garbage collection and best-effort Linux allocator trimming.

The faster-whisper adapter uses `base` rather than `small` as its default model on the constrained CPU runtime and reduces the default beam size from 5 to 3. Both values remain configurable through environment variables so a deployment with a larger memory budget can select a different profile.

Runtime memory telemetry is emitted around heavyweight provider phases using current Linux process RSS when available. Each phase records elapsed time and before/after RSS, followed by an explicit cleanup boundary. The telemetry is intentionally plain `VOXVECTOR_MEMORY` output so it remains visible in Render logs without adding another runtime dependency.

The API wrapper continues to run the CPU-heavy canonical pipeline through `asyncio.to_thread(...)`. No arbitrary API file-size or duration limit has been added as a substitute for fixing the underlying memory behavior.

A **48 kHz maximum sample rate** remains an analysis-format constraint because the current decoder/runtime explicitly guards against unsupported sample rates.

## Current request limits

- Application-level maximum upload size: **none**
- Maximum sample rate: 48,000 Hz
- Initial format: PCM WAV
- Application-level duration cutoff: **none**

Infrastructure or hosting providers may impose their own transport/request limits independently; those are deployment constraints, not VoxVector product limits, and must not be represented in the API contract as an arbitrary file-size ceiling.

## Verification requirement

A deployment is not considered memory-safe solely because the service starts. The following checks are required after deployment:

- `GET /health` returns success.
- `/health` reports the expected canonical package path and runtime self-test result.
- health checks remain responsive while analysis is running.
- the known 17 MB WAV fixture completes without worker termination.
- bounded speech acquisition does not materialize a full-recording frame matrix.
- repeated provider attempts release their cache references.
- `VOXVECTOR_MEMORY` lines report runtime RSS around heavy provider phases when running on Linux.
- controlled faster-whisper execution reports actual transcript/timestamp output and measured provider duration.
- controlled pyannote Community-1 execution reports actual speaker-turn output and measured provider duration.
- Render memory/CPU telemetry is captured before, during, and after provider execution.
- repeated sequential provider execution is profiled for retained memory growth.
- the result preserves provenance and the expected observational disposition.
- no deception probability is fabricated.

## Scientific and architectural boundary

These are runtime correctness and resource-management changes only. They do not promote any analytical method to validated deception inference and do not change the required separation between:

1. eligibility and reliability;
2. evidence collection and analysis;
3. candidate classification;
4. final classification or disposition.

The pipeline remains observational and the current guarded classification boundary remains unchanged.

## Deployment note

The canonical HTTP adapter is `api/app.py`. The Render service uses `VoxVector/` as its application/deployment root and starts `api.app:app`. The heavy speech runtime remains a separate dependency profile so the base API installation stays lightweight. The active constrained-runtime profile is designed to minimize model residency and temporary array amplification on a 512 MB service.
