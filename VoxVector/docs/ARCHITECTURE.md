# VoxVector Architecture

## Product architecture objective

VoxVector is being engineered as a complete vocal intelligence and deception analysis system.

The architecture connects recording intake, speaker processing, transcription, synchronized audio analysis, evidence synthesis, classification, reporting, and audit into one case-centered workflow.

## Latest observed implementation checkpoint — 2026-09-07

The live Render runtime now provides a configured speech-processing boundary in addition to the established acoustic/temporal analysis foundation:

- backend pipeline `0.2.26`
- source revision `73ac03ded08c161e092ee2a4ecbbed7d036771c8`
- runtime self-test `passed`
- diagnostic/media storage `configured_media_ready`
- media storage `true`
- faster-whisper transcription provider configured and execution-ready
- pyannoteAI cloud primary diarization provider configured and execution-ready; local fallback disabled
- pyannote API-key presence detected by runtime health
- 21-stage maturity is 16 implemented or built foundations, 4 conditional/not-invoked, 1 queued

The configured speech providers are an enabling runtime state. Controlled provider execution and artifact persistence remain the next dependency before stages 05, 07, and 08 are promoted.

## Application boundary

```text
Public React application
voxvector/
        |
        | GitHub Pages
        v
https://darenprince.com/voxvector/
        |
        | TanStack Query / real API calls
        v
https://voxvector.crownlabs.tech
        |
        | FastAPI
        v
VoxVector/api/app.py
        |
        v
VoxVector/src/voxvector/
        |
        +--> file upload / ingest
        +--> decode / normalization
        +--> provenance / integrity
        +--> recording / channel assessment
        +--> speaker identification / diarization
        +--> speech segmentation
        +--> transcription generation
        +--> transcript alignment
        +--> eligibility / reliability
        +--> acoustic analysis
        +--> prosodic / voice quality analysis
        +--> temporal / pause analysis
        +--> linguistic / disfluency analysis
        +--> question / answer alignment
        +--> within speaker baseline
        +--> evidence assembly
        +--> convergence / conflict analysis
        +--> candidate classification
        +--> validation / calibration gate
        +--> final classification / disposition
        +--> audit / provenance output
        |
        v
Supabase
Auth / case data / diagnostics / persistence / private media
```

The React application is presentation and interaction code. The frontend must not recreate the analysis engine.

The FastAPI adapter is an interface and runtime boundary. It must import and execute the canonical engine and must never become a second analysis implementation.

## Deployment endpoints

```text
https://darenprince.com/voxvector/
    public React application + Developer Console

https://voxvector.crownlabs.tech
    original Render FastAPI API; preserved

https://awsapi.crownlabs.tech
    separate AWS ALB → ECS Fargate VoxVector API environment
```

The original API domain remains preserved. AWS is a separate deployment environment until an explicit cutover decision is made and verified.

## Canonical 21-stage analysis pipeline

The complete product pipeline is defined in `docs/ANALYSIS_PIPELINE.md`.

### Prepare

1. File Upload / Ingest
2. File Decode and Normalization
3. Provenance and Integrity
4. Channel and Recording Assessment

### Understand

5. Speaker Identification / Diarization
6. Speech Segmentation
7. Transcription Generation
8. Transcript Alignment
9. Eligibility and Reliability

### Analyze

10. Acoustic Feature Extraction
11. Prosodic and Voice Quality Analysis
12. Temporal and Pause Analysis
13. Linguistic and Disfluency Analysis
14. Question / Answer Alignment
15. Within Speaker Baseline

### Synthesize and Decide

16. Cross Method Evidence Assembly
17. Evidence Convergence and Conflict
18. Candidate Classification
19. Validation and Calibration Gate
20. Final Classification / Disposition
21. Audit and Provenance Output

## Current stage maturity

The live health contract currently reports:

- 16 implemented or built foundations
- 4 conditional/not-invoked stages
- 1 queued stage

Provider configuration and execution readiness do not change the maturity count. Real provider execution, persisted artifacts, integration tests, and runtime verification are required for stage promotion.

## Evidence acquisition runtime

The canonical acquisition layer provides a normalized media profile, speech/silence timeline, provider-neutral transcript and diarization contracts, provider selection, timestamp overlap alignment, and multimodal timeline output.

Canonical constrained Render source profile:

