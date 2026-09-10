# VoxVector Architecture

## Product architecture objective

VoxVector is being engineered as a complete vocal intelligence and deception analysis system.

The architecture connects recording intake, speech segmentation, speaker processing, transcription, synchronized audio analysis, evidence synthesis, classification, reporting, and audit into one case-centered workflow.

## Latest observed implementation checkpoint — 2026-09-10

Current repository and production evidence remain separate:

- canonical GitHub `main`: `420536771875c6948be51851118b58cb04a596e6`
- backend source release: `0.2.27`
- frontend source release: `0.2.37`
- exact-main VoxVector QA: run `34532394431`, success
- exact-main GitHub Pages publication workflow: run `34532394423`, success
- Render service: `voxvector-api`
- current Render deployment: `dep-dahi2ics728c73b6ujug`, `live`
- current deployed source: exact `420536771875c6948be51851118b58cb04a596e6`
- current deploy trigger: `api`
- current deployment finished: `2026-09-10T21:36:23.3655Z`
- Render production auto-deploy: disabled
- live Render build command: `pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`
- canonical root `render.yaml` build command: `pip install -r api/requirements.txt && pip install -r api/requirements-transcription.txt`
- owner-provided Render export observed at `2026-09-10T21:38:48Z`, matching service/repository/root/build/start/health/domain/auto-deploy fields while redacting environment values

The Render-vs-Git dependency/configuration drift is tracked in issue #964 and must be resolved before final controlled repeatability evidence is accepted. Root `render.yaml` also declares `CORS_ORIGINS` as server-managed while the owner export does not list it; backend source defaults to `*` when the variable is absent. That difference is evidence for #964 review, not permission to infer a runtime value.

No fresh `/health` response for exact deployed source `420536...` is recorded by the current synchronization pass. Render `live` establishes deployment state only.

Historical controlled production execution on older source `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2` established that faster-whisper can complete the constrained `base` / CPU / int8 / beam 1 / one-thread / one-worker / isolated-process path on the 183.3-second reference WAV. The run produced 58 transcript segments and 246 timestamped words in about 113 seconds, then entered the confirmed post-provider memory failure path.

PR #962 merged the first #941 containment repair. PR #967 then merged the reviewed Stage 10 serialization/run-identity follow-up as current `main` `420536...`. The source now provides durable pre-Stage-10 provider checkpointing, bounded memory admission, fail-fast process-wide single-flight composite analysis with locked RSS recheck, separate process-vs-Render instance identity, and stable route-owned `run_id` with pipeline UUID retained separately as `pipeline_run_id`.

Issue #941 has been reopened because controlled production proof of those merged behaviors is still required. #964 should establish the runtime configuration first so the accepted proof is collected against the runtime profile intended to proceed into provider/golden verification.

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

Stage 07 has historical real faster-whisper execution evidence from the controlled `f0dda136...` run. That is provider-execution evidence, not proof of current `420536...` end-to-end reliability, transcript correctness, or scientific validation. Merged #962/#967 now provide the intended same-run checkpoint and bounded Stage 10 path, but reopened #941 still requires controlled production proof.

## Evidence acquisition runtime

The canonical acquisition layer provides a normalized media profile, speech/silence timeline, provider-neutral transcript and diarization contracts, provider selection, timestamp overlap alignment, and multimodal timeline output.

Canonical constrained source profile:

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

This source profile is not a fresh current deployment-health claim. Historical `f0dda136...` execution proved the beam-1 transcription path could execute. Current production proof after the merged safety changes remains #941 after #964 reconciliation.

The runtime also accepts `PYANNOTE_API_KEY` as the cloud-key alias. The local Community-1 adapter is not the primary configuration; it may be selected only as an explicit fallback with `VOXVECTOR_DIARIZATION_FALLBACK=pyannote_local`, `VOXVECTOR_DIARIZATION_FALLBACK_ENABLED=true`, and a protected `HF_TOKEN` or `HUGGINGFACE_TOKEN`. Provider selection, route invocation gate, provider readiness, fallback readiness and actual execution remain separate states.

Issue #970 additionally owns rechecking the current pyannoteAI cloud media-upload/job contract before real provider execution. A source/provider contract finding is not a claimed live failure until executed evidence establishes one.

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

PRs #961/#966/#968 are merged and current source includes dual Render/Supabase evidence foundations plus the server-generated Debug Bundle. Issue #959 now owns controlled production acceptance: real correlated Render/Supabase copies, real bundle contents/redaction, terminal Render snapshot behavior and browser readback.

## Authentication and account boundary

Current `main` authentication remains owned by `voxvector/src/components/AuthGate.jsx`. Readback on `420536...` confirms successful password login still does not start the requested one-shot API wake.

Draft PR #974 under #931 contains the candidate login-wake repair and generalizes the existing `DeveloperProfileEditor.jsx` into one role-aware self-profile implementation used by developer, admin and user surfaces. It reuses `public.profiles`, existing Auth presentation metadata and the private avatar bucket; email, trusted role and account ID remain read-only. Admin-only User Management stays a separate privileged boundary.

PR #974 is not merged/current/deployed behavior. Its prior QA predates the #967 advance of `main`, so current-main integration QA and browser acceptance are still required.

## Render Blueprint boundary

Git already contains the sole canonical VoxVector Blueprint at repository root `render.yaml`.

The current connected Render service and owner-provided export use `requirements-speech.txt`; the root Blueprint uses `requirements-transcription.txt`. The owner export redacts environment values and therefore cannot be used to infer them. `CORS_ORIGINS` exists in the root Blueprint but is absent from the export and must be deliberately reconciled because backend source defaults to `*` when unset.

Issue #964 owns field-by-field reconciliation into the existing root file. Do not upload or commit a second Blueprint for `voxvector-api`.

## Current engineering sequence

```text
#964 reconcile sole Render Blueprint/runtime profile
        ↓
deliberate deployment + fresh /health readback
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
#931 / PR #974 current-main integration + auth/profile browser acceptance
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
        +-- explicit fallback: local Community-1 (HF_TOKEN)
```

The primary provider and fallback are selected by deployment configuration. A primary failure may use the fallback only when explicitly enabled. Provider identity, fallback state, and failure class are preserved in resulting provenance. This prevents silent provider substitution and keeps case analysis reproducible.
