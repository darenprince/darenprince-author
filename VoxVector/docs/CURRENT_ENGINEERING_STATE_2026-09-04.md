# VoxVector Current Engineering State — 2026-09-04

## Canonical runtime snapshot

This is the current engineering snapshot for the active VoxVector repository state. Historical checkpoints remain preserved separately and are not current status evidence.

- Repository: `darenprince/darenprince-author`
- Branch: `main`
- Canonical backend root: `VoxVector/`
- Canonical frontend root: `voxvector/`
- Backend pipeline version: `0.2.26`
- Frontend version: `0.2.36`
- Current observed Render runtime source revision: `23677b258a60e5cf25287cc0dce3b199f472a7c1`
- Runtime self-test: `passed`
- Maximum sample rate: `48,000 Hz`
- Maximum media size: `262,144,000 bytes`
- Diagnostic/media storage: `configured_media_ready`
- Media storage: `true`

## Current deployment roles

| Surface | Endpoint / role | Current status |
|---|---|---|
| Public React application | `https://darenprince.com/voxvector/` | Active public frontend |
| Original API | `https://voxvector.crownlabs.tech` | Preserved Render API |
| AWS API environment | `https://awsapi.crownlabs.tech` | Separate AWS ALB/ECS environment |
| Authentication/persistence/diagnostics/private media | Supabase | Configured boundary |

The original API domain is preserved. AWS is a separate deployment environment; frontend production API routing has not been silently changed.

## Current 21-stage pipeline

| Stage | Runtime contract state |
|---:|---|
| 01 File Upload / Ingest | implemented |
| 02 File Decode / Normalization | implemented |
| 03 Provenance / Integrity | implemented |
| 04 Channel / Recording Assessment | implemented |
| 05 Speaker Identification / Diarization | queued; provider runtime ready |
| 06 Speech Segmentation | implemented foundation |
| 07 Transcription Generation | queued; provider runtime ready |
| 08 Transcript Alignment | queued |
| 09 Eligibility / Reliability | implemented |
| 10 Acoustic Feature Extraction | implemented |
| 11 Prosodic / Voice Quality | implemented foundation |
| 12 Temporal / Pause Analysis | implemented foundation |
| 13 Linguistic / Disfluency | conditional |
| 14 Question / Answer Alignment | conditional |
| 15 Within-Speaker Baseline | conditional |
| 16 Cross-Method Evidence | implemented foundation |
| 17 Evidence Convergence / Conflict | implemented foundation |
| 18 Candidate Classification | implemented guarded foundation |
| 19 Validation / Calibration Gate | not invoked |
| 20 Final Classification / Disposition | implemented guarded foundation |
| 21 Audit / Provenance Output | implemented foundation |

Current count remains **14 implemented foundations, 4 conditional/not invoked, and 3 queued**.

The queued count is an integration status, not a statement that the underlying provider packages are absent. Provider execution readiness is now configured separately from pipeline promotion.

## Speech runtime readiness

### Transcription

- provider: `faster_whisper`
- adapter installed: `true`
- execution ready: `true`
- adapter model setting: `VOXVECTOR_WHISPER_MODEL` (currently `base` on Render configuration)
- device: CPU
- compute type: int8
- beam size: 3

### Diarization

- provider: `pyannote`
- adapter installed: `true`
- execution ready: `true`
- model: `pyannote/speaker-diarization-community-1`
- Hugging Face token: configured in the live Render environment
- model access note: `pyannote/speaker-diarization-community-1` is a gated Hugging Face repository; token presence and adapter readiness are not substituted for a successful controlled provider run

Readiness is distinct from successful provider execution and scientific validation. A real controlled speech run is required before the corresponding stages are promoted from queued to integrated production execution.

## Runtime provenance and QA

The canonical API now supports explicit source-revision provenance from deployment environment or embedded container metadata. AWS deployment workflow changes also pass source revision and source-specific QA state into the image/runtime.

The currently observed Render health payload reports the correct source revision, but `current_commit_qa` remains `external_workflow_required` for the observed runtime. Exact-commit QA must be verified from GitHub Actions before that field can be treated as current runtime QA evidence.

## Immediate implementation plan

1. Verify the exact current GitHub commit's backend QA workflow and publish the result in the Developer Console.
2. Run a controlled short WAV through faster-whisper and capture transcript segments and word timestamps.
3. Run the same controlled WAV through pyannote Community-1 and capture speaker turns.
4. Persist transcription, speaker and multimodal alignment artifacts under case/run identity.
5. Promote stages 05 and 07 only from successful real execution, not from configuration alone.
6. Complete transcript alignment and expose synchronized audio, speaker, transcript and evidence time axes.
7. Feed transcript output into linguistic/disfluency analysis and question/answer context handling.
8. Add speaker-aware acoustic aggregation and independent baseline inputs.
9. Instrument true internal stage callbacks where method boundaries are real; keep null timing for boundaries without real instrumentation.
10. Build the first complete Review Evidence surface, report generation and case history/reopen flow from persistent case state.
11. Complete browser and mobile verification.
12. Keep scientific validation separate: operational execution, provider quality, and deception-inference validation are distinct gates.

## Developer Console requirements

The Developer Console is the engineering cockpit and must show the above states from real backend/CI evidence. It should expose:

- current API revision
- commit-specific QA
- 21-stage status
- speech runtime readiness
- Render runtime
- AWS environment status
- structured audits
- copy/download controls for reports, audits and logs
- deployment variable matrix with service links

## Evidence and integrity boundary

No single vocal, acoustic, linguistic, behavioral, emotional or psychological feature proves deception. Candidate classification and final disposition remain separate from eligibility/reliability and evidence collection. Validation and calibration remain a distinct gate.

Infrastructure health, model execution and successful software tests must not be represented as scientific validation.
