# VoxVector 21 Stage Pipeline — Build Status

**Status date:** 2026-09-10

This document is an engineering status record, not a claim that every pipeline stage is currently integrated or scientifically validated.

## Current build matrix

| # | Stage | Current build state | Runtime state | QA state |
|---:|---|---|---|---|
| 01 | File Upload / Ingest | **implemented** | persisted case source intake; merged pre-handler 4xx diagnostics are in the current live Render source | production reproduction for intermittent 400 remains open in #930 |
| 02 | File Decode and Normalization | **implemented** | PCM WAV decode and mono normalization; persisted run boundary | covered by API/runtime tests; prior production execution exists |
| 03 | Provenance and Integrity | **implemented** | SHA-256 source verification; persisted run boundary | covered by case-store tests; prior production execution exists |
| 04 | Channel and Recording Assessment | **implemented** | sample rate, duration, peak, clipping profile; persisted run boundary | runtime exercised by pipeline |
| 05 | Speech Segmentation | **implemented foundation** | deterministic energy/activity segmentation is computed and persisted before heavyweight provider execution | deterministic tests; controlled current-runtime provider execution still required |
| 06 | Speaker Identification / Diarization | **queued provider path** | pyannoteAI cloud primary architecture with explicit optional local Community-1 fallback | contract/provider tests; controlled cloud execution and persisted artifact required |
| 07 | Transcription Generation | **built integration path** | current live source uses dependency-ordered faster-whisper in a disposable child process with hard local deadline | contract/process tests; #941 controlled production execution required |
| 08 | Transcript Alignment | **built synchronized foundation** | transcript timestamps and optional speaker turns align before transcript-dependent evidence can report complete | regression tests; controlled provider-backed verification required |
| 09 | Eligibility and Reliability | **implemented** | downstream recording eligibility/reliability result after required upstream acquisition resolves | covered by pipeline tests; current-runtime provider verification pending |
| 10 | Acoustic Feature Extraction | **implemented** | RMS, intensity, ZCR, centroid, spread, F0, harmonicity, MFCC and related observations | covered by acoustic/pipeline tests |
| 11 | Prosodic and Voice Quality Analysis | **implemented foundation** | F0/intensity dynamics and HNR | feature tests; scientific validation separate |
| 12 | Temporal and Pause Analysis | **implemented foundation** | pause topology and timing observations | feature tests; scientific validation separate |
| 13 | Linguistic and Disfluency Analysis | **conditional** | requires persisted transcript artifact | unit/integration tests; controlled acquired-transcript execution required |
| 14 | Question / Answer Alignment | **conditional** | requires question/context boundaries | timing tests; product integration next |
| 15 | Within Speaker Baseline | **conditional** | requires independent baseline input | baseline unit tests |
| 16 | Cross Method Evidence Assembly | **implemented foundation** | normalized evidence records after required upstream dependencies resolve | evidence tests |
| 17 | Evidence Convergence and Conflict | **implemented foundation** | evidence relationships and conflict/convergence structures | convergence tests; persisted result structure |
| 18 | Candidate Classification | **implemented guarded foundation** | candidate remains guarded/indeterminate in current observational path | classification tests |
| 19 | Validation and Calibration Gate | **not invoked** | inferential validation gate is not executed by the current run | validation program required |
| 20 | Final Classification / Disposition | **implemented guarded foundation** | guarded final disposition architecture | disposition tests |
| 21 | Audit and Provenance Output | **implemented foundation** | run, stage, method, source and provenance records persisted; terminal run/failure reports added by #946 | case-store/provenance/lifecycle coverage |

## Current maturity count

- **16 stages have implemented analytical/runtime foundations**
- **4 stages are conditional or intentionally not invoked without required inputs**
- **speaker execution remains queued for controlled cloud-primary verification; transcription/alignment have built integration paths pending controlled provider execution evidence**
- **the current Render deployment contains the September 9 transcription containment/dependency-order repair and the merged #946 run-lifecycle recovery**
- **21 stages remain represented in the canonical contract**

The maturity count does not mean sixteen validated deception indicators. Individual measurements remain evidence only, and inferential capability requires a separate validation program.

## Live API runtime evidence — 2026-09-10

Canonical GitHub `main` is `c21b4cf07f6475eddb15c99e67f1ff70d6a50167`. Exact-main VoxVector QA #1963 (`34425588762`), Deploy GitHub Pages #1708 (`34425588752`), and CodeQL push run #71 (`34425587747`) all completed successfully.

