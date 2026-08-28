# VoxVector Documentation Alignment — 2026-08-28

**Status:** Current synchronization record

## Deployment truth

- Public React frontend: `voxvector/`
- Public frontend host: GitHub Pages
- Backend and analysis engine: `VoxVector/`
- Backend host: Render
- Operational and authentication data: Supabase
- Vercel: retired and prohibited for VoxVector

## Canonical deployment policy

See `VoxVector/docs/DEPLOYMENT_BOUNDARY.md`.

That document is the authoritative operational rule for hosting and deployment. Vercel must not be used as a production host, preview host, build target, dependency, configuration source, deployment workaround, or troubleshooting shortcut.

## Review completed

Reviewed the Operating Charter, Project Decision Log, Development Workflow, AI Editing Guardrails, ChatGPT Project Instructions, Version Map, System State, UI Application Architecture, deployment workflow, package configuration, current visual asset checkpoint, and Crown Labs deployment documentation.

The repository already contained the 2026-08-19 Vercel retirement decision. The 2026-08-28 review strengthens that decision by making the exclusion independently discoverable and operationally explicit.

Historical Vercel references remain historical traceability and are not active instructions.

## Documentation drift identified

`voxvector/package.json` is the current frontend package authority. It reports public application version `0.2.36`, React `19.2.8`, React DOM `19.2.8`, and Recharts `3.10.1`. It does not declare Tremor React.

Older documentation still contains historical Tremor and React 18 wording. Historical decision records are retained, but the active Version Map should reflect the current package configuration.

## Verification boundary

This is a documentation synchronization record. It does not claim a fresh browser deployment, production success, or scientific validation.
