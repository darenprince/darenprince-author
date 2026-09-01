# VoxVector Deployment Boundary

**Status:** Canonical active policy  
**Effective:** 2026-08-28

## Purpose

This document defines the deployment boundary for VoxVector so that developers, automation, and AI agents do not confuse historical provider research with the active production architecture.

## Canonical production architecture

| Surface | Canonical system | Rule |
|---|---|---|
| Public frontend | GitHub Pages | `voxvector/` is built from `main` and published under `/voxvector/`. |
| Backend API | Render | `VoxVector/` is the canonical backend and analysis engine workspace. |
| Authentication, persistence, diagnostics | Supabase | Use the existing documented Supabase architecture. |
| Build and deployment automation | GitHub Actions | The public frontend deployment is the repository's GitHub Pages workflow. |

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

## Required deployment path

The canonical public path is:

`source on main → GitHub Actions → VoxVector React build → GitHub Pages artifact → https://darenprince.com/voxvector/`

The canonical backend path is:

`VoxVector backend → Render → https://voxvector.crownlabs.tech`

The frontend and backend deployment boundaries must remain separate.

## Historical references

Earlier project records contain Vercel references because Vercel was previously considered or used during earlier development exploration. Those records are retained where needed for traceability.

Historical references do not authorize renewed use of Vercel.

The 2026-08-19 project decision documenting Vercel retirement remains the historical decision record. This document establishes the current operational rule in one explicit location.

## Verification rule

When deployment behavior is uncertain, inspect the repository's current GitHub Actions workflow, package configuration, deployment documentation, and resulting artifact before making changes.

Do not introduce a second hosting path to work around an unresolved deployment problem.

Never claim a VoxVector deployment succeeded unless the applicable GitHub Actions run and deployed result have actually been verified.


## System data-flow clarification

The production upload path is:

`Browser → GitHub Pages frontend → Render-hosted FastAPI API → Supabase private media storage`

Render executes the API request but is not the durable media-storage provider. GitHub Pages serves the frontend artifact but is not the API runtime. A healthy host or successful build verifies only its own boundary; failures must be traced across the complete request chain.

The consolidated architecture and verification workflow is maintained in `docs/SYSTEM_ARCHITECTURE_AND_AUTO_WORKFLOW.md`.
