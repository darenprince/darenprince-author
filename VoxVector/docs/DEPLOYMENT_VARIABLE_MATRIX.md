# VoxVector Deployment Variable Matrix

**Date:** 2026-09-10  
**Purpose:** deployment configuration checklist. Do not place secret values in GitHub source, documentation, client bundles, or public dashboard exports.

| Variable / setting | Purpose | Render | AWS ECS | Notes |
|---|---|---|---|---|
| `PYANNOTE_KEY` or `PYANNOTE_API_KEY` | pyannoteAI cloud authentication for the primary diarization runtime | protected Render environment | AWS Secrets Manager | Secret. `PYANNOTE_KEY` is preferred. |
| `HF_TOKEN` or `HUGGINGFACE_TOKEN` | Hugging Face access for the optional local Community-1 fallback | protected Render environment | AWS Secrets Manager | Secret. Not required merely to use cloud-primary `pyannote_api`. |
| `VOXVECTOR_DIARIZATION_PROVIDER` | Select diarization provider | Render environment | ECS task environment | Current production architecture uses `pyannote_api` as primary. |
| `VOXVECTOR_PYANNOTE_API_MODEL` | Optionally select the cloud diarization model | Render environment | ECS task environment | Provider support must be verified at runtime. |
| `VOXVECTOR_DIARIZATION_FALLBACK` | Select optional fallback provider | Render environment | ECS task environment | Current supported local value is `pyannote_local`; inert unless fallback is enabled. |
| `VOXVECTOR_DIARIZATION_FALLBACK_ENABLED` | Enable explicit fallback after primary failure | Render environment | ECS task environment | Defaults false. Fallback use must be recorded in provenance. |
| `VOXVECTOR_ENABLE_DIARIZATION_RUNS` | Permit route-triggered diarization execution | Render environment | ECS task environment | Execution gate; separate from provider readiness. |
| `VOXVECTOR_TRANSCRIPTION_PROVIDER` | Select transcription provider | Render environment | ECS task environment | Current constrained path uses `faster_whisper`. |
| `VOXVECTOR_WHISPER_MODEL` | Select faster-whisper model | Render environment | ECS task environment | Current constrained profile uses `base`. |
| `VOXVECTOR_WHISPER_DEVICE` | Select inference device | Render environment | ECS task environment | Current constrained profile uses `cpu`. |
| `VOXVECTOR_WHISPER_COMPUTE_TYPE` | Select inference compute type | Render environment | ECS task environment | Current constrained profile uses `int8`. |
| `VOXVECTOR_WHISPER_BEAM_SIZE` | Control decoding beam size | Render environment | ECS task environment | Current constrained profile uses `1`; beam-1 production execution has been observed on `f0dda136...`. |
| `VOXVECTOR_WHISPER_CPU_THREADS` | Bound local transcription CPU threading | Render environment | ECS task environment | Current constrained profile uses `1`. |
| `VOXVECTOR_WHISPER_NUM_WORKERS` | Bound faster-whisper worker count | Render environment | ECS task environment | Current constrained profile uses `1`. |
| `VOXVECTOR_WHISPER_ISOLATED_PROCESS` | Execute faster-whisper in a disposable child process | Render environment | ECS task environment | Current constrained profile uses `true`. |
| `VOXVECTOR_WHISPER_TIMEOUT_SECONDS` | Hard child-process deadline | Render environment | ECS task environment | Current constrained profile uses `165`; separate from outer acquisition timeout. |
| `VOXVECTOR_MEMORY_LIMIT_MB` | Runtime memory reference used by VoxVector admission logic | Render environment | ECS task environment | Current constrained reference is `512`; does not change provider/platform memory limits. |
| `VOXVECTOR_MEMORY_HEADROOM_MB` | Reserve memory before admitting a new heavy phase | Render environment | ECS task environment | Current constrained reserve is `96`, giving a 416 MiB admission ceiling with the 512 MiB reference. |
| `VOXVECTOR_SOURCE_REVISION` | Deployment provenance | Render build/runtime metadata | ECS workflow/task definition | Prefer workflow-injected commit SHA. |
| `VOXVECTOR_CURRENT_COMMIT_QA` | Source-specific QA provenance | Render deployment metadata | ECS workflow/task definition | Must come from real QA execution. |
| `RENDER_INSTANCE_ID` | Render infrastructure instance provenance supplied by the host | provider-supplied runtime value | N/A | Must not be reused as the Python process identity. PR #962 preserves it separately as `render_instance_id`. |
| `RENDER_API_KEY` | Server-side Render observability bridge | Render secret environment | Not used by active AWS path | Required by Developer Console Render status/log routes; never expose to browser. |
| `RENDER_SERVICE_ID` | Select the original VoxVector Render service | Render environment | Not used by active AWS path | Connected service is `srv-da2f88n40ujc73a8m26g`; do not treat workspace ID as service ID. |
| `RENDER_DEPLOY_HOOK_URL` | Protected manual deploy trigger for the Developer Console | Render secret environment | Not used by active AWS path | Secret deploy-hook URL. Never expose to browser code, documentation exports, GitHub source, diagnostics, or case artifacts. |
| Render `autoDeploy` / automatic deploy trigger | Prevent automatic production deploys from repository pushes | **Disabled** | N/A | Connected 2026-09-10 inspection: `autoDeploy=no`, trigger off. |
| Supabase server credentials | Diagnostics, persistence, private media | Render secret environment | AWS Secrets Manager | Existing canonical storage boundary; do not duplicate unnecessarily. |

