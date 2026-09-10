# VoxVector Render Blueprint Canonicalization Audit — 2026-09-10

## Scope

One Render/IaC and deployment-dependency subsystem. This task reconciles the existing `voxvector-api` service with the sole root `render.yaml`, separates cloud-primary and optional-local speech dependencies, makes non-secret runtime constraints reproducible, resolves production CORS ownership, preserves external secret ownership, and keeps automatic production deployment disabled.

Issue: #964  
Prompt: `VV-RENDER-BLUEPRINT-CANONICALIZE`  
Source base: `53ee1b5e27b89fb436fd72da342cd6f947a667b0`  
Branch: `fix/voxvector-render-blueprint-canonicalize`

## Source and service evidence

Connected Render service readback for `voxvector-api` / `srv-da2f88n40ujc73a8m26g` established:

- repository `https://github.com/darenprince/darenprince-author`;
- branch `main`;
- root `VoxVector`;
- Python runtime;
- plan `free`;
- region `oregon`;
- one instance;
- build `pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`;
- start `uvicorn api.app:app --host 0.0.0.0 --port $PORT`;
- health path `/health`;
- automatic deployment off.

The owner-provided Render export generated at `2026-09-10T21:38:48Z` independently matched service/repository/root/runtime/plan/region/build/start/health/domain/auto-deploy fields. Its environment entries were value-redacted as `sync: false` and were not treated as value evidence.

At issue start, root `render.yaml` instead built `api/requirements-transcription.txt` and carried only a partial non-secret runtime profile. The connected live service build command and source Blueprint therefore differed.

Repository search found one file named `render.yaml`; no second Blueprint owner was created.

## Dependency trace and decision

`VoxVector/src/voxvector/diarization_pyannote_api.py` implements the cloud-primary provider with stdlib HTTP, NumPy and VoxVector contracts. It does not import `pyannote.audio` or Torch.

`VoxVector/src/voxvector/diarization_pyannote.py` implements the optional local Community-1 provider and loads `pyannote.audio` and Torch lazily when that local provider executes.

`VoxVector/src/voxvector/speech_providers.py` selects the cloud provider independently and wraps the local provider only when explicit fallback is enabled.

Therefore local pyannote/Torch are not required for Render's cloud-primary production runtime.

The dependency ownership was changed to:

- `api/requirements-transcription.txt`: faster-whisper;
- `api/requirements-speech.txt`: cloud-primary Render speech manifest, including the transcription manifest only;
- `api/requirements-diarization-local.txt`: optional local Community-1 dependency `pyannote.audio==4.0.7`;
- `VoxVector/Dockerfile`: continues installing the dedicated local manifest in addition to speech dependencies so the pre-existing container/AWS optional fallback capability is preserved.

The Dockerfile change preserves dependency behavior. It is not an AWS deployment or environment change.

## Blueprint decision

The sole root `render.yaml` now records the existing service shape that is relevant to preventing default drift:

- repository and `main` branch;
- Python web service;
- free plan and Oregon region;
- `VoxVector` root;
- current `requirements-speech.txt` build command;
- current start command and `/health` path;
- custom domain `voxvector.crownlabs.tech`;
- `autoDeployTrigger: off`.

The Blueprint source-controls the non-secret constrained profile used for the next runtime proof: faster-whisper `base`/CPU/int8/beam-1, one CPU thread, one worker, isolated child process, 165-second child timeout, 512 MiB application memory reference, 96 MiB headroom, cloud-primary `pyannote_api`, local fallback disabled, bounded native-thread values, allocator arena limit, and tokenizer parallelism disabled.

`VOXVECTOR_ENABLE_DIARIZATION_RUNS=false` is deliberate for the #941 controlled runtime-stability candidate. It prevents the separate unverified cloud-diarization request path from changing the transcription/Stage-10 experiment. #970 owns deliberate gate enablement and real cloud-primary execution after #941 acceptance.

## CORS decision

`VoxVector/api/app.py` defaults `CORS_ORIGINS` to `*` when absent. The owner Render export did not list the key. The Blueprint now owns the explicit production list:

`https://darenprince.com,https://www.darenprince.com,https://voxvector.crownlabs.tech`

`VoxVector/api/.env.example` mirrors that value. This removes wildcard ambiguity from the Blueprint-managed production profile. It does not substitute for authenticated browser verification.

## Secret decision

Protected values remain external. The source does not contain pyannoteAI, Hugging Face, Supabase service-role, Render API, or Render deploy-hook secret values.

Current Render Blueprint documentation states that existing environment variables omitted from a Blueprint are preserved for an existing service unless explicitly overwritten. The task therefore does not copy the provider export's redacted `sync: false` list wholesale into Git. Existing secrets stay server-managed.

## Automated source coverage added

`VoxVector/tests/test_speech_providers.py` now checks:

- Blueprint service identity/repository/branch/plan/region/root/build/start/health/manual-deploy/domain fields;
- explicit production CORS list and absence of wildcard in the Blueprint value;
- bounded non-secret transcription/memory/diarization/thread profile;
- cloud-primary `requirements-speech.txt` excluding local pyannote/Torch;
- dedicated local requirements retaining `pyannote.audio==4.0.7`;
- Dockerfile retaining installation of the optional local dependency manifest.

## Documentation synchronized

Affected canonical documentation:

- `VoxVector/docs/DEPLOYMENT_BOUNDARY.md`;
- `VoxVector/docs/DEPLOYMENT_VARIABLE_MATRIX.md`;
- `VoxVector/docs/SPEECH_RUNTIME_DEPLOYMENT.md`.

Affected Crown Labs Bible mirror:

- `docs/crownlabsbible/04-product-dossiers/VoxVector/deployment-boundary.md`.

The issue body remains the live execution record for final branch QA, merge and production deployment evidence.

## Verification state

At this audit checkpoint, final exact-head/current-base QA, PR Preview, final diff/review inspection, merge and deliberate Render deployment remain pending. Those results must not be predicted or represented as completed.

After an approved exact merge, Render auto-deploy remains off. A deliberate deployment to the existing `voxvector-api` service is required, followed by terminal deploy/source verification and fresh runtime readback where tooling permits.

## Running audit preservation

The large `voxvector/audits/AUDIT_REPORT.md` is not replaced through a whole-file mutation because that risks truncating its historical task log. This scoped audit preserves the #964 evidence. A safe patch-capable append remains desirable when available.

## Unresolved evidence

- exact-head/current-base QA and PR Preview;
- final diff and review-thread state;
- exact merge revision;
- deliberate Render deployment of the merge;
- post-deployment build/runtime readback proving the new dependency/profile source is actually in use;
- fresh `/health` exact-revision/profile evidence;
- #941 controlled same-WAV production proof;
- #970 cloud-primary provider execution;
- browser verification remains separate.

## Boundary

Dependency configuration is not provider execution. Blueprint source is not a Render sync or deployment. A Render deployment is not fresh `/health` or browser verification. None of this constitutes scientific validation.
