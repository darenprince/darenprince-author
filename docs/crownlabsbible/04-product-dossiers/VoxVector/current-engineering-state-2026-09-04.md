# VoxVector Current Engineering State — 2026-09-04

This Crown Labs product/engineering mirror reflects `VoxVector/docs/CURRENT_ENGINEERING_STATE_2026-09-04.md`.

## Runtime snapshot

- Backend pipeline: `0.2.26`
- Live Render source revision before latest repair activation: `f005c68c872434e810947b934742895c4d8324d2`
- Latest canonical backend repair awaiting Render activation: `b6f43f0ec33513be9c4e1cb9542eaf3426045245`
- Runtime self-test on the observed live revision: passed
- Diagnostic/media storage: configured and media-ready
- Media storage: enabled
- Maximum sample rate: 48 kHz
- Maximum media size: 250 MiB

## Speech runtime

- faster-whisper transcription: configured and execution-ready
- pyannote Community-1 diarization: configured and execution-ready
- Hugging Face token presence: detected by runtime
- Real provider execution: next verification gate
- Provider execution is no longer implicitly invoked by generic evidence acquisition, preventing a configured heavy speech stack from silently running on every case analysis request.

## Render memory hardening

The constrained Render runtime uses a 512 MiB reference budget with a 96 MiB protected headroom reserve. Canonical runtime hardening includes heavyweight phase serialization, RSS telemetry, provider cleanup, bounded speech-frame processing, float32 normalized audio, and conservative CPU/thread settings.

Configured Render safeguards include `OMP_NUM_THREADS=1`, `MKL_NUM_THREADS=1`, `OPENBLAS_NUM_THREADS=1`, `MALLOC_ARENA_MAX=2`, and `TOKENIZERS_PARALLELISM=false`.

## 21-stage pipeline

The canonical contract remains 21 stages with 14 implemented foundations, 4 conditional/not-invoked stages, and 3 queued stages.

Provider readiness does not promote queued stages. Stage promotion requires real provider-backed execution, persisted artifacts, integration behavior, and QA evidence.

## Current implementation sequence

1. Exact-commit software QA.
2. Confirm the latest Render deployment revision and health contract.
3. Controlled transcription execution.
4. Controlled speaker diarization execution.
5. Persist transcript and speaker artifacts.
6. Produce synchronized multimodal alignment.
7. Expand evidence consumers.
8. Complete Review Evidence, assessment, reporting, history/reopen.
9. Complete browser/mobile verification.
10. Conduct scientific validation separately.

## Deployment boundary

`https://darenprince.com/voxvector/` is the public application.

`https://voxvector.crownlabs.tech` is the original API and remains preserved.

`https://awsapi.crownlabs.tech` is the separate AWS API environment and is not part of active QA gating.

Supabase remains the configured authentication, persistence, diagnostics, and private-media boundary.

## Developer Console

The console is the engineering cockpit and surfaces runtime health, 21-stage status, commit-specific QA, Render runtime status and recent logs, speech-provider readiness, structured audits, deployment-variable guidance, and copy/download controls for engineering evidence. AWS is not an active QA gate.

## Scientific boundary

Operational readiness, provider execution, software QA, and scientific validation remain distinct. No individual vocal/acoustic/linguistic/behavioral feature is treated as proof of deception.
