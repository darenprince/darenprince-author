# VoxVector Master Method Index

**Canonical method inventory for current, implemented, integrated, planned, research, and future analysis capabilities.**

**Product objective:** VoxVector is being built as a vocal and audio deception detection system. The current runtime is an observational analysis foundation with guarded indeterminate classification. No individual vocal, acoustic, linguistic, behavioral, emotional, or psychological feature proves deception.

**Status discipline:** `Implemented` means code exists. `Integrated` means the method is orchestrated by the primary pipeline. `Implemented, not primary integrated` means reusable implementation exists but is not currently emitted by the primary pipeline. `Planned` means documented future implementation or research. `Validated inferential` is reserved for methods that complete the VoxVector scientific validation requirements. Nothing in this index is promoted to deception inference merely by being listed here.

---

## D01 — Signal and Acoustic Analysis

### Current / implemented

- RMS / energy
- Frame-level RMS
- Relative intensity / decibel measurements
- Zero crossing rate
- Signal amplitude characteristics
- Voiced fraction
- Basic signal-level summary statistics

### Reliability and boundary controls

- Empty-input handling
- Silence handling
- Non-finite value handling
- Explicit unavailable states
- Segment-level provenance
- Signal quality metadata

---

## D02 — Spectral Analysis

### Current / integrated

- Spectral centroid
- Spectral spread
- Spectral flux
- Spectral rolloff
- FFT-derived spectral descriptors
- Frame-level spectral summaries

### Planned expansion

- Broader spectral tilt measures
- Additional harmonic measures
- Expanded interpretable spectral descriptor families
- openSMILE / eGeMAPS-style spectral descriptors

---

## D03 — Cepstral Analysis

### Current / integrated

- MFCCs
- Thirteen MFCC coefficient means
- Per-coefficient summary statistics
- Cepstral provenance

### Implemented but not primary integrated

- Additional cepstral summary utilities

### Planned

- LPCC — Linear Predictive Cepstral Coefficients
- GFCC — Gammatone Frequency Cepstral Coefficients
- Expanded cepstral descriptor families

---

## D04 — Fundamental Frequency and Pitch

### Current / integrated

- Fundamental frequency estimation
- F0 range
- F0 dispersion
- F0 slope
- F0 delta / change
- F0 contour summaries
- F0 dynamics
- Voiced / unvoiced handling

### Boundary behavior

- Unvoiced-frame handling
- Short-frame handling
- Non-finite contour handling
- Explicit unavailable observations

---

## D05 — Prosody and Intonation

### Current / integrated

- Prosodic contour summaries
- F0 dynamics
- Intensity dynamics
- Contour statistics
- Prosodic range
- Prosodic dispersion
- Prosodic slope
- Prosodic change / delta
- Temporal contour behavior
- Voiced / unvoiced behavior

### Planned expansion

- Richer prosodic descriptors
- More contextual prosody modeling
- Learned prosodic representations
- Temporal prosody modeling

---

## D06 — Intensity and Energy

### Current / integrated

- RMS / signal energy
- Relative intensity / dB
- Intensity range
- Intensity dispersion
- Intensity slope
- Intensity delta / change
- Intensity dynamics
- Intensity contour statistics

### Planned

- Broader energy descriptor families
- Context-aware energy dynamics
- Learned energy representations

---

## D07 — Voice Quality

### Current / implemented

- Harmonicity / periodicity
- HNR — Harmonics-to-Noise Ratio
- Local jitter
- Local shimmer
- Pulse period utilities
- Clipping ratio
- DC offset
- Voice-quality summary observations

### Integration status

- HNR is integrated into the primary pipeline.
- Jitter and shimmer are implemented reusable analysis assets but are not currently primary-pipeline integrated.

### Planned expansion

- Richer voice-quality descriptors
- Broader harmonic measures
- Spectral tilt
- Glottal-source descriptors
- openSMILE / eGeMAPS-style voice-quality families

---

## D08 — Glottal Source Analysis

### Planned research

- IAIF — Iterative Adaptive Inverse Filtering
- NAQ — Normalized Amplitude Quotient
- CQ — Closed Quotient
- OQ — Open Quotient
- H1-H2
- Related glottal-source measures
- Richer source-excitation descriptors
- Glottal waveform characterization

