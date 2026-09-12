# VoxVector Architecture

## Product architecture objective

VoxVector is being engineered as a complete vocal intelligence and deception analysis system.

The architecture connects recording intake, speech segmentation, speaker processing, transcription, synchronized audio analysis, evidence synthesis, classification, reporting, and audit into one case-centered workflow.

## Evidence-state boundary

Repository source, branch candidates, software QA, deployment, fresh runtime readback, provider readiness, provider execution, durable artifact persistence, browser verification, engineering-MVP completion, and scientific validation are separate evidence classes.

A source contract must not be described as provider execution. A build must not be described as a deployment. A deployment must not be described as browser verified. Software verification must not be described as scientific validation.

Historical controlled production execution on older source `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2` established that faster-whisper completed the constrained `base` / CPU / int8 / beam 1 / one-thread / one-worker / isolated-process path on the 183.3-second reference WAV. The run produced 58 transcript segments and 246 timestamped words in about 113 seconds, then entered the confirmed post-provider memory-failure path.

PR #962 merged the first #941 containment repair. PR #967 merged the Stage 10 serialization/run-identity follow-up. The source provides durable pre-Stage-10 provider checkpointing, bounded memory admission, fail-fast process-wide single-flight composite analysis with locked RSS recheck, separate process-vs-Render instance identity, and stable route-owned `run_id` with pipeline UUID retained separately as `pipeline_run_id`.

Issue #964 is complete after reconciliation of the sole root Render Blueprint/runtime profile and sole-service inventory. Issue #941 remains open because controlled production proof of the merged durability and Stage-10 behavior is still required.

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
        +--> mounted developer Render router
        |    VoxVector/api/render_api.py
        |
        v
VoxVector/src/voxvector/
        |
        +--> file upload / ingest
        +--> decode / normalization
        +--> provenance / integrity
        +--> recording / channel assessment
        +--> speech segmentation
        +--> speaker identification / diarization
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

The FastAPI adapter is an interface and runtime boundary. It imports and executes the canonical engine and must never become a second analysis implementation.

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

## Public frontend route architecture

The canonical public React shell and its styled reference surfaces are:

- `/voxvector/` — public product application;
- `/voxvector/site-map` — human-readable site/page inventory using the existing public React shell;
- `/voxvector/pipeline.html` — styled 21-stage analysis-pipeline reference;
- `/voxvector/methods.html` — styled analysis-method/data-point reference;
- `/voxvector/image-index/` — visual asset index;
- `/voxvector/loading-demo.html` — loading-state demonstration surface.

Protected React routes are:

- `/voxvector/login` — canonical account login/trusted-role router;
- `/voxvector/developer` — developer/admin Developer Console;
- `/voxvector/app` — approved-user workspace.

GitHub Pages has no SPA rewrite. The production and PR-preview workflows therefore stage physical route entries for `developer`, `login`, `app`, and `site-map`, all pointing to the same built React application. They are aliases for one canonical application, not duplicate pages.

PR #993 repairs the existing public navigation layer rather than creating a second menu or landing implementation. Route-qualified landing anchors, Request Access, styled Pipeline/Analysis Methods links, hash restoration, and the human site map remain presentation/navigation behavior only.

## Canonical 21-stage analysis pipeline

The complete product pipeline is defined in `docs/ANALYSIS_PIPELINE.md`.

### Prepare

1. File Upload / Ingest
2. File Decode and Normalization
3. Provenance and Integrity
4. Channel and Recording Assessment

### Understand

5. Speech Segmentation
6. Speaker Identification / Diarization
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

The stage numbering above matches the canonical backend `PIPELINE_STAGE_DEFINITIONS`. Historical documents that predate the dependency-order repair may retain the former 05/06 order as dated evidence and must not be rewritten merely to look current.

The existing `voxvector/src/components/PipelineBuildCard.jsx` is corrected in PR #993 to match this order. It prefers backend `pipeline_build.status_by_stage` for mutable stage state whenever available, uses local contract data only as an explicitly labeled loading/offline fallback, and no longer presents Stage 07/08 as queued when the backend contract defines implemented foundations. No second frontend pipeline definition was created.

