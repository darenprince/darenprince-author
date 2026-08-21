# VoxVector Landing Copy and Console Image Checkpoint — 2026-08-21

## Change

Updated the public React landing page workflow section to use the requested product language and supporting console visual.

## Implemented

- `State of the art Linguistics` is rendered in the approved warm coffee/tan accent.
- `Explore the evidence model` is changed to `Deep Analysis Methods`.
- The workflow description is changed to:
  `See what really makes VoxVector the future of trusted vocal deception detection. Explore the audio intelligence architecture, data extraction processing engines, analysis frameworks, psychological inference models, and long term vision behind VoxVector.`
- `VoxVector/voxvector-audio-analysis-console.png` is displayed centered at 80% width above the workflow heading.
- The GitHub Pages workflow explicitly stages the canonical console image into the public `/voxvector/` artifact because the broader `VoxVector/` backend tree remains excluded from the Pages site.

## Implementation boundary

The console image is presentation content. It is not live telemetry, a scientific result, or evidence from a production analysis session.

## Verification status

Source changes were committed to `main`. A fresh GitHub Actions build is required to verify React compilation, Pages artifact staging, and deployment after these changes.