```text
VOXVECTOR_TRANSCRIPTION_PROVIDER=faster_whisper
VOXVECTOR_WHISPER_MODEL=base
VOXVECTOR_WHISPER_DEVICE=cpu
VOXVECTOR_WHISPER_COMPUTE_TYPE=int8
VOXVECTOR_WHISPER_BEAM_SIZE=1

VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api
PYANNOTE_KEY=<protected deployment secret>
VOXVECTOR_ENABLE_DIARIZATION_RUNS=true
```

The source profile is not a deployment claim. Controlled production evidence on 2026-09-10 showed deployed revision `c21b4cf07f6475eddb15c99e67f1ff70d6a50167` still executing faster-whisper with `beam_size=3` before transcript-stage runtime restarts. Issue #941 owns the correction and requires deliberate deployment plus runtime readback before the deployed profile is represented as beam 1.

The runtime also accepts `PYANNOTE_API_KEY` as the cloud-key alias. The local Community-1 adapter is not the primary configuration; it may be selected only as an explicit fallback with `VOXVECTOR_DIARIZATION_FALLBACK=pyannote_local`, `VOXVECTOR_DIARIZATION_FALLBACK_ENABLED=true`, and a protected `HF_TOKEN` or `HUGGINGFACE_TOKEN`. The route execution gate and provider/fallback readiness are separate states. The runtime health contract reports configuration/readiness without exposing credentials.

## Case-centered data architecture

One analysis case is the root object for the complete user workflow.

The case model connects case ID, analysis ID, analysis run ID, source asset, source metadata, provenance, recording metadata, speaker records, speaker segments, speech segments, transcript records, transcript segments, transcript words, alignment records, analytical track records, feature observations, evidence records, evidence relationships, pipeline stage states, lifecycle events, findings, assessment, reports, and final disposition.

## Analysis Workspace

The persistent workspace combines source metadata, audio playback, waveform, speaker regions, transcript, synchronized analytical tracks, evidence markers, pipeline state, evidence timeline, Review Evidence, assessment state, report controls, and case history.

A shared time axis remains the synchronization contract across audio, speaker, transcript, analytical observations, and evidence.

## Synchronized analytical viewer

Initial tracks:

- waveform
- pitch F0
- intensity
- spectral energy
- speech activity
- pauses

Expanded tracks can include formants, HNR, spectral flux, spectral rolloff, MFCC, jitter, shimmer, voice quality, response latency, speaker turns, transcript alignment, and evidence events.

Every track is driven by canonical analysis data and never synthetic telemetry.

## Reliability and classification boundaries

Reliability is an eligibility control, not a deception probability.

Candidate classification remains distinct from evidence collection, and final disposition remains distinct from candidate classification. Validation and calibration remain a separate gate.

## Operational observability

The API includes request correlation and sanitized lifecycle/stage diagnostics with durable storage support. The Developer Console consumes operational evidence rather than inventing telemetry.

## Current engineering sequence

```text
controlled provider execution
        ↓
persist transcript + speaker artifacts
        ↓
timestamp normalization
        ↓
transcript / speaker / audio alignment
        ↓
multimodal evidence timeline
        ↓
linguistic + interaction + baseline consumers
        ↓
Review Evidence
        ↓
assessment + reporting + history
        ↓
browser/mobile verification
        ↓
scientific validation
```

## Engineering principles

- one canonical analysis engine
- one canonical case model
- one 21-stage pipeline
- one synchronized analytical time axis
- frontend state derived from real backend state
- every visualization has a data contract
- every evidence record has provenance
- every analytical stage has defined inputs and outputs
- implementation maturity remains an internal engineering property
- provider readiness, execution, software QA, and scientific validation remain separate states
- planned capabilities remain preserved in canonical documentation
- accessibility and responsive behavior remain part of completion


## Diarization provider boundary — 2026-09-04

VoxVector keeps provider execution separate from its evidence contracts:

```text
canonical diarization contract
        |
        +-- primary: pyannoteAI cloud API (PYANNOTE_KEY)
        |
        +-- explicit fallback: local Community-1 (HF_TOKEN)
```

The primary provider and fallback are selected by deployment configuration. A primary failure may use the fallback only when explicitly enabled. Provider identity, fallback state, and failure class are preserved in the resulting provenance. This prevents silent provider substitution and keeps case analysis reproducible.
