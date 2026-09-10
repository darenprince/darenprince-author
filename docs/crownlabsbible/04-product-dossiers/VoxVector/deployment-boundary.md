# VoxVector Deployment Boundary

**Status:** Current product mirror  
**Effective:** 2026-09-10

This Crown Labs Bible page mirrors the canonical deployment policy in `VoxVector/docs/DEPLOYMENT_BOUNDARY.md`. Repository source and canonical VoxVector documentation remain authoritative.

## Canonical hosting architecture

- **Public frontend:** `voxvector/` through GitHub Pages at `https://darenprince.com/voxvector/`.
- **Original backend/API:** canonical `VoxVector/` workspace on Render at `https://voxvector.crownlabs.tech`.
- **AWS backend environment:** separate canonical-container environment behind ALB/ECS at `https://awsapi.crownlabs.tech`.
- **Authentication, persistence, diagnostics, private media:** Supabase.
- **Source and QA:** GitHub and GitHub Actions.

The original Render API hostname remains preserved. AWS does not silently replace it.

## Current source and Render evidence — 2026-09-10

Canonical GitHub `main` at the start of issue #964 is `53ee1b5e27b89fb436fd72da342cd6f947a667b0`.

Connected Render inspection reports:

- service `voxvector-api` (`srv-da2f88n40ujc73a8m26g`);
- last recorded deployment before the #964 source change `dep-dahi2ics728c73b6ujug`, `live`;
- deployed source exact `420536771875c6948be51851118b58cb04a596e6`;
- deploy trigger API;
- deployment finished `2026-09-10T21:36:23.3655Z`;
- branch `main`, root `VoxVector`;
- free plan, one instance, Oregon;
- `/health` health check;
- auto-deploy disabled;
- live build command `requirements.txt` + `requirements-speech.txt`;
- start command `uvicorn api.app:app --host 0.0.0.0 --port $PORT`.

The later `53ee1b5...` merge changed documentation only and Render auto-deploy is disabled, so it is not represented as a newer backend deployment.

The owner-provided Render export generated `2026-09-10T21:38:48Z` independently matches the repository/service/root/runtime/plan/region/build/start/health/domain/auto-deploy fields. Its environment entries are redacted as `sync: false`; they are name/presence evidence, not values.

## Reconciled Blueprint and dependency ownership — issue #964

The repository root `render.yaml` remains the sole canonical Blueprint owner. Issue #964 reconciles that existing file with the actual service rather than creating another Blueprint or service.

Source inspection confirms the cloud-primary `pyannote_api` adapter does not require local `pyannote.audio` or Torch. Those dependencies belong only to the optional local Community-1 provider.

The canonical dependency split is therefore:

- `requirements-transcription.txt`: faster-whisper;
- `requirements-speech.txt`: Render cloud-primary speech manifest, which includes transcription and no local pyannote/Torch;
- `requirements-diarization-local.txt`: optional local Community-1 dependency manifest;
- `VoxVector/Dockerfile`: installs the local manifest too, preserving existing container/AWS optional fallback capability.

The root Blueprint now records the actual service repository, `main` branch, free plan, Oregon region, root, `requirements-speech.txt` build command, start command, health path, `voxvector.crownlabs.tech` domain and `autoDeployTrigger: off`.

This is source/IaC reconciliation. It is not a production deployment until the reviewed merge is deliberately deployed and read back.

## Reproducible Render runtime profile

The Blueprint source-controls the non-secret constrained profile used for the next runtime proof:

- faster-whisper `base`, CPU, int8, beam 1;
- one CPU thread and one worker;
- isolated transcription process with 165-second child timeout;
- 512 MiB application memory reference with 96 MiB headroom;
- cloud-primary provider `pyannote_api`;
- local fallback disabled;
- diarization route invocation deliberately disabled for the #941 runtime-stability proof;
- OpenMP, MKL and OpenBLAS thread counts bounded to 1;
- `MALLOC_ARENA_MAX=2`;
- tokenizer parallelism disabled.

