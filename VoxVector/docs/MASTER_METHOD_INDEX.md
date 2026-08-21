# VoxVector Master Method Index — Individual Data Points

**Canonical inventory of individual measurements, derived statistics, inputs, outputs, quality fields, and planned analysis data points.**

This document is intentionally more granular than a method list. A method is a container; the bullets under it are the individual data points that the method can produce, consume, or is intended to produce. Current implementation status is preserved separately from planned research.

**Status vocabulary**
- **CURRENT / INTEGRATED** — implemented and emitted or orchestrated by the primary runtime.
- **CURRENT / ASSET** — implemented reusable code, but not currently primary-pipeline integrated.
- **PLANNED** — documented future implementation or research candidate.
- **VALIDATION** — required evaluation data point or control, not a production inference feature.
- **NOT VALIDATED** — implemented software behavior does not establish deception-detection validity.

**Scientific boundary:** no individual vocal, acoustic, linguistic, behavioral, emotional, or psychological feature proves deception. VoxVector must preserve observations, convergence, conflict, uncertainty, alternative explanations, and reliability separately.

---

# D01 — Signal / Acoustic Fundamentals

## D01.01 Frame construction — CURRENT
- Input waveform samples
- Sample count
- Sample rate
- Frame size
- Hop size
- Frame count
- Frame start index
- Frame end index
- Frame duration
- Segment start time
- Segment end time

## D01.02 RMS energy — CURRENT / INTEGRATED
- Frame RMS
- Mean RMS
- Median RMS
- RMS standard deviation
- RMS minimum
- RMS maximum
- RMS range
- Finite RMS count
- RMS unavailable count

## D01.03 Intensity — CURRENT / INTEGRATED
- Relative intensity / dB
- Reference level
- Mean intensity
- Median intensity
- Intensity standard deviation
- Intensity minimum
- Intensity maximum
- Intensity range
- Finite intensity count
- Intensity unavailable count

## D01.04 Zero-crossing rate — CURRENT
- Zero crossings per frame
- Mean zero-crossing rate
- Median zero-crossing rate
- Standard deviation
- Minimum
- Maximum
- Range

## D01.05 Signal-level quality — CURRENT
- Empty input state
- Silence state
- Non-finite sample state
- Signal availability
- Segment quality
- Segment duration
- Method ID
- Segment provenance

---

# D02 — Spectral Analysis

## D02.01 Spectrum — CURRENT
- Windowed waveform
- Magnitude spectrum
- FFT bin index
- FFT output width
- Frequency-bin vector
- Nyquist frequency
- Sample-rate-to-bin mapping

## D02.02 Spectral centroid — CURRENT / INTEGRATED
- Spectral centroid in Hz per frame
- Mean centroid
- Median centroid
- Standard deviation
- Minimum
- Maximum
- Range
- Spectral-energy denominator
- Zero-spectrum / unavailable state

## D02.03 Spectral spread — CURRENT / INTEGRATED
- Spectral spread in Hz per frame
- Weighted spectral variance
- Square-root spectral spread
- Mean spread
- Median spread
- Standard deviation
- Minimum
- Maximum
- Range
- Zero-spectrum / unavailable state

## D02.04 Spectral flux — CURRENT / INTEGRATED
- Frame-to-frame spectral change
- Normalized spectral flux
- Previous-frame spectrum
- Current-frame spectrum
- Flux vector length
- Flux mean
- Flux median
- Flux standard deviation
- Flux minimum
- Flux maximum
- Flux range

## D02.05 Spectral rolloff — CURRENT / INTEGRATED
- Rolloff fraction
- Default rolloff fraction: 0.85
- Cumulative spectral energy
- Rolloff threshold
- Rolloff bin index
- Rolloff frequency in Hz
- Per-frame rolloff
- Mean rolloff
- Median rolloff
- Standard deviation
- Minimum
- Maximum
- Range

## D02.06 Planned spectral data points
- Spectral slope
- Spectral tilt
- Spectral skewness
- Spectral kurtosis
- Additional spectral flux variants
- Spectral entropy
- Spectral flatness
- Spectral bandwidth
- Additional harmonic spectral descriptors
- openSMILE / eGeMAPS-style spectral descriptors

