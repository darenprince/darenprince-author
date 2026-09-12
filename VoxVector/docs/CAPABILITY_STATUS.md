# VoxVector Capability Status

This document distinguishes the product end state from current implementation state and scientific validation state.

An unimplemented capability remains active product scope.

## Preserved runtime checkpoint — 2026-09-10

At the 2026-09-10 checkpoint, canonical GitHub `main` was `420536771875c6948be51851118b58cb04a596e6`, the merge of PR #967. Exact-main VoxVector QA `34532394431` succeeded and GitHub Pages publication workflow `34532394423` succeeded.

Connected Render inspection at that checkpoint showed `voxvector-api` deployment `dep-dahi2ics728c73b6ujug` `live` on exact source `420536771875c6948be51851118b58cb04a596e6` with automatic deployment disabled. The live service built `api/requirements.txt` plus `api/requirements-speech.txt`.

That historical checkpoint recorded repository/live dependency drift under #964. Issue #964 was subsequently completed after the sole root Blueprint was reconciled and sole-service inventory verified. The 2026-09-10 deployment observation is retained as historical evidence and is not used as proof of the current frontend PR candidate.

A controlled 183.3-second production case on older source `f0dda136...` established real faster-whisper execution:

- speech segmentation completed with 26 segments;
- faster-whisper executed `base`, CPU, int8, beam 1, one CPU thread, one worker, isolated child process;
- transcription completed in about 113 seconds;
- 58 transcript segments and 246 timestamped words were produced;
- the API process later restarted during the post-provider/downstream transition after memory entered the constrained service danger zone;
- the owner confirmed the failure was a memory problem;
- the completed transcript/provider artifact was not durably attached to the persisted run before downstream analysis started on that historical revision.

That changed the transcription evidence class from configuration/readiness-only to **controlled provider execution observed** for the historical run. It did not establish full production reliability, durable checkpointing, transcript correctness, browser verification, or scientific validation.

Merged PRs #962 and #967 implement the intended post-transcription durability, bounded Stage 10 admission, process/runtime provenance and stable run identity in source. Issue #941 remains reopened for controlled production proof.

## Canonical 21 stage capability map

| Stage | Current state | Product target |
|---|---|---|
| File Upload / Ingest | Integrated | Durable multi-format case intake |
| File Decode and Normalization | Integrated | Canonical normalized media pipeline |
| Provenance and Integrity | Integrated | Immutable source and run provenance |
| Channel and Recording Assessment | Integrated / expanding | Full recording and artifact assessment |
| Speech Segmentation | **Integrated; historical controlled production execution observed** | Production speech region segmentation |
| Speaker Identification / Diarization | **Cloud-primary provider path built; controlled cloud execution still required** | Production speaker-aware analysis |
| Transcription Generation | **Historical controlled faster-whisper execution observed; current durable/runtime proof open** | Production timestamped ASR |
| Transcript Alignment | **Built synchronized foundation; same-run checkpoint source merged; persisted multimodal proof open** | Word/audio/speaker synchronization |
| Eligibility and Reliability | Integrated | Complete eligibility and reliability gate |
| Acoustic Feature Extraction | Integrated source; bounded Stage 10 admission merged; controlled runtime proof open | Expanded acoustic observation layer |
| Prosodic and Voice Quality Analysis | Integrated foundation | Expanded prosodic and source analysis |
| Temporal and Pause Analysis | Integrated | Expanded interaction timing |
| Linguistic and Disfluency Analysis | Integrated when transcript supplied | Production linguistic intelligence |
| Question / Answer Alignment | Integrated when supplied | Full conversational alignment |
| Within Speaker Baseline | Integrated when baseline supplied | Persistent baseline workflows |
| Cross Method Evidence Assembly | Integrated | Expanded evidence graph |
| Evidence Convergence and Conflict | Integrated foundation | Dependence-aware multimethod synthesis |
| Candidate Classification | Integrated boundary | Validated task-specific candidate models |
| Validation and Calibration Gate | Planned research | Production validation gate |
| Final Classification / Disposition | Integrated boundary | Validated final disposition architecture |
| Audit and Provenance Output | Integrated | Complete auditable case package |

The canonical stage numbering places Speech Segmentation at Stage 05 and Speaker Identification / Diarization at Stage 06. Historical dated records may retain earlier numbering as historical evidence.

The existing Developer Console `PipelineBuildCard.jsx` is corrected in PR #993 to match that order, prefer backend `pipeline_build.status_by_stage` whenever available, label loading/offline source-contract fallback explicitly, and present Stage 07/08 fallback state consistently with the backend implemented-foundation contract. No alternate pipeline component was created.