Cloud-primary provider selection is not provider execution. Issue #970 owns deliberate enablement and real cloud diarization after the #941 runtime proof.

## CORS and secret policy

The backend falls back to wildcard CORS when `CORS_ORIGINS` is absent. The generated Render export did not list the key, so the Blueprint now owns an explicit production allowlist:

`https://darenprince.com,https://www.darenprince.com,https://voxvector.crownlabs.tech`

Protected secrets such as pyannoteAI/Hugging Face credentials, Supabase service-role credentials, Render API credentials and the deployment hook remain server-managed. They are not copied from the redacted export into Git.

Render preserves existing environment variables omitted from a Blueprint for an existing service unless the Blueprint overwrites them, so secret ownership remains external while non-secret runtime constraints remain reproducible in source.

## Blueprint policy

- Keep exactly one root `render.yaml` owner for `voxvector-api`.
- Never create a duplicate Blueprint or service as a synchronization workaround.
- Treat provider-generated exports as evidence, not automatic source replacements.
- Do not infer redacted environment values.
- Keep protected secrets external.
- Source-control reproducible non-secret constraints.
- Keep optional local-provider dependencies separate from Render cloud-primary dependencies.
- Keep production automatic deployment disabled.
- Require exact-head QA before merge.
- Deliberately deploy the reviewed merge and verify the existing service afterward.

## Current reliability boundary

Historical deployed `f0dda136...` successfully completed faster-whisper beam-1 transcription on the controlled 183.3-second WAV, then encountered confirmed post-transcription memory exhaustion during the downstream transition.

Merged #962/#967 provide the intended durability, memory-admission, fail-fast composite serialization and stable run-identity source behavior. The last recorded Render deployment contains those changes at `420536...`, but controlled runtime acceptance remains open.

After #964 establishes the reproducible runtime profile, reopened #941 must deploy/read the exact candidate and rerun the controlled WAV before current production reliability is accepted.

## Public/frontend deployment path

`main source → GitHub Actions → React build → GitHub Pages artifact → https://darenprince.com/voxvector/`

Publication evidence is not interactive desktop/mobile browser verification.

## Original Render API path

`approved main revision → deliberate Render deployment → Render deploy record → intended source revision → live → fresh /health → https://voxvector.crownlabs.tech`

Protected Developer Console **Deploy Now** verification remains separately owned by #920.

## Process and run identity

`process_instance_id` identifies the Python API process and changes across Python restarts. `render_instance_id` retains hosting-provider infrastructure identity separately when available.

The persisted route-owned `run_id` remains the case-run identity. The pipeline-internal UUID remains separately available as `pipeline_run_id`.

## Data-flow clarification

The active media path remains:

`Browser → GitHub Pages frontend → Render FastAPI API → Supabase private media storage`

Render is compute/runtime, not durable media storage. GitHub Pages is frontend publication, not API execution.

## Supabase administrator and auth/profile state

The previously verified `voxvector-user-admin` function is ACTIVE with JWT verification enabled. Draft PR #974 under #931 remains the candidate login-wake/shared-profile repair until it is refreshed against current `main`, reviewed, merged and browser-verified.

## Current frontend status projection

Current `PipelineBuildCard.jsx` still has stale local Stage 05/06 ordering and Stage 07/08 fallback text. #965 owns correction in the existing component.

## Vercel

**Vercel is not part of VoxVector.** Historical references are retained only for traceability.

## Current dependency sequence

`#964 Render profile reconciliation → reopened #941 controlled proof → #970 cloud diarization → #971 persisted multimodal alignment → #963 case rehydration → #930/#959 reliability/observability → #965 frontend pipeline truth → #931/PR #974 auth/profile acceptance → #932 public navigation → #972 frozen-candidate two-run golden proof`

## Verification rule

Keep these evidence boundaries explicit:

`source → QA → merge → deployment trigger → deployment → fresh runtime health → provider execution → artifact persistence → browser verification`

No step is inferred solely from the previous one, and none constitutes scientific validation.
