# VoxVector Endpoint Registry

**Effective:** 2026-09-10  
**Status:** Canonical active endpoint map

This document is the authoritative endpoint map for the current VoxVector deployment architecture.

## Public product

`https://darenprince.com/voxvector/`

GitHub Pages hosts the canonical public React application and Developer Console.

Protected React routes include:

- `/voxvector/login/` — canonical Supabase login and trusted-role router;
- `/voxvector/developer/` — developer/admin Developer Console;
- `/voxvector/app` — approved-user workspace.

The physical Pages login entry resolves to the same React `AuthGate.jsx` implementation. It is not a duplicate login system.

## Existing API

`https://voxvector.crownlabs.tech`

This is the original VoxVector API domain and remains preserved. The existing frontend API client continues to default to this endpoint unless `VITE_VOXVECTOR_API_URL` is explicitly configured.

## AWS API

`https://awsapi.crownlabs.tech`

This is the separately addressed AWS VoxVector API environment:

`awsapi.crownlabs.tech → AWS Application Load Balancer → HTTPS :443 → ECS Fargate → VoxVector API :8000`

AWS remains separate from the current Render production-verification path unless an explicit cutover decision changes that architecture.

## Persistence boundary

Supabase is the configured authentication, persistence, diagnostics, and private-media boundary. Provider secrets remain server-side in the applicable deployment environment and never belong in repository source or client bundles.

## Authenticated case lifecycle endpoints

The canonical case API remains owner-scoped through the backend authorization boundary:

- `POST /v1/cases` — create a case record;
- `GET /v1/cases` — list the authenticated owner's cases and reconcile eligible interrupted/stale run state;
- `GET /v1/cases/{case_id}` — read one owner-scoped case and reconcile eligible run state;
- `POST /v1/cases/{case_id}/sources` — persist a WAV source and provenance;
- `GET /v1/cases/{case_id}/sources/{source_id}/playback` — issue an owner-scoped time-limited signed playback URL;
- `POST /v1/cases/{case_id}/sources/{source_id}/analyze` — execute the canonical case-analysis path for that persisted source;
- `DELETE /v1/cases/{case_id}` — delete the owner-scoped case and persisted source media through the supported storage API.

Issue #945 / PR #946 remains the canonical run-lifecycle recovery/report foundation. It provides interrupted/deadline recovery, terminal run/failure reports, elapsed time, historical source-revision preservation, and same-process per-case serialization without creating another endpoint family.

## Case-analysis durability and memory contract — active #941 / PR #962

The case-analysis endpoint remains the same:

`POST /v1/cases/{case_id}/sources/{source_id}/analyze`

PR #962 changes the implementation behind that existing route rather than adding a second analysis endpoint.

The intended bounded sequence is:

`source decode/integrity → Stage 05 speech segmentation → provider acquisition → Stage 07 transcription / Stage 08 alignment → durable same-run upstream checkpoint → Stage 10 memory admission → downstream composite analysis`

Completed provider state is checkpointed before Stage 10 so a later downstream failure cannot erase successful transcript/alignment work.

Stage 10 memory admission is an operational runtime guard. It is not analytical Stage 09 Eligibility and Reliability.

The persistent case `run_id` remains stable through finalization. A pipeline-internal run ID may be retained separately but must not replace the case-run identity.

## Health endpoint

`GET /health`

Current deployed `f0dda136...` health behavior predates PR #962's new source contract. After PR #962 is reviewed, merged and deliberately deployed, the route is expected to preserve existing compatibility fields and expose safe runtime details including:

- runtime status;
- observed timestamp;
- backend version and version source;
- exact `source_revision`;
- per-Python-process `process_instance_id`;
- separate Render infrastructure `render_instance_id` when supplied by the host;
- runtime self-test state;
- diagnostic/media storage readiness;
- analysis upload/sample-rate limits;
- configured memory reference and effective memory-admission ceiling;
- 21-stage build summary;
- speech-provider configuration/readiness including constrained transcription settings;
- commit-QA provenance fields when real workflow evidence is supplied.

`process_instance_id` and `render_instance_id` are intentionally different concepts. A Python process can restart while Render retains the same infrastructure instance label.

A source contract in PR #962 is not current deployed health evidence. Fresh `/health` readback is required after deployment before those new fields are attributed to production.

## Latest observed Render runtime — 2026-09-10

Connected Render inspection confirms:

- service `voxvector-api` (`srv-da2f88n40ujc73a8m26g`);
- deployment `dep-dah7usjl550s73e00350`;
- status `live`;
- deployed source exact `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2`;
- trigger `api`;
- auto-deploy disabled;
- root directory `VoxVector`;
- health path `/health`;
- live build command `pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`.

