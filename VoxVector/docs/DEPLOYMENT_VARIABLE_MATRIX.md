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
| `VOXVECTOR_WHISPER_BEAM_SIZE` | Control decoding beam size | Render environment | ECS task environment | Current constrained source profile uses `1`; historical beam-1 production execution was observed on `f0dda136...`. |
| `VOXVECTOR_WHISPER_CPU_THREADS` | Bound local transcription CPU threading | Render environment | ECS task environment | Current constrained source profile uses `1`. |
| `VOXVECTOR_WHISPER_NUM_WORKERS` | Bound faster-whisper worker count | Render environment | ECS task environment | Current constrained source profile uses `1`. |
| `VOXVECTOR_WHISPER_ISOLATED_PROCESS` | Execute faster-whisper in a disposable child process | Render environment | ECS task environment | Current constrained source profile uses `true`. |
| `VOXVECTOR_WHISPER_TIMEOUT_SECONDS` | Hard child-process deadline | Render environment | ECS task environment | Current constrained source profile uses `165`; separate from outer acquisition timeout. |
| `VOXVECTOR_MEMORY_LIMIT_MB` | Runtime memory reference used by VoxVector admission logic | Render environment | ECS task environment | Current constrained source reference is `512`; does not change provider/platform memory limits. |
| `VOXVECTOR_MEMORY_HEADROOM_MB` | Reserve memory before admitting a new heavy phase | Render environment | ECS task environment | Current constrained source reserve is `96`, giving a 416 MiB reference admission ceiling. |
| `VOXVECTOR_SOURCE_REVISION` | Deployment provenance | Render build/runtime metadata | ECS workflow/task definition | Prefer workflow-injected commit SHA. |
| `VOXVECTOR_CURRENT_COMMIT_QA` | Source-specific QA provenance | Render deployment metadata | ECS workflow/task definition | Must come from real QA execution. |
| `RENDER_INSTANCE_ID` | Render infrastructure instance provenance supplied by the host | provider-supplied runtime value | N/A | Must not be reused as Python process identity; current source preserves it separately as `render_instance_id`. |
| `RENDER_API_KEY` | Server-side Render observability bridge | Render secret environment | Not used by active AWS path | Required by Developer Console Render status/log routes; never expose to browser. |
| `RENDER_SERVICE_ID` | Select the original VoxVector Render service | Render environment | Not used by active AWS path | Connected service is `srv-da2f88n40ujc73a8m26g`; do not treat workspace ID as service ID. |
| `RENDER_DEPLOY_HOOK_URL` | Protected manual deploy trigger for the Developer Console | Render secret environment | Not used by active AWS path | Secret deploy-hook URL. Never expose to browser code, documentation exports, GitHub source, diagnostics, or case artifacts. |
| `CORS_ORIGINS` | Explicit browser origins accepted by FastAPI CORS middleware | root Blueprint currently marks server-managed | deployment-specific | Backend defaults to `*` when unset. Owner Render export did not list this key; #964 must verify actual intended ownership/value without inference. |
| Render `autoDeploy` / automatic deploy trigger | Prevent automatic production deploys from repository pushes | **Disabled** | N/A | Connected/current export evidence: `autoDeploy=no`, trigger off. |
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

The source contract is not itself a deployment claim. Historical controlled production execution on deployed source `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2` confirmed that the beam-1 faster-whisper profile actually executed and completed transcription. Current source `420536...` includes the merged #962/#967 durability and bounded Stage 10 safeguards, but the same controlled path has not yet been rerun/read back on the reconciled runtime. Reopened #941 owns that proof after #964.

For the cloud credential, the canonical adapter accepts either `PYANNOTE_KEY` or `PYANNOTE_API_KEY`. Use `PYANNOTE_KEY` as the preferred deployment secret name. The optional local Community-1 fallback separately accepts `HF_TOKEN` or `HUGGINGFACE_TOKEN` when `VOXVECTOR_DIARIZATION_FALLBACK=pyannote_local` and `VOXVECTOR_DIARIZATION_FALLBACK_ENABLED=true` are both set.

Secret values must remain in the target deployment secret manager.

## Current Render service / Blueprint drift — 2026-09-10

