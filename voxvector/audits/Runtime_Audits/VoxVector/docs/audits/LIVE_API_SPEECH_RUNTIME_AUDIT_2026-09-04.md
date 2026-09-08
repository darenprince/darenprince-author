# VoxVector Live API and Speech Runtime Audit — 2026-09-04

**Audit ID:** `live-api-speech-runtime-2026-09-04`  
**Runtime:** Render `voxvector-api`  
**Source:** live `/health` response supplied from the current deployed API

## Verified runtime

| Metric | Observed value |
|---|---|
| Status | `ok` |
| Service | `voxvector-analysis-api` |
| Pipeline | `0.2.26` |
| Source revision | `23677b258a60e5cf25287cc0dce3b199f472a7c1` |
| Runtime self-test | `passed` |
| Diagnostic/media storage | `configured_media_ready` |
| Media storage | `true` |
| Max sample rate | `48,000 Hz` |
| Max media bytes | `262,144,000` |
| Implemented foundations | `14` |
| Conditional/not-invoked | `4` |
| Queued | `3` |
| Current commit QA | `external_workflow_required` |

## Speech runtime

### Transcription

- Provider: `faster_whisper`
- Adapter installed: `true`
- Execution ready: `true`
- Render profile: `base`, CPU, `int8`, beam size `3`

### Diarization

- Provider: `pyannote`
- Adapter installed: `true`
- Execution ready: `true`
- Hugging Face token presence: `true`
- Model: `pyannote/speaker-diarization-community-1`

## Pipeline state

The complete product pipeline remains 21 stages. Current maturity is 14 implemented foundations, 4 conditional/not-invoked stages, and 3 queued stages.

The queued stages are:

- Stage 05 Speaker Identification / Diarization
- Stage 07 Transcription Generation
- Stage 08 Transcript Alignment

Stages 05 and 07 are now configured and execution-ready at the provider/runtime boundary. Stage 08 has an implemented alignment foundation. These stages remain queued until real provider-backed execution, persisted artifacts, integration verification, and relevant QA evidence are demonstrated.

## Current engineering sequence

1. Exact-commit GitHub QA.
2. Controlled faster-whisper execution on a known WAV fixture.
3. Controlled pyannote Community-1 execution on the same fixture.
4. Persist transcript and speaker artifacts under case/run identity.
5. Produce and persist timestamp-normalized multimodal alignment.
6. Expose synchronized audio, speaker, transcript, analytical, and evidence views.
7. Feed transcript output into linguistic/disfluency analysis and interaction context.
8. Add speaker-aware aggregation and independent baselines.
9. Complete Review Evidence, reports, history/reopen, and browser verification.
10. Conduct scientific validation separately from software/runtime verification.

## Deployment architecture

- Public frontend: `https://darenprince.com/voxvector/`
- Original API: `https://voxvector.crownlabs.tech`
- AWS API environment: `https://awsapi.crownlabs.tech`
- Supabase: authentication, persistence, diagnostics, private media

The original API domain remains preserved. AWS is a separately addressed environment until an explicit cutover is verified.

## Integrity and scientific boundary

A live healthy API demonstrates software/runtime health. Provider readiness demonstrates configuration and dependency readiness. Successful provider execution will demonstrate execution only. None of these states establish deception-detection validity.

No individual acoustic, vocal, linguistic, behavioral, emotional, or psychological feature is treated as proof of deception.
