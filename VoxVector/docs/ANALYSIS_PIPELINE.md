# VoxVector Analysis Pipeline

## Purpose

This is the canonical product and engineering pipeline for VoxVector.

The pipeline defines the complete connected path from recording intake through synchronized analysis, evidence synthesis, classification, reporting, and audit.

It is also the source model for the Analysis Workspace pipeline component and the engineering task dependency map.

## Canonical 21 stage pipeline

| # | Stage | Function | Primary output | Product surface |
|---:|---|---|---|---|
| 01 | File Upload / Ingest | Accept the supported recording and create the analysis request. | source asset | New Analysis |
| 02 | File Decode and Normalization | Decode media and establish the canonical audio representation. | normalized audio | Intake |
| 03 | Provenance and Integrity | Hash the source and establish run identity and source metadata. | provenance record | Intake / Audit |
| 04 | Channel and Recording Assessment | Inspect duration, clipping, channels, audio integrity, and recording conditions. | recording profile | Intake / Overview |
| 05 | Speech Segmentation | Locate analyzable speech regions before heavyweight provider work. | speech segments | Audio viewer |
| 06 | Speaker Identification / Diarization | Establish speaker regions and speaker separation when the provider is invoked. | speaker segments | Speaker layer |
| 07 | Transcription Generation | Generate timestamped transcript content. | transcript segments and words | Transcript layer |
| 08 | Transcript Alignment | Associate transcript content with audio timing and speaker timing when available. | alignment records | Transcript layer |
| 09 | Eligibility and Reliability | Establish the analysis eligibility profile. | eligibility record | Overview / Pipeline |
| 10 | Acoustic Feature Extraction | Extract energy, pitch, spectral, and related acoustic observations after upstream evidence resolves and runtime memory admission succeeds. | acoustic observations | Acoustic tracks |
| 11 | Prosodic and Voice Quality Analysis | Extract pitch dynamics, intensity dynamics, harmonicity, HNR, and related voice observations. | prosody and voice observations | Prosody tracks |
| 12 | Temporal and Pause Analysis | Measure speech activity, pauses, response timing, and temporal structure. | temporal observations | Temporal tracks |
| 13 | Linguistic and Disfluency Analysis | Analyze transcript structure, lexical behavior, disfluency, and language features. | linguistic observations | Linguistic panels |
| 14 | Question / Answer Alignment | Associate responses with prompts and response boundaries. | interaction records | Conversation layer |
| 15 | Within Speaker Baseline | Compare observations with an independent speaker baseline when available. | baseline observations | Baseline panels |
| 16 | Cross Method Evidence Assembly | Convert observations into normalized evidence records. | evidence records | Evidence Explorer |
| 17 | Evidence Convergence and Conflict | Examine agreement, dependence, conflict, and alternative explanations. | evidence relationships | Evidence synthesis |
| 18 | Candidate Classification | Produce a candidate analytical state from supported evidence. | candidate assessment | Assessment |
| 19 | Validation and Calibration Gate | Apply validation, calibration, robustness, and distribution controls. | validation state | Assessment / Developer |
| 20 | Final Classification / Disposition | Produce the configured final analytical disposition. | final assessment | Assessment / Reports |
| 21 | Audit and Provenance Output | Preserve measurements, methods, evidence relationships, configuration, and provenance. | audit package | Reports / Audit |

The 05/06 order above is the current canonical backend order. Historical dated records may retain the prior diarization-before-segmentation numbering as historical evidence and must not be rewritten solely to look current.

## Current source/runtime checkpoint — 2026-09-10

Canonical GitHub `main` is `420536771875c6948be51851118b58cb04a596e6`, the merge of PR #967. Current Render deployment `dep-dahi2ics728c73b6ujug` is `live` on that exact source. No fresh `/health` response for `420536...` is recorded by the current synchronization pass.

Merged PR #962 established durable pre-Stage-10 provider checkpointing, Stage 10 process-memory admission, process-vs-Render-instance identity separation, and stable case-run ownership. Merged PR #967 added fail-fast process-wide single-flight admission around the complete downstream composite analysis, a locked RSS recheck, lock ownership through composite execution, and explicit separation of route-owned `run_id` from pipeline-internal `pipeline_run_id`.

Issue #941 is reopened because controlled production verification of those merged behaviors remains open. #964 should first reconcile the live Render dependency/configuration profile into the sole root Blueprint so the accepted controlled proof uses the runtime configuration intended for the candidate.

## Pipeline groupings

### Prepare

Stages 01 through 04 establish the source recording, normalized audio, and provenance.

### Understand

Stages 05 through 09 establish speech structure, speaker context, transcript context, alignment, and analytical eligibility.

### Analyze

Stages 10 through 15 generate acoustic, language, temporal, speaker, and contextual observations.

### Synthesize and Decide

Stages 16 through 21 transform observations into evidence relationships, candidate assessment, validation-controlled final disposition, and auditable output.