---

# D03 — Cepstral Analysis

## D03.01 MFCC — CURRENT / INTEGRATED
- MFCC coefficient 1
- MFCC coefficient 2
- MFCC coefficient 3
- MFCC coefficient 4
- MFCC coefficient 5
- MFCC coefficient 6
- MFCC coefficient 7
- MFCC coefficient 8
- MFCC coefficient 9
- MFCC coefficient 10
- MFCC coefficient 11
- MFCC coefficient 12
- MFCC coefficient 13
- Per-coefficient mean
- Per-coefficient finite count
- Cepstral provenance
- Segment provenance
- Method ID

## D03.02 Planned MFCC expansion
- Per-coefficient median
- Per-coefficient standard deviation
- Per-coefficient minimum
- Per-coefficient maximum
- Delta MFCCs
- Delta-delta MFCCs
- Frame-level MFCC trajectories

## D03.03 LPCC — PLANNED
- LPCC coefficient vector
- LPC order
- Prediction coefficients
- Cepstral coefficient statistics
- Stability / failed-LPC state

## D03.04 GFCC — PLANNED
- Gammatone filterbank outputs
- GFCC coefficient vector
- Per-coefficient statistics
- Configuration metadata
- Failed-configuration state

---

# D04 — Fundamental Frequency / Pitch

## D04.01 F0 — CURRENT / INTEGRATED
- F0 Hz per frame
- Minimum F0 search frequency
- Maximum F0 search frequency
- F0 lag
- Autocorrelation peak
- Voicing threshold
- Voiced F0 count
- Unvoiced F0 count
- F0 mean
- F0 median
- F0 standard deviation
- F0 range
- F0 p10
- F0 p90
- F0 slope
- F0 first-to-last delta

## D04.02 F0 quality states — CURRENT
- Unvoiced frame
- Short frame
- Zero-energy frame
- Non-finite frame
- Insufficient lag range
- F0 unavailable / NaN

## D04.03 Planned pitch data points
- Pitch contour smoothing
- Pitch excursion
- Pitch acceleration
- Pitch variability over time
- Local pitch perturbation
- Phrase-level pitch movement
- Question / answer pitch contour comparison
- Baseline-relative pitch deviation

---

# D05 — Prosody / Intonation

## D05.01 Generic contour summary — CURRENT
For each supported contour:
- Mean
- Median
- Standard deviation
- Range
- P10
- P90
- Slope
- Finite sample count
- Missing sample count

## D05.02 F0 dynamics — CURRENT
- F0 mean
- F0 median
- F0 standard deviation
- F0 range
- F0 p10
- F0 p90
- F0 slope
- F0 delta

## D05.03 Intensity dynamics — CURRENT
- Intensity mean
- Intensity median
- Intensity standard deviation
- Intensity range
- Intensity p10
- Intensity p90
- Intensity slope
- Intensity delta

## D05.04 Planned prosodic data points
- Intonation contour shape
- Pitch reset
- Phrase-final movement
- Phrase-initial movement
- Prosodic boundary strength
- Accent prominence
- Prosodic variability
- Prosodic acceleration
- Prosodic change-point locations
- Context-relative prosodic deviation

---

# D06 — Intensity / Energy Dynamics

## D06.01 CURRENT
- RMS mean
- RMS median
- RMS standard deviation
- RMS range
- dB mean
- dB median
- dB standard deviation
- dB range
- Intensity p10
- Intensity p90
- Intensity slope
- Intensity delta
- Energy contour
- Intensity contour

## D06.02 PLANNED
- Energy acceleration
- Energy change points
- Relative intensity against speaker baseline
- Question / answer intensity comparison
- Phrase-level intensity dynamics
- Context-relative loudness deviation

---

# D07 — Voice Quality

## D07.01 Harmonicity — CURRENT
- Normalized autocorrelation harmonicity
- Maximum valid autocorrelation within F0 search range
- Harmonicity mean
- Harmonicity median
- Harmonicity standard deviation
- Harmonicity range
- Harmonicity unavailable count

