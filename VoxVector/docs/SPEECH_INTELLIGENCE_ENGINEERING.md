# VoxVector Speech Intelligence Engineering

**State date:** 2026-09-01

## Purpose

This document defines the active engineering path for acquiring the speech, speaker, transcript, and alignment data required by downstream VoxVector analysis. It is an implementation roadmap and provenance record, not a scientific validation report.

## Architecture

VoxVector owns the canonical evidence contracts and orchestration. External open-source models are replaceable providers behind those contracts.

```text
Source Audio
    |
    +-- Media Profile
    +-- Speech / Silence Timeline
    +-- Speaker Diarization
    +-- Transcription
              |
              +-- Segment timestamps
              +-- Word timestamps
              +-- Language
              +-- Confidence where provider actually supplies it
              +-- Speaker association after alignment
    |
    +-- Audio / Transcript / Speaker Alignment
              |
              v
       Multimodal Evidence Timeline
              |
              v
       Downstream Analysis Engines
```

## Implemented foundation

- `voxvector.evidence_acquisition`
  - media profile
  - speech/silence timeline
  - normalized transcript and diarization contracts
  - provider state and explicit degradation
  - multimodal timeline output when transcript data exists
- `voxvector.transcription_faster_whisper`
  - local faster-whisper adapter
  - word-level timestamps
  - segment timestamps
  - language metadata
  - provider word probability when supplied
  - lazy model loading
- `voxvector.diarization_pyannote`
  - local pyannote Community-1 adapter
  - speaker segments and cluster labels
  - exclusive diarization preferred when returned by the provider
  - explicit token requirement
- `voxvector.alignment`
  - timestamp overlap alignment of transcript words to diarization speaker turns
  - speaker overlap fraction
  - explicit unattributed-word behavior
- `voxvector.speech_providers`
  - environment-driven provider selection
- optional speech runtime dependencies in `VoxVector/api/requirements-speech.txt` and the `speech` project extra

The current faster-whisper implementation follows the provider API for word-level timestamps and VAD filtering. faster-whisper itself is MIT licensed. citeturn238956search9turn345379search0

The current pyannote Community-1 model is gated: access requires accepting the model conditions and creating a Hugging Face access token. The model is released under CC-BY-4.0. Community-1 also exposes exclusive speaker diarization for easier reconciliation with transcript timestamps. citeturn345379search2turn345379search3turn238956search0

## Runtime activation

The base VoxVector runtime remains lightweight and does not install the speech ML stack by default.

Supported transcription configuration:

`VOXVECTOR_TRANSCRIPTION_PROVIDER=faster_whisper`

`VOXVECTOR_WHISPER_MODEL=small`

`VOXVECTOR_WHISPER_DEVICE=cpu`

`VOXVECTOR_WHISPER_COMPUTE_TYPE=int8`

Optional tuning variables include language and beam size.

Supported diarization configuration:

`VOXVECTOR_DIARIZATION_PROVIDER=pyannote`

`VOXVECTOR_DIARIZATION_MODEL=pyannote/speaker-diarization-community-1`

The pyannote adapter reads `HF_TOKEN` or `HUGGINGFACE_TOKEN` from the server environment. The user has reported that the Hugging Face token and required model access conditions are now configured in Render; the repository cannot independently inspect or verify the secret value.

## Safety and degradation behavior

Configured providers are optional runtime capabilities. If the provider package, model, credentials, or runtime resources are unavailable, the acquisition layer records the provider state as `unavailable` and adds a limitation instead of taking down the base case-analysis path.

This is a software resilience behavior. It must not be confused with successful provider execution.

The faster-whisper adapter deliberately does not convert `avg_logprob` into a probability-like confidence value. Segment confidence remains null unless the provider exposes an actual probability field. This avoids presenting a likelihood diagnostic as calibrated confidence.

## Engineering states

| Capability | State |
|---|---|
| Media profile | implemented foundation |
| Speech / silence timeline | implemented foundation |
| Transcription contract | implemented |
| faster-whisper adapter | implemented, provider-gated |
| Diarization contract | implemented |
| pyannote Community-1 adapter | implemented, provider-gated |
| Word timestamps | implemented through transcription adapter |
| Speaker attribution | implemented when both providers return compatible timestamps |
| Transcript/audio/speaker alignment | implemented foundation |
| Production model dependency set | packaged as optional speech runtime |
| Render model execution | configured by user; runtime execution not independently verified in repository QA |
| VoxVector target-condition evaluation | not validated |

## Current verification

Regression coverage now includes provider selection, explicit unavailable states, audio serialization, pyannote token gating, acquisition degradation behavior, transcript/speaker alignment, and provider contracts. Full model execution still requires a speech-enabled runtime with the model dependencies installed and accessible.

## Next build gates

1. Activate the optional speech runtime in the target deployment without changing the already-working base deployment semantics.
2. Execute a controlled short WAV through faster-whisper and record model acquisition, runtime duration, transcript segment count, word timestamp coverage, and resource behavior.
3. Execute the same controlled fixture through pyannote Community-1 with the configured Hugging Face access and record speaker-turn output and resource behavior.
4. Persist normalized transcript, speaker, and multimodal alignment artifacts under the existing case/run identity.
5. Connect transcript-derived observations to the existing linguistic/disfluency modules.
6. Add speaker-aware acoustic aggregation and within-speaker baseline inputs.
7. Add question/answer boundary ingestion and interaction analysis.
8. Exercise the full case → acquisition → transcription → diarization → alignment → evidence path before production promotion.
9. Only after engineering stability, begin target-condition scientific evaluation.

## Dependency and license review

faster-whisper is MIT licensed. citeturn345379search0

pyannote.audio is MIT licensed, while the Community-1 model pipeline is CC-BY-4.0 and gated by Hugging Face access conditions. Model and library licenses remain separate provenance records. citeturn345379search2turn238956search0

## Current conclusion

The speech intelligence architecture is now a real provider-backed implementation path. The next milestone is controlled model execution and artifact persistence, not additional placeholder contracts. No production transcription or diarization capability is claimed until those runtime gates succeed.


## pyannoteAI cloud adapter — 2026-09-04

Implemented a second diarization adapter, `voxvector.diarization_pyannote_api`, using the pyannoteAI asynchronous API contract. The adapter authenticates server-side, uploads normalized WAV media to temporary provider storage, submits diarization, polls the job, prefers exclusive diarization when returned, and normalizes speaker turns into `DiarizationResult`.

The cloud adapter and local Community-1 adapter are alternatives, not cumulative scoring engines. The provider selector supports `pyannote_api` as primary and `pyannote_local` as an explicit fallback. Fallback provenance records the primary provider, fallback provider, and primary failure class.

No cloud API execution is claimed by this implementation update alone. Runtime execution remains a separate verification gate.
