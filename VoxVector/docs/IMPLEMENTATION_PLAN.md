# VoxVector End State Implementation Plan

## Objective

Build the complete VoxVector product represented by the canonical product architecture and Analysis Workspace. The target is a unified vocal intelligence workspace that connects recording intake, speaker processing, transcription, synchronized visualization, analytical methods, evidence synthesis, assessment, reporting, persistence, and final disposition into one auditable case.

This document defines the dependency-ordered engineering sequence and is updated when the active implementation crosses a real dependency boundary.

## Current execution checkpoint — 2026-09-10

Canonical GitHub `main` is `420536771875c6948be51851118b58cb04a596e6`, the merge of PR #967. Exact-main VoxVector QA `34532394431` succeeded and GitHub Pages publication workflow `34532394423` succeeded.

Connected Render inspection shows deployment `dep-dahi2ics728c73b6ujug` `live` on that same source revision with production auto-deploy disabled. The deployment was API-triggered and finished `2026-09-10T21:36:23.3655Z`.

The current live Render service builds `api/requirements-speech.txt`, while the sole canonical root `render.yaml` builds `api/requirements-transcription.txt`. The owner-provided Render export generated `2026-09-10T21:38:48Z` confirms the live repository/service/root/build/start/health/domain/auto-deploy fields but redacts environment values. Root `render.yaml` also declares `CORS_ORIGINS` while the export does not list it. Issue #964 is therefore the current first source/configuration dependency and must reconcile the existing Blueprint before final controlled runtime proof.

No fresh `/health` response for current exact deployed `420536...` is recorded by this synchronization pass. Deployment `live` remains distinct from runtime readback.

Historical controlled execution on deployed `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2` established that:

- source upload/private persistence and speech segmentation succeeded for the 183.3-second controlled WAV;
- faster-whisper executed the constrained `base`, CPU/int8, beam-1, one-thread, one-worker isolated-process profile;
- transcription completed in about 113 seconds with 58 timestamped segments and 246 timestamped words;
- the post-provider parent process entered an unsafe memory state before successful downstream Stage 10 completion and the API runtime restarted shortly afterward;
- successful transcript/alignment/provider artifacts were not yet durably attached to the run before that downstream transition.

Merged PR #962 repaired the first durability/memory boundary. Merged PR #967 added fail-fast process-wide Stage 10 composite admission, a locked RSS recheck held through composite execution, and stable route-owned `run_id` with pipeline-internal identity preserved separately as `pipeline_run_id`.

Issue #941 has been reopened because production acceptance was not established merely by source merge/deployment. After #964 establishes the intended runtime profile, the same controlled WAV must prove the merged durability/memory behavior.

Provider execution, durable artifact persistence, downstream memory safety, deployment, fresh runtime readback, browser verification, and scientific validation remain separate evidence boundaries.

## Current implementation plan

### EA1 — Runtime and provenance foundation — implemented

- case identity and persistence
- source upload and provenance
- canonical 21-stage state contract
- runtime self-test contract
- source revision provenance support
- Render runtime configuration boundary
- durable media storage
- provider selection contracts
- Developer Console runtime/status projection
- separate Python-process and Render-infrastructure identities
- stable route-owned persisted run identity with separate pipeline-internal identity

### EA2 — Runtime configuration reproducibility — current first task

Issue #964 owns one Render/IaC subsystem:

1. Reconcile the live/exported `voxvector-api` service into the existing root `render.yaml`.
2. Resolve `requirements-speech.txt` versus `requirements-transcription.txt` from actual cloud-primary/runtime needs.
3. Review `CORS_ORIGINS` deliberately because it is present in Git, absent from the owner export, and defaults to `*` in backend source when unset.
4. Keep credentials/secrets server-managed and keep reproducible non-secret runtime values source-controlled where supported.
5. Preserve auto-deploy disabled.
6. Validate Blueprint syntax/spec and ensure no duplicate service/Blueprint is created.
7. Deliberately deploy the reconciled revision and obtain fresh `/health` before accepting runtime proof.

A Blueprint change/configuration sync is not provider execution.

### EA3 — Transcription durability and downstream memory safety — source merged, production proof open

The faster-whisper path completed historically under the constrained beam-1 profile. Current source now contains the intended durability/resource safety behavior:

1. Persist completed acquisition, transcript, alignment, provider state, and provider timings to the same case run before Stage 10 begins.
2. Keep post-heavy cleanup from importing PyTorch merely to inspect CUDA state.
3. Perform Stage 10 memory admission before Stage 10 is represented as running.
4. Use fail-fast process-wide single-flight composite admission so competing abandoned requests do not queue for later heavy execution.
5. Recheck RSS while holding the shared heavyweight lock and retain that lock through complete composite analysis.
6. On insufficient headroom, preserve the successful upstream checkpoint and persist an explicit bounded downstream failure/not-run state rather than allowing an uncontrolled process restart.
7. Preserve route-owned `run_id` and store pipeline-internal identity as `pipeline_run_id`.
8. After #964, deliberately deploy/read back the exact runtime and rerun the same controlled WAV.
9. Read the upstream checkpoint from durable case storage before relying on downstream completion.
10. Require either safe Stage 10 completion or explicit bounded memory-admission refusal without API restart.

Reopened #941 owns the controlled production proof. Successful transcription remains provider execution evidence only, not transcript correctness or scientific validation.

### EA4 — Speaker diarization execution