These are research candidates and are not current validated deception indicators.

---

## D09 — Formant and Vocal-Tract Analysis

### Current / integrated

- Spectral peak / formant candidate detection
- Frame-level formant candidate tracking
- Candidate-frequency extraction
- Frame-level candidate summaries

### Current limitation

- FFT boundary handling has been hardened.
- Current formant tracking is observational and is not phonetic validated.

### Planned expansion

- Stronger formant tracking
- Formant stability controls
- Better frame-to-frame tracking
- Phonetic validation
- More robust handling of unstable or insufficient frames

---

## D10 — Temporal and Speech-Rate Analysis

### Current / implemented

- Speech rate
- Articulation rate
- Voiced fraction
- Turn duration
- Temporal segment duration
- Pause duration
- Pause count
- Pause density
- Pause topology

### Planned expansion

- Richer temporal structure
- Context-dependent speech-rate analysis
- Question-relative timing
- Interaction-aware temporal modeling
- Sequence-level temporal modeling

---

## D11 — Pause and Hesitation Analysis

### Current / integrated

- Pause count
- Pause density
- Mean pause duration
- Total pause duration
- Longest pause
- Median pause duration
- P90 pause duration
- Voiced-run mean duration
- Pause topology
- Temporal placement of pauses
- Response latency

### Planned expansion

- Expanded pause topology
- Question-relative pause placement
- Answer-initial latency
- Mid-answer hesitation
- Strategic pause pattern analysis
- Interaction-specific hesitation structure
- Richer pause distribution modeling

---

## D12 — Response Latency

### Current / implemented when explicit timing boundaries are supplied

- Response latency
- Question-to-response interval
- Timestamp-based response timing
- Invalid / reversed timestamp rejection

### Planned expansion

- Answer-initial latency
- Context-aware latency
- Question-type-specific latency
- Latency relative to speaker baseline
- Latency interaction with linguistic and prosodic evidence

---

## D13 — Turn-Taking and Interaction

### Current / implemented assets

- Turn duration
- Turn timing
- Overlap duration
- Speaker / segment provenance when available
- Response latency

### Planned expansion

- Richer turn-taking analysis
- Turn transitions
- Interruption patterns
- Overlap topology
- Conversational rhythm
- Speaker interaction structure
- Question-response timing
- Interaction context modeling

---

## D14 — Speaker Baseline Analysis

### Current / integrated when supplied

- Within-speaker baseline
- Baseline-relative change
- Baseline-relative deviation
- Baseline eligibility
- Baseline provenance
- Baseline leakage control

### Planned expansion

- Improved baseline selection
- Multiple baseline windows
- Context-specific baselines
- Baseline drift detection
- Speaker adaptation
- Leakage-resistant baseline construction
- Independent baseline qualification

---

## D15 — Transcript and Linguistic Analysis

### Current when transcript data is supplied

- Transcript disfluency analysis
- Filled pauses
- Repetitions
- Filled-pause rate
- Repetition rate
- Transcript provenance
- Transcript confidence as an input to reliability where available

### Planned expansion

- Production-grade ASR
- Word timestamps
- Phoneme timestamps
- Forced alignment
- Transformer linguistic representations
- Lexical diversity
- Negation analysis
- Hedging analysis
- Certainty analysis
- Discourse structure
- Richer lexical analysis
- Contextual linguistic representations

---

## D16 — Disfluency, False Starts and Repairs

### Current / implemented

- Filled-pause detection
- Repetition detection
- Filled-pause rate
- Repetition rate

### Planned

- False-start detection
- Repair detection
- False-start / repair timing
- Alignment-aware disfluency analysis
- More detailed hesitation taxonomy
- Transcript confidence propagation into disfluency reliability

The false-start and repair method is currently registered as planned and must fail closed when alignment is unavailable.

---

## D17 — Question / Answer Alignment

### Current foundation

- Response latency when explicit timing boundaries are supplied
- Interaction timing primitives

### Planned