## Stage 05 — Speech Segmentation

Stage 05 is an implemented foundation in the canonical case-analysis path.

### Input

- normalized audio
- frame-level energy/activity state
- frame hop duration
- canonical source duration

### Processing

The current deterministic segmenter:

1. establishes a relative energy threshold from the recording;
2. identifies active speech regions;
3. removes active runs shorter than the configured minimum speech duration;
4. bridges inactive gaps shorter than the configured silence gap;
5. emits contiguous speech intervals;
6. assigns segmentation metadata used by downstream provider acquisition.

### Output

Each speech segment contains the timing and method provenance needed for downstream evidence acquisition.

The stage also exposes aggregate speech-region information used by the case pipeline. It does not assign speaker identity and does not generate transcript text.

A historical controlled 2026-09-10 production case on `f0dda136...` completed Stage 05 with 26 speech segments before faster-whisper execution.

## Stages 06 through 08 — Provider-backed speech evidence

Stage 06 invokes speaker diarization only when the configured provider is execution-ready and the case route gate permits invocation. The current primary production architecture is pyannoteAI cloud via `pyannote_api`; local Community-1 is an optional explicit fallback.

Stage 07 invokes faster-whisper when transcription is execution-ready. The constrained source profile is `base`, CPU, int8, beam 1, one CPU thread, one worker, isolated child process, with a 165-second child deadline.

Stage 08 builds the timestamped transcript/audio timeline and includes speaker attribution when compatible diarization turns exist.

Historical controlled production execution on deployed source `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2` completed faster-whisper with 58 transcript segments and 246 timestamped words in about 113 seconds. The later API restart occurred after provider completion during the post-provider/downstream transition. That provider execution is real software evidence, but the completed transcript artifact was not yet durably checkpointed before Stage 10 on that historical deployed revision.

Current source now implements that durability checkpoint. Reopened #941 must prove its current production execution after #964 runtime reconciliation.

## Upstream checkpoint before downstream analysis

Completed provider evidence must be durably attached to the same case run before Stage 10 begins.

The checkpoint boundary preserves, when available:

- transcription state;
- normalized transcript segments and words;
- diarization state and speakers;
- multimodal alignment timeline;
- provider timing metadata;
- completed Stage 05 through 08 lifecycle state;
- request, case, source, and stable case-run identity;
- Python process identity and hosting-instance provenance.

Operational diagnostics emitted for this checkpoint contain state/count metadata and must not copy raw transcript text into logs.

The checkpoint exists so successfully completed speech work survives a later downstream failure or process restart. It is a durability boundary, not a second pipeline or second run.

## Stage 10 runtime memory admission and serialization

Stage 10 remains the canonical Acoustic Feature Extraction stage. Before it is represented as running in the constrained Render path, the API checks current process RSS against the configured operational admission threshold.

Current source reference configuration:

- `VOXVECTOR_MEMORY_LIMIT_MB=512`
- `VOXVECTOR_MEMORY_HEADROOM_MB=96`
- reference admission ceiling: 416 MiB

If measured process RSS is already at or above the admission ceiling, Stage 10 is not started. The run records an explicit downstream memory-admission failure while preserving completed upstream speech evidence. This operational gate is separate from Stage 09 Eligibility and Reliability and must never be represented as a scientific eligibility result.

The complete canonical downstream composite analysis also uses the process-wide heavyweight phase guard. Admission is fail-fast: if another composite call owns the heavyweight phase, a competing call fails before entering the analytical body rather than waiting in a worker-thread queue that can outlive the request. An admitted call rechecks RSS while holding the shared lock and retains that lock through complete composite execution.

The historical 2026-09-10 failure demonstrated why this boundary is required: faster-whisper completed, API-parent RSS later rose into the constrained service danger zone, Stage 10 started anyway on the old deployed source, and the API process restarted shortly afterward. The owner confirmed the incident was a memory problem.

The fail-fast serialization and locked RSS recheck are merged source behavior; controlled production acceptance remains #941.

## Connected case model

Every stage attaches to the same analysis case and stable route-owned case run.

The stage contract preserves:

- case ID
- analysis ID
- run ID
- pipeline run ID when available
- source asset ID
- stage ID
- stage state
- start time
- completion time
- duration
- input references
- output references
- method IDs
- source intervals
- evidence references
- related lifecycle events
- error references
- process instance ID
- hosting-provider instance provenance when available

The pipeline-internal execution ID is preserved separately as `pipeline_run_id`; it must not replace the persistent route-owned `run_id` during finalization.

## Analysis Workspace mapping

The Analysis Workspace presents the 21 stages as one expandable pipeline.

Each stage can expose:

- stage name
- stage purpose
- current state
- start time
- completion time
- duration
- input references
- output references
- methods used
- evidence produced
- source intervals
- related events

The pipeline is expandable so a user can move from the high-level workflow into the underlying analytical stage.

