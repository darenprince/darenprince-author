# VoxVector Deployment Boundary

**Status:** Canonical active policy  
**Effective:** 2026-09-10

## Purpose

This document defines the deployment boundary for VoxVector so developers, automation, and AI agents do not confuse source state, provider configuration, historical infrastructure records, deployment, runtime execution, or browser verification.

## Canonical deployment surfaces

| Surface                                                 | Canonical system        | Current endpoint / responsibility              |
| ------------------------------------------------------- | ----------------------- | ---------------------------------------------- |
| Public frontend                                         | GitHub Pages            | `https://darenprince.com/voxvector/`           |
| Original API                                            | Render                  | `https://voxvector.crownlabs.tech`             |
| AWS API environment                                     | AWS ALB + ECS Fargate   | `https://awsapi.crownlabs.tech`                |
| Authentication, persistence, diagnostics, private media | Supabase                | Existing configured VoxVector project          |
| Repository source and QA                                | GitHub / GitHub Actions | Canonical source, review and workflow evidence |

The original Render API domain is preserved. The AWS endpoint is a separate environment and does not silently replace Render.

## Current Render production evidence — 2026-09-10

Canonical GitHub `main` at the start of issue #964 is `53ee1b5e27b89fb436fd72da342cd6f947a667b0`.

Connected Render inspection establishes:

- workspace `tea-da2errdg1s2s73cl4eeg`;
- service `voxvector-api` (`srv-da2f88n40ujc73a8m26g`);
- branch `main`;
- root `VoxVector`;
- plan `free`, one instance, Oregon;
- health path `/health`;
- auto-deploy disabled;
- last recorded deployment before the #964 source change `dep-dahi2ics728c73b6ujug`, `live`;
- that deployment source exact `420536771875c6948be51851118b58cb04a596e6`;
- deployment trigger `api`;
- deployment finished `2026-09-10T21:36:23.3655Z`;
- live service build command `pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`;
- start command `uvicorn api.app:app --host 0.0.0.0 --port $PORT`.

The owner-provided Render export generated `2026-09-10T21:38:48Z` independently matches repository URL, service name, Python runtime, free plan, Oregon region, root directory, build/start commands, health path, `voxvector.crownlabs.tech` domain and auto-deploy-off state. Its environment entries are redacted as `sync: false`; the export is evidence of names/presence, not secret or non-secret values.

The later `53ee1b5...` repository revision is documentation-only and Render auto-deploy is disabled, so no newer Render deployment is inferred from that merge.

## Canonical Blueprint reconciliation — issue #964

`render.yaml` at repository root remains the sole canonical VoxVector Render Blueprint owner. Issue #964 reconciles that existing file with the actual `voxvector-api` service rather than creating a second Blueprint or service.

Source inspection resolved the dependency question that previously caused drift:

- `PyannoteAPIDiarizationProvider` is the cloud-primary adapter and does not import `pyannote.audio` or Torch;
- the local `PyannoteDiarizationProvider` imports `pyannote.audio` and Torch only when the optional local Community-1 path executes;
- `speech_providers.py` selects `pyannote_api` independently and only wraps the local path when fallback is explicitly enabled.

Therefore local pyannote/Torch are not required for Render's cloud-primary production path.

The canonical dependency ownership under #964 is:

- `api/requirements-transcription.txt` — faster-whisper transcription dependency;
- `api/requirements-speech.txt` — Render cloud-primary speech manifest that includes the transcription manifest and no local pyannote/Torch stack;
- `api/requirements-diarization-local.txt` — optional local Community-1 dependency manifest containing `pyannote.audio`;
- `VoxVector/Dockerfile` — explicitly installs the local fallback manifest as well, preserving the existing container/AWS optional-local capability instead of removing it as a side effect of the Render correction.

The root Blueprint now records the existing service's repository, `main` branch, free plan, Oregon region, root directory, `requirements-speech.txt` build command, start command, `/health`, custom domain and `autoDeployTrigger: off`.

This source change removes the dependency-definition mismatch while keeping deployment deliberate. It does not by itself alter the currently running Render deployment.

