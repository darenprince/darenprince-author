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

Canonical GitHub `main` is `420536771875c6948be51851118b58cb04a596e6`.

Connected Render inspection establishes:

- workspace `tea-da2errdg1s2s73cl4eeg`;
- service `voxvector-api` (`srv-da2f88n40ujc73a8m26g`);
- branch `main`;
- root `VoxVector`;
- plan `free`, one instance, Oregon;
- health path `/health`;
- auto-deploy disabled;
- current deploy `dep-dahi2ics728c73b6ujug`, `live`;
- deployed source exact `420536771875c6948be51851118b58cb04a596e6`;
- deploy trigger `api`;
- deployment finished `2026-09-10T21:36:23.3655Z`;
- live build command `pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`;
- start command `uvicorn api.app:app --host 0.0.0.0 --port $PORT`.

The owner-provided Render export generated `2026-09-10T21:38:48Z` independently matches repository URL, service name, Python runtime, free plan, Oregon region, root directory, build/start commands, health path, `voxvector.crownlabs.tech` domain and auto-deploy-off state. Its environment entries are redacted as `sync: false`; the export is evidence of names/presence, not secret or non-secret values.

The canonical root `render.yaml` instead specifies `pip install -r api/requirements.txt && pip install -r api/requirements-transcription.txt`.

That is active infrastructure-as-code drift. Issue #964 owns reconciliation of the Render-generated export/live service into the **existing root `render.yaml`**. Do not upload, commit, or provision a second Blueprint for `voxvector-api`.

Root `render.yaml` also declares `CORS_ORIGINS` as server-managed, while the owner export does not list it. Current backend source defaults to `*` when `CORS_ORIGINS` is absent. This difference must be reviewed deliberately under #964; the redacted export does not prove the runtime value or intended final policy.

Secrets and protected provider values remain external. Reproducible non-secret runtime constraints should remain source-controlled where the Render Blueprint specification supports them.

No fresh `/health` response for exact deployed source `420536...` is recorded by the current synchronization pass. Render `live` is deployment evidence only.

## Current runtime reliability boundary

Historical deployed source `f0dda136...` successfully completed faster-whisper beam-1 transcription against the controlled 183.3-second WAV, then encountered confirmed post-transcription memory exhaustion during the transition to downstream analysis.

PR #962 merged the first repair foundation. PR #967 then merged the reviewed bounded Stage 10 composite admission and stable route-owned run-identity follow-up as current `main` `420536...`. Current Render is `live` on that exact source.

Issue #941 has been reopened because source merge/deployment did not execute all of its production acceptance criteria. Before accepting the controlled rerun, #964 should first reconcile the final dependency/configuration profile. Then the same controlled WAV must prove durable provider checkpointing and Stage 10 completion or explicit bounded refusal without uncontrolled process restart.

This reliability work is not a deployment-policy or scientific-validation change.

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

Issue #920 owns verification of this exact protected path. The current live `dep-dahi2ics728c73b6ujug` deployment is API-triggered and therefore does not satisfy #920 merely because it is live.

Required #920 evidence remains:

`Developer Console action → hook accepted → new Render deploy observed → intended commit matched → deploy live → backend source_revision verified → fresh /health → browser/runtime verification when required`

## Blueprint policy

`render.yaml` at repository root is the sole canonical VoxVector Render Blueprint owner.

Rules:

1. Do not create `render-v2.yaml`, `render-final.yaml`, a second service definition, or another Blueprint for the same service.
2. Treat a provider-generated Blueprint export as reconciliation evidence, not automatically canonical source.
3. Preserve protected secrets with external management such as `sync: false` where appropriate.
4. Do not infer redacted environment values from a provider export.
5. Keep reproducible non-secret settings explicit in Git where supported.
6. Resolve live-vs-source drift intentionally from actual runtime requirements.
7. Validate Blueprint syntax and inspect the diff before syncing it to Render.
8. Verify the existing service after any deliberate Blueprint sync and ensure no duplicate service was provisioned.

The current `requirements-speech.txt` versus `requirements-transcription.txt` difference matters because the broader speech set includes local `pyannote.audio`/PyTorch dependencies. The canonical production primary diarization architecture is the cloud `pyannote_api` adapter; local Community-1 is an optional explicit fallback. #964 will resolve the dependency set deliberately from actual source/runtime need rather than assuming either current state is automatically correct.

## Process and hosting identity boundary

The API's application `process_instance_id` identifies the active Python process and must change when Python restarts. Render's provider-supplied infrastructure instance identity is retained separately as `render_instance_id` when available.

A stable hosting instance ID is not evidence that the same Python process survived. Current source includes this distinction; reopened #941 must read back and exercise it on the reconciled candidate runtime.

The persisted route-owned analysis identifier remains `run_id`. The pipeline-internal analytical UUID is retained separately as `pipeline_run_id` and must not replace persisted case-run identity.

## Supabase boundary

The existing production media path is:

`Browser → GitHub Pages frontend → Render-hosted FastAPI API → Supabase private media storage`

Render executes the API request but is not the durable media store. GitHub Pages serves the frontend artifact but is not the API runtime.

The previously verified Supabase state showed `voxvector-user-admin` ACTIVE, version 2, with JWT verification enabled. That infrastructure state is separate from Render deployment and from #931's remaining PR #974 integration/browser profile acceptance.

## Frontend publication / authenticated-entry boundary

Exact-main GitHub Pages workflow `34532394423` succeeded for `420536...`. That is publication-workflow evidence, not interactive browser verification.

Current `main` still lacks the requested login-time API wake in `AuthGate.jsx`. Draft PR #974 under #931 contains that candidate repair and shared role-aware self-profile wiring, but it is not merged or deployed. Its prior QA predates the #967 main advance and must be refreshed against current `main` before merge recommendation.

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
- controlled runtime proof #941
- current-state synchronization #975
