# Landing Visual Asset Integration — 2026-08-28

## Objective

Increase the visual depth of the canonical VoxVector public landing page by using the existing production visual asset library already staged under `voxvector/public/assets/marketing/`.

## Implemented

- Added `voxvector/public/visual-assets.css` as the canonical landing visual asset layer.
- Corrected the hero integration so `voxvector-bg-audio-signal-1920x1080.svg` is applied directly to the canonical `#product` hero section rather than an assumed child element.
- Added layered left readability treatment and a pronounced bottom gradient dissolve so the hero artwork visibly transitions into the page surface.
- Repositioned the `Explore Technology` cue to a stable bottom-center scroll affordance with a contained down-arrow treatment.
- Added `voxvector-bg-network-1920x1080.svg` behind the analytical workflow section while preserving the existing console artwork as the primary visual.
- Added `voxvector-bg-topography-1920x1080.svg` to the Technology section as a restrained technical texture.
- Added `voxvector-blog-evidence-analysis-1200x628.svg` to the Analytical Interface section as a low-opacity editorial visual field.
- Added `voxvector-blog-evidence-path-1200x628.svg` to the Scientific Discipline section.
- Added `voxvector-blog-science-of-voice-1200x628.svg` to the Use Cases section.
- Added responsive opacity, positioning, masking, and mobile reductions so imagery remains subordinate to content.
- Linked the visual stylesheet from `voxvector/index.html` without replacing the existing landing implementation.
- Corrected the remaining hero layering bug by moving the canonical waveform artwork from a child selector to the `#product::before` layer and explicitly hiding the three legacy React hero background layers.
- Added a landing stylesheet cache-bust query to the HTML stylesheet references so a previously cached `landing.css` cannot mask the deployed correction.

## Asset boundary

All artwork was already present in the repository. No new external imagery was introduced. The visual assets are decorative and atmospheric; they do not represent live telemetry, measurements, validation results, or deception classifications.

## Root cause of remaining unchanged appearance

The React hero currently contains three direct-child visual layers followed by the content wrapper. The prior stylesheet correction still assumed the first child was the canonical artwork layer. That allowed the legacy cinematic background to remain authoritative in the rendered composition. The current correction owns the artwork at `#product::before`, suppresses all three legacy background layers, and leaves the content wrapper above the visual layer.

## Verification status

- Inspected the canonical landing implementation in `voxvector/src/App.jsx`.
- Inspected the existing landing stylesheet and production visual asset inventory.
- Confirmed the required marketing SVG assets exist under `voxvector/public/assets/marketing/`.
- Read back the corrected stylesheet after the change.
- Read back the updated `voxvector/index.html` and confirmed the cache-busting stylesheet references.
- GitHub source changes committed to `main`.
- GitHub Pages deployment is expected from the `main` push through the canonical workflow, but the resulting production page has not been browser verified in this environment.
- Do not claim visual success until the deployed page is inspected on desktop and mobile.