# VoxVector pyannote Provider Architecture Audit — 2026-09-04

## Scope

Audit of the canonical diarization provider architecture after adding the pyannoteAI cloud API path and explicit local pyannote Community-1 fallback.

## Repository findings

Canonical backend changes:

- `VoxVector/src/voxvector/diarization_pyannote_api.py`: implemented cloud provider.
- `VoxVector/src/voxvector/speech_providers.py`: explicit provider selection and fallback orchestration.
- `VoxVector/src/voxvector/evidence_acquisition.py`: diarization provenance is part of the normalized result contract.
- `VoxVector/src/voxvector/diarization_pyannote.py`: local provider emits provider/model provenance.
- `VoxVector/api/app.py`: health reports cloud-key presence and primary/fallback readiness without exposing secrets.
- `VoxVector/tests/test_speech_providers.py`: provider selection, credential gating, fallback wrapping, and fallback provenance coverage added.

## Provider policy

Primary production configuration:

`VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api`

Credential:

`PYANNOTE_KEY`

Optional local fallback:

`VOXVECTOR_DIARIZATION_FALLBACK=pyannote_local`

`VOXVECTOR_DIARIZATION_FALLBACK_ENABLED=true`

Credential:

`HF_TOKEN`

Fallback is explicit and auditable. The fallback path is not automatically enabled merely because both credentials exist.

## API behavior reviewed

The cloud provider follows the documented pyannoteAI asynchronous lifecycle:

1. declare temporary `media://` object;
2. upload normalized WAV bytes using the provider-issued upload URL;
3. submit `/v1/diarize`;
4. poll `/v1/jobs/{jobId}`;
5. normalize successful diarization, preferring exclusive turns when returned;
6. preserve provider and job provenance without exposing credentials.

## Verification status

Implemented source code and documentation are present on the feature branch.

Not yet claimed:

- successful authenticated cloud diarization;
- successful media upload against the user's account;
- successful persisted case artifact;
- successful local fallback execution;
- provider performance or scientific validation.

Those remain controlled runtime verification gates.

## Scientific boundary

Speaker diarization supports speaker segmentation and attribution. It does not establish real-world identity, truthfulness, or deception. Provider confidence and VoxVector deception confidence are separate concepts.

## Documentation synchronization

Relevant canonical VoxVector documentation was updated with the provider policy. The Crown Labs Bible mirror records this audit and pipeline status synchronization without changing implementation claims.