## D07.02 HNR — CURRENT / INTEGRATED
- HNR in dB
- Valid HNR count
- Invalid HNR count
- Infinite HNR state when harmonicity >= 1
- NaN state for invalid harmonicity
- HNR mean
- HNR median
- HNR standard deviation
- HNR range

## D07.03 Jitter — CURRENT / ASSET
- Local jitter
- Valid period count
- Mean period
- Absolute adjacent period differences
- Period perturbation ratio
- Insufficient-period state

## D07.04 Shimmer — CURRENT / ASSET
- Local shimmer
- Valid amplitude count
- Mean cycle amplitude
- Absolute adjacent amplitude differences
- Amplitude perturbation ratio
- Insufficient-amplitude state

## D07.05 Signal quality — CURRENT
- Clipping ratio
- Clipping threshold
- DC offset
- Empty-signal state
- Non-finite-sample state

## D07.06 Planned voice-quality data points
- Additional harmonicity measures
- Spectral tilt
- H1-H2
- Harmonic amplitude differences
- Voice-quality perturbation statistics
- OpenSMILE / eGeMAPS voice-quality descriptors
- Glottal excitation descriptors

---

# D08 — Glottal Source

## D08.01 PLANNED
- Glottal waveform
- Glottal cycle duration
- Open quotient (OQ)
- Closed quotient (CQ)
- Normalized amplitude quotient (NAQ)
- H1-H2
- H1-A1
- H1-A3
- Glottal spectral tilt
- Maximum flow derivative
- Glottal closure characteristics
- IAIF residual
- Inverse-filtered source signal
- Source-excitation statistics
- Glottal-cycle variability

---

# D09 — Formants / Vocal Tract

## D09.01 Formant candidate extraction — CURRENT
- Candidate F1 frequency
- Candidate F2 frequency
- Candidate F3 frequency
- Candidate F4 frequency
- Number of requested formants
- Minimum formant frequency
- Maximum formant frequency
- Effective maximum frequency
- FFT frequency vector
- Spectral peak amplitude
- Peak rank
- Peak spacing
- Per-frame candidate availability

Current defaults:
- n_formants = 4
- min_hz = 200 Hz
- max_hz = 5000 Hz, bounded by Nyquist
- minimum peak spacing = max(100 Hz, sample_rate / frame_size)

## D09.02 Formant tracking — CURRENT
- Frame index
- F1 trajectory
- F2 trajectory
- F3 trajectory
- F4 trajectory
- Stable candidate state
- Unstable frame state
- Missing candidate state
- Frame-level provenance

## D09.03 Planned formant data points
- Formant bandwidths
- Formant amplitudes
- Formant trajectories
- Formant slope
- Formant range
- Formant variability
- Formant transition dynamics
- Formant stability
- Phonetic vowel association
- Phoneme-conditioned formant measures

**Boundary:** current formant output is a spectral candidate observation, not a phonetic formant claim.

---

# D10 — Temporal / Speech Rate

## D10.01 Voicing — CURRENT
- Voiced frame count
- Total frame count
- Voiced fraction
- Energy threshold
- F0 finite state
- Voiced mask

## D10.02 Pause detection — CURRENT
- Energy threshold
- Quiet-frame mask
- Contiguous quiet runs
- Pause run start
- Pause run end
- Pause duration
- Minimum pause duration
- Pause count
- Total pause duration
- Mean pause duration

Current pause primitive defaults:
- Energy threshold = 1e-4
- Minimum pause duration = 0.20 s

## D10.03 Pause topology — CURRENT / RESEARCH ASSET
- Pause count
- Pause density
- Longest pause
- Pause median
- Pause P90
- Voiced-run mean duration
- Pause duration vector
- Voiced-run duration vector
- Total analyzed duration

The research timing topology function uses a default energy threshold of 0.01 and computes pause and voiced runs from frame masks.

## D10.04 Speech rate — CURRENT / RESEARCH ASSET
- Syllable count input
- Voiced seconds input
- Syllables per voiced second
- Zero-duration state
- Invalid negative-input state

