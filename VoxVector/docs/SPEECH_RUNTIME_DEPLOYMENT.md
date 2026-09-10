# VoxVector Speech Runtime Deployment

**State date:** 2026-09-10

## Purpose

Deploy and operate the VoxVector speech-intelligence runtime without weakening the canonical backend boundary or exhausting the constrained Render memory budget.

This document separates source configuration, provider readiness, actual provider execution, persistence and production verification.

## Runtime components

Current architecture supports:

- faster-whisper for transcription;
- pyannoteAI cloud through `pyannote_api` as the current primary speaker-diarization provider;
- local pyannote Community-1 through `pyannote_local` as an optional explicit fallback;
- VoxVector-owned speech segmentation, normalized evidence contracts and timestamp alignment.

Provider configuration is not provider execution. A provider output is not scientific validation.

## Canonical Render service boundary

Render application root:

`VoxVector`

Start command:

`uvicorn api.app:app --host 0.0.0.0 --port $PORT`

Health route:

`/health`

Production auto-deploy remains disabled. Deliberate deployment verification is required after an approved merge.

## Current Render Blueprint/configuration drift

Git already contains the sole canonical VoxVector Blueprint at repository root `render.yaml`. Do not add the downloaded Render-generated Blueprint export as a second file or a second service owner.

Current repository Blueprint build command:

`pip install -r api/requirements.txt && pip install -r api/requirements-transcription.txt`

Current connected live Render service build command:

`pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`

The two are not the same configuration.

`api/requirements-transcription.txt` installs faster-whisper only. `api/requirements-speech.txt` also installs local `pyannote.audio`, bringing the local PyTorch stack into the service image. The canonical production primary diarization adapter is `pyannote_api`, which performs cloud API calls and does not require loading local Community-1/Torch merely to use the primary provider.

Issue #964 owns the infrastructure-as-code reconciliation. It must update the existing root `render.yaml`, preserve secret values outside Git, keep reproducible non-secret runtime constraints in Git where supported, and verify that the existing Render service is updated rather than provisioning a duplicate service.

A Blueprint commit or Render configuration update is not provider execution.

## Required transcription configuration

Current constrained source profile:

```text
VOXVECTOR_TRANSCRIPTION_PROVIDER=faster_whisper
VOXVECTOR_WHISPER_MODEL=base
VOXVECTOR_WHISPER_DEVICE=cpu
VOXVECTOR_WHISPER_COMPUTE_TYPE=int8
VOXVECTOR_WHISPER_BEAM_SIZE=1
VOXVECTOR_WHISPER_CPU_THREADS=1
VOXVECTOR_WHISPER_NUM_WORKERS=1
VOXVECTOR_WHISPER_ISOLATED_PROCESS=true
VOXVECTOR_WHISPER_TIMEOUT_SECONDS=165
```

The process deadline is intentionally shorter than the outer provider-acquisition deadline so the isolated child can return a bounded provider failure before route-level timeout.

## Required primary diarization configuration

Current primary:

```text
VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api
PYANNOTE_KEY=<protected deployment secret>
VOXVECTOR_ENABLE_DIARIZATION_RUNS=true
```

`PYANNOTE_API_KEY` is also accepted as the cloud-key alias.

The route invocation gate is separate from provider readiness. `/health` may report the configured cloud adapter ready while the case path still does not invoke diarization if `VOXVECTOR_ENABLE_DIARIZATION_RUNS` is disabled.

## Optional local fallback

Explicit fallback configuration:

```text
VOXVECTOR_DIARIZATION_FALLBACK=pyannote_local
VOXVECTOR_DIARIZATION_FALLBACK_ENABLED=true
HF_TOKEN=<protected Hugging Face token>
```

`HUGGINGFACE_TOKEN` is also accepted by the local adapter. Community-1 is not the current primary production target. Local fallback execution must not be represented as cloud-primary verification.

## Memory reference

Current application reference:

```text
VOXVECTOR_MEMORY_LIMIT_MB=512
VOXVECTOR_MEMORY_HEADROOM_MB=96
```

Effective application admission ceiling on that reference is 416 MiB RSS. These variables do not alter Render's actual service limit.

## Current production execution evidence

The September 10 controlled run on deployed revision `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2` established that the corrected beam-1 transcription path can execute successfully.

Case `3515362e-f801-463d-961a-df7b3302a596`, source `cbdcdbf8-e528-49b0-a474-5cd64588d301`, request `32fdb25aee704ee4ad0a0615e2496e09`:

- 183.3-second WAV;
- speech segmentation completed with 26 segments;
- faster-whisper ran as `base` / CPU / int8 / beam 1 / one thread / one worker / isolated child;
- transcription completed in about 113 seconds;
- 58 timestamped segments and 246 timestamped words were produced;
- language was reported as `en`.

This closes the earlier question of whether the beam-1 provider path can run at all on the deployed service for that fixture. It does not close #941 because the API subsequently failed from post-transcription memory exhaustion before a safe downstream completion.

## Post-transcription memory failure and active repair

