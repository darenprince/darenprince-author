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

## Current source and deployment boundary

Canonical GitHub `main` is `420536771875c6948be51851118b58cb04a596e6`, the merge of PR #967. Exact-main VoxVector QA `34532394431` succeeded. GitHub Pages publication workflow `34532394423` also succeeded for that source.

Current Render service:

- service `voxvector-api` / `srv-da2f88n40ujc73a8m26g`;
- root `VoxVector`;
- region Oregon;
- plan free;
- auto-deploy disabled;
- deploy `dep-dahi2ics728c73b6ujug`;
- deploy status `live`;
- exact deployed source `420536771875c6948be51851118b58cb04a596e6`;
- deploy trigger `api`;
- deploy finished `2026-09-10T21:36:23.3655Z`;
- start command `uvicorn api.app:app --host 0.0.0.0 --port $PORT`;
- health path `/health`.

No fresh `/health` response for exact deployed `420536...` is recorded by this synchronization pass. Render `live` is not a substitute for runtime readback.

## Current Render Blueprint/configuration drift

Git already contains the sole canonical VoxVector Blueprint at repository root `render.yaml`. Do not add the owner-provided Render-generated project export as a second file or second service owner.

Current repository Blueprint build command:

`pip install -r api/requirements.txt && pip install -r api/requirements-transcription.txt`

Current connected live Render service build command:

`pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`

The owner-provided Render export generated `2026-09-10T21:38:48Z` independently matches the current live repository/service/root/build/start/health/domain/auto-deploy fields. Its environment-variable entries are represented with `sync: false` and no values. Those entries are redaction/name evidence, not values to copy into or delete from source.

`api/requirements-transcription.txt` installs faster-whisper only. `api/requirements-speech.txt` also installs `pyannote.audio==4.0.7`, bringing the local pyannote/PyTorch stack into the service image. The canonical production primary diarization adapter is `pyannote_api`, which performs cloud API calls and does not require local Community-1/Torch merely to invoke the primary provider.

Root `render.yaml` also declares `CORS_ORIGINS` as server-managed. The owner export does not list that key; current backend source defaults to `*` when the environment variable is absent. That difference must be investigated deliberately rather than inferred from the export.

Issue #964 is the current first source/configuration task. It must update the existing root `render.yaml`, preserve secret values outside Git, keep reproducible non-secret runtime constraints in Git where supported, resolve the CORS ownership/policy explicitly, and verify that the existing Render service is updated rather than provisioning a duplicate service.

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

These are source/runtime-profile values, not a fresh current `/health` claim.

## Required primary diarization configuration

Current primary:

```text
VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api
PYANNOTE_KEY=<protected deployment secret>
VOXVECTOR_ENABLE_DIARIZATION_RUNS=true
```

`PYANNOTE_API_KEY` is also accepted as the cloud-key alias.

The route invocation gate is separate from provider readiness. `/health` may report the configured cloud adapter ready while the case path still does not invoke diarization if `VOXVECTOR_ENABLE_DIARIZATION_RUNS` is disabled.

Issue #970 owns rechecking the current official pyannoteAI media-ticket/upload/diarize/job-poll contract, correcting the existing adapter if the current provider contract confirms the audited mismatch, executing the cloud primary, and persisting/reading back speaker evidence.

## Optional local fallback

Explicit fallback configuration:

```text
VOXVECTOR_DIARIZATION_FALLBACK=pyannote_local
VOXVECTOR_DIARIZATION_FALLBACK_ENABLED=true
HF_TOKEN=<protected Hugging Face token>
```

`HUGGINGFACE_TOKEN` is also accepted by the local adapter. Community-1 is not the current primary production target. Local fallback execution must not be represented as cloud-primary verification.

## Memory reference

Current source/application reference:

```text
VOXVECTOR_MEMORY_LIMIT_MB=512
VOXVECTOR_MEMORY_HEADROOM_MB=96
```