- Question segmentation
- Answer segmentation
- Question / answer alignment
- Question-relative pause placement
- Question-relative hesitation
- Answer completeness
- Answer duration
- Question repetition
- Directness of response
- Topic alignment
- Question / answer relevance
- Question / answer temporal structure
- Alignment confidence

The canonical `interaction.question_answer_alignment` method is planned and must fail closed when segmentation is unreliable.

---

## D18 — Semantic, Contradiction and Consistency Analysis

### Planned research

- Contradiction analysis
- Consistency analysis
- Cross-answer consistency
- Semantic question / answer alignment
- Topic alignment
- Answer relevance
- Claim consistency
- Internal narrative consistency
- Temporal consistency
- Transformer-based linguistic representations
- Context-aware semantic analysis

These methods are intended as evidence sources and must not be treated as direct proof of deception.

---

## D19 — Learned Speech Representations

### Planned research

- WavLM
- wav2vec 2.0
- HuBERT
- Conformer
- Audio Spectrogram Transformer
- Learned audio embeddings
- Learned acoustic representations
- Learned prosodic representations
- Learned voice-quality representations
- Utterance-level representations
- Segment-level representations

### Required evaluation controls

- Speaker identity leakage testing
- Recording-condition leakage testing
- Dataset artifact testing
- Speaker-disjoint evaluation
- Cross-dataset evaluation

---

## D20 — Temporal Neural Modeling

### Planned research

- Temporal attention
- Sequence models
- Long-range temporal modeling
- Segment-level aggregation
- Utterance-level aggregation
- Context-aware temporal representations
- Evidence sequence modeling
- Cross-feature temporal interactions
- Temporal fusion of acoustic and linguistic representations

---

## D21 — Speaker Diarization and Speaker Separation

### Planned

- Speaker diarization
- Speaker segmentation
- Speaker attribution
- Speaker / channel separability controls
- Speaker-specific feature extraction
- Turn assignment
- Cross-speaker contamination detection
- Multi-speaker evidence separation
- Speaker-conditioned analysis

---

## D22 — Recording, Channel and Media Integrity

### Current / implemented

- Clipping detection
- DC offset detection
- Empty-input checks
- Silence handling
- Non-finite-value handling
- Signal-quality observations
- Segment quality metadata
- Recording provenance

### Planned expansion

- Stronger channel-quality controls
- Recording-condition characterization
- Environmental-noise assessment
- Noise robustness analysis
- Channel mismatch detection
- Microphone effects
- Compression artifact analysis
- Recording-condition stress testing
- Audio authenticity checks

---

## D23 — Eligibility and Reliability Analysis

### Current / integrated

- Recording eligibility
- Signal-quality checks
- Clipping checks
- Duration adequacy checks
- Channel integrity checks
- Speaker separability when available
- Transcript confidence when available
- Context completeness
- Baseline eligibility
- Missing-data handling
- Invalid-input rejection
- Deterministic failure behavior
- Explicit unavailable states
- Reliability gate

### Planned expansion

- Expanded reliability scoring / gating
- Stronger resource-aware eligibility controls
- Context sufficiency checks
- Out-of-distribution checks
- Population / task compatibility checks
- Recording-condition eligibility
- Evidence sufficiency thresholds

Reliability is a distinct stage and must not be collapsed into the final deception score.

---

## D24 — Evidence Grouping and Multimethod Convergence

### Current / integrated foundation

- Evidence grouping
- Neutral observational evidence organization
- Feature-level provenance
- Segment-level provenance
- Evidence direction representation
- Evidence conflict representation

### Planned research

- Dependence-aware multimethod convergence
- Cross-feature convergence
- Evidence agreement
- Evidence conflict analysis
- Independent evidence weighting
- Evidence provenance graphs
- Evidence sufficiency assessment
- Multimethod fusion
- Convergent evidence modeling

No fixed universal feature threshold may be treated as a deception threshold without task-, population-, recording-, and deployment-specific validation.

---

## D25 — Alternative Explanation Analysis

### Planned / required for future inference

