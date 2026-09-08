# VoxVector Current Engineering State — 2026-09-04

## Canonical runtime snapshot

This is the current engineering snapshot for the active VoxVector repository state. Historical checkpoints remain preserved separately and are not current status evidence.

- Repository: `darenprince/darenprince-author`
- Branch: `main`
- Canonical backend root: `VoxVector/`
- Canonical frontend root: `voxvector/`
- Backend pipeline version: `0.2.26`
- Frontend version: `0.2.37`
- Latest confirmed live Render deployment source revision: `145e3c64507f75a32e83a25a5e854ac15bae57e6`
- Latest Render deploy state observed for that revision on 2026-09-05: `live`
- Runtime self-test must be read from the live `/health` response; a Render `live` deployment is not substituted for that runtime field
- Maximum sample rate: `48,000 Hz`
- Maximum media size: `262,144,000 bytes`
- Diagnostic/media storage: `configured_media_ready` when reported by the live API
- Media storage: runtime-reported; do not infer it from deployment state alone

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

- provider selection, adapter installation, model, and execution readiness are read from the live `/health` response
- the canonical implementation supports the configured faster-whisper path
- provider readiness must not be represented as successful provider execution

### Diarization

- the canonical implementation supports the pyannoteAI cloud provider and explicit local pyannote fallback architecture
- `speech_runtime.diarization` exposes separate fields for configured provider, local adapter installation, Hugging Face token presence, pyannote API-key presence, primary readiness, fallback readiness, and overall execution readiness
- the Developer Console must interpret the actual configured provider instead of assuming that a cloud provider requires the local adapter or Hugging Face token
- a successful controlled provider run remains required before execution is promoted beyond readiness

Readiness is distinct from successful provider execution and scientific validation. A real controlled speech run is required before the corresponding stages are promoted from queued to integrated production execution.

## Render memory hardening

The constrained Render service is treated as a bounded runtime budget. The canonical runtime now:

- serializes heavyweight provider phases through in-process memory admission control;
- reserves configured headroom before heavyweight provider work;
- emits process RSS before/after/after-cleanup measurements for heavyweight phases;
- performs explicit provider/model cleanup after heavy phases;
- uses bounded frame processing for speech activity analysis;
- normalizes decoded audio to `float32` instead of default `float64`;
- no longer implicitly invokes configured faster-whisper or pyannote providers from generic evidence acquisition when provider objects were not explicitly supplied.

That last boundary is material: provider configuration/readiness must not silently turn every case analysis into a memory-heavy transcription plus diarization job. Stages 05 and 07 remain queued until the controlled provider execution architecture is deliberately invoked and persisted.

Render environment safeguards currently include `OMP_NUM_THREADS=1`, `MKL_NUM_THREADS=1`, `OPENBLAS_NUM_THREADS=1`, `MALLOC_ARENA_MAX=2`, and `TOKENIZERS_PARALLELISM=false` when configured in the deployment environment.

The current production memory objective is stability first, then measured provider execution. The Developer Console does not hard-code a memory limit as a live status claim unless that value is available from an authoritative runtime/infrastructure source.

## Runtime provenance and QA

The canonical API supports explicit source-revision provenance from deployment environment or embedded container metadata.

The latest confirmed Render deployment source revision is listed above. The live Developer Console reads `/health`, GitHub Actions, and the authenticated Render bridge separately so that repository revision, QA result, Pages deployment, Render service state, and Render deployment state are not collapsed into one synthetic status.

`current_commit_qa` remains `external_workflow_required` until the matching GitHub Actions result is observed for the exact source revision.

## Developer Console requirements

The Developer Console is the engineering cockpit and must show the above states from real backend/CI evidence. It should expose:

- current API revision
- commit-specific QA
- 21-stage status
- speech runtime readiness
- Render runtime status, deployment revision, and recent logs
- structured audits
- copy/download controls for reports, audits and logs
- deployment variable matrix with service links
- protected manual Render deployment trigger through the Developer Console

The console must not treat AWS as an active QA gate, must not display retired AWS checks as current engineering status, and must not convert provider configuration into execution or validation claims.

## Evidence and integrity boundary

No single vocal, acoustic, linguistic, behavioral, emotional or psychological feature proves deception. Candidate classification and final disposition remain separate from eligibility/reliability and evidence collection. Validation and calibration remain a distinct gate.

Infrastructure health, model execution and successful software tests must not be represented as scientific validation.

## Manual Render deployment control

The canonical Developer Console includes a **Deploy Now** control on the Render Runtime surface. It calls the authenticated server-side route `POST /v1/developer/render/deploy`. The API runtime reads the protected `RENDER_DEPLOY_HOOK_URL` environment variable and triggers Render without exposing the hook to the GitHub Pages client.

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

