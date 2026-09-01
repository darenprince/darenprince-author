# VoxVector Roadmap

VoxVector is being built toward a comprehensive vocal and audio deception analysis system.

The roadmap preserves the complete product direction while enforcing a dependency first engineering sequence.

## Current engineering priority — 2026-08-30

**Current stage:** Upload and intake reliability.

**Next dependency:** Real per-stage telemetry and lifecycle reporting.

The Developer Console dashboard exposes the current engineering stage through the expandable 21-stage build status surface. The 21-stage build surface is an operator projection of the canonical pipeline build record and must not invent progress.

Any substantive implementation change must be synchronized across the relevant canonical engineering records and the Crown Labs product mirror according to `VoxVector/docs/DEVELOPER_CONSOLE_DOC_SYNC_RULES.md`.

## End state references

- `docs/PRODUCT_EXPERIENCE_ARCHITECTURE.md`
- `docs/ARCHITECTURE.md`
- `docs/ANALYSIS_PIPELINE.md`
- `docs/IMPLEMENTATION_PLAN.md`
- `docs/MVP_BUILD_PLAN.md`
- `docs/PIPELINE_BUILD_STATUS.md`
- `docs/CURRENT_ENGINEERING_STATE_2026-08-30.md`

## Fastest connected MVP path

1. case identity
2. recording intake and provenance
3. audio playback and waveform
4. real 21 stage lifecycle
5. speaker processing
6. production transcription
7. transcript alignment
8. real analytical tracks
9. evidence normalization
10. evidence synthesis
11. assessment
12. report generation
13. case history and reopen
14. browser verification
15. production hardening

This is the primary engineering path.

## Phase A — Foundation and runtime hardening

- MFCC primary pipeline integration
- Render runtime baseline
- formant FFT boundary hardening
- request correlation
- lifecycle diagnostics
- durable diagnostic storage
- resource safeguards
- timeout controls
- cancellation controls
- current CI verification
- reproducibility controls
- runtime fingerprinting

## Phase B — Case centered product shell

- persistent navigation
- New Analysis
- case creation
- source asset identity
- provenance
- audio player
- waveform viewer
- 21 stage pipeline component
- shared playhead
- key metrics
- evidence timeline
- assessment surface
- responsive analytical layout

## Phase C — Speaker and transcript intelligence

### Speaker

- speech segmentation
- speaker identification
- diarization
- turn boundaries
- overlap detection
- speaker confidence
- separation quality
- speaker aware evidence

### Transcript

- production ASR
- timestamped transcript
- word timestamps
- transcript confidence
- speaker attribution
- transcript persistence

### Alignment

- word alignment
- audio to transcript synchronization
- transcript to audio synchronization
- speaker turn synchronization
- question and response boundaries

## Phase D — Analytical track expansion

- waveform
- pitch F0
- intensity
- spectral energy
- speech activity
- pauses
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

## Phase E — Linguistic and conversational intelligence

- lexical analysis
- syntactic structure
- semantic representation
- disfluency expansion
- false starts
- repairs
- hedging
- certainty
- negation
- discourse structure
- question identification
- response alignment
- contradiction analysis
- consistency analysis

## Phase F — Speaker baselines

- baseline selection
- baseline quality
- feature distributions
- robust deviation measures
- baseline provenance
- leakage controls
- baseline visualization
- context specific baselines

## Phase G — Research method expansion

- openSMILE style descriptors
- eGeMAPS style descriptors
- LPCC
- GFCC
- Teager Energy Operator
- spectral tilt
- expanded harmonic measures
- IAIF
- NAQ
- CQ
- OQ
- H1 H2
- richer glottal source measures

## Phase H — Learned representations

- WavLM
- wav2vec 2.0
- HuBERT
- Conformer
- Audio Spectrogram Transformer
- temporal attention
- sequence models
- speaker identity leakage evaluation
- recording condition leakage evaluation

## Phase I — Evidence intelligence

- normalized evidence records
- method provenance
- evidence relationships
- convergence analysis
- conflict analysis
- dependence modeling
- alternative hypothesis analysis
- evidence timeline
- Evidence Explorer

