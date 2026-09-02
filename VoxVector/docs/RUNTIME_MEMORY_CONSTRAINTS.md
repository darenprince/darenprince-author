# VoxVector Runtime Memory Constraints

**Status:** Active runtime guidance
**Updated:** 2026-09-02

## Incidents

The initial Render Free deployment successfully started the FastAPI service and passed `/health`, but `/v1/analyze` could terminate the instance when processing a larger WAV. Render reported that the instance exceeded its 512 MB memory ceiling.

The original peak-memory cause was identified in the canonical analysis pipeline: overlapping audio frames and FFT spectra were materialized for the entire recording at once. The primary pipeline was subsequently changed to bounded frame chunks while preserving the existing 25 ms frame size and 10 ms hop.

A separate spectral feature dimension mismatch was corrected by deriving the frequency vector from the actual FFT output width.

The HTTP adapter now offloads the CPU-heavy canonical analysis call through `asyncio.to_thread(...)` so long-running analysis does not monopolize the FastAPI event loop.

## September 2026 recurring OOM evidence

Render subsequently reported multiple `voxvector-api` instance failures with the explicit message that the process **used over 512 MB**. The user-provided Render dashboard screenshots show separate failures on September 1 at approximately 7:54 PM and 8:09 PM, each followed by service recovery. A separate deployment at approximately 2:49 PM failed while waiting for the internal health check.

The connected Render observability workflow captured a September 2 incident window in which sampled memory rose from approximately 94.9 MB to 193.5 MB, 197.0 MB, 198.3 MB, and 198.5 MB before dropping abruptly to 73.6 MB and later stabilizing near 89–93 MB. The 30-second sampling did not resolve the instantaneous peak, while the Render instance events separately establish that actual usage crossed the 512 MB service budget.

The same runtime period contained slow `/v1/cases` requests of approximately 10.35 seconds and 8.11 seconds. Those are tracked as separate reliability signals and are not attributed to the OOM without further correlation.

Raw incident evidence was captured as GitHub Actions artifact `9829899743` from workflow run `33585450916`.

## Runtime efficiency strategy

### Bounded audio processing

The primary pipeline processes frames in bounded groups of 256 frames and carries only compact feature streams plus the prior spectrum needed for spectral continuity. The evidence-acquisition speech detector follows the same principle: it computes frame RMS in bounded groups and retains only the one-dimensional RMS stream needed for segmentation.

### Heavy provider serialization and release

Configured faster-whisper and pyannote provider phases are serialized with a process-local lock so the constrained worker does not intentionally load both heavy provider families concurrently. Each provider exposes an explicit release path that clears its process-level model cache after the provider attempt completes, including after provider failure. The heavy-phase boundary then performs Python garbage collection and best-effort Linux allocator trimming.

### Constrained Whisper profile

The constrained runtime default is:

- `VOXVECTOR_WHISPER_MODEL=base`
- `VOXVECTOR_WHISPER_DEVICE=cpu`
- `VOXVECTOR_WHISPER_COMPUTE_TYPE=int8`
- `VOXVECTOR_WHISPER_BEAM_SIZE=3`

These remain environment-configurable for larger deployments.

### Runtime memory telemetry

`VoxVector/src/voxvector/runtime_memory.py` provides current Linux process RSS measurement and `VOXVECTOR_MEMORY` log records around heavyweight phases. Each record includes the phase name, elapsed time, RSS before/after, and the configured memory reference. Cleanup is recorded after provider cache release.

The telemetry module deliberately avoids a new runtime dependency and degrades to unavailable measurements on non-Linux platforms.

## Current request limits

- Application-level maximum upload size: configured by `VOXVECTOR_MEDIA_MAX_BYTES` and currently defaults to 250 MB in the API adapter.
- Maximum sample rate: 48,000 Hz
- Initial format: PCM WAV
- Application-level duration cutoff: none

The upload ceiling is a transport-safety guard and must be evaluated against the actual Render service memory budget before enabling larger runtime workloads. It is not a scientific constraint.

## Verification requirement

A deployment is not considered memory-safe solely because the service starts. Required checks include:

- `/health` remains responsive during analysis;
- the known long WAV fixture does not terminate the worker;
- speech acquisition uses bounded frame groups;
- provider caches are empty after provider attempts;
- `VOXVECTOR_MEMORY` records actual RSS around heavyweight phases;
- faster-whisper reports actual transcript segments and timestamps;
- pyannote reports actual speaker turns;
- repeated sequential provider executions are profiled for retained memory growth;
- Render CPU/memory and instance lifecycle telemetry is correlated with provider execution;
- persisted transcript, speaker, and alignment artifacts can be read back under the case/run identity;
- no deception probability or confidence value is fabricated.

## Scientific and architectural boundary

These are runtime correctness, resource-management, and observability changes only. They do not promote any analytical method to validated deception inference and do not change the required separation between eligibility/reliability, evidence collection/analysis, candidate classification, and final disposition.

## Deployment note

The canonical HTTP adapter is `VoxVector/api/app.py`. Render uses `VoxVector/` as its application/deployment root and starts `api.app:app`. Heavy speech dependencies remain in `api/requirements-speech.txt` so the base dependency set remains lightweight. The constrained speech runtime is treated as a measured resource profile, not as a reason to invent a scientific limitation.
