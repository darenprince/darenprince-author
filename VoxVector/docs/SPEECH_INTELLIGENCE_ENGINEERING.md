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
              +-- Confidence
              +-- Speaker association
    |
    +-- Audio / Transcript Alignment
              |
              v
       Multimodal Evidence Timeline
              |
              v
       Downstream Analysis Engines
```

## Implemented foundation

- `voxvector.evidence_acquisition`
  - `MediaProfile`
  - `SpeechTimeline`
  - provider-neutral transcript contracts
  - diarization contracts
  - explicit provider state
- `voxvector.transcription_faster_whisper`
  - local faster-whisper adapter
  - word-level timestamps
  - segment timestamps
  - language metadata
  - normalized model confidence when available
  - lazy model loading
- `voxvector.diarization_pyannote`
  - local pyannote Community-1 adapter
  - speaker segments and cluster labels
  - explicit token requirement
- `voxvector.alignment`
  - timestamp overlap alignment of transcript words to diarization speaker turns
  - explicit unattributed-word state when overlap is unavailable
- `voxvector.speech_providers`
  - environment-driven provider selection
- optional speech runtime dependencies in `api/requirements-speech.txt` and `[project.optional-dependencies].speech`

faster-whisper supports word-level timestamps and integrated VAD filtering. The implementation uses an in-memory WAV representation and lazy model loading. citeturn162455search1turn162455search3

pyannote Community-1 provides speaker diarization, supports offline/local execution, and currently requires acceptance of the model conditions plus a Hugging Face access token for model access. Its model card lists CC-BY-4.0 for the pipeline. citeturn308595search0turn308595search13

## Runtime activation

The base VoxVector runtime remains lightweight and does not install the speech ML stack by default.

To activate transcription:

`VOXVECTOR_TRANSCRIPTION_PROVIDER=faster_whisper`

Supported tuning variables include:

- `VOXVECTOR_WHISPER_MODEL`
- `VOXVECTOR_WHISPER_DEVICE`
- `VOXVECTOR_WHISPER_COMPUTE_TYPE`
- `VOXVECTOR_WHISPER_LANGUAGE`
- `VOXVECTOR_WHISPER_BEAM_SIZE`

To activate diarization:

`VOXVECTOR_DIARIZATION_PROVIDER=pyannote`

The provider requires `HF_TOKEN` or `HUGGINGFACE_TOKEN` and the configured model access conditions.

## Engineering states

| Capability | State |
|---|---|
| Media profile | implemented foundation |
| Speech / silence timeline | implemented foundation |
| Transcription contract | implemented |
| faster-whisper adapter | implemented, provider-gated |
| Diarization contract | implemented |
| pyannote adapter | implemented, provider-gated |
| Word timestamps | implemented through transcription adapter |
| Speaker attribution | implemented when both providers return compatible timestamps |
| Transcript/audio alignment | implemented foundation |
| Production model deployment | not yet verified |
| VoxVector target-condition evaluation | not yet validated |

## Integrity boundaries

A provider output is evidence produced by that provider. VoxVector does not treat provider confidence as deception confidence.

Speaker cluster labels are not verified real-world identities.

Transcript confidence is not truth confidence.

Speech or language features remain evidence inputs and do not independently establish deception.

## Next build gates

1. Run provider adapters in an isolated speech-enabled environment.
2. Verify model acquisition and CPU execution using a controlled WAV fixture.
3. Verify pyannote model access and diarization output when Hugging Face access is configured.
4. Persist normalized transcript, speaker, and alignment artifacts under the existing case/run identity.
5. Connect transcript-derived observations to the existing linguistic/disfluency modules.
6. Add speaker-aware acoustic aggregation and within-speaker baseline inputs.
7. Add question/answer boundary ingestion and interaction analysis.
8. Exercise the full case → acquisition → transcription → diarization → alignment → evidence path before production promotion.
9. Only after engineering stability, begin target-condition scientific evaluation.

## Dependency and license review

faster-whisper is maintained as an open-source inference library and documents the expected local installation/inference workflow. citeturn162455search1turn162455search2

pyannote.audio is MIT-licensed, while the current Community-1 model pipeline is distributed under CC-BY-4.0 and has gated model access conditions. These should remain recorded separately in dependency/provenance records. citeturn308595search11turn308595search0

## Current conclusion

The extraction architecture is now materially present. The remaining work is no longer a placeholder contract exercise: it is provider execution, artifact persistence, alignment integration, and target-condition testing. The system must not represent these as production capabilities until those gates are exercised successfully.
