# VoxVector Endpoint Registry

**Effective:** 2026-09-11  
**Status:** Canonical active endpoint map

This document is the authoritative endpoint map for the current VoxVector deployment architecture.

## Public product

`https://darenprince.com/voxvector/`

GitHub Pages hosts the canonical public React application and Developer Console.

Canonical public frontend routes and styled references are:

- `/voxvector/` — public VoxVector landing application;
- `/voxvector/site-map` — human-readable VoxVector page inventory rendered through the existing public React shell;
- `/voxvector/pipeline.html` — styled 21-stage analysis-pipeline reference;
- `/voxvector/methods.html` — styled analysis-method and data-point reference;
- `/voxvector/image-index/` — published visual asset index;
- `/voxvector/loading-demo.html` — published loading-state demonstration surface.

Protected React routes include:

- `/voxvector/login/` — canonical Supabase login and trusted-role router;
- `/voxvector/developer/` — developer/admin Developer Console;
- `/voxvector/app` — approved-user workspace.

GitHub Pages has no SPA rewrite. The production Pages workflow therefore stages physical `index.html` entries for `developer`, `login`, `app`, and `site-map`, all pointing to the same built React shell. These are route aliases of one canonical application, not duplicate implementations. The styled pipeline, methods, image-index, and loading-demo surfaces are emitted from the existing `voxvector/public/` build inputs.

Current `AuthGate.jsx` performs the requested non-blocking API wake request after a successful password login and then routes the authenticated account through trusted VoxVector role metadata. A wake request is not provider execution, deployment verification, or proof that an analysis completed.

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

## Case-analysis durability and memory contract — merged source, reopened #941 proof

The case-analysis endpoint remains:

`POST /v1/cases/{case_id}/sources/{source_id}/analyze`

Merged PRs #962 and #967 changed the implementation behind that existing route rather than adding a second analysis endpoint.

The bounded sequence is:

`source decode/integrity → Stage 05 speech segmentation → provider acquisition → Stage 07 transcription / Stage 08 alignment → durable same-run upstream checkpoint → Stage 10 route preflight → fail-fast shared Stage 10 composite admission + locked RSS recheck → downstream composite analysis while admitted`

Completed provider state is checkpointed before Stage 10 so a later downstream failure cannot erase successful transcript/alignment work.

Stage 10 memory admission is an operational runtime guard. It is not analytical Stage 09 Eligibility and Reliability.

Composite Stage 10 admission is fail-fast: a competing request cannot wait behind an active heavyweight lock and later execute abandoned work after its route has already failed. An admitted call rechecks memory while owning the shared lock and retains that lock through composite execution.

The persistent route-owned case `run_id` remains stable through finalization. The pipeline-internal analytical UUID is retained separately as `pipeline_run_id` and must not replace case-run identity.

Issue #941 is reopened because these merged source behaviors still require controlled production proof after #964 reconciles the candidate runtime configuration.

## Health endpoint

`GET /health`

Current source preserves the health contract for safe runtime details including:

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

Fresh runtime observations remain separate evidence from source and this route registry. Do not advance runtime state merely because frontend or documentation source changes.

## Controlled production analysis evidence — historical revision

On older deployed source `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2`, controlled case `3515362e-f801-463d-961a-df7b3302a596` with source `cbdcdbf8-e528-49b0-a474-5cd64588d301` and request `32fdb25aee704ee4ad0a0615e2496e09` established:

- successful upload/private persistence;
- Stage 05 speech segmentation with 26 segments;
- faster-whisper execution using `base`, CPU/int8, beam 1, one CPU thread, one worker, isolated process;
- Stage 07 completion in about 113 seconds with 58 transcript segments and 246 timestamped words;
- Stage 08 alignment state reached;
- parent RSS entering the post-provider danger zone;
- Stage 10 starting despite RSS above the configured 416 MiB admission ceiling;
- subsequent Python API restart;
- owner confirmation that the incident was a memory problem.

This is actual historical provider-execution/incident evidence. It is not successful end-to-end current analysis, browser verification, transcript truthfulness, or scientific validation.

