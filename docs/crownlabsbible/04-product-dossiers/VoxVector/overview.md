# VoxVector Overview

## Product Classification

**Category:** Crown Labs intelligence vocal analysis and deception detection platform

**Type:** Full stack vocal and audio intelligence system with API access

**Product objective:** Build an advanced auditable vocal and audio deception analysis platform for interview and conversational audio.

**Canonical implementation:** VoxVector/

**Public application:** voxvector/

**Backend target:** voxvector.crownlabs.tech

## Executive Summary

VoxVector is an advanced vocal and audio deception analysis platform designed to transform interview and conversational audio into structured intelligence through a connected multimethod evidence workflow.

The product spans recording ingestion, technical preparation, speaker intelligence, transcription, alignment, acoustic and vocal analysis, linguistic and conversational analysis, evidence synthesis, classification, validation, final disposition, and audit.

VoxVector is being engineered for deception detection as its central product purpose.

## Analytical Depth

One of VoxVector's core product advantages is the breadth of its analytical method library.

The canonical Master Method Index contains **more than 300 individually defined data points and evidence fields** across acoustic, spectral, cepstral, pitch, prosodic, voice-quality, temporal, linguistic, speaker, integrity, evidence, uncertainty, classification, and validation domains.

That number represents the breadth of the analytical vocabulary maintained by the product architecture. It does not mean every analysis run emits every data point. Current runtime output depends on implementation status and the inputs available for a particular recording.

This distinction allows VoxVector to market the depth of its analytical system without misrepresenting planned capabilities as current runtime output.

## Product Architecture

The system is organized around four understandable product stages:

1. **Analysis Readiness** — determine whether the recording and available context are suitable for analysis.
2. **Evidence Analysis** — examine the voice, audio, language, timing, and conversational characteristics supported by the current analysis configuration.
3. **Analytical Assessment** — bring findings together and examine agreement, conflict, uncertainty, and alternative explanations.
4. **Final Result** — communicate what the evidence supports after the required analytical and validation gates.

The complete product pipeline contains 21 technical stages from file intake through audit and provenance output.

## Core Product Experience

The target experience is one persistent case-centered workspace containing:

- source metadata
- audio playback
- synchronized waveform
- speaker regions
- timestamped conversation transcript with shared-playhead synchronization and clickable word/segment seeking
- analytical tracks
- evidence timeline
- evidence explorer
- pipeline state
- assessment
- reports
- history

## Public Landing Visual System

The canonical public landing page uses a restrained black, white, gray, espresso, copper, and warm-amber visual language. The production visual asset library under `voxvector/public/assets/marketing/` provides atmospheric imagery for the product story.

The current landing composition uses:

- the 1920×1080 audio-signal artwork as the hero background, with a controlled bottom fade into the page
- the network background behind the analytical workflow and existing console artwork
- the topographic background in the Technology section
- evidence-analysis editorial artwork in the Analytical Interface section
- evidence-path editorial artwork in the Scientific Discipline section
- science-of-voice editorial artwork in the Use Cases section

These assets are presentation imagery only. They are not live telemetry, analytical measurements, scientific validation, or deception results.

## Complete Analytical Scope

The VoxVector pipeline encompasses:

- file upload and ingestion
- audio decoding and normalization
- provenance and integrity
- recording and channel assessment
- speaker identification and diarization
- speech segmentation
- transcription generation
- transcript alignment
- analysis readiness and reliability
- acoustic analysis
- prosodic and voice-quality analysis
- temporal and pause analysis
- linguistic and disfluency analysis
- question and answer alignment
- within-speaker baselines
- evidence assembly
- evidence convergence and conflict
- candidate classification
- validation and calibration
- final classification and disposition
- audit and provenance output

## API and Developer Platform

VoxVector exposes its canonical backend through a FastAPI service.

The API currently supports:

- runtime health
- direct WAV analysis
- authenticated case creation
- case listing and retrieval
- source upload and provenance
- signed source playback
- case-bound analysis runs
- persisted pipeline stage state
- request correlation and diagnostics

The API is not a separate analysis engine. It is the interface to the canonical VoxVector engine.

### Developer Console analysis workflow

