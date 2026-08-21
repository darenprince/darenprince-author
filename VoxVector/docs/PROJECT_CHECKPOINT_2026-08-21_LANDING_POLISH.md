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
- Removed the public header notice stating that pauses pitch changes hesitation or stress responses are observations and that no individual vocal signal proves deception.
- Increased spacing between public header navigation items and utility controls.
- Tightened vertical spacing between hero heading body and CTA elements.
- Reduced the `IN YOUR AUDIO` hero line scale.
- Changed the shared VoxVector Button component from `rounded-md` to `rounded-full` so actual buttons consistently render as pills.
- Kept ordinary links cards panels fields and structural surfaces from receiving global pill geometry.

## Deployment path

- Production frontend: GitHub Pages.
- Deployment mechanism: GitHub Actions Pages artifact + `actions/deploy-pages`.
- Backend API: Render at `https://voxvector.crownlabs.tech`.
- Vercel and Netlify are not production deployment targets for VoxVector.

## Verification boundary

The source changes are committed to `main`. GitHub Pages is the production frontend deployment path. Production publication should be verified from the GitHub Pages Actions deployment result rather than inferred from a source commit alone.
