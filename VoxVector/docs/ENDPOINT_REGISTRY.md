# VoxVector Endpoint Registry

**Effective:** 2026-09-08  
**Status:** Canonical active endpoint map

This document is the authoritative endpoint map for the current VoxVector deployment architecture.

## Public product

`https://darenprince.com/voxvector/`

GitHub Pages hosts the canonical public React application and Developer Console.

Protected React routes include:

- `/voxvector/login/` — canonical Supabase login and trusted-role router;
- `/voxvector/developer/` — developer/admin Developer Console;
- `/voxvector/app` — approved-user workspace.

The GitHub Pages artifact explicitly stages `voxvector/login/index.html` from the canonical React build so direct navigation to `/voxvector/login/` resolves to the same `AuthGate.jsx` implementation instead of depending on the generic SPA 404 fallback. This is a route entry for the existing React application, not a second login implementation.

## Existing API

`https://voxvector.crownlabs.tech`

This is the original VoxVector API domain and remains preserved. It is not repointed to AWS by the current work.

The existing frontend API client continues to default to this endpoint unless `VITE_VOXVECTOR_API_URL` is explicitly configured.

## AWS API

`https://awsapi.crownlabs.tech`

This is the dedicated AWS VoxVector API hostname.

Current AWS path:

`awsapi.crownlabs.tech → AWS Application Load Balancer → HTTPS :443 → ECS Fargate → VoxVector API :8000`

HTTP on port 80 redirects to HTTPS.

The AWS ACM certificate for `awsapi.crownlabs.tech` is issued and DNS validated.

## Persistence boundary

Supabase is the configured authentication, persistence, diagnostics, and private-media boundary for the connected architecture. AWS is a separately addressed API environment. Provider secrets must be managed by the target deployment environment and must never be placed in repository source or client bundles.

### Supabase account-administration function

`voxvector-user-admin` is the canonical server-side Supabase Edge Function source for administrator account management. It is not a browser-side `auth.admin` client.

The function contract is:

`authenticated browser → Supabase Functions invoke → JWT revalidation → trusted admin role check → server-only service-role administration`

Supported source actions are `list`, `create`, `update`, `recovery`, and `delete`. The source can create or invite accounts, update trusted VoxVector role/permission metadata, maintain profile fields, administer passwords/recovery, and delete accounts. It blocks self-deletion and removal of the caller's own admin role. Administrative mutations write sanitized entries to `audit_events` without passwords, bearer tokens, or service-role credentials.

The function source existing in GitHub is not proof that the Edge Function has been deployed or successfully executed. Supabase deployment, actual admin-role assignment, authenticated invocation, and browser verification remain separate evidence gates.

## Latest observed Render runtime configuration

The latest separately observed Render `/health` evidence, recorded on 2026-09-07 and carried into the September 8 documentation alignment, reports:

- source revision `73ac03ded08c161e092ee2a4ecbbed7d036771c8`
- pipeline `0.2.26`
- runtime self-test `passed`
- diagnostic/media storage `configured_media_ready`
- media storage `true`
- transcription provider `faster_whisper`
- transcription adapter installed and execution-ready
- diarization primary provider `pyannote_api`
- pyannoteAI API-key presence `true`
- primary diarization execution readiness `true`
- local fallback provider `pyannote_local`
- local fallback disabled and not execution-ready
- current commit QA `external_workflow_required`

Provider readiness is not proof that a case route invoked the provider. Case-analysis diarization additionally requires the explicit route gate `VOXVECTOR_ENABLE_DIARIZATION_RUNS=true`.

Commit-specific QA must be established from GitHub Actions for the exact source revision before a runtime is marked QA-current.

### Health operational-truth contract

`GET /health` preserves its existing top-level compatibility fields and exposes a normalized `runtime` object with:

- `status`
- `source`
- `observed_at`
- `version`
- `version_source`
- `source_revision`

