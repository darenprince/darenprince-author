# VoxVector Runtime Memory Constraints

**Status:** Active runtime guidance
**Updated:** 2026-09-09

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

### 2026-09-09 transcription OOM incident

Connected Render logs for production revision `7d5a66fa406efde4abfd79361a4d589b5b75e6e0` show analysis request `6bb7ec766d3e46f39462ef92c9929544` entering `transcription_generation` at `09:36:46Z` for a 183.3 second WAV. faster-whisper started with the `base` model on CPU/int8 and logged model load at `09:36:48Z`. No transcription progress, completion, failure, or timeout record followed. Render started the Uvicorn command again at `09:37:05Z` and a new server process at `09:37:11Z`; the user simultaneously received Render's memory-limit automatic-restart alert.

This incident demonstrates that an in-process `asyncio.wait_for(asyncio.to_thread(...))` deadline is not sufficient containment for heavyweight native ASR work. A process-level OOM can terminate the API before the coroutine timeout handler persists a terminal stage state, and a cancelled coroutine cannot terminate native work already executing in a Python thread.

The repair in PR #942 therefore changes the local faster-whisper boundary and orchestration before any production claim is made. This is software reliability evidence, not scientific validation.

## Runtime efficiency strategy

### Bounded audio processing

The primary pipeline processes frames in bounded groups of 256 frames and carries only compact feature streams plus the prior spectrum needed for spectral continuity. The evidence-acquisition speech detector follows the same principle: it computes frame RMS in bounded groups and retains only the one-dimensional RMS stream needed for segmentation.

The case-analysis route now releases the persisted WAV byte buffer after integrity verification and retains the canonical working signal as `float32` before entering heavyweight speech execution. Downstream composite acoustic analysis runs only after the upstream speech/evidence acquisition boundary has finished or failed, reducing avoidable overlap between ASR model memory and downstream DSP working sets.

### Heavy provider serialization and release

Configured faster-whisper and pyannote provider phases are serialized so the constrained worker does not intentionally load both heavy provider families concurrently. Each provider exposes an explicit release path that clears process-level model caches after the provider attempt completes, including after provider failure. The heavy-phase boundary then performs Python garbage collection and best-effort Linux allocator trimming where applicable.

### Constrained Whisper profile

The constrained runtime defaults are:

- `VOXVECTOR_WHISPER_MODEL=base`
- `VOXVECTOR_WHISPER_DEVICE=cpu`
- `VOXVECTOR_WHISPER_COMPUTE_TYPE=int8`
- `VOXVECTOR_WHISPER_BEAM_SIZE=1`
- `VOXVECTOR_WHISPER_CPU_THREADS=1`
- `VOXVECTOR_WHISPER_NUM_WORKERS=1`
- `VOXVECTOR_WHISPER_ISOLATED_PROCESS=true`
- `VOXVECTOR_WHISPER_TIMEOUT_SECONDS=165`

These remain environment-configurable for larger deployments. The constrained defaults are an operational resource profile, not an analytical or scientific setting.

### Isolated transcription process and hard deadline

When `VOXVECTOR_WHISPER_ISOLATED_PROCESS=true`, faster-whisper executes in a disposable spawned process. The parent process writes the normalized WAV input to a temporary file, starts the child, waits no longer than `VOXVECTOR_WHISPER_TIMEOUT_SECONDS`, and terminates then kills the child if necessary. The temporary WAV is removed in the parent cleanup path.

This boundary gives VoxVector a process it can actually terminate when native ASR work exceeds the configured deadline. It also allows model memory to be reclaimed when the child exits instead of depending only on a long-lived API worker cache. Render's memory limit remains a cgroup/service limit across parent and child processes, so this design reduces retained/overlapping memory but does not itself prove that every input will stay below the platform ceiling. Production verification must still correlate real provider execution with Render memory and instance lifecycle telemetry.

### Interrupted-run reconciliation

New persisted case runs carry `process_instance_id` plus the active stage and configured stage timeout. `GET /v1/cases/{case_id}` reconciles a persisted `running` run into an explicit failed/interrupted state when the owning process identity has changed, when a persisted stage deadline plus grace period has expired, or when a legacy run without process identity exceeds the stale-run recovery threshold.

