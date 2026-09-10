# VoxVector 21 Stage Pipeline — Build Status

**Status date:** 2026-09-10

This document is an engineering status record, not a claim that every pipeline stage is currently integrated or scientifically validated.

## Current build matrix

| # | Stage | Current build state | Runtime state | QA state |
|---:|---|---|---|---|
| 01 | File Upload / Ingest | **implemented** | persisted case source intake; the latest controlled 17.6 MB WAV upload succeeded | intermittent pre-handler 400 remains open in #930 |
| 02 | File Decode and Normalization | **implemented** | PCM WAV decode and mono normalization; persisted run boundary | covered by API/runtime tests; controlled production execution exists |
| 03 | Provenance and Integrity | **implemented** | SHA-256 source verification; persisted run boundary | covered by case-store tests; controlled production execution exists |
| 04 | Channel and Recording Assessment | **implemented** | sample rate, duration, peak, clipping profile; persisted run boundary | runtime exercised by controlled case |
| 05 | Speech Segmentation | **implemented foundation** | deterministic speech segmentation completed with 26 segments in the latest controlled run | deterministic tests plus production execution evidence |
| 06 | Speaker Identification / Diarization | **queued provider path** | pyannoteAI cloud-primary architecture with explicit optional local Community-1 fallback | contract/provider tests; controlled cloud execution and persisted speaker artifact required |
| 07 | Transcription Generation | **built integration path with controlled production execution** | faster-whisper beam-1 execution completed on `f0dda136...` with 58 segments / 246 timestamped words | provider/process tests exist; #941 durability/memory repair active |
| 08 | Transcript Alignment | **built synchronized foundation** | transcript/audio alignment state was reached in the controlled run, but artifact durability before downstream failure was incomplete | checkpoint regression coverage added in PR #962; final exact-head QA required |
| 09 | Eligibility and Reliability | **implemented** | downstream analytical eligibility/reliability remains distinct from operational memory admission | pipeline tests; production downstream completion still blocked by memory reliability |
| 10 | Acoustic Feature Extraction | **implemented source; constrained-runtime admission repair active** | the latest controlled run entered Stage 10 after parent RSS was already above the configured 416 MiB admission ceiling and the API later restarted | PR #962 adds pre-start memory admission; exact-head and production rerun required |
| 11 | Prosodic and Voice Quality Analysis | **implemented foundation** | F0/intensity dynamics and HNR | feature tests; scientific validation separate |
| 12 | Temporal and Pause Analysis | **implemented foundation** | pause topology and timing observations | feature tests; scientific validation separate |
| 13 | Linguistic and Disfluency Analysis | **conditional** | requires an available persisted transcript artifact | unit/integration tests; durable provider-backed execution still required |
| 14 | Question / Answer Alignment | **conditional** | requires question/context boundaries | timing tests; product integration next |
| 15 | Within Speaker Baseline | **conditional** | requires independent baseline input | baseline unit tests |
| 16 | Cross Method Evidence Assembly | **implemented foundation** | normalized evidence records after required upstream dependencies resolve | evidence tests |
| 17 | Evidence Convergence and Conflict | **implemented foundation** | evidence relationships and conflict/convergence structures | convergence tests; persisted result structure |
| 18 | Candidate Classification | **implemented guarded foundation** | candidate remains guarded/indeterminate in current observational path | classification tests |
| 19 | Validation and Calibration Gate | **not invoked** | inferential validation gate is not executed by the current run | validation program required |
| 20 | Final Classification / Disposition | **implemented guarded foundation** | guarded final disposition architecture | disposition tests |
| 21 | Audit and Provenance Output | **implemented foundation** | run, stage, method, source and provenance records persisted; terminal run/failure reports exist | case-store/provenance/lifecycle coverage; PR #962 adds upstream checkpoint provenance |

## Current maturity count

- **16 stages have implemented analytical/runtime foundations**
- **4 stages are conditional or intentionally not invoked without required inputs**
- **speaker execution remains queued for controlled cloud-primary verification**
- **transcription now has controlled beam-1 provider execution evidence, but durable checkpointing and end-to-end memory stability remain active reliability work**
- **21 stages remain represented in the canonical contract**

The maturity count does not mean sixteen validated deception indicators. Individual measurements remain evidence only, and inferential capability requires a separate validation program.

## Current repository and Render evidence — 2026-09-10

Canonical GitHub `main` is `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2`, the merge of PR #960's bounded beam-1 source/profile correction.

Connected Render inspection shows:

- service `voxvector-api`
- deployment `dep-dah7usjl550s73e00350`
- status `live`
- deployed source exact `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2`
- trigger `api`
- auto-deploy disabled
- live build command `pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`

The canonical root `render.yaml` instead specifies `api/requirements-transcription.txt`. That Blueprint/live-service drift is isolated in #964. It is not changed by PR #962.

## Controlled beam-1 production run

Controlled case `3515362e-f801-463d-961a-df7b3302a596`, source `cbdcdbf8-e528-49b0-a474-5cd64588d301`, request `32fdb25aee704ee4ad0a0615e2496e09` used the same 183.3-second / 17,596,936-byte WAV.

Observed sequence:

1. source upload and private Supabase persistence succeeded;
2. Stage 05 Speech Segmentation completed with 26 segments;
3. faster-whisper started with `base`, CPU/int8, beam 1, one CPU thread, one worker, isolated process and 165-second child deadline;
4. Stage 07 transcription completed in about 113 seconds with 58 segments / 246 timestamped words;
5. transcript alignment state was reached;
6. API-parent RSS was about 134.75 MiB immediately before post-provider cleanup and about 482.58 MiB after cleanup;
7. configured memory admission was 416 MiB on the 512 MiB reference budget;
8. Stage 10 Acoustic Feature Extraction nevertheless started on the deployed source;
9. Render sampled 519,041,020 bytes against a 536,870,900-byte service limit in the incident window;
10. the API process restarted shortly afterward;
11. the owner confirmed the incident was a memory problem;
12. the source recording persisted, but the completed transcript/provider artifact was not yet durably attached to the run before the downstream failure.