- Fatigue as an alternative explanation
- Illness as an alternative explanation
- Anxiety as an alternative explanation
- Topic sensitivity as an alternative explanation
- Microphone effects
- Environmental noise
- Language effects
- Accent effects
- Speaker adaptation
- Ordinary conversational variation
- Recording artifacts
- Channel effects
- Cognitive-load alternatives
- Emotional-arousal alternatives
- Stress-related alternatives
- Model / dataset artifact analysis
- Confounder analysis

Alternative explanations must remain visible rather than being hidden inside a single score.

---

## D26 — Uncertainty and Calibration

### Planned research

- Probability calibration
- Confidence estimation
- Uncertainty estimation
- Evidence uncertainty
- Data-quality uncertainty
- Model uncertainty
- Epistemic uncertainty where supported
- Evidence-conflict uncertainty
- Confidence matrix
- Calibrated confidence
- Calibration curves
- Reliability / confidence interaction

### Required behavior

- Never manufacture confidence from missing data
- Expose uncertainty when evidence conflicts
- Preserve unavailable states
- Support explicit abstention thresholds

---

## D27 — Candidate Classification

### Current boundary

- Candidate classification interface
- Guarded indeterminate classification
- Fail-closed behavior

### Planned

- Candidate deception hypotheses
- Candidate non-deception hypotheses
- Task-specific classification
- Evidence-backed provisional classification
- Uncertainty-aware candidate classification
- Alternative-explanation-aware classification
- Validated classifier integration

The canonical `classifier.deception` method is currently inactive / not validated.

---

## D28 — Deception Inference

### Future research / validation only

- Operational deception-task definitions
- Candidate deception classifiers
- Interpretable statistical classifiers
- Logistic models
- Tree-based models
- SVM-style models
- Ensemble methods
- Neural classifiers
- Learned-representation classifiers
- Multimethod fusion models
- Task-specific classifiers
- Calibrated deception probability
- Deception confidence matrix
- Evidence convergence / conflict synthesis
- Alternative-explanation analysis
- Final deception classification

### Scientific gate

No deception inference capability may be promoted to validated use until the required VoxVector validation program is completed.

---

## D29 — Multimodal Audio / Video Analysis

### Planned

- Facial Action Units
- Facial behavior analysis
- Audio / video synchronization
- Cross-modal temporal alignment
- Cross-modal evidence fusion
- Audio / video evidence convergence
- Audio / video evidence conflict
- Multimodal context modeling
- Cross-modal reliability controls

These are future evidence streams, not standalone proof of deception.

---

## D30 — Synthetic Speech and Media Integrity

### Planned

- Synthetic speech detection
- Voice-cloning detection
- Generated-audio artifact analysis
- Provenance-aware evaluation
- Audio authenticity assessment
- Synthetic-speech benchmark evaluation
- Audio / video synchronization integrity
- Media provenance analysis
- Recording authenticity controls

Synthetic-speech detection is a media-integrity capability and is distinct from deception inference.

---

## D31 — Scientific Validation and Robustness

### Required before validated inference

- Operational definition freeze
- Defined target populations
- Defined deployment conditions
- Speaker-disjoint development datasets
- Speaker-disjoint evaluation datasets
- Cross-dataset evaluation
- Recording-condition stress tests
- Identity sensitivity analysis
- Speaker leakage testing
- Recording-condition leakage testing
- Dataset artifact testing
- Subgroup robustness where applicable
- Language robustness where applicable
- Accent robustness where applicable
- Calibration analysis
- Uncertainty analysis
- Explicit abstention testing
- Alternative-explanation testing
- Confounder evaluation
- External replication
- Independent validation
- Reproducible evaluation procedures
- Population-level performance evaluation
- Task-specific performance evaluation

A passing software test establishes implementation behavior. It does not establish scientific deception-detection validity.

---

## D32 — Final Classification, Disposition and Abstention

### Current / integrated boundary

- Final disposition gate
- Abstain
- Insufficient evidence
- Guarded indeterminate outcome

### Planned future outputs

- Final candidate classification
- Calibrated deception probability
- Confidence matrix
- Evidence convergence summary
- Evidence conflict summary
- Reliability state
- Uncertainty summary
- Alternative explanations
- Task-specific final disposition
- Explicit abstention reason
- Provenance-backed case result

### Final gate requirements