The canonical root `render.yaml` instead declares `api/requirements-transcription.txt`. Issue #964 owns reconciliation of the provider-generated Blueprint/export and live service into the existing root file. Do not add a second Blueprint or duplicate Render service.

The current API-triggered deploy does not satisfy #920's protected Developer Console deployment-control acceptance path.

## Controlled production analysis evidence

On deployed source `f0dda136...`, controlled case `3515362e-f801-463d-961a-df7b3302a596` with source `cbdcdbf8-e528-49b0-a474-5cd64588d301` and request `32fdb25aee704ee4ad0a0615e2496e09` established:

- successful upload/private persistence;
- Stage 05 speech segmentation with 26 segments;
- faster-whisper execution using `base`, CPU/int8, beam 1, one CPU thread, one worker, isolated process;
- Stage 07 completion in about 113 seconds with 58 transcript segments and 246 timestamped words;
- Stage 08 alignment state reached;
- parent RSS entering the post-provider danger zone;
- Stage 10 starting despite RSS above the configured 416 MiB admission ceiling;
- subsequent Python API restart;
- owner confirmation that the incident was a memory problem.

This is actual provider execution evidence, not successful end-to-end analysis, browser verification, transcript truthfulness, or scientific validation.

## Planned server-aware cancellation endpoint — issue #949

Draft PR #952 currently defines the frontend client action for:

`POST /v1/cases/{case_id}/runs/{run_id}/cancel`

The server lifecycle remains separate work under #949. Browser `AbortController` transport cancellation is not server-side analysis cancellation.

## Supabase account-administration function

`voxvector-user-admin` is the canonical server-side Supabase Edge Function for administrator account management.

Flow:

`authenticated browser → Supabase Functions invoke → JWT revalidation → trusted admin role check → server-only service-role administration`

Supported actions include list, create/invite, update, recovery, and delete with self-protection and sanitized audit events.

**Current production status:** connected Supabase inspection on 2026-09-10 shows `voxvector-user-admin` ACTIVE, version 2, with JWT verification enabled. Latest trusted role inventory contains one admin, one developer, and one user.

Therefore #931 is no longer blocked on Edge Function deployment/bootstrap. Remaining #931 acceptance is User Management workflow/UX plus authenticated desktop/mobile role verification.

## Protected Developer Console deployment trigger

`POST /v1/developer/render/deploy`

This authenticated developer route sends the protected Render deploy-hook request server-side. `RENDER_DEPLOY_HOOK_URL` is never returned to the browser.

A successful response means Render accepted the trigger request only. It does not prove a new deployment exists, reaches `live`, targets the intended commit, passes `/health`, or is browser verified.

Required #920 chain remains:

`Developer Console action → server deploy-hook request accepted → new Render deploy observed → intended commit matched → deploy live → backend source_revision read back → fresh /health → browser/runtime verification when required`

## Render Developer Console observability routes

`GET /v1/developer/render/status`

Returns current service/deployment state through the authenticated server-side bridge.

`GET /v1/developer/render/logs`

Returns the normalized Render log observations required by the Developer Console: message, timestamp, level, and log type. The provider's complete nested raw record is not returned to the browser. The same bounded observations remain eligible for sanitized Supabase mirroring through the server-side bridge.

`GET /v1/developer/render/debug-bundle?case_id=<case>&run_id=<run>`

Returns the authenticated server-generated case/run debug ZIP. Retrieval availability is recorded independently from row count, so a successful empty Supabase/Render query is distinguishable from an unavailable evidence source in `manifest.json`.

PR #961 merged the dual Render/Supabase logging and debug-bundle foundation. PR #966 hardened deterministic snapshot identity, speech-worker correlation, process/Render provenance, and bundle availability semantics. Issue #959 remains open for the remaining runtime acceptance work, including automatic terminal Render capture, retention/quota policy, exact deployed-revision dual-store readback, bundle inspection, and browser verification.

## External diarization provider boundary

The VoxVector backend may call pyannoteAI server-side when `VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api` and the route invocation gate permits it. The cloud API key never reaches the public React application.

Local Community-1 is a separate optional fallback requiring its local dependency/credential boundary. The cloud-primary adapter does not require local Community-1 or PyTorch merely to make the cloud provider request.

Provider configuration/readiness is not provider execution. Controlled cloud-primary speaker execution and persisted speaker artifact readback remain open release gates.

## Deployment and migration rule

Do not silently replace `voxvector.crownlabs.tech`, duplicate the API, create a second Blueprint, or move a protected provider secret into source.

A GitHub merge is not deployment. Render `live` is not fresh `/health`. Provider execution is not artifact durability. Artifact durability is not browser verification. None of these software states are scientific validation.