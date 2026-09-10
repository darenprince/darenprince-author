# VoxVector Capability Status

This document distinguishes the product end state from current implementation state and scientific validation state.

An unimplemented capability remains active product scope.

## Latest observed runtime checkpoint — 2026-09-10

Current canonical GitHub `main` is `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2`. Connected Render inspection shows `voxvector-api` deployment `dep-dah7usjl550s73e00350` live on that exact source with automatic deployment disabled.

The live Render service currently builds `api/requirements.txt` plus `api/requirements-speech.txt`, while the canonical root `render.yaml` specifies `api/requirements-transcription.txt`. That infrastructure drift is tracked separately in #964 and is not silently treated as resolved.

A controlled 183.3-second production case on `f0dda136...` established real faster-whisper execution:

- speech segmentation completed with 26 segments;
- faster-whisper executed `base`, CPU, int8, beam 1, one CPU thread, one worker, isolated child process;
- transcription completed in about 113 seconds;
- 58 transcript segments and 246 timestamped words were produced;
- the API process later restarted during the post-provider/downstream transition after memory entered the constrained service danger zone;
- the owner confirmed the failure was a memory problem;
- the completed transcript/provider artifact was not durably attached to the persisted run before downstream analysis started on that deployed revision.

This changes the transcription evidence class from configuration/readiness-only to **controlled provider execution observed**. It does not establish full production reliability, durable checkpointing, transcript correctness, browser verification, or scientific validation.

Active #941 / PR #962 repairs the post-transcription memory and durability boundary before the capability can be promoted further.

## Canonical 21 stage capability map

| Stage | Current state | Product target |
|---|---|---|
| File Upload / Ingest | Integrated | Durable multi-format case intake |
| File Decode and Normalization | Integrated | Canonical normalized media pipeline |
| Provenance and Integrity | Integrated | Immutable source and run provenance |
| Channel and Recording Assessment | Integrated / expanding | Full recording and artifact assessment |
| Speech Segmentation | **Integrated; controlled production execution observed** | Production speech region segmentation |
| Speaker Identification / Diarization | **Execution-ready cloud primary configured; controlled cloud execution next** | Production speaker-aware analysis |
| Transcription Generation | **Controlled faster-whisper execution observed; reliability/durable checkpoint repair active** | Production timestamped ASR |
| Transcript Alignment | **Built synchronized foundation; Stage 08 completion observed but durable checkpoint repair active** | Word/audio/speaker synchronization |
| Eligibility and Reliability | Integrated | Complete eligibility and reliability gate |
| Acoustic Feature Extraction | Integrated source; constrained-production memory admission repair active | Expanded acoustic observation layer |
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

## Live input and case capabilities

The authenticated case intake workflow supports case creation/list/retrieval, WAV source upload, metadata extraction, SHA-256 provenance, private media storage, signed playback, source provenance persistence, case-bound analysis runs, live persisted run state, interruption recovery, and prior-run review.

The controlled September 10 case confirms that the 17,596,936-byte source persisted successfully and remained available through the later runtime restart. Separate intermittent intake issue #930 remains open and is not closed by one successful source upload.

## Speech runtime contract

### Transcription

Current constrained source/runtime profile:

- provider: `faster_whisper`
- model: `base`
- device: `cpu`
- compute type: `int8`
- beam size: `1`
- CPU threads: `1`
- workers: `1`
- isolated child process: enabled
- child deadline: `165` seconds

Production execution of this beam-1 profile has been observed on exact deployed source `f0dda136...`. The remaining active #941 defect is post-provider memory containment and durable upstream artifact checkpointing before Stage 10.

### Diarization

- primary provider: `pyannote_api`
- cloud API credential is server-side only
- case-route invocation gate: `VOXVECTOR_ENABLE_DIARIZATION_RUNS`
- local fallback: `pyannote_local`
- local fallback is explicit and requires separate configuration/credential readiness
- successful controlled cloud-primary execution: not yet established in the current release-gate evidence

The local Community-1 path and its PyTorch dependency are not required merely to call the cloud-primary `pyannote_api` adapter. Live Render dependency drift involving the broader speech requirements is therefore tracked in #964 rather than treated as inherent to the cloud-primary architecture.

## Post-transcription durability and memory boundary

A provider call is not considered durably integrated merely because it returned successfully in memory.

The intended case-run boundary is:

`provider completion → normalized acquisition/alignment → durable same-run checkpoint → Stage 10 memory admission → downstream composite analysis`