The reference application admission ceiling is 416 MiB RSS. These variables do not alter Render's actual service limit and are not a fresh current `/health` readback.

## Historical production execution evidence

The September 10 controlled run on older deployed revision `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2` established that the beam-1 transcription path can execute successfully for the controlled fixture.

Case `3515362e-f801-463d-961a-df7b3302a596`, source `cbdcdbf8-e528-49b0-a474-5cd64588d301`, request `32fdb25aee704ee4ad0a0615e2496e09`:

- 183.3-second WAV;
- speech segmentation completed with 26 segments;
- faster-whisper ran as `base` / CPU / int8 / beam 1 / one thread / one worker / isolated child;
- transcription completed in about 113 seconds;
- 58 timestamped segments and 246 timestamped words were produced;
- language was reported as `en`.

This historical run established provider execution. It did not establish transcript truthfulness, current runtime reliability, or scientific validation.

## Historical post-transcription memory failure

During that same historical run, parent RSS was approximately 134.75 MiB before post-provider cleanup and approximately 482.58 MiB after cleanup. Stage 10 then started even though the configured admission ceiling was 416 MiB. Render sampled 519,041,020 bytes during the incident against a 536,870,900-byte service limit, and Uvicorn restarted shortly afterward. The owner confirmed the failure was a memory problem.

Completed provider/transcript/alignment state had not yet been durably attached to the persisted run before downstream work on that deployed source.

Render did not emit a dedicated kernel OOM/SIGKILL record for the run, so the exact OS termination mechanism is not separately claimed.

## Merged durability and Stage 10 safety source

Merged PR #962 established:

1. `collect_after_heavy_phase()` does not import Torch merely to perform cleanup on the CPU faster-whisper path;
2. Stage 10 must pass an explicit process-memory admission check before being marked running;
3. successful provider acquisition, transcript, alignment and provider timings are checkpointed durably before downstream Stage 10 work;
4. `process_instance_id` is a fresh Python-process UUID while `render_instance_id` remains separate infrastructure provenance;
5. the case route retains the same canonical persisted `run_id` through finalization.

Merged PR #967 then added:

6. fail-fast process-wide single-flight admission for the complete downstream composite analysis so competing timed-out/abandoned requests do not queue behind an active heavyweight phase and execute later;
7. a memory/RSS recheck while holding the shared heavyweight lock;
8. lock ownership through the complete composite analysis execution;
9. explicit preservation of the pipeline-internal analytical UUID as `pipeline_run_id` rather than overwriting persisted case-run identity.

These source changes are present in current `main` and current Render deployment metadata. They have **not** yet been accepted as controlled production execution merely because the deployment is `live`.

Issue #941 has been reopened for the production proof after #964 reconciles the runtime configuration.

## Memory-safe execution behavior

### Source decoding and working representation

The case route retrieves the private persisted WAV, verifies SHA-256 provenance, performs channel/recording assessment, converts the working audio to float32 and releases the original persisted byte buffer before heavyweight provider execution.

### Bounded speech segmentation

Speech activity extraction processes bounded frame groups and retains compact timing state rather than a full-recording frame matrix.

### Isolated faster-whisper process

With process isolation enabled, faster-whisper executes in a spawned disposable child. The parent creates a temporary normalized WAV, starts the child, waits only to the configured provider deadline, terminates/kills the child if required, closes IPC state and removes the temporary file.

This controls provider lifetime and lets child model memory disappear when the process exits. Render's service memory ceiling still applies across parent and child processes.

### Cleanup rule

After a heavy provider phase, VoxVector performs provider release, Python garbage collection and best-effort Linux allocator trimming. CUDA cache clearing is allowed only if Torch is already loaded by another runtime path. Cleanup must not import Torch just to ask whether CUDA exists.

### Durable provider checkpoint

After provider acquisition resolves and Stage 07/08 lifecycle state is known, current source persists an upstream checkpoint to the same case/run before downstream analysis.

The checkpoint includes:

