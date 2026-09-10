# VoxVector Deployment Variable Matrix

**Date:** 2026-09-10  
**Purpose:** deployment configuration checklist. Do not place secret values in GitHub source, documentation, client bundles, or public dashboard exports.

| Variable / setting | Purpose | Render | AWS ECS | Notes |
|---|---|---|---|---|
| `PYANNOTE_KEY` or `PYANNOTE_API_KEY` | pyannoteAI cloud authentication for the primary diarization runtime | protected Render environment | AWS Secrets Manager | Secret. `PYANNOTE_KEY` is preferred. Omitted from the Blueprint so the existing server-managed value is preserved. |
| `HF_TOKEN` or `HUGGINGFACE_TOKEN` | Hugging Face access for the optional local Community-1 fallback | protected Render environment | AWS Secrets Manager | Secret. Not required by Render's cloud-primary runtime. |
| `VOXVECTOR_DIARIZATION_PROVIDER` | Select diarization provider | Blueprint value `pyannote_api` | ECS task environment | Cloud primary is source-controlled for Render. |
| `VOXVECTOR_PYANNOTE_API_MODEL` | Optionally select the cloud diarization model | server-managed when used | ECS task environment | Optional. Do not invent a model value when provider/default evidence is sufficient. |
| `VOXVECTOR_DIARIZATION_FALLBACK` | Select optional fallback provider | Blueprint value `none` | ECS task environment | Render candidate disables local fallback. Local value `pyannote_local` remains supported in runtimes that install the local manifest. |
| `VOXVECTOR_DIARIZATION_FALLBACK_ENABLED` | Enable explicit fallback after primary failure | Blueprint value `false` | ECS task environment | Fallback use must be explicit and recorded in provenance. |
| `VOXVECTOR_ENABLE_DIARIZATION_RUNS` | Permit route-triggered diarization execution | Blueprint value `false` for #941 candidate | ECS task environment | Provider configuration/readiness is kept separate from execution. #970 owns deliberate enablement and provider execution. |
| `VOXVECTOR_TRANSCRIPTION_PROVIDER` | Select transcription provider | Blueprint value `faster_whisper` | ECS task environment | Current constrained path. |
| `VOXVECTOR_WHISPER_MODEL` | Select faster-whisper model | Blueprint value `base` | ECS task environment | Current constrained profile. |
| `VOXVECTOR_WHISPER_DEVICE` | Select inference device | Blueprint value `cpu` | ECS task environment | Current constrained profile. |
| `VOXVECTOR_WHISPER_COMPUTE_TYPE` | Select inference compute type | Blueprint value `int8` | ECS task environment | Current constrained profile. |
| `VOXVECTOR_WHISPER_BEAM_SIZE` | Control decoding beam size | Blueprint value `1` | ECS task environment | Historical beam-1 execution was observed on `f0dda136...`. |
| `VOXVECTOR_WHISPER_CPU_THREADS` | Bound local transcription CPU threading | Blueprint value `1` | ECS task environment | Current constrained profile. |
| `VOXVECTOR_WHISPER_NUM_WORKERS` | Bound faster-whisper worker count | Blueprint value `1` | ECS task environment | Current constrained profile. |
| `VOXVECTOR_WHISPER_ISOLATED_PROCESS` | Execute faster-whisper in a disposable child process | Blueprint value `true` | ECS task environment | Current constrained profile. |
| `VOXVECTOR_WHISPER_TIMEOUT_SECONDS` | Hard child-process deadline | Blueprint value `165` | ECS task environment | Separate from outer acquisition timeout. |
| `VOXVECTOR_MEMORY_LIMIT_MB` | Runtime memory reference used by VoxVector admission logic | Blueprint value `512` | ECS task environment | Application reference only; does not change provider/platform memory limits. |
| `VOXVECTOR_MEMORY_HEADROOM_MB` | Reserve memory before admitting a new heavy phase | Blueprint value `96` | ECS task environment | Reference Stage 10 admission ceiling is 416 MiB. |
| `OMP_NUM_THREADS` | Bound OpenMP native worker threads | Blueprint value `1` | deployment-specific | Runtime resource guard. |
| `MKL_NUM_THREADS` | Bound MKL native worker threads | Blueprint value `1` | deployment-specific | Runtime resource guard. |
| `OPENBLAS_NUM_THREADS` | Bound OpenBLAS native worker threads | Blueprint value `1` | deployment-specific | Runtime resource guard. |
| `MALLOC_ARENA_MAX` | Bound glibc allocator arenas | Blueprint value `2` | deployment-specific | Runtime memory-fragmentation guard. |
| `TOKENIZERS_PARALLELISM` | Disable unnecessary tokenizer thread fanout | Blueprint value `false` | deployment-specific | Runtime resource guard. |
| `CORS_ORIGINS` | Explicit browser origins accepted by FastAPI CORS middleware | Blueprint explicit allowlist | deployment-specific | `https://darenprince.com,https://www.darenprince.com,https://voxvector.crownlabs.tech`; no wildcard for the Blueprint-managed production profile. |
| `VOXVECTOR_SOURCE_REVISION` | Deployment provenance | Render build/runtime metadata | ECS workflow/task definition | Prefer deployment/workflow-injected commit SHA rather than a hand-maintained value. |
| `VOXVECTOR_CURRENT_COMMIT_QA` | Source-specific QA provenance | Render deployment metadata | ECS workflow/task definition | Must come from real QA execution. |
| `RENDER_INSTANCE_ID` | Render infrastructure instance provenance supplied by host | provider-supplied runtime value | N/A | Must not be reused as Python process identity. |
| `RENDER_API_KEY` | Server-side Render observability bridge | protected Render environment | not used by active AWS path | Secret; never expose to browser. |
| `RENDER_SERVICE_ID` | Select original VoxVector Render service | existing Render environment | not used by active AWS path | Connected service `srv-da2f88n40ujc73a8m26g`. |
| `RENDER_DEPLOY_HOOK_URL` | Protected manual deploy trigger for Developer Console | protected Render environment | not used by active AWS path | Secret deploy-hook URL; never commit. |
| Render `autoDeployTrigger` | Prevent automatic production deploys from repository pushes | Blueprint `off`; connected service auto-deploy off | N/A | Deliberate deployment remains mandatory. |
| Supabase server credentials | Diagnostics, persistence, private media | protected Render environment | AWS Secrets Manager | Existing canonical storage boundary; not copied into Blueprint source. |