## Non-secret runtime profile ownership

The Blueprint source-controls the bounded non-secret profile required for reproducible Render verification:

- transcription provider `faster_whisper`;
- model `base`;
- device `cpu`;
- compute type `int8`;
- beam size `1`;
- one CPU thread and one worker;
- isolated faster-whisper process enabled;
- 165-second child-process timeout;
- application memory reference `512 MiB`;
- reserved memory headroom `96 MiB`;
- diarization provider `pyannote_api`;
- local diarization fallback `none` / disabled;
- diarization route execution gate disabled for the #941 runtime-stability candidate;
- `OMP_NUM_THREADS=1`;
- `MKL_NUM_THREADS=1`;
- `OPENBLAS_NUM_THREADS=1`;
- `MALLOC_ARENA_MAX=2`;
- `TOKENIZERS_PARALLELISM=false`.

`VOXVECTOR_ENABLE_DIARIZATION_RUNS=false` is deliberate at this boundary. It prevents the separate unverified cloud-diarization request path from changing the controlled #941 memory/runtime experiment. Issue #970 owns enabling that gate and executing cloud-primary diarization after #941 establishes the stable runtime boundary.

Provider configuration is not provider execution.

## CORS ownership

Backend source falls back to `*` when `CORS_ORIGINS` is absent. The generated Render export does not include `CORS_ORIGINS`, so relying on omission would leave production browser policy ambiguous.

The canonical Blueprint therefore owns an explicit production allowlist:

`https://darenprince.com,https://www.darenprince.com,https://voxvector.crownlabs.tech`

This covers the canonical Pages origin, the preserved www origin and the preserved API hostname without using wildcard CORS for the Blueprint-managed production profile.

### Local frontend development

`voxvector/vite.config.js` owns the development API proxy. During `npm run dev`, the existing frontend client uses the same-origin `/voxvector-api` prefix. Vite forwards those requests to `VITE_VOXVECTOR_API_URL` from the selected mode/environment, defaulting to `https://voxvector.crownlabs.tech`, and removes only that prefix. Configure an absolute API URL, not the proxy prefix itself.

This allows localhost development without adding localhost or wildcard entries to production CORS. Bearer authentication, API permission checks, request bodies, query strings, response status and request identifiers remain intact. Supabase sign-in continues to use the configured public project URL and publishable key. Never put service-role or provider credentials in a `VITE_` variable.

From `voxvector/` on Windows, run `npm.cmd ci`, then `npm.cmd run dev -- --host 127.0.0.1 --port 5173 --strictPort`, and open `http://127.0.0.1:5173/voxvector/`. The existing canonical assets must be staged as described by the Pages workflow and development workflow. The API target selects real services: with the default target, uploads and cases use the existing cloud storage. This is not an isolated backend environment.

`npm run build` retains the configured absolute API URL; the development prefix is not injected into production artifacts. `vite preview` serves that production artifact and consequently uses production CORS rules. Use the development server for local authenticated API work.

## Secret environment ownership

Protected values such as `PYANNOTE_KEY`, `HF_TOKEN`, Supabase service-role credentials, Render API credentials and the deploy-hook URL remain server-managed and must never be committed.

Render's Blueprint behavior for an existing service preserves environment variables omitted from the Blueprint unless the Blueprint explicitly overwrites them. The #964 source therefore does not copy provider-generated `sync: false` entries wholesale into Git. The owner export remains evidence of configured names only.

## Current runtime reliability boundary

Historical deployed source `f0dda136...` successfully completed faster-whisper beam-1 transcription against the controlled 183.3-second WAV, then encountered confirmed post-transcription memory exhaustion during the transition to downstream analysis.

PR #962 merged the first repair foundation. PR #967 then merged bounded Stage 10 composite admission and stable route-owned run-identity handling. The last recorded Render deployment before #964 contains those merged runtime changes at source `420536...`.

Issue #941 remains open because source merge/deployment did not execute all production acceptance criteria. After the #964 source is reviewed, merged and deliberately deployed, the same controlled WAV must prove durable provider checkpointing and Stage 10 completion or explicit bounded refusal without uncontrolled process restart.