Connected Render inspection shows deployment `dep-dah0g13l550s73d2dbb0` `live` on the same source revision `c21b4cf07f6475eddb15c99e67f1ff70d6a50167`, with trigger `api`. The prior `09381797...` deployment is deactivated. Render automatic deployment remains disabled.

This source/deployment alignment is useful evidence, but the deployment record is not a fresh complete `/health` payload, provider execution, browser verification, or scientific validation. Detailed provider/readiness fields from older health checkpoints must not be projected onto the current source without a fresh readback.

The API-triggered deployment also does not verify issue #920's protected Developer Console `Deploy Now` / deploy-hook path. That acceptance chain remains separate.

## Historical OOM incident and repair

On the earlier live revision `7d5a66fa406efde4abfd79361a4d589b5b75e6e0`, Render evidence showed a case enter Stage 07 transcription, faster-whisper load, then loss/restart of the API process before completion/failure/timeout persistence. The user also received Render's memory-limit restart alert. Source inspection found downstream analysis was executed before provider-backed transcription, contrary to the canonical dependency order.

PR #942 repaired that source path by moving provider evidence acquisition before dependent downstream analysis and isolating faster-whisper in a disposable child process with bounded CPU/thread/beam settings and a hard local deadline. That repair is now included in current `main` and the current live Render deployment.

Issue #941 remains open because controlled real-audio faster-whisper execution on the repaired/current runtime has not yet established bounded completion/failure, Render memory/instance behavior, or persisted transcript/run artifact readback. Deployment is not provider execution.

## Speech execution sequence

The canonical dependency sequence is:

1. persisted source intake and decode/integrity/channel assessment;
2. speech segmentation;
3. speaker diarization when the provider is enabled and execution-ready;
4. transcription generation when the provider is execution-ready;
5. timestamp normalization and transcript/audio alignment;
6. eligibility/reliability and downstream acoustic/prosodic/temporal analysis;
7. transcript-derived linguistic analysis only when transcript evidence exists;
8. cross-method evidence assembly and convergence/conflict handling;
9. guarded candidate classification;
10. validation/calibration gate when implemented and authorized;
11. guarded final disposition and audit/provenance persistence.

For controlled provider verification:

1. confirm the intended backend source revision and exact-revision QA evidence;
2. capture a fresh `/health` payload and confirm current transcription/diarization settings without exposing credentials;
3. confirm `VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api` and `VOXVECTOR_ENABLE_DIARIZATION_RUNS=true` before a cloud-primary diarization test;
4. run one short known WAV through the authenticated case-analysis path;
5. capture timestamped transcript segments and word timestamps or an explicit bounded provider failure;
6. capture speaker turns and provider provenance when diarization is invoked;
7. persist transcript, speaker, and alignment artifacts under the same case/run identity;
8. capture provider timing and applicable Render/runtime memory/instance telemetry;
9. verify dependent stages do not report complete before their required Stage 06/07 artifacts exist;
10. repeat on the same exact deployed revision as required by the engineering-MVP release gate.

## Evidence acquisition pipeline

The canonical acquisition layer provides a normalized media profile, speech/silence timeline, provider-neutral transcript and diarization contracts, provider selection, transcript-to-speaker alignment, and multimodal timeline output.

Supported providers:

- transcription: faster-whisper
- speaker diarization: pyannoteAI cloud primary, with local Community-1 as an explicitly configured fallback
- alignment: VoxVector-owned timestamp overlap layer

Heavy provider phases are serialized. The repaired case path calculates the source speech timeline first, releases the persisted byte buffer, retains the working audio as float32, performs provider-backed acquisition, then starts downstream composite analytical work. This reduces avoidable overlap between local ASR model memory and downstream DSP working sets.

## Stage telemetry foundation

`VoxVector/src/voxvector/stage_telemetry.py` is the persistence-neutral lifecycle recorder for the canonical 21-stage contract. It records real monotonic elapsed duration, UTC start/completion timestamps, explicit running/completed/failed/not-run/pending states, outcomes, and errors.

Route-boundary timing is real for decoded route stages. Composite pipeline stages without actual callbacks retain null independent durations rather than fabricated values.

## Case-run lifecycle — issue #945 / PR #946

Issue #945 is closed and PR #946 is merged as current `main`.

The merged lifecycle behavior includes:

