# Render Runtime Incident — 2026-08-19

**Status:** Active remediation
**Product:** VoxVector
**Canonical repository:** `darenprince/darenprince-author`

## Observed failure

A previously live Render deployment successfully served `/health`, while `POST /v1/analyze` returned the NumPy matrix multiplication error:

`size 258 is different from 601`

The canonical acoustic implementation now derives spectral frequency vectors from the actual FFT output width, and the pipeline processes frames in bounded chunks. Those changes address the documented runtime dimension and memory failures.

A subsequent deployment of the runtime fingerprinting wrapper exited with status 1 before Uvicorn became available. The Render log showed build success followed by `Deploying...` and `Exited with status 1`, without a Uvicorn startup line. This means that deployment did not replace the last successful production instance.

## Canonical layout correction

The authoritative VoxVector application lives under `./VoxVector/`. A root-level `./api/` directory was created as a conflicting deployment layout and is not part of the canonical application.

The deployable HTTP adapter is now located at:

`VoxVector/api/app.py`

The analysis engine remains at:

`VoxVector/src/voxvector/`

Render must use `VoxVector` as its Root Directory and launch `api.app:app`. No root-level `api/` deployment path is permitted for VoxVector.

## Remediation

`VoxVector/api/app.py`:

- places the canonical `VoxVector/src` package first on the Python package path;
- reports the actual loaded acoustic and pipeline module paths;
- reports SHA-256 fingerprints for those loaded modules;
- uses the Render commit environment value when available;
- runs the spectral self-test without terminating the worker during module import;
- exposes the self-test result through `/health`;
- rejects `/v1/analyze` with HTTP 503 if the runtime self-test fails.

This preserves the requirement that a stale or shadowed acoustic implementation must never silently perform production analysis.

## Required post-deploy readback

After the next Render deployment, verify `/health` before submitting audio. Expected fields include:

- `status: ok`
- `runtime_self_test: passed`
- `canonical_package` ending in `VoxVector/src/voxvector`
- `acoustic_module` ending in `VoxVector/src/voxvector/acoustic.py`
- `pipeline_module` ending in `VoxVector/src/voxvector/pipeline.py`
- non-empty `acoustic_source_sha256`
- non-empty `pipeline_source_sha256`

Then submit the known WAV fixture to `/v1/analyze` and verify that the response contains provenance and the configured observational disposition.

## Verification boundary

A green Render deployment is not considered runtime verification by itself. The deployment must pass both service-health and known-fixture analysis checks. No deception probability is considered validated by this incident remediation.
