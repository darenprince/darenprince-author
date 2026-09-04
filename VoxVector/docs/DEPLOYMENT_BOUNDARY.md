# VoxVector Deployment Boundary

**Status:** Canonical active policy  
**Effective:** 2026-09-03

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

`VoxVector backend → Render → https://voxvector.crownlabs.tech`

AWS API environment:

`VoxVector backend → GitHub Actions → ECR → ECS Fargate → ALB HTTPS → https://awsapi.crownlabs.tech`

The frontend and backend deployment boundaries remain separate.

## AWS HTTPS boundary

The AWS Application Load Balancer terminates HTTPS for `awsapi.crownlabs.tech` using an AWS Certificate Manager certificate validated by DNS. Port 80 redirects to HTTPS. The ECS application port 8000 is restricted to traffic from the ALB security group rather than direct internet ingress.

## Historical references

Earlier project records contain provider and deployment references from previous development exploration. Historical records are retained where required for traceability and do not override this current boundary.

## Verification rule

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


## 2026-09-04 deployment provenance and trigger isolation

GitHub Pages now ignores backend-only changes under `VoxVector/` while explicitly retaining published `VoxVector/Assets/` and `VoxVector/docs/` changes. Render remains manual with auto-deploy disabled and is triggered through the protected deploy hook.

The React build receives the exact Git commit SHA as `VITE_GITHUB_SHA`. The Developer Console exposes that frontend build revision alongside the backend runtime `source_revision` and GitHub workflow status so a source, artifact, runtime, or browser mismatch is visible instead of being inferred.

Operational verification is therefore:

`source commit → matching Pages workflow → frontend build revision → browser`

and separately:

`source commit → protected Render deploy → backend source_revision → API health`
