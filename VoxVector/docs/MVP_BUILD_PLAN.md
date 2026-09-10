# VoxVector MVP Build Plan

## Purpose

This document defines the shortest dependency-ordered path from the current repository state to a complete connected VoxVector product experience.

The canonical engineering-MVP exit criteria are maintained in [`MVP_RELEASE_GATE.md`](MVP_RELEASE_GATE.md). This build plan defines what to build and verify next; the release gate defines the evidence required before engineering MVP may be signed off.

## MVP definition

One real case must move through:

`create case → upload recording → provenance → decode → playback → waveform → real pipeline state → speech segmentation → speaker processing → transcription → alignment → eligibility/reliability → analytical tracks → evidence → synthesis → assessment → report → persistence → reopen`

The MVP is defined by connected real workflows, not screen count.

## Current execution checkpoint — 2026-09-10

**Current engineering stage:** contain the confirmed post-transcription memory failure and make completed speech evidence durable before downstream analysis.

Canonical GitHub `main` is `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2`, the merge of PR #960's bounded beam-1 source/profile correction.

Connected Render inspection shows deployment `dep-dah7usjl550s73e00350` `live` on exact source `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2`. Render auto-deploy is disabled. The deployment was triggered through the Render API and does not verify the protected Developer Console **Deploy Now** path tracked by #920.

The current live Render service builds:

`pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`

The canonical root `render.yaml` instead specifies `api/requirements-transcription.txt`. Issue #964 owns that infrastructure-as-code drift. The downloaded Render Blueprint export must be reconciled into the existing root Blueprint rather than committed as a duplicate.

### Latest controlled golden-source evidence

Case `3515362e-f801-463d-961a-df7b3302a596`, source `cbdcdbf8-e528-49b0-a474-5cd64588d301`, request `32fdb25aee704ee4ad0a0615e2496e09`, 183.3 seconds, 17,596,936 bytes:

- upload/private persistence succeeded;
- Stage 05 Speech Segmentation completed with 26 segments;
- faster-whisper executed `base`, CPU/int8, beam 1, one CPU thread, one worker, isolated child process;
- Stage 07 transcription completed in about 113 seconds with 58 timestamped segments and 246 timestamped words;
- Stage 08 alignment state was reached;
- API-parent RSS was about 134.75 MiB before post-provider cleanup and about 482.58 MiB after cleanup;
- the configured Stage 10 admission ceiling was 416 MiB;
- Stage 10 nevertheless started on the deployed source;
- Render later sampled 519,041,020 bytes against a 536,870,900-byte memory limit and the Python API process restarted;
- the owner confirmed the incident was a memory problem;
- the source recording survived in private Supabase Storage, but the transcript/provider artifact had not been durably checkpointed before downstream work.

The precise kernel-level termination mechanism is not separately claimed because Render did not emit a dedicated OOM/SIGKILL record for the run.

### Active source repair

Issue #941 / draft PR #962 owns one bounded backend reliability subsystem:

- prevent post-heavy cleanup from importing PyTorch merely for cleanup;
- persist completed acquisition/transcript/alignment/provider state to the same run before Stage 10;
- require Stage 10 memory admission before it is represented as running;
- preserve upstream artifacts when downstream admission fails;
- keep a stable case run ID through finalization;
- use a per-Python-process `process_instance_id` and preserve `render_instance_id` separately.

This branch is not production behavior until final exact-head QA passes, it is reviewed/merged, deliberately deployed, and the runtime is read back.

## P0 — Case spine

Status: **FUNCTIONAL / TESTED FOUNDATION; DURABILITY HARDENING ACTIVE**.

The canonical case model preserves case identity, authenticated ownership, sources, provenance, stable run identity, status, and current run. Merged #945/#946 adds eligible stale/interrupted-run reconciliation, terminal run/failure reports, elapsed timing, and same-process per-case serialization.

PR #962 extends the same canonical run owner so successful upstream speech/provider evidence is checkpointed before dependent heavy downstream work. It does not introduce another CaseStore or analysis record family.

## P1 — Intake and audio foundation

Status: **IMPLEMENTED FOUNDATION / INTERMITTENT RELIABILITY INVESTIGATION OPEN**.

Implemented: supported-file validation, size checks, WAV decoding, private source persistence, SHA-256 provenance, signed playback endpoint, upload progress/error handling, request correlation, storage diagnostics, and pre-handler 4xx evidence capture.

The latest controlled 17.6 MB WAV passed the real case upload and persisted successfully, proving the current memory incident is downstream of intake. That does not close intermittent production case-source HTTP 400 issue #930. It remains a separate reproducibility/bounding task.

Remaining after reliability closure: authenticated browser playback verification and upload progress/cancel treatment under #928.

