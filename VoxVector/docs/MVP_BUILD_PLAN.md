# VoxVector MVP Build Plan

## Purpose

This document defines the shortest dependency-ordered path from the current repository state to a complete connected VoxVector product experience.

The canonical engineering-MVP exit criteria are maintained in [`MVP_RELEASE_GATE.md`](MVP_RELEASE_GATE.md). This build plan defines what to build and verify next; the release gate defines the evidence required before engineering MVP may be signed off.

## MVP definition

One real case must move through:

`create case → upload recording → provenance → decode → playback → waveform → real pipeline state → speech segmentation → speaker processing → transcription → alignment → eligibility/reliability → analytical tracks → evidence → synthesis → assessment → report → persistence → reopen`

The MVP is defined by connected real workflows, not screen count.

## Current execution checkpoint — 2026-09-10

**Current first source/configuration task:** reconcile the Render runtime profile into the sole canonical root Blueprint under #964, then execute the reopened #941 controlled runtime proof.

Canonical GitHub `main` is `420536771875c6948be51851118b58cb04a596e6`, the merge of PR #967. Exact-main VoxVector QA `34532394431` succeeded and GitHub Pages publication workflow `34532394423` succeeded.

Connected Render inspection shows deployment `dep-dahi2ics728c73b6ujug` `live` on exact source `420536771875c6948be51851118b58cb04a596e6`. Render auto-deploy is disabled and this deployment was triggered through the Render API. It does not verify the protected Developer Console **Deploy Now** path tracked by #920.

The current live Render service builds:

`pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`

The canonical root `render.yaml` instead specifies `api/requirements-transcription.txt`. The owner-provided Render export generated `2026-09-10T21:38:48Z` independently matches the live repository/service/root/build/start/health/domain/auto-deploy fields and redacts environment values with `sync: false`. Root `render.yaml` also declares `CORS_ORIGINS` as server-managed while the export does not list it. Issue #964 owns the field-by-field reconciliation. The export must not become a second Blueprint and its redacted values must not be inferred.

No fresh `/health` response for exact deployed `420536...` is recorded by the current synchronization pass. Render `live` is deployment evidence only.

### Historical controlled golden-source evidence

Case `3515362e-f801-463d-961a-df7b3302a596`, source `cbdcdbf8-e528-49b0-a474-5cd64588d301`, request `32fdb25aee704ee4ad0a0615e2496e09`, 183.3 seconds, 17,596,936 bytes, on older deployed source `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2` established:

- upload/private persistence succeeded;
- Stage 05 Speech Segmentation completed with 26 segments;
- faster-whisper executed `base`, CPU/int8, beam 1, one CPU thread, one worker, isolated child process;
- Stage 07 transcription completed in about 113 seconds with 58 timestamped segments and 246 timestamped words;
- Stage 08 alignment state was reached;
- API-parent RSS was about 134.75 MiB before post-provider cleanup and about 482.58 MiB after cleanup;
- the configured Stage 10 admission ceiling was 416 MiB;
- Stage 10 nevertheless started on that historical deployed source;
- Render later sampled 519,041,020 bytes against a 536,870,900-byte memory limit and the Python API process restarted;
- the owner confirmed the incident was a memory problem;
- the source recording survived in private Supabase Storage, but the transcript/provider artifact had not been durably checkpointed before downstream work.

The precise kernel-level termination mechanism is not separately claimed because Render did not emit a dedicated OOM/SIGKILL record for the run.

### Merged source repair and remaining production proof

PR #962 merged the first bounded backend reliability repair. PR #967 merged the reviewed follow-up as current `main`.

Current source now:

- prevents post-heavy cleanup from importing PyTorch merely for cleanup on the CPU path;
- persists completed acquisition/transcript/alignment/provider state to the same run before Stage 10;
- requires Stage 10 operational memory admission before it is represented as running;
- uses fail-fast process-wide single-flight admission for downstream composite analysis;
- rechecks RSS while holding the shared heavyweight lock and retains that lock through composite execution;
- prevents abandoned/timed-out requests from waiting behind the lock and executing later;
- preserves upstream artifacts when downstream admission fails;
- keeps the route-owned persisted `run_id` stable and records pipeline-internal identity separately as `pipeline_run_id`;
- uses a per-Python-process `process_instance_id` and preserves `render_instance_id` separately.

