# Render Runtime Incident — 2026-08-19

**Status:** remediation code committed; post-deploy verification pending
**Product:** VoxVector
**Canonical repository:** `darenprince/darenprince-author`
**Canonical root:** `VoxVector/`
**Public target:** `voxvector.crownlabs.tech`

## Observed failure

A previously live Render deployment served `/health`, while `POST /v1/analyze` returned a NumPy matrix multiplication dimension error:

`size 258 is different from 601`

A subsequent runtime-fingerprinting deployment exited with status 1 before Uvicorn became available. That deployment therefore did not replace the last known successful production instance.

## Canonical layout correction

The authoritative VoxVector application lives under `./VoxVector/`. A root-level `./api/` directory had been created as a conflicting deployment layout and was not part of the canonical application. It has been removed.

Current runtime locations:

- HTTP adapter: `VoxVector/api/app.py`
- Analysis engine: `VoxVector/src/voxvector/`
- API dependencies: `VoxVector/api/requirements.txt`

Render must use `VoxVector` as Root Directory and launch `api.app:app`.

## Remediation implemented

The canonical API adapter:

- places the canonical `VoxVector/src` package first on the Python package path;
- reports actual loaded acoustic and pipeline module paths;
- reports SHA-256 fingerprints for those loaded modules;
- uses the Render commit environment value when available;
- runs a spectral self-test without terminating the worker during module import;
- exposes the self-test result through `/health`;
- rejects `/v1/analyze` with HTTP 503 if the runtime self-test fails.

These controls are intended to prevent a stale or shadowed analysis implementation from silently handling production analysis.

## Required post-deploy readback

Before calling the deployment verified, confirm:

- `status: ok`
- `runtime_self_test: passed`
- `canonical_package` points into `VoxVector/src/voxvector`
- `acoustic_module` points to `VoxVector/src/voxvector/acoustic.py`
- `pipeline_module` points to `VoxVector/src/voxvector/pipeline.py`
- `acoustic_source_sha256` is non-empty
- `pipeline_source_sha256` is non-empty
- known WAV `/v1/analyze` succeeds
- returned provenance identifies the canonical runtime
- public `voxvector.crownlabs.tech` serves the verified runtime

## Verification boundary

A green Render deployment is not runtime verification by itself. Runtime verification requires health, provenance, and known-fixture analysis checks. None of this constitutes scientific validation of deception inference.