During the same run, parent RSS was approximately 134.75 MiB before post-provider cleanup and approximately 482.58 MiB after cleanup. Stage 10 then started even though the configured admission ceiling was 416 MiB. Render sampled 519,041,020 bytes during the incident against a 536,870,900-byte service limit, and Uvicorn restarted shortly afterward. The owner confirmed the failure was a memory problem.

The active #941 / draft PR #962 repair changes the deployment/runtime behavior expected after merge:

1. `collect_after_heavy_phase()` must never import Torch merely to perform cleanup;
2. Stage 10 must pass an explicit process-memory admission check before being marked running;
3. successful provider acquisition, transcript, alignment and provider timings must be checkpointed durably before downstream Stage 10 work;
4. `process_instance_id` must be a fresh Python-process UUID while `render_instance_id` remains separate infrastructure provenance;
5. the case route must retain the same canonical run identity through finalization, with any internal pipeline result identifier stored separately.

These are source changes until merged and deployed. Do not describe them as current production execution yet.

## Memory-safe execution behavior

### Source decoding and working representation

The case route retrieves the private persisted WAV, verifies SHA-256 provenance, performs channel/recording assessment, converts the working audio to float32 and releases the original persisted byte buffer before heavyweight provider execution.

### Bounded speech segmentation

Speech activity extraction processes bounded frame groups and retains compact timing state rather than a full-recording frame matrix.

### Isolated faster-whisper process

With process isolation enabled, faster-whisper executes in a spawned disposable child. The parent creates a temporary normalized WAV, starts the child, waits only to the configured provider deadline, terminates/kills the child if required, closes IPC state and removes the temporary file.

This controls provider lifetime and lets child model memory disappear when the process exits. Render's service memory ceiling still applies across parent and child processes.

### Cleanup rule

After a heavy provider phase, VoxVector performs provider release, Python garbage collection and best-effort Linux allocator trimming. The active repair permits CUDA cache clearing only if Torch is already loaded by another runtime path. Cleanup must not import Torch just to ask whether CUDA exists.

### Downstream memory admission

The active repair applies `ensure_memory_headroom("pipeline:acoustic_feature_extraction")` before Stage 10 is represented as running. If the current process is already at or above the configured admission ceiling, VoxVector must persist a bounded Stage 10 failure and mark dependent downstream stages `not_run` while keeping upstream speech/transcript artifacts.

Memory admission is operational resource protection, not the scientific Eligibility and Reliability stage.

## Durable provider checkpoint

After provider acquisition resolves and Stage 07/08 lifecycle state is known, the active repair persists an upstream checkpoint to the same case/run before downstream analysis.

The checkpoint includes:

- normalized acquisition object;
- transcript artifact when available;
- multimodal alignment when available;
- speaker list when available;
- provider state and provider timings;
- stage lifecycle state;
- process and Render instance provenance.

Operational logs emitted for checkpoint completion contain only sanitized state/count metadata. They do not copy raw transcript text into diagnostics.

## Process and infrastructure identity

After the active repair:

- `process_instance_id` is a new UUID created when the Python API process starts;
- `render_instance_id` is the Render infrastructure instance identifier when present.

This distinction is required because Uvicorn may restart inside the same Render instance. Run reconciliation must detect Python process replacement even when the infrastructure label is unchanged.

## `/health` verification

The safe health contract reports non-secret runtime state. After #941 is merged/deployed it must expose:

- exact source revision;
- backend/pipeline version;
- process instance UUID;
- Render instance identifier separately;
- transcription provider and beam/thread/worker/process settings;
- diarization provider/readiness without credential values;
- media/diagnostic storage readiness;
- memory reference and admission ceiling;
- runtime self-test state.

Health readiness does not prove an analysis invoked a provider.

## Current controlled verification sequence

The next production verification after #941 source acceptance is:

1. confirm final PR #962 exact-head QA;
2. merge only the reviewed exact head;
3. deliberately deploy that merged revision to Render;
4. verify Render reports the intended exact source as `live`;
5. capture fresh `/health` and confirm beam 1, process-vs-Render identity separation and memory admission reference;
6. rerun the same 183.3-second controlled WAV through the authenticated case path;
7. verify faster-whisper again completes or fails inside its explicit bound without API process loss;
8. read the upstream transcript/alignment/provider checkpoint from durable case storage before depending on downstream completion;
9. verify Stage 10 is admitted only below the safe threshold and either completes or returns a bounded admission failure without restart;
10. correlate Render service memory/instance lifecycle with application process and request identifiers;
11. only after transcription reliability is stable, execute the cloud-primary pyannoteAI diarization gate and persist/read back speaker provenance;
12. perform authenticated desktop/mobile browser verification separately.

## Related work

- #941 / draft PR #962: active post-transcription memory containment and provider checkpoint repair;
- #959 / draft PR #961: dual Render/Supabase speech and diagnostic persistence, parent correlation and Debug Bundle;
- #963: historical-case playback/transcript rehydration after backend checkpoint ownership is stable;
- #964: canonical Render Blueprint reconciliation;
- #920: protected Developer Console Deploy Now path verification.

## Scientific boundary

Successful transcription establishes that a speech provider executed and returned an artifact. It does not establish transcript truthfulness, speaker identity, deception inference, calibration or scientific validity. Speech/provider reliability remains separate from VoxVector's target-condition validation program.