## Current stage maturity

The source contract represents 21 stages with 16 implemented or built analytical/runtime foundations, four conditional or intentionally not-invoked stages, and the cloud-primary speaker path still requiring controlled execution evidence.

Stage 07 has historical real faster-whisper execution evidence from the controlled `f0dda136...` run. That is provider-execution evidence, not proof of current end-to-end reliability, transcript correctness, or scientific validation. Merged #962/#967 provide the intended same-run checkpoint and bounded Stage 10 path, but reopened #941 still requires controlled production proof.

## Evidence acquisition runtime

The canonical acquisition layer provides a normalized media profile, speech/silence timeline, provider-neutral transcript and diarization contracts, provider selection, timestamp-overlap alignment, and multimodal timeline output.

The constrained Render source profile includes:

```text
VOXVECTOR_TRANSCRIPTION_PROVIDER=faster_whisper
VOXVECTOR_WHISPER_MODEL=base
VOXVECTOR_WHISPER_DEVICE=cpu
VOXVECTOR_WHISPER_COMPUTE_TYPE=int8
VOXVECTOR_WHISPER_BEAM_SIZE=1
VOXVECTOR_WHISPER_CPU_THREADS=1
VOXVECTOR_WHISPER_NUM_WORKERS=1
VOXVECTOR_WHISPER_ISOLATED_PROCESS=true
VOXVECTOR_WHISPER_TIMEOUT_SECONDS=165
VOXVECTOR_MEMORY_LIMIT_MB=512
VOXVECTOR_MEMORY_HEADROOM_MB=96

VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api
```

Provider credentials remain protected runtime values and are not committed. Local Community-1 remains an optional fallback with its own dependency boundary rather than an implicit requirement for the cloud-primary path.

Provider selection, route invocation gate, provider readiness, fallback readiness and actual execution remain separate states. Issue #970 owns real cloud-primary diarization execution plus persisted speaker evidence.

## Memory-safe phase boundary

Heavyweight provider execution and downstream analysis are separate resource phases.

The intended sequence is:

```text
source decode / integrity
        ↓
speech segmentation
        ↓
provider-backed acquisition
        ↓
provider cleanup
        ↓
durable upstream checkpoint
        ↓
Stage 10 route preflight
        ↓
fail-fast shared Stage 10 admission lock + RSS recheck
        ↓
downstream composite analysis while lock remains held
```

A successful transcription must be persisted before downstream analysis is trusted to finish. If the API cannot safely admit downstream composite work under the configured memory reserve, the run must preserve completed upstream provider evidence and persist an explicit bounded downstream failure rather than knowingly entering the danger zone.

The merged implementation applies the process-wide heavyweight phase guard to the complete canonical `VoxVectorPipeline.analyze()` call. Stage 10 composite admission is fail-fast: when the shared heavyweight lock is already owned, a competing composite call fails before entering the analytical body instead of waiting in a worker-thread queue that could outlive the route timeout. An admitted call rechecks memory headroom under that lock and keeps the lock for complete composite execution.

`process_instance_id` identifies the current Python API process and must change on process restart. `render_instance_id` identifies Render infrastructure and is preserved separately because Render may restart Python while retaining the same infrastructure instance label.

## Case-centered data architecture

One analysis case is the root object for the complete user workflow.

The case model connects case ID, analysis ID, analysis run ID, source asset, source metadata, provenance, recording metadata, speaker records, speaker segments, speech segments, transcript records, transcript segments, transcript words, alignment records, analytical track records, feature observations, evidence records, evidence relationships, pipeline stage states, lifecycle events, findings, assessment, reports, and final disposition.

The same persisted case run is also the durability owner for upstream acquisition checkpoints, provider timing/state, process identity, Render-instance provenance, terminal run/failure reports, and downstream failure state. The result envelope exposes that stable persisted identifier as `run_id`. The internal analytical UUID remains separately available as `pipeline_run_id` and must not replace case-run identity.

