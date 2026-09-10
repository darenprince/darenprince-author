# VoxVector Architecture

## Product architecture objective

VoxVector is being engineered as a complete vocal intelligence and deception analysis system.

The architecture connects recording intake, speech segmentation, speaker processing, transcription, synchronized audio analysis, evidence synthesis, classification, reporting, and audit into one case-centered workflow.

## Latest observed implementation checkpoint — 2026-09-10

Current repository, branch-candidate, and production evidence remain separate:

- canonical GitHub `main` observed at issue #964 start: `53ee1b5e27b89fb436fd72da342cd6f947a667b0`
- runtime-bearing source currently deployed on Render: exact `420536771875c6948be51851118b58cb04a596e6`
- backend source release: `0.2.27`
- frontend source release: `0.2.37`
- exact-main VoxVector QA for runtime-bearing `420536...`: run `34532394431`, success
- exact-main GitHub Pages publication workflow for `420536...`: run `34532394423`, success
- Render service: `voxvector-api`
- current recorded Render deployment: `dep-dahi2ics728c73b6ujug`, `live`
- current deploy trigger: `api`
- current deployment finished: `2026-09-10T21:36:23.3655Z`
- Render production auto-deploy: disabled
- live Render build command: `pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`
- owner-provided Render export observed at `2026-09-10T21:38:48Z`, matching service/repository/root/build/start/health/domain/auto-deploy fields while redacting environment values

A forced-fresh `/health` readback at `2026-09-10T22:13:09.960535Z` returned HTTP 200 from exact deployed source `420536...`. It reported pipeline `0.2.27`, runtime self-test `passed`, the 512 MiB memory reference and 416 MiB Stage 10 admission ceiling, constrained faster-whisper `base` / beam 1 / one-thread / one-worker / isolated-process readiness, and cloud-primary `pyannote_api` readiness. The current live image also reported the local `pyannote.audio` adapter installed. Runtime readiness is not provider execution.

Issue #964 resolves the Render-vs-Git dependency/configuration drift in the existing root `render.yaml` and dependency manifests. The candidate keeps the current service build-command owner `requirements-speech.txt`, but that manifest becomes cloud-primary and delegates to `requirements-transcription.txt` without installing local pyannote/Torch. The optional local Community-1 dependency is isolated in `requirements-diarization-local.txt` and remains explicitly installed by the container build. The candidate also makes the non-secret Render profile and production CORS allowlist reproducible in the sole root Blueprint while leaving protected secrets server-managed.

Historical controlled production execution on older source `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2` established that faster-whisper can complete the constrained `base` / CPU / int8 / beam 1 / one-thread / one-worker / isolated-process path on the 183.3-second reference WAV. The run produced 58 transcript segments and 246 timestamped words in about 113 seconds, then entered the confirmed post-provider memory failure path.

PR #962 merged the first #941 containment repair. PR #967 then merged the reviewed Stage 10 serialization/run-identity follow-up in runtime-bearing source `420536...`. The source provides durable pre-Stage-10 provider checkpointing, bounded memory admission, fail-fast process-wide single-flight composite analysis with locked RSS recheck, separate process-vs-Render instance identity, and stable route-owned `run_id` with pipeline UUID retained separately as `pipeline_run_id`.

Issue #941 remains open because controlled production proof of those merged behaviors is still required. #964 first establishes the intended reproducible runtime configuration so the accepted proof is collected against the profile intended to proceed into later provider/golden verification.

Provider configuration, provider execution, artifact persistence, resource stability, software QA, deployment state, browser verification, engineering-MVP completion, and scientific validation remain separate evidence classes.

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

Current `voxvector/src/components/PipelineBuildCard.jsx` still has stale local 05/06 ordering and queued 07/08 presentation on `main`; issue #965 owns the existing-component correction. Backend contract/runtime state must remain authoritative rather than creating a second frontend pipeline definition.

## Current stage maturity

The current source contract continues to represent 21 stages with 16 implemented or built analytical/runtime foundations, four conditional or intentionally not-invoked stages, and the cloud-primary speaker path still requiring controlled execution evidence.

Stage 07 has historical real faster-whisper execution evidence from the controlled `f0dda136...` run. That is provider-execution evidence, not proof of current end-to-end reliability, transcript correctness, or scientific validation. Merged #962/#967 provide the intended same-run checkpoint and bounded Stage 10 path, but reopened #941 still requires controlled production proof.

## Evidence acquisition runtime

The canonical acquisition layer provides a normalized media profile, speech/silence timeline, provider-neutral transcript and diarization contracts, provider selection, timestamp overlap alignment, and multimodal timeline output.

