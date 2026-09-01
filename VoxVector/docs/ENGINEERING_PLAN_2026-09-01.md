# VoxVector Engineering Plan — 2026-09-01

## Current objective

Turn the repaired production case workflow into a real, evidence-producing speech intelligence system with auditable runtime behavior.

## Phase 1 — Operational foundation

Status: operationally demonstrated.

- case identity and ownership
- private media persistence
- WAV intake
- case-bound analysis execution
- canonical results envelope
- durable diagnostics
- Render/GitHub observability bridge

## Phase 2 — Evidence acquisition

Status: active build.

- media profile: implemented
- speech/silence timeline: implemented foundation
- transcription provider contract: implemented
- faster-whisper adapter: implemented, provider-gated
- diarization provider contract: implemented
- pyannote Community-1 adapter: implemented, provider-gated
- transcript/speaker alignment: implemented foundation
- multimodal timeline: implemented foundation

Next:

1. controlled faster-whisper deployment execution;
2. controlled pyannote execution;
3. persisted transcript and speaker artifacts;
4. word/segment timestamp normalization;
5. audio/transcript alignment validation;
6. failure and resource profiling.

## Phase 3 — Evidence consumers

- connect transcript data to linguistic/disfluency analysis
- make acoustic aggregation speaker-aware
- add within-speaker baseline acquisition
- add question/answer context
- expand temporal interaction features
- build evidence relationship graph
- expose convergence, conflict, uncertainty, and alternatives

## Phase 4 — Results experience

- complete Analysis Results workspace
- multimodal timeline explorer
- evidence detail and provenance
- stage lifecycle timeline
- report generation
- case history/reopen

## Phase 5 — Scientific validation

Separate from software QA. Requires frozen task definitions, speaker-disjoint evaluation, calibration, robustness, leakage testing, uncertainty analysis, replication, and documented datasets/protocols before inferential claims.

## Observability architecture

Application timing truth:

- UTC wall-clock lifecycle timestamps
- monotonic duration measurements
- request_id
- trace_id
- analysis_run_id
- stage_id
- provider/model metadata

Infrastructure evidence:

- Render logs
- Render deployment state
- Render service metrics
- GitHub Actions QA/deploy workflows

Integration bridge:

`.github/workflows/render-observability.yml`

Secret:

`RENDER_API_KEY` GitHub repository secret.

The Render key is never exposed to VoxVector application runtime and is never stored in Git.

## Current known gates

- exact current commit QA
- speech-enabled runtime deployment
- real short-WAV transcription
- real Community-1 diarization
- memory/CPU measurement
- persisted artifact readback
- Developer Console live diagnostics verification
- authenticated browser/mobile verification
- full internal 21-stage callback telemetry

## Engineering rule

Do not add downstream inference merely to fill UI space. Every downstream method must consume real acquired evidence, declare provenance and limitations, and remain separate from scientific validation claims.
