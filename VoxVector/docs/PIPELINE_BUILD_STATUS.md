# VoxVector 21 Stage Pipeline — Build Status

**Status date:** 2026-09-09

This document is an engineering status record, not a claim that every pipeline stage is currently integrated or scientifically validated.

## Current build matrix

| # | Stage | Current build state | Runtime state | QA state |
|---:|---|---|---|---|
| 01 | File Upload / Ingest | **implemented** | persisted case source intake | production executed on observed case path |
| 02 | File Decode and Normalization | **implemented** | PCM WAV decode and mono normalization; persisted run boundary | covered by API/runtime tests; production executed |
| 03 | Provenance and Integrity | **implemented** | SHA-256 source verification; persisted run boundary | covered by case-store tests; production executed |
| 04 | Channel and Recording Assessment | **implemented** | sample rate, duration, peak, clipping profile; persisted run boundary | runtime exercised by pipeline |
| 05 | Speech Segmentation | **implemented foundation** | deterministic energy/activity segmentation is computed and persisted before heavyweight provider execution | deterministic tests; production execution exists on prior composite path; repaired stage-order runtime verification pending |
| 06 | Speaker Identification / Diarization | **queued provider path** | pyannoteAI cloud primary configured/execution-ready when the case invocation gate is enabled; local Community-1 fallback remains optional | contract/provider tests; controlled cloud execution and persisted artifact required |
| 07 | Transcription Generation | **built integration path** | canonical case analysis invokes faster-whisper when runtime-ready; repaired path uses a disposable child process with a hard local deadline and persists normalized transcript artifacts | contract/process-boundary tests; controlled provider-backed production verification required |
| 08 | Transcript Alignment | **built synchronized foundation** | transcript timestamps and optional speaker turns are aligned before downstream transcript-dependent evidence is reported complete | regression tests; controlled provider-backed verification required |
| 09 | Eligibility and Reliability | **implemented** | downstream recording eligibility/reliability result; repaired case path does not mark it complete before upstream speech/provider acquisition resolves | covered by pipeline tests; production verification of repaired ordering pending |
| 10 | Acoustic Feature Extraction | **implemented** | RMS, intensity, ZCR, centroid, spread, F0, harmonicity, MFCC and related observations; repaired case path begins composite analysis after upstream evidence acquisition | covered by acoustic/pipeline tests; production executed on prior path; repaired ordering pending runtime verification |
| 11 | Prosodic and Voice Quality Analysis | **implemented foundation** | F0/intensity dynamics and HNR | feature tests; scientific validation separate |
| 12 | Temporal and Pause Analysis | **implemented foundation** | pause topology and timing observations | feature tests; scientific validation separate |
| 13 | Linguistic and Disfluency Analysis | **conditional** | requires transcript artifact; transcript evidence is assembled only when a real transcript result exists | unit/integration tests; controlled acquired-transcript execution required |
| 14 | Question / Answer Alignment | **conditional** | requires question/context boundaries | timing tests; product integration next |
| 15 | Within Speaker Baseline | **conditional** | requires independent baseline input | baseline unit tests |
| 16 | Cross Method Evidence Assembly | **implemented foundation** | normalized evidence records from observations after required upstream dependencies resolve | evidence tests; production execution present on prior path |
| 17 | Evidence Convergence and Conflict | **implemented foundation** | evidence relationships and conflict/convergence structures | convergence tests; persisted result structure |
| 18 | Candidate Classification | **implemented guarded foundation** | candidate remains guarded/indeterminate in current observational path | classification tests |
| 19 | Validation and Calibration Gate | **not invoked** | inferential validation gate is not executed by current run | validation program required |
| 20 | Final Classification / Disposition | **implemented guarded foundation** | guarded final disposition architecture | disposition tests |
| 21 | Audit and Provenance Output | **implemented foundation** | run, stage, method, source and provenance records persisted | case-store/provenance coverage |

## Current maturity count

