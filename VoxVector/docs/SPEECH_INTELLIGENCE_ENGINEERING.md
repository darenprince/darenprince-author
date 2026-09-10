# VoxVector Speech Intelligence Engineering

**State date:** 2026-09-10

## Purpose

This document defines the active engineering path for acquiring, persisting and consuming speech, speaker, transcript and alignment data required by downstream VoxVector analysis. It is an implementation and provenance record, not a scientific validation report.

## Architecture

VoxVector owns canonical evidence contracts and orchestration. External models and provider APIs are replaceable providers behind those contracts.

```text
Source Audio
    |
    +-- Media Profile
    +-- Speech / Silence Timeline
    +-- Speaker Diarization
    +-- Transcription
              |
              +-- Segment timestamps
              +-- Word timestamps
              +-- Language
              +-- Confidence only where the provider actually supplies it
    |
    +-- Audio / Transcript / Speaker Alignment
              |
              v
       Multimodal Evidence Timeline
              |
              +-- durable upstream checkpoint
              |
              +-- runtime memory admission
              |
              v
       Eligibility / Reliability + Downstream Evidence Analysis
              |
              v
       Candidate Classification → Validation Gate → Final Disposition
```

The durable checkpoint and runtime admission boundaries are engineering safeguards. They do not collapse or replace VoxVector's scientific pipeline stages.

## Implemented foundation

### Evidence acquisition

`voxvector.evidence_acquisition` provides:

- media profile;
- bounded speech/silence timeline;
- normalized transcript and diarization contracts;
- explicit provider state/degradation;
- multimodal timestamp timeline when transcript evidence exists.

### Transcription

`voxvector.transcription_faster_whisper` provides:

- local faster-whisper adapter;
- segment timestamps;
- word timestamps;
- language metadata;
- provider word probability when actually supplied;
- lazy model loading;
- constrained CPU/int8 profile;
- disposable spawned-process execution and hard provider deadline.

### Diarization

`voxvector.diarization_pyannote_api` provides the current primary cloud adapter:

- server-side API authentication;
- provider media/job lifecycle;
- polling to terminal provider state;
- normalized speaker turns;
- provider provenance.

`voxvector.diarization_pyannote` remains an optional local Community-1 fallback:

- speaker segments and cluster labels;
- exclusive diarization when returned;
- explicit Hugging Face token/model-access requirement;
- local PyTorch dependency.

The local adapter is not the current primary Render path.

### Alignment

`voxvector.alignment` provides timestamp-overlap alignment from transcript words to diarization speaker turns, overlap fractions and explicit unattributed-word behavior.

### Provider selection

`voxvector.speech_providers` owns environment-driven provider selection and explicit fallback provenance.

## Current constrained transcription configuration

```text
VOXVECTOR_TRANSCRIPTION_PROVIDER=faster_whisper
VOXVECTOR_WHISPER_MODEL=base
VOXVECTOR_WHISPER_DEVICE=cpu
VOXVECTOR_WHISPER_COMPUTE_TYPE=int8
VOXVECTOR_WHISPER_BEAM_SIZE=1
VOXVECTOR_WHISPER_CPU_THREADS=1
VOXVECTOR_WHISPER_NUM_WORKERS=1
VOXVECTOR_WHISPER_ISOLATED_PROCESS=true
VOXVECTOR_WHISPER_TIMEOUT_SECONDS=165
```

The earlier beam-3 deployment mismatch is now superseded by actual controlled beam-1 provider execution on deployed revision `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2`.

## 2026-09-10 controlled transcription execution

Controlled case `3515362e-f801-463d-961a-df7b3302a596`, source `cbdcdbf8-e528-49b0-a474-5cd64588d301`, request `32fdb25aee704ee4ad0a0615e2496e09`:

- source duration: 183.3 seconds;
- speech segmentation: 26 segments;
- faster-whisper: `base`, CPU, int8, beam 1, one thread, one worker, isolated child;
- provider duration: approximately 113 seconds;
- transcript: 58 timestamped segments;
- word timeline: 246 timestamped words;
- language: `en`.

