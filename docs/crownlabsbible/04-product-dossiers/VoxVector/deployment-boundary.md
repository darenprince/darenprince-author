# VoxVector Deployment Boundary

**Status:** Current product mirror
**Effective:** 2026-08-28

## Canonical hosting architecture

VoxVector has a deliberately separated deployment architecture:

- **Public frontend:** the React application in `voxvector/`, deployed only through GitHub Pages.
- **Backend and analysis engine:** the canonical `VoxVector/` workspace, served through Render.
- **Operational and authentication data:** Supabase, using the existing project architecture.
- **Deployment automation:** GitHub Actions for the public GitHub Pages build and release path.

## Vercel

**Vercel is not part of VoxVector.**

Vercel is retired and is not a supported VoxVector production host, frontend host, backend host, preview host, build target, dependency, configuration source, deployment target, or troubleshooting workaround.

Agents and developers must not introduce Vercel into VoxVector or use Vercel as an alternative path when the canonical deployment has a problem.

## Historical references

Some historical VoxVector records mention Vercel because it was considered or used during earlier development exploration. Those records are retained for traceability. They are not current deployment instructions.

The active technical policy is `VoxVector/docs/DEPLOYMENT_BOUNDARY.md`.

## Canonical paths

Public frontend:

`main → GitHub Actions → React build → GitHub Pages → darenprince.com/voxvector/`

Backend:

`VoxVector → Render → voxvector.crownlabs.tech`

The frontend and backend hosting boundaries must remain distinct.
