# VoxVector 21 Stage Pipeline — Build Status

**Status date:** 2026-09-04

This document is an engineering status record, not a claim that every pipeline stage is currently integrated or scientifically validated.

## Current build matrix

| # | Stage | Current build state | Runtime state | QA state |
|---:|---|---|---|---|
| 01 | File Upload / Ingest | **implemented** | persisted case source intake | production executed on observed case path |
| 02 | File Decode and Normalization | **implemented** | PCM WAV decode and mono normalization; persisted run boundary | covered by API/runtime tests; production executed |
| 03 | Provenance and Integrity | **implemented** | SHA-256 source verification; persisted run boundary | covered by case-store tests; production executed |
| 04 | Channel and Recording Assessment | **implemented** | sample rate, duration, peak, clipping profile; persisted run boundary | runtime exercised by pipeline |
| 05 | Speaker Identification / Diarization | **queued** | pyannote adapter configured and execution-ready on live Render runtime; real controlled execution next | contract tests; provider-backed execution required |
| 06 | Speech Segmentation | **implemented foundation** | deterministic energy/voicing segmentation | deterministic tests; production executed |
| 07 | Transcription Generation | **built integration path** | canonical case analysis invokes faster-whisper when runtime-ready and persists normalized transcript artifacts; controlled execution verification next | contract tests; controlled provider-backed execution required |
| 08 | Transcript Alignment | **built synchronized foundation** | persisted transcript words/segments drive shared waveform and audio playhead; speaker attribution awaits diarization artifact | regression tests; controlled provider-backed verification required |
| 09 | Eligibility and Reliability | **implemented** | recording eligibility/reliability result | covered by pipeline tests; production executed |
| 10 | Acoustic Feature Extraction | **implemented** | RMS, intensity, ZCR, centroid, spread, F0, harmonicity, MFCC and related observations | covered by acoustic/pipeline tests; production executed |
| 11 | Prosodic and Voice Quality Analysis | **implemented foundation** | F0/intensity dynamics and HNR | feature tests; scientific validation separate |
| 12 | Temporal and Pause Analysis | **implemented foundation** | pause topology and timing observations | feature tests; scientific validation separate |
| 13 | Linguistic and Disfluency Analysis | **conditional** | requires transcript artifact | unit tests; acquired-transcript integration next |
| 14 | Question / Answer Alignment | **conditional** | requires question/context boundaries | timing tests; product integration next |
| 15 | Within Speaker Baseline | **conditional** | requires independent baseline input | baseline unit tests |
| 16 | Cross Method Evidence Assembly | **implemented foundation** | normalized evidence records from observations | evidence tests; production execution present |
| 17 | Evidence Convergence and Conflict | **implemented foundation** | evidence relationships and conflict/convergence structures | convergence tests; persisted result structure |
| 18 | Candidate Classification | **implemented guarded foundation** | candidate remains guarded/indeterminate in current observational path | classification tests |
| 19 | Validation and Calibration Gate | **not invoked** | inferential validation gate is not executed by current run | validation program required |
| 20 | Final Classification / Disposition | **implemented guarded foundation** | guarded final disposition architecture | disposition tests |
| 21 | Audit and Provenance Output | **implemented foundation** | run, stage, method, source and provenance records persisted | case-store/provenance coverage |

## Current maturity count

- **16 stages have implemented analytical/runtime foundations**
- **4 stages are conditional or intentionally not invoked without required inputs**
- **speaker execution remains queued for deeper integration; transcription/alignment now have built integration paths pending controlled runtime verification**
- **faster-whisper is configured and execution-ready on the live Render runtime**
- **pyannote Community-1 is configured and execution-ready on the live Render runtime**
- **21 stages remain represented in the canonical contract**

The maturity count does not mean sixteen validated deception indicators. Individual measurements remain evidence only, and inferential capability requires a separate validation program.

## Live API runtime evidence — 2026-09-04

Observed live Render `/health` state:

- pipeline `0.2.26`
- source revision `23677b258a60e5cf25287cc0dce3b199f472a7c1`
- runtime self-test `passed`
- diagnostic/media storage `configured_media_ready`
- media storage `true`
- maximum sample rate `48,000 Hz`
- maximum media size `262,144,000 bytes`
- transcription provider `faster_whisper`; adapter installed; execution-ready
- diarization provider `pyannote`; adapter installed; Hugging Face token detected; execution-ready
- diarization model `pyannote/speaker-diarization-community-1`
- current commit QA field `external_workflow_required`
- Hugging Face model repository `pyannote/speaker-diarization-community-1` is gated; configured token detection does not by itself prove provider download/access or successful diarization execution

The `current_commit_qa` value is not treated as a current green QA claim until the exact source revision has a verified GitHub Actions result.

## Speech execution sequence

1. Run a short controlled WAV through faster-whisper.
2. Capture timestamped transcript segments and word timestamps.
3. Run the same fixture through pyannote Community-1.
4. Capture speaker turns and speaker labels.
5. Persist both artifacts under case/run identity.
6. Produce and persist the multimodal alignment artifact.
7. Capture provider timing and memory telemetry.
8. Repeat sequential provider execution to inspect retained memory behavior.
9. Promote stage status only from actual provider-backed execution evidence.