## D10.05 Articulation rate — CURRENT / RESEARCH ASSET
- Syllable count input
- Articulation seconds input
- Syllables per articulation second
- Zero-duration state
- Invalid negative-input state

---

# D11 — Pause / Hesitation

## D11.01 CURRENT data points
- Pause count
- Pause density
- Mean pause duration
- Total pause duration
- Longest pause
- Median pause duration
- P90 pause duration
- Voiced-run mean duration
- Pause start time
- Pause end time
- Pause position within segment
- Pause duration distribution

## D11.02 PLANNED
- Initial response pause
- Mid-answer pause count
- Mid-answer pause duration
- Final-answer pause behavior
- Question-relative pause position
- Pause clustering
- Pause spacing
- Pause acceleration / change over answer
- Baseline-relative pause deviation
- Pause topology by conversational context

---

# D12 — Response Latency

## D12.01 CURRENT / ASSET
- Question end timestamp
- First speech timestamp
- First substantive speech timestamp
- First speech latency
- First substantive latency
- Filler-before-content latency

## D12.02 Validation controls
- First speech must not precede question end
- First substantive speech must not precede first speech
- First substantive speech must not precede question end
- Numeric timestamp validation
- Reversed interval rejection

## D12.03 PLANNED
- Question-type-specific latency
- Baseline-relative latency
- Latency distribution across answers
- Latency median
- Latency P90
- Latency variance
- Latency change across interview
- Latency relative to semantic difficulty

---

# D13 — Turn Taking / Interaction

## D13.01 CURRENT / ASSET
- Turn start timestamp
- Turn end timestamp
- Turn duration
- Speaker A start
- Speaker A end
- Speaker B start
- Speaker B end
- Overlap duration
- Non-overlap duration
- Response latency
- Speaker / segment provenance

## D13.02 PLANNED
- Turn transition count
- Turn transition latency
- Interruption count
- Interruption duration
- Overlap count
- Overlap density
- Backchannel count
- Backchannel timing
- Turn-length distribution
- Speaker dominance / floor time
- Conversational rhythm
- Turn-taking irregularity

---

# D14 — Speaker Baseline

## D14.01 CURRENT
- Baseline median
- Baseline MAD
- Baseline sample count
- Current value
- Baseline-relative deviation
- Robust scale = max(1.4826 × MAD, minimum MAD)
- Baseline eligibility
- Independent baseline provenance

## D14.02 PLANNED
- Baseline mean
- Baseline standard deviation
- Baseline percentile distribution
- Baseline by feature
- Baseline by context
- Baseline by question type
- Baseline drift
- Baseline stability
- Baseline segment quality
- Baseline contamination state
- Baseline leakage state
- Multiple independent baseline windows

---

# D15 — Transcript / Linguistic

## D15.01 CURRENT when transcript is supplied
- Token sequence
- Token count
- Transcript provenance
- Transcript confidence where supplied
- Filled-pause tokens
- Repetition tokens
- Filled-pause count
- Repetition count
- Filled-pause rate
- Repetition rate

## D15.02 Current filler vocabulary
- um
- uh
- er
- erm
- hmm

Custom filler sets are supported.

## D15.03 PLANNED
- Word timestamps
- Phoneme timestamps
- Word duration
- Phoneme duration
- Word rate
- Syllable rate
- Lexical diversity
- Type-token ratio
- Content-word rate
- Function-word rate
- Pronoun use
- Negation count
- Hedging count
- Certainty language
- Intensifier use
- Modal verbs
- Quantifiers
- Temporal expressions
- Spatial expressions
- Discourse markers
- Topic terms
- Named entities
- Semantic embeddings
- Transformer representations
- Transcript confidence by word

---

# D16 — Disfluency / Repairs

## D16.01 CURRENT data model
- Filled pauses
- False starts
- Repairs
- Repetitions
- Fragments
- Abandoned phrases
- Total disfluencies
- Token count
- Disfluency rate
- Repetition rate

The reusable data model already represents false starts, repairs, fragments, and abandoned phrases even though automated detection/alignment remains a planned capability.

