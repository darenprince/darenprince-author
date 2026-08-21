# VoxVector Landing Polish Checkpoint — 2026-08-21

## Scope

Applied the requested public landing and loading-screen refinement directly to `main` so the GitHub Pages Actions production pipeline can consume the changes without relying on a preview branch.

## Implemented

- Reduced loader logo scale.
- Desaturated the loader logo slightly.
- Shifted loader orbit treatment from gold toward coffee/brown tones.
- Added a restrained logo pulse.
- Added animated high-tech waveform signal paths behind the loader.
- Removed the hero disclaimer treatment below the CTA row.
- Tightened vertical spacing between hero heading body and CTA elements.
- Reduced the `IN YOUR AUDIO` hero line scale.
- Changed actual site buttons to pill geometry while leaving cards panels fields and structural surfaces unchanged.

## Deployment path

- Production frontend: GitHub Pages.
- Deployment mechanism: GitHub Actions Pages artifact + `actions/deploy-pages`.
- Backend API: Render at `https://voxvector.crownlabs.tech`.
- Vercel and Netlify are not production deployment targets for VoxVector.

## Verification boundary

The source changes are committed to `main`. The GitHub connector available in this environment does not expose the repository Pages Settings source selector or a reliable push-triggered production deployment run listing, so production publication cannot be claimed solely from repository state. GitHub Pages must have its repository publishing source set to **GitHub Actions** for the Pages artifact workflow to control the live site.