Issue #941 was closed at source merge despite remaining production criteria and has been reopened. After #964 fixes the reproducible runtime configuration, #941 must deliberately deploy/read back the intended runtime and rerun the same controlled WAV.

## P0 — Case spine

Status: **FUNCTIONAL / TESTED FOUNDATION; CURRENT-RUNTIME PROOF OPEN**.

The canonical case model preserves case identity, authenticated ownership, sources, provenance, stable run identity, status, and current run. Merged #945/#946 adds eligible stale/interrupted-run reconciliation, terminal run/failure reports, elapsed timing, and same-process per-case serialization.

Merged #962/#967 extend the same canonical run owner so successful upstream speech/provider evidence is checkpointed before dependent heavy downstream work and route-owned case-run identity survives pipeline finalization. They do not introduce another CaseStore or analysis record family.

Reopened #941 must prove this behavior on the reconciled production runtime.

## P1 — Intake and audio foundation

Status: **IMPLEMENTED FOUNDATION / INTERMITTENT RELIABILITY INVESTIGATION OPEN**.

Implemented: supported-file validation, size checks, WAV decoding, private source persistence, SHA-256 provenance, signed playback endpoint, upload progress/error handling, request correlation, storage diagnostics, and pre-handler 4xx evidence capture.

Historical controlled 17.6 MB WAV uploads passed real case upload and persistence, proving the historical memory incident occurred downstream of intake. That does not close intermittent production case-source HTTP 400 issue #930. It remains a separate reproducibility/bounding task before candidate freeze.

Remaining: authenticated browser playback verification and upload progress/cancel treatment under #928 after transport reliability is sufficiently bounded.

## P2 — Analysis Workspace foundation

Status: **ACTIVE IMPLEMENTATION**.

Implemented: case workspace shell, persisted source metadata, waveform generation, playback controls, spectrogram view, persisted pipeline-state inspection, elapsed/final run timing, transcript panel foundation, and Copy/Download controls for persisted engineering run/failure reports.

After #941 proves backend checkpoint durability and #970/#971 establish real speaker/alignment artifacts, #963 owns historical-case media/transcript/speaker/alignment/report rehydration through the existing authenticated playback endpoint. No duplicate workspace or storage model is required.

## P3 — Real pipeline lifecycle

Status: **FUNCTIONAL / TESTED SOURCE FOUNDATION; CONTROLLED RUNTIME PROOF OPEN**.

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

Merged #946 reconciles eligible interrupted runs and persists terminal reports. Merged #962/#967 add the durability, memory-admission, single-flight, process-provenance, and stable-run-identity boundary between completed provider work and Stage 10.

Current `voxvector/src/components/PipelineBuildCard.jsx` still has stale local Stage 05/06 ordering and queued Stage 07/08 fallback text. #965 owns correction in the existing frontend component so backend `pipeline_build.status_by_stage` becomes the mutable runtime authority when available.

## P4 — Speaker intelligence

Status: **CLOUD-PRIMARY PATH BUILT / CONTROLLED EXECUTION REQUIRED**.

The pyannoteAI cloud primary is represented separately from optional local Community-1 fallback and the case-analysis invocation gate remains explicit.

Issue #970 owns rechecking the current pyannoteAI media-upload/job contract, correcting the existing adapter if required, executing the cloud-primary provider against the golden source, persisting normalized speaker artifacts/provenance, and reading them back. Provider configuration/readiness is not execution.

#970 is blocked until #964 runtime reconciliation and accepted #941 controlled runtime proof.

## P5 — Production transcription

Status: **HISTORICAL CONTROLLED PROVIDER EXECUTION OBSERVED / CURRENT DURABILITY AND END-TO-END RUNTIME PROOF OPEN**.

