# VoxVector Deployment Variable Matrix

**Date:** 2026-09-10  
**Purpose:** deployment configuration checklist. Do not place secret values in GitHub source, documentation, client bundles, or public dashboard exports.

| Variable / setting | Purpose | Render | AWS ECS | Notes |
|---|---|---|---|---|
| `PYANNOTE_KEY` or `PYANNOTE_API_KEY` | pyannoteAI cloud authentication for the primary diarization runtime | [Render dashboard](https://dashboard.render.com/) | [AWS Secrets Manager](https://console.aws.amazon.com/secretsmanager/) | Secret. `PYANNOTE_KEY` is preferred. |
| `HF_TOKEN` or `HUGGINGFACE_TOKEN` | Hugging Face access for the optional local Community-1 fallback | [Render dashboard](https://dashboard.render.com/) | [AWS Secrets Manager](https://console.aws.amazon.com/secretsmanager/) | Secret. Not the cloud-primary credential. |
| `VOXVECTOR_DIARIZATION_PROVIDER` | Select diarization provider | Render environment | ECS task environment | Use only supported canonical provider values. |
| `VOXVECTOR_PYANNOTE_API_MODEL` | Optionally select the cloud diarization model | Render environment | ECS task environment | Provider support must be verified at runtime. |
| `VOXVECTOR_DIARIZATION_FALLBACK` | Select the optional fallback provider | Render environment | ECS task environment | Current supported local value is `pyannote_local`; inert unless fallback is enabled. |
| `VOXVECTOR_DIARIZATION_FALLBACK_ENABLED` | Enable explicit fallback after primary failure | Render environment | ECS task environment | Defaults false. Fallback use must be recorded in provenance. |
| `VOXVECTOR_ENABLE_DIARIZATION_RUNS` | Permit route-triggered diarization execution | Render environment | ECS task environment | Execution gate; separate from provider readiness. |
| `VOXVECTOR_TRANSCRIPTION_PROVIDER` | Select transcription provider | Render environment | ECS task environment | Required before adapter becomes execution-ready. |
| `VOXVECTOR_WHISPER_MODEL` | Select faster-whisper model | Render environment | ECS task environment | Canonical adapter reads this name; current profile uses `base`. |
| `VOXVECTOR_WHISPER_DEVICE` | Select inference device | Render environment | ECS task environment | Current constrained profile uses `cpu`. |
| `VOXVECTOR_WHISPER_COMPUTE_TYPE` | Select inference compute type | Render environment | ECS task environment | Current constrained profile uses `int8`. |
| `VOXVECTOR_WHISPER_BEAM_SIZE` | Control decoding beam size | Render environment | ECS task environment | Current constrained profile uses `1`; deployment/runtime readback remains a separate verification gate. |
| `VOXVECTOR_SOURCE_REVISION` | Deployment provenance | Render build/runtime metadata | ECS workflow/task definition | Prefer workflow-injected commit SHA. |
| `VOXVECTOR_CURRENT_COMMIT_QA` | Source-specific QA provenance | Render deployment metadata | ECS workflow/task definition | Must come from real QA execution. |
| `RENDER_API_KEY` | Server-side Render observability bridge | Render secret environment | Not used by active AWS path | Required by Developer Console Render status/log routes; never expose to browser. |
| `RENDER_SERVICE_ID` | Select the original VoxVector Render service | Render environment | Not used by active AWS path | Connected service is `srv-da2f88n40ujc73a8m26g`; do not treat workspace ID as service ID. |
| `RENDER_DEPLOY_HOOK_URL` | Protected manual deploy trigger for the Developer Console | Render secret environment | Not used by active AWS path | Secret deploy-hook URL. Never expose to browser code, documentation exports, GitHub source, diagnostics, or case artifacts. |
| Render `autoDeploy` / automatic deploy trigger | Prevent automatic production deploys from repository pushes | **Disabled** | N/A | Connected 2026-09-08 inspection: `autoDeploy=no`, automatic deploy trigger off. Manual protected hook is the production Render deployment boundary. |
| Supabase server credentials | Diagnostics, persistence, private media | Render secret environment | AWS Secrets Manager | Existing canonical storage boundary; do not duplicate unnecessarily. |

## Service links

- [GitHub repository](https://github.com/darenprince/darenprince-author)
- [GitHub Actions](https://github.com/darenprince/darenprince-author/actions)
- [Render dashboard](https://dashboard.render.com/)
- [AWS ECS](https://console.aws.amazon.com/ecs/)
- [AWS Secrets Manager](https://console.aws.amazon.com/secretsmanager/)
- [AWS ECR](https://console.aws.amazon.com/ecr/)
- [Hugging Face settings](https://huggingface.co/settings/tokens)

## Current source configuration contract

The canonical backend source profile currently accepts:

```text
VOXVECTOR_TRANSCRIPTION_PROVIDER=faster_whisper
VOXVECTOR_WHISPER_MODEL=base
VOXVECTOR_WHISPER_DEVICE=cpu
VOXVECTOR_WHISPER_COMPUTE_TYPE=int8
VOXVECTOR_WHISPER_BEAM_SIZE=1

VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api
VOXVECTOR_ENABLE_DIARIZATION_RUNS=true
```

The source contract is not a deployment claim. On 2026-09-10, controlled Render transcription evidence on deployed revision `c21b4cf07f6475eddb15c99e67f1ff70d6a50167` showed `beam_size=3` during two failed transcription attempts. Issue #941 tracks the bounded correction and requires a deliberate deployment plus runtime readback before the deployed profile is represented as beam 1.

For the cloud credential, the canonical adapter accepts either:

```text
PYANNOTE_KEY
PYANNOTE_API_KEY
```

Use `PYANNOTE_KEY` as the preferred deployment secret name. The optional local Community-1 fallback separately accepts `HF_TOKEN` or `HUGGINGFACE_TOKEN` when `VOXVECTOR_DIARIZATION_FALLBACK=pyannote_local` and `VOXVECTOR_DIARIZATION_FALLBACK_ENABLED=true` are both set.

**Important:** Secret values are never written into GitHub, documentation, or client-side exports. They must be supplied through the target deployment secret manager.

## Render deployment-control contract — verified 2026-09-08

The connected Render account exposes one workspace, `My Workspace` (`tea-da2errdg1s2s73cl4eeg`), and one VoxVector Render service, `voxvector-api` (`srv-da2f88n40ujc73a8m26g`). The service reports automatic deployment disabled. That state is intentional and must remain the default unless a future explicit architecture decision changes it.

The canonical manual deployment path is:

`Developer Console → POST /v1/developer/render/deploy → authenticated server runtime → RENDER_DEPLOY_HOOK_URL → Render deploy hook`

The browser never receives the deploy-hook URL. The API runtime verifies the authenticated developer session and sends the POST server-side.

A 2xx hook response establishes only **trigger acceptance**. The response body may be JSON, empty, or text and is not trusted as deployment-completion evidence. Issue #920 adds regression coverage for all three successful response shapes after historical runtime evidence showed a non-JSON hook body could produce a `JSONDecodeError` and HTTP 500.

After hook acceptance, verification must independently establish:

1. a new Render deployment exists;
2. it targets the intended Git commit;
3. it reaches terminal `live` state;
4. `/health` responds successfully;
5. the runtime reports the intended backend `source_revision`;
6. browser/runtime behavior is checked when required by the task.

If any of those steps are not observed, report them as unresolved. Do not use `status: accepted` from the deploy route as a synonym for deployed.

The current connector does not expose a read-back of secret environment values, so this document does **not** claim that the live `RENDER_DEPLOY_HOOK_URL` value was inspected on September 8. Its protected presence must be inferred only from successful authenticated runtime behavior or verified through an authorized secret-management surface that does not reveal the value in project records.

## Historical Render status update — 2026-09-03

On 2026-09-03, the canonical non-secret speech configuration was applied to the connected `voxvector-api` Render service and Render triggered deployment `dep-dad476dg1s2s73evju20`. The Hugging Face token was intentionally not transmitted or stored by the repository tooling.

This is preserved as a dated historical observation and does not override the current manual deployment-control state above.

## Verification rule

Create only variables actually accepted by the canonical API implementation. Before deployment, inspect the runtime configuration code and workflow environment mapping. A variable existing in a cloud dashboard is not evidence that the running application reads it.

Likewise, a configured deploy-hook variable is not evidence that the Developer Console button executed it, and a successful hook request is not evidence that the resulting deployment reached `live`.

## pyannote provider policy update — 2026-09-04

| Variable | Purpose | Secret boundary | Notes |
|---|---|---|---|
| `VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api` | Select pyannoteAI cloud as primary | Render/ECS environment | No local model load required for the cloud adapter. |
| `PYANNOTE_KEY` | pyannoteAI cloud authentication | Protected server environment only | Preferred secret name; never expose to browser or repository. |
| `PYANNOTE_API_KEY` | Alternate pyannoteAI secret name | Protected server environment only | Accepted alias. |
| `VOXVECTOR_PYANNOTE_API_MODEL` | Optional cloud model selection | Render/ECS environment | Must be a provider-supported model. |
| `VOXVECTOR_DIARIZATION_FALLBACK=pyannote_local` | Explicit local fallback selection | Render/ECS environment | Does nothing unless fallback is enabled. |
| `VOXVECTOR_DIARIZATION_FALLBACK_ENABLED=true` | Permit fallback after primary failure | Render/ECS environment | Fallback use is recorded in provenance. |

The existing `HF_TOKEN` / `HUGGINGFACE_TOKEN` variables remain credentials for the local Community-1 path and are not interchangeable with the pyannoteAI cloud API key.