- normalized acquisition object;
- transcript artifact when available;
- multimodal alignment when available;
- speaker list when available;
- provider state and provider timings;
- stage lifecycle state;
- process and Render instance provenance.

Operational logs emitted for checkpoint completion contain only sanitized state/count metadata. They do not copy raw transcript text into diagnostics.

### Downstream memory admission

Current source applies Stage 10 route preflight and a process-wide shared heavyweight phase guard before the complete `VoxVectorPipeline.analyze()` composite call.

A competing composite request fails fast if that downstream phase is already occupied. An admitted request rechecks memory under the shared lock and keeps the lock through complete composite execution. If current process RSS is already at or above the configured admission ceiling, VoxVector persists a bounded Stage 10 failure and marks dependent downstream stages `not_run` while keeping upstream speech/transcript artifacts.

Memory admission is operational resource protection, not the scientific Eligibility and Reliability stage.

## Process, infrastructure, and run identity

- `process_instance_id` is a new UUID created when the Python API process starts;
- `render_instance_id` is the Render infrastructure identifier when present;
- persisted route-owned `run_id` remains the stable case-run identity;
- pipeline-internal analytical identity is retained separately as `pipeline_run_id`.

This distinction is required because Uvicorn may restart inside the same Render infrastructure instance and because case history/reopen depends on stable persisted run identity.

## `/health` verification

The safe health contract can expose:

- exact source revision;
- backend/pipeline version;
- process instance UUID;
- Render instance identifier separately;
- transcription provider and beam/thread/worker/process settings;
- diarization provider/readiness without credential values;
- media/diagnostic storage readiness;
- memory reference and admission ceiling;
- runtime self-test state.

Health readiness does not prove an analysis invoked a provider. Current `420536...` deployment still needs a fresh readback before those runtime fields are attributed to that deployment.

## Current controlled verification sequence

1. complete #964 Blueprint/dependency/CORS/runtime-profile reconciliation in the existing root `render.yaml`;
2. exact-head QA the #964 source change and review the diff;
3. deliberately deploy the reconciled exact revision to the existing Render service;
4. verify Render reports that intended source as `live`;
5. capture fresh `/health` and confirm exact source, beam/profile values, process-vs-Render identity separation and memory-admission reference;
6. rerun the same 183.3-second controlled WAV through the authenticated case path under reopened #941;
7. verify faster-whisper again completes or fails inside its explicit bound without API process loss;
8. read the upstream transcript/alignment/provider checkpoint from durable case storage before depending on downstream completion;
9. verify Stage 10 is admitted only below the safe threshold and either completes or returns a bounded admission failure without restart;
10. confirm the persisted `run_id` remains stable and `pipeline_run_id` remains separate;
11. correlate Render service memory/instance lifecycle with application process and request identifiers;
12. only after the transcription/runtime proof is accepted, execute the cloud-primary pyannoteAI diarization gate under #970 and persist/read back speaker provenance;
13. persist transcript/audio/speaker alignment under #971;
14. perform authenticated desktop/mobile browser verification separately.

## Related work

- #964: current first task, canonical Render Blueprint/runtime-profile reconciliation;
- #941: reopened controlled post-#967 production proof after #964;
- #959: merged dual Render/Supabase logging and Debug Bundle source; production acceptance remains open;
- #970: cloud-primary pyannoteAI contract/execution/persistence;
- #971: persisted transcript/audio/speaker alignment;
- #963: historical-case playback/transcript/speaker/alignment/report rehydration;
- #965: frontend pipeline status projection correction;
- #931 / draft PR #974: login wake/shared self-profile/current role browser acceptance;
- #920: protected Developer Console Deploy Now path verification;
- #972: final same-revision/configuration golden-case release gate.

## Scientific boundary

Successful transcription establishes that a speech provider executed and returned an artifact. It does not establish transcript truthfulness, speaker identity, deception inference, calibration or scientific validity. Speech/provider reliability remains separate from VoxVector's target-condition validation program.
