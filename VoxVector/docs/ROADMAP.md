# VoxVector Roadmap

VoxVector is being built toward a comprehensive vocal and audio deception analysis system.

The roadmap preserves the complete product direction while enforcing a dependency-first engineering sequence.

## Current engineering priority — 2026-09-04

**Current stage:** Controlled speech-provider execution, evidence artifact integration, and post-analysis review.

The live Render runtime now reports a configured and execution-ready faster-whisper transcription provider and pyannote Community-1 diarization provider, with Hugging Face token presence detected. The immediate priority is therefore to execute those providers on controlled real audio, persist their artifacts, and connect them to the shared case/run evidence model.

The Developer Console remains the operator projection of canonical runtime and CI evidence. It must not invent provider execution, stage progress, QA, infrastructure metrics, or scientific results.

## Fastest connected MVP path

1. case identity
2. recording intake and provenance
3. audio playback and waveform
4. real 21 stage lifecycle
5. controlled speaker processing
6. controlled transcription
7. timestamp normalization and transcript/speaker alignment
8. real analytical tracks
9. evidence normalization
10. evidence synthesis
11. assessment
12. report generation
13. case history and reopen
14. browser verification
15. production hardening
16. scientific validation

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
- server-side Render API bridge
- source revision provenance
- speech-provider readiness reporting

## Phase B — Case centered product shell

- persistent navigation
- New Analysis
- case creation
- source asset identity
- provenance
- audio player
- waveform viewer
- 21 stage pipeline
- shared playhead
- key metrics
- evidence timeline
- assessment surface
- responsive analytical layout
- Case History with persisted case/run reopen
- live analysis workflow state
- collapsible workbench sections
- scroll-safe Developer Console navigation
- structured audit copy/download
- deployment variable matrix access

## Phase C — Speaker and transcript intelligence

### Speaker

- speech segmentation — implemented foundation
- speaker identification
- diarization — provider configured/execution-ready; controlled execution next
- turn boundaries
- overlap detection
- speaker confidence
- separation quality
- speaker-aware evidence

### Transcript

- production ASR — faster-whisper configured/execution-ready; controlled execution next
- timestamped transcript
- word timestamps
- transcript confidence
- speaker attribution
- transcript persistence
- transcript provenance

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
- context-specific baselines

## Phase G — Research method expansion

- openSMILE-style descriptors
- eGeMAPS-style descriptors
- LPCC
- GFCC
- Teager Energy Operator
- spectral tilt
- expanded harmonic measures
- IAIF
- NAQ
- CQ
- OQ
- H1-H2
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
- Review Evidence surface

## Phase J — Deception inference development

- operational task definitions
- speaker-disjoint development data
- speaker-disjoint evaluation data
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
- speaker-disjoint evaluation
- cross-dataset evaluation
- recording-condition stress tests
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

Active capabilities include runtime health, API workbench, request inspection, lifecycle events, error reports, runtime diagnostics, methodology navigation, architecture navigation, pipeline navigation, prioritized MVP board, task checkoffs, phase completion, dependency visibility, current engineering stage visibility, expandable 21-stage status, documentation synchronization, next task visibility, Case History, live case-run projection, Render service/deployment/log status, structured audits, deployment-variable links, and copy/download controls for audit records.

The remaining console work connects these surfaces to fresh provider execution evidence, exact-commit QA, richer Review Evidence, and real case artifacts without implying scientific validation.

## Active engineering sequence — 2026-09-04

1. Exact-commit QA for source revision `23677b258a60e5cf25287cc0dce3b199f472a7c1`.
2. Controlled faster-whisper execution on a known WAV fixture.
3. Controlled pyannote Community-1 execution on the same fixture.
4. Persist transcript and speaker artifacts under case/run identity.
5. Normalize timestamps and produce the multimodal alignment artifact.
6. Expose transcript, speaker and evidence synchronization in the Analysis Workspace.
7. Feed acquired transcript into linguistic/disfluency analysis.
8. Add question/response boundaries and interaction timing.
9. Add speaker-aware acoustic aggregation and independent baseline inputs.
10. Complete granular stage callbacks where actual method boundaries exist.
11. Build Review Evidence, assessment, reporting, and history/reopen from persistent case state.
12. Complete authenticated browser/mobile verification.
13. Begin scientific evaluation only after the engineering evidence chain is stable.

## Research expansion rule

Research feature expansion continues in parallel but must not displace the connected case workflow. A research method becomes an active runtime capability only after implementation, integration, QA, and the required validation pathway are established.

## Documentation synchronization

Current canonical records include:

- `docs/CURRENT_ENGINEERING_STATE_2026-09-04.md`
- `docs/ENDPOINT_REGISTRY.md`
- `docs/VERSION_MAP.md`
- `docs/IMPLEMENTATION_PLAN.md`
- `docs/MVP_BUILD_PLAN.md`
- `docs/PIPELINE_BUILD_STATUS.md`
- `docs/CAPABILITY_STATUS.md`
- `docs/QA_STATUS.md`
- `docs/DEVELOPER_CONSOLE_DOC_SYNC_RULES.md`
- `docs/DEPLOYMENT_VARIABLE_MATRIX.md`
- `docs/audits/LIVE_API_SPEECH_RUNTIME_AUDIT_2026-09-03.md`
