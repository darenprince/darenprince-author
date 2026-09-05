# VoxVector Endpoint Registry

**Effective:** 2026-09-04  
**Status:** Canonical active endpoint map

This document is the authoritative endpoint map for the current VoxVector deployment architecture.

## Public product

`https://darenprince.com/voxvector/`

GitHub Pages hosts the canonical public React application and Developer Console.

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

## Current runtime configuration

The live Render API health response observed on 2026-09-04 reports:

- source revision `23677b258a60e5cf25287cc0dce3b199f472a7c1`
- pipeline `0.2.26`
- runtime self-test `passed`
- diagnostic/media storage `configured_media_ready`
- media storage `true`
- transcription provider `faster_whisper`
- transcription adapter installed `true`
- transcription execution readiness `true`
- diarization provider `pyannote`
- diarization adapter installed `true`
- diarization execution readiness `true`
- Hugging Face token configured `true`
- diarization model `pyannote/speaker-diarization-community-1`

The live health response still reports `current_commit_qa: external_workflow_required`; commit-specific QA must therefore be established from GitHub Actions before the runtime is marked QA-current.

## Deployment and migration rule

The AWS endpoint is a separate deployment environment. Do not silently replace `voxvector.crownlabs.tech` or change the production frontend API base without an explicit cutover decision, exact-commit deployment verification, browser verification, and documentation update.

## Engineering verification

At the current documentation checkpoint:

- AWS ALB: active
- AWS target health: healthy
- AWS HTTPS listener: configured
- AWS HTTP listener: redirects to HTTPS
- ACM certificate: issued and DNS validated
- AWS custom-domain browser reachability: requires current external verification
- Render original API domain: preserved and live
- Public React application: GitHub Pages at `/voxvector/`
- Live Render speech runtime: configured and execution-ready by health contract

Infrastructure and provider readiness do not constitute scientific validation of VoxVector's analytical or deception-classification capability.


## Protected Developer Console deployment trigger

`POST /v1/developer/render/deploy`

This authenticated developer route triggers the configured Render Deploy Hook from the server-side API runtime. The hook URL is stored only as `RENDER_DEPLOY_HOOK_URL` in protected runtime configuration and is never returned to the browser.

The endpoint reports trigger acceptance only. Deployment completion remains observable through the Render status and log routes.


## External diarization provider boundary

The VoxVector backend may call the pyannoteAI API as an external server-side provider when `VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api` is configured. The API key remains only in the deployment environment. The public React application never calls pyannoteAI directly and never receives `PYANNOTE_KEY`.

Local Community-1 remains a separate provider path and may be configured as an explicit fallback. Provider switching is recorded in analysis provenance rather than hidden from the case/run record.
