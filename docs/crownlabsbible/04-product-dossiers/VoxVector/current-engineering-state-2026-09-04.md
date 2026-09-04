# VoxVector Current Engineering State — 2026-09-04

This Crown Labs product/engineering mirror reflects `VoxVector/docs/CURRENT_ENGINEERING_STATE_2026-09-04.md`.

## Runtime snapshot

- Backend pipeline: `0.2.26`
- Live Render source revision: `23677b258a60e5cf25287cc0dce3b199f472a7c1`
- Runtime self-test: passed
- Diagnostic/media storage: configured and media-ready
- Media storage: enabled
- Maximum sample rate: 48 kHz
- Maximum media size: 250 MiB

## Speech runtime

- faster-whisper transcription: configured and execution-ready
- pyannote Community-1 diarization: configured and execution-ready
- Hugging Face token presence: detected by runtime
- Real provider execution: next verification gate

## 21-stage pipeline

The canonical contract remains 21 stages with 14 implemented foundations, 4 conditional/not-invoked stages, and 3 queued stages.

Provider readiness does not promote queued stages. Stage promotion requires real provider-backed execution, persisted artifacts, integration behavior, and QA evidence.

## Current implementation sequence

1. Exact-commit software QA.
2. Controlled transcription execution.
3. Controlled speaker diarization execution.
4. Persist transcript and speaker artifacts.
5. Produce synchronized multimodal alignment.
6. Expand evidence consumers.
7. Complete Review Evidence, assessment, reporting, history/reopen.
8. Complete browser/mobile verification.
9. Conduct scientific validation separately.

## Deployment boundary

`https://darenprince.com/voxvector/` is the public application.

`https://voxvector.crownlabs.tech` is the original API and remains preserved.

`https://awsapi.crownlabs.tech` is the separate AWS API environment.

Supabase remains the configured authentication, persistence, diagnostics, and private-media boundary.

## Developer Console

The console is the engineering cockpit and now surfaces runtime health, 21-stage status, deployment state, Render/AWS environment status, structured audits, deployment-variable guidance, and copy/download controls for engineering evidence.

## Scientific boundary

Operational readiness, provider execution, software QA, and scientific validation remain distinct. No individual vocal/acoustic/linguistic/behavioral feature is treated as proof of deception.
