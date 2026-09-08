# VoxVector Deployment Boundary

**Status:** Canonical active policy  
**Effective:** 2026-09-08

## Purpose

This document defines the deployment boundary for VoxVector so that developers, automation, and AI agents do not confuse historical provider research with the active architecture.

## Canonical deployment surfaces

| Surface | Canonical system | Current endpoint / responsibility |
|---|---|---|
| Public frontend | GitHub Pages | `https://darenprince.com/voxvector/` |
| Original API | Render | `https://voxvector.crownlabs.tech` |
| AWS API environment | AWS ALB + ECS Fargate | `https://awsapi.crownlabs.tech` |
| Authentication, persistence, diagnostics | Supabase | Existing configured Supabase services |
| Build and deployment automation | GitHub Actions | Repository controlled workflows |

The original Render API domain is preserved. The AWS endpoint is an additional deployment environment and must not silently replace the Render endpoint.

## Vercel policy

**Vercel is not part of VoxVector.**

Vercel is retired and is not a supported:

- production host
- frontend host
- backend host
- preview host
- build target
- deployment target
- dependency
- configuration source
- troubleshooting workaround
- alternative architecture

AI agents and developers working on VoxVector must not configure, add, deploy to, or route VoxVector through Vercel.

A Vercel result, integration, check, bookmark, cached deployment, or historical document reference must not be interpreted as evidence that Vercel is an active VoxVector platform.

## Required deployment paths

Public application:

`source on main → GitHub Actions → VoxVector React build → GitHub Pages artifact → https://darenprince.com/voxvector/`

Existing API:

`approved source on main → authenticated Developer Console/API deploy request → protected Render deploy hook → Render deployment → backend source_revision → https://voxvector.crownlabs.tech`

AWS API environment:

`VoxVector backend → GitHub Actions → ECR → ECS Fargate → ALB HTTPS → https://awsapi.crownlabs.tech`

The frontend and backend deployment boundaries remain separate.

## AWS HTTPS boundary

The AWS Application Load Balancer terminates HTTPS for `awsapi.crownlabs.tech` using an AWS Certificate Manager certificate validated by DNS. Port 80 redirects to HTTPS. The ECS application port 8000 is restricted to traffic from the ALB security group rather than direct internet ingress.

## Historical references

Earlier project records contain provider and deployment references from previous development exploration. Historical records are retained where required for traceability and do not override this current boundary.

Historical records that described Render as auto-deploying from `main` are evidence of what those records asserted at the time; they are not the current deployment policy. Current connected Render inspection on 2026-09-08 confirmed that production auto-deploy is disabled.

## Verification rule

Production and deployment work follows the issue lifecycle in [DEVELOPMENT_WORKFLOW.md](DEVELOPMENT_WORKFLOW.md#10-development-flow). Link the task issue, PR, source revision and target environment before changing deployment state. Record build and publish runs separately, trigger acceptance separately from completed deployment, and frontend revision separately from backend runtime revision. Include UTC observation time, health/browser evidence and unresolved gates in the issue and `voxvector/audits/AUDIT_REPORT.md` after each task. Keep production-scoped tickets open until their deployment acceptance criteria are verified. PR creation or issue closure does not authorize a merge, production deployment or endpoint cutover. The active Render manual-deployment repair is [#920](https://github.com/darenprince/darenprince-author/issues/920); the earlier Pages trigger investigation [#911](https://github.com/darenprince/darenprince-author/issues/911) is closed and must not be treated as the current Render deployment ticket.

When deployment behavior is uncertain, inspect the repository's current GitHub Actions workflow, package configuration, deployment documentation, and resulting runtime before making changes.

Do not introduce a second hosting path merely to work around an unresolved deployment problem.

Never claim a VoxVector deployment succeeded unless the applicable workflow and deployed result have actually been verified.

## System data-flow clarification

The existing production upload path remains:

`Browser → GitHub Pages frontend → Render-hosted FastAPI API → Supabase private media storage`

The AWS environment currently has separate compute and ingress infrastructure. Running the canonical container on AWS does not establish authenticated Supabase parity or make AWS the production API automatically.

Render executes the original API request but is not the durable media-storage provider. GitHub Pages serves the frontend artifact but is not the API runtime.

## Canonical endpoint registry

See `docs/ENDPOINT_REGISTRY.md` for the current authoritative endpoint map and future cutover rules.

The consolidated architecture and verification workflow is maintained in `docs/SYSTEM_ARCHITECTURE_AND_AUTO_WORKFLOW.md`.

## Render manual deployment boundary — verified 2026-09-08

Connected Render inspection established one workspace, `My Workspace` (`tea-da2errdg1s2s73cl4eeg`), and one VoxVector Render service, `voxvector-api` (`srv-da2f88n40ujc73a8m26g`). The service is configured with `autoDeploy=no` and the automatic deploy trigger is off. That is intentional current architecture, not a deployment failure by itself.

The protected manual deployment path is:

`Developer Console Deploy Now → POST /v1/developer/render/deploy → authenticated FastAPI route → server-only RENDER_DEPLOY_HOOK_URL → Render deploy hook`

The browser never receives the hook URL. The hook request is a deployment **request**, not evidence that a deployment has completed. A successful HTTP response from the hook means only that the hook request was accepted by the remote endpoint. VoxVector must then observe a new Render deploy record, confirm the intended commit/revision, wait for a terminal `live` result, verify API health/runtime provenance, and perform any required browser check before calling the deployment verified.

Historical runtime evidence from 2026-09-05 showed this route could return HTTP 500 with `JSONDecodeError` when a successful hook response body was non-JSON. Issue #920 repairs that response-parsing boundary so a successful empty or text response does not turn hook acceptance into an application error. This code repair does not itself prove the Developer Console button is working in production; production verification remains pending until the merged revision is deliberately deployed and exercised.

The Render production deployment observed during the 2026-09-08 inspection was `dep-dafg5nv40ujc73b5l400`, commit `73ac03ded08c161e092ee2a4ecbbed7d036771c8`. GitHub `main` was later at `66a1616d49e228c6ec57d3cfc4855898675fae2c`; those intervening commits were documentation/audit/workflow changes rather than new runtime implementation. This observation must not be generalized to future revisions.

## 2026-09-04 deployment provenance and trigger isolation

GitHub Pages ignores backend-only changes under `VoxVector/` while explicitly retaining published `VoxVector/Assets/` and `VoxVector/docs/` changes. Render remains manual with auto-deploy disabled and is triggered through the protected deploy hook.

The React build receives the exact Git commit SHA as `VITE_GITHUB_SHA`. The Developer Console exposes that frontend build revision alongside the backend runtime `source_revision` and GitHub workflow status so a source, artifact, runtime, or browser mismatch is visible instead of being inferred.

Operational verification is therefore:

`source commit → matching Pages workflow → frontend build revision → browser`

and separately:

`source commit → protected Render deploy-hook request → Render deploy record → backend source_revision → API health → browser/runtime verification when required`