The constrained faster-whisper profile has real execution evidence on historical deployed `f0dda136...`: transcription completed with 58 segments and 246 timestamped words.

The remaining gate is current execution of the merged durability/memory-safe transition. After #964, reopened #941 must prove completed transcript/alignment state is persisted before downstream work and Stage 10 either completes within the memory envelope or fails cleanly at admission without an API restart.

A successful transcript is provider execution evidence, not transcript truthfulness validation.

## P6 — Audio/transcript/speaker alignment

Status: **BUILT FOUNDATION / PERSISTED MULTIMODAL READBACK OPEN**.

Timestamped transcript words and segments can be projected into the shared case timeline. Historical controlled execution reached transcript alignment state, but the upstream artifact was not durably checkpointed before the later process restart on that old source.

Merged #962/#967 repair the same-run durability/run identity foundation. Speaker attribution remains dependent on controlled cloud-primary diarization. Issue #971 owns the persisted transcript/audio/speaker alignment proof after #970.

## P7 — Analytical observation layer

Status: **FOUNDATION IMPLEMENTED / BOUNDED STAGE 10 SOURCE MERGED / CURRENT RUNTIME PROOF OPEN**.

Primary observations include acoustic energy, F0, intensity, spectral measures, HNR, MFCC, formants, temporal/pause measures, and optional baseline/interaction/transcript observations.

Stage 10 source implementation exists and now has the bounded admission/single-flight protections from #967. The constrained Render runtime cannot be considered proven reliable until reopened #941 completes controlled production verification.

## P8 — Evidence architecture

Status: **FOUNDATION IMPLEMENTED / ACTIVE UI INTEGRATION**.

Observation and evidence records preserve method identity, source interval, quality, direction, and provenance. The next product step is exposing persisted records as an inspectable review surface connected to verified golden-case artifacts.

## P9 — Evidence synthesis

Status: **FOUNDATION / NOT VALIDATED INFERENCE**.

The architecture preserves convergence, conflict, dependence, and alternatives. Statistical dependence-aware inference remains part of the separate validation program.

## P10 — Assessment and report

Status: **ACTIVE BUILD**.

The product deliverable remains a canonical composed assessment/result contract followed by report generation from the persistent case. Reports must preserve eligibility/data quality, contributing evidence, convergence/conflict, uncertainty, alternatives, provenance, and disposition boundaries rather than hiding evidence behind a single dramatic score.

## P11 — Case history and return path

Status: **FOUNDATION PRESENT / ACTIVE HARDENING**.

Case list and retrieval are implemented. Merged #946 adds lifecycle reconciliation/report persistence. #948 / draft PR #951 owns auditable secure deletion. #963 owns reopened persisted audio/transcript/speaker/alignment/report presentation after the upstream runtime/provider artifacts are established.

## P12 — Observability and debugging

Status: **SOURCE FOUNDATION MERGED / PRODUCTION ACCEPTANCE OPEN**.

Render remains the native provider/runtime log surface. Supabase is the durable application-owned diagnostic archive.

Merged PRs #961, #966 and #968 provide:

- VoxVector diagnostic/provider logs in Render and Supabase-owned paths;
- parent case/request/run correlation to speech workers;
- bounded sanitized Render observation mirroring into Supabase;
- deterministic Render snapshot identity and separate process/Render provenance;
- server-generated **Download Debug Bundle**;
- explicit available/empty/unavailable evidence semantics.

Issue #959 now owns production acceptance: automatic terminal Render snapshot capture, one controlled Render+Supabase correlated copy, real bundle generation/redaction inspection, restart durability, and browser readback.

## P13 — Render infrastructure-as-code control

Status: **DRIFT IDENTIFIED / CURRENT FIRST SOURCE TASK**.

The existing root `render.yaml` is the sole canonical Blueprint owner. The current live Render service and owner export use `requirements-speech.txt`; the root Blueprint uses `requirements-transcription.txt`. `requirements-speech.txt` adds local `pyannote.audio`/PyTorch while the primary production diarization path is cloud `pyannote_api` and local Community-1 is optional fallback.

