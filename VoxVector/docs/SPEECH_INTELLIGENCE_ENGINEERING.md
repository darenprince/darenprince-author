# VoxVector Speech Intelligence Engineering

**State date:** 2026-09-08

## Purpose

This document defines the active engineering path for acquiring the speech, speaker, transcript, and alignment data required by downstream VoxVector analysis. It is an implementation roadmap and provenance record, not a scientific validation report.

## Architecture

VoxVector owns the canonical evidence contracts and orchestration. External models and provider APIs are replaceable providers behind those contracts.

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
- `voxvector.diarization_pyannote_api`
  - pyannoteAI cloud adapter
  - server-side API authentication
  - asynchronous media/job lifecycle
  - normalized speaker turns and provider provenance
- `voxvector.diarization_pyannote`
  - local pyannote Community-1 adapter retained as an optional fallback
  - speaker segments and cluster labels
  - exclusive diarization preferred when returned by the provider
  - explicit token requirement
- `voxvector.alignment`
  - timestamp overlap alignment of transcript words to diarization speaker turns
  - speaker overlap fraction
  - explicit unattributed-word behavior
- `voxvector.speech_providers`
  - environment-driven primary/fallback provider selection
  - explicit fallback provenance
- optional speech runtime dependencies in `VoxVector/api/requirements-speech.txt` and the `speech` project extra

The current faster-whisper implementation follows the provider API for word-level timestamps and VAD filtering. The current local Community-1 model path remains gated by Hugging Face access and is not the primary Render diarization path.

## Runtime activation

Supported transcription configuration:

`VOXVECTOR_TRANSCRIPTION_PROVIDER=faster_whisper`

`VOXVECTOR_WHISPER_MODEL=base`

`VOXVECTOR_WHISPER_DEVICE=cpu`

`VOXVECTOR_WHISPER_COMPUTE_TYPE=int8`

`VOXVECTOR_WHISPER_BEAM_SIZE=3`

Current primary diarization configuration:

`VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api`

`PYANNOTE_KEY=<protected pyannoteAI API key>`

Accepted cloud-key alias:

`PYANNOTE_API_KEY=<protected pyannoteAI API key>`

Case-analysis invocation gate:

`VOXVECTOR_ENABLE_DIARIZATION_RUNS=true`

Optional explicit local fallback:

`VOXVECTOR_DIARIZATION_FALLBACK=pyannote_local`

`VOXVECTOR_DIARIZATION_FALLBACK_ENABLED=true`

`HF_TOKEN=<protected Hugging Face token>`

The local adapter also accepts `HUGGINGFACE_TOKEN`. Historical local-primary configuration using `VOXVECTOR_DIARIZATION_PROVIDER=pyannote` is superseded and must not be used as current production setup guidance.

## Safety and degradation behavior

Configured providers are optional runtime capabilities. If the provider package, API, model, credentials, route gate, or runtime resources are unavailable, the acquisition layer records provider or stage state explicitly instead of converting configuration into a false execution claim.

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
| pyannoteAI cloud adapter | implemented; current primary configuration |
| local pyannote Community-1 adapter | implemented optional fallback; disabled/not ready at latest observed runtime |
| Word timestamps | implemented through transcription adapter |
| Speaker attribution | implemented when transcript and diarization providers return compatible timestamps |
| Transcript/audio/speaker alignment | implemented foundation |
| Production speech dependency set | packaged for the speech runtime |
| Render provider readiness | faster-whisper and cloud-primary diarization readiness observed separately from actual case execution |
| VoxVector target-condition evaluation | not validated |

## Current verification

Regression coverage includes provider selection, cloud/local provider contracts, explicit unavailable states, audio serialization, token/key gating, acquisition degradation behavior, transcript/speaker alignment, and fallback orchestration. Full provider execution still requires a configured target runtime and a controlled case run.

For debugging, keep these states separate:

1. provider selected in environment
2. credential-presence/readiness reported by `/health`
3. `VOXVECTOR_ENABLE_DIARIZATION_RUNS` route gate
4. actual provider invocation recorded in case/run diagnostics
5. persisted transcript/diarization artifacts
6. alignment readback
7. downstream evidence use

## Next build gates

1. Verify the intended deployed source revision and exact-commit QA evidence.
2. Execute a controlled short WAV through faster-whisper and record runtime duration, transcript segment count, word timestamp coverage, provenance, and persistence.
3. Confirm `VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api` and `VOXVECTOR_ENABLE_DIARIZATION_RUNS=true` in the target runtime without exposing credential values.
4. Execute the same controlled fixture through the pyannoteAI cloud primary and record speaker-turn output, provider provenance, job/result behavior, runtime duration, and persisted artifact readback.
5. Exercise local Community-1 only as a separate fallback test when `VOXVECTOR_DIARIZATION_FALLBACK=pyannote_local` and `VOXVECTOR_DIARIZATION_FALLBACK_ENABLED=true` are explicitly enabled; do not treat fallback success as primary-path verification.
6. Persist normalized transcript, speaker, and multimodal alignment artifacts under the existing case/run identity.
7. Connect transcript-derived observations to the existing linguistic/disfluency modules.
8. Add speaker-aware acoustic aggregation and within-speaker baseline inputs.
9. Add question/answer boundary ingestion and interaction analysis.
10. Exercise the full case → acquisition → transcription → cloud diarization → alignment → evidence path before production promotion.
11. Only after engineering stability, begin target-condition scientific evaluation.

## Dependency and license review

Provider and model/library license terms remain separate provenance records. The local Community-1 fallback has its own model-access/license requirements; those requirements do not define the cloud primary runtime path.

## Current conclusion

The speech intelligence architecture is a real provider-backed implementation path with faster-whisper transcription, pyannoteAI cloud-primary diarization, and explicit local fallback support. The next milestone is controlled provider execution and artifact persistence, not additional placeholder contracts. No production transcription or diarization capability is claimed until those runtime gates succeed.

## pyannoteAI cloud adapter — 2026-09-04

Implemented `voxvector.diarization_pyannote_api` using the pyannoteAI asynchronous API contract. The adapter authenticates server-side, uploads normalized WAV media to temporary provider storage, submits diarization, polls the job, prefers exclusive diarization when returned, and normalizes speaker turns into `DiarizationResult`.

The cloud adapter and local Community-1 adapter are alternatives, not cumulative scoring engines. The provider selector supports `pyannote_api` as primary and `pyannote_local` as an explicit fallback. Fallback provenance records the primary provider, fallback provider, and primary failure class.

No cloud API execution is claimed by implementation or readiness alone. Runtime execution remains a separate verification gate.