## Planned server-aware cancellation endpoint — issue #949

Draft PR #952 currently defines the frontend client action for:

`POST /v1/cases/{case_id}/runs/{run_id}/cancel`

The server lifecycle remains separate work under #949. Browser `AbortController` transport cancellation is not server-side analysis cancellation.

## Supabase account-administration function

`voxvector-user-admin` is the canonical server-side Supabase Edge Function for administrator account management.

Flow:

`authenticated browser → Supabase Functions invoke → JWT revalidation → trusted admin role check → server-only service-role administration`

Supported actions include list, create/invite, update, recovery, and delete with self-protection and sanitized audit events.

Production Edge Function state is external runtime evidence and must be read from Supabase when current status is needed. Source documentation does not substitute for that readback.

## Protected Developer Console deployment trigger

`POST /v1/developer/render/deploy`

This authenticated developer route sends the protected Render deploy-hook request server-side. `RENDER_DEPLOY_HOOK_URL` is never returned to the browser.

A successful response means Render accepted the trigger request only. It does not prove a new deployment exists, reaches `live`, targets the intended commit, passes `/health`, or is browser verified.

Required #920 chain remains:

`Developer Console action → server deploy-hook request accepted → new Render deploy observed → intended commit matched → deploy live → backend source_revision read back → fresh /health → browser/runtime verification when required`

## Render Developer Console observability routes

The frontend client in `voxvector/src/lib/api.js` keeps Render credentials server-side and calls the existing authenticated router mounted by `VoxVector/api/app.py` from `VoxVector/api/render_api.py`:

- `GET /v1/developer/render/status` — current service/deployment state through the authenticated server-side bridge;
- `GET /v1/developer/render/logs` — normalized Render log observations;
- `GET /v1/developer/render/debug-bundle?case_id=<case>&run_id=<run>` — authenticated server-generated case/run debug ZIP;
- `POST /v1/developer/render/deploy` — protected deploy-hook trigger.

The frontend also uses the canonical `/health`, diagnostics, case CRUD, source upload, signed playback, and case-analysis routes. Focused frontend contract tests verify those client paths remain mapped to their canonical backend route owners. That source-level wiring check is software verification only; it does not execute providers or prove production browser behavior.

## External diarization provider boundary

The VoxVector backend may call pyannoteAI server-side when `VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api` and the route invocation gate permits it. The cloud API key never reaches the public React application.

Local Community-1 is a separate optional fallback requiring its local dependency/credential boundary. The cloud-primary adapter does not require local Community-1 or PyTorch merely to make a cloud provider request.

Issue #970 owns rechecking/correcting the current pyannoteAI media-upload/job contract and obtaining real cloud-primary provider execution plus persisted speaker artifact readback. Provider configuration/readiness is not provider execution.

## Frontend pipeline/status boundary

The Developer Console consumes `/health` pipeline state through the existing `PipelineBuildCard.jsx`.

In this revision the component:

- uses the canonical backend Stage 05 Speech Segmentation → Stage 06 Speaker Identification / Diarization order;
- uses backend `pipeline_build.status_by_stage` as the preferred mutable stage-state source when available;
- treats `implemented`, `implemented_foundation`, and `implemented_guarded` as built presentation states without converting them into provider-execution claims;
- keeps Stage 07/08 contract-matching source fallbacks as implemented foundations rather than stale queued text;
- explicitly labels loading/unavailable backend status as a source-contract fallback;
- does not falsely mark Stage 01 current when the backend supplies no exact current-stage identifier.

No second pipeline endpoint, page owner, or Developer Console component is introduced. Styled public `/voxvector/pipeline.html` is a reference surface; runtime status continues to come from the backend health contract.

## Deployment and migration rule

Do not silently replace `voxvector.crownlabs.tech`, duplicate the API, create a second Blueprint, or move a protected provider secret into source.

A GitHub merge is not deployment. Render `live` is not fresh `/health`. Provider configuration is not execution. Provider execution is not artifact durability. Artifact durability is not browser verification. None of these software states are scientific validation.
