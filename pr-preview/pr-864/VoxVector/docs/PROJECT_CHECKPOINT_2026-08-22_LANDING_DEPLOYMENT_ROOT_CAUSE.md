# VoxVector Landing Deployment Root Cause — 2026-08-22

## Incident

GitHub Pages deployments completed successfully, but the public landing page did not show the requested workflow heading, CTA copy, or console image.

## Root cause

The workflow section is modified by `LandingContentRefinement.jsx` at runtime. `HeroRefinement.jsx` also prepends a canvas directly to `#workflow` for the animated evidence signal field.

`LandingContentRefinement.jsx` previously assumed `section.firstElementChild` was the workflow content container. That assumption became false after the hero signal field was inserted. The first child was the canvas, so the console feature insertion path stopped before creating the image element.

The console image was also being copied into the Pages artifact only after the Vite build. That made the asset deployment depend on a separate staging operation rather than making it part of the canonical frontend build output.

## Resolution

`LandingContentRefinement.jsx` now:

- locates the actual workflow content container by structure instead of child position
- inserts the console feature immediately before the workflow grid
- uses the requested 80% centered width
- uses eager image loading and high fetch priority
- uses a version marker `2026-08-22-v3`
- preserves the coffee `State of the art Linguistics` treatment
- applies the requested description and `Deep Analysis Methods` CTA directly through the refinement

The Pages workflow now copies the canonical console image into `voxvector/public/` before Vite builds. Vite therefore emits the image into `voxvector/dist/` as a first-class production asset. The deployment gate verifies that exact artifact before Pages staging.

## Canonical architecture

The Operating Charter defines `voxvector/` as the canonical public React application and GitHub Pages as its deployment surface. `VoxVector/` remains the backend and analysis-engine workspace. fileciteturn773file0L2-L2

The deployment workflow follows that boundary and publishes the generated React artifact under `/voxvector/`.

## Commits

- `ba9097b58b781112e95ad3b6e4c1454ef90bb4c5` — deterministic landing refinement and console insertion fix
- `f477a18308240900b27d4308a317d42d95d963c4` — make console image part of the Vite production build

## Verification

A fresh GitHub Actions run is required to establish that the updated source compiles, the image is present in `dist/`, the Pages artifact contains the same image, and the resulting Pages deployment is current.
