# VoxVector Runtime Memory Constraints

**Status:** Active runtime guidance  
**Updated:** 2026-09-10

This document owns VoxVector runtime resource-safety guidance. It records software execution and memory-containment evidence only. It is not scientific validation.

## Current constrained Render reference

The current VoxVector Render service is a single free web-service instance with a platform memory limit of approximately 512 MiB. VoxVector uses these source defaults as an operational reference:

- `VOXVECTOR_MEMORY_LIMIT_MB=512`
- `VOXVECTOR_MEMORY_HEADROOM_MB=96`
- effective process RSS admission ceiling: **416 MiB**

The VoxVector values do not change Render's platform limit. They are application-side guardrails intended to reject a new heavyweight phase before the process knowingly enters an unsafe headroom range.

## Incident history

### Earlier bounded-acoustic memory repair

Earlier Render failures established that full-recording frame/spectrum materialization could exceed the service memory budget. The canonical acoustic pipeline was changed to bounded frame groups while preserving the existing 25 ms frame size and 10 ms hop. A spectral feature dimension mismatch was also corrected by deriving frequency vectors from the actual FFT output width.

The API adapter offloads CPU-heavy canonical analysis through `asyncio.to_thread(...)` so it does not monopolize the FastAPI event loop. These are software/runtime fixes, not scientific method changes.

### September 1–2 recurring Render memory evidence

Render reported multiple `voxvector-api` failures in which service usage crossed the 512 MiB budget. A connected September 2 telemetry window sampled memory rising through roughly 95–198 MiB and later resetting after process/service disruption. Thirty-second provider telemetry did not capture every instantaneous peak, so those samples are not used as exact peak-memory proof.

### September 9 transcription-process failure

On historical revision `7d5a66fa406efde4abfd79361a4d589b5b75e6e0`, request `6bb7ec766d3e46f39462ef92c9929544` entered faster-whisper transcription for a 183.3-second WAV, loaded the `base` CPU/int8 model, and then lost the API process before provider completion/failure/timeout persistence. The contemporaneous Render memory-limit alert established an OOM-class failure for that incident.

PR #942 responded by restoring dependency order, converting the working source to float32, dropping the persisted byte buffer before speech execution, serializing heavyweight provider phases, and moving faster-whisper into a disposable spawned process with a hard deadline. PR #960 later corrected the constrained Render source profile from beam 3 to beam 1.

### September 10 beam-1 transcription success followed by confirmed memory exhaustion

The controlled production run on current deployed revision `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2` materially narrowed the remaining problem.

Case/runtime identifiers:

- case `3515362e-f801-463d-961a-df7b3302a596`
- source `cbdcdbf8-e528-49b0-a474-5cd64588d301`
- request `32fdb25aee704ee4ad0a0615e2496e09`
- source duration 183.3 seconds
- source size 17,596,936 bytes

Observed sequence:

1. source upload and private Supabase persistence succeeded;
2. speech segmentation completed with 26 segments;
3. faster-whisper ran with `base`, CPU, int8, beam 1, one CPU thread, one worker, isolated child process and a 165-second child deadline;
4. transcription completed in approximately 113 seconds with 58 transcript segments and 246 timestamped words;
5. parent-process memory telemetry reported approximately 134.75 MiB before post-provider cleanup completed;
6. the cleanup boundary then reported approximately 482.58 MiB parent RSS;
7. VoxVector's configured process admission ceiling was 416 MiB;
8. Stage 10 Acoustic Feature Extraction nevertheless started;
9. Render's 30-second service telemetry sampled 519,041,020 bytes against a 536,870,900-byte service limit during the same incident window;
10. the API process disappeared without a graceful application shutdown and Uvicorn was launched again shortly afterward.

The owner confirmed this run failed because of memory exhaustion. Render did not emit a dedicated kernel-level OOM/SIGKILL line for this exact run, so the precise operating-system termination mechanism is not separately asserted.

## Root cause identified in source

### Cleanup must not import an optional heavyweight framework

Before the active repair, `collect_after_heavy_phase()` performed `import torch` solely to inspect CUDA and clear its cache. On the CPU-only faster-whisper path this was unnecessary. Because the live Render service currently installs `api/requirements-speech.txt`, PyTorch is present through the local pyannote dependency stack. Importing it into the long-lived API process after the disposable transcription child exits defeats the purpose of reclaiming provider memory.

The active #941 / PR #962 repair changes cleanup to inspect `sys.modules` and use CUDA cleanup only when another runtime path has already loaded Torch. Cleanup itself must never import Torch.

### Stage 10 needs its own admission boundary

Provider-phase admission alone is insufficient. The September 10 failure showed that the downstream composite acoustic phase can be entered after memory has already exceeded the safe process threshold.

The active repair therefore calls `ensure_memory_headroom("pipeline:acoustic_feature_extraction")` **before** Stage 10 is marked running. If the process is already at or above the admission ceiling, Stage 10 is failed explicitly as an operational memory-admission rejection and dependent downstream stages are marked `not_run`. Completed upstream speech/transcript evidence remains intact.

This admission gate is a runtime-safety decision. It is not the scientific eligibility/reliability stage and must not be described as a scientific exclusion rule.

## Durable upstream checkpoint before downstream work

Successful provider work is expensive and must survive a later process failure.

The active #941 repair persists the same case/run after Stage 07/08 acquisition resolves and before Stage 10 admission. The checkpoint contains the actual acquisition artifact, transcript object, multimodal alignment, speaker list when available, provider timings, stage lifecycle, and non-secret provider state under the same run identity.