Render did not emit a dedicated kernel OOM/SIGKILL line, so no specific OS termination mechanism is claimed.

## Active #941 / PR #962 repair

The current review branch `fix/voxvector-post-transcription-memory-cleanup` keeps the same canonical backend pipeline and repairs four directly related reliability defects:

1. **Cleanup side effect:** post-heavy-phase cleanup must not import PyTorch merely to inspect CUDA cache on the CPU faster-whisper path.
2. **Durability ordering:** completed acquisition/transcript/alignment/provider state must be checkpointed to the same persisted run before Stage 10.
3. **Downstream admission:** Stage 10 must pass the configured memory-headroom gate before it is represented as running.
4. **Process identity:** `process_instance_id` must identify the actual Python process, while `render_instance_id` remains separate hosting-provider provenance.

The branch also preserves a stable case `run_id` through finalization and stores any pipeline-internal run identity separately so the checkpoint is not replaced by a new run record.

This repair is source work only until exact-head QA succeeds, the PR is reviewed/merged, the revision is deliberately deployed, and the same WAV is rerun in production.

## Speech execution sequence

The canonical dependency sequence is:

1. persisted source intake and decode/integrity/channel assessment;
2. speech segmentation;
3. speaker diarization when the provider is enabled and execution-ready;
4. transcription generation when the provider is execution-ready;
5. timestamp normalization and transcript/audio alignment;
6. durable upstream provider checkpoint;
7. operational Stage 10 memory admission;
8. eligibility/reliability and downstream acoustic/prosodic/temporal analysis when admitted;
9. transcript-derived linguistic analysis only when transcript evidence exists;
10. cross-method evidence assembly and convergence/conflict handling;
11. guarded candidate classification;
12. validation/calibration gate when implemented and authorized;
13. guarded final disposition and audit/provenance persistence.

The operational memory-admission gate is not Stage 09 Eligibility and Reliability and must not be presented as a scientific eligibility decision.

## Evidence acquisition pipeline

The canonical acquisition layer provides a normalized media profile, speech/silence timeline, provider-neutral transcript and diarization contracts, provider selection, transcript-to-speaker alignment, and multimodal timeline output.

Supported providers:

- transcription: faster-whisper
- speaker diarization: pyannoteAI cloud primary, with local Community-1 as an explicitly configured fallback
- alignment: VoxVector-owned timestamp overlap layer

Heavy provider phases are serialized. The case path computes the source speech timeline first, releases the persisted byte buffer, keeps the working audio as float32, performs provider-backed acquisition, and then enters the checkpoint/admission boundary before downstream composite analysis.

## Stage telemetry and run durability

`VoxVector/src/voxvector/stage_telemetry.py` remains the persistence-neutral lifecycle recorder for the canonical 21-stage contract. It records real monotonic elapsed duration, UTC start/completion timestamps, explicit running/completed/failed/not-run/pending states, outcomes, and errors.

`CaseStore` remains the single persisted run owner. Completed upstream provider state is checkpointed into that same run rather than creating a second analysis record.

New process provenance semantics distinguish:

- `process_instance_id`: per-Python-process UUID used for interruption recovery;
- `render_instance_id`: hosting-provider instance identity when Render supplies one.

This distinction matters because Render may restart the Python process inside the same infrastructure instance label.

## Case-run lifecycle — issue #945 / PR #946

Issue #945 remains complete. Its merged lifecycle behavior includes Case History reconciliation, terminal run/failure reports, real elapsed time, historical source-revision preservation, terminal metadata backfill, and same-process per-case serialization.

PR #962 builds on that canonical owner. It does not introduce a competing CaseStore or duplicate run lifecycle.

## Related work kept separate

- #959 / draft PR #961: dual Render + Supabase logging, speech-worker correlation, mirrored Render evidence, server-generated Download Debug Bundle.
- #963: reopened-case playback/transcript rehydration after #941 establishes durable backend checkpoint ownership.
- #964: reconcile the existing root `render.yaml` with live Render configuration and the downloaded Render Blueprint export; no second Blueprint.
- #930: intermittent intake pre-handler 400 investigation; the latest controlled case proves the memory incident is downstream of a successful upload.
- #948 / draft PR #951: auditable secure deletion.
- #949 / draft PR #952: server-aware Stop Analysis.

## Current next steps

1. finish PR #962 implementation/docs/audit synchronization;
2. run exact-head VoxVector QA, PR Preview/applicable security checks, and inspect the final diff;
3. merge only after final review/authorization;
4. deliberately deploy the reviewed merge to Render;
5. capture fresh `/health` and confirm exact source, beam 1, process identity, Render-instance provenance and memory-admission configuration;
6. rerun the same controlled WAV and require either Stage 10 completion within the memory envelope or an explicit bounded admission failure without API restart;
7. read back the persisted transcript/alignment/provider checkpoint from the case before relying on downstream completion;
8. then continue #959 observability/debug-bundle work and cloud-primary diarization verification;
9. complete browser/reopen verification and two same-revision golden-case passes before engineering-MVP sign-off;
10. continue scientific validation separately.

## Verification boundary

Software execution, provider readiness, deployment health, memory containment, artifact persistence, browser verification, engineering-MVP completion, and scientific validation are different states.

The successful beam-1 transcription proves actual provider execution for one controlled run. It does not establish transcript truthfulness, end-to-end production reliability, or deception-detection validity.
