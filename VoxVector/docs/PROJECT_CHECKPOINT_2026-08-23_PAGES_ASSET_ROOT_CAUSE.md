# VoxVector Pages Asset Deployment Root Cause — 2026-08-23

## Incident

The GitHub Pages workflow failed in the asset staging step before the React build could run.

## Confirmed root cause

The canonical console image was moved into `VoxVector/Assets/voxvector-audio-analysis-console.png`, but `.github/workflows/deploy-pages.yml` still tested and copied the old path `VoxVector/voxvector-audio-analysis-console.png`.

The failing command was therefore the first `test -f` in the staging block. Because the workflow uses `set -euo pipefail`, the stale path caused the job to exit immediately with code 1.

The same asset staging omission existed in the PR preview workflow: the preview build verified the generated image but did not stage the canonical source asset into `voxvector/public/` before Vite ran.

## Additional frontend correction

`LandingContentRefinement.jsx` was also still using the old icon path `/voxvector/assets/voxvector-icon-final-color.png`, while the canonical source asset is `VoxVector/Assets/voxvector-icon-final-color.png.PNG`. The refinement also relied on `section.firstElementChild`, which is unsafe because other runtime refinements can insert elements before the workflow content.

The surgical correction:

- uses the canonical `VoxVector/Assets/` source paths;
- stages the console, wordmark, and icon into `voxvector/public/` before every Vite build;
- verifies all three assets in `dist/` and in the Pages artifact;
- inserts the console image immediately after the existing workflow `h2` instead of assuming a child position;
- keeps the existing workflow DOM and behavior intact;
- keeps the section charcoal with no gold scan overlay;
- keeps `State of the art Linguistics` in coffee;
- keeps the console image at 90% width;
- uses the supplied wordmark image with its CSS height set to exactly 80% of the paired icon height.

## Canonical asset locations

- `VoxVector/Assets/voxvector-audio-analysis-console.png`
- `VoxVector/Assets/VoxVector-logo-word.png`
- `VoxVector/Assets/voxvector-icon-final-color.png.PNG`

The backend/analysis workspace remains `VoxVector/`. The public React application remains `voxvector/`. Assets are copied across that boundary only during the frontend build; no duplicate canonical asset directory is created.

## Verification required

The PR must pass both the production-like PR build and the artifact checks. A successful build proves the software artifact was produced; manual browser review remains required to confirm the visual result and that existing functionality survived.
