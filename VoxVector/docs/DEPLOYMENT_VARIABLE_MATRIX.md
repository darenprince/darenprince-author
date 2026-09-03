# VoxVector Deployment Variable Matrix

**Date:** 2026-09-03  
**Purpose:** deployment configuration checklist. Do not place secret values in GitHub source, documentation, client bundles, or public dashboard exports.

| Variable / setting | Purpose | Render | AWS ECS | Notes |
|---|---|---|---|---|
| `HF_TOKEN` or canonical accepted equivalent | Hugging Face access for diarization runtime | [Render dashboard](https://dashboard.render.com/) | [AWS Secrets Manager](https://console.aws.amazon.com/secretsmanager/) | Secret. Exact accepted name must match canonical API. |
| `VOXVECTOR_DIARIZATION_PROVIDER` | Select diarization provider | Render environment | ECS task environment | Use only supported canonical provider values. |
| `VOXVECTOR_DIARIZATION_MODEL` | Select diarization model | Render environment | ECS task environment | Model availability must be verified at runtime. |
| `VOXVECTOR_TRANSCRIPTION_PROVIDER` | Select transcription provider | Render environment | ECS task environment | Required before adapter becomes execution-ready. |
| `VOXVECTOR_TRANSCRIPTION_MODEL` | Select transcription model | Render environment | ECS task environment | Keep aligned with provider capability. |
| `VOXVECTOR_SOURCE_REVISION` | Deployment provenance | Render build/runtime metadata | ECS workflow/task definition | Prefer workflow-injected commit SHA. |
| `VOXVECTOR_CURRENT_COMMIT_QA` | Source-specific QA provenance | Render deployment metadata | ECS workflow/task definition | Must come from real QA execution. |
| Supabase server credentials | Diagnostics, persistence, private media | Render secret environment | AWS Secrets Manager | Existing canonical storage boundary; do not duplicate unnecessarily. |

## Service links

- [GitHub repository](https://github.com/darenprince/darenprince-author)
- [GitHub Actions](https://github.com/darenprince/darenprince-author/actions)
- [Render dashboard](https://dashboard.render.com/)
- [AWS ECS](https://console.aws.amazon.com/ecs/)
- [AWS Secrets Manager](https://console.aws.amazon.com/secretsmanager/)
- [AWS ECR](https://console.aws.amazon.com/ecr/)
- [Hugging Face settings](https://huggingface.co/settings/tokens)

## Verification rule

Create only variables actually accepted by the canonical API implementation. Before deployment, inspect the runtime configuration code and workflow environment mapping. A variable existing in a cloud dashboard is not evidence that the running application reads it.