## Current constrained source configuration contract

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
VOXVECTOR_MEMORY_LIMIT_MB=512
VOXVECTOR_MEMORY_HEADROOM_MB=96

VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api
VOXVECTOR_ENABLE_DIARIZATION_RUNS=true
```

The source contract is not itself a deployment claim. However, controlled production execution on deployed source `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2` did confirm the beam-1 faster-whisper profile actually executed and completed transcription. The active #941 reliability defect is now the post-provider/downstream memory transition and artifact durability boundary, not the beam-size mismatch.

For the cloud credential, the canonical adapter accepts either `PYANNOTE_KEY` or `PYANNOTE_API_KEY`. Use `PYANNOTE_KEY` as the preferred deployment secret name. The optional local Community-1 fallback separately accepts `HF_TOKEN` or `HUGGINGFACE_TOKEN` when `VOXVECTOR_DIARIZATION_FALLBACK=pyannote_local` and `VOXVECTOR_DIARIZATION_FALLBACK_ENABLED=true` are both set.

Secret values must remain in the target deployment secret manager.

## Current Render service / Blueprint drift — 2026-09-10

Connected Render inspection of the existing `voxvector-api` service reports:

- service ID `srv-da2f88n40ujc73a8m26g`
- branch `main`
- root directory `VoxVector`
- plan `free`
- region `oregon`
- one instance
- health path `/health`
- auto-deploy disabled
- live build command `pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`
- current live deployment `dep-dah7usjl550s73e00350`
- current deployed source `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2`

The canonical root `render.yaml` currently specifies:

`pip install -r api/requirements.txt && pip install -r api/requirements-transcription.txt`

Issue #964 owns reconciliation of the Render-generated Blueprint export and the live service into the existing canonical root `render.yaml`. Do not upload or commit a second Blueprint for `voxvector-api`. Do not blindly replace explicit non-secret source-controlled values with `sync: false` merely because the provider-generated export redacted values.

The dependency difference matters because `requirements-speech.txt` includes the local pyannote/PyTorch stack, while the canonical production primary diarization architecture is `pyannote_api`, which does not require local Community-1 merely to call the cloud provider. The active #941 source repair prevents cleanup from importing PyTorch solely for cleanup; #964 separately decides which dependency set the live service should install.

## Memory admission contract

`VOXVECTOR_MEMORY_LIMIT_MB` and `VOXVECTOR_MEMORY_HEADROOM_MB` are operational guardrails used by the application before starting heavyweight phases.

At the current 512/96 reference, the effective admission ceiling is 416 MiB. If measured process RSS is at or above that ceiling, Stage 10 must be refused before it is represented as running, while completed upstream transcript/alignment evidence remains persisted.

These variables do not alter Render's actual platform limit and do not create a scientific eligibility threshold.

The controlled 2026-09-10 run showed why this boundary is necessary: API-parent RSS rose to roughly 482.58 MiB after the provider cleanup transition and Render later sampled 519,041,020 bytes against a 536,870,900-byte service limit before process restart. The owner confirmed the incident was a memory problem.

## Process identity contract

A Python API process receives a fresh application-generated `process_instance_id` when it starts. `RENDER_INSTANCE_ID`, when present, is retained separately as `render_instance_id` infrastructure provenance.

This separation is required because Render can restart Uvicorn/Python while retaining the same hosting instance label. Interruption recovery must not assume that a stable Render instance ID proves the original Python process still exists.

## Render deployment-control contract

The canonical manual deployment path remains:

`Developer Console → POST /v1/developer/render/deploy → authenticated server runtime → RENDER_DEPLOY_HOOK_URL → Render deploy hook`

The browser never receives the deploy-hook URL. The API runtime verifies the authenticated developer session and sends the POST server-side.

A 2xx hook response establishes only trigger acceptance. After acceptance, verification must independently establish:

1. a new Render deployment exists;
2. it targets the intended Git commit;
3. it reaches terminal `live` state;
4. `/health` responds successfully;
5. the runtime reports the intended backend `source_revision`;
6. the intended non-secret runtime configuration is read back;
7. browser/runtime behavior is checked when required by the task.

The current deployment `dep-dah7usjl550s73e00350` was API-triggered. It is deployment evidence but does not satisfy #920's protected Developer Console action path.

## Verification rule

Create only variables actually accepted by the canonical implementation. Before deployment, inspect runtime configuration code and workflow mapping. A variable existing in a provider dashboard is not evidence that the running application reads it.

Likewise, provider configuration is not provider execution. The controlled beam-1 run provides provider-execution evidence for transcription, but PR #962's new checkpoint/memory/process semantics remain source-only until merged, deliberately deployed, and read back from the runtime.

## Service references

- GitHub repository and GitHub Actions remain the source/QA authority.
- Render hosts the original VoxVector API environment.
- Supabase is the configured auth/persistence/diagnostics/private-media boundary.
- AWS ECS remains a separate API environment.
- Hugging Face credentials are only required for the optional local Community-1 path.