Canonical GitHub `main`: `420536771875c6948be51851118b58cb04a596e6`.

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
- start command `uvicorn api.app:app --host 0.0.0.0 --port $PORT`
- current live deployment `dep-dahi2ics728c73b6ujug`
- current deployed source `420536771875c6948be51851118b58cb04a596e6`
- deployment trigger `api`
- deployment finished `2026-09-10T21:36:23.3655Z`

The owner-provided Render project export generated `2026-09-10T21:38:48Z` independently matches repository URL, service name, Python runtime, free plan, Oregon region, root directory, build/start commands, health path, `voxvector.crownlabs.tech` domain, and auto-deploy-off state. Its environment-variable entries are all represented with `sync: false` and no values. That export is therefore name/presence evidence only and must not be used to infer, erase, or replace redacted values.

The canonical root `render.yaml` currently specifies:

`pip install -r api/requirements.txt && pip install -r api/requirements-transcription.txt`

It also source-controls the non-secret transcription provider/model/device/compute/beam values above and declares `CORS_ORIGINS` as server-managed.

The owner export does not list `CORS_ORIGINS`. Current `VoxVector/api/app.py` defaults CORS origins to `*` if that environment variable is absent. This is an explicit reconciliation item for #964. The export alone does not prove that a runtime value is absent or what the intended final value should be.

Issue #964 owns field-by-field reconciliation of the owner export and live service into the existing canonical root `render.yaml`. Do not upload or commit a second Blueprint for `voxvector-api`. Do not blindly replace explicit non-secret source-controlled values with `sync: false` merely because the provider-generated export redacted values.

The dependency difference matters because `requirements-speech.txt` includes `pyannote.audio==4.0.7` in addition to faster-whisper, while `requirements-transcription.txt` contains faster-whisper only. The canonical production primary diarization architecture is cloud `pyannote_api`; local Community-1 is an explicit optional fallback. #964 must inspect actual imports/runtime requirements and choose the dependency set based on source/runtime need rather than provider-export imitation.

## Memory admission contract

`VOXVECTOR_MEMORY_LIMIT_MB` and `VOXVECTOR_MEMORY_HEADROOM_MB` are operational guardrails used by the application before starting heavyweight phases.

At the current source reference of 512/96, the reference admission ceiling is 416 MiB. Merged #967 additionally uses fail-fast process-wide single-flight composite admission and a locked RSS recheck so competing downstream work cannot queue behind the heavyweight boundary after its request has already failed.

These source values do not alter Render's actual platform limit and are not fresh `/health` evidence for the current deployment. A memory-admission refusal is an operational runtime decision, not a scientific eligibility threshold.

The historical controlled 2026-09-10 run showed why the boundary is required: API-parent RSS rose to roughly 482.58 MiB after the provider cleanup transition and Render later sampled 519,041,020 bytes against a 536,870,900-byte service limit before process restart. The owner confirmed the incident was a memory problem.

## Process and run identity contract

A Python API process receives a fresh application-generated `process_instance_id` when it starts. `RENDER_INSTANCE_ID`, when present, is retained separately as `render_instance_id` infrastructure provenance.

The persisted route-owned analysis identifier remains `run_id`. The canonical analytical pipeline's internal UUID is retained separately as `pipeline_run_id` and must not replace persisted case-run identity.

This separation is required because Render can restart Uvicorn/Python while retaining the same hosting instance label, and because reopened case history depends on stable persisted run identity.

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

The current deployment `dep-dahi2ics728c73b6ujug` was API-triggered. It is deployment evidence but does not satisfy #920's protected Developer Console action path.

## Verification rule

Create only variables actually accepted by the canonical implementation. Before deployment, inspect runtime configuration code and workflow mapping. A variable existing in a provider dashboard/export is not evidence that the running application reads it.

Likewise, provider configuration is not provider execution. Historical beam-1 execution provides transcription provider-execution evidence for older `f0dda136...`; current #962/#967 semantics require deliberate post-#964 deployment, fresh runtime readback and controlled execution before they count as production proof.

## Service references

- GitHub repository and GitHub Actions remain the source/QA authority.
- Render hosts the original VoxVector API environment.
- Supabase is the configured auth/persistence/diagnostics/private-media boundary.
- AWS ECS remains a separate API environment.
- Hugging Face credentials are required only for the optional local Community-1 path.