A final classification may only be issued when configured eligibility and scientific validation gates are satisfied. Otherwise the correct result is abstention or insufficient evidence.

---

# Cross-Cutting Analysis Capabilities

These capabilities apply across multiple D-Series families rather than representing a single feature family.

## Provenance

- Method identifier
- Segment provenance
- Audio provenance
- Transcript provenance
- Baseline provenance
- Speaker provenance
- Recording-condition provenance
- Model provenance
- Versioned analytical configuration
- Input-quality metadata
- Failure-state provenance

## Missing-data and failure semantics

- No fabricated values
- Explicit unavailable states
- NaN / unavailable preservation where appropriate
- Deterministic empty-input handling
- Deterministic invalid-input rejection
- Fail-closed behavior
- Abstention when evidence is inadequate

## Evidence reporting

- What was measured
- What data were used
- What was unavailable
- Reliability state
- Evidence direction
- Evidence convergence
- Evidence conflict
- Uncertainty
- Alternative explanations
- Whether the system abstained

## Speaker and dataset controls

- Speaker-disjoint splits
- Identity leakage detection
- Recording-condition leakage detection
- Baseline leakage control
- Cross-dataset testing
- Subgroup analysis
- Language robustness
- Accent robustness where applicable
- Population compatibility

---

# Status Summary

## Currently integrated observational methods

- RMS / energy
- Relative intensity / dB
- Zero crossing rate
- Spectral centroid
- Spectral spread
- Fundamental frequency
- Harmonicity / periodicity
- F0 dynamics
- Intensity dynamics
- HNR
- Spectral flux
- Spectral rolloff
- MFCC / cepstral coefficients
- Formant candidate tracking
- Voiced fraction
- Pause count
- Pause duration statistics
- Pause topology
- Response latency when supplied
- Transcript disfluency when supplied
- Within-speaker baseline when supplied
- Evidence grouping
- Reliability gate
- Guarded candidate-classification boundary
- Final disposition / abstention gate

## Implemented reusable assets not currently primary integrated

- Additional cepstral summary utilities
- Local jitter
- Local shimmer
- Pulse period utilities
- Generic turn-duration utilities
- Generic overlap-duration utilities

## Planned research families

- openSMILE / eGeMAPS-style descriptors
- LPCC
- GFCC
- Teager Energy Operator
- Advanced glottal-source measures
- Stronger formant analysis
- Production ASR
- Word and phoneme timestamps
- Forced alignment
- Transformer linguistic representations
- Contradiction and consistency analysis
- False starts and repairs
- Hedging and certainty analysis
- Lexical diversity
- Negation and discourse analysis
- Question / answer alignment
- Speaker diarization
- WavLM
- wav2vec 2.0
- HuBERT
- Conformer
- Audio Spectrogram Transformer
- Temporal attention and sequence models
- Multimodal audio / video analysis
- Facial Action Units
- Cross-modal fusion
- Synthetic speech detection
- Provenance-aware media integrity
- Validated deception classifiers
- Calibrated deception probability
- Confidence / uncertainty matrix
- External replication

---

# Scientific Boundary

VoxVector must never interpret an individual feature as proof of deception. Pitch changes, hesitation, pauses, stress, arousal, emotion, cognitive load, speaking rate, prosody, linguistic markers, acoustic measurements, or any other individual signal are evidence only.

The analytical architecture therefore remains separated into four stages:

1. **Eligibility and reliability**
2. **Evidence collection and analysis**
3. **Candidate classification**
4. **Final classification / disposition**

Research findings are not automatically VoxVector capabilities. A research candidate becomes an implemented method only when code exists, an integrated method only when the primary runtime orchestrates it, and a validated inferential method only after the defined scientific validation program is completed.

This document is an inventory and roadmap. Listing a method does not claim implementation, integration, scientific validation, or production readiness.

---

# Canonical References

- `docs/OPERATING_CHARTER.md` — governing project and scientific rules
- `docs/PROJECT_DECISION_LOG.md` — authoritative project decisions
- `docs/CAPABILITY_STATUS.md` — capability-state summary
- `docs/METHOD_QA_MATRIX.md` — method implementation and QA control
- `docs/ROADMAP.md` — development roadmap and validation sequence