- Case History listing reconciles eligible stale or deadline-expired `running` runs, so recovery no longer requires opening an individual case first.
- A legitimate current-worker run with a usable configured stage deadline is not stale-failed before that deadline.
- When interruption recovery closes a run, the interrupted active stage is `failed` and remaining unfinished dependent work is terminalized `not_run` with an explicit reason.
- Active runs expose real elapsed time; terminal runs persist final elapsed time.
- Terminal runs persist a structured `run_report`. Failed and `completed_with_failures` runs also persist a `failure_report` containing run/request/source identity, source revision when available, timing, stage states, errors, provider state, completed work, failed work, not-run work, and unresolved work.
- Historical terminal runs do not inherit the source revision of a later runtime merely reading the record, and legitimate terminal metadata backfill is persisted.
- Per-case in-process serialization covers Case History reconciliation, explicit reconciliation, `update_run`, source mutation and deletion. In the current single-process/single-instance CaseStore architecture this prevents a stale history snapshot from overwriting a newer same-process run update. It is not cross-process compare-and-swap protection for a future horizontally scaled writer model.
- The existing Case Analysis Workspace exposes Copy and Download run-report controls for the persisted JSON report.
- The explicit pyannoteAI → local Community-1 fallback wrapper preserves the primary provider failure in provenance when fallback succeeds and reports both provider failures when fallback also fails.

Final PR head `de343d593f320eea3ef23fd970bae614fcc240b1` passed VoxVector QA #1962 and PR Preview #818, with changed-code CodeQL clean and all six existing review threads resolved. The merge `c21b4cf...` then passed exact-main QA #1963, Pages #1708, and CodeQL #71.

The current Render deployment contains this merged lifecycle source. Production Case History reconciliation/report readback remains unverified and must not be inferred from deployment state.

## Stop Analysis work — issue #949 / draft PR #952

Server-aware Stop Analysis remains a separate active P0 subsystem. Draft PR #952 is based on current `main` but at the current checkpoint only establishes the canonical frontend `stopAnalysisRun(...)` request action.

The server cancellation endpoint/lifecycle, authenticated owner scope, persisted request/acknowledgement/terminal states, safe-boundary cancellation checks, supported faster-whisper child termination where possible, existing Analysis Workspace controls/states, regression tests, and synchronized docs remain unimplemented on canonical `main`.

Browser `AbortController` transport cancellation is not server cancellation.

## Secure deletion work — issue #948 / draft PR #951

Auditable secure deletion remains a separate active P0 subsystem. Draft PR #951 is based on current `main` and is not merge-ready. Open review work includes mutation/delete serialization, durable final receipt recovery, and explicit authenticated DELETE-route opt-in to the receipt response.

The intended receipt is sanitized and must not preserve raw audio, transcript text, case title, signed URL, credentials, or secrets. Application-level deletion through the supported storage API is not cryptographic proof of provider-level physical-media sanitization.

## Run/report and case workspace diagnostics

The canonical Case Analysis Workspace includes request-scoped live execution diagnostics, readable status translation, expandable technical details, raw-log copy, visible refresh states, active elapsed time, terminal duration, and Copy/Download controls for persisted run/failure reports.

These are operational observability and auditability surfaces. They do not alter analytical results or validation status.

## Current engineering stage

**Verify current deployed intake and speech execution, while completing the two active P0 lifecycle-adjacent source tasks separately.**

The dependency order remains:

**media extraction → speech segmentation → speaker diarization → transcription → timestamp normalization → transcript/audio alignment → eligibility/reliability and multimodal evidence → downstream analysis → candidate classification → validation/calibration gate → final disposition.**

## Current next steps

1. capture a fresh `/health` payload for `c21b4cf...` and record current runtime/provider settings;
2. reproduce or sufficiently bound #930 on the current live pre-handler diagnostics and verify authenticated upload/private persistence/provenance/playback;
3. execute a short controlled WAV through faster-whisper under #941 and capture bounded completion/failure plus Render memory/instance evidence;
4. run controlled pyannoteAI cloud-primary diarization when its invocation gate is enabled and persist/read back speaker provenance;
5. verify transcript/speaker alignment and transcript-derived evidence only after required artifacts exist;
6. complete #948 and #949 as separate source changes with exact-head QA/review before merge;
7. deploy and verify the #931 Supabase administrator Edge Function and trusted admin role boundary;
8. complete #932 navigation/CTA work and, after #930, #928 upload UX hardening;
9. complete authenticated desktop/mobile browser verification, saved history/reopen, and report acceptance;
10. repeat the golden case on the same exact deployed revision before engineering-MVP sign-off;
11. continue the separate scientific validation program.

## Verification boundary

Software execution, provider readiness, deployment health, memory containment, engineering-MVP completion, and scientific validation are different states.

A successful transcription output does not establish transcript truthfulness. Speaker cluster labels do not establish verified real-world identity. A completed analysis run does not prove any individual vocal feature proves deception. A green build or live deployment does not establish controlled provider execution under the Render memory ceiling.