- **16 stages have implemented analytical/runtime foundations**
- **4 stages are conditional or intentionally not invoked without required inputs**
- **speaker execution remains queued for controlled cloud-primary verification; transcription/alignment have built integration paths pending repaired-runtime execution evidence**
- **faster-whisper is configured and execution-ready on the currently deployed Render runtime, but the deployed revision predates the September 9 containment repair**
- **pyannoteAI cloud is the configured execution-ready primary on the latest observed Render runtime; local Community-1 fallback is optional and was not the source of the September 9 transcription OOM**
- **21 stages remain represented in the canonical contract**

The maturity count does not mean sixteen validated deception indicators. Individual measurements remain evidence only, and inferential capability requires a separate validation program.

## Live API runtime evidence — 2026-09-09

The currently live Render deploy remains commit `7d5a66fa406efde4abfd79361a4d589b5b75e6e0`, deployed by the protected deploy-hook path. That revision predates PR #942.

Connected Render logs for request `6bb7ec766d3e46f39462ef92c9929544` show:

- the production case route entered Stage 07 `transcription_generation` at `2026-09-09T09:36:46Z` with an outer 180 second acquisition deadline;
- faster-whisper started at `09:36:47Z` for a 183.3 second WAV using the `base` model, CPU, and int8;
- the model loaded at `09:36:48Z`;
- no transcription progress/completion/failure/timeout event followed;
- Render started Uvicorn again at `09:37:05Z` and a new server process at `09:37:11Z`;
- the user received Render's memory-limit automatic-restart alert for the same service;
- the persisted case run remained `running` because the process terminated before the prior in-process timeout/error handler could persist a terminal update.

Source inspection of that deployed revision also confirmed that the case route ran the downstream composite pipeline first and marked Stages 06, 09–12, 16–18, 20 and 21 complete before provider-backed Stage 07 transcription began. That implementation contradicted the dependency sequence already documented below.

PR #942 changes the source-level orchestration and ASR lifecycle, but those changes are not production execution evidence until merged and deliberately deployed.

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
2. confirm faster-whisper runtime settings and isolated-process deadline from `/health` after deployment;
3. confirm the target runtime selects `VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api` and has `VOXVECTOR_ENABLE_DIARIZATION_RUNS=true` when cloud-primary diarization is being tested;
4. run one short known WAV through the authenticated case-analysis path;
5. capture timestamped transcript segments and word timestamps or an explicit bounded provider failure;
6. capture speaker turns and provider provenance when diarization is invoked;
7. persist transcript, speaker, and alignment artifacts under the same case/run identity;
8. capture provider timing and applicable Render/runtime resource telemetry;
9. verify no later dependent stage is already `complete` while Stage 06 or Stage 07 is still active;
10. repeat on the same exact deployed revision as required by the engineering-MVP release gate.

## Evidence acquisition pipeline

The canonical acquisition layer provides a normalized media profile, speech/silence timeline, provider-neutral transcript and diarization contracts, provider selection, transcript-to-speaker alignment, and multimodal timeline output.

Supported providers:

- transcription: faster-whisper
- speaker diarization: pyannoteAI cloud primary, with local Community-1 as an explicitly configured fallback
- alignment: VoxVector-owned timestamp overlap layer

Heavy provider phases are serialized. The repaired case path calculates the source speech timeline first, releases the persisted byte buffer, retains the working audio as float32, performs provider-backed acquisition, then starts the downstream composite analytical pipeline. This reduces avoidable overlap between local ASR model memory and downstream DSP working sets.

## Stage telemetry foundation

`VoxVector/src/voxvector/stage_telemetry.py` is the persistence-neutral lifecycle recorder for the canonical 21-stage contract. It records real monotonic elapsed duration, UTC start/completion timestamps, explicit running/completed/failed/not-run/pending states, outcomes, and errors.

Route-boundary timing is real for decoded route stages. Composite pipeline stages without actual callbacks retain null independent durations rather than fabricated values.

## Case-run lifecycle

