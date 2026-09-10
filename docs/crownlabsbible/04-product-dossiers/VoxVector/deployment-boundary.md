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

## Current source and Render state — 2026-09-10

Canonical GitHub `main` is `420536771875c6948be51851118b58cb04a596e6`. Exact-main VoxVector QA `34532394431` succeeded and exact-main GitHub Pages publication workflow `34532394423` succeeded.

Connected Render inspection reports:

- service `voxvector-api` (`srv-da2f88n40ujc73a8m26g`);
- deployment `dep-dahi2ics728c73b6ujug` `live`;
- deployed source exact `420536771875c6948be51851118b58cb04a596e6`;
- deploy trigger API;
- deployment finished `2026-09-10T21:36:23.3655Z`;
- branch `main`, root `VoxVector`;
- free plan, one instance, Oregon;
- `/health` health check;
- auto-deploy disabled;
- live build command `requirements.txt` + `requirements-speech.txt`;
- start command `uvicorn api.app:app --host 0.0.0.0 --port $PORT`.

The owner-provided Render export generated `2026-09-10T21:38:48Z` independently matches the repository/service/root/runtime/plan/region/build/start/health/domain/auto-deploy fields. Its environment entries are redacted as `sync: false`; they are name/presence evidence, not values.

The canonical root `render.yaml` instead specifies `requirements.txt` + `requirements-transcription.txt` and declares `CORS_ORIGINS` server-managed. The owner export does not list `CORS_ORIGINS`; backend source defaults to `*` when the variable is absent. Issue #964 owns deliberate field-by-field reconciliation into the **existing root `render.yaml`**. Do not upload or commit a second Blueprint and do not provision a duplicate `voxvector-api` service.

No fresh `/health` response for exact deployed `420536...` is recorded by the current synchronization pass. Render `live` is deployment evidence only.

## Blueprint policy

The repository root `render.yaml` is the sole canonical Blueprint owner.

- Protected secrets remain externally managed.
- Provider-export redactions must not be used to infer or erase values.
- Reproducible non-secret operational values remain in Git where supported.
- A provider-generated export is evidence to reconcile, not an automatic replacement for source.
- `requirements-speech.txt` versus `requirements-transcription.txt` must be resolved from actual required runtime capability.
- `CORS_ORIGINS` ownership/policy must be resolved explicitly rather than guessed from omission in the export.
- Any Blueprint sync must be separately validated against the existing service.

The distinction matters because the broader speech dependency set includes optional local `pyannote.audio`/PyTorch packages, while the canonical primary diarization architecture is the cloud `pyannote_api` path. Local Community-1 is an optional explicit fallback.

## Current reliability boundary

Historical deployed `f0dda136...` successfully completed faster-whisper beam-1 transcription on the controlled 183.3-second WAV, then encountered confirmed post-transcription memory exhaustion during the downstream transition. The owner confirmed the incident was a memory problem.

PR #962 merged the first source repair. PR #967 merged the reviewed Stage 10 fail-fast composite admission and stable run-identity follow-up and is current `main`. Render is `live` on that exact source.

Issue #941 has been reopened because controlled production acceptance remained unexecuted. #964 should first reconcile the candidate runtime profile, then #941 must deliberately deploy/read `/health` and rerun the same controlled WAV before current production behavior is accepted.

## Public/frontend deployment path

`main source → GitHub Actions → React build → GitHub Pages artifact → https://darenprince.com/voxvector/`

Exact-main Pages workflow success is publication evidence. It is not interactive desktop/mobile browser verification.

## Original Render API path

`approved main revision → Developer Console/API deploy request → protected Render deploy hook → Render deploy record → intended source revision → live → fresh /health → https://voxvector.crownlabs.tech`

The current live deploy was API-triggered. It does not by itself satisfy #920's protected Developer Console **Deploy Now** path.

## Manual Render deployment control

The canonical protected path remains:

`Developer Console Deploy Now → POST /v1/developer/render/deploy → authenticated FastAPI route → server-only RENDER_DEPLOY_HOOK_URL → Render deploy hook`

The browser never receives the hook URL. Hook acceptance is not a completed deployment.

After acceptance, VoxVector must separately observe the deployment, match the intended commit, wait for `live`, verify `/health` and backend source revision, and complete any required runtime/browser verification.

## Process and run identity

`process_instance_id` identifies the Python API process and changes across Python restarts. `render_instance_id` retains hosting-provider infrastructure identity separately when available.

This matters because Render can restart Uvicorn/Python while retaining the same infrastructure instance label. A stable Render instance ID therefore cannot prove process continuity.

The persisted route-owned `run_id` remains the case-run identity. The pipeline-internal UUID is retained separately as `pipeline_run_id`.

## Data-flow clarification

The active media path remains:

`Browser → GitHub Pages frontend → Render FastAPI API → Supabase private media storage`

Render is compute/runtime, not durable media storage. GitHub Pages is frontend publication, not API execution.

Historical controlled failure evidence confirmed that the source WAV and pre-termination diagnostics remained persisted in Supabase after the Python process restarted.

## Supabase administrator and auth/profile state

`voxvector-user-admin` was last verified ACTIVE, version 2, with JWT verification enabled. The latest verified trusted role inventory contains one admin, one developer, and one user.

Current `main` `AuthGate.jsx` still does not issue the requested login-time API wake. Draft PR #974 under #931 contains that candidate repair plus shared role-aware self-profile wiring. It is not current/deployed behavior and requires current-main integration QA plus authenticated browser/profile save/reload verification.

## Current frontend status projection

Current `PipelineBuildCard.jsx` still has stale local Stage 05/06 ordering and queued Stage 07/08 fallback text. #965 owns correction in the existing component so runtime `pipeline_build.status_by_stage` is preferred when available.

## Vercel

**Vercel is not part of VoxVector.** Historical references are retained only for traceability.

## Historical records

Historical deployment IDs, source revisions, provider settings, and architecture observations remain historical evidence. They are not current instructions and are not rewritten merely because the live service has changed.

## Current dependency sequence

`#964 Render profile reconciliation → reopened #941 controlled proof → #970 cloud diarization → #971 persisted multimodal alignment → #963 case rehydration → #930/#959 reliability/observability → #965 frontend pipeline truth → #931/PR #974 auth/profile acceptance → #932 public navigation → #972 frozen-candidate two-run golden proof`

## Verification rule

Keep these evidence boundaries explicit:

`source → QA → merge → trigger acceptance → deployment → fresh runtime health → provider execution → artifact persistence → browser verification`

No step is inferred solely from the previous one, and none constitutes scientific validation.