## Evidence acquisition pipeline

The canonical acquisition layer provides a normalized media profile, speech/silence timeline, provider-neutral transcript and diarization contracts, provider selection, transcript-to-speaker alignment, and multimodal timeline output.

Supported providers:

- transcription: faster-whisper
- speaker diarization: pyannote Community-1
- alignment: VoxVector-owned timestamp overlap layer

## Stage telemetry foundation

`VoxVector/src/voxvector/stage_telemetry.py` is the persistence-neutral lifecycle recorder for the canonical 21-stage contract. It records real monotonic elapsed duration, UTC start/completion timestamps, explicit running/completed/failed/not-run/pending states, outcomes, and errors.

Route-boundary timing is real for decoded route stages. Composite pipeline stages without actual callbacks retain null independent durations rather than fabricated values.

## Case-run lifecycle

The case-analysis API persists a running record before the main processing call and later persists the final result, acquisition artifact, result envelope, and explicit pending/not-run states. Failure handling attempts to preserve a sanitized failed run.

## Render runtime bridge

The Developer Console exposes real server-side Render status and recent logs through authenticated developer routes. GitHub Actions separately consumes protected repository Render credentials for infrastructure observability.

## Current engineering stage

**Controlled speech-provider execution, persisted transcript artifact readback, and speaker-aware evidence integration.**

The dependency order is:

**media extraction → speech segmentation → speaker diarization → transcription → timestamp normalization → transcript/audio alignment → multimodal evidence → downstream analysis.**

## Verification boundary

Software execution, provider readiness, deployment health, and scientific validation are different states.

A successful transcription output does not establish transcript truthfulness.

Speaker cluster labels do not establish verified real-world identity.

A completed analysis run does not prove any individual vocal feature proves deception.

## Current next steps

1. Exact-commit GitHub QA for the current deployed revision.
2. Controlled faster-whisper execution and persisted transcript artifact readback.
3. Controlled pyannote Community-1 execution.
4. Persist transcript, speaker, and alignment artifacts; the canonical run contract and synchronized frontend projection are built.
5. Feed transcript into linguistic/disfluency analysis.
6. Add speaker-aware acoustic aggregation and independent baseline inputs.
7. Add question/context boundaries and interaction timing.
8. Instrument real internal method boundaries where callbacks exist.
9. Complete Review Evidence, report, and case history/reopen surfaces.
10. Complete authenticated browser/mobile verification.
11. Advance the separate scientific validation program.


## Provider architecture update — 2026-09-04

Stage 05 now has two implemented provider adapters behind the same canonical diarization contract:

- **pyannoteAI cloud:** asynchronous job API using a protected deployment key, temporary media upload, job polling, and normalized speaker turns.
- **local pyannote Community-1:** Hugging Face-gated local model path retained as an explicit fallback.

The configured primary/fallback policy is operational engineering, not a stage promotion. Controlled provider-backed execution remains required before Stage 05 is promoted from its current maturity state. Provider provenance records whether a fallback occurred and why.


## Live analysis timeout and failure visibility — 2026-09-05

The canonical case analysis route now persists the live stage boundary before entering long-running work. The composite analysis boundary and provider-backed evidence acquisition have configurable server-side deadlines: `VOXVECTOR_PIPELINE_TIMEOUT_SECONDS` (default 120 seconds) and `VOXVECTOR_EVIDENCE_ACQUISITION_TIMEOUT_SECONDS` (default 180 seconds). On timeout, VoxVector records the failed stage, request ID, timeout context, persisted run state, and a diagnostic event, then returns HTTP 504 instead of leaving the client indefinitely waiting. The frontend error formatter surfaces the message, failed stage, error type when available, and request ID. These controls improve operational observability; they do not imply cancellation of already-running background worker threads or scientific validation of any analysis output.


## Continue-after-failure pipeline policy — 2026-09-05

A failed or timed-out task is recorded on its own pipeline stage with its sanitized error and outcome, but the orchestration continues into later stages that do not depend on that failed output. Dependent stages are marked `not_run` with an explicit dependency reason rather than being falsely reported as successful. Runs containing one or more stage failures finish as `completed_with_failures` when independent work and persistence can still complete. This preserves partial artifacts, stage visibility, diagnostics, and auditability without silently treating failure as success.


## Case workspace live execution diagnostics — 2026-09-05

The canonical Case Analysis Workspace now includes a request-scoped **Live execution log**. It reads the existing durable VoxVector diagnostics stream through the authenticated diagnostics API and filters events by the current analysis run's request ID. While a run is active, the panel refreshes every 2.5 seconds and can also be refreshed manually. Stage starts, failures, timeouts, diagnostic details, error types, durations, HTTP status, and source revision context are visible directly beside the case pipeline. This is an operational observability surface; it does not alter analytical results or validation status.
