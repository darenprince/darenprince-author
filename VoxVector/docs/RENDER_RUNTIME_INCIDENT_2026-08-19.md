# Render Runtime Incident — 2026-08-19

**Status:** open runtime reliability investigation
**Product:** VoxVector
**Canonical repository:** `darenprince/darenprince-author`
**Canonical root:** `VoxVector/`
**Public target:** `voxvector.crownlabs.tech`

## Incident history

### Earlier deployment defect

A previously live Render deployment served `/health`, while `POST /v1/analyze` returned a NumPy matrix multiplication dimension error:

`size 258 is different from 601`

The canonical runtime was subsequently fingerprinted and the deployment layout was corrected.

### Current public endpoint incident

After the canonical deployment successfully built and started, repeated `/health` requests returned HTTP 200 and the runtime self-test reported `passed`.

A subsequent public Swagger request to:

`POST https://voxvector.crownlabs.tech/v1/analyze`

returned **HTTP 502**. The captured response identified `cloudflare` as the edge server and `Render` as the origin server, with `content-length: 0`. The event therefore indicates that the edge did not receive a usable origin response. The HTTP 502 alone does not establish whether the origin process crashed, was terminated for resource pressure, timed out, or encountered another infrastructure/application failure.

## Canonical layout

The authoritative VoxVector application lives under `./VoxVector/`.

Current runtime locations:

- HTTP adapter: `VoxVector/api/app.py`
- Analysis engine: `VoxVector/src/voxvector/`
- API dependencies: `VoxVector/api/requirements.txt`

Render must use `VoxVector` as Root Directory and launch `api.app:app`.

## Implemented remediation

The canonical API adapter:

- places the canonical `VoxVector/src` package first on the Python package path;
- reports actual loaded acoustic and pipeline module paths;
- reports SHA-256 fingerprints for those loaded modules;
- uses the Render commit environment value when available;
- runs a spectral self-test without terminating the worker during module import;
- exposes the self-test result through `/health`;
- rejects `/v1/analyze` with HTTP 503 if the runtime self-test fails.

The analysis pipeline also uses bounded frame chunks and the formant implementation has been hardened against the final FFT-bin boundary.

## Open reliability work

The next engineering work is explicitly operational, not scientific inference work:

1. add request IDs/correlation IDs;
2. add structured exception capture and sanitized stack traces;
3. add stage-level timing for decode, eligibility, feature extraction, evidence construction, and serialization;
4. add resource and timeout instrumentation;
5. add persistent diagnostics so errors survive instance restarts;
6. add safe request/audio limits that return controlled errors before worker termination;
7. reproduce the 502 with a known fixture;
8. determine whether the cause is memory pressure, timeout, application exception, or infrastructure behavior;
9. add regression coverage for the discovered failure mode;
10. redeploy and verify against the exact source revision.

## Current pipeline resource consideration

The primary pipeline processes frames in bounded chunks, but it still accumulates multiple feature arrays across the complete recording before final result construction. This architecture reduces peak frame-matrix allocation but does not guarantee bounded total memory for arbitrarily long input. The 502 investigation must measure actual resource behavior before changing the architecture.

## Required post-deploy readback

Before calling the deployment verified, confirm:

- `status: ok`
- `runtime_self_test: passed`
- `canonical_package` points into `VoxVector/src/voxvector`
- `acoustic_module` points to `VoxVector/src/voxvector/acoustic.py`
- `pipeline_module` points to `VoxVector/src/voxvector/pipeline.py`
- source SHA-256 fingerprints are non-empty
- known WAV `/v1/analyze` succeeds without an origin failure
- returned provenance identifies the canonical runtime
- public `voxvector.crownlabs.tech` serves the verified runtime
- the exact deployed source revision matches the verified repository commit

## Verification boundary

A green Render deployment is not runtime verification by itself. Runtime verification requires health, provenance, known-fixture analysis, and source-revision checks. None of this constitutes scientific validation of deception inference.