Root `render.yaml` also declares `CORS_ORIGINS` server-managed, while the owner export does not list it and backend source defaults to `*` when unset.

Issue #964 must reconcile the owner export/live service into the existing root file from actual source/runtime needs, preserve secrets externally, retain reproducible non-secret constraints in Git where supported, and verify that no duplicate service is provisioned.

## P14 — Authenticated entry, account/profile, frontend truth, and browser hardening

Status: **ACTIVE RELEASE WORKSTREAM**.

Current `main` `AuthGate.jsx` still does not issue the requested login-time API wake. Draft PR #974 under #931 contains the candidate one-shot `/health` wake and generalizes the existing self-profile implementation across developer/admin/user roles without creating duplicate profile stores. It must be refreshed against current `main`, rerun through current-base QA/Preview, merged after review, and then browser verified.

Issue #965 separately corrects the existing pipeline status card against the canonical backend contract. Issue #932 owns release-critical public CTA/anchor/mobile navigation defects. These are frontend application repairs, not backend capability claims.

## Developer Console operating model

The Developer Console is the engineering cockpit. Its operator status model must keep these states distinct:

- **BUILT** — implementation exists and compiles.
- **FUNCTIONAL** — required runtime workflow has actually executed successfully.
- **TESTED** — applicable software or manual verification has passed.
- **VALIDATED** — relevant scientific or operational validation is complete and documented.

It must also distinguish provider readiness from provider execution, provider execution from artifact durability, deployment from fresh runtime health, and runtime health from browser verification.

## Current dependency chain

1. complete #964 Render Blueprint/runtime-profile reconciliation in the existing root `render.yaml`;
2. deliberately deploy/read back the reconciled exact revision and complete reopened #941 with the same controlled WAV;
3. execute/persist cloud-primary diarization under #970;
4. persist/read back transcript/audio/speaker alignment under #971;
5. complete #963 historical case media/transcript/speaker/alignment/report rehydration;
6. bound #930 authenticated intake reliability and complete #959 production observability acceptance;
7. correct the existing frontend pipeline projection under #965;
8. refresh draft PR #974 against current `main`, rerun current-base QA, merge after review, and complete #931 auth/profile browser acceptance;
9. complete #932 release-critical public CTA/anchor/navigation behavior;
10. freeze one exact candidate revision/configuration under #972;
11. execute the complete golden case twice on that same exact deployed revision/configuration;
12. sign off engineering MVP through `MVP_RELEASE_GATE.md` only after all evidence gates pass;
13. continue scientific validation as a separate program.

## Definition of done

The connected product path is complete only when a real case moves from recording intake through synchronized audio, speaker and transcript analysis, evidence synthesis, assessment, reporting, persistence, and reopening through reproducible browser verification.

Engineering-MVP sign-off additionally requires the evidence in `MVP_RELEASE_GATE.md`, including two successful complete golden-case executions on the same exact deployed revision and stable candidate configuration. A source or candidate-runtime configuration change between those executions resets the repeatability proof.

## Revised next build order

**Phase EA0:** Render runtime profile reproducibility — #964 current first task  
**Phase EA1:** controlled post-transcription durability/Stage 10 proof — reopened #941  
**Phase EA2:** cloud-primary speaker diarization — #970  
**Phase EA3:** transcript/audio/speaker persisted alignment — #971  
**Phase EA4:** historical case rehydration — #963  
**Phase EA5:** intake reliability + production observability — #930 / #959  
**Phase EA6:** truthful frontend pipeline projection — #965  
**Phase EA7:** login wake/shared profiles + authenticated browser matrix — #931 / draft PR #974  
**Phase EA8:** release-critical public navigation — #932  
**Phase EA9:** exact deployed desktop/mobile golden-case verification twice on one frozen revision/configuration — #972

Existing telemetry, results, assessment, and scientific-validation infrastructure remains supporting architecture around these real engines.