The Developer Console uses the authenticated case workflow as its canonical analysis path:

`create case → upload WAV source → secure playback → run case-bound analysis → Analysis Workspace`

The console can display a persisted source from the selected case even when that source is not held in local component state. The frontend API helpers now resolve the selected case's first persisted source when a local source ID is unavailable for both secure playback and case-bound analysis. Cases without an uploaded source are rejected client-side before invalid playback or analysis requests are sent.

The case upload helper now validates the developer session, selected case, WAV filename, multipart body, progress state, timeout, cancellation, and API error response. The browser continues to manage the multipart boundary automatically.

The underlying endpoints remain:

`POST /v1/cases/{case_id}/sources`

`GET /v1/cases/{case_id}/sources/{source_id}/playback`

`POST /v1/cases/{case_id}/sources/{source_id}/analyze`

The backend retrieves the authenticated case and source, reads the stored WAV, runs the canonical `VoxVectorPipeline`, persists the run and stage state, and returns the updated case and run.

### Developer Console presentation

The Developer Console now presents runtime state with explicit visual semantics:

- green check indicators for healthy API/runtime conditions
- red warning indicators for unavailable or unhealthy conditions
- animated health-state feedback
- clearer dashboard card hierarchy and spacing
- dark themed case and recording form controls
- improved mobile form stacking
- clearer upload progress and failure states

These are presentation and operator-experience improvements. They do not represent scientific validation or new analytical methods.

This enables VoxVector to serve both as a premium analytical application and as an integration layer for developers building investigative, security, research, or enterprise workflows.

## Analytical Method Families

The current analytical foundation includes:

- RMS and intensity
- zero crossing rate
- spectral centroid and spread
- fundamental frequency and harmonicity
- F0 and intensity dynamics
- harmonic to noise ratio
- spectral flux and rolloff
- MFCC
- formant candidate tracking
- pause topology
- response latency when timing is supplied
- transcript disfluency when transcript is supplied
- within speaker baseline deviations when a baseline is supplied

The broader method library preserves deeper voice quality, spectral, glottal, linguistic, speaker, learned representation, multimethod classification, media integrity, and validation capabilities for continued engineering and validation.

## Developer Experience

The Developer Console is the engineering cockpit for the connected MVP path.

It provides:

- runtime health
- case creation and case selection
- WAV source upload with progress and failure-state handling
- secure signed playback
- case-bound analysis execution
- persisted pipeline stage inspection
- Analysis Workspace routing
- request inspection
- lifecycle events
- errors
- diagnostics
- methodology navigation
- documentation navigation
- MVP task board
- task checkoffs
- phase completion

The Developer Console remains a protected application surface backed by the canonical FastAPI API and private case/media storage.

## Product Development Direction

VoxVector is being engineered toward a world-class multimethod deception analysis engine with:

- deeper audio intelligence
- production transcription
- precise transcript and audio alignment
- speaker identification and diarization
- conversational intelligence
- speaker-aware baselines
- multimethod evidence synthesis
- calibrated deception probability
- confidence matrices
- alternative hypothesis analysis
- robust validation programs
- auditable final classification and disposition

These capabilities form one coherent product architecture.

## Documentation Authority

The VoxVector/ repository is the technical source of truth.

This Crown Labs dossier is the executive and product mirror.

Material runtime and architecture changes must be reflected here while preserving the complete product roadmap and internal validation record.

## Sync Record — 2026-08-30 Developer Console hardening

The Developer Console workflow was hardened after the persisted-source analysis correction. The canonical API helper now shares persisted-source resolution between playback and analysis, validates case/file state before upload, preserves multipart request correlation, reports upload progress, and distinguishes timeout, network, cancellation, and HTTP failures.

The console presentation was also refined with explicit green healthy checks, red warning states, animated health indicators, tighter dashboard spacing, dark themed form controls, improved file-input treatment, and responsive console spacing.

The technical implementation and verification record is maintained in:

`VoxVector/docs/PROJECT_CHECKPOINT_2026-08-30_DEVCONSOLE_WORKFLOW_HARDENING.md`

The earlier analysis-specific correction remains documented in:

