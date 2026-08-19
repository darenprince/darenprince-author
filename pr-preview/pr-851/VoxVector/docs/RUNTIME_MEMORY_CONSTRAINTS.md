# VoxVector Runtime Memory Constraints

**Status:** Active runtime guidance
**Updated:** 2026-08-19

## Incident

The initial Render Free deployment successfully started the FastAPI service and passed `/health`, but `/v1/analyze` could terminate the instance when processing a larger WAV. Render reported that the instance exceeded its 512 MB memory ceiling.

The cause was identified in the canonical analysis pipeline: overlapping audio frames and FFT spectra were being materialized for the entire recording at once.

## Resolution

VoxVector now processes audio frames in bounded chunks of 256 frames while preserving the existing 25 ms frame size and 10 ms hop.

The expensive frame and spectrum matrices are therefore bounded. Compact one-dimensional feature streams are retained for the existing observational summaries, prosodic dynamics, pause topology, baseline comparisons, and evidence construction.

Spectral flux preserves continuity across chunk boundaries by carrying only the final spectrum from the preceding chunk into the next flux calculation.

## Scientific and architectural boundary

This is a runtime resource change only. It does not promote any analytical method to validated deception inference and does not change the required separation between:

1. eligibility and reliability;
2. evidence collection and analysis;
3. candidate classification;
4. final classification or disposition.

The pipeline remains observational and returns `insufficient_evidence` for an otherwise eligible recording when no validated final inference gate is available.

## Verification requirement

A deployment is not considered verified solely because the service starts. The following checks are required after deployment:

- `GET /health` returns success.
- `/v1/analyze` accepts a supported WAV fixture.
- The service remains alive during analysis.
- The result includes provenance and the expected observational disposition.
- Invalid or oversized inputs are rejected without killing the worker.
- No deception probability is fabricated.

## Deployment note

The canonical runtime wrapper is `api/voxvector/app.py`. The Render service is configured by the repository `render.yaml` and imports the canonical engine from `VoxVector/src/voxvector`.