The frontend must consume the backend stage contract rather than maintaining a contradictory stage order or maturity claim. Current `voxvector/src/components/PipelineBuildCard.jsx` still has stale local Stage 05/06 ordering and queued Stage 07/08 fallback text; issue #965 owns repair in that existing canonical frontend owner.

## Synchronized audio analysis surface

The Analysis Workspace uses one shared time axis for audio and analytical evidence.

### Primary waveform

Display:

- waveform
- time ruler
- playhead
- speech regions
- pause regions
- speaker regions
- evidence markers
- selected intervals

### Analytical tracks

Initial product tracks:

- waveform
- pitch F0
- intensity
- spectral energy
- speech activity
- pauses

Expanded track families:

- formants
- HNR
- spectral flux
- spectral rolloff
- MFCC
- jitter
- shimmer
- voice quality
- response latency
- speaker turns
- transcript alignment
- evidence events

All tracks use timestamped observation contracts and share the same playhead.

## Transcript and speaker synchronization

The speaker and transcript layers are first-class analytical surfaces.

The synchronized contract supports:

- speaker regions
- speaker turns
- overlap regions
- speaker confidence
- transcript segments
- transcript words
- word timestamps
- speaker attribution
- alignment state
- disfluency markers
- question markers
- response boundaries
- evidence markers

Selecting transcript content moves the audio playhead to the associated interval.

Selecting an audio region reveals the associated transcript content when available.

## Evidence timeline

The evidence timeline connects analytical events to source intervals.

Event families include:

- response latency
- pause duration
- speech rate change
- pitch movement
- intensity movement
- speaker transition
- transcript event
- linguistic event
- evidence convergence
- evidence conflict
- selected finding

Every event must resolve to supporting evidence and a source interval.

## Evidence record contract

Every evidence record should preserve:

- analysis ID
- run ID
- method ID
- stage ID
- speaker ID when applicable
- start time
- end time
- observation
- measurement
- unit
- quality
- evidence direction
- provenance
- dependencies
- supporting evidence
- conflicting evidence
- alternative explanations

## Assessment architecture

The pipeline preserves four architectural layers.

### Eligibility and reliability

Determine whether the available material supports the requested analysis.

### Evidence collection and analysis

Extract and organize observations from audio, transcript, speaker, and contextual data.

### Candidate classification

Combine supported evidence into a candidate analytical state.

### Final classification and disposition

Apply the configured validation and calibration architecture before issuing the final output.

These stages remain distinct.

## Runtime versus product architecture

The 21 stages define the complete product architecture.

The current runtime implements the foundational subset documented in `docs/CAPABILITY_STATUS.md`.

Planned stages remain canonical product scope and are preserved in the method registry, roadmap, and implementation plan.

The frontend must never simulate a stage merely because the product architecture contains it.

## Engineering contract

- The pipeline is canonical.
- The frontend consumes pipeline state from the backend.
- The frontend does not recreate pipeline logic.
- Every stage has a defined input and output.
- Every stage can produce auditable provenance.
- Every analytical visualization maps to a stage or evidence family.
- Every status value represents actual runtime state.
- Progress values come from real stage data or explicit indeterminate state.
- Animation never stands in for analytical execution.
- Completed provider artifacts are persisted before dependent heavyweight downstream work begins.
- Stage 10 composite analysis uses fail-fast process-wide single-flight admission and a locked RSS recheck through execution.
- Runtime memory admission is operational safety, not scientific eligibility.
- Stable route-owned case-run identity remains separate from pipeline-internal run identity.
- One case identity connects intake, playback, analysis, evidence, assessment, and reporting.
- New analytical methods must map to a pipeline stage and a method registry entry.

## MVP dependency path

The fastest connected implementation path follows the pipeline dependency order:

1. Render/runtime configuration reproducibility under #964
2. persisted case identity and source
3. speech segmentation and provider-backed transcription
4. durable same-run provider checkpoint plus Stage 10 bounded production proof under #941
5. cloud-primary speaker execution under #970
6. transcript/audio/speaker alignment under #971
7. historical-case rehydration under #963
8. intake/observability acceptance under #930/#959
9. truthful frontend pipeline projection under #965
10. authenticated login/profile/browser acceptance under #931/PR #974
11. release-critical public navigation under #932
12. real analytical tracks and evidence records
13. evidence synthesis and assessment/report
14. frozen-candidate two-run golden verification under #972
15. scientific validation separately

## Related architecture

- `docs/ARCHITECTURE.md`
- `docs/PRODUCT_EXPERIENCE_ARCHITECTURE.md`
- `docs/IMPLEMENTATION_PLAN.md`
- `docs/MVP_BUILD_PLAN.md`
- `docs/CAPABILITY_STATUS.md`
- `docs/MASTER_METHOD_INDEX.md`
- `docs/RUNTIME_MEMORY_CONSTRAINTS.md`