This is real provider execution evidence. It demonstrates that the corrected beam-1 transcription path can complete on the tested deployed runtime. It does not prove transcript truthfulness, repeatability, end-to-end pipeline stability or scientific validity.

## Post-transcription failure discovered by the same run

The successful provider output was followed by a memory failure in the API parent process.

Application telemetry reported approximately 134.75 MiB parent RSS before the post-provider cleanup completed and approximately 482.58 MiB after cleanup. Stage 10 Acoustic Feature Extraction then started despite the configured 416 MiB admission ceiling. Render service telemetry sampled 519,041,020 bytes against a 536,870,900-byte limit during the incident window, followed by Uvicorn restart. The owner confirmed memory exhaustion as the failure class.

Source inspection found that cleanup imported Torch solely to inspect CUDA. The live service currently installs the broader `requirements-speech.txt`, so that import can load the local PyTorch stack into the long-lived API process even though the current transcription device is CPU and primary diarization is cloud `pyannote_api`.

Issue #941 and draft PR #962 now own the bounded repair.

## Active #941 engineering repair

The current repair is limited to the backend analysis/runtime reliability subsystem.

### Cleanup containment

`collect_after_heavy_phase()` must not import Torch. It may clear CUDA cache only if Torch is already present in the parent process because another active provider path loaded it.

### Upstream provider checkpoint

After acquisition resolves and Stage 07/08 lifecycle state is known, the case route persists the acquisition object, transcript, multimodal alignment, speakers when available, provider timings and stage state to the **same case/run identity before downstream analysis begins**.

The checkpoint diagnostic emits only state and count metadata. It does not copy transcript text into operational logs.

### Downstream memory admission

Before Stage 10 is marked running, the route checks current process RSS using the canonical runtime-memory owner. If the configured admission threshold is exceeded, Stage 10 is failed explicitly and dependent downstream work is marked `not_run` while successful upstream speech artifacts remain durable.

This memory gate is operational protection, not the scientific Eligibility and Reliability stage.

### Process identity

The active repair separates:

- Python process identity: fresh UUID at API process start;
- Render instance identity: provider infrastructure identifier when present.

This allows interrupted-run reconciliation to detect an API process restart even when Render reuses the same instance label.

### Run identity

The canonical route-owned run ID remains stable from initial `running` persistence through finalization. An internal pipeline result identifier is preserved separately as pipeline provenance rather than replacing the case-run identity.

## Primary diarization configuration

Current primary:

```text
VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api
PYANNOTE_KEY=<protected deployment secret>
VOXVECTOR_ENABLE_DIARIZATION_RUNS=true
```

Accepted key alias:

`PYANNOTE_API_KEY`

Optional local fallback:

```text
VOXVECTOR_DIARIZATION_FALLBACK=pyannote_local
VOXVECTOR_DIARIZATION_FALLBACK_ENABLED=true
HF_TOKEN=<protected Hugging Face token>
```

`HUGGINGFACE_TOKEN` is also accepted by the local adapter.

The local `pyannote/speaker-diarization-community-1` model remains a gated Hugging Face model using the `pyannote-audio` stack. It is not required merely to run the cloud-primary adapter.

## Render dependency drift

Canonical root `render.yaml` currently installs `api/requirements-transcription.txt`, while the connected live Render service currently reports `api/requirements-speech.txt`.

The broader live dependency file includes local `pyannote.audio` and PyTorch. The current primary cloud diarization path does not require that local stack. This difference is now tracked as infrastructure-as-code drift in #964.

The downloaded Render Blueprint export must not be committed as a duplicate service definition. The existing root `render.yaml` remains the single canonical Blueprint owner and will be reconciled in its own infrastructure subsystem after #941 reliability work.

## Safety and degradation behavior

Configured providers are optional runtime capabilities. If a provider package, model, API, credential, route gate or runtime resource is unavailable, VoxVector records the unavailable/failed state explicitly rather than converting configuration into a false execution claim.

