# VoxVector 21 Stage Pipeline — Build Status

**Status date:** 2026-09-10

This document is an engineering status record, not a claim that every pipeline stage is currently integrated, production-verified, or scientifically validated.

## Current build matrix

| # | Stage | Current build state | Runtime/evidence state | QA state |
|---:|---|---|---|---|
| 01 | File Upload / Ingest | **implemented** | persisted case source intake; prior large controlled WAV uploads succeeded | intermittent pre-handler 400 remains open in #930 |
| 02 | File Decode and Normalization | **implemented** | PCM WAV decode and mono normalization; persisted run boundary | covered by API/runtime tests; historical controlled execution exists |
| 03 | Provenance and Integrity | **implemented** | SHA-256 source verification; persisted run boundary | covered by case-store tests; historical controlled execution exists |
| 04 | Channel and Recording Assessment | **implemented** | sample rate, duration, peak, clipping profile; persisted run boundary | runtime exercised historically by controlled case |
| 05 | Speech Segmentation | **implemented foundation** | deterministic speech segmentation; historical controlled run completed 26 segments | deterministic tests plus historical production execution evidence |
| 06 | Speaker Identification / Diarization | **built cloud-primary provider path** | `pyannote_api` architecture; real current cloud execution/persisted speaker artifact still required | #970 owns provider-contract correction/execution/persistence |
| 07 | Transcription Generation | **built integration with historical controlled provider execution** | faster-whisper beam-1 completed historically; same-run durability source is merged | current post-#964/#967 controlled proof remains #941 |
| 08 | Transcript Alignment | **built synchronized foundation** | historical alignment state reached; same-run checkpoint source merged; speaker-aware persisted proof remains open | #971 owns persisted transcript/audio/speaker alignment |
| 09 | Eligibility and Reliability | **implemented** | analytical eligibility/reliability remains distinct from operational memory admission | pipeline tests; scientific validation separate |
| 10 | Acoustic Feature Extraction | **implemented source with bounded admission merged** | fail-fast single-flight composite admission + locked RSS recheck are in current source | reopened #941 owns controlled production proof |
| 11 | Prosodic and Voice Quality Analysis | **implemented foundation** | F0/intensity dynamics and HNR | feature tests; scientific validation separate |
| 12 | Temporal and Pause Analysis | **implemented foundation** | pause topology and timing observations | feature tests; scientific validation separate |
| 13 | Linguistic and Disfluency Analysis | **conditional** | requires an available persisted transcript artifact | unit/integration tests; current provider-backed path proof remains downstream |
| 14 | Question / Answer Alignment | **conditional** | requires question/context boundaries | timing tests; product integration remains |
| 15 | Within Speaker Baseline | **conditional** | requires independent baseline input | baseline unit tests |
| 16 | Cross Method Evidence Assembly | **implemented foundation** | normalized evidence records after required upstream dependencies resolve | evidence tests |
| 17 | Evidence Convergence and Conflict | **implemented foundation** | evidence relationships and conflict/convergence structures | convergence tests; persisted result structure |
| 18 | Candidate Classification | **implemented guarded foundation** | candidate remains guarded/indeterminate in current observational path | classification tests |
| 19 | Validation and Calibration Gate | **not invoked** | inferential validation gate is not executed by current observational path | validation program required |
| 20 | Final Classification / Disposition | **implemented guarded foundation** | guarded final disposition architecture | disposition tests |
| 21 | Audit and Provenance Output | **implemented foundation** | run/stage/method/source/provenance records; terminal run/failure reports; upstream checkpoint provenance in source | case-store/provenance/lifecycle coverage; production acceptance remains stage-specific |

## Current maturity count

- **16 stages have implemented analytical/runtime foundations**
- **4 stages are conditional or intentionally not invoked without required inputs**
- **speaker execution remains unproven on the current cloud-primary golden path**
- **transcription has historical beam-1 provider execution evidence; current durable/end-to-end runtime proof remains open**
- **21 stages remain represented in the canonical contract**

The maturity count does not mean sixteen validated deception indicators. Individual measurements remain evidence only, and inferential capability requires a separate validation program.

## Current repository and Render evidence — 2026-09-10

Canonical GitHub `main` is `420536771875c6948be51851118b58cb04a596e6`, the merge of PR #967.

Exact-main GitHub evidence:

- VoxVector QA `34532394431`: success;
- GitHub Pages publication workflow `34532394423`: success.

Connected Render inspection shows:

- service `voxvector-api` (`srv-da2f88n40ujc73a8m26g`);
- deployment `dep-dahi2ics728c73b6ujug`;
- status `live`;
- deployed source exact `420536771875c6948be51851118b58cb04a596e6`;
- trigger `api`;
- auto-deploy disabled;
- current live build command `pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`.

The owner-provided Render export generated `2026-09-10T21:38:48Z` independently matches the service/repository/root/build/start/health/domain/auto-deploy fields and redacts environment-variable values.

The canonical root `render.yaml` instead specifies `api/requirements-transcription.txt`. That Blueprint/live-service drift is isolated in #964. Root `render.yaml` also declares `CORS_ORIGINS` as server-managed while the owner export does not list it; backend source defaults to `*` when the variable is absent. #964 owns deliberate reconciliation rather than inference from the redacted export.

No fresh `/health` payload for exact deployed `420536...` is recorded by the current synchronization pass.

## Controlled beam-1 production run — preserved historical evidence

The following controlled case belongs to older deployed source `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2` and is retained as historical provider/memory evidence.

Controlled case `3515362e-f801-463d-961a-df7b3302a596`, source `cbdcdbf8-e528-49b0-a474-5cd64588d301`, request `32fdb25aee704ee4ad0a0615e2496e09` used the same 183.3-second / 17,596,936-byte WAV.

Observed sequence:

1. source upload and private Supabase persistence succeeded;
2. Stage 05 Speech Segmentation completed with 26 segments;
3. faster-whisper started with `base`, CPU/int8, beam 1, one CPU thread, one worker, isolated process and 165-second child deadline;
4. Stage 07 transcription completed in about 113 seconds with 58 segments / 246 timestamped words;
5. transcript alignment state was reached;
6. API-parent RSS was about 134.75 MiB immediately before post-provider cleanup and about 482.58 MiB after cleanup;
7. configured memory admission was 416 MiB on the 512 MiB reference budget;
8. Stage 10 Acoustic Feature Extraction nevertheless started on that historical deployed source;
9. Render sampled 519,041,020 bytes against a 536,870,900-byte service limit in the incident window;
10. the API process restarted shortly afterward;
11. the owner confirmed the incident was a memory problem;
12. the source recording persisted, but the completed transcript/provider artifact was not yet durably attached to the run before the downstream failure.

Render did not emit a dedicated kernel OOM/SIGKILL line, so no specific OS termination mechanism is claimed.

## Merged #941 source repair and reopened verification

Merged PR #962 introduced the first same-subsystem containment work. Merged PR #967 completed the reviewed follow-up and is now current `main`.

Current source behavior includes:

1. **Cleanup side effect removed:** post-heavy-phase cleanup does not import PyTorch merely to inspect CUDA on the CPU faster-whisper path.
2. **Durability ordering:** completed acquisition/transcript/alignment/provider state is checkpointed to the same persisted run before Stage 10.
3. **Route preflight:** Stage 10 checks configured memory headroom before being represented as running.
4. **Bounded composite admission:** the canonical downstream composite analysis uses fail-fast process-wide single-flight admission instead of leaving timed-out callers queued behind an active heavyweight phase.
5. **Locked memory recheck:** an admitted composite call rechecks RSS while owning the shared lock and retains the lock through the full composite execution.
6. **Process identity:** `process_instance_id` identifies the Python process and remains distinct from `render_instance_id`.
7. **Stable run identity:** route-owned persisted `run_id` remains stable; internal analytical UUID is preserved separately as `pipeline_run_id`.

Issue #941 was closed at source merge even though controlled production criteria remained open and has been reopened. #964 should first reconcile the runtime dependency/profile boundary, then #941 should rerun the same controlled WAV and require the durable checkpoint plus Stage 10 completion or explicit bounded admission failure without uncontrolled API restart.

## Speech execution sequence

The canonical dependency sequence is:

1. persisted source intake and decode/integrity/channel assessment;
2. speech segmentation;
3. speaker diarization when the provider is enabled and execution-ready;
4. transcription generation when the provider is execution-ready;
5. timestamp normalization and transcript/audio alignment;
6. durable upstream provider checkpoint;
7. operational Stage 10 route preflight;
8. fail-fast shared Stage 10 composite admission + locked RSS recheck;
9. downstream acoustic/prosodic/temporal analysis while admitted;
10. transcript-derived linguistic analysis only when transcript evidence exists;
11. cross-method evidence assembly and convergence/conflict handling;
12. guarded candidate classification;
13. validation/calibration gate when implemented and authorized;
14. guarded final disposition and audit/provenance persistence.

