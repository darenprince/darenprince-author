# VoxVector Current Engineering State — 2026-09-04

## Canonical runtime snapshot

This is the current engineering snapshot for the active VoxVector repository state. Historical checkpoints remain preserved separately and are not current status evidence.

- Repository: `darenprince/darenprince-author`
- Branch: `main`
- Canonical backend root: `VoxVector/`
- Canonical frontend root: `voxvector/`
- Backend pipeline version: `0.2.26`
- Frontend version: `0.2.36`
- Current observed live Render runtime source revision before the latest queued repair: `f005c68c872434e810947b934742895c4d8324d2`
- Latest canonical backend repair commit awaiting Render activation: `b6f43f0ec33513be9c4e1cb9542eaf3426045245`
- Runtime self-test on the observed live revision: `passed`
- Maximum sample rate: `48,000 Hz`
- Maximum media size: `262,144,000 bytes`
- Diagnostic/media storage: `configured_media_ready`
- Media storage: `true`

## Current deployment roles

| Surface | Endpoint / role | Current status |
|---|---|---|
| Public React application | `https://darenprince.com/voxvector/` | Active public frontend |
| Original API | `https://voxvector.crownlabs.tech` | Preserved Render API |
| AWS API environment | `https://awsapi.crownlabs.tech` | Separate historical benchmark environment; not part of active QA gating |
| Authentication/persistence/diagnostics/private media | Supabase | Configured boundary |

The original API domain is preserved. AWS remains separately addressed and is no longer part of the active QA/developer-status gating path.

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

## Render memory hardening

The 512 MiB Render service is treated as a constrained runtime budget. The canonical runtime now:

- serializes heavyweight provider phases through in-process memory admission control;
- reserves 96 MiB of headroom, using an effective 416 MiB admission threshold by default;
- emits process RSS before/after/after-cleanup measurements for heavyweight phases;
- performs explicit provider/model cleanup after heavy phases;
- uses bounded frame processing for speech activity analysis;
- normalizes decoded audio to `float32` instead of default `float64`;
- no longer implicitly invokes configured faster-whisper or pyannote providers from generic evidence acquisition when provider objects were not explicitly supplied.

That last boundary is material: provider configuration/readiness must not silently turn every case analysis into a memory-heavy transcription plus diarization job. Stages 05 and 07 remain queued until the controlled provider execution architecture is deliberately invoked and persisted.

Render environment safeguards currently include `OMP_NUM_THREADS=1`, `MKL_NUM_THREADS=1`, `OPENBLAS_NUM_THREADS=1`, `MALLOC_ARENA_MAX=2`, and `TOKENIZERS_PARALLELISM=false`.

The current production memory objective is stability first, then measured provider execution. No Render plan upgrade is being assumed or used as a substitute for runtime optimization.

## Runtime provenance and QA

The canonical API now supports explicit source-revision provenance from deployment environment or embedded container metadata.

The latest canonical backend repair changes are still propagating through Render. The live health payload must be re-read after the deployment completes before the newer revision is treated as production runtime evidence.

`current_commit_qa` remains `external_workflow_required` until the matching GitHub Actions result is observed for the exact deployed revision.

## Developer Console requirements

The Developer Console is the engineering cockpit and must show the above states from real backend/CI evidence. It should expose:

- current API revision
- commit-specific QA
- 21-stage status
- speech runtime readiness
- Render runtime status, memory constraints, deployment revision, and recent logs
- structured audits
- copy/download controls for reports, audits and logs
- deployment variable matrix with service links
- protected manual Render deployment trigger through the Developer Console

The console must not treat AWS as an active QA gate, must not display retired AWS checks as current engineering status, and must not convert provider configuration into execution or validation claims.

## Evidence and integrity boundary

No single vocal, acoustic, linguistic, behavioral, emotional or psychological feature proves deception. Candidate classification and final disposition remain separate from eligibility/reliability and evidence collection. Validation and calibration remain a distinct gate.

Infrastructure health, model execution and successful software tests must not be represented as scientific validation.


## Manual Render deployment control

The canonical Developer Console now includes a **Deploy Now** control on the Render Runtime surface. It calls the authenticated server-side route `POST /v1/developer/render/deploy`. The API runtime reads the protected `RENDER_DEPLOY_HOOK_URL` environment variable and triggers Render without exposing the hook to the GitHub Pages client.

A successful trigger response means Render accepted or queued the deploy request. It is not evidence that the new revision built, started, passed health checks, or completed browser verification. Those states remain observable through the existing Render status/log surfaces and deployment provenance.


## 2026-09-04 — Canonical transcription workflow and synchronized review build

**Implemented canonical owners:**

- `VoxVector/api/app.py` now deliberately supplies the configured faster-whisper provider to evidence acquisition when the live runtime reports transcription execution readiness.
- Acquired transcript segments and words remain persisted under the canonical case/run record and are projected as stage 07 runtime state without fabricating execution success.
- Diarization remains explicitly opt-in through `VOXVECTOR_ENABLE_DIARIZATION_RUNS` because the constrained Render service must not silently load the heavy pyannote path.
- `voxvector/src/components/CaseAnalysisWorkspace.jsx` now renders a timestamped conversation transcript, shared-playhead segment highlighting, clickable word/segment seeking, and transcript timestamp markers on the waveform.
- `voxvector/src/components/DeveloperConsole.jsx` now seeds the MVP board with canonical completed implementation items and exposes the synchronized transcript workspace as a completed frontend build task.

**Current state:** BUILT integration path. A repository change is not proof of provider execution. Controlled live transcription, persisted artifact readback, browser/mobile verification, and exact-commit QA remain required before functional production status is claimed.

**Next dependency:** run the deployed revision against a controlled WAV through the authenticated case path and inspect stage 07, persisted transcript artifacts, waveform synchronization, and transcript playback seeking.
