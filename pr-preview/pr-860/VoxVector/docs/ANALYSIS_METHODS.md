# VoxVector Analysis Methods

This is the human readable active method register.

VoxVector is being built toward deception detection.

A method is observational unless explicitly validated for an inferential task.

## Product analytical objective

The method stack generates a broad auditable body of vocal acoustic temporal linguistic interaction speaker and contextual evidence.

The end state combines those evidence families through validated models reliability controls uncertainty and evidence relationships.

## Implemented observational methods

### Acoustic

- RMS energy
- relative intensity / energy in dB
- zero crossing rate
- spectral centroid
- spectral spread
- autocorrelation based fundamental frequency estimation
- autocorrelation based harmonicity / periodicity

### Temporal and interaction

- voiced and unvoiced masking
- low energy pause masking
- contiguous pause run detection
- minimum duration pause extraction
- voiced frame fraction
- pause topology
- speech rate calculation
- articulation rate calculation
- response latency
- interaction turn duration
- interaction overlap duration

### Voice quality

- clipping ratio
- DC offset
- local jitter from supplied periods
- local shimmer from supplied cycle amplitudes
- harmonic to noise ratio from usable harmonicity observations

### Cepstral and spectral

- MFCC / cepstral coefficients
- spectral flux
- spectral rolloff

### Prosodic dynamics

- F0 contour summary
- F0 dynamics
- intensity dynamics

### Formants

- spectral formant candidate estimation
- per frame formant candidate tracking

### Transcript observations

- filled pause counts
- adjacent repetition counts
- disfluency rate

### Speaker baseline

- robust median and MAD baseline summary
- baseline relative standardized deviation

## Primary pipeline integration

The current primary `VoxVectorPipeline` integrates:

- acoustic summaries
- F0 dynamics
- intensity dynamics
- HNR
- spectral flux
- spectral rolloff
- MFCC
- formant tracking
- pause topology
- optional within speaker baseline comparison
- optional response latency
- optional transcript disfluency observations

## Implemented reusable assets

The repository also contains reusable lower level utilities that can expand the primary observation contract:

- jitter utilities
- shimmer utilities
- pulse period utilities
- temporal observation utilities
- interaction timing utilities

## Planned product methods

### Speaker intelligence

- speaker identification
- speaker diarization
- speaker separation
- overlap handling
- speaker confidence
- speaker aware evidence

### Transcription and alignment

- production ASR
- timestamped transcript generation
- word timestamps
- word alignment
- phoneme alignment where supported
- transcript confidence
- speaker attribution
- audio transcript synchronization

### Linguistic intelligence

- lexical diversity
- pronoun analysis
- negation analysis
- hedging
- certainty language
- modal language
- discourse structure
- contradiction analysis
- consistency analysis
- semantic representations
- transformer representations
- richer repair and false start analysis

### Acoustic expansion

- openSMILE style descriptors
- eGeMAPS style descriptors
- LPCC
- GFCC
- Teager Energy Operator
- broader spectral tilt
- expanded harmonic measures
- IAIF
- NAQ
- CQ
- OQ
- H1 H2
- richer glottal source measures

### Learned representations

- WavLM
- wav2vec 2.0
- HuBERT
- Conformer
- Audio Spectrogram Transformer
- temporal attention
- sequence models

### Multimodal and integrity analysis

- audio video synchronization
- facial action units
- cross modal fusion
- synthetic speech detection
- provenance aware media integrity analysis

### Deception inference

- dependence aware multimethod convergence
- calibrated uncertainty
- explicit decision thresholds
- speaker disjoint evaluation
- cross dataset evaluation
- recording condition stress testing
- identity sensitivity analysis
- subgroup robustness
- language robustness where appropriate
- validated candidate classifiers
- calibrated deception probability
- confidence matrices
- final classification and disposition

## Duplication control

Where a method already exists new work extends the canonical implementation instead of creating a second implementation.

`src/voxvector/validation.py` is the runtime method to module registry.

## Evidence rules

A feature can contribute evidence when it is measurable with acceptable quality its provenance is recorded its comparison context is understood its validation status is known and correlated measurements are handled explicitly.

## Promotion path

Research candidate -> frozen operational definition -> implementation -> unit and boundary QA -> reliability characterization -> speaker disjoint evaluation -> external or out of sample evaluation -> calibration and error analysis -> documented validation status -> controlled inferential deployment.

## Related records

- `docs/MASTER_METHOD_INDEX.md`
- `docs/METHOD_QA_MATRIX.md`
- `docs/CAPABILITY_STATUS.md`
- `docs/VALIDATION.md`
- `docs/ROADMAP.md`
