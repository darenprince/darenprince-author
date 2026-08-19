# VoxVector Deployment Plan

**Status:** active deployment runbook
**Canonical repository:** `darenprince/darenprince-author`
**Canonical root:** `VoxVector/`
**Runtime:** FastAPI + canonical Python analysis engine
**Render target:** `voxvector.crownlabs.tech`
**Reviewed:** 2026-08-19

## Canonical deployment layout

```text
VoxVector/
  api/
    app.py
    requirements.txt
  src/voxvector/
  tests/
  docs/
```

Render must use:

- Root Directory: `VoxVector`
- Build Command: `pip install -r api/requirements.txt`
- Start Command: `uvicorn api.app:app --host 0.0.0.0 --port $PORT`
- Python baseline: 3.12

The root-level `./api/` directory is not part of VoxVector and must not be used.

## Public target

The intended public product URL is:

`https://voxvector.crownlabs.tech`

This is a deployment target, not a repository assertion that the domain is currently serving the latest build.

## Required deployment verification

A successful Render build is not enough. After deployment:

1. Open `/health`.
2. Confirm `runtime_self_test` reports success.
3. Confirm canonical package, acoustic module, and pipeline module paths point into `VoxVector/src/voxvector`.
4. Confirm source fingerprints are present.
5. Submit the known WAV fixture to `/v1/analyze`.
6. Confirm the response contains provenance and the configured observational disposition.
7. Confirm no fabricated deception probability is returned.
8. Confirm the public domain serves the same verified runtime.

## Current incident context

A prior Render runtime returned a NumPy spectral matrix dimension error. A later runtime wrapper deployment exited before Uvicorn startup. The remediation moved the adapter into `VoxVector/api/app.py`, added runtime fingerprinting and a spectral self-test, and made `/v1/analyze` fail closed when the self-test fails. See `RENDER_RUNTIME_INCIDENT_2026-08-19.md`.

## Frontend boundary

A production frontend may be added or expanded separately from the Python engine. It must call the canonical API and must not recreate analysis logic in browser code. The frontend must clearly distinguish real analysis results from demo or placeholder data.

## Scientific verification boundary

Deployment verification confirms software/runtime integrity only. It does not validate deception-detection accuracy. Scientific validation requires the process defined in `VALIDATION.md`.

## Dependency baseline

The current pinned runtime is:

- Python 3.12+
- NumPy 2.5.1
- FastAPI 0.140.8
- Uvicorn 0.51.0
- python-multipart 0.0.32
- pytest 9.1.1 for development QA

Re-check provider and package release state before a future upgrade.
