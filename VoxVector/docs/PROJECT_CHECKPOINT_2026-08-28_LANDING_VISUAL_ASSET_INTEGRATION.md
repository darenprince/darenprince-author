# Landing Visual Asset Integration — 2026-08-28

## Objective

Increase the visual depth of the canonical VoxVector public landing page by using the existing production visual asset library already staged under `voxvector/public/assets/marketing/`.

## Implemented

- Added `voxvector/public/visual-assets.css` as the canonical landing visual asset layer.
- Switched the hero atmospheric artwork from the older cinematic asset to `voxvector-bg-audio-signal-1920x1080.svg`.
- Added a dark left-side readability treatment so hero typography remains dominant.
- Added a bottom gradient dissolve so the hero artwork fades naturally into the following page surface.
- Added `voxvector-bg-network-1920x1080.svg` behind the analytical workflow section while preserving the existing console artwork as the primary visual.
- Added `voxvector-bg-topography-1920x1080.svg` to the Technology section as a restrained technical texture.
- Added `voxvector-blog-evidence-analysis-1200x628.svg` to the Analytical Interface section as a low-opacity editorial visual field.
- Added `voxvector-blog-evidence-path-1200x628.svg` to the Scientific Discipline section.
- Added `voxvector-blog-science-of-voice-1200x628.svg` to the Use Cases section.
- Added responsive opacity, positioning, masking, and mobile reductions so imagery remains subordinate to content.
- Linked the new stylesheet from `voxvector/index.html` without replacing the existing landing implementation.

## Asset boundary

All artwork was already present in the repository. No new external imagery was introduced. The visual assets are decorative and atmospheric; they do not represent live telemetry, measurements, validation results, or deception classifications.

## Verification status

- Read the canonical operating charter before editing.
- Inspected the current landing implementation in `voxvector/src/App.jsx`.
- Inspected the existing landing stylesheet and production visual asset inventory.
- Read back the new stylesheet and `index.html` after the change.
- GitHub source changes committed to `main`.
- Browser verification and fresh GitHub Actions production build remain required before claiming visual or deployment success.
