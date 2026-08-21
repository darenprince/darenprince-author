# VoxVector Method QA Matrix

This matrix is a software QA and validation status control.

It does not establish population level deception detection validity.

| Method | Implementation | Expected output | Edge cases | Failure behavior | Provenance | Inferential status |
|---|---|---|---|---|---|---|
| acoustic.rms | acoustic.py | frame RMS | empty silence non finite | no fabricated value | method ID + segment + quality | observational |
| acoustic.intensity_db | acoustic.py | relative dB | zero silence | preserve undefined state | method ID + segment + quality | observational |
| acoustic.zero_crossing_rate | acoustic.py | crossings per frame | empty constant | deterministic empty handling | method ID + segment + quality | observational |
| acoustic.spectral_centroid | acoustic.py | Hz | zero spectrum | unavailable when denominator missing | method ID + segment + quality | observational |
| acoustic.spectral_spread | acoustic.py | spectral spread | zero spectrum | unavailable when missing | method ID + segment + quality | observational |
| acoustic.fundamental_frequency | acoustic.py | F0 estimate | unvoiced short frame | unavailable state | method ID + segment + quality | observational |
| acoustic.harmonicity | acoustic.py | periodicity measure | unvoiced short frame | unavailable state | method ID + segment + quality | observational |
| temporal.voiced_fraction | temporal.py | voiced ratio | empty input | explicit undefined state | method ID + segment + quality | observational |
| temporal.pause_count | temporal_observations.py | count | no pauses | zero | method ID + segment + quality | observational |
| temporal.pause_duration_mean | temporal_observations.py | seconds | no pauses | unavailable | method ID + segment + quality | observational |
| temporal.pause_duration_total | temporal_observations.py | seconds | no pauses | zero | method ID + segment + quality | observational |
| voice_quality.clipping_ratio | voice_quality.py | ratio | empty non finite | unavailable state | method ID + segment + quality | observational |
| voice_quality.dc_offset | voice_quality.py | offset | empty input | unavailable state | method ID + segment + quality | observational |
| voice_quality.jitter_local | voice_quality.py | local perturbation | insufficient periods | unavailable state | method ID + segment + quality | observational |
| voice_quality.shimmer_local | voice_quality.py | local amplitude perturbation | insufficient amplitudes | unavailable state | method ID + segment + quality | observational |
| voice_quality.hnr | hnr.py | HNR descriptor | invalid harmonicity | unavailable state | method ID + segment + quality | observational |
| formants.spectral_peak_candidates | formants.py | candidate frequencies | insufficient peaks | empty or unavailable candidates | method ID + segment + quality | observational |
| formants.frame_tracking | formants.py | frame level candidates | unstable frames | unavailable per frame | method ID + segment + quality | observational |
| timing.speech_rate | research_timing.py | rate | zero negative denominator | reject invalid input | method ID + segment + quality | observational |
| timing.articulation_rate | research_timing.py | rate | zero negative denominator | reject invalid input | method ID + segment + quality | observational |
| timing.pause_topology | research_timing.py | pause distribution | empty no pauses | empty or unavailable descriptors | method ID + segment + quality | observational |
| timing.response_latency | research_interaction.py | seconds | reversed timestamps | reject invalid interval | method ID + segment + quality | observational |
| prosody.contour_summary | research_prosody.py | contour statistics | empty non finite | unavailable statistics | method ID + segment + quality | observational |
| prosody.f0_dynamics | advanced_prosody.py | contour dynamics | unvoiced non finite | preserve missing observations | method ID + segment + quality | observational |
| prosody.intensity_dynamics | advanced_prosody.py | contour dynamics | empty non finite | preserve missing observations | method ID + segment + quality | observational |
| spectral.flux | spectral.py | normalized spectral change | invalid magnitudes | reject invalid input | method ID + segment + quality | observational |
| spectral.rolloff | spectral.py | cutoff frequency | invalid fraction spectrum | reject invalid input | method ID + segment + quality | observational |
| cepstral.mfcc | cepstral.py | 13 MFCC observations | short invalid input | preserve unavailable state | method ID + segment + quality | observational |
| baseline.within_speaker_change | baseline.py | baseline relative deviation | insufficient baseline | unavailable | method ID + baseline provenance | observational |
| baseline.leakage_control | baseline.py | baseline eligibility | target leakage | reject baseline | baseline provenance | observational |
| interaction.turn_duration | research_interaction.py | seconds | reversed timestamps | reject invalid interval | method ID + segment + quality | observational |
| interaction.overlap | research_interaction.py | overlap duration | missing speaker attribution | unavailable | method ID + speaker + segment provenance | observational |
| disfluency.filled_pauses | disfluency.py | count | empty transcript | zero | method ID + transcript provenance | observational |
| disfluency.repetitions | disfluency.py | count | empty short transcript | zero | method ID + transcript provenance | observational |
| disfluency.rate | disfluency.py | filled pause rate | zero token denominator | unavailable | method ID + transcript provenance | observational |
| disfluency.repetition_rate | disfluency.py | repetition rate | zero token denominator | unavailable | method ID + transcript provenance | observational |
| disfluency.false_starts_repairs | planned | false starts and repairs | missing alignment | unimplemented state | registry status | planned |
| speaker.diarization | planned | speaker segments | overlap low separation | unimplemented state | registry status | planned |
| speaker.identification | planned | speaker identity | unknown speaker | unimplemented state | registry status | planned |
| speech.segmentation | foundation | speech intervals | silence noise | explicit segment state | method ID + segment quality | observational |
| transcription.asr | planned | timestamped transcript | low confidence audio | unimplemented state | registry status | planned |
| alignment.word | planned | word to audio alignment | timing ambiguity | unimplemented state | registry status | planned |
| interaction.question_answer_alignment | planned | aligned prompt response segments | unreliable segmentation | unimplemented state | registry status | planned |
| cepstral.lpcc | planned | LPCC descriptors | unstable LPC | unimplemented state | registry status | planned |
| cepstral.gfcc | planned | GFCC descriptors | configuration mismatch | unimplemented state | registry status | planned |
| energy.teager | planned | TEO descriptors | noise sensitivity | unimplemented state | registry status | planned |
| classifier.deception | planned | candidate classification | all current states | controlled inactive state | registry status | not validated |

## Synchronization rule

`src/voxvector/validation.py` is authoritative for runtime implementation status.

This matrix is the synchronized human readable QA control.

Every implemented method must have:

- deterministic behavior
- explicit missing data semantics
- provenance
- normal tests
- boundary tests
- failure tests

A passing implementation test establishes software behavior only.

It does not establish population level performance or deception detection validity.

## Cross pipeline QA requirements

The connected product workflow must also test:

- case creation
- source identity
- upload
- provenance
- audio decode
- playback asset access
- waveform synchronization
- stage lifecycle state
- speaker output
- transcript output
- alignment
- analytical tracks
- evidence provenance
- assessment trace
- report persistence
- case reopen

## Related records

- `docs/MASTER_METHOD_INDEX.md`
- `docs/CAPABILITY_STATUS.md`
- `docs/VALIDATION.md`
- `docs/ANALYSIS_PIPELINE.md`
- `docs/MVP_BUILD_PLAN.md`
