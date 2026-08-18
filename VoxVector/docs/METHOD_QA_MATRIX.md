# VoxVector Method QA Matrix

This matrix is a software QA and validation-status control. It does not establish deception-detection validity.

| Method | Implementation | Expected output | Edge cases | Failure behavior | Provenance | Inferential status |
|---|---|---|---|---|---|---|
| acoustic.rms | acoustic.py | frame RMS | empty, silence, non-finite | no fabricated value | method ID + segment + quality | observational |
| acoustic.intensity_db | acoustic.py | relative dB | zero/silence | preserve undefined state | method ID + segment + quality | observational |
| acoustic.zero_crossing_rate | acoustic.py | crossings/frame | empty/constant | deterministic empty handling | method ID + segment + quality | observational |
| acoustic.spectral_centroid | acoustic.py | Hz | zero spectrum | undefined when denominator unavailable | method ID + segment + quality | observational |
| acoustic.spectral_spread | acoustic.py | spectral spread | zero spectrum | undefined when unavailable | method ID + segment + quality | observational |
| acoustic.fundamental_frequency | acoustic.py | F0 estimate | unvoiced/short frame | NaN/unavailable | method ID + segment + quality | observational |
| acoustic.harmonicity | acoustic.py | periodicity measure | unvoiced/short frame | NaN/unavailable | method ID + segment + quality | observational |
| temporal.voiced_fraction | temporal.py | voiced ratio | empty input | explicit undefined/empty handling | method ID + segment + quality | observational |
| temporal.pause_count | temporal_observations.py | count | no pauses | zero | method ID + segment + quality | observational |
| temporal.pause_duration_mean | temporal_observations.py | seconds | no pauses | None | method ID + segment + quality | observational |
| temporal.pause_duration_total | temporal_observations.py | seconds | no pauses | zero | method ID + segment + quality | observational |
| voice_quality.clipping_ratio | voice_quality.py | ratio | empty/non-finite | quality degradation / unavailable | method ID + segment + quality | observational |
| voice_quality.dc_offset | voice_quality.py | offset | empty input | unavailable | method ID + segment + quality | observational |
| voice_quality.jitter_local | voice_quality.py | local perturbation | insufficient periods | NaN/unavailable | method ID + segment + quality | observational |
| voice_quality.shimmer_local | voice_quality.py | local amplitude perturbation | insufficient amplitudes | NaN/unavailable | method ID + segment + quality | observational |
| formants.spectral_peak_candidates | formants.py | candidate frequencies | insufficient peaks | empty/NaN candidates | method ID + segment + quality | observational |
| classifier.deception | none | candidate classification | all current states | fail closed / indeterminate | registry status | not validated / inactive |

## QA requirements

Every method must have deterministic behavior, explicit missing-data semantics, provenance, and a test for at least one normal case and one boundary/failure case before promotion.

A passing implementation test establishes software behavior only. It does not establish population-level performance, causal interpretation, or deception-detection validity.
