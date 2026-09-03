# Speech Runtime and Provenance Audit — 2026-09-03

## Scope

Audit of the canonical VoxVector API health contract, container provenance, speech runtime dependencies, CI QA linkage, AWS ECS deployment workflow, and Hugging Face account connectivity.

## Observed state

- Canonical backend: `VoxVector/`
- Canonical API: `VoxVector/api/app.py`
- Canonical container: `VoxVector/Dockerfile`
- Canonical QA workflow: `.github/workflows/voxvector-qa.yml`
- Canonical AWS deployment workflow: `.github/workflows/voxvector-aws-ecs.yml`
- Hugging Face account connection: authenticated as `crownlabs-voxvector`

## Changes completed

1. Container builds now embed an explicit source revision.
2. Health output resolves provenance from deployment metadata or embedded container metadata.
3. AWS deployment runs canonical backend QA before image deployment.
4. AWS images receive the exact GitHub SHA and a source-specific QA status.
5. Speech health status distinguishes dependency installation from execution readiness.
6. Transcription readiness requires an explicit provider plus installed adapter.
7. Diarization readiness requires an explicit provider, installed adapter, and runtime Hugging Face token.
8. Selected speech model names are exposed only when explicitly configured.

## External configuration boundary

The connected Hugging Face account is authenticated for the available tool surface, but that does not expose or authorize copying a bearer token into repository source or deployment environment.

A diarization deployment secret must therefore be provisioned through the selected runtime's secret-management boundary. No token was invented, committed, or represented as configured.

## Capability boundary

The installed `faster-whisper` and `pyannote.audio` dependencies do not prove transcription or diarization execution. The 21-stage pipeline must report real acquisition outcomes before those stages are promoted from provider-gated/queued status to integrated execution.

## Verification status

Source-level readback verified:

- provenance resolver present
- current-commit QA field present
- speech execution readiness fields present
- AWS QA gate present
- AWS source revision build arguments present

A fresh CI run and deployment are still required before claiming the new runtime metadata is active in the currently running API.
