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
| voice_quality.hnr | hnr.py | HNR descriptor | invalid harmonicity | NaN/unavailable | method ID + segment + quality | observational |
| formants.spectral_peak_candidates | formants.py | candidate frequencies | insufficient peaks | empty/NaN candidates | method ID + segment + quality | observational |
| formants.frame_tracking | formants.py | frame-level candidates | unstable/insufficient frames | NaN/unavailable per frame | method ID + segment + quality | observational |
| timing.speech_rate | research_timing.py | rate | zero/negative denominator | None/reject invalid input | method ID + segment + quality | observational |
| timing.articulation_rate | research_timing.py | rate excluding pauses | zero/negative denominator | None/reject invalid input | method ID + segment + quality | observational |
| timing.pause_topology | research_timing.py | pause distribution | empty/no pauses | empty/unavailable descriptors | method ID + segment + quality | observational |
| timing.response_latency | research_interaction.py | seconds | reversed timestamps | reject invalid interval | method ID + segment + quality | observational |
| prosody.contour_summary | research_prosody.py | contour statistics | empty/non-finite | unavailable statistics | method ID + segment + quality | observational |
| prosody.f0_dynamics | advanced_prosody.py | contour dynamics | unvoiced/non-finite | preserve missing observations | method ID + segment + quality | observational |
| prosody.intensity_dynamics | advanced_prosody.py | contour dynamics | empty/non-finite | preserve missing observations | method ID + segment + quality | observational |
| spectral.flux | spectral.py | normalized spectral change | non-finite/negative magnitudes | reject invalid input | method ID + segment + quality | observational |
| spectral.rolloff | spectral.py | cutoff frequency | invalid fraction/spectrum | reject invalid input | method ID + segment + quality | observational |
| cepstral.mfcc | cepstral.py | MFCC descriptors | short/invalid input | preserve unavailable state | method ID + segment + quality | observational; not primary integrated |
| baseline.within_speaker_change | baseline.py | baseline-relative deviation | insufficient independent baseline | unavailable; no inference | method ID + baseline provenance | observational |
| baseline.leakage_control | baseline.py | baseline eligibility | target leakage | reject baseline | baseline provenance | observational |
| interaction.turn_duration | research_interaction.py | seconds | reversed timestamps | reject invalid interval | method ID + segment + quality | observational |
| interaction.overlap | research_interaction.py | overlap duration | missing speaker attribution | unavailable | method ID + speaker/segment provenance | observational |
| disfluency.filled_pauses | disfluency.py | count | empty transcript | zero | method ID + transcript provenance | observational |
| disfluency.repetitions | disfluency.py | count | empty/short transcript | zero | method ID + transcript provenance | observational |
| disfluency.rate | disfluency.py | filled-pause rate | zero token denominator | NaN/unavailable | method ID + transcript provenance | observational |
| disfluency.repetition_rate | disfluency.py | repetition rate | zero token denominator | NaN/unavailable | method ID + transcript provenance | observational |
| disfluency.false_starts_repairs | none | false starts/repairs | missing alignment | fail closed / unimplemented | registry status | planned |
| cepstral.lpcc | none | LPCC descriptors | unstable LPC | fail closed / unimplemented | registry status | planned |
| cepstral.gfcc | none | GFCC descriptors | configuration mismatch | fail closed / unimplemented | registry status | planned |
| energy.teager | none | TEO descriptors | noise sensitivity | fail closed / unimplemented | registry status | planned |
| interaction.question_answer_alignment | none | aligned segments | unreliable segmentation | fail closed / unimplemented | registry status | planned |
| classifier.deception | none | candidate classification | all current states | fail closed / indeterminate | registry status | not validated / inactive |

## Synchronization rule

`src/voxvector/validation.py` is authoritative for runtime implementation status. This matrix is the synchronized human-readable QA control. Planned methods remain listed here even when implementation is absent.

Every implemented method must have deterministic behavior, explicit missing-data semantics, provenance, and normal plus boundary/failure tests before any inferential promotion.

A passing implementation test establishes software behavior only. It does not establish population-level performance, causal interpretation, or deception-detection validity.