## P2 — Analysis Workspace foundation

Status: **ACTIVE IMPLEMENTATION**.

Implemented: case workspace shell, persisted source metadata, waveform generation, playback controls, spectrogram view, persisted pipeline-state inspection, elapsed/final run timing, transcript panel foundation, and Copy/Download controls for persisted engineering run/failure reports.

After #941 establishes backend transcript checkpoint durability, #963 owns historical-case media/transcript rehydration through the existing authenticated playback endpoint. No duplicate workspace or storage model is required.

## P3 — Real pipeline lifecycle

Status: **FUNCTIONAL / TESTED FOUNDATION; MEMORY-SAFE TRANSITION ACTIVE**.

The 21-stage identifiers and persisted per-run state contract exist. The canonical backend order is:

1. File Upload / Ingest
2. File Decode and Normalization
3. Provenance and Integrity
4. Channel and Recording Assessment
5. Speech Segmentation
6. Speaker Identification / Diarization
7. Transcription Generation
8. Transcript Alignment
9. Eligibility and Reliability
10. Acoustic Feature Extraction
11. Prosodic and Voice Quality Analysis
12. Temporal and Pause Analysis
13. Linguistic and Disfluency Analysis
14. Question / Answer Alignment
15. Within Speaker Baseline
16. Cross Method Evidence Assembly
17. Evidence Convergence and Conflict
18. Candidate Classification
19. Validation and Calibration Gate
20. Final Classification / Disposition
21. Audit and Provenance Output

Merged #946 reconciles eligible interrupted runs and persists terminal reports. PR #962 adds the missing durability/admission boundary between completed Stage 07/08 provider work and Stage 10.

## P4 — Speaker intelligence

Status: **EXECUTION-READY CLOUD-PRIMARY PATH / CONTROLLED EXECUTION REQUIRED**.

The configured pyannoteAI cloud primary is represented separately from optional local Community-1 fallback and the case-analysis invocation gate remains explicit.

Engineering MVP requires actual cloud-primary execution against the golden source, normalized speaker artifact persistence, provider provenance, and readback. Provider configuration/readiness is not execution.

Execution owner until promoted: tracker #915 identifier `VV-DIARIZE`.

## P5 — Production transcription

Status: **CONTROLLED PROVIDER EXECUTION OBSERVED / END-TO-END RELIABILITY NOT YET CLOSED**.

The constrained faster-whisper profile now has real execution evidence on exact deployed `f0dda136...`: transcription completed with 58 segments and 246 timestamped words.

The remaining blocker is not provider startup or beam configuration. It is the post-provider memory/durability transition. #941 / PR #962 must prove that completed transcript/alignment state is persisted before downstream work and that Stage 10 either completes within the memory envelope or fails cleanly at admission without an API restart.

A successful transcript is provider execution evidence, not transcript truthfulness validation.

## P6 — Audio/transcript/speaker alignment

Status: **BUILT FOUNDATION / DURABLE READBACK AND SPEAKER EXECUTION NEXT**.

Timestamped transcript words and segments can be projected into the shared case timeline. The latest controlled run reached transcript alignment state, but its normalized upstream artifact was not durably checkpointed before the later process restart.

PR #962 repairs the checkpoint boundary. Speaker attribution remains dependent on controlled cloud-primary diarization and persisted speaker turns.

Execution owner until promoted: tracker #915 identifier `VV-ALIGN`.

## P7 — Analytical observation layer

Status: **FOUNDATION IMPLEMENTED / CONSTRAINED RUNTIME MEMORY GATE ACTIVE**.

Primary observations include acoustic energy, F0, intensity, spectral measures, HNR, MFCC, formants, temporal/pause measures, and optional baseline/interaction/transcript observations.

Stage 10 source implementation exists. The current constrained Render runtime cannot be considered reliable until the post-transcription memory-admission repair is deployed and rerun.

## P8 — Evidence architecture

Status: **FOUNDATION IMPLEMENTED / ACTIVE UI INTEGRATION**.

Observation and evidence records preserve method identity, source interval, quality, direction, and provenance. The next product step is exposing persisted records as an inspectable review surface connected to verified golden-case artifacts.

## P9 — Evidence synthesis

Status: **FOUNDATION / NOT VALIDATED INFERENCE**.

The architecture preserves convergence, conflict, dependence, and alternatives. Statistical dependence-aware inference remains part of the separate validation program.

## P10 — Assessment and report

Status: **ACTIVE BUILD**.

The next product deliverable remains a canonical composed assessment/result contract followed by report generation from the persistent case. Reports must preserve eligibility/data quality, contributing evidence, convergence/conflict, uncertainty, alternatives, provenance, and disposition boundaries rather than hiding evidence behind a single dramatic score.