## Live input and case capabilities

The authenticated case intake workflow supports case creation/list/retrieval, WAV source upload, metadata extraction, SHA-256 provenance, private media storage, signed playback, source provenance persistence, case-bound analysis runs, live persisted run state, interruption recovery, and prior-run review.

Historical controlled cases confirm that a 17,596,936-byte source can persist and survive a later API restart. Separate intermittent intake issue #930 remains open and is not closed by successful uploads.

## Speech runtime contract

### Transcription

Current constrained source profile:

- provider: `faster_whisper`
- model: `base`
- device: `cpu`
- compute type: `int8`
- beam size: `1`
- CPU threads: `1`
- workers: `1`
- isolated child process: enabled
- child deadline: `165` seconds

Historical production execution of this beam-1 profile was observed on exact deployed source `f0dda136...`. Merged #962/#967 contain the durability and Stage 10 resource-safety path. Reopened #941 must prove the current implementation in controlled production.

### Diarization

- primary provider: `pyannote_api`
- cloud API credential is server-side only
- case-route invocation gate: `VOXVECTOR_ENABLE_DIARIZATION_RUNS`
- local fallback: `pyannote_local`
- local fallback is explicit and requires separate configuration/credential readiness
- successful controlled cloud-primary execution: not yet established in the current release-gate evidence

The local Community-1 path and its PyTorch dependency are not required merely to call the cloud-primary `pyannote_api` adapter.

Issue #970 owns rechecking/correcting the current pyannoteAI cloud media-upload/job contract and obtaining real provider execution plus persisted speaker evidence after the separate #941 runtime proof.

## Post-transcription durability and memory boundary

A provider call is not considered durably integrated merely because it returned successfully in memory.

The case-run boundary is:

`provider completion → normalized acquisition/alignment → durable same-run checkpoint → Stage 10 route preflight → fail-fast shared composite admission + locked RSS recheck → downstream composite analysis while admitted`

Merged source preserves the acquired transcript, alignment, provider state/timing, completed upstream stage states, stable run identity, and process/runtime provenance before dependent heavy work begins.

On the constrained Render path, Stage 10 must not be represented as running until current process RSS passes the configured operational memory-admission check. A competing composite call must fail fast rather than wait behind the heavyweight lock and execute after its route has timed out. If admission fails, the upstream transcript/alignment checkpoint remains valid while downstream work records an explicit bounded failure/not-run state.

This memory-admission gate is operational safety and is separate from analytical Eligibility and Reliability.

## Process, hosting and run provenance

`process_instance_id` identifies the current Python API process and must change across Python process restarts.

`render_instance_id` identifies the Render infrastructure instance when available and is stored separately. A Render instance label may survive an internal Python process restart, so it cannot serve as the sole process identity for interruption recovery.

The persisted route-owned `run_id` remains the case-run identity. The pipeline-internal analytical UUID is preserved separately as `pipeline_run_id` and must not replace it.

## Developer Console status

The Developer Console remains the engineering cockpit with runtime health, case workflow, 21-stage status, live run polling, synchronized waveform/transcript review, diagnostics, Render runtime, methodology and pipeline navigation, structured audits, and report/audit/log copy/download controls.

The frontend API client continues to route case, diagnostics, health and Render operations through the preserved VoxVector backend contract. PR #993 adds source-level contract tests that trace the client routes to `VoxVector/api/app.py` and the mounted `VoxVector/api/render_api.py` router. That establishes source wiring only; it is not backend/provider execution or browser verification.

Merged PRs #961/#966/#968 provide the observability/Debug Bundle source foundation. #959 remains open for production dual-copy/bundle/terminal-capture/browser acceptance.

The console must display execution readiness independently from provider execution, artifact durability, resource stability, browser verification, and scientific validation.

## Authentication and self-profile status

Current merged `AuthGate.jsx` performs a non-blocking canonical API wake after successful password login before trusted-role routing settles. Shared developer/admin/user self-profile behavior remains in the canonical role-aware account implementation.

The login wake is connectivity/readiness behavior only. It is not provider execution, deployment proof, successful analysis, or scientific validation. Authenticated desktop/mobile browser acceptance remains separate.

## Public frontend navigation status — PR #993

PR #993 repairs the canonical public application rather than creating replacement pages:

