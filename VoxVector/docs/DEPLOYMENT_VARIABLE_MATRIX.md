# VoxVector Deployment Variable Matrix

**Date:** 2026-09-03  
**Purpose:** deployment configuration checklist. Do not place secret values in GitHub source, documentation, client bundles, or public dashboard exports.

| Variable / setting | Purpose | Render | AWS ECS | Notes |
|---|---|---|---|---|
| `HF_TOKEN` or canonical accepted equivalent | Hugging Face access for diarization runtime | [Render dashboard](https://dashboard.render.com/) | [AWS Secrets Manager](https://console.aws.amazon.com/secretsmanager/) | Secret. Exact accepted name must match canonical API. |
| `VOXVECTOR_DIARIZATION_PROVIDER` | Select diarization provider | Render environment | ECS task environment | Use only supported canonical provider values. |
| `VOXVECTOR_DIARIZATION_MODEL` | Select diarization model | Render environment | ECS task environment | Model availability must be verified at runtime. |
| `VOXVECTOR_TRANSCRIPTION_PROVIDER` | Select transcription provider | Render environment | ECS task environment | Required before adapter becomes execution-ready. |
| `VOXVECTOR_WHISPER_MODEL` | Select faster-whisper model | Render environment | ECS task environment | Canonical adapter reads this name; current profile uses `base`. |
| `VOXVECTOR_WHISPER_DEVICE` | Select inference device | Render environment | ECS task environment | Current Render profile uses `cpu`. |
| `VOXVECTOR_WHISPER_COMPUTE_TYPE` | Select inference compute type | Render environment | ECS task environment | Current Render profile uses `int8`. |
| `VOXVECTOR_WHISPER_BEAM_SIZE` | Control decoding beam size | Render environment | ECS task environment | Current Render profile uses `3`. |
| `VOXVECTOR_SOURCE_REVISION` | Deployment provenance | Render build/runtime metadata | ECS workflow/task definition | Prefer workflow-injected commit SHA. |
| `VOXVECTOR_CURRENT_COMMIT_QA` | Source-specific QA provenance | Render deployment metadata | ECS workflow/task definition | Must come from real QA execution. |
| `RENDER_DEPLOY_HOOK_URL` | Protected manual deploy trigger for the Developer Console | Render secret environment | Not used by active AWS path | Secret deploy-hook URL. Never expose to browser code, documentation exports, or GitHub source. |
| Supabase server credentials | Diagnostics, persistence, private media | Render secret environment | AWS Secrets Manager | Existing canonical storage boundary; do not duplicate unnecessarily. |

## Service links

- [GitHub repository](https://github.com/darenprince/darenprince-author)
- [GitHub Actions](https://github.com/darenprince/darenprince-author/actions)
- [Render dashboard](https://dashboard.render.com/)
- [AWS ECS](https://console.aws.amazon.com/ecs/)
- [AWS Secrets Manager](https://console.aws.amazon.com/secretsmanager/)
- [AWS ECR](https://console.aws.amazon.com/ecr/)
- [Hugging Face settings](https://huggingface.co/settings/tokens)

## Current verified configuration contract

The canonical backend currently accepts:

```text
VOXVECTOR_TRANSCRIPTION_PROVIDER=faster_whisper
VOXVECTOR_WHISPER_MODEL=base
VOXVECTOR_WHISPER_DEVICE=cpu
VOXVECTOR_WHISPER_COMPUTE_TYPE=int8
VOXVECTOR_WHISPER_BEAM_SIZE=3

VOXVECTOR_DIARIZATION_PROVIDER=pyannote
VOXVECTOR_DIARIZATION_MODEL=pyannote/speaker-diarization-community-1
```

For the Hugging Face credential, the canonical pyannote adapter accepts either:

```text
HF_TOKEN
HUGGINGFACE_TOKEN
```

Use `HF_TOKEN` as the preferred deployment secret name.

**Important:** The pyannote token value was not written into GitHub, documentation, or any client-side export. It must be supplied through the deployment secret manager.

## Render status update

On 2026-09-03, the canonical non-secret speech configuration was applied to the connected `voxvector-api` Render service and Render triggered deployment `dep-dad476dg1s2s73evju20`. The Hugging Face token was intentionally not transmitted or stored by the repository tooling.

## Verification rule

Create only variables actually accepted by the canonical API implementation. Before deployment, inspect the runtime configuration code and workflow environment mapping. A variable existing in a cloud dashboard is not evidence that the running application reads it.


## Manual Developer Console deployment

The Developer Console can request an on-demand Render deployment through the protected server-side route:

`POST /v1/developer/render/deploy`

The browser never receives the deploy-hook URL. The API runtime reads `RENDER_DEPLOY_HOOK_URL` from its protected environment, verifies the authenticated developer session, sends the server-side POST to Render, and returns only the accepted trigger state.

This control requests a deployment; it does not prove the deployment completed successfully. The Render Runtime panel must be refreshed or allowed to poll for the subsequent deployment/runtime state.