## D16.02 PLANNED
- False-start locations
- False-start duration
- Repair locations
- Repair duration
- Repaired token count
- Fragment count
- Fragment rate
- Abandoned phrase count
- Abandoned phrase rate
- Disfluency clustering
- Disfluency timing relative to question onset
- Disfluency timing relative to answer completion
- Alignment confidence

---

# D17 — Question / Answer Alignment

## D17.01 PLANNED data points
- Question start
- Question end
- Answer start
- Answer end
- First speech start
- First substantive speech start
- Question duration
- Answer duration
- Response latency
- Filler-before-content latency
- Question token count
- Answer token count
- Question / answer semantic similarity
- Topic alignment
- Answer relevance
- Direct-answer indicator
- Question repetition indicator
- Answer completeness
- Alignment confidence
- Segmentation confidence

---

# D18 — Semantic / Consistency Analysis

## D18.01 PLANNED
- Claim extraction
- Claim count
- Claim embeddings
- Claim-to-claim similarity
- Contradiction probability
- Entailment probability
- Neutrality probability
- Cross-answer consistency
- Temporal consistency
- Entity consistency
- Numerical consistency
- Location consistency
- Relationship consistency
- Event-order consistency
- Topic consistency
- Answer relevance
- Question-answer semantic similarity
- Narrative coherence
- Semantic change across repeated answers

These are candidate evidence measures, not direct deception proof.

---

# D19 — Learned Speech Representations

## D19.01 PLANNED model families
- WavLM embeddings
- wav2vec 2.0 embeddings
- HuBERT embeddings
- Conformer representations
- Audio Spectrogram Transformer representations
- Segment embeddings
- Utterance embeddings
- Frame embeddings
- Temporal embeddings
- Learned acoustic embeddings
- Learned prosodic embeddings
- Learned voice-quality embeddings

## D19.02 Required metadata
- Model name
- Model version
- Model configuration
- Sampling rate requirement
- Input duration
- Embedding dimension
- Segment boundaries
- Speaker identity metadata
- Recording-condition metadata

---

# D20 — Temporal Neural Modeling

## D20.01 PLANNED
- Sequence embedding
- Temporal attention weights
- Segment importance
- Utterance-level representation
- Long-range dependency representation
- Temporal pooling
- Attention pooling
- Segment aggregation
- Evidence sequence representation
- Cross-feature temporal interaction
- Acoustic-linguistic temporal fusion
- Temporal confidence

---

# D21 — Speaker Diarization / Separation

## D21.01 PLANNED
- Speaker count
- Speaker labels
- Speaker segment start
- Speaker segment end
- Speaker duration
- Speaker speaking fraction
- Speaker turn count
- Speaker overlap
- Cross-speaker contamination
- Speaker attribution confidence
- Channel attribution
- Speaker-conditioned feature vectors
- Speaker-specific baseline

---

# D22 — Recording / Channel / Media Integrity

## D22.01 CURRENT
- Clipping ratio
- Clipping threshold
- DC offset
- Empty input
- Silence state
- Non-finite input state
- Signal duration
- Sample rate
- Channel count
- Segment quality
- Method provenance

## D22.02 PLANNED
- Noise floor
- Signal-to-noise ratio
- Reverberation estimate
- Compression artifact score
- Microphone/channel fingerprint
- Channel mismatch
- Background-noise class
- Environmental-noise level
- Codec metadata
- Resampling detection
- Splicing/artifact indicators
- Recording-condition confidence
- Audio authenticity indicators

---

# D23 — Eligibility / Reliability

## D23.01 CURRENT data points
- Input present
- Duration
- Sample rate
- Channel availability
- Signal quality
- Clipping state
- Silence state
- Finite-sample state
- Speaker availability where applicable
- Transcript availability where applicable
- Transcript confidence where supplied
- Baseline availability
- Baseline eligibility
- Context completeness
- Missing-data state
- Method availability
- Segment quality
- Reliability gate state

