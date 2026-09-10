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

Canonical GitHub `main` at the start of issue #964 is `53ee1b5e27b89fb436fd72da342cd6f947a667b0`.

Current connected Render service:

- service `voxvector-api` / `srv-da2f88n40ujc73a8m26g`;
- root `VoxVector`;
- region Oregon;
- plan free;
- auto-deploy disabled;
- last recorded deploy before the #964 source change `dep-dahi2ics728c73b6ujug`;
- deploy status `live`;
- exact deployed source `420536771875c6948be51851118b58cb04a596e6`;
- deploy trigger `api`;
- deploy finished `2026-09-10T21:36:23.3655Z`;
- build command `pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`;
- start command `uvicorn api.app:app --host 0.0.0.0 --port $PORT`;
- health path `/health`.

The later `53ee1b5...` merge changed documentation only, and Render auto-deploy is off, so it is not represented as a newer backend deployment. No fresh `/health` response for the #964 source is claimed until that source is reviewed, merged and deliberately deployed.

## Canonical Render dependency profile — issue #964

Git contains one canonical VoxVector Blueprint at repository root `render.yaml`. Do not add the owner-provided Render-generated export as a second file or second service owner.

The owner-provided Render export generated `2026-09-10T21:38:48Z` matches the existing service's repository, service name, Python runtime, free plan, Oregon region, root, build/start commands, health path, custom domain and auto-deploy-off state. Its environment entries contain names with `sync: false`, so they are redacted export evidence rather than value evidence.

Source inspection resolved the dependency mismatch:

- `api/requirements-transcription.txt` owns faster-whisper;
- `PyannoteAPIDiarizationProvider`, the production cloud-primary adapter, does not import `pyannote.audio` or Torch;
- `PyannoteDiarizationProvider`, the optional local Community-1 fallback, imports `pyannote.audio` and Torch only when that local path executes.

Issue #964 therefore makes `api/requirements-speech.txt` the cloud-primary Render speech manifest by including the transcription manifest and excluding local pyannote/Torch. The optional local dependency is isolated in `api/requirements-diarization-local.txt`.

`VoxVector/Dockerfile` continues to install the dedicated local manifest as well. This preserves the existing container/AWS optional local-fallback capability while allowing the Render cloud-primary runtime to remain lightweight. The Docker edit is dependency-preservation only; it is not an AWS deployment or cutover.

The root Blueprint uses the same `requirements-speech.txt` build command as the connected Render service and explicitly records repository, `main` branch, free plan, Oregon region, root directory, start command, health path, `voxvector.crownlabs.tech` domain and `autoDeployTrigger: off`.

This source reconciliation is not a deployment. Render remains on the previously recorded deployment until a deliberate post-merge deployment is observed.

## Required transcription configuration

Canonical constrained Render profile:

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

## Primary diarization configuration and execution gate

Canonical primary selection remains:

```text
VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api
PYANNOTE_KEY=<protected deployment secret>
```

`PYANNOTE_API_KEY` is also accepted as the cloud-key alias.

For the #964 → #941 runtime-stability candidate, the Blueprint deliberately sets:

```text
VOXVECTOR_DIARIZATION_FALLBACK=none
VOXVECTOR_DIARIZATION_FALLBACK_ENABLED=false
VOXVECTOR_ENABLE_DIARIZATION_RUNS=false
```

This does not retire cloud-primary diarization. It prevents the separate, not-yet-verified cloud diarization request path from changing the controlled #941 transcription/Stage-10 runtime proof. Issue #970 owns rechecking the current official pyannoteAI media-ticket/upload/diarize/job-poll contract, correcting the adapter if required, changing the execution gate deliberately, executing the cloud provider and persisting speaker evidence.

Provider selection/readiness remains distinct from provider execution.

## Optional local fallback

When separately authorized and provisioned in a runtime that installs `api/requirements-diarization-local.txt`, the local fallback configuration is:

```text
VOXVECTOR_DIARIZATION_FALLBACK=pyannote_local
VOXVECTOR_DIARIZATION_FALLBACK_ENABLED=true
HF_TOKEN=<protected Hugging Face token>
```

`HUGGINGFACE_TOKEN` is also accepted by the local adapter. Community-1 is not the current Render primary production target. Local fallback execution must not be represented as cloud-primary verification.