The observation timestamp describes the API health read. It is not a GitHub QA timestamp or a Render deployment timestamp. The React Developer Console keeps that backend revision separate from its own `VITE_GITHUB_SHA` frontend build revision.

## Deployment and migration rule

The AWS endpoint is a separate deployment environment. Do not silently replace `voxvector.crownlabs.tech` or change the production frontend API base without an explicit cutover decision, exact-commit deployment verification, browser verification, and documentation update.

## Engineering verification

At the current documentation checkpoint:

- AWS ALB: active at the last connected infrastructure audit
- AWS target health: healthy at the last connected infrastructure audit
- AWS HTTPS listener: configured
- AWS HTTP listener: redirects to HTTPS
- ACM certificate: issued and DNS validated
- AWS custom-domain browser reachability: requires current external verification
- Render original API domain: preserved
- Public React application: GitHub Pages at `/voxvector/`
- latest connected Render deployment observation: `dep-dafg5nv40ujc73b5l400`, `live`, source revision `73ac03ded08c161e092ee2a4ecbbed7d036771c8`
- Render provider readiness and execution state: read from current runtime evidence, not inferred from deployment status

Infrastructure and provider readiness do not constitute scientific validation of VoxVector's analytical or deception-classification capability.

## Protected Developer Console deployment trigger

`POST /v1/developer/render/deploy`

This authenticated developer route triggers the configured Render Deploy Hook from the server-side API runtime. The hook URL is stored only as `RENDER_DEPLOY_HOOK_URL` in protected runtime configuration and is never returned to the browser.

Render production auto-deploy is intentionally disabled. Connected inspection on 2026-09-08 confirmed one workspace (`My Workspace`, `tea-da2errdg1s2s73cl4eeg`) and one Render service (`voxvector-api`, `srv-da2f88n40ujc73a8m26g`) with `autoDeploy=no` and the automatic deploy trigger off.

The endpoint reports **hook-request acceptance only**. Its successful response does not mean a Render deployment exists, finished, went live, matches the intended Git commit, passed `/health`, or was browser verified. The required evidence chain is:

`POST /v1/developer/render/deploy accepted → new Render deploy observed → intended commit matched → deploy status live → backend source_revision checked → /health verified → browser/runtime verification when required`

A historical production diagnostic on 2026-09-05 showed this route returning HTTP 500 with `JSONDecodeError` after attempting to parse a non-JSON hook response. Issue #920 repairs the route so successful empty, JSON, or text hook response bodies do not by themselves cause the API bridge to fail. The hook body is not trusted as deployment-completion evidence.

At the September 8 inspection checkpoint, the latest Render deployment was `dep-dafg5nv40ujc73b5l400`, live on commit `73ac03ded08c161e092ee2a4ecbbed7d036771c8`. GitHub `main` at the start of that investigation was `66a1616d49e228c6ec57d3cfc4855898675fae2c`; the intervening commits contained documentation/audit/workflow changes rather than new runtime implementation. Future parity must be re-established from fresh evidence.

## Render Developer Console observability routes

`GET /v1/developer/render/status`

Returns current service/deployment/instance state visible to the authenticated developer bridge. Its normalized `operational` object reports `source`, `observed_at`, `service_state`, `deploy_state`, and `source_revision`. Missing deployment revisions remain `unknown`; provider strings such as `not_suspended` are mapped explicitly rather than coerced as truthy values.

`GET /v1/developer/render/logs`

Returns current Render log observations through the server-side bridge. Logs and status are evidence about runtime/deployment behavior; they are not evidence of scientific validation.

## External diarization provider boundary

The VoxVector backend may call the pyannoteAI API as an external server-side provider when `VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api` is configured. The API key remains only in the deployment environment. The public React application never calls pyannoteAI directly and never receives `PYANNOTE_KEY`.

Local Community-1 remains a separate provider path and may be configured as an explicit fallback. Provider switching is recorded in analysis provenance rather than hidden from the case/run record.