`VoxVector/docs/PROJECT_CHECKPOINT_2026-08-30_DEVCONSOLE_ANALYZE_FIX.md`

The Crown Labs dossier remains the executive/product mirror; VoxVector implementation and canonical technical documentation remain authoritative.


## System Architecture and AUTO Workflow — 2026-09-01

VoxVector's current operating architecture is explicitly separated across GitHub/GitHub Actions and GitHub Pages for the public React application, Render for the FastAPI runtime, and Supabase for configured authentication, persistence, diagnostics, and private media storage.

The durable audio path is mediated by the API and terminates in Supabase storage; audio is not durably stored on Render.

The engineering workflow is now consolidated as **Architecture → Ownership → Trace → Operate/verify**. The complete technical record is `VoxVector/docs/SYSTEM_ARCHITECTURE_AND_AUTO_WORKFLOW.md`.


## 2026-09-01 Observability and Audit Surface

The Developer Console includes Live Logs, Error Reports, and structured Audits. The observability design preserves immutable diagnostic archives while projecting sanitized lifecycle and error records into relational Supabase tables for operator-facing queries. Production verification remains separate from source implementation.


## Implementation Sync — 2026-09-04

The current canonical case-analysis workflow includes built transcription execution wiring and a synchronized transcript review surface. When faster-whisper execution succeeds, normalized timestamped segments and words are persisted with the analysis run and displayed against the same audio playhead used by waveform playback. Aligned speaker attribution is consumed when diarization artifacts exist. The Developer Console MVP board locks completed canonical implementation items so local operator toggles cannot accidentally uncheck built workflow surfaces; remaining optional work stays manually trackable.

Controlled provider execution, persisted artifact readback, and deployed browser/mobile verification remain separate functional checks.


## Live analysis timeout and failure visibility — 2026-09-05

The canonical case analysis route now persists the live stage boundary before entering long-running work. The composite analysis boundary and provider-backed evidence acquisition have configurable server-side deadlines: `VOXVECTOR_PIPELINE_TIMEOUT_SECONDS` (default 120 seconds) and `VOXVECTOR_EVIDENCE_ACQUISITION_TIMEOUT_SECONDS` (default 180 seconds). On timeout, VoxVector records the failed stage, request ID, timeout context, persisted run state, and a diagnostic event, then returns HTTP 504 instead of leaving the client indefinitely waiting. The frontend error formatter surfaces the message, failed stage, error type when available, and request ID. These controls improve operational observability; they do not imply cancellation of already-running background worker threads or scientific validation of any analysis output.


## Continue-after-failure pipeline policy — 2026-09-05

A failed or timed-out task is recorded on its own pipeline stage with its sanitized error and outcome, but the orchestration continues into later stages that do not depend on that failed output. Dependent stages are marked `not_run` with an explicit dependency reason rather than being falsely reported as successful. Runs containing one or more stage failures finish as `completed_with_failures` when independent work and persistence can still complete. This preserves partial artifacts, stage visibility, diagnostics, and auditability without silently treating failure as success.


## Case workspace live execution diagnostics — 2026-09-05

The canonical Case Analysis Workspace now includes a request-scoped **Live execution log**. It reads the existing durable VoxVector diagnostics stream through the authenticated diagnostics API and filters events by the current analysis run's request ID. While a run is active, the panel refreshes every 2.5 seconds and can also be refreshed manually. Stage starts, failures, timeouts, diagnostic details, error types, durations, HTTP status, and source revision context are visible directly beside the case pipeline. This is an operational observability surface; it does not alter analytical results or validation status.


## Case workspace refresh and raw diagnostic export — 2026-09-05

The canonical Case Analysis Workspace now provides a **Copy raw logs** control that copies the exact request-scoped diagnostic event records as formatted JSON for engineering investigation. The readable log remains the default product view, while raw operational data is available without leaving the case.

Case refresh controls now refresh the active persisted case together with the case archive where applicable, and the workspace refresh button exposes an in-progress state instead of silently issuing overlapping requests. The workspace itself is intentionally frameless: individual analysis panels own their borders and spacing so the audio/player surface does not visually create a container around unrelated analysis components.
