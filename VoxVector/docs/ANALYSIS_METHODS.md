# VoxVector Analysis Methods

This is the active method register. A method is observational until validated for an inferential task.

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

These methods provide measurable observations. They do not produce deception labels.

## Research-derived candidates

The following remain research-backed candidates and are deliberately not active inferential capabilities:

- false starts and repairs
- LPCC and GFCC representations
- Teager energy operator-derived observations
- question/answer alignment
- transcript-derived contradiction, certainty, lexical diversity, negation, and discourse structure

Research provenance and promotion rules for these candidates are documented in `docs/RESEARCH_METHOD_EXPANSION.md`.

## Duplication control

Where a method already exists, new work extends the canonical implementation instead of creating a second implementation. The active registry in `src/voxvector/validation.py` is the authoritative method-to-module map.

## Research interpretation rule

Published studies show mixed and task-dependent findings. Timing, pitch, intensity, pauses, disfluencies, and other features may be associated with deception in particular datasets or conditions, but none is treated by VoxVector as a standalone deception indicator. Negative findings are retained as part of the evidence base.

## Evidence rules

A feature can contribute evidence only when:

1. it is measurable with acceptable quality;
2. its provenance is recorded;
3. the relevant comparison baseline exists or its absence is explicitly handled;
4. the feature's validation status is known;
5. alternative explanations remain represented;
6. it is not silently treated as independent of correlated features.

## Promotion status

Research candidates move through: operational definition -> implementation -> QA -> reliability characterization -> speaker-disjoint evaluation -> external/out-of-sample evaluation -> calibration/error analysis -> documented validation status.

Research relevance does not equal VoxVector validation.
