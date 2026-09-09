# VoxVector Capability Status

This document distinguishes the product end state from current implementation state and scientific validation state.

An unimplemented capability remains active product scope.

## Latest observed runtime checkpoint — 2026-09-07

The live Render runtime now reports a healthy configured speech environment:

- backend pipeline `0.2.26`
- source revision `73ac03ded08c161e092ee2a4ecbbed7d036771c8`
- runtime self-test `passed`
- diagnostic/media storage `configured_media_ready`
- media storage `true`
- faster-whisper provider configured and execution-ready
- pyannoteAI cloud primary provider configured and execution-ready
- local pyannote fallback disabled and not execution-ready

The canonical case-analysis route now contains the transcription invocation path and persists acquired transcript artifacts into the run record. This is a **built integration path**; stages 05, 07, and 08 are not promoted to functional production execution until controlled provider execution and artifact persistence are demonstrated on a real run.

## Canonical 21 stage capability map

| Stage | Current state | Product target |
|---|---|---|
| File Upload / Ingest | Integrated | Durable multi-format case intake |
| File Decode and Normalization | Integrated | Canonical normalized media pipeline |
| Provenance and Integrity | Integrated | Immutable source and run provenance |
| Channel and Recording Assessment | Integrated / expanding | Full recording and artifact assessment |
| Speaker Identification / Diarization | **Execution-ready cloud primary configured; controlled execution next** | Production speaker-aware analysis |
| Speech Segmentation | **Integrated** | Production speech region segmentation |
| Transcription Generation | **Built invocation path; provider execution verification next** | Production timestamped ASR |
| Transcript Alignment | **Built synchronized workspace foundation; provider-backed verification next** | Word and audio synchronization |
| Eligibility and Reliability | Integrated | Complete eligibility and reliability gate |
| Acoustic Feature Extraction | Integrated | Expanded acoustic observation layer |
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

## Live input and case capabilities

The authenticated case intake workflow supports case creation/list/retrieval, WAV source upload, metadata extraction, SHA-256 provenance, private media storage, signed playback, source provenance persistence, case-bound analysis runs, live persisted run state, and prior-run review.

## Speech runtime contract

### Transcription

- provider: `faster_whisper`
- adapter: installed
- execution readiness: `true`
- model setting: `VOXVECTOR_WHISPER_MODEL` (Render configured to `base`)
- device: `cpu`
- compute type: `int8`
- beam size: `3`

### Diarization

- primary provider: `pyannote_api`
- cloud API-key presence: `true`
- primary execution readiness: `true`
- case-route invocation gate: `VOXVECTOR_ENABLE_DIARIZATION_RUNS`; this must be enabled for case analysis to invoke diarization and is separate from `/health` provider readiness
- local fallback: `pyannote_local`
- local fallback configuration: `VOXVECTOR_DIARIZATION_FALLBACK=pyannote_local` plus `VOXVECTOR_DIARIZATION_FALLBACK_ENABLED=true`
- local fallback readiness at latest observed runtime: `false`
- successful execution: not established

## Developer Console status

The Developer Console remains the engineering cockpit with runtime health, case workflow, 21-stage status, live run polling, synchronized waveform/transcript review, diagnostics, Render runtime, methodology and pipeline navigation, structured audits, and report/audit/log copy/download controls.

The console must display execution readiness independently from provider execution and scientific validation.

## Operational status

| Area | State |
|---|---|
| Render backend | working live runtime |
| `/health` | observed working |
| Runtime self test | observed passed |
| Diagnostic/media storage | configured and media-ready |
| Case persistence API | implemented |
| Case-bound analysis API | implemented |
| Speech adapters | installed |
| Transcription provider | configured / execution-ready |
| Diarization primary provider | pyannoteAI cloud configured / execution-ready |
| Local diarization fallback | disabled / not ready |
| Diarization route gate | explicit environment gate; must be enabled separately from provider readiness |
| Transcription invocation path | built in canonical case analysis |
| Provider execution | controlled verification next |
| Transcript/speaker alignment | foundation; provider-backed verification next |
| Current-commit QA | exact revision verification required |

## Current engineering sequence

1. Verify exact-commit GitHub QA for the live source revision.
2. Execute faster-whisper against a controlled WAV and persist transcript segments/words.
3. Execute the configured pyannoteAI cloud primary (`pyannote_api`) against the same controlled WAV with `VOXVECTOR_ENABLE_DIARIZATION_RUNS=true`; persist speaker turns and provider provenance.
4. Exercise local Community-1 only as a separate optional fallback test when fallback variables and credentials are explicitly enabled; do not use it as the primary verification path.
5. Produce and persist the multimodal alignment artifact.
6. Integrate transcript-derived linguistic/disfluency evidence.
7. Integrate speaker-aware acoustic aggregation and baseline comparisons.
8. Integrate question/response context and response timing.
9. Complete Review Evidence, assessment, reporting, history/reopen, and browser/mobile verification.
10. Begin task-specific scientific validation only after engineering evidence is stable.

## Scientific status rule

Implementation, configuration, execution, software testing, and scientific validation are separate states. Provider execution does not establish transcript truthfulness, verified speaker identity, or deception inference validity. A single vocal or behavioral feature is not sufficient proof of deception.

## Documentation authority

- `docs/MASTER_METHOD_INDEX.md` — complete data point inventory
- `docs/ANALYSIS_METHODS.md` — method definitions
- `docs/METHOD_QA_MATRIX.md` — software QA controls
- `docs/VALIDATION.md` — scientific validation requirements
- `docs/ROADMAP.md` — future development
- `docs/MVP_BUILD_PLAN.md` — fastest connected implementation path
- `docs/PIPELINE_BUILD_STATUS.md` — current 21-stage build state
- `docs/CURRENT_ENGINEERING_STATE_2026-09-04.md` — current implementation snapshot
- `docs/DEVELOPER_CONSOLE_DOC_SYNC_RULES.md` — console-specific synchronization rules
- `docs/ENGINEERING_PLAN_2026-09-01.md` — engineering plan and dependency order
- `docs/ENGINEERING_SYNC_2026-09-01.md` — active synchronization record
- `docs/QA_STATUS.md` — software QA state

Historical capability statements remain preserved in versioned checkpoints; this file is the current capability record.

## Transcript-derived linguistic evidence — implemented integration

When provider-backed transcription returns a normalized transcript, the authenticated case-analysis path now runs the canonical transcript evidence builder and persists its observations and normalized evidence records into the case result. Stage 13 reports actual completion or failure from that execution boundary rather than remaining pending after a transcript is acquired.

This establishes a connected runtime path from acquired transcript → linguistic/disfluency observations → normalized evidence → persisted Evidence Explorer. Controlled provider-backed production execution and scientific validation remain separate verification requirements.
