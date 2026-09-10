# VoxVector Deployment Boundary

**Status:** Canonical active policy  
**Effective:** 2026-09-10

## Purpose

This document defines the deployment boundary for VoxVector so developers, automation, and AI agents do not confuse source state, provider configuration, historical infrastructure records, deployment, runtime execution, or browser verification.

## Canonical deployment surfaces

| Surface | Canonical system | Current endpoint / responsibility |
|---|---|---|
| Public frontend | GitHub Pages | `https://darenprince.com/voxvector/` |
| Original API | Render | `https://voxvector.crownlabs.tech` |
| AWS API environment | AWS ALB + ECS Fargate | `https://awsapi.crownlabs.tech` |
| Authentication, persistence, diagnostics, private media | Supabase | Existing configured VoxVector project |
| Repository source and QA | GitHub / GitHub Actions | Canonical source, review and workflow evidence |

The original Render API domain is preserved. The AWS endpoint is a separate environment and does not silently replace Render.

## Current Render production state — 2026-09-10

Connected inspection establishes:

- workspace `tea-da2errdg1s2s73cl4eeg`;
- service `voxvector-api` (`srv-da2f88n40ujc73a8m26g`);
- branch `main`;
- root `VoxVector`;
- plan `free`, one instance, Oregon;
- health path `/health`;
- auto-deploy disabled;
- current deploy `dep-dah7usjl550s73e00350`, `live`;
- deployed source exact `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2`;
- deploy trigger `api`;
- live build command `pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`.

The canonical root `render.yaml` instead specifies `pip install -r api/requirements.txt && pip install -r api/requirements-transcription.txt`.

That is active infrastructure-as-code drift. Issue #964 owns reconciliation of the Render-generated export/live service into the **existing root `render.yaml`**. Do not upload, commit, or provision a second Blueprint for `voxvector-api`.

Secrets and protected provider values remain external. Non-secret runtime constraints that must be reproducible should remain source-controlled where the Render Blueprint specification supports them.

## Current runtime reliability boundary

The current deployed `f0dda136...` revision successfully completed faster-whisper beam-1 transcription against the controlled 183.3-second WAV, then encountered confirmed post-transcription memory exhaustion during the transition to downstream analysis. Issue #941 / draft PR #962 owns that source repair.

That reliability work is not a deployment-policy change. PR #962 must be exact-head tested, reviewed and merged before any deliberate production deployment. Deployment of the eventual merge must then be verified independently through Render and fresh `/health` readback.

## Required deployment paths

Public application:

`source on main → GitHub Actions → VoxVector React build → GitHub Pages artifact → https://darenprince.com/voxvector/`

Original API:

`approved source on main → authenticated Developer Console/API deployment request → protected Render deploy hook → Render deployment → exact backend source_revision → /health → https://voxvector.crownlabs.tech`

AWS API environment:

`VoxVector backend → GitHub Actions → ECR → ECS Fargate → ALB HTTPS → https://awsapi.crownlabs.tech`

The frontend and backend deployment boundaries remain separate.

## Render manual deployment boundary

The protected manual path is:

`Developer Console Deploy Now → POST /v1/developer/render/deploy → authenticated FastAPI route → server-only RENDER_DEPLOY_HOOK_URL → Render deploy hook`

The browser never receives the hook URL.

A successful hook response means trigger acceptance only. It does not establish that a deployment exists, targets the intended commit, reaches `live`, passes `/health`, reports the intended source revision, or is browser verified.

Issue #920 owns verification of this exact protected path. The current live `dep-dah7usjl550s73e00350` deployment is API-triggered and therefore does not satisfy #920 merely because it is live.

Required #920 evidence remains:

`Developer Console action → hook accepted → new Render deploy observed → intended commit matched → deploy live → backend source_revision verified → fresh /health → browser/runtime verification when required`

## Blueprint policy

`render.yaml` at repository root is the sole canonical VoxVector Render Blueprint owner.

