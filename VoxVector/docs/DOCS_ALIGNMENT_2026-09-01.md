# VoxVector Documentation Alignment — 2026-09-01

## Purpose

Record the current cross-document synchronization for the production analysis milestone, Developer Console status, Analysis Results, stage telemetry, evidence acquisition, speech intelligence, and current QA boundaries.

## Current repository state

The active engineering branch is `main`.

The active architecture remains:

`GitHub Pages React frontend → FastAPI on Render → canonical VoxVector engine → Supabase persistence/diagnostics/private media`

Historical systems and deployment notes remain historical unless explicitly reactivated by decision.

## Production evidence retained

The configured production path has demonstrated:

`case workflow → source upload → private media persistence → case-bound analysis → analysis completion`

Observed requests included `/health`, `/v1/cases`, and `/v1/cases/{case_id}` with successful responses, and the Render runtime emitted `VOXVECTOR_DIAGNOSTIC` records.

These findings establish operational execution only.

## Current analysis architecture

The active engineering sequence is now evidence-first:

`media profile → speech/silence timeline → speaker diarization → transcription → timestamp normalization → transcript/audio alignment → multimodal evidence → downstream analysis → guarded classification/disposition`

The original acoustic/prosodic/temporal pipeline remains active and is now one consumer of the broader evidence acquisition layer.

## Current implementation changes

### Results envelope

The canonical case-analysis API persists and returns the composed result envelope under the existing case/run identity.

### Route telemetry

Real independent timing is recorded for route-boundary stages 02–04. Internal composite pipeline stages continue to avoid fabricated per-stage timings.

### Evidence acquisition

`voxvector.evidence_acquisition` now produces:

- normalized media profile
- speech/silence timeline
- provider-neutral transcript artifact
- provider-neutral diarization artifact
- explicit provider states
- multimodal timeline when timestamped transcript data are available

### Speech providers

Provider adapters are implemented for:

- faster-whisper transcription
- pyannote Community-1 diarization

Provider selection is environment-driven and lazy. Heavy ML dependencies remain optional in the base runtime.

faster-whisper documents word-level timestamps and VAD filtering support. citeturn162455search1turn162455search3

pyannote Community-1 currently requires model-access acceptance and a Hugging Face token, and its model pipeline is distributed under CC-BY-4.0. citeturn308595search0turn308595search13

### Alignment

The VoxVector-owned alignment layer maps timestamped transcript words to overlapping diarization segments and preserves unattributed words when overlap is unavailable.

## Current 21-stage state

The canonical product pipeline remains 21 stages. The existing documented maturity counts remain unchanged for the core pipeline. Speech-intelligence adapters are an enabling implementation layer and do not automatically promote a 21-stage production status without provider execution evidence.

## QA boundary

The latest verified code gate before the current speech-intelligence source revisions is `VoxVector QA` run `33505986385` on commit `661377afed8b5493b62bd7f13121f53f45895d6a`, which passed.

Newer source revisions require their own exact-commit QA result before being marked green. CI verification is software evidence only and is separate from scientific validation.

## Current engineering priority

1. Exact-commit QA for the speech-intelligence revision.
2. Isolated faster-whisper execution with a controlled WAV fixture.
3. Isolated pyannote Community-1 execution with required model access.
4. Persist normalized transcript, diarization, and alignment artifacts under case/run identity.
5. Feed the acquired transcript into linguistic/disfluency analysis.
6. Add speaker-aware acoustic aggregation and within-speaker baselines.
7. Add question/context boundaries and interaction timing.
8. Instrument real internal method boundaries in the canonical pipeline.
9. Verify full browser/deployed workflow.
10. Begin target-condition scientific evaluation only after engineering evidence is stable.

## Active canonical records

- `VoxVector/docs/VERSION_MAP.md`
- `VoxVector/docs/QA_STATUS.md`
- `VoxVector/docs/CURRENT_ENGINEERING_STATE_2026-08-30.md`
- `VoxVector/docs/PIPELINE_BUILD_STATUS.md`
- `VoxVector/docs/MVP_BUILD_PLAN.md`
- `VoxVector/docs/ROADMAP.md`
- `VoxVector/docs/CAPABILITY_STATUS.md`
- `VoxVector/docs/SPEECH_INTELLIGENCE_ENGINEERING.md`
- `VoxVector/docs/DOCS_ALIGNMENT_2026-09-01.md`
- `docs/crownlabsbible/04-product-dossiers/VoxVector/current-engineering-state-2026-08-30.md`
- `docs/crownlabsbible/04-product-dossiers/VoxVector/pipeline-build-status.md`

## Version truth

Backend/runtime: `0.2.26`.

Frontend: `0.2.36`.

Engine/result schema: `0.3`.

Package metadata is synchronized to backend/runtime `0.2.26`.
