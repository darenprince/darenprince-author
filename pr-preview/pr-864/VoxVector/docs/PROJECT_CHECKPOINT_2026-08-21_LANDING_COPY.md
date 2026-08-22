# VoxVector Landing Copy and Console Image Checkpoint — 2026-08-21

## Change

Updated the public React landing page workflow section to use the requested product language and supporting console visual.

## Implemented

- `State of the art Linguistics` is rendered in the approved warm coffee/tan accent.
- `Explore the evidence model` is changed to `Deep Analysis Methods` in the React landing refinement source.
- The workflow description is changed to:
  `See what really makes VoxVector the future of trusted vocal deception detection. Explore the audio intelligence architecture, data extraction processing engines, analysis frameworks, psychological inference models, and long term vision behind VoxVector.`
- `VoxVector/voxvector-audio-analysis-console.png` is displayed centered at 80% width above the workflow heading.
- The console image is staged into the Vite public directory by the GitHub Pages build because the broader `VoxVector/` backend tree remains excluded from the Pages artifact.
- Landing refinement source version is `2026-08-22-v6`.

## Implementation boundary

The console image is presentation content. It is not live telemetry, a scientific result, or evidence from a production analysis session.

## Deployment boundary

The deployment workflow does not generate or modify landing-page source code. React source lives under `voxvector/src/`; the workflow only builds that source and stages the canonical presentation asset into the Vite public directory for the Pages artifact.

## Verification status

Source changes are committed to `main`. The Pages workflow now checks the v6 source marker, requested CTA, requested description, requested heading text, and console image in the production artifact. A fresh GitHub Actions run is required to verify React compilation and deployment after the latest source change.