Rules:

1. Do not create `render-v2.yaml`, `render-final.yaml`, a second service definition, or another Blueprint for the same service.
2. Treat a provider-generated Blueprint export as reconciliation evidence, not automatically canonical source.
3. Preserve protected secrets with external management such as `sync: false` where appropriate.
4. Keep reproducible non-secret settings explicit in Git where supported.
5. Resolve live-vs-source drift intentionally from actual runtime requirements.
6. Validate Blueprint syntax and inspect the diff before syncing it to Render.
7. Verify the existing service after any deliberate Blueprint sync and ensure no duplicate service was provisioned.

The current `requirements-speech.txt` versus `requirements-transcription.txt` difference matters because the broader speech set includes optional local pyannote/PyTorch dependencies. The canonical production primary diarization architecture is the cloud `pyannote_api` adapter; local Community-1 is an optional explicit fallback. #964 will resolve the dependency set deliberately rather than assuming either current state is automatically correct.

## Process and hosting identity boundary

The API's application `process_instance_id` identifies the active Python process and must change when Python restarts. Render's provider-supplied infrastructure instance identity is retained separately as `render_instance_id` when available.

A stable hosting instance ID is not evidence that the same Python process survived. This distinction is part of the active #941 reliability source contract and must be read back after the reviewed revision is deployed.

## Supabase boundary

The existing production media path is:

`Browser → GitHub Pages frontend → Render-hosted FastAPI API → Supabase private media storage`

Render executes the API request but is not the durable media store. GitHub Pages serves the frontend artifact but is not the API runtime.

Current connected Supabase evidence also shows `voxvector-user-admin` ACTIVE, version 2, with JWT verification enabled. That infrastructure state is separate from Render deployment and from remaining #931 User Management/browser work.

## AWS HTTPS boundary

The AWS Application Load Balancer terminates HTTPS for `awsapi.crownlabs.tech` using an AWS Certificate Manager certificate validated by DNS. Port 80 redirects to HTTPS. ECS application port 8000 is restricted behind the ALB security group.

The AWS environment remains separate from the active Render golden-case verification path unless a later explicit cutover decision changes that architecture.

## Vercel policy

**Vercel is not part of VoxVector.**

Vercel is retired and is not a supported production host, frontend host, backend host, preview host, build target, deployment target, dependency, configuration source, troubleshooting workaround, or alternative architecture.

Historical references are preserved for traceability and do not override this current policy.

## Historical deployment records

Historical dated documents may record earlier Render deploy IDs, source revisions, auto-deploy assumptions, dependency commands, provider states, or benchmark candidates. Those records are not rewritten solely to look current.

Current state belongs in active canonical records such as this file, `SYSTEM_STATE_REPORT.md`, `CURRENT_ENGINEERING_STATE_2026-09-04.md`, `DEPLOYMENT_VARIABLE_MATRIX.md`, and the live issue tracker.

## Verification rule

Deployment work follows `DEVELOPMENT_WORKFLOW.md` and tracker #915. Link issue, PR, source revision, target environment, and acceptance evidence.

Keep these claims separate:

`source → exact-head QA → merge → deployment trigger → deploy record → live state → runtime /health → provider execution → persisted artifacts → browser verification`

No step may be inferred solely from the one before it.

Engineering deployment evidence does not establish scientific validation.

## Canonical related records

- `docs/ENDPOINT_REGISTRY.md`
- `docs/DEPLOYMENT_VARIABLE_MATRIX.md`
- `docs/SYSTEM_ARCHITECTURE_AND_AUTO_WORKFLOW.md`
- `docs/SYSTEM_STATE_REPORT.md`
- `docs/RUNTIME_MEMORY_CONSTRAINTS.md`
- `docs/MVP_RELEASE_GATE.md`
- tracker #915
- Render Blueprint reconciliation #964
- runtime-memory repair #941
