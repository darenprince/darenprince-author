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

## Current Render state — 2026-09-10

Connected inspection reports:

- service `voxvector-api` (`srv-da2f88n40ujc73a8m26g`);
- deployment `dep-dah7usjl550s73e00350` live;
- deployed source exact `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2`;
- branch `main`, root `VoxVector`;
- free plan, one instance, Oregon;
- `/health` health check;
- auto-deploy disabled;
- live build command `requirements.txt` + `requirements-speech.txt`.

The canonical root `render.yaml` instead specifies `requirements.txt` + `requirements-transcription.txt`.

Issue #964 owns deliberate reconciliation of the Render-generated Blueprint export/live service into the **existing root `render.yaml`**. Do not upload or commit a second Blueprint and do not provision a duplicate `voxvector-api` service.

## Blueprint policy

The repository root `render.yaml` is the sole canonical Blueprint owner.

- Protected secrets remain externally managed.
- Reproducible non-secret operational values remain in Git where supported.
- A provider-generated export is evidence to reconcile, not an automatic replacement for source.
- `requirements-speech.txt` versus `requirements-transcription.txt` must be resolved from actual required runtime capability.
- Any Blueprint sync must be separately validated against the existing service.

The distinction matters because the broader speech dependency set includes optional local pyannote/PyTorch packages, while the canonical primary diarization architecture is the cloud `pyannote_api` path. Local Community-1 is an optional explicit fallback.

## Current reliability boundary

The deployed `f0dda136...` revision successfully completed faster-whisper beam-1 transcription on the controlled 183.3-second WAV, then encountered confirmed post-transcription memory exhaustion during the downstream transition. The owner confirmed the incident was a memory problem.

Issue #941 / draft PR #962 repairs that runtime boundary. It is source work, not a deployment-policy change. The reviewed merge must be deliberately deployed and read back before production behavior is claimed.

## Public/frontend deployment path

`main source → GitHub Actions → React build → GitHub Pages artifact → https://darenprince.com/voxvector/`

## Original Render API path

`approved main revision → Developer Console/API deploy request → protected Render deploy hook → Render deploy record → intended source revision → live → fresh /health → https://voxvector.crownlabs.tech`

The current live deploy was API-triggered. It does not by itself satisfy #920's protected Developer Console **Deploy Now** path.

## Manual Render deployment control

The canonical protected path remains:

`Developer Console Deploy Now → POST /v1/developer/render/deploy → authenticated FastAPI route → server-only RENDER_DEPLOY_HOOK_URL → Render deploy hook`

The browser never receives the hook URL. Hook acceptance is not a completed deployment.

After acceptance, VoxVector must separately observe the deployment, match the intended commit, wait for `live`, verify `/health` and backend source revision, and complete any required runtime/browser verification.

## Process versus hosting identity

`process_instance_id` identifies the Python API process and changes across Python restarts. `render_instance_id` retains hosting-provider infrastructure identity separately when available.

This matters because Render can restart Uvicorn/Python while retaining the same infrastructure instance label. A stable Render instance ID therefore cannot prove process continuity.

## Data-flow clarification

The active media path remains:

`Browser → GitHub Pages frontend → Render FastAPI API → Supabase private media storage`

Render is compute/runtime, not durable media storage. GitHub Pages is frontend publication, not API execution.

The controlled memory failure confirmed that the source WAV and pre-termination diagnostics remained persisted in Supabase after the Python process restarted.

## Supabase administrator state

`voxvector-user-admin` is now ACTIVE, version 2, with JWT verification enabled. The latest trusted role inventory contains one admin, one developer, and one user.

That corrects older current-state text that described the function as undeployed. Remaining #931 work is management UX and authenticated browser verification.

## Vercel

**Vercel is not part of VoxVector.** Historical references are retained only for traceability.

## Historical records

Historical deployment IDs, source revisions, provider settings, and architecture observations remain historical evidence. They are not current instructions and are not rewritten merely because the live service has changed.

## Verification rule

Keep these evidence boundaries explicit:

`source → QA → merge → trigger acceptance → deployment → runtime health → provider execution → artifact persistence → browser verification`

No step is inferred solely from the previous one, and none constitutes scientific validation.