- Request Access routes to `/voxvector/login`;
- landing/menu/footer anchors are route-qualified and map to unique current landing sections;
- Pipeline and Analysis Methods use the existing styled frontend references instead of raw repository Markdown where those styled surfaces exist;
- `/voxvector/site-map` is a human-readable inventory rendered through the existing React public shell;
- GitHub Pages and PR Preview staging create physical direct-route entries for `developer`, `login`, `app`, and `site-map`, all serving the same built React application rather than duplicate implementations;
- hash restoration honors direct load, refresh and browser navigation instead of forcing every hash load to page top.

Source/build QA and production/browser acceptance remain separate evidence classes.

## Operational status boundaries

| Area | State |
|---|---|
| Case persistence API | implemented |
| Case-bound analysis API | implemented |
| Speech segmentation | historical controlled production execution observed |
| Transcription provider | historical controlled beam-1 execution observed |
| Transcript artifact durability before downstream failure | implementation merged; current production proof reopened in #941 |
| Stage 10 constrained-memory/single-flight admission | implementation merged; current production proof reopened in #941 |
| Diarization primary provider | pyannoteAI cloud architecture built; controlled primary execution still required #970 |
| Local diarization fallback | optional explicit path; not primary |
| Transcript/speaker alignment | foundation implemented; controlled durable provider-backed readback still required #971 |
| Frontend pipeline projection | corrected in PR #993 source; exact-head QA/browser acceptance remain separate |
| Public CTA/anchors/site map | corrected in PR #993 source; exact-head QA/browser acceptance remain separate |
| Login wake/shared self-profile | merged source behavior; browser acceptance remains separate |
| Browser verification | separate unresolved gate |

Historical deployment revisions and workflow runs remain recorded in dated checkpoints and QA documents. They are not silently promoted into current deployment evidence for a later source revision.

## Current engineering sequence

1. Complete exact-head source QA/review for PR #993 and preserve browser acceptance as a separate gate.
2. Complete reopened #941 with the controlled WAV on an explicitly observed deployed revision.
3. Execute cloud-primary diarization under #970 and persist speaker turns/provenance.
4. Produce/persist transcript/audio/speaker alignment under #971.
5. Complete #963 reopened-case audio/transcript/speaker/alignment/report rehydration through the existing authenticated playback route.
6. Bound #930 intake reliability and complete #959 observability production acceptance.
7. Complete #932/#965 authenticated desktop/mobile frontend acceptance before the final freeze.
8. Freeze one exact deployed candidate and complete two same-revision/configuration golden cases under #972.
9. Continue task-specific scientific validation as a separate program.

## Scientific status rule

Implementation, configuration, execution, software testing, artifact persistence, runtime reliability, engineering-MVP completion, and scientific validation are separate states. Provider execution does not establish transcript truthfulness, verified speaker identity, or deception inference validity. A single vocal or behavioral feature is not sufficient proof of deception.

## Documentation authority

- `docs/MASTER_METHOD_INDEX.md` — complete data point inventory
- `docs/ANALYSIS_METHODS.md` — method definitions
- `docs/METHOD_QA_MATRIX.md` — software QA controls
- `docs/VALIDATION.md` — scientific validation requirements
- `docs/ROADMAP.md` — future development
- `docs/ANALYSIS_PIPELINE.md` — canonical 21-stage dependency contract
- `docs/MVP_BUILD_PLAN.md` — fastest connected implementation path
- `docs/MVP_RELEASE_GATE.md` — canonical engineering-MVP exit gate
- `docs/PIPELINE_BUILD_STATUS.md` — current 21-stage build/runtime state
- `docs/CURRENT_ENGINEERING_STATE_2026-09-04.md` — current implementation snapshot
- `docs/QA_STATUS.md` — software QA state
- `docs/DEPLOYMENT_BOUNDARY.md` and `docs/DEPLOYMENT_VARIABLE_MATRIX.md` — deployment/runtime ownership
- `docs/RUNTIME_MEMORY_CONSTRAINTS.md` — constrained runtime memory behavior

Historical capability statements remain preserved in versioned checkpoints; this file is the current capability record.

## Transcript-derived linguistic evidence

When provider-backed transcription returns a normalized transcript and that artifact is available to the case-analysis path, the canonical transcript evidence builder can persist observations and normalized evidence records into the case result. Stage 13 reports actual completion or failure from that execution boundary rather than being assumed complete merely because Stage 07 returned.

The merged durability repair is designed so a successfully completed upstream transcript can survive a later downstream failure. That improves engineering reliability only; it does not establish scientific validity for transcript-derived evidence.
