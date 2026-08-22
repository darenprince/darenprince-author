# VoxVector Deployment Plan — Historical Record

**Status:** Superseded historical record
**Canonical active deployment procedure:** `VoxVector/docs/DEVELOPMENT_WORKFLOW.md`
**Canonical backend deployment records:** `VoxVector/docs/PROJECT_DECISION_LOG.md` and current Render configuration
**Reviewed:** 2026-08-22

## Why this document is retained

This file is retained for historical traceability. It contains earlier deployment assumptions that are no longer the active VoxVector workflow.

It must **not** be used as the current frontend or backend deployment instruction.

## Current architecture

- `voxvector/` is the canonical public React frontend.
- GitHub Pages is the canonical public frontend host.
- `main` is the production frontend deployment source.
- Pull requests use isolated previews or build artifacts and must never replace production Pages.
- `VoxVector/` is the canonical backend and analysis-engine root.
- Render is the canonical backend host.
- Supabase remains part of the existing authentication, persistence, and diagnostic architecture.

## Historical notes

The original document was created to evaluate free hosting and deployment constraints. Earlier Python and dependency values in that record were superseded by later project decisions. Do not use its historical runtime values for new deployments.

Provider research remains preserved in `FREE_HOSTING_RESEARCH_2026-08-18.md` for historical evidence and does not itself establish an active deployment target.

## Active rule

For current work, follow the VoxVector Operating Charter and `DEVELOPMENT_WORKFLOW.md`. If this historical document conflicts with either, the active canonical records control.
