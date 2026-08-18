# VoxVector Analysis Methods

This is the active method register. A method is observational until validated for an inferential task.

## Implemented observational methods

- RMS energy
- relative intensity / energy in dB
- zero-crossing rate
- spectral centroid
- spectral spread
- autocorrelation-based fundamental-frequency estimation
- autocorrelation-based harmonicity / periodicity
- voiced/unvoiced masking from F0 and energy
- low-energy pause masking
- contiguous pause-run detection
- minimum-duration pause extraction
- voiced-frame fraction
- clipping ratio
- DC offset
- local jitter metric from externally supplied validated periods
- local shimmer metric from externally supplied validated cycle amplitudes
- autocorrelation-based candidate period estimation from a waveform
- F0-to-period conversion
- MFCC / cepstral coefficients
- spectral formant candidate estimation
- research timing primitives: pause topology, speech-rate calculation, articulation-rate calculation
- research prosody primitives: contour summary and spectral flux
- response latency from question boundary to first speech/substantive content
- interaction turn duration
- interaction overlap duration
- transcript-derived filled-pause counts
- transcript-derived adjacent repetition counts
- transcript-derived disfluency rate

These methods provide measurable observations. They do not produce deception labels.

## Research-derived candidates

The following remain research-backed candidates and are deliberately not active inferential capabilities:

- false starts and repairs
- harmonic-to-noise ratio and related noise/periodicity measures
- LPCC and GFCC representations
- Teager energy operator-derived observations
- validated frame-to-frame F1/F2/F3 tracking
- speaker-baseline-relative change measures
- question/answer alignment
- transcript-derived contradiction, certainty, lexical diversity, negation, and discourse structure

Research provenance and promotion rules for these candidates are documented in `docs/RESEARCH_METHOD_EXPANSION.md`.

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