This reliability work is not a scientific-validation change.

## Required deployment paths

Public application:

`source on main → GitHub Actions → VoxVector React build → GitHub Pages artifact → https://darenprince.com/voxvector/`

Original API:

`approved source on main → deliberate Render deployment → exact backend source_revision → fresh /health → https://voxvector.crownlabs.tech`

Protected Developer Console deployment-control verification remains separately tracked by #920:

`Developer Console Deploy Now → POST /v1/developer/render/deploy → authenticated FastAPI route → server-only RENDER_DEPLOY_HOOK_URL → Render deploy hook`

AWS API environment:

`VoxVector backend → GitHub Actions → ECR → ECS Fargate → ALB HTTPS → https://awsapi.crownlabs.tech`

The frontend, Render backend and AWS backend deployment boundaries remain separate.

## Render manual deployment boundary

A successful deploy-hook response means trigger acceptance only. It does not establish that a deployment exists, targets the intended commit, reaches `live`, passes `/health`, reports the intended source revision, or is browser verified.

Required deployment evidence remains:

`approved source → trigger accepted → new Render deploy observed → intended commit matched → deploy live → backend source_revision verified → fresh /health → runtime/browser verification when required`

## Blueprint policy

Rules:

1. Do not create `render-v2.yaml`, `render-final.yaml`, a second service definition, or another Blueprint for the same service.
2. Treat a provider-generated Blueprint export as reconciliation evidence, not automatically canonical source.
3. Do not infer redacted environment values from a provider export.
4. Preserve protected secrets in the existing Render environment rather than hardcoding them.
5. Keep reproducible non-secret settings explicit in Git where supported.
6. Keep optional local-provider dependencies separate from the cloud-primary Render runtime.
7. Keep automatic production deployment disabled.
8. Validate the Blueprint source and inspect the diff before merge.
9. Deliberately deploy the reviewed merge and verify the existing service; do not provision duplicate infrastructure.

## Process and hosting identity boundary

The API's application `process_instance_id` identifies the active Python process and must change when Python restarts. Render's provider-supplied infrastructure instance identity is retained separately as `render_instance_id` when available.

The persisted route-owned analysis identifier remains `run_id`. The pipeline-internal analytical UUID is retained separately as `pipeline_run_id` and must not replace persisted case-run identity.

## Supabase boundary

The existing production media path is:

`Browser → GitHub Pages frontend → Render-hosted FastAPI API → Supabase private media storage`

Render executes the API request but is not the durable media store. GitHub Pages serves the frontend artifact but is not the API runtime.

The previously verified Supabase state showed `voxvector-user-admin` ACTIVE, version 2, with JWT verification enabled. That infrastructure state is separate from Render deployment and from #931's remaining auth/profile browser acceptance.

## Frontend publication / authenticated-entry boundary

GitHub Pages publication evidence is separate from interactive browser verification. Draft PR #974 under #931 remains the candidate login-wake/shared-profile repair until it is refreshed against current `main`, reviewed, merged and separately browser-verified.

## AWS HTTPS boundary

The AWS Application Load Balancer terminates HTTPS for `awsapi.crownlabs.tech` using an AWS Certificate Manager certificate validated by DNS. Port 80 redirects to HTTPS. ECS application port 8000 is restricted behind the ALB security group.

The AWS environment remains separate from the active Render golden-case verification path unless a later explicit cutover decision changes that architecture.

## Vercel policy

**Vercel is not part of VoxVector.**

Vercel is retired and is not a supported production host, frontend host, backend host, preview host, build target, deployment target, dependency, configuration source, troubleshooting workaround, or alternative architecture.

Historical references are preserved for traceability and do not override this current policy.

## Historical deployment records

Historical dated documents may record earlier Render deploy IDs, source revisions, auto-deploy assumptions, dependency commands, provider states, or benchmark candidates. Those records are not rewritten solely to look current.

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
- cloud-primary diarization #970