The #964 constrained Render candidate profile is:

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
VOXVECTOR_DIARIZATION_FALLBACK=none
VOXVECTOR_DIARIZATION_FALLBACK_ENABLED=false
VOXVECTOR_ENABLE_DIARIZATION_RUNS=false
```

The cloud provider credential remains a protected Render environment value and is not committed. `VOXVECTOR_ENABLE_DIARIZATION_RUNS=false` is deliberate for the #941 runtime-stability candidate so the separate, not-yet-executed cloud-diarization path does not change that controlled experiment. Issue #970 owns deliberately enabling and verifying cloud-primary diarization afterward.

The runtime accepts `PYANNOTE_KEY` or `PYANNOTE_API_KEY` as the cloud-key name. The local Community-1 adapter is not the primary Render configuration. Its dependency is isolated in `requirements-diarization-local.txt`; the container build preserves that optional capability, while the constrained Render cloud-primary manifest does not install it.

Provider selection, route invocation gate, provider readiness, fallback readiness and actual execution remain separate states. Issue #970 additionally owns rechecking the current pyannoteAI cloud media-upload/job contract before real provider execution. A source/provider contract finding is not a claimed live failure until executed evidence establishes one.

## Memory-safe phase boundary

Heavyweight provider execution and downstream analysis are separate resource phases.

The current intended sequence is:

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

The merged #967 implementation applies the existing process-wide heavyweight phase guard to the complete canonical `VoxVectorPipeline.analyze()` call. Stage 10 composite admission is fail-fast: when the shared heavyweight lock is already owned, a competing composite call fails before entering the analytical body instead of waiting in a worker-thread queue that could outlive the route timeout. An admitted call rechecks memory headroom under that lock and keeps the lock for complete composite execution. Existing provider `measured_phase(...)` behavior is otherwise unchanged.

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

## Authentication and account boundary

Current authentication remains owned by `voxvector/src/components/AuthGate.jsx`. Auth/profile changes tracked under #931 remain a separate subsystem from #964.

## Render Blueprint boundary

Git contains one canonical VoxVector Blueprint at repository root `render.yaml`.

Issue #964 reconciles the existing file rather than creating another owner. The candidate Blueprint uses the same `requirements-speech.txt` build-command path as the connected service, while redefining that manifest as cloud-primary and moving optional local pyannote/Torch to `requirements-diarization-local.txt`. It source-controls the non-secret constrained runtime profile, explicit CORS allowlist, service repository/branch/plan/region/root/domain, and `autoDeployTrigger: off`. Protected credentials remain server-managed and are omitted from Git.

This is source/configuration state until reviewed, merged, deliberately applied to the existing Render service, deployed, and verified by fresh `/health`. No duplicate Blueprint or service is authorized.

## Current engineering sequence

```text
#964 reconcile sole Render Blueprint/runtime profile
        ↓
exact-head QA + review
        ↓
merge authorization
        ↓
deliberate existing-service reconciliation/deployment + fresh /health readback
        ↓
reopened #941 controlled same-WAV proof
        ↓
#970 cloud-primary diarization execution + persistence
        ↓
#971 persisted transcript/audio/speaker alignment
        ↓
#963 historical-case rehydration
        ↓
#930 intake reliability + #959 observability acceptance
        ↓
#965 truthful frontend pipeline projection
        ↓
#931 auth/profile browser acceptance
        ↓
#932 release-critical CTA/anchor/navigation repair
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
- Render cloud-primary speech packaging excludes optional local pyannote/Torch unless the local fallback manifest is explicitly installed
- runtime resource gates are separate from analytical eligibility gates
- stable case-run identity is distinct from pipeline-internal run identity
- Python process identity is separate from hosting-provider instance identity
- implementation maturity remains an internal engineering property
- provider readiness, execution, software QA, deployment, runtime readback, browser verification, and scientific validation remain separate states
- planned capabilities remain preserved in canonical documentation
- accessibility and responsive behavior remain part of completion

## Diarization provider boundary — 2026-09-04

VoxVector keeps provider execution separate from its evidence contracts:

```text
canonical diarization contract
        |
        +-- primary: pyannoteAI cloud API (PYANNOTE_KEY)
        |
        +-- explicit optional local fallback: Community-1 (HF_TOKEN)
```

The #964 constrained Render candidate selects the cloud provider but deliberately keeps route execution disabled until #970. The optional local fallback dependency is preserved outside the constrained Render manifest. Provider identity, fallback state, and failure class remain part of result provenance when execution occurs.
