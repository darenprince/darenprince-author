# VoxVector End State Implementation Plan

## Objective

Build the complete VoxVector product represented by the canonical product architecture and Analysis Workspace. The target is a unified vocal intelligence workspace that connects recording intake, speaker processing, transcription, synchronized visualization, analytical methods, evidence synthesis, assessment, reporting, persistence, and final disposition into one auditable case.

This document defines the dependency ordered engineering sequence and is updated when the active implementation crosses a real dependency boundary.

## Current execution checkpoint — 2026-09-10

Canonical GitHub `main` is `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2`, the merge of PR #960. Connected Render inspection shows deployment `dep-dah7usjl550s73e00350` live on that same source revision with production auto-deploy disabled.

Controlled production execution on that deployed revision established that:

- source upload/private persistence and speech segmentation succeeded for the 183.3-second controlled WAV;
- faster-whisper executed the constrained `base`, CPU/int8, beam-1, one-thread, one-worker isolated-process profile;
- transcription completed in about 113 seconds with 58 timestamped segments and 246 timestamped words;
- the post-provider parent process then entered an unsafe memory state before downstream Stage 10 work and the API runtime restarted shortly afterward;
- successful transcript/alignment/provider artifacts were not yet durably attached to the run before the downstream transition.

Issue #941 / draft PR #962 is therefore the active dependency. It keeps the canonical case-analysis pipeline, removes the cleanup-time PyTorch import side effect, adds Stage 10 memory admission, checkpoints completed upstream speech evidence to the same persisted run before downstream work, and separates Python-process identity from Render infrastructure identity.

Provider execution, durable artifact persistence, downstream memory safety, deployment, browser verification, and scientific validation remain separate evidence boundaries. The successful controlled transcription is provider-execution evidence for that run; it is not transcript truthfulness or deception-validation evidence.

## Current implementation plan

### EA1 — Runtime and provenance foundation — implemented

- case identity and persistence
- source upload and provenance
- canonical 21-stage state contract
- runtime self-test
- source revision provenance support
- Render runtime configuration
- durable media storage
- provider selection contracts
- Developer Console runtime/status projection

### EA2 — Speech segmentation and speaker diarization execution

Speech segmentation is an implemented upstream foundation and executed successfully in the latest controlled production run.

Speaker diarization remains the next provider-execution dependency after the active #941 transcription-memory repair is closed:

1. Confirm `VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api` and `VOXVECTOR_ENABLE_DIARIZATION_RUNS=true` in the target runtime without exposing credential values.
2. Execute the configured pyannoteAI cloud primary against the controlled WAV fixture.
3. Verify speaker turns, segment boundaries, provider provenance, and case/run persistence.
4. Record provider duration and relevant runtime/resource evidence.
5. Preserve provider limitations and confidence semantics.
6. Test local Community-1 only as a separate fallback exercise by explicitly configuring `VOXVECTOR_DIARIZATION_FALLBACK=pyannote_local` and `VOXVECTOR_DIARIZATION_FALLBACK_ENABLED=true`; do not substitute fallback testing for primary verification.
7. Promote Stage 06 only after successful cloud-primary provider execution and persisted artifact readback are demonstrated.

### EA3 — Transcription execution and downstream memory safety — active

The faster-whisper path has now completed once under the constrained beam-1 production profile. The remaining engineering requirement is reliable persistence and transition into downstream analysis:

1. Persist completed acquisition, transcript, alignment, provider state, and provider timings to the same case run before Stage 10 begins.
2. Ensure the post-heavy-phase cleanup path does not import PyTorch merely to inspect CUDA state.
3. Perform Stage 10 memory admission before Stage 10 is represented as running.
4. On insufficient headroom, preserve the successful upstream checkpoint and persist an explicit bounded downstream failure/not-run state rather than allowing an uncontrolled process restart.
5. Deliberately deploy the reviewed #941 revision and verify fresh `/health` source/process/memory contract readback.
6. Re-run the same controlled WAV and read the checkpoint back from durable case storage.
7. Require either safe Stage 10 completion or explicit bounded memory-admission refusal without API restart.

Successful transcription establishes provider execution only. It does not establish transcript correctness, speaker identity, deception inference, or scientific validation.

### EA4 — Timestamp normalization and alignment

1. Normalize transcript segment and word timing.
2. Normalize diarization speaker intervals.
3. Join transcript words to overlapping speaker regions.
4. Preserve unattributed words/regions when overlap is unavailable.
5. Produce the canonical multimodal timeline artifact.
6. Require persisted readback of the same-run alignment artifact rather than relying on transient in-memory state.

