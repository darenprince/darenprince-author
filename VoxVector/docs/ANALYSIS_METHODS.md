# VoxVector Analysis Methods

This is the human-readable active method register. VoxVector is being built toward deception detection, but a method is observational unless explicitly validated for an inferential task.

## Product analytical objective

The purpose of the method stack is to generate a broad, auditable body of vocal, acoustic, temporal, linguistic, interaction, and contextual evidence that can ultimately support task-specific deception inference.

No individual method is a lie detector. The intended detection architecture depends on evidence convergence, validated models, reliability controls, uncertainty, and alternative explanations.

## Implemented observational methods

### Acoustic
- RMS energy
- relative intensity / energy in dB
- zero-crossing rate
- spectral centroid
- spectral spread
- autocorrelation-based fundamental-frequency estimation
- autocorrelation-based harmonicity / periodicity

### Temporal and interaction
- voiced/unvoiced masking
- low-energy pause masking
- contiguous pause-run detection
- minimum-duration pause extraction
- voiced-frame fraction
- pause topology
- speech-rate calculation
- articulation-rate calculation
- response latency
- interaction turn duration
- interaction overlap duration

### Voice quality
- clipping ratio
- DC offset
- local jitter from supplied validated periods
- local shimmer from supplied validated cycle amplitudes
- harmonic-to-noise ratio derived from usable harmonicity observations

### Cepstral and spectral
- MFCC / cepstral coefficients
- spectral flux
- spectral rolloff

### Prosodic dynamics
- F0 contour summary
- F0 dynamics: mean, median, dispersion, range, percentiles, slope, endpoint delta
- intensity dynamics: mean, median, dispersion, range, percentiles, slope, endpoint delta

### Formants
- spectral formant candidate estimation
- per-frame formant candidate tracking

### Transcript observations
- filled-pause counts
- adjacent repetition counts
- disfluency rate

### Speaker baseline
- robust median/MAD baseline summary
- baseline-relative standardized deviation

## Primary pipeline integration status

The current primary `VoxVectorPipeline` integrates acoustic summaries, F0/intensity dynamics, HNR, spectral flux/rolloff, formant tracking, pause topology, optional within-speaker baseline comparison, optional response latency, and optional transcript disfluency observations.

These observations are inputs to the broader deception-detection research architecture, not validated deception labels.

MFCC/cepstral processing, local jitter/shimmer utilities, and lower-level pulse/temporal utilities are implemented reusable components but are not yet primary-pipeline outputs. Their presence is retained as implementation context and future expansion capacity.

## Research-derived planned candidates

The following remain research-backed candidates and are deliberately retained for future development rather than deleted:

- false starts and repairs
- LPCC and GFCC representations
- Teager Energy Operator-derived observations
- openSMILE / eGeMAPS-style descriptors
- IAIF, NAQ, CQ, OQ, H1-H2 and related glottal-source measures
- richer question/answer alignment
- production ASR and forced alignment
- transcript-derived contradiction, certainty, lexical diversity, negation, and discourse structure
- speaker diarization
- WavLM, wav2vec 2.0, and HuBERT representations
- Conformer, Audio Spectrogram Transformer, temporal attention, and sequence models
- cross-modal audio/video analysis
- synthetic-speech detection
- dependence-aware multimethod convergence and calibrated uncertainty
- validated deception classifiers and calibrated deception probability estimation

See `docs/CAPABILITY_STATUS.md` and `docs/ROADMAP.md` for the complete preserved capability map.

## Duplication control

Where a method already exists, new work extends the canonical implementation instead of creating a second implementation. `src/voxvector/validation.py` is the runtime method-to-module registry.

## Evidence rules

A feature can contribute evidence only when it is measurable with acceptable quality, its provenance is recorded, its comparison context is understood, its validation status is known, alternative explanations remain represented, and correlated measurements are not silently treated as independent evidence.

## Scientific interpretation

Timing, pitch, intensity, pauses, disfluencies, spectral measures, and other observations can vary with many causes. VoxVector therefore reports observations and evidence convergence rather than treating any individual feature as proof of deception.

## Promotion path

Research candidate -> frozen operational definition -> implementation -> unit/boundary QA -> reliability characterization -> speaker-disjoint evaluation -> external/out-of-sample evaluation -> calibration/error analysis -> documented validation status -> controlled inferential deployment.

Research relevance does not equal VoxVector validation, but research relevance remains part of the product development program.
