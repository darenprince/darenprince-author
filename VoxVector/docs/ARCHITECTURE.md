# VoxVector Architecture

## Product architecture objective

VoxVector is being engineered as a complete vocal intelligence and deception analysis system.

The architecture connects recording intake, speech segmentation, speaker processing, transcription, synchronized audio analysis, evidence synthesis, classification, reporting, and audit into one case-centered workflow.

## Latest observed implementation checkpoint — 2026-09-10

Current repository and production evidence must remain separate:

- canonical GitHub `main` observed for the latest follow-up rebase: `8bf2e3c0a97025ea7f25f6b10bc4cbad9bfa8b1e`
- backend source release: `0.2.27`
- frontend source release: `0.2.37`
- Render service: `voxvector-api`
- last documented Render deployment for the controlled memory incident: `dep-dah7usjl550s73e00350`, `live`
- that deployed source: exact `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2`
- Render production auto-deploy: disabled
- live Render build command at that evidence point: `pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`
- canonical root `render.yaml` build command at that evidence point: `pip install -r api/requirements.txt && pip install -r api/requirements-transcription.txt`

The Render-vs-Git dependency drift is tracked separately in issue #964 and is not resolved by the runtime-memory work.

Controlled production execution on `f0dda136...` established that faster-whisper can complete the constrained `base` / CPU / int8 / beam 1 / one-thread / one-worker / isolated-process path on the 183.3-second reference WAV. The run produced 58 transcript segments and 246 timestamped words in about 113 seconds. The API process later restarted during the post-provider/downstream transition after parent RSS rose into the constrained service danger zone. The owner confirmed the incident was a memory problem.

PR #962 merged the first #941 containment repair: cleanup no longer imports PyTorch merely to clean up, completed provider artifacts are checkpointed before downstream work, Stage 10 performs a route-level memory preflight, and Python process identity remains distinct from Render infrastructure instance identity. A post-merge exact-head Codex review then identified two remaining source defects: the Stage 10 preflight was not held as a shared reservation for the full composite analysis, and the result envelope could prefer the pipeline-internal UUID over the stable persisted case-run ID. Follow-up branch `fix/voxvector-stage10-admission-envelope` addresses those two findings before #941 production rerun evidence is accepted.

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

## Current stage maturity

The current source contract continues to represent 21 stages with 16 implemented or built analytical/runtime foundations, four conditional or intentionally not-invoked stages, and the cloud-primary speaker path still requiring controlled execution evidence.

Stage 07 has completed real faster-whisper execution in one controlled production run. That is provider-execution evidence, not proof of full analysis reliability, transcript correctness, or scientific validation. PR #962 merged the same-run upstream acquisition checkpoint before downstream work, but that source has not yet completed the required deliberate deployment and controlled production rerun. The follow-up Stage 10 serialization and envelope-identity repair must pass review and exact-head QA before that rerun is meaningful.

## Evidence acquisition runtime

The canonical acquisition layer provides a normalized media profile, speech/silence timeline, provider-neutral transcript and diarization contracts, provider selection, timestamp overlap alignment, and multimodal timeline output.

Canonical constrained Render source profile:

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

VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api
PYANNOTE_KEY=<protected deployment secret>
VOXVECTOR_ENABLE_DIARIZATION_RUNS=true
```

The source profile is not a deployment claim. The documented Render production evidence on `f0dda136...` shows the intended beam-1 transcription profile actually executed and completed. The unresolved production question is the corrected post-provider/downstream memory boundary on a deliberately deployed revision.

The runtime also accepts `PYANNOTE_API_KEY` as the cloud-key alias. The local Community-1 adapter is not the primary configuration; it may be selected only as an explicit fallback with `VOXVECTOR_DIARIZATION_FALLBACK=pyannote_local`, `VOXVECTOR_DIARIZATION_FALLBACK_ENABLED=true`, and a protected `HF_TOKEN` or `HUGGINGFACE_TOKEN`. The route execution gate and provider/fallback readiness are separate states. Runtime health reports configuration/readiness without exposing credentials.

## Memory-safe phase boundary

Heavyweight provider execution and downstream analysis are separate resource phases.

The intended constrained sequence is:

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
shared heavyweight admission lock + RSS recheck
        ↓
downstream composite analysis while lock remains held
```