The canonical backend contains a pyannoteAI cloud diarization adapter and explicit fallback orchestration. Provider configuration/readiness fields are exposed by the live API without exposing secret values.

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

## 2026-09-04 — Transcript evidence integration

The authenticated case-analysis path now converts an acquired normalized transcript into persisted linguistic/disfluency observations and normalized evidence records using the canonical `linguistic.transcript_evidence` method. The records are merged into the same persisted result envelope used by the Evidence Explorer while preserving candidate and disposition state unchanged.

Stage 13 now reports completion only when transcript-derived evidence assembly actually succeeds. Failure is recorded as a stage failure with diagnostics while preserving the rest of the pipeline result. This is implementation and software-test coverage, not scientific validation.

## 2026-09-04 — Public startup isolation repair

The public React route was isolated from the Developer Console dependency graph after a mobile runtime boundary reported a startup failure on the public product surface. Developer-only modules are now loaded lazily only for the developer route, preventing developer-console module evaluation from being part of public landing initialization.

This is an implementation repair. Production resolution still requires exact revision build/deployment and mobile browser verification.

## 2026-09-05 — Case History deletion control

The authenticated Case History flow includes an irreversible owner-scoped delete path. The Developer Console exposes swipe-left deletion on touch/coarse-pointer devices and a trash control on desktop/pointer layouts. Both interaction paths require an explicit browser confirmation that the operation cannot be undone before the API request is issued.

The backend exposes `DELETE /v1/cases/{case_id}` and removes persisted source media recorded by the case before removing the owner-scoped case JSON record. Supabase Storage deletion primitives treat already-missing objects as idempotent 404s, while other storage failures are surfaced rather than silently reported as successful deletion. A successful delete emits a `case.deleted` diagnostic event.

**Verification:** The exact feature revision passed the VoxVector API test step, including new case-store deletion/ownership tests, and passed the React application build plus PR preview artifact verification. The matching Render deployment `145e3c64507f75a32e83a25a5e854ac15bae57e6` was subsequently observed in `live` state on 2026-09-05. Authenticated browser interaction remains a separate verification step.

## 2026-09-05 — Developer Console interaction, profile, archive, and engineering-state refinement

The canonical Developer Console now has one reusable collapsible panel owner at `voxvector/src/components/ui/CollapsiblePanel.jsx`. Analysis Workspace cards and applicable Developer Console cards use edge-to-edge title bars that meet the top and side edges of the card, retain only a subtle bottom separator, keep supporting metadata visually subordinate, and place a small expand/collapse control at the far right. The previous competing Analysis Workspace header override in `SiteHeader.css` was removed rather than layered over.

Case History now retains single-case swipe/desktop deletion and adds an explicit **Select** mode for multi-case selection. Selected cases can be cleared, selected-all, or permanently deleted only after one irreversible batch confirmation. Deletion still uses the owner-scoped canonical case endpoint one case at a time, so no new unaudited bulk backend deletion path was invented.

Structured Audits remain closed by default. A closed audit shows its date, title, brief persisted summary, status, and a compact disclosure chevron; the full scope, findings, evidence, export controls, and next-verification material render only after the user opens the audit.

Developer profiles now use the existing `public.profiles` record plus a private `voxvector-avatars` Supabase Storage bucket. The applied Supabase migration limits avatar objects to JPG/PNG/WebP up to 5 MB and scopes select/insert/update/delete access to the authenticated user's own object prefix, with developer-admin read access. The canonical reproducibility script is `VoxVector/scripts/supabase-developer-profile-avatar.sql`. The profile surface supports display-name editing and avatar upload/change while email, role, and account ID remain read-only identity fields. The top-navigation profile menu uses a solid background rather than translucent glass styling.

The Live Engineering State control is now a full-width rail directly under the primary navigation. Opening it produces a page-filling downward drawer with touch scrolling and swipe-to-collapse. Its status projection reads API `/health`, exact-revision GitHub workflow evidence, and the authenticated Render status bridge separately. It no longer hard-codes a live Render memory limit and no longer assumes that pyannoteAI cloud readiness depends on the local pyannote adapter or Hugging Face token.

**Verification boundary:** The Supabase migration was applied and its bucket/policies were read back successfully. Supabase security advisor output after the migration did not surface a new avatar-policy finding; existing unrelated warnings remain for the `developer_dashboard_summary()` SECURITY DEFINER RPC and disabled leaked-password protection. Frontend build, PR preview, exact-commit QA, and authenticated desktop/mobile browser interaction are still required for this branch before merge or production UI status is claimed.
