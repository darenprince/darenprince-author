# Project Decision — No Vercel for VoxVector

**Date:** 2026-08-28  
**Status:** Active architectural decision  
**Scope:** Frontend hosting, backend hosting, deployment automation, previews, dependencies, and AI agent behavior

## Decision

Vercel is explicitly excluded from the active VoxVector architecture.

VoxVector uses:

- **GitHub Pages** for the public React frontend under `voxvector/`.
- **Render** for the canonical FastAPI backend and analysis engine under `VoxVector/`.
- **Supabase** for the existing authentication, persistence, diagnostics, and related operational data services.
- **GitHub Actions** for the canonical public frontend build and GitHub Pages deployment workflow.

## Prohibited Vercel use

Vercel must not be introduced or reintroduced for VoxVector as:

- a production deployment target;
- a frontend host;
- a backend host;
- a preview host or replacement preview path;
- a build platform;
- a dependency or SDK;
- a configuration directory or project file;
- a deployment workaround;
- a troubleshooting shortcut;
- a substitute for GitHub Pages or Render.

No AI agent should invoke Vercel deployment tooling while performing VoxVector work.

## Reason

The project already has an explicit production boundary and deployment workflow. Allowing another hosting platform would create architectural ambiguity, make agents more likely to edit or deploy the wrong surface, and weaken the source → build → deployment traceability required by the project workflow.

The user's current project direction confirms that VoxVector has nothing to do with Vercel.

## Existing historical decision

The 2026-08-19 Project Decision Log entry titled **Vercel retirement** remains valid historical traceability. This dated decision makes the rule operationally explicit for the current project state: Vercel is not merely inactive; it is outside the supported VoxVector architecture.

Historical documentation that mentions Vercel must remain historical when it is needed to explain prior exploration or retirement. It must not be presented as an active implementation instruction.

## Required agent behavior

When deployment or hosting is involved, an agent must first inspect:

1. `VoxVector/docs/OPERATING_CHARTER.md`
2. `VoxVector/docs/DEVELOPMENT_WORKFLOW.md`
3. `VoxVector/docs/DEPLOYMENT_BOUNDARY.md`
4. `.github/workflows/deploy-pages.yml`
5. the relevant frontend/backend deployment configuration

When a Vercel reference appears during repository search, classify it as one of:

- historical traceability;
- external integration state;
- stale documentation requiring correction;
- unexpected active configuration requiring investigation.

Do not respond by adding Vercel code or deployment configuration.

## Verification record

The 2026-08-28 documentation review confirmed that the active architecture identifies GitHub Pages as the public frontend host and Render as the backend host. The public package configuration contains no Vercel dependency, and the canonical Pages workflow is the production frontend deployment path.

This documentation decision does not by itself constitute a fresh deployment or browser verification.