The checkpoint preserves the acquired transcript, alignment, provider state/timing, completed upstream stage states, stable run identity, and process/runtime provenance before dependent heavy work begins.

On the constrained Render path, Stage 10 must not be represented as running until current process RSS passes the configured operational memory-admission check. If admission fails, the upstream transcript/alignment checkpoint remains valid while downstream work records an explicit bounded failure/not-run state.

This memory-admission gate is operational safety and is separate from analytical Eligibility and Reliability.

## Process and hosting provenance

`process_instance_id` identifies the current Python API process and must change across Python process restarts.

`render_instance_id` identifies the Render infrastructure instance when available and is stored separately. A Render instance label may survive an internal Python process restart, so it cannot serve as the sole process identity for interruption recovery.

## Developer Console status

The Developer Console remains the engineering cockpit with runtime health, case workflow, 21-stage status, live run polling, synchronized waveform/transcript review, diagnostics, Render runtime, methodology and pipeline navigation, structured audits, and report/audit/log copy/download controls.

The console must display execution readiness independently from provider execution, artifact durability, resource stability, browser verification, and scientific validation.

## Operational status

| Area | State |
|---|---|
| Render backend | live on exact `f0dda136...` deployment `dep-dah7usjl550s73e00350` |
| Render auto-deploy | disabled |
| Current live dependency command | `requirements.txt` + `requirements-speech.txt` |
| Canonical Blueprint dependency command | `requirements.txt` + `requirements-transcription.txt`; reconciliation tracked in #964 |
| Case persistence API | implemented |
| Case-bound analysis API | implemented |
| Speech segmentation | controlled production execution observed |
| Transcription provider | controlled beam-1 execution observed |
| Transcript artifact durability before downstream failure | repair active in #941 / PR #962 |
| Stage 10 constrained-memory admission | repair active in #941 / PR #962 |
| Diarization primary provider | pyannoteAI cloud configured architecture; controlled primary execution still required |
| Local diarization fallback | optional explicit path; not primary |
| Transcript/speaker alignment | foundation implemented; controlled durable provider-backed readback still required |
| Current-commit QA for PR #962 | final exact-head execution required before merge recommendation |
| Browser verification | separate unresolved gate |

## Current engineering sequence

1. Complete #941 / PR #962 source repair for cleanup, upstream checkpointing, Stage 10 memory admission, stable run identity, and process-vs-Render-instance provenance.
2. Run exact-head VoxVector QA, Preview/applicable security checks, documentation synchronization, and audit readback before merge recommendation.
3. Deliberately deploy the reviewed revision to Render and read back exact `/health` source/process/memory settings.
4. Execute the same controlled WAV and verify transcription checkpoint persistence plus Stage 10 completion or explicit bounded admission failure without process restart.
5. Complete #959 / PR #961 durable Render + Supabase logging/correlation and one-click Debug Bundle.
6. Execute the configured pyannoteAI cloud primary with `VOXVECTOR_ENABLE_DIARIZATION_RUNS=true`; persist speaker turns and provenance.
7. Produce and persist transcript/audio/speaker alignment under the same case/run identity.
8. Complete #963 reopened-case audio/transcript rehydration through the existing authenticated playback route.
9. Integrate speaker-aware acoustic aggregation, baseline comparisons, question/response context, Review Evidence, assessment, reporting, and history/reopen.
10. Complete exact deployed desktop/mobile golden-case verification twice on the same revision before engineering-MVP sign-off.
11. Continue task-specific scientific validation as a separate program.

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
- `docs/PIPELINE_BUILD_STATUS.md` — current 21-stage build/runtime state
- `docs/CURRENT_ENGINEERING_STATE_2026-09-04.md` — current implementation snapshot
- `docs/QA_STATUS.md` — software QA state
- `docs/RUNTIME_MEMORY_CONSTRAINTS.md` — constrained runtime memory behavior

Historical capability statements remain preserved in versioned checkpoints; this file is the current capability record.

## Transcript-derived linguistic evidence

When provider-backed transcription returns a normalized transcript and that artifact is available to the case-analysis path, the canonical transcript evidence builder can persist observations and normalized evidence records into the case result. Stage 13 reports actual completion or failure from that execution boundary rather than being assumed complete merely because Stage 07 returned.

The active durability repair ensures a successfully completed upstream transcript can survive a later downstream failure. That improves engineering reliability only; it does not establish scientific validity for transcript-derived evidence.