## CORS configuration

Backend source defaults `CORS_ORIGINS` to `*` when the variable is absent. The owner Render export did not contain that key, so issue #964 removes ambiguity by making the Blueprint own the explicit production list:

```text
CORS_ORIGINS=https://darenprince.com,https://www.darenprince.com,https://voxvector.crownlabs.tech
```

The same production example is maintained in `api/.env.example`.

## Secret ownership

Protected credentials remain in the existing Render environment. They are not copied from the generated export into Git. Render preserves existing service environment variables that are omitted from a Blueprint unless the Blueprint explicitly overwrites them, so the canonical file only source-controls the non-secret runtime values required for reproducibility.

## Memory and native-thread reference

Canonical application/runtime values for the constrained Render profile are:

```text
VOXVECTOR_MEMORY_LIMIT_MB=512
VOXVECTOR_MEMORY_HEADROOM_MB=96
OMP_NUM_THREADS=1
MKL_NUM_THREADS=1
OPENBLAS_NUM_THREADS=1
MALLOC_ARENA_MAX=2
TOKENIZERS_PARALLELISM=false
```

The application admission ceiling is 416 MiB RSS. These values do not alter Render's actual platform memory limit and are not scientific eligibility thresholds.

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

These source changes have deployment metadata on `420536...`, but their controlled production acceptance remains open under #941.

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

The checkpoint includes normalized acquisition, transcript when available, multimodal alignment when available, speaker state when available, provider state/timings, stage lifecycle state, and process/Render provenance.

Operational logs emitted for checkpoint completion contain sanitized state/count metadata and do not copy raw transcript text into diagnostics.

### Downstream memory admission

Current source applies Stage 10 route preflight and a process-wide shared heavyweight phase guard before the complete `VoxVectorPipeline.analyze()` composite call.

A competing composite request fails fast if that downstream phase is already occupied. An admitted request rechecks memory under the shared lock and keeps the lock through complete composite execution. If current process RSS is already at or above the configured admission ceiling, VoxVector persists a bounded Stage 10 failure and marks dependent downstream stages `not_run` while keeping upstream speech/transcript artifacts.

Memory admission is operational resource protection, not the scientific Eligibility and Reliability stage.

## Process, infrastructure, and run identity

- `process_instance_id` is a new UUID created when the Python API process starts;
- `render_instance_id` is the Render infrastructure identifier when present;
- persisted route-owned `run_id` remains the stable case-run identity;
- pipeline-internal analytical identity is retained separately as `pipeline_run_id`.

## `/health` verification

The safe health contract can expose exact source revision, backend/pipeline version, process instance UUID, Render instance identity, transcription provider/profile, diarization provider/readiness without credentials, media/diagnostic storage readiness, memory reference/admission ceiling and runtime self-test state.

Health readiness does not prove an analysis invoked a provider. A fresh `/health` readback is required after the #964 reviewed merge is deliberately deployed before the new profile is attributed to production.

## Controlled verification sequence

1. complete #964 source, documentation, audit and exact-head QA;
2. merge only the reviewed exact head;
3. deliberately deploy that exact merge to the existing Render service;
4. verify the deployment targets the intended commit and reaches `live`;
5. capture fresh `/health` and confirm exact source, constrained transcription/memory values, cloud-primary provider selection with diarization invocation still disabled, and process-vs-Render identity separation;
6. under reopened #941, rerun the same 183.3-second controlled WAV through the authenticated case path;
7. verify faster-whisper completes or fails inside its explicit bound without API process loss;
8. read the upstream transcript/alignment/provider checkpoint from durable case storage before depending on downstream completion;
9. verify Stage 10 is admitted only below the safe threshold and either completes or returns a bounded admission failure without restart;
10. confirm persisted `run_id` remains stable and `pipeline_run_id` remains separate;
11. correlate Render service memory/instance lifecycle with application process and request identifiers;
12. only after #941 acceptance, continue #970 to enable/execute cloud-primary diarization and persist speaker provenance;
13. persist transcript/audio/speaker alignment under #971;
14. perform authenticated desktop/mobile browser verification separately.

## Related work

- #964: canonical Render Blueprint/runtime dependency reconciliation;
- #941: controlled post-#967 production proof after #964;
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
