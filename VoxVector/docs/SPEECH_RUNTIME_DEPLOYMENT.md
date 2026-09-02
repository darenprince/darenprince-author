# VoxVector Speech Runtime Deployment

**State date:** 2026-09-02

## Purpose

Deploy the optional open-source speech intelligence runtime without weakening the lightweight base API deployment or exhausting the constrained Render memory budget.

## Runtime components

- faster-whisper for transcription
- pyannote Community-1 for speaker diarization
- VoxVector alignment and evidence acquisition contracts

## Current Render activation

The repository contains a separate `api/requirements-speech.txt` so the current lightweight Render service is not forced to install heavy speech ML dependencies during ordinary API builds.

To activate speech processing on the target Render service, the Build Command must install both sets of dependencies from the `VoxVector/` root:

`pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`

Keep the existing Start Command:

`uvicorn api.app:app --host 0.0.0.0 --port $PORT`

## Required Render environment configuration

Transcription:

`VOXVECTOR_TRANSCRIPTION_PROVIDER=faster_whisper`

`VOXVECTOR_WHISPER_MODEL=base`

`VOXVECTOR_WHISPER_DEVICE=cpu`

`VOXVECTOR_WHISPER_COMPUTE_TYPE=int8`

`VOXVECTOR_WHISPER_BEAM_SIZE=3`

The constrained `base` / CPU / int8 / beam 3 profile is now the default in the canonical adapter. The model and beam remain explicitly configurable for larger deployments.

Diarization:

`VOXVECTOR_DIARIZATION_PROVIDER=pyannote`

`VOXVECTOR_DIARIZATION_MODEL=pyannote/speaker-diarization-community-1`

Credential:

`HF_TOKEN` must contain the Hugging Face access token accepted for the gated Community-1 model. The secret is configured in Render and is never stored in GitHub documentation.

Runtime memory reference:

`VOXVECTOR_MEMORY_LIMIT_MB=512`

This is a diagnostic reference only. It does not override Render's platform memory limit.

## Memory-safe execution behavior

The evidence-acquisition speech detector uses bounded frame groups rather than materializing a full-recording frame matrix. Heavy transcription and diarization provider phases are serialized in-process. Provider caches are explicitly released after each attempt, including failed attempts, followed by Python garbage collection and best-effort Linux allocator trimming.

The runtime emits `VOXVECTOR_MEMORY` lines around heavyweight provider phases containing current Linux process RSS when available, phase duration, and the configured memory reference. This provides direct application evidence to correlate with Render infrastructure telemetry.

## Health verification

After deployment, `/health` exposes non-secret speech runtime state including configured providers, adapter installation state, and Hugging Face token-variable presence. Health does not load the heavy models or expose credentials.

## Controlled first execution

First execute a short known WAV fixture. Verify:

1. faster-whisper reaches `completed` and returns timestamped transcript segments/words;
2. pyannote Community-1 reaches `completed` and returns speaker turns;
3. the multimodal alignment artifact is produced;
4. case/run persistence contains acquisition artifacts;
5. provider durations and `VOXVECTOR_MEMORY` boundaries are captured;
6. memory returns toward baseline after provider release/cleanup;
7. repeated sequential provider executions do not show unbounded retained RSS;
8. provider failures degrade to explicit `unavailable` acquisition states.

## Render observability operating procedure

Render logs and Live Tail remain the first-line runtime view. The repository-side GitHub Actions workflow captures service, deployment, log, and incident-window memory evidence through protected repository credentials. The authenticated Developer Console Render Runtime surface reads the separate server-side Render bridge.

Use infrastructure telemetry to correlate:

`provider start → memory rise → provider completion/failure → cache release → cleanup → memory baseline → instance lifecycle`

Application provider duration remains the source of truth for provider execution time; Render timestamps remain infrastructure evidence.

## Scientific boundary

Successful transcription or diarization establishes software execution and provider output. It does not validate VoxVector deception inference. Provider confidence is not deception confidence, and speaker cluster labels are not verified real-world identities.