The corresponding operational diagnostic records only sanitized metadata such as provider state, segment count, word count and alignment availability. Raw transcript text is not written into operational logs merely to prove checkpoint completion.

If Stage 10 is refused or the process later fails, completed upstream artifacts remain available for case/run readback instead of being dependent on the final downstream result write.

## Process identity versus Render instance identity

`RENDER_INSTANCE_ID` is infrastructure identity. It is not guaranteed to change when Uvicorn/Python restarts inside the same Render service instance.

The active repair therefore defines:

- `process_instance_id`: fresh UUID generated at API process start;
- `render_instance_id`: Render-provided infrastructure identifier when available.

Case-run recovery compares the genuine process-start identity. This allows a new Python process to reconcile an orphaned run even when the Render instance label remains the same. Render instance identity remains useful as infrastructure provenance and is retained separately.

## Bounded audio processing

The primary pipeline processes frames in bounded groups of 256 frames and carries only compact feature streams plus the prior spectrum needed for spectral continuity. Evidence-acquisition speech detection follows the same principle: it computes frame RMS in bounded groups and retains only the one-dimensional activity stream required for segmentation.

The case route releases the persisted WAV byte buffer after integrity verification and converts the canonical working source to float32 before heavyweight speech execution.

## Constrained faster-whisper profile

The constrained source defaults are:

- `VOXVECTOR_TRANSCRIPTION_PROVIDER=faster_whisper`
- `VOXVECTOR_WHISPER_MODEL=base`
- `VOXVECTOR_WHISPER_DEVICE=cpu`
- `VOXVECTOR_WHISPER_COMPUTE_TYPE=int8`
- `VOXVECTOR_WHISPER_BEAM_SIZE=1`
- `VOXVECTOR_WHISPER_CPU_THREADS=1`
- `VOXVECTOR_WHISPER_NUM_WORKERS=1`
- `VOXVECTOR_WHISPER_ISOLATED_PROCESS=true`
- `VOXVECTOR_WHISPER_TIMEOUT_SECONDS=165`

These are operational resource settings and remain configurable for larger deployments. They are not deception-analysis parameters.

The September 10 controlled run proves this beam-1 profile can complete faster-whisper transcription for the tested 183.3-second WAV on the current deployed source. It does **not** prove the full pipeline is memory-safe after transcription. That is the active #941 gate.

## Isolated transcription process

When process isolation is enabled, the parent writes a normalized temporary WAV, starts the transcription child, waits no longer than the configured process deadline, and terminates/kills the child if necessary. Temporary input and IPC resources are cleaned up by the parent.

This gives VoxVector a provider process it can actually terminate. Render's memory limit still applies to the service/container as a whole, so child isolation reduces retained parent memory but does not create a separate 512 MiB allowance for each process.

## Heavy-phase cleanup rule

After heavyweight phases, VoxVector performs:

1. provider-owned release where implemented;
2. Python garbage collection;
3. best-effort Linux `malloc_trim(0)` where available;
4. CUDA cache clearing **only if Torch is already loaded in the parent process**.

Cleanup must never load a large optional runtime solely for the act of cleaning it.

## Runtime memory telemetry

`VoxVector/src/voxvector/runtime_memory.py` exposes current Linux process RSS and emits `VOXVECTOR_MEMORY` records around measured heavyweight provider phases. Records include phase, elapsed time, RSS before/after, post-cleanup RSS and the configured memory reference when available.

Render service metrics remain separate infrastructure evidence. Application RSS and Render container/service memory are related but not interchangeable measurements.

## Request limits

Current API safeguards include:

- application upload maximum from `VOXVECTOR_MEDIA_MAX_BYTES`, default 250 MB;
- maximum sample rate 48,000 Hz;
- initial analysis media format PCM WAV;
- no general application duration cutoff.

The upload maximum is a transport limit, not proof that a maximum-size recording can safely traverse every analytical/provider stage on a 512 MiB service.

## Render dependency/Blueprint drift

Canonical root `render.yaml` currently uses:

`pip install -r api/requirements.txt && pip install -r api/requirements-transcription.txt`

The connected live Render service currently reports:

`pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`

The latter installs local `pyannote.audio` and its PyTorch stack. The production primary diarization implementation is `pyannote_api`, which uses the cloud API and does not require local Community-1/Torch merely to call the primary provider.

This is an infrastructure configuration drift, not an application execution result. It is tracked separately in #964. The Render-generated Blueprint export must be reconciled into the existing canonical root `render.yaml`; a second Blueprint must not be added.

## Required verification for #941

Before the active repair is considered production-resolved:

1. final PR #962 head must pass focused backend tests and full exact-head VoxVector QA;
2. affected documentation and audit records must match that exact head;
3. the reviewed revision must be merged before production deployment;
4. an approved Render deployment must be shown `live` on the intended source revision;
5. fresh `/health` must show the exact source, beam-1 settings, separate process/Render instance identities and memory admission reference;
6. the same controlled WAV must be run again;
7. faster-whisper must complete or fail within its explicit bound without an API process restart;
8. upstream transcript/alignment/provider state must be read back from durable case storage before downstream success is assumed;
9. Stage 10 must either be admitted and complete safely or be refused explicitly by memory admission without process loss;
10. Render memory, instance and application-process evidence must be correlated to the same request;
11. authenticated browser verification remains separate from backend runtime verification.

## Scientific boundary

Memory containment, transcription process isolation, transcript persistence and pipeline recovery are software-engineering properties. They do not validate any vocal feature as a deception indicator, do not calibrate a deception probability and do not change the required separation among eligibility/reliability, evidence collection, candidate classification and final disposition.