Speech segmentation is an implemented upstream foundation and executed successfully in the historical controlled production run.

Issue #970 owns the next real speaker-provider boundary after #964/#941:

1. Recheck the current official pyannoteAI media-ticket/upload/diarize/job-poll contract.
2. Correct the existing `pyannote_api` adapter if the current provider contract confirms the audited route mismatch.
3. Confirm `VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api` and `VOXVECTOR_ENABLE_DIARIZATION_RUNS=true` in the target runtime without exposing credential values.
4. Execute the configured cloud primary against the controlled WAV fixture.
5. Verify speaker turns/segment boundaries, provider provenance, and case/run persistence.
6. Record bounded provider duration/failure evidence.
7. Preserve provider limitations/confidence semantics.
8. Test local Community-1 only as a separately authorized fallback exercise; do not substitute fallback testing for cloud-primary verification.

### EA5 — Timestamp normalization and persisted multimodal alignment

Issue #971 owns this boundary after real transcript and speaker artifacts exist:

1. Normalize transcript segment and word timing.
2. Normalize diarization speaker intervals.
3. Join transcript words to overlapping speaker regions.
4. Preserve unattributed words/regions when overlap is unavailable.
5. Produce the canonical multimodal timeline artifact.
6. Persist that same-run alignment artifact and provenance.
7. Read the artifact back from durable case storage rather than relying on transient in-memory state.

### EA6 — Case rehydration and persistent return path

Issue #963 owns the existing Analysis Workspace/Case History consumer path after upstream artifact evidence is established:

1. Resolve persisted source when transient browser upload state is absent.
2. Request a fresh authenticated signed playback URL from the existing playback endpoint.
3. Rehydrate persisted transcript, speaker, alignment, evidence/report state into the existing workspace.
4. Preserve source/case switching without stale media/artifact leakage.
5. Verify desktop/mobile reopen without re-upload.

No second player, transcript, case store, or persistence model should be introduced.

### EA7 — Intake reliability and observability acceptance

Issue #930 must reproduce or tightly bound the intermittent pre-handler case-source 400 using sanitized request-envelope evidence and current repeatability tests.

Issue #959 owns production acceptance of the already merged dual Render/Supabase observability and Debug Bundle foundation:

- correlated Render + Supabase copies on a controlled run;
- automatic bounded terminal Render snapshot capture;
- real case/run Debug Bundle generation and redaction inspection;
- post-restart durability or explicit bounded limitation;
- authenticated browser readback.

### EA8 — Frontend truth and authenticated entry/account surfaces

Issue #965 owns synchronization of the existing `PipelineBuildCard.jsx` with the canonical backend stage order and mutable `pipeline_build.status_by_stage`. Current `main` still has stale local Stage 05/06 ordering and queued Stage 07/08 fallback text.

Issue #931 / draft PR #974 owns login wake/shared self-profile behavior. Current `main` `AuthGate.jsx` still lacks the requested login-time API wake. PR #974 contains the candidate one-shot `/health` wake and generalized developer/admin/user self-profile editor using the existing `public.profiles`/avatar boundary. Its prior QA predates the #967 main advance; it must be refreshed against current `main`, rerun through current-base QA/Preview, reviewed/merged, then browser verified.

Issue #932 owns release-critical public CTA/anchor/mobile-navigation correctness without recreating the landing page or navigation system.

### EA9 — Evidence consumers

1. Feed acquired transcript data into linguistic/disfluency analysis.
2. Add question and response context boundaries.
3. Add speaker-aware acoustic aggregation.
4. Add independent within-speaker baseline inputs.
5. Preserve evidence direction, quality, provenance, and alternatives.
6. Keep convergence/conflict downstream of actual acquired evidence.

### EA10 — Review and reporting

1. Make the composed Analysis Results contract a first-class workspace artifact.
2. Build Review Evidence from persistent case/run evidence.
3. Add synchronized analytical tracks for real observations.
4. Connect assessment and report generation to persistent case state.
5. Complete case history and reopen behavior through the existing workspace.

### EA11 — Frozen-candidate verification and production hardening

Under #972:

1. Freeze one exact candidate source revision and runtime configuration after all candidate-affecting blockers are closed.
2. Verify exact-head GitHub QA/production build.
3. Deliberately deploy the exact candidate and obtain fresh `/health` identity/profile readback.
4. Verify authenticated desktop and mobile workflows.
5. Verify failure/cancellation/diagnostic behavior.
6. Run the complete golden case twice on the same exact deployed revision/configuration.
7. Any candidate-affecting source/runtime-configuration change resets the two-run count.

### EA12 — Scientific validation

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

1. Render/runtime configuration reproducibility — #964
2. durable transcription checkpoint + Stage 10 memory-safe controlled proof — reopened #941
3. cloud-primary speaker processing — #970
4. persisted audio/transcript/speaker alignment — #971
5. historical-case rehydration — #963
6. reliable authenticated intake — #930
7. production observability/debug acceptance — #959
8. truthful frontend pipeline projection — #965
9. login wake/shared profiles/current role browser matrix — #931 / PR #974
10. release-critical public navigation — #932
11. evidence/assessment/report/history path on the same persisted case
12. frozen candidate and two complete same-revision/configuration golden runs — #972
13. scientific validation separately

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

The canonical contract remains 21 stages. Current maturity and runtime execution state are stage-specific and must come from the current implementation/runtime evidence rather than stale static labels. Provider readiness does not equal execution, and execution does not equal durable artifact persistence.

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
