# VoxVector Research-Derived Method Expansion

This document converts published speech/deception research into a controlled research backlog. Research findings are candidates for implementation and validation, not validated VoxVector inference.

## Candidate methodology

### Response latency
Measure time from question boundary to first substantive response speech, preserving filler onset separately. Requires reliable question/answer segmentation.

### Speech rate and articulation rate
Measure speech and articulation rate with explicit denominator definitions and pause handling.

### Pause topology
Extend pause analysis to median, variance, percentiles, longest pause, pause density, voiced-run duration, and within-answer placement.

### Filled pauses and disfluencies
Detect or import transcript-aligned `um`, `uh`, fragments, false starts, repairs, repetitions, and abandoned phrases. Audio-only and transcript-derived confidence remain separate.

### Prosodic contour dynamics
Extend F0 and intensity from summaries to slope, range, percentile spread, local variability, contour change, and question/answer-relative change.

### Harmonic/noise measures
Add validated HNR and related periodicity/noise observations where recording quality permits.

### Spectral dynamics
Add spectral flux and related frame-to-frame spectral-change observations.

### Alternative cepstral representations
Evaluate LPCC and GFCC alongside existing MFCCs as feature representations, not deception indicators.

### Energy/nonlinear descriptors
Evaluate Teager Energy Operator-derived observations as exploratory signal descriptors with explicit noise sensitivity.

### Formant dynamics
Advance from isolated spectral-peak candidates toward validated frame-to-frame F1/F2/F3 tracking with channel and speaker-quality checks.

### Baseline-relative change
When repeated speaker data exist, calculate within-speaker deviations from a pre-established baseline. Baseline selection must be independent of the target segment to prevent leakage.

### Multimethod evidence groups
Group observations by acoustic, temporal, voice-quality, interactional, and transcript-derived families. Correlated features must not be counted as independent merely because they have different names.

## Research boundaries

Stress is not deception. Cognitive load is not deception. A pause is not deception. Pitch change is not deception. Faster or slower speech is not deception. Filled pauses are not deception. A classifier score is not automatically a deception probability. Concealed information is not synonymous with deception.

## Promotion path

Research candidate -> frozen operational definition -> implementation -> unit/boundary QA -> reliability characterization -> speaker-disjoint evaluation -> external/out-of-sample evaluation -> calibration/error analysis -> documented validation status.

No candidate in this document is promoted to `validated_inferential` by inclusion here.

## Sources

Chen, X. L., Levitan, S. I., Levine, M., Mandic, M., & Hirschberg, J. (2020), *Acoustic-Prosodic and Lexical Cues to Deception and Trust: Deciphering How People Detect Lies*, TACL 8, 199-214, DOI 10.1162/tacl_a_00311.

Kirchübel, C., Howard, D., & Stedmon, A. (2013), *Detecting suspicious behaviour using speech: Acoustic correlates of deceptive speech – An exploratory investigation*, Applied Ergonomics 44(5), 694-702, DOI 10.1016/j.apergo.2012.04.016.

Hu, S. (2019), *Detecting Concealed Information in Text and Speech*, ACL 2019.

Nortje, A., & Tredoux, C. (2019), *How good are we at detecting deception? A review of current techniques and theories*, South African Journal of Psychology 49(4).

Research relevance does not equal VoxVector validation.