## Canonical constrained Render profile

Issue #964 source-controls the following non-secret Render profile:

```text
CORS_ORIGINS=https://darenprince.com,https://www.darenprince.com,https://voxvector.crownlabs.tech

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
VOXVECTOR_DIARIZATION_FALLBACK=none
VOXVECTOR_DIARIZATION_FALLBACK_ENABLED=false
VOXVECTOR_ENABLE_DIARIZATION_RUNS=false

OMP_NUM_THREADS=1
MKL_NUM_THREADS=1
OPENBLAS_NUM_THREADS=1
MALLOC_ARENA_MAX=2
TOKENIZERS_PARALLELISM=false
```

`VOXVECTOR_ENABLE_DIARIZATION_RUNS=false` is intentional for the #941 runtime-stability proof. It keeps the configured cloud-primary provider separate from provider execution so the #941 controlled transcription/Stage-10 experiment is not changed by a second unverified provider path. #970 owns rechecking the pyannoteAI request contract, enabling the invocation gate, executing the cloud provider and persisting speaker evidence.

The source profile is not a deployment claim. Historical production execution on `f0dda136...` confirmed the beam-1 faster-whisper path for one controlled recording. Merged #962/#967 runtime-safety behavior still requires controlled production proof after the #964 profile is reviewed, merged and deliberately deployed.

## Speech dependency ownership

Render's connected service already builds:

`pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`

Issue #964 makes that command reproducible without forcing the optional local pyannote/Torch stack into Render:

- `api/requirements-transcription.txt` contains `faster-whisper>=1.2,<2`;
- `api/requirements-speech.txt` includes `requirements-transcription.txt` and contains no `pyannote.audio`/Torch dependency;
- `api/requirements-diarization-local.txt` contains `pyannote.audio==4.0.7` for the explicit local Community-1 path;
- `VoxVector/Dockerfile` installs both the cloud-primary speech manifest and the dedicated local manifest, preserving existing container/AWS fallback capability.

Source inspection supports this split because `PyannoteAPIDiarizationProvider` does not import local pyannote/Torch, while `PyannoteDiarizationProvider` loads those dependencies only when the optional local provider executes.