## D23.02 PLANNED
- Minimum usable duration
- Minimum voiced duration
- Minimum independent baseline duration
- Speaker separation confidence
- Transcript quality threshold
- Recording-condition threshold
- Out-of-distribution distance
- Population compatibility
- Task compatibility
- Evidence sufficiency
- Reliability confidence
- Explicit rejection reason

---

# D24 — Evidence Convergence / Conflict

## D24.01 CURRENT foundation
- Method ID
- Feature name
- Observed value
- Unit
- Segment
- Quality
- Direction / descriptive state where available
- Provenance
- Missing/unavailable state

## D24.02 PLANNED
- Evidence count
- Independent evidence count
- Evidence agreement
- Evidence disagreement
- Evidence conflict count
- Evidence convergence strength
- Method dependence estimate
- Evidence redundancy
- Evidence coverage
- Evidence sufficiency
- Cross-method consistency
- Evidence provenance graph
- Convergence confidence
- Conflict confidence

---

# D25 — Alternative Explanations / Confounders

## D25.01 PLANNED data points
- Fatigue indicator
- Illness / voice-quality context
- Anxiety/stress context
- Topic sensitivity
- Emotional-arousal context
- Cognitive-load context
- Language mismatch
- Accent mismatch
- Speaker adaptation
- Microphone effect
- Channel effect
- Environmental noise
- Compression effect
- Recording artifact
- Dataset artifact
- Speaker identity leakage
- Model shortcut signal
- Baseline contamination
- Ordinary conversational variation
- Alternative-explanation confidence

---

# D26 — Uncertainty / Calibration

## D26.01 PLANNED
- Raw model score
- Calibrated probability
- Calibration error
- Confidence estimate
- Data-quality uncertainty
- Model uncertainty
- Evidence uncertainty
- Evidence-conflict uncertainty
- Epistemic uncertainty where supported
- Aleatoric uncertainty where supported
- Confidence interval
- Reliability-adjusted confidence
- Abstention threshold
- Out-of-distribution uncertainty
- Calibration curve data
- Brier score
- Expected calibration error
- Reliability diagram data

---

# D27 — Candidate Classification

## D27.01 Current boundary
- Candidate classification state
- Indeterminate state
- Fail-closed state
- Insufficient-evidence state

## D27.02 Planned
- Candidate deception hypothesis
- Candidate non-deception hypothesis
- Candidate probability
- Evidence support
- Evidence contradiction
- Alternative-explanation burden
- Classification confidence
- Classification uncertainty
- Classification eligibility
- Classifier provenance
- Model version
- Calibration version

---

# D28 — Deception Inference

## D28.01 Planned / validation gated
- Operational task definition
- Target claim
- Evidence vector
- Feature vector
- Multimethod evidence representation
- Candidate deception probability
- Candidate non-deception probability
- Calibrated probability
- Confidence matrix
- Evidence convergence
- Evidence conflict
- Alternative explanations
- Reliability state
- Uncertainty state
- Model provenance
- Dataset provenance
- Validation population
- Validation condition
- Final classification

## D28.02 Candidate model families
- Logistic regression
- Tree-based models
- SVM-style models
- Ensemble methods
- Neural classifiers
- Learned-representation classifiers
- Temporal classifiers
- Multimethod fusion classifiers
- Task-specific classifiers

No model family is validated merely by implementation.

---

# D29 — Multimodal Audio / Video

## D29.01 PLANNED audio/video data points
- Video frame timestamps
- Facial Action Units
- Facial movement
- Facial expression features
- Head movement
- Eye-region behavior where technically supported
- Audio/video synchronization offset
- Cross-modal temporal alignment
- Audio evidence vector
- Visual evidence vector
- Cross-modal agreement
- Cross-modal conflict
- Cross-modal confidence
- Multimodal reliability

---

# D30 — Synthetic Speech / Media Integrity

## D30.01 PLANNED
- Synthetic-speech probability
- Voice-cloning probability
- Generated-audio artifact score
- Source-model artifact indicators
- Spectral generation artifacts
- Phase artifacts
- Prosodic generation artifacts
- Voice-identity consistency
- Audio/video generation mismatch
- Provenance metadata
- Authenticity confidence
- Benchmark performance

This is media integrity analysis, distinct from deception inference.

