# VoxVector Live API and Speech Runtime Audit

**Date:** 2026-09-03  
**Audit ID:** live-api-speech-runtime-2026-09-03  
**Status:** remediation-required  
**Evidence source:** live `/health` response supplied from the currently deployed API and connected infrastructure inspection.

## Executive summary

The live VoxVector API is healthy and its core acoustic analysis foundation is running. The runtime self-test passed. However, the currently deployed speech adapters are installed but not operationally configured: transcription has no configured provider, diarization has no configured provider, and the expected Hugging Face token is not visible to the running process.

The live health contract also reports `source_revision: unknown` and `current_commit_qa: external_workflow_required`, indicating the observed deployment has not yet demonstrated the newer provenance and commit-specific QA contract.

## Observed runtime facts

- Service: `voxvector-analysis-api`
- Pipeline version: `0.2.26`
- Runtime self-test: passed
- Source revision: unknown
- Maximum sample rate: 48,000 Hz
- Maximum media size: 262,144,000 bytes
- Diagnostic storage: not configured
- Media storage: false

## Pipeline state

The health response reports 21 pipeline stages:

- 14 implemented foundations
- 4 conditional or not invoked
- 3 queued

Queued stages include:

1. Speaker identification and diarization
2. Transcription generation
3. Transcript alignment

Installed adapters must not be represented as successful execution.

## Speech runtime

### Transcription

- Configured provider: not configured
- Adapter installed: true

### Diarization

- Configured provider: not configured
- Adapter installed: true
- Hugging Face token configured: false

## Required remediation

1. Inspect the canonical API environment-variable contract before creating or renaming deployment variables.
2. Configure the selected transcription provider and model using the exact canonical names.
3. Configure the selected diarization provider and model using the exact canonical names.
4. Provision the Hugging Face credential through deployment secret management, not repository source.
5. Redeploy from the canonical repository.
6. Verify the live `/health` response shows configured execution readiness without exposing secrets.
7. Verify embedded source revision and commit-specific QA metadata after the updated deployment.
8. Record the resulting deployment evidence in the Developer Console audit surface.

## Integrity boundary

This audit does not claim that installed `faster-whisper` or `pyannote.audio` dependencies have executed successfully. Dependency installation, provider configuration, successful execution, and scientific validation are distinct states.

## Evidence

- Live VoxVector `/health` JSON observed on 2026-09-03
- Render service inspection for `voxvector-api`
- Canonical backend and speech dependency configuration
- Connected Hugging Face account identity: `crownlabs-voxvector`