The case-analysis API persists a running record before processing. New repaired-path runs carry `process_instance_id`, active-stage identity, and configured stage timeout. Case reads reconcile a persisted `running` run to an explicit failed/interrupted state when the owning process identity changed, the active stage exceeded its persisted deadline plus grace period, or a legacy pre-process-identity run exceeded the stale-run threshold.

The final run persists the result, acquisition artifact, result envelope, provider timings, and explicit pending/not-run/failed states. Failure handling attempts to preserve a sanitized failed run. A process restart must not be interpreted as successful execution.

### Run lifecycle recovery and export checkpoint — PR #946

Issue #945 / PR #946 extends the same canonical case-run lifecycle rather than creating a second pipeline. On the branch:

- Case History listing reconciles eligible stale or deadline-expired `running` runs, so recovery no longer requires opening an individual case first.
- When interruption recovery closes a run, the interrupted active stage is marked `failed` and remaining unfinished stages are terminalized as `not_run` with an explicit reason instead of remaining indefinitely pending.
- Active runs expose real elapsed time; terminal runs persist final elapsed time.
- Terminal runs persist a structured `run_report`. Failed and `completed_with_failures` runs also persist a `failure_report` containing run/request/source identity, source revision when available, timing, stage states, errors, provider state, completed work, failed work, not-run work, and unresolved work.
- The existing Case Analysis Workspace exposes Copy run report and Download run report controls for the persisted JSON report, alongside the existing case/report copy control.
- The explicit pyannoteAI → local Community-1 fallback wrapper preserves the primary provider failure in provenance when fallback succeeds and reports both provider failures when fallback also fails.

The source checkpoint `0eaaf79082c2cf99023981d88af25ed81b5cb06c` passed VoxVector QA run #1893 (`196 passed`, eight frontend contract tests, successful React production build) and PR Preview Build #785. Documentation commits after that checkpoint require fresh exact-head CI before merge recommendation.

This checkpoint does **not** mean the Hugging Face Community-1 fallback has been enabled or executed in production. The currently documented production policy remains pyannoteAI cloud primary with local fallback disabled unless explicitly configured. The Render environment has a constrained memory envelope, so local Community-1 fallback must not be represented as production-safe merely because `HF_TOKEN` and fallback variables exist. Configuration, provider execution, deployment, browser verification, and scientific validation remain separate evidence states.

## Render runtime bridge

The Developer Console exposes real server-side Render status and recent logs through authenticated developer routes. GitHub Actions separately consumes protected repository Render credentials for infrastructure observability.

## Current engineering stage

**Repair transcription reliability, verify dependency-ordered provider execution, and complete controlled provider artifact readback.**

The dependency order is:

**media extraction → speech segmentation → speaker diarization → transcription → timestamp normalization → transcript/audio alignment → eligibility/reliability and multimodal evidence → downstream analysis → candidate classification → validation/calibration gate → final disposition.**

## Verification boundary

Software execution, provider readiness, deployment health, memory containment, engineering-MVP completion, and scientific validation are different states.

A successful transcription output does not establish transcript truthfulness.

Speaker cluster labels do not establish verified real-world identity.

A completed analysis run does not prove any individual vocal feature proves deception.

A green PR build does not establish that the repaired transcription path survived the Render memory ceiling.

## Current next steps

1. Complete review and exact-head QA for PR #946 after documentation synchronization.
2. Merge only after reviewable source/diff integrity is confirmed.
3. Deliberately trigger the protected Render deployment because auto-deploy is disabled.
4. Verify `/health` reports the merged revision and intended constrained transcription settings.
5. Refresh Case History and verify previously stuck eligible runs reconcile into terminal failed/not-run states with downloadable failure reports.
6. Run a short controlled WAV through faster-whisper and capture bounded completion/failure plus Render instance/memory evidence.
7. Run the controlled pyannoteAI cloud-primary diarization path when its invocation gate is enabled and persist/read back speaker provenance.
8. Before enabling local Community-1 fallback in the constrained Render environment, establish a bounded memory/runtime execution plan; then verify a deliberate primary failure or timeout invokes the fallback and records provenance without destabilizing the API process.
9. Verify transcript/speaker alignment and transcript-derived evidence only after their required artifacts exist.
10. Repeat the golden case on the same exact deployed revision before engineering-MVP sign-off.
11. Continue the separate scientific validation program without treating software reliability evidence as scientific validation.