## Analysis Workspace

The persistent workspace combines source metadata, audio playback, waveform, speaker regions, transcript, synchronized analytical tracks, evidence markers, pipeline state, evidence timeline, Review Evidence, assessment state, report controls, and case history.

A shared time axis remains the synchronization contract across audio, speaker, transcript, analytical observations, and evidence.

Reopened-case media/transcript/artifact rehydration is tracked in #963. That frontend task consumes canonical persisted source/run state; it does not create another persistence model.

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

Runtime memory admission is an operational safety gate, not the analytical Eligibility and Reliability stage. A memory-admission refusal must not be represented as a scientific eligibility result.

Candidate classification remains distinct from evidence collection, and final disposition remains distinct from candidate classification. Validation and calibration remain a separate gate.

## Operational observability

The API includes request correlation and sanitized lifecycle/stage diagnostics with durable storage support. The Developer Console consumes operational evidence rather than inventing telemetry.

PRs #961/#966/#968 are merged and current source includes dual Render/Supabase evidence foundations plus the server-generated Debug Bundle. Issue #959 owns controlled production acceptance: real correlated Render/Supabase copies, real bundle contents/redaction, terminal Render snapshot behavior and browser readback.

The Developer Console frontend client in `voxvector/src/lib/api.js` maps through the existing backend case, diagnostics, health and developer Render routes. PR #993 source-level contract tests trace those client calls to `VoxVector/api/app.py` and the mounted `VoxVector/api/render_api.py` router. This verifies source wiring only; it is not external-service execution or browser verification.

## Authentication and account boundary

Authentication remains owned by `voxvector/src/components/AuthGate.jsx`. Current merged source performs a non-blocking API wake after successful password login before trusted-role routing settles, while trusted role/permission enforcement remains separate from editable user metadata.

A login wake is connectivity/readiness behavior only and is not analysis execution.

## Render Blueprint boundary

Git contains one canonical VoxVector Blueprint at repository root `render.yaml`.

Issue #964 is complete. The existing root Blueprint/runtime-profile ownership was reconciled without creating a second Blueprint or duplicate service. Protected credentials remain server-managed and are omitted from Git.

A Blueprint definition is configuration. It is not a deployment, runtime readback, provider execution, browser verification, or scientific validation.

## Current engineering sequence

```text
reopened #941 controlled same-WAV durability / Stage 10 proof
        ↓
#970 cloud-primary diarization execution + persistence
        ↓
#971 persisted transcript/audio/speaker alignment
        ↓
#963 historical-case rehydration
        ↓
#930 intake reliability + #959 observability acceptance
        ↓
#965 / PR #993 truthful frontend pipeline projection
        ↓
#932 / PR #993 public CTA / anchor / site-map repair
        ↓
authenticated desktop/mobile browser acceptance
        ↓
#972 frozen candidate + two same-revision/configuration golden cases
        ↓
scientific validation program
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
- completed upstream artifacts are persisted before dependent heavyweight work
- Stage 10 composite analysis uses fail-fast process-wide single-flight admission, a locked RSS recheck, and lock ownership through execution
- runtime resource gates are separate from analytical eligibility gates
- stable case-run identity is distinct from pipeline-internal run identity
- Python process identity is separate from hosting-provider instance identity
- implementation maturity remains an internal engineering property
- provider readiness, execution, software QA, deployment, runtime readback, browser verification, and scientific validation remain separate states
- planned capabilities remain preserved in canonical documentation
- accessibility and responsive behavior remain part of completion

## Diarization provider boundary

VoxVector keeps provider execution separate from its evidence contracts:

```text
canonical diarization contract
        |
        +-- primary: pyannoteAI cloud API (server-side key)
        |
        +-- explicit optional local fallback: Community-1 (HF_TOKEN)
```

The optional local fallback dependency is preserved outside the constrained Render cloud-primary manifest. Provider identity, fallback state, and failure class remain part of result provenance when execution occurs. Issue #970 owns controlled cloud-primary execution and persisted speaker evidence.