The faster-whisper adapter does not convert `avg_logprob` into a probability-like confidence. Segment confidence remains null unless the provider exposes an actual probability field.

A memory-admission rejection is also recorded as an operational stage failure, not as evidence about the speaker or recording.

## Engineering states

| Capability | State on 2026-09-10 |
|---|---|
| Media profile | implemented foundation |
| Speech/silence timeline | implemented foundation; current controlled execution observed |
| Transcription contract | implemented |
| faster-whisper adapter | implemented; beam-1 provider execution observed once in production |
| Transcription process containment | implemented foundation; post-transcription parent-memory repair active in #941 |
| Durable upstream transcript checkpoint | active source repair in #941 / PR #962; not production verified |
| Diarization contract | implemented |
| pyannoteAI cloud adapter | implemented; current primary configuration; controlled execution still required |
| local Community-1 adapter | implemented optional fallback; not current primary |
| Word timestamps | implemented and produced in controlled beam-1 execution |
| Transcript/audio alignment | built foundation; Stage 08 completed in current run, durable checkpoint repair pending |
| Speaker attribution | implemented when both provider timestamp sets exist |
| Downstream Stage 10 memory admission | active source repair in #941 / PR #962 |
| Transcript-derived linguistic evidence | conditional on durable transcript artifact |
| VoxVector target-condition evaluation | not validated |

## Observability correlation gap

The controlled run also showed that the isolated transcription child generated a different request/trace identity from the parent case analysis request. Provider progress/completion was visible in Render, while the parent Supabase diagnostic chain contained stage boundaries but not the child's complete provider event sequence.

This is tracked separately in #959 / draft PR #961. That subsystem must preserve Render stdout while durably persisting provider events to Supabase and carry parent case/request/run correlation into the spawned speech worker.

Do not mix that logging architecture into #941.

## Current verification gates

### Gate 1 — finish #941 source repair

- cleanup must not import Torch;
- upstream provider artifacts must checkpoint before Stage 10;
- Stage 10 must pass memory admission before running;
- process and Render instance identity must be separate;
- stable case-run identity must be preserved;
- exact-head tests/build must pass.

### Gate 2 — deploy and repeat the same WAV

After reviewed merge and deliberate Render deployment:

- capture fresh `/health`;
- verify beam 1 and process/Render identity fields;
- rerun the 183.3-second source;
- confirm transcription completes or fails within its provider bound without API restart;
- read back the upstream transcript/alignment/provider checkpoint;
- confirm Stage 10 either completes below the service memory envelope or is explicitly refused without process loss;
- correlate Render memory and process lifecycle.

### Gate 3 — observability durability

After #941, reconcile #959 / PR #961 and prove provider logs exist in both Render and the durable Supabase path with parent correlation. Verify the one-click Debug Bundle on the exact deployed revision.

### Gate 4 — cloud-primary diarization

Only after transcription/runtime stability:

- confirm `pyannote_api` readiness and route gate;
- run controlled cloud-primary diarization;
- persist/read back speaker turns and provider provenance;
- verify transcript/speaker alignment under one case/run.

### Gate 5 — product/browser and engineering-MVP proof

Rehydrate historical persisted audio/transcript under #963, complete authenticated desktop/mobile verification, then execute the required two complete golden cases on the same exact deployed revision before engineering-MVP sign-off.

## Dependency and license review

Provider/library/model licenses remain separate provenance records. The local Community-1 fallback has its own gated model access and `pyannote-audio` requirements. Those requirements do not define the cloud-primary production path.

## Current conclusion

VoxVector now has direct evidence that faster-whisper can complete the corrected constrained beam-1 transcription path on the tested Render deployment. The immediate blocker moved downstream: parent-process memory containment and durable checkpointing between speech acquisition and Stage 10. That repair is active under #941 / PR #962.

Cloud-primary diarization and full multimodal alignment remain engineering verification gates after the runtime is stable. None of these software execution milestones establishes scientifically validated deception inference.