The operational memory-admission boundary is not Stage 09 Eligibility and Reliability and must not be presented as a scientific eligibility decision.

## Evidence acquisition pipeline

The canonical acquisition layer provides a normalized media profile, speech/silence timeline, provider-neutral transcript and diarization contracts, provider selection, transcript-to-speaker alignment, and multimodal timeline output.

Supported provider architecture:

- transcription: faster-whisper;
- speaker diarization: pyannoteAI cloud primary;
- optional local Community-1 fallback only when explicitly configured;
- alignment: VoxVector-owned timestamp-overlap layer.

Current issue #970 owns rechecking/correcting the cloud pyannoteAI media-upload/job contract and obtaining real provider execution/persisted speaker evidence. Configuration/readiness does not count as execution.

## Stage telemetry and run durability

`VoxVector/src/voxvector/stage_telemetry.py` remains the persistence-neutral lifecycle recorder for the canonical 21-stage contract. It records real monotonic elapsed duration, UTC start/completion timestamps, explicit running/completed/failed/not-run/pending states, outcomes, and errors.

`CaseStore` remains the single persisted run owner. Completed upstream provider state is checkpointed into that same run rather than creating a second analysis record.

Process provenance distinguishes:

- `process_instance_id`: per-Python-process UUID used for interruption recovery;
- `render_instance_id`: hosting-provider instance identity when Render supplies one.

The stable persisted case-run identifier remains `run_id`; the pipeline-internal analytical UUID is `pipeline_run_id`.

## Case-run lifecycle — issue #945 / PR #946

Issue #945 remains complete. Its merged lifecycle behavior includes Case History reconciliation, terminal run/failure reports, real elapsed time, historical source-revision preservation, terminal metadata backfill, and same-process per-case serialization.

Merged #962/#967 build on that canonical owner. They do not introduce a competing CaseStore or duplicate run lifecycle.

## Frontend pipeline projection defect — issue #965

Current `voxvector/src/components/PipelineBuildCard.jsx` still carries the stale local Stage 05/06 order and presents Stage 07/08 as queued in its fallback metadata. The component already receives backend `pipeline_build`, but row statuses are not yet primarily derived from `pipeline_build.status_by_stage`.

Issue #965 owns the bounded correction in the existing component. No second pipeline card or alternate 21-stage definition should be created.

## Related work kept separate

- #964: reconcile the existing root `render.yaml` with current live/exported Render state; no second Blueprint.
- #941: reopened controlled post-#967 runtime proof after #964.
- #970: cloud-primary diarization provider contract/execution/persistence.
- #971: persisted transcript/audio/speaker alignment.
- #959: merged dual Render + Supabase observability/Debug Bundle source; production acceptance remains open.
- #963: reopened-case playback/transcript/speaker/alignment/report rehydration.
- #930: intermittent intake pre-handler 400 investigation/repeatability proof.
- #965: frontend pipeline contract synchronization.
- #931 / draft PR #974: login wake/shared role-aware self-profile candidate plus browser matrix.
- #932: release-critical public CTA/anchor/navigation repair.
- #948 / PR #951: auditable secure deletion.
- #949 / PR #952: server-aware Stop Analysis.
- #972: final frozen-candidate two same-revision/configuration golden cases.

## Current next steps

1. finish #964 Render Blueprint/runtime-dependency reconciliation;
2. deliberately deploy/read back the reconciled revision with fresh `/health`;
3. rerun the same controlled WAV under reopened #941 and require durable provider checkpoint + bounded Stage 10 behavior without uncontrolled restart;
4. execute/persist cloud-primary diarization under #970;
5. execute/persist transcript/audio/speaker alignment under #971;
6. complete #963 historical case rehydration;
7. bound #930 intake reliability and complete #959 observability production acceptance;
8. correct the existing frontend pipeline projection under #965;
9. refresh PR #974 against current `main`, rerun current-base QA and complete #931 auth/profile browser acceptance;
10. complete #932 public navigation acceptance;
11. freeze one exact candidate and pass two complete same-revision/configuration golden cases under #972;
12. continue scientific validation separately.

## Verification boundary

Software execution, provider readiness, deployment health, fresh runtime readback, memory containment, artifact persistence, browser verification, engineering-MVP completion, and scientific validation are different states.

The historical successful beam-1 transcription proves actual provider execution for one older controlled run. It does not establish current `420536...` execution, transcript truthfulness, end-to-end production reliability, or deception-detection validity.
