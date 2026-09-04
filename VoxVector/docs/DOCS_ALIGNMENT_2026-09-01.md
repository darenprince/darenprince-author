# VoxVector Documentation Alignment — 2026-09-04

## Purpose

Record the current cross-document synchronization for the live Render runtime, 21-stage pipeline, speech-provider readiness, implementation plan, Developer Console, deployment boundaries, and QA state.

## Current repository state

The active engineering branch is `main`.

The canonical architecture remains:

`GitHub Pages React frontend → FastAPI runtime → canonical VoxVector engine → Supabase persistence/diagnostics/private media`

The original Render API is preserved and the separately addressed AWS API environment remains available for controlled evaluation.

## Live runtime evidence

The live Render `/health` response observed on 2026-09-04 reports:

- pipeline `0.2.26`
- source revision `23677b258a60e5cf25287cc0dce3b199f472a7c1`
- runtime self-test `passed`
- diagnostic/media storage `configured_media_ready`
- media storage `true`
- transcription provider `faster_whisper`, adapter installed, execution-ready
- diarization provider `pyannote`, adapter installed, Hugging Face token detected, execution-ready
- diarization model `pyannote/speaker-diarization-community-1`
- current commit QA `external_workflow_required`

## Current 21-stage state

The canonical pipeline remains 21 stages with:

- 14 implemented foundations
- 4 conditional/not-invoked stages
- 3 queued stages

Stages 05 and 07 are now provider-configured and execution-ready at the runtime boundary. Stage 08 has an implemented alignment foundation. None is promoted to integrated production execution without real provider-backed artifacts and verification.

## Active dependency sequence

`media profile → speech/silence timeline → speaker diarization → transcription → timestamp normalization → transcript/audio alignment → multimodal evidence → downstream analysis → guarded classification/disposition`

## Speech provider boundary

Current supported runtime providers:

- faster-whisper transcription
- pyannote Community-1 diarization
- VoxVector-owned timestamp-overlap alignment

Current non-secret Render configuration:

```text
VOXVECTOR_TRANSCRIPTION_PROVIDER=faster_whisper
VOXVECTOR_WHISPER_MODEL=base
VOXVECTOR_WHISPER_DEVICE=cpu
VOXVECTOR_WHISPER_COMPUTE_TYPE=int8
VOXVECTOR_WHISPER_BEAM_SIZE=3

VOXVECTOR_DIARIZATION_PROVIDER=pyannote
VOXVECTOR_DIARIZATION_MODEL=pyannote/speaker-diarization-community-1
```

The Hugging Face credential is present in the live runtime but is never written to repository source or documentation.

## QA boundary

The current live runtime reports `external_workflow_required` for current-commit QA. Exact-commit GitHub Actions verification remains a separate gate from runtime health.

## Documentation synchronization

The following active canonical records have been aligned to this checkpoint:

- `VoxVector/docs/CURRENT_ENGINEERING_STATE_2026-09-04.md`
- `VoxVector/docs/IMPLEMENTATION_PLAN.md`
- `VoxVector/docs/PIPELINE_BUILD_STATUS.md`
- `VoxVector/docs/CAPABILITY_STATUS.md`
- `VoxVector/docs/QA_STATUS.md`
- `VoxVector/docs/ROADMAP.md`
- `VoxVector/docs/SYSTEM_STATE_REPORT.md`
- `VoxVector/docs/ENDPOINT_REGISTRY.md`
- `VoxVector/docs/VERSION_MAP.md`
- `VoxVector/docs/DEPLOYMENT_VARIABLE_MATRIX.md`
- `VoxVector/docs/audits/LIVE_API_SPEECH_RUNTIME_AUDIT_2026-09-03.md`

## Active implementation priority

1. Exact-commit QA.
2. Controlled faster-whisper execution.
3. Controlled pyannote Community-1 execution.
4. Persist transcript and speaker artifacts.
5. Produce and persist multimodal alignment.
6. Expose synchronized speaker/transcript/evidence surfaces.
7. Expand linguistic, interaction, baseline, and evidence consumers.
8. Complete Review Evidence, reporting, history/reopen, and browser verification.
9. Maintain separate scientific validation gates.

Historical alignment documents remain historical traceability records and must not override this current checkpoint.
