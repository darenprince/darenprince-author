# VoxVector Current Engineering State — 2026-09-04

## Canonical runtime snapshot

This is the current engineering snapshot for the active VoxVector repository state. Historical checkpoints remain preserved separately and are not current status evidence.

- Repository: `darenprince/darenprince-author`
- Branch: `main`
- Canonical backend root: `VoxVector/`
- Canonical frontend root: `voxvector/`
- Backend pipeline version: `0.2.26`
- Frontend version: `0.2.38`
- Latest documented observed live Render runtime source revision: `23677b258a60e5cf25287cc0dce3b199f472a7c1`
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
| 07 Transcription Generation | built integration path; controlled provider execution verification next |
| 08 Transcript Alignment | built synchronized foundation; provider-backed verification next |
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

Current maturity record is **16 implemented or built runtime foundations**, with **4 conditional or intentionally not-invoked stages**. Stage 05 speaker diarization remains queued for controlled provider execution; stages 07 transcription and 08 transcript alignment now have built integration paths pending controlled runtime verification.

Provider execution readiness is distinct from successful provider execution and scientific validation.

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

The latest documented live runtime provenance is the revision above. A subsequent deployment must be re-read from `/health` before a newer revision is treated as production runtime evidence.

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

## 2026-09-04 — Developer Console navigation and pipeline readability

**Implemented canonical owners:**

- The persistent desktop Developer Console sidebar has been removed from the canonical shell.
- The existing slide-out navigation is now the single navigation owner and opens by default when the console is entered.
- `CaseAnalysisWorkspace` now includes a compact 21-stage overview generated from persisted stage records, followed by the existing expandable stage detail records.

**Boundary:** The compact pipeline view is a projection of runtime stage data. It does not fabricate completion, execution, evidence, or validation status.

## 2026-09-04 — Persisted Evidence Explorer

The canonical `CaseAnalysisWorkspace` now includes an Evidence Explorer driven directly by the persisted runtime result. It exposes filterable normalized evidence directions, contributing method identifiers, observation records, strength/confidence fields when present, and recorded alternative explanations. The view does not synthesize or invent missing evidence and does not collapse observations into a replacement score.


## pyannote provider implementation update

The canonical backend now contains a real pyannoteAI cloud diarization adapter and explicit fallback orchestration. Render has been configured with the non-secret provider selection/model variables and the user reports protected `PYANNOTE_KEY` is present in the service environment. The repository does not read or record secret values.

Current next verification remains controlled execution: exact deployed revision → authenticated cloud job → normalized speaker artifact → persistence/readback → optional explicit fallback exercise.


## 2026-09-05 — Stage 10 acoustic performance instrumentation

The canonical Stage 10 implementation was hardened after a live timeout investigation.

Implemented changes:

- duplicate FFT work between spectral measurements and MFCC extraction was removed from the primary pipeline path;
- F0 and harmonicity now share one autocorrelation pass per frame;
- the MFCC filterbank and DCT basis are built once per fixed frame configuration rather than per chunk;
- Stage 10 records measured timing totals for basic frame features, shared spectrum work, pitch/harmonicity, MFCC projection, and formant tracking;
- the Render case-run projection can persist the measured acoustic stage duration and timing breakdown;
- the Case Analysis Workspace now presents clearer Waiting, Queued, Running, Done, Failed, Timed out, Not run, Skipped, and Blocked labels and shows elapsed time for active stages.

**Verification boundary:** These changes are implemented and covered by repository regression tests. They are not yet evidence of a production latency improvement until the exact revision completes CI and a controlled live Render run is measured.