### EA5 — Evidence consumers

1. Feed acquired transcript data into linguistic/disfluency analysis.
2. Add question and response context boundaries.
3. Add speaker-aware acoustic aggregation.
4. Add independent within-speaker baseline inputs.
5. Preserve evidence direction, quality, provenance, and alternatives.
6. Keep convergence/conflict downstream of actual acquired evidence.

### EA6 — Review and reporting

1. Make the composed Analysis Results contract a first-class workspace artifact.
2. Build Review Evidence from persistent case/run evidence.
3. Add synchronized analytical tracks for real observations.
4. Connect assessment and report generation to persistent case state.
5. Complete case history and reopen behavior.

### EA7 — Verification and production hardening

1. Verify exact-commit GitHub QA.
2. Verify authenticated browser workflow.
3. Verify mobile and keyboard behavior.
4. Verify failure/cancellation paths.
5. Verify diagnostic projections and Render bridge.
6. Verify provider execution on representative fixtures.
7. Record resource behavior and failure evidence.
8. Require two complete golden-case passes on one exact deployed revision before engineering-MVP sign-off.

### EA8 — Scientific validation

Only after engineering evidence is stable:

- freeze operational definitions
- establish task-specific datasets
- use speaker-disjoint evaluation
- measure out-of-sample performance
- evaluate recording-condition robustness
- evaluate identity leakage
- calibrate outputs
- quantify uncertainty
- replicate where applicable

Scientific validation is a distinct gate and is never inferred from software execution, provider readiness, or deployment health.

## Fastest connected MVP execution path

The critical path is:

1. case identity and persistence — implemented
2. recording intake and provenance — implemented foundation; intermittent #930 pre-handler 400 remains open
3. audio playback and waveform — foundation implemented; historical-case rehydration tracked separately in #963
4. real 21-stage lifecycle — implemented foundation
5. speech segmentation — implemented and exercised in the latest controlled run
6. production transcription — provider execution established once; #941 owns durable checkpoint and downstream memory-safe transition
7. speaker processing — pyannoteAI cloud-primary controlled execution remains required
8. audio/transcript/speaker alignment — built foundation; durable provider-backed readback required
9. real analytical tracks — foundation present; Stage 10 currently gated by #941 memory safety
10. evidence normalization — implemented foundation
11. evidence synthesis — implemented foundation; expanded consumer integration next
12. assessment — guarded architecture
13. report generation — active build
14. case history and reopen — foundation present; persisted media/transcript rehydration tracked in #963
15. browser end-to-end verification — required
16. production hardening and same-revision repeatability — required

Every downstream surface must consume a real upstream contract.

## Canonical 21-stage pipeline dependency

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

The canonical contract remains 21 stages. Current maturity and runtime execution state are stage-specific and must come from the current implementation/runtime evidence rather than from stale static labels. Provider readiness does not equal execution, and execution does not equal durable artifact persistence.

## Analysis Workspace target

The persistent workspace must ultimately contain:

- case header
- source metadata
- recording quality
- audio player
- waveform
- speaker regions
- transcript
- synchronized analytical tracks
- evidence markers
- pipeline state
- evidence timeline
- Review Evidence
- assessment state
- report controls
- case history

The shared time axis remains the central synchronization contract across audio, speaker, transcript, analytical observations, and evidence.

## Developer Console operating contract

The Developer Console is the engineering cockpit for this plan. It must consume real runtime and CI evidence and distinguish:

- built implementation
- functional execution
- automated/manual testing
- validated scientific capability
- current versus stale deployment evidence

Current console capabilities include runtime health, API workbench, case workflow, 21-stage state, diagnostics, Render runtime, structured audits, and report/audit/log copy/download controls.

Issue #965 separately owns synchronization of the existing frontend `PipelineBuildCard.jsx` with the canonical backend stage order and mutable `pipeline_build` status contract. It must not be folded into #941's backend reliability change.

## Engineering rules

- one canonical analysis engine
- one canonical case model
- one 21-stage pipeline
- one synchronized analytical time axis
- one evidence provenance chain
- one frontend API boundary
- no frontend analysis engine
- no synthetic telemetry
- no synthetic pipeline progress
- no orphaned analytical visualization
- no unregistered method
- no validation claim without validation evidence
- no deletion of planned capabilities without a documented decision

## Definition of done

VoxVector reaches the end state when a user can move through one persistent case from recording intake to playback, waveform, speaker processing, transcription, alignment, analytical tracks, evidence exploration, synthesis, assessment, reporting, persistence, and reopening through reproducible browser and runtime verification.