This packaging split does not execute either provider and does not deploy AWS.

## Render service / Blueprint reconciliation evidence

Canonical GitHub `main` at issue #964 start: `53ee1b5e27b89fb436fd72da342cd6f947a667b0`.

Connected Render inspection of the existing service reports:

- service ID `srv-da2f88n40ujc73a8m26g`;
- repository `https://github.com/darenprince/darenprince-author`;
- branch `main`;
- root directory `VoxVector`;
- plan `free`;
- region `oregon`;
- one instance;
- health path `/health`;
- auto-deploy disabled;
- build command `pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`;
- start command `uvicorn api.app:app --host 0.0.0.0 --port $PORT`.

The last recorded deployment before the #964 source change is `dep-dahi2ics728c73b6ujug`, `live`, on exact source `420536771875c6948be51851118b58cb04a596e6`. The later `53ee1b5...` merge was documentation-only and Render auto-deploy is off, so no new backend deployment is inferred.

The owner-provided Render export generated `2026-09-10T21:38:48Z` independently matches the repository/service/root/runtime/plan/region/build/start/health/domain/auto-deploy fields. Exported environment values are redacted as `sync: false` and are not used as value evidence.

The root `render.yaml` under #964 now records the connected service shape and the non-secret bounded profile above. Protected environment variables are intentionally omitted. Render's documented existing-service behavior preserves environment variables that are omitted from a Blueprint unless the Blueprint overwrites them, so secret credentials stay server-managed rather than being copied into Git.

## CORS contract

`VoxVector/api/app.py` falls back to wildcard `*` only when `CORS_ORIGINS` is absent. The Blueprint no longer leaves that production setting ambiguous and instead defines the explicit browser origin list above. The same value is shown in `api/.env.example`.

CORS configuration establishes browser request policy only. It does not authenticate a caller or prove browser behavior.

## Memory admission contract

`VOXVECTOR_MEMORY_LIMIT_MB` and `VOXVECTOR_MEMORY_HEADROOM_MB` are operational guardrails used before heavyweight downstream work.

At the 512/96 reference, the application admission ceiling is 416 MiB. Merged #967 additionally uses fail-fast process-wide single-flight composite admission and a locked RSS recheck so competing downstream work cannot queue behind an active heavyweight phase after its request has already failed.

These values do not alter Render's actual platform limit and are not scientific eligibility thresholds.

The historical controlled 2026-09-10 run showed why this boundary exists: API-parent RSS rose to roughly 482.58 MiB after the provider transition, Render sampled 519,041,020 bytes against a 536,870,900-byte service limit, and the API process restarted. The owner confirmed the incident was a memory problem.

## Process and run identity contract

A Python API process receives a fresh application-generated `process_instance_id` when it starts. `RENDER_INSTANCE_ID`, when present, is retained separately as `render_instance_id` infrastructure provenance.

The persisted route-owned analysis identifier remains `run_id`. The canonical analytical pipeline's internal UUID is retained separately as `pipeline_run_id` and must not replace persisted case-run identity.

## Render deployment-control contract

The canonical protected manual path remains:

`Developer Console → POST /v1/developer/render/deploy → authenticated server runtime → RENDER_DEPLOY_HOOK_URL → Render deploy hook`

For engineering execution with authorized Render tooling, a deliberate service deployment may also be triggered directly after an approved merge because automatic deployment is disabled. Either trigger path establishes only a deployment request; terminal deploy state, exact source and runtime readback remain separate evidence.

After a deployment request, verification must independently establish:

1. a new Render deployment exists;
2. it targets the intended Git commit;
3. it reaches terminal `live` state;
4. `/health` responds successfully;
5. the runtime reports the intended backend `source_revision` and non-secret profile;
6. browser behavior is checked separately when required.

## Verification rule

Create or source-control only variables actually accepted by canonical implementation. A key in a provider-generated export is not proof of its runtime value. A value in Git is not proof a deployed process is using it.

Provider configuration is not provider execution. Blueprint reconciliation is not deployment. Render `live` is not fresh `/health`. None of these states is scientific validation.

## Service references

- GitHub/GitHub Actions: source and QA authority.
- Render: original VoxVector API runtime.
- Supabase: authentication, persistence, diagnostics and private media.
- AWS ECS: separate API environment.
- Hugging Face: optional local Community-1 credential/provider boundary only.