## P11 — Case history and return path

Status: **FOUNDATION PRESENT / ACTIVE HARDENING**.

Case list and retrieval are implemented. Merged #946 adds lifecycle reconciliation/report persistence. #948 / draft PR #951 owns auditable secure deletion. #963 owns reopened persisted audio/transcript presentation after #941 establishes the durable backend checkpoint.

## P12 — Observability and debugging

Status: **PARTIAL FOUNDATION / P0 FOLLOW-ON READY**.

Render remains the native provider/runtime log surface. Supabase is the durable application-owned diagnostic archive.

Issue #959 / draft PR #961 is queued immediately after #941 to:

- preserve VoxVector diagnostic/provider logs in Render and Supabase;
- propagate parent case/request/run correlation to speech workers;
- mirror bounded sanitized Render observations into Supabase;
- capture terminal analysis log context;
- provide one server-generated **Download Debug Bundle** for a case/run.

Logging work remains separate from #941 source changes.

## P13 — Render infrastructure-as-code control

Status: **DRIFT IDENTIFIED / RECONCILIATION QUEUED**.

The existing root `render.yaml` is the sole canonical Blueprint owner. The current live Render service uses `requirements-speech.txt`; the root Blueprint uses `requirements-transcription.txt`. Issue #964 will reconcile the downloaded Render export/live service into that same file, preserve secrets externally, retain reproducible non-secret constraints in Git, and verify that no duplicate service is provisioned.

## P14 — Browser verification and production hardening

Status: **ACTIVE QA WORKSTREAM**.

Remaining verification must traverse the exact deployed authenticated browser workflow, signed media, Analysis Workspace, diagnostics, desktop/mobile, keyboard, reduced motion, failure/cancellation paths, production artifact readback, and revision identity.

A deployment is not browser verification.

## Developer Console operating model

The Developer Console is the engineering cockpit. Its operator status model must keep these states distinct:

- **BUILT** — implementation exists and compiles.
- **FUNCTIONAL** — required runtime workflow has actually executed successfully.
- **TESTED** — applicable software or manual verification has passed.
- **VALIDATED** — relevant scientific or operational validation is complete and documented.

It must also distinguish provider readiness from provider execution, provider execution from artifact durability, deployment from runtime health, and runtime health from browser verification.

## Current dependency chain

1. finish #941 / PR #962 memory containment and upstream checkpoint source work;
2. complete exact-head QA, Preview/applicable security checks, documentation/Crown synchronization and audit;
3. merge only after review/authorization;
4. deliberately deploy the reviewed revision to Render;
5. capture fresh `/health` proving exact source, beam 1, per-process identity, Render-instance provenance and memory-admission configuration;
6. rerun the same controlled WAV and require transcript/alignment checkpoint readback plus Stage 10 completion or clean admission failure without restart;
7. complete #959 / PR #961 dual logging/correlation/debug bundle;
8. execute controlled pyannoteAI cloud-primary diarization (`VV-DIARIZE`);
9. persist/read back transcript/audio/speaker alignment (`VV-ALIGN`);
10. complete #963 historical case media/transcript rehydration;
11. close remaining intake, cancellation, deletion, auth/admin, navigation and browser gates;
12. complete Analysis Results, Review Evidence, report and return path;
13. run the complete golden case twice on the same exact deployed revision;
14. sign off engineering MVP through `MVP_RELEASE_GATE.md`;
15. continue scientific validation as a separate program.

## Definition of done

The connected product path is complete only when a real case moves from recording intake through synchronized audio, speaker and transcript analysis, evidence synthesis, assessment, reporting, persistence, and reopening through reproducible browser verification.

Engineering-MVP sign-off additionally requires the evidence in `MVP_RELEASE_GATE.md`, including two successful complete golden-case executions on the same exact deployed revision. A source change between those executions resets the repeatability proof for the new candidate.

## Revised next build order

**Phase EA0:** intake reliability — #930 remains open; latest controlled upload succeeded  
**Phase EA1:** media profile and speech timeline foundation — implemented; controlled execution observed  
**Phase EA2:** transcription — beam-1 execution observed; #941 memory/durability repair active  
**Phase EA3:** durable provider checkpoint + Stage 10 memory admission — PR #962  
**Phase EA4:** durable operational logs/correlation/debug bundle — #959 / PR #961  
**Phase EA5:** cloud-primary speaker diarization — controlled execution next  
**Phase EA6:** transcript/audio/speaker alignment readback  
**Phase EA7:** evidence consumers, Review Evidence, assessment/report/history/reopen  
**Phase EA8:** exact deployed desktop/mobile golden-case verification twice on one revision

Existing telemetry and results infrastructure remains supporting architecture around these real engines.
