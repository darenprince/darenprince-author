# VoxVector Cloud Platform Runtime Audit

**Audit date:** 2026-09-04  
**Source of truth:** `VoxVector/docs/CLOUD_PLATFORM_RUNTIME_AUDIT_2026-09-03.md`

## Executive status

The current VoxVector deployment architecture remains intentionally separated by function: the public React application is delivered through GitHub Pages, the original canonical FastAPI API remains on Render at `https://voxvector.crownlabs.tech`, and a separately addressed AWS API environment is available at `https://awsapi.crownlabs.tech`.

Supabase remains the configured authentication, persistence, diagnostics, and private-media boundary. The AWS environment is an additional deployment environment and must not silently replace the original API or frontend API target.

## Current live Render runtime

The live `/health` response observed on 2026-09-04 reports:

- pipeline `0.2.26`
- source revision `23677b258a60e5cf25287cc0dce3b199f472a7c1`
- runtime self-test `passed`
- diagnostic/media storage `configured_media_ready`
- media storage `true`
- maximum sample rate `48,000 Hz`
- maximum media size `250 MiB`
- faster-whisper provider configured and execution-ready
- pyannote Community-1 provider configured and execution-ready
- Hugging Face token presence detected by runtime
- current commit QA field `external_workflow_required`

The provider state demonstrates runtime configuration/readiness. It does not demonstrate successful model execution, model quality, or scientific validity.

## Current migration boundary

The backend compute boundary is the only migration boundary under consideration. GitHub Pages and Supabase remain unchanged. Render remains the original API runtime. AWS remains a separately addressed environment pending full authenticated runtime and workload verification.

## Render

The live service is `voxvector-api`, rooted at `VoxVector`, on the `main` branch in the Oregon region. It uses Python/FastAPI, automatic deployment, and `/health` checks.

The latest live deployment observed in the current engineering checkpoint is the source revision `23677b258a60e5cf25287cc0dce3b199f472a7c1`.

## AWS

The AWS environment includes the previously created ECS/Fargate deployment, ECR image repository, Application Load Balancer, target group, HTTPS certificate, and CloudWatch logging boundary. The public AWS hostname is `awsapi.crownlabs.tech`.

The target path is:

`awsapi.crownlabs.tech → HTTPS ALB → ECS Fargate → VoxVector API :8000`

The AWS target was previously observed healthy and the ECS port was restricted to ALB-origin traffic rather than unrestricted public access.

AWS still requires full authenticated case-workflow parity and controlled workload verification before it can be designated the primary production API runtime.

## Speech-provider migration requirements

The target runtime must carry the same canonical provider configuration:

- `VOXVECTOR_TRANSCRIPTION_PROVIDER=faster_whisper`
- `VOXVECTOR_WHISPER_MODEL=base` or an explicitly evaluated model choice
- `VOXVECTOR_WHISPER_DEVICE=cpu`
- `VOXVECTOR_WHISPER_COMPUTE_TYPE=int8`
- `VOXVECTOR_WHISPER_BEAM_SIZE=3`
- `VOXVECTOR_DIARIZATION_PROVIDER=pyannote`
- `VOXVECTOR_DIARIZATION_MODEL=pyannote/speaker-diarization-community-1`
- `HF_TOKEN` as a protected deployment secret

Provider configuration must be reproduced without placing the token in GitHub source, client code, documentation, or exported reports.

## Required benchmark measurements

Before any production cutover, compare the same canonical container/workload across environments using:

- startup/readiness
- upload latency
- analysis duration
- peak CPU
- peak memory
- provider memory behavior
- process stability
- request failure behavior
- authenticated case persistence
- transcript/speaker/alignment artifact persistence

A cloud migration result is infrastructure evidence, not scientific validation.

## Developer Console

The Developer Console is the engineering cockpit and now exposes runtime health, 21-stage status, infrastructure status, structured audits, deployment-variable references, and copy/download controls for audit/report/log evidence.

## Scientific boundary

Neither Render health, AWS health, provider readiness, nor successful software execution establishes deception-detection validity. Scientific validation remains a separate workstream with task-specific operational definitions, speaker-disjoint evaluation, calibration, uncertainty, robustness, leakage controls, and replication as applicable.

**Full canonical audit:** `VoxVector/docs/CLOUD_PLATFORM_RUNTIME_AUDIT_2026-09-03.md`