This prevents an API restart or OOM from leaving the user interface indefinitely displaying `Running`. Reconciliation records the reason and process identity transition; it does not claim the failed provider completed.

### Memory admission control

Before a heavyweight provider phase starts, VoxVector checks current process RSS against a configurable admission threshold:

- `VOXVECTOR_MEMORY_LIMIT_MB=512`
- `VOXVECTOR_MEMORY_HEADROOM_MB=96`
- effective admission threshold: **416 MiB**

If current measured RSS is already at or above the admission threshold, the next heavy phase is rejected instead of knowingly entering the remaining platform headroom. This is a protective operational gate, not a scientific eligibility or analysis gate.

### Runtime memory telemetry

`VoxVector/src/voxvector/runtime_memory.py` provides current Linux process RSS measurement and `VOXVECTOR_MEMORY` log records around heavyweight phases. Each record includes the phase name, elapsed time, RSS before/after, and the configured memory reference. Cleanup is recorded after provider cache release.

The telemetry module deliberately avoids a new runtime dependency and degrades to unavailable measurements on non-Linux platforms.

## Current request limits

- Application-level maximum upload size: configured by `VOXVECTOR_MEDIA_MAX_BYTES` and currently defaults to 250 MB in the API adapter.
- Maximum sample rate: 48,000 Hz
- Initial format: PCM WAV
- Application-level duration cutoff: none

The upload ceiling is a transport-safety guard and does not imply that a maximum-size upload is safe to decode or analyze entirely in RAM. The current deployment must continue to be validated against representative media sizes and provider execution profiles before increasing concurrency or service workload. It is not a scientific constraint.

## Verification requirement

A deployment is not considered memory-safe solely because the service starts. Required checks include:

- `/health` remains responsive during analysis;
- the known 183.3 second incident WAV does not terminate the API worker;
- speech acquisition uses bounded frame groups;
- the transcription child process exits on success, provider failure, or configured deadline;
- provider caches are empty after provider attempts where those caches exist;
- `VOXVECTOR_MEMORY` records actual RSS around heavyweight phases;
- faster-whisper reports actual transcript segments and timestamps or reaches an explicit bounded failure;
- pyannote reports actual speaker turns when invoked;
- repeated sequential provider executions are profiled for retained memory growth;
- Render CPU/memory and instance lifecycle telemetry is correlated with provider execution;
- interrupted persisted runs are reconciled rather than left `running` forever;
- persisted transcript, speaker, and alignment artifacts can be read back under the case/run identity;
- no deception probability or confidence value is fabricated.

## Scientific and architectural boundary

These are runtime correctness, resource-management, and observability changes only. They do not promote any analytical method to validated deception inference and do not change the required separation between eligibility/reliability, evidence collection/analysis, candidate classification, and final disposition.

## Deployment note

The canonical HTTP adapter is `VoxVector/api/app.py`. Render uses `VoxVector/` as its application/deployment root and starts `api.app:app`. Heavy speech dependencies remain in `api/requirements-speech.txt` so the base dependency set remains lightweight. The constrained speech runtime is treated as a measured resource profile, not as a reason to invent a scientific limitation.

The September 9 repair is not production evidence until the approved revision is merged, deliberately deployed through the existing manual/deploy-hook path, `/health` reports that exact source revision, and a controlled real-audio provider execution demonstrates bounded completion/failure without an API OOM restart.

## 2026-09-05 case archive latency debugging

Live Render diagnostics reproduced severe latency on authenticated `GET /v1/cases` requests, including observed successful responses around 69–87 seconds during concurrent archive refresh activity. The route was completing with HTTP 200 rather than failing, which explains refresh controls appearing to spin for a long time.

Root cause identified in the canonical storage projection: the case archive listed storage object metadata and then fetched every case JSON payload sequentially. Each Supabase Storage round trip accumulated into the user-visible request duration.

Mitigation implemented in `api/case_store.py`: archive payload reads now use a bounded pool of up to eight concurrent storage reads, preserving owner filtering and updated-time sorting while removing sequential round-trip amplification. Regression coverage was added in `tests/test_case_store.py` for archive ownership and ordering.

A Render deploy of commit `03fadc1a12c53882942d4270c602c6ba90673164` was explicitly triggered because the production service has auto-deploy disabled. Runtime latency improvement remains pending post-deploy measurement and must not be considered verified until new production diagnostics are observed.