## Phase J — Deception inference development

- operational task definitions
- speaker disjoint development data
- speaker disjoint evaluation data
- multimethod convergence evaluation
- confounder analysis
- identity leakage testing
- recording condition testing
- candidate classifier development
- interpretable model evaluation
- learned model evaluation
- calibration
- uncertainty
- decision thresholds

## Phase K — Scientific validation

- frozen operational definitions
- target populations
- deployment conditions
- speaker disjoint evaluation
- cross dataset evaluation
- recording condition stress tests
- identity sensitivity analysis
- subgroup robustness where appropriate
- language robustness where appropriate
- calibration analysis
- uncertainty analysis
- external replication

## Phase L — Product completion

- reports
- history
- comparisons
- alerts
- saved analysis runs
- Evidence Explorer
- secure media access
- retention controls
- deletion workflows
- browser verification
- accessibility verification
- mobile verification
- production reliability verification

## Developer Console roadmap

The Developer Console is the engineering cockpit.

Priority capabilities:

- runtime health
- API workbench
- request inspection
- lifecycle events
- error reports
- runtime diagnostics
- methodology navigation
- architecture navigation
- pipeline navigation
- prioritized MVP board
- persistent task checkoffs
- phase completion
- dependency visibility
- current engineering stage visibility
- 21-stage build status with expandable per-stage state
- documentation synchronization visibility
- next task visibility

## Product experience completion sequence

1. Product shell
2. Case intake
3. Audio playback
4. Synchronized waveform
5. Real pipeline lifecycle
6. Speaker intelligence
7. Transcription
8. Alignment
9. Real analytical tracks
10. Linguistic intelligence
11. Question and answer intelligence
12. Evidence synthesis
13. Assessment
14. Reports
15. History
16. Comparisons
17. Alerts
18. Production hardening

## Research expansion rule

Research feature expansion continues in parallel.

It must not displace the connected case workflow.

A method becomes part of the active runtime only after implementation integration QA and the required validation pathway are established.

## Documentation synchronization

The roadmap is synchronized with:

- `docs/ANALYSIS_PIPELINE.md`
- `docs/IMPLEMENTATION_PLAN.md`
- `docs/MVP_BUILD_PLAN.md`
- `docs/CAPABILITY_STATUS.md`
- `docs/MASTER_METHOD_INDEX.md`
- `docs/METHOD_QA_MATRIX.md`
- `docs/VALIDATION.md`
- `docs/PIPELINE_BUILD_STATUS.md`
- `docs/CURRENT_ENGINEERING_STATE_2026-08-30.md`
- `docs/DEVELOPER_CONSOLE_DOC_SYNC_RULES.md`
- `docs/DOCS_ALIGNMENT_2026-08-28.md`

## 2026-09-01 roadmap checkpoint

The production case execution clears the basic upload → persistence → case-bound analysis blocker for the observed configured workflow.

The roadmap priority therefore advances to the **post-analysis experience** before deeper research expansion:

`Analysis completion → Analysis Results / Review Evidence → full audit timeline → real stage telemetry → speaker/transcript foundation → evidence workspace → assessment/reporting`

The duration projection defect found during production execution is isolated to the Developer Console relational observability surface. Its repair is implemented in the canonical backend and regression tested without changing the existing database schema. This work supports, rather than replaces, the broader roadmap item for developer observability.

The 21-stage roadmap remains unchanged in scope. Current production execution does not promote queued, conditional, or not-invoked stages to implemented or validated status.

## Active engineering sequence — Evidence Acquisition

The immediate development sequence is now:

1. Evidence acquisition foundation — implemented foundation
2. Recording/media profile expansion — next
3. Speaker diarization provider boundary — next
4. Production transcription provider integration — next
5. Word and segment timestamp normalization — next
6. Transcript/audio alignment — next
7. Multimodal evidence timeline — next
8. Linguistic, interaction, baseline, and convergence expansion — follows acquired data

Telemetry continues alongside these engines but must instrument real execution rather than drive the roadmap ahead of data acquisition.