## Provider architecture update — 2026-09-04

Speaker diarization has two implemented provider adapters behind the same canonical diarization contract:

- **pyannoteAI cloud:** asynchronous job API using a protected deployment key, temporary media upload, job polling, and normalized speaker turns.
- **local pyannote Community-1:** Hugging Face-gated local model path retained as an explicit fallback.

The configured primary/fallback policy is operational engineering, not a stage promotion. Controlled provider-backed execution remains required before the speaker stage is promoted from its current maturity state. Provider provenance records whether a fallback occurred and why.

## Live analysis timeout and failure visibility — 2026-09-05, superseded in part 2026-09-09

The case route retains the route-level `VOXVECTOR_PIPELINE_TIMEOUT_SECONDS` (default 120 seconds) and `VOXVECTOR_EVIDENCE_ACQUISITION_TIMEOUT_SECONDS` (default 180 seconds). The prior provider implementation relied on `asyncio.wait_for(asyncio.to_thread(...))`; coroutine cancellation could not terminate native local ASR work already executing in that thread, and a process-level OOM could terminate the API before the timeout handler ran.

The repaired faster-whisper adapter therefore defaults to a disposable spawned child process with `VOXVECTOR_WHISPER_TIMEOUT_SECONDS=165`, beam size 1, one CPU thread, and one worker. If the child exceeds its hard deadline the parent terminates then kills it and removes its temporary WAV. The outer 180 second route deadline remains a second boundary. This implementation has repository test evidence but still requires real Render provider execution before memory safety is claimed.

## Continue-after-failure pipeline policy — 2026-09-05

A failed or timed-out task is recorded on its own pipeline stage with its sanitized error and outcome, but orchestration continues only into later work that is genuinely independent of the failed output. Dependent stages are marked `not_run` with an explicit dependency reason rather than being falsely reported as successful. Runs containing one or more stage failures finish as `completed_with_failures` when independent work and persistence can still complete. This preserves partial artifacts, stage visibility, diagnostics, and auditability without silently treating failure as success.

## Case workspace live execution diagnostics — 2026-09-05

The canonical Case Analysis Workspace includes a request-scoped **Live execution log**. It reads the existing durable VoxVector diagnostics stream through the authenticated diagnostics API and filters events by the current analysis run's request ID. While a run is active, the panel refreshes every 2.5 seconds and can also be refreshed manually. Stage starts, failures, timeouts, diagnostic details, error types, durations, HTTP status, and source revision context are visible directly beside the case pipeline. This is an operational observability surface; it does not alter analytical results or validation status.

## Plain-English case execution updates — 2026-09-05

The Case Analysis Workspace translates request-scoped operational diagnostic event codes into plain-English status updates for the product UI. Users see what started, what failed, what timed out, and whether independent work continues without needing to interpret internal event identifiers. Raw exception text and protocol details remain available under an expandable **Technical details** disclosure for debugging. This presentation layer does not alter the underlying diagnostic records.

## Case workspace refresh and raw diagnostic export — 2026-09-05

The canonical Case Analysis Workspace provides a **Copy raw logs** control that copies the exact request-scoped diagnostic event records as formatted JSON for engineering investigation. The readable log remains the default product view, while raw operational data is available without leaving the case.

Case refresh controls refresh the active persisted case together with the case archive where applicable, and the workspace refresh button exposes an in-progress state instead of silently issuing overlapping requests. The workspace itself is intentionally frameless: individual analysis panels own their borders and spacing so the audio/player surface does not visually create a container around unrelated analysis components.

**Refresh controls:** Dashboard, Case Workbench, Case History, Analysis Workspace, Render Runtime, Live Logs, and Error Reports invoke their backing queries with visible in-progress state; multi-source refresh actions await all required queries rather than silently firing disconnected requests.
