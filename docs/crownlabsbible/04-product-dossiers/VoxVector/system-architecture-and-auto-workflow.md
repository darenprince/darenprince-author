# VoxVector System Architecture and AUTO Workflow

**Status:** Current Crown Labs executive/product mirror  
**Effective:** 2026-09-01  
**Canonical technical source:** `VoxVector/docs/SYSTEM_ARCHITECTURE_AND_AUTO_WORKFLOW.md`

## Executive architecture

VoxVector operates as a deliberately separated full-stack system:

`GitHub repository → GitHub Actions → GitHub Pages public React application`

`Browser → Render-hosted FastAPI API → Supabase authentication, persistence, diagnostics, and private media storage`

The public React application lives in `voxvector/`. The canonical backend and analysis engine live in `VoxVector/`.

## Hosting responsibilities

- **GitHub:** repository source of truth and CI/CD automation
- **GitHub Actions:** QA, build, artifact generation, and public frontend deployment
- **GitHub Pages:** public React application at `darenprince.com/voxvector/`
- **Render:** runtime host for the FastAPI API at `voxvector.crownlabs.tech`
- **Supabase:** configured authentication, persistence, diagnostics, and private media storage

Render is an API runtime, not VoxVector's durable media repository. GitHub Pages is a frontend host, not the API runtime.

## Audio flow

`Browser → frontend → API on Render → Supabase private media storage`

The API mediates authenticated upload operations. Persistent audio storage belongs to the configured Supabase architecture, not Render.

## AUTO engineering workflow

The execution layer is [GitHub tracker #915](https://github.com/darenprince/darenprince-author/issues/915), governed by [DEVELOPMENT_WORKFLOW.md](../../../../VoxVector/docs/DEVELOPMENT_WORKFLOW.md#10-development-flow), effective September 8, 2026. Issues own task status, dependencies and acceptance criteria; PRs own reviewable changes; [AUDIT_REPORT.md](../../../../voxvector/audits/AUDIT_REPORT.md) records evidence after each task. Follow Backlog → Ready → In progress → In review → Done, with explicit Blocked reasons. Close only after acceptance evidence is verified. Dashboard planning must link this queue and keep task status separate from runtime, deployment and scientific validation. Automated issue synchronization is not claimed.

AUTO means:

1. **Architecture** — establish the actual system boundary.
2. **Understand ownership** — identify the canonical implementation.
3. **Trace** — follow source through deployment and runtime to the actual failing boundary.
4. **Operate and verify** — edit the canonical owner, build, deploy, verify, then document.

This workflow explicitly rejects assumption-driven debugging, patch stacking, and deleting layers without migrating their useful behavior.

## Documentation governance

The VoxVector repository and `VoxVector/docs/` remain authoritative for technical implementation.

This Crown Labs dossier mirrors material architecture and workflow changes for executive/product continuity. If a conflict exists, repository canon controls.

## Synchronization rule

Material changes to:

- architecture
- deployment boundaries
- storage/data flow
- engineering workflow
- canonical ownership
- major product surfaces

must be updated in canonical VoxVector documentation and then synchronized to the corresponding Crown Labs dossier.

For the complete technical report and mandatory workflow, see:

`VoxVector/docs/SYSTEM_ARCHITECTURE_AND_AUTO_WORKFLOW.md`