A successful transcription must be persisted before downstream analysis is trusted to finish. If the API cannot safely admit downstream composite work under the configured memory reserve, the run must preserve completed upstream provider evidence and persist an explicit bounded downstream failure rather than knowingly entering the danger zone.

The follow-up repair applies the existing process-wide heavyweight phase guard to the complete canonical `VoxVectorPipeline.analyze()` call. That guard serializes heavyweight provider/composite phases and rechecks memory headroom while holding the same lock that remains held through composite execution. The route-level Stage 10 check remains a preflight and is not itself treated as the full reservation.

`process_instance_id` identifies the current Python API process and must change on process restart. `render_instance_id` identifies Render infrastructure and is preserved separately because Render may restart the Python process while retaining the same infrastructure instance label.

## Case-centered data architecture

One analysis case is the root object for the complete user workflow.

The case model connects case ID, analysis ID, analysis run ID, source asset, source metadata, provenance, recording metadata, speaker records, speaker segments, speech segments, transcript records, transcript segments, transcript words, alignment records, analytical track records, feature observations, evidence records, evidence relationships, pipeline stage states, lifecycle events, findings, assessment, reports, and final disposition.

The same persisted case run is also the durability owner for upstream acquisition checkpoints, provider timing/state, process identity, Render-instance provenance, terminal run/failure reports, and downstream failure state. The result envelope must expose that stable persisted identifier as `run_id`. The internal analytical UUID remains separately available as `pipeline_run_id` and must not replace case-run identity.

## Analysis Workspace

The persistent workspace combines source metadata, audio playback, waveform, speaker regions, transcript, synchronized analytical tracks, evidence markers, pipeline state, evidence timeline, Review Evidence, assessment state, report controls, and case history.

A shared time axis remains the synchronization contract across audio, speaker, transcript, analytical observations, and evidence.

Reopened-case media/transcript rehydration is tracked in #963. That frontend task consumes the canonical persisted source and upstream transcript checkpoint; it does not create another persistence model.

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

Issue #959 separately owns dual Render + Supabase log durability, provider-worker correlation, mirrored Render evidence, and the server-generated Debug Bundle. Those observability changes remain separate from #941's runtime-memory and run-identity boundary.

## Render Blueprint boundary

Git already contains the sole canonical VoxVector Blueprint at repository root `render.yaml`. The last documented live Render service differed from that file in at least the speech dependency build command. Issue #964 owns reconciliation of the Render-generated export and live service into the existing root Blueprint. Do not upload or commit a second Blueprint for `voxvector-api`.

## Current engineering sequence

```text
finish #941 follow-up source repair
        ↓
exact-head QA + review
        ↓
deliberate Render deployment
        ↓
fresh /health process + memory readback
        ↓
same-WAV controlled rerun
        ↓
verify transcript checkpoint + serialized Stage 10 bounded behavior
        ↓
cloud-primary diarization execution
        ↓
persist transcript + speaker alignment
        ↓
#963 historical-case rehydration
        ↓
Review Evidence / assessment / reporting
        ↓
browser/mobile verification
        ↓
engineering-MVP repeatability proof
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
- heavyweight phases are process-wide serialized under one admission guard on the constrained runtime
- runtime resource gates are separate from analytical eligibility gates
- stable case-run identity is distinct from pipeline-internal run identity
- Python process identity is separate from hosting-provider instance identity
- implementation maturity remains an internal engineering property
- provider readiness, execution, software QA, deployment, browser verification, and scientific validation remain separate states
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

The primary provider and fallback are selected by deployment configuration. A primary failure may use the fallback only when explicitly enabled. Provider identity, fallback state, and failure class are preserved in resulting provenance. This prevents silent provider substitution and keeps case analysis reproducible.