---

# D31 — Scientific Validation / Robustness Data Points

## D31.01 Dataset controls
- Speaker-disjoint training split
- Speaker-disjoint validation split
- Speaker-disjoint test split
- Cross-dataset test set
- Recording-condition partitions
- Language partitions
- Accent partitions where applicable
- Population partitions
- Task partitions

## D31.02 Performance data points
- Accuracy
- Balanced accuracy
- Precision
- Recall / sensitivity
- Specificity
- F1
- ROC-AUC
- PR-AUC
- Confusion matrix
- False-positive rate
- False-negative rate
- Calibration error
- Brier score
- Abstention rate
- Coverage
- Selective risk
- Confidence-stratified performance

## D31.03 Robustness / leakage data points
- Speaker identity leakage
- Recording-condition leakage
- Dataset artifact leakage
- Microphone leakage
- Channel leakage
- Language effect
- Accent effect
- Population effect
- Task effect
- Cross-dataset degradation
- Distribution shift
- Out-of-distribution behavior

## D31.04 Validation controls
- Operational definition freeze
- Population definition
- Deployment condition definition
- Reproducible preprocessing
- Frozen evaluation protocol
- Independent replication
- External validation
- Scientific review
- Failure analysis
- Abstention analysis

---

# D32 — Final Classification / Disposition / Abstention

## D32.01 CURRENT boundary outputs
- Eligible / ineligible
- Reliable / unreliable
- Evidence available / unavailable
- Insufficient evidence
- Abstain
- Indeterminate
- Final disposition gate state

## D32.02 PLANNED final output data points
- Final candidate classification
- Calibrated deception probability
- Confidence matrix
- Reliability state
- Evidence convergence summary
- Evidence conflict summary
- Alternative explanations
- Uncertainty summary
- Model provenance
- Method provenance
- Dataset provenance
- Validation status
- Abstention reason
- Task definition
- Population definition
- Recording-condition definition

---

# Cross-Cutting Data Fields — Every Observation

Where applicable, every observation should retain:

- Method ID
- Feature name
- Value
- Unit
- Segment start
- Segment end
- Segment duration
- Quality score/state
- Input provenance
- Speaker provenance
- Baseline provenance
- Transcript provenance
- Model provenance
- Version
- Availability state
- Missing-data reason
- Failure state
- Validation status
- Inferential status

# Cross-Cutting Failure Semantics

- No fabricated values
- Explicit unavailable states
- NaN preservation where mathematically appropriate
- Deterministic empty-input handling
- Deterministic invalid-input rejection
- Fail-closed planned methods
- Reversed timestamp rejection
- Invalid frequency-range rejection
- Invalid sample-rate rejection
- Insufficient-frame handling
- Insufficient-period handling
- Insufficient-amplitude handling
- Missing-alignment handling
- Missing-baseline handling
- Missing-speaker-attribution handling
- Missing-transcript handling
- Missing-context handling

# Cross-Cutting Scientific Controls

- Observation is not inference.
- A feature is not a deception label.
- A model score is not automatically a probability.
- A probability is not automatically calibrated.
- A passing software test is not scientific validation.
- Research findings are not automatically product capabilities.
- Population performance must be measured rather than assumed.
- Speaker-disjoint evaluation is required for meaningful speaker generalization claims.
- Recording-condition and identity leakage must be tested.
- Evidence convergence and evidence conflict must remain visible.
- Alternative explanations must remain visible.
- Reliability and eligibility remain separate from evidence and final disposition.
- Abstention is a valid result when evidence or validation is insufficient.

# Canonical Status References

- `docs/OPERATING_CHARTER.md` — governing scientific and product rules
- `docs/PROJECT_DECISION_LOG.md` — project decisions
- `docs/CAPABILITY_STATUS.md` — implementation/capability state
- `docs/METHOD_QA_MATRIX.md` — implementation-level QA matrix
- `docs/ROADMAP.md` — planned research and development sequence

**This index is intentionally exhaustive at the data-point level. It does not claim that planned data points currently exist in runtime output. Current runtime status remains authoritative.**