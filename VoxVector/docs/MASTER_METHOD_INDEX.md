# VoxVector Master Method Index

## Individual Data Point Reference

This is the canonical master index of VoxVector analysis data points.

Every analysis category is organized into columns.

Every individual data point remains separately listed.

No comma separated data point lists are used.

**CURRENT** means implemented in the repository.

**ASSET** means reusable implementation exists but is not primary pipeline output.

**PLANNED** means retained research or development scope.

**VALIDATION** means an evaluation control rather than a production inference feature.

**Scientific boundary:** an individual feature does not prove deception. Eligibility and reliability remain separate from evidence collection. Candidate classification remains separate from final disposition. Uncertainty and alternative explanations remain visible.

---

# D01 — Signal and Acoustic Fundamentals

| Signal construction | Energy | Intensity | Quality |
|---|---|---|---|
| Input waveform samples | Frame RMS | Relative intensity | Empty input state |
| Sample count | Mean RMS | Reference level | Silence state |
| Sample rate | Median RMS | Mean intensity | Non finite sample state |
| Frame size | RMS standard deviation | Median intensity | Signal availability |
| Hop size | RMS minimum | Intensity standard deviation | Segment quality |
| Frame count | RMS maximum | Intensity minimum | Segment duration |
| Frame start index | RMS range | Intensity maximum | Method ID |
| Frame end index | Finite RMS count | Intensity range | Segment provenance |
| Frame duration | RMS unavailable count | Finite intensity count | |
| Segment start time | | Intensity unavailable count | |
| Segment end time | | | |
| Zero crossings per frame | | | |
| Mean zero crossing rate | | | |
| Median zero crossing rate | | | |
| Zero crossing standard deviation | | | |
| Zero crossing minimum | | | |
| Zero crossing maximum | | | |
| Zero crossing range | | | |

---

# D02 — Spectral Analysis

| Spectrum | Centroid | Spread | Flux and rolloff |
|---|---|---|---|
| Windowed waveform | Spectral centroid per frame | Spectral spread per frame | Frame to frame spectral change |
| Magnitude spectrum | Mean centroid | Weighted spectral variance | Normalized spectral flux |
| FFT bin index | Median centroid | Square root spectral spread | Previous frame spectrum |
| FFT output width | Centroid standard deviation | Mean spread | Current frame spectrum |
| Frequency bin vector | Centroid minimum | Median spread | Flux vector length |
| Nyquist frequency | Centroid maximum | Spread standard deviation | Flux mean |
| Sample rate to bin mapping | Centroid range | Spread minimum | Flux median |
| | Spectral energy denominator | Spread maximum | Flux standard deviation |
| | Zero spectrum state | Spread range | Flux minimum |
| | Unavailable state | Zero spectrum state | Flux maximum |
| | | Unavailable state | Flux range |
| | | | Rolloff fraction |
| | | | Default rolloff fraction |
| | | | Cumulative spectral energy |
| | | | Rolloff threshold |
| | | | Rolloff bin index |
| | | | Rolloff frequency |
| | | | Per frame rolloff |
| | | | Mean rolloff |
| | | | Median rolloff |
| | | | Rolloff standard deviation |
| | | | Rolloff minimum |
| | | | Rolloff maximum |
| | | | Rolloff range |

### D02 Planned

| Spectral shape | Spectral distribution | Harmonic descriptors | Descriptor layer |
|---|---|---|---|
| Spectral slope | Spectral entropy | Additional harmonic spectral descriptors | openSMILE style descriptors |
| Spectral tilt | Spectral flatness | Additional spectral flux variants | eGeMAPS style descriptors |
| Spectral skewness | Spectral bandwidth | | |
| Spectral kurtosis | | | |

---

# D03 — Cepstral Analysis

| MFCC current | MFCC expansion | LPCC planned | GFCC planned |
|---|---|---|---|
| MFCC coefficient 1 | Per coefficient median | LPCC coefficient vector | Gammatone filterbank outputs |
| MFCC coefficient 2 | Per coefficient standard deviation | LPC order | GFCC coefficient vector |
| MFCC coefficient 3 | Per coefficient minimum | Prediction coefficients | Per coefficient statistics |
| MFCC coefficient 4 | Per coefficient maximum | Cepstral coefficient statistics | Configuration metadata |
| MFCC coefficient 5 | Delta MFCC | Stability state | Failed configuration state |
| MFCC coefficient 6 | Delta delta MFCC | Failed LPC state | |
| MFCC coefficient 7 | Frame level MFCC trajectories | | |
| MFCC coefficient 8 | | | |
| MFCC coefficient 9 | | | |
| MFCC coefficient 10 | | | |
| MFCC coefficient 11 | | | |
| MFCC coefficient 12 | | | |
| MFCC coefficient 13 | | | |
| Per coefficient mean | | | |
| Per coefficient finite count | | | |
| Cepstral provenance | | | |
| Segment provenance | | | |
| Method ID | | | |

---

# D04 — Fundamental Frequency and Pitch

| F0 measurement | F0 distribution | F0 dynamics | F0 quality |
|---|---|---|---|
| F0 per frame | F0 mean | F0 slope | Unvoiced frame |
| Minimum F0 search frequency | F0 median | F0 first to last delta | Short frame |
| Maximum F0 search frequency | F0 standard deviation | Pitch excursion | Zero energy frame |
| F0 lag | F0 range | Pitch acceleration | Non finite frame |
| Autocorrelation peak | F0 P10 | Pitch variability over time | Insufficient lag range |
| Voicing threshold | F0 P90 | Phrase level pitch movement | F0 unavailable state |
| Voiced F0 count | | Local pitch perturbation | NaN state |
| Unvoiced F0 count | | Question answer pitch comparison | |
| | | Baseline relative pitch deviation | |

---

# D05 — Prosody and Intonation

| Contour statistics | F0 dynamics | Intensity dynamics | Planned prosody |
|---|---|---|---|
| Mean | F0 mean | Intensity mean | Intonation contour shape |
| Median | F0 median | Intensity median | Pitch reset |
| Standard deviation | F0 standard deviation | Intensity standard deviation | Phrase final movement |
| Range | F0 range | Intensity range | Phrase initial movement |
| P10 | F0 P10 | Intensity P10 | Prosodic boundary strength |
| P90 | F0 P90 | Intensity P90 | Accent prominence |
| Slope | F0 slope | Intensity slope | Prosodic variability |
| Finite sample count | F0 delta | Intensity delta | Prosodic acceleration |
| Missing sample count | | | Change point locations |
| | | | Context relative deviation |

---

# D06 — Intensity and Energy Dynamics

| Current measurements | Distribution | Dynamics | Planned |
|---|---|---|---|
| RMS mean | RMS median | Energy contour | Energy acceleration |
| RMS standard deviation | RMS range | Intensity contour | Energy change points |
| dB mean | Intensity P10 | Intensity slope | Baseline relative intensity |
| dB median | Intensity P90 | Intensity delta | Question answer intensity comparison |
| dB standard deviation | | | Phrase level intensity dynamics |
| dB range | | | Context relative loudness deviation |

---

# D07 — Voice Quality

| Harmonicity | HNR | Jitter and shimmer | Signal quality |
|---|---|---|---|
| Normalized autocorrelation harmonicity | HNR in dB | Local jitter | Clipping ratio |
| Maximum valid autocorrelation | Valid HNR count | Valid period count | Clipping threshold |
| Harmonicity mean | Invalid HNR count | Mean period | DC offset |
| Harmonicity median | Infinite HNR state | Adjacent period differences | Empty signal state |
| Harmonicity standard deviation | NaN HNR state | Period perturbation ratio | Non finite sample state |
| Harmonicity range | HNR mean | Insufficient period state | |
| Harmonicity unavailable count | HNR median | Local shimmer | |
| | HNR standard deviation | Valid amplitude count | |
| | HNR range | Mean cycle amplitude | |
| | | Adjacent amplitude differences | |
| | | Amplitude perturbation ratio | |
| | | Insufficient amplitude state | |

### D07 Planned

| Harmonic measures | Spectral voice quality | Glottal excitation | Descriptor layer |
|---|---|---|---|
| Additional harmonicity measures | Spectral tilt | Glottal excitation descriptors | openSMILE voice quality |
| | H1 H2 | | eGeMAPS voice quality |
| | Harmonic amplitude differences | | |
| | Voice quality perturbation statistics | | |

---

# D08 — Glottal Source

| Source reconstruction | Quotient measures | Harmonic measures | Source dynamics |
|---|---|---|---|
| Glottal waveform | Open quotient | H1 H2 | Glottal cycle variability |
| IAIF residual | Closed quotient | H1 A1 | Source excitation statistics |
| Inverse filtered source signal | Normalized amplitude quotient | H1 A3 | Glottal closure characteristics |
| Maximum flow derivative | | Glottal spectral tilt | Glottal cycle duration |

---

# D09 — Formants and Vocal Tract

| Current candidates | Tracking | Planned formant data | Configuration |
|---|---|---|---|
| Candidate F1 | Frame index | Formant bandwidths | Number of formants |
| Candidate F2 | F1 trajectory | Formant amplitudes | Minimum formant frequency |
| Candidate F3 | F2 trajectory | Formant trajectories | Maximum formant frequency |
| Candidate F4 | F3 trajectory | Formant slope | Effective maximum frequency |
| Spectral peak amplitude | F4 trajectory | Formant range | FFT frequency vector |
| Peak rank | Stable candidate state | Formant variability | Peak spacing |
| Peak spacing | Unstable frame state | Formant transition dynamics | Minimum peak spacing |
| Per frame candidate availability | Missing candidate state | Formant stability | |
| | Frame provenance | Phonetic vowel association | |
| | | Phoneme conditioned formant measures | |

### Current configuration

| Parameter | Value |
|---|---|
| Number of formants | 4 |
| Minimum frequency | 200 Hz |
| Maximum frequency | 5000 Hz |
| Maximum frequency boundary | Nyquist |
| Minimum peak spacing | max 100 Hz or sample rate divided by frame size |

Current formant output is a spectral candidate observation.

It is not a phonetic formant claim.

---

# D10 — Temporal and Speech Rate

| Voicing | Pause detection | Speech rate | Articulation rate |
|---|---|---|---|
| Voiced frame count | Energy threshold | Syllable count input | Syllable count input |
| Total frame count | Quiet frame mask | Voiced seconds input | Articulation seconds input |
| Voiced fraction | Contiguous quiet runs | Syllables per voiced second | Syllables per articulation second |
| F0 finite state | Pause run start | Zero duration state | Zero duration state |
| Voiced mask | Pause run end | Invalid negative input state | Invalid negative input state |
| | Pause duration | | |
| | Minimum pause duration | | |
| | Pause count | | |
| | Total pause duration | | |
| | Mean pause duration | | |

### Current pause defaults

| Parameter | Value |
|---|---|
| Energy threshold | 1e-4 |
| Minimum pause duration | 0.20 s |

### Research timing topology

| Data point | Status |
|---|---|
| Pause count | ASSET |
| Pause density | ASSET |
| Longest pause | ASSET |
| Pause median | ASSET |
| Pause P90 | ASSET |
| Voiced run mean duration | ASSET |
| Pause duration vector | ASSET |
| Voiced run duration vector | ASSET |
| Total analyzed duration | ASSET |
| Research energy threshold | 0.01 |

---

# D11 — Pause and Hesitation

| Current | Planned response timing | Planned topology | Context |
|---|---|---|---|
| Pause count | Initial response pause | Pause clustering | Question relative pause position |
| Pause density | Mid answer pause count | Pause spacing | Baseline relative pause deviation |
| Mean pause duration | Mid answer pause duration | Pause acceleration | Conversational context |
| Total pause duration | Final answer pause behavior | Change over answer | Pause topology by context |
| Longest pause | | | |
| Median pause duration | | | |
| P90 pause duration | | | |
| Voiced run mean duration | | | |
| Pause start time | | | |
| Pause end time | | | |
| Pause position within segment | | | |
| Pause duration distribution | | | |

---

# D12 — Response Latency

| Timing inputs | Current derived values | Validation controls | Planned |
|---|---|---|---|
| Question end timestamp | First speech latency | First speech cannot precede question end | Question type specific latency |
| First speech timestamp | First substantive latency | First substantive speech cannot precede first speech | Baseline relative latency |
| First substantive speech timestamp | Filler before content latency | First substantive speech cannot precede question end | Latency distribution |
| | | Numeric timestamp validation | Latency median |
| | | Reversed interval rejection | Latency P90 |
| | | | Latency variance |
| | | | Latency change across interview |
| | | | Latency relative to semantic difficulty |

---

# D13 — Turn Taking and Interaction

| Current timing | Current overlap | Planned interaction | Planned floor behavior |
|---|---|---|---|
| Turn start timestamp | Overlap duration | Turn transition count | Speaker dominance |
| Turn end timestamp | Non overlap duration | Turn transition latency | Floor time |
| Turn duration | Response latency | Interruption count | Turn length distribution |
| Speaker A start | | Interruption duration | Conversational rhythm |
| Speaker A end | | Overlap count | Turn taking irregularity |
| Speaker B start | | Overlap density | Backchannel count |
| Speaker B end | | Backchannel timing | Backchannel timing |
| Speaker provenance | | | |
| Segment provenance | | | |

---

# D14 — Speaker Baseline

| Current baseline | Current deviation | Baseline controls | Planned baseline |
|---|---|---|---|
| Baseline median | Current value | Baseline eligibility | Baseline mean |
| Baseline MAD | Baseline relative deviation | Independent baseline provenance | Baseline standard deviation |
| Baseline sample count | Robust scale | | Baseline percentile distribution |
| Minimum MAD | | | Baseline by feature |
| | | | Baseline by context |
| | | | Baseline by question type |
| | | | Baseline drift |
| | | | Baseline stability |
| | | | Baseline segment quality |
| | | | Baseline contamination state |
| | | | Baseline leakage state |
| | | | Multiple independent baseline windows |

---

# D15 — Transcript and Linguistic Analysis

| Current transcript | Current disfluency | Planned lexical | Planned linguistic |
|---|---|---|---|
| Token sequence | Filled pause tokens | Lexical diversity | Pronoun use |
| Token count | Repetition tokens | Type token ratio | Negation count |
| Transcript provenance | Filled pause count | Content word rate | Hedging count |
| Transcript confidence | Repetition count | Function word rate | Certainty language |
| Filled pause rate | | Word rate | Intensifier use |
| Repetition rate | | Syllable rate | Modal verbs |
| | | | Quantifiers |
| | | | Temporal expressions |
| | | | Spatial expressions |
| | | | Discourse markers |
| | | | Topic terms |
| | | | Named entities |
| | | | Semantic embeddings |
| | | | Transformer representations |
| | | | Transcript confidence by word |

### Current filler vocabulary

| Filler 1 | Filler 2 | Filler 3 | Filler 4 | Filler 5 |
|---|---|---|---|---|
| um | uh | er | erm | hmm |

Custom filler sets are supported.

---

# D16 — Disfluency and Repairs

| Current data model | Planned locations | Planned repair data | Planned rates |
|---|---|---|---|
| Filled pauses | False start locations | Repair locations | Total disfluency rate |
| False starts | False start duration | Repair duration | Repetition rate |
| Repairs | Fragment locations | Repaired token count | Fragment rate |
| Repetitions | Abandoned phrase locations | Fragment count | Abandoned phrase rate |
| Fragments | | Abandoned phrase count | |
| Abandoned phrases | | | |
| Total disfluencies | | | |
| Token count | | | |
| Disfluency rate | | | |
| Repetition rate | | | |

Automated detection and alignment remain planned where the current implementation only provides the reusable data model.

---

# D17 — Question and Answer Alignment

| Temporal alignment | Content alignment | Quality | Planned semantic alignment |
|---|---|---|---|
| Question start | Question token count | Alignment confidence | Question answer semantic similarity |
| Question end | Answer token count | Segmentation confidence | Topic alignment |
| Answer start | Direct answer indicator | | Answer relevance |
| Answer end | Question repetition indicator | | Answer completeness |
| First speech start | | | |
| First substantive speech start | | | |
| Question duration | | | |
| Answer duration | | | |
| Response latency | | | |
| Filler before content latency | | | |

---

# D18 — Semantic and Consistency Analysis

| Claim analysis | Logical relation | Consistency | Narrative |
|---|---|---|---|
| Claim extraction | Contradiction probability | Cross answer consistency | Narrative coherence |
| Claim count | Entailment probability | Temporal consistency | Semantic change |
| Claim embeddings | Neutrality probability | Entity consistency | Topic consistency |
| | | Numerical consistency | Answer relevance |
| | | Location consistency | Question answer semantic similarity |
| | | Relationship consistency | |
| | | Event order consistency | |

These are candidate evidence measures.

They are not direct deception proof.

---

# D19 — Learned Speech Representations

| Model family | Representation level | Embedding data | Metadata |
|---|---|---|---|
| WavLM | Frame | Frame embeddings | Model name |
| wav2vec 2.0 | Segment | Segment embeddings | Model version |
| HuBERT | Utterance | Utterance embeddings | Model configuration |
| Conformer | Temporal | Learned acoustic embeddings | Sampling rate requirement |
| Audio Spectrogram Transformer | | Learned prosodic embeddings | Input duration |
| | | Learned voice quality embeddings | Embedding dimension |
| | | Temporal embeddings | Segment boundaries |
| | | | Speaker identity metadata |
| | | | Recording condition metadata |

---

# D20 — Temporal Neural Modeling

| Sequence | Attention | Aggregation | Fusion |
|---|---|---|---|
| Sequence embedding | Temporal attention weights | Temporal pooling | Evidence sequence representation |
| Temporal representation | Segment importance | Attention pooling | Cross feature temporal interaction |
| Long range dependency representation | Utterance importance | Segment aggregation | Acoustic linguistic fusion |
| Utterance representation | | | Temporal confidence |

---

# D21 — Speaker Diarization and Separation

| Speaker identity | Speaker timing | Speaker behavior | Attribution quality |
|---|---|---|---|
| Speaker count | Segment start | Speaker speaking fraction | Speaker attribution confidence |
| Speaker labels | Segment end | Speaker turn count | Cross speaker contamination |
| Channel identity | Speaker duration | Speaker overlap | Channel attribution |
| | | Speaker conditioned feature vectors | |
| | | Speaker specific baseline | |

---

# D22 — Recording and Media Integrity

| Current signal integrity | Recording environment | Channel integrity | Planned authenticity |
|---|---|---|---|
| Clipping ratio | Noise floor | Channel mismatch | Splicing indicators |
| Clipping threshold | Signal to noise ratio | Microphone fingerprint | Artifact indicators |
| DC offset | Reverberation estimate | Channel fingerprint | Audio authenticity indicators |
| Empty input | Background noise class | Codec metadata | Authenticity confidence |
| Silence state | Environmental noise level | Resampling detection | Provenance metadata |
| Non finite input | Compression artifact score | Recording condition confidence | |
| Signal duration | | | |
| Sample rate | | | |
| Channel count | | | |
| Segment quality | | | |

---

# D23 — Eligibility and Reliability

| Current eligibility | Current quality | Context | Planned controls |
|---|---|---|---|
| Input present | Signal quality | Speaker availability | Minimum usable duration |
| Duration | Clipping state | Transcript availability | Minimum voiced duration |
| Sample rate | Silence state | Transcript confidence | Minimum independent baseline duration |
| Channel availability | Finite sample state | Baseline availability | Speaker separation confidence |
| | Segment quality | Context completeness | Transcript quality threshold |
| | Missing data state | Method availability | Recording condition threshold |
| | | | Out of distribution distance |
| | | | Population compatibility |
| | | | Task compatibility |
| | | | Evidence sufficiency |
| | | | Reliability confidence |
| | | | Explicit rejection reason |

---

# D24 — Evidence Convergence and Conflict

| Observation identity | Evidence content | Convergence | Conflict |
|---|---|---|---|
| Method ID | Observed value | Evidence count | Evidence disagreement |
| Feature name | Unit | Independent evidence count | Evidence conflict count |
| Segment | Quality | Evidence agreement | Method dependence estimate |
| Provenance | Direction where available | Convergence strength | Evidence redundancy |
| Availability state | Missing state | Evidence coverage | Conflict confidence |
| | | Evidence sufficiency | Evidence provenance graph |
| | | Cross method consistency | |
| | | Convergence confidence | |

---

# D25 — Alternative Explanations and Confounders

| Physiological and emotional | Recording | Speaker | Context |
|---|---|---|---|
| Fatigue | Microphone effect | Speaker adaptation | Topic sensitivity |
| Illness | Channel effect | Identity leakage | Language mismatch |
| Anxiety or stress | Environmental noise | Baseline contamination | Accent mismatch |
| Emotional arousal | Compression effect | Model shortcut signal | Cognitive load |
| Voice condition | Recording artifact | Speaker variation | Ordinary conversational variation |
| | Dataset artifact | | Alternative explanation confidence |

---

# D26 — Uncertainty and Calibration

| Model output | Calibration | Uncertainty | Reliability |
|---|---|---|---|
| Raw model score | Calibrated probability | Data quality uncertainty | Reliability adjusted confidence |
| Candidate probability | Calibration error | Model uncertainty | Confidence interval |
| | Brier score | Evidence uncertainty | Abstention threshold |
| | Expected calibration error | Evidence conflict uncertainty | Out of distribution uncertainty |
| | Calibration curve data | Epistemic uncertainty where supported | |
| | Reliability diagram data | Aleatoric uncertainty where supported | |

---

# D27 — Candidate Classification

| Current boundary | Candidate hypothesis | Evidence | Controls |
|---|---|---|---|
| Candidate classification state | Candidate deception hypothesis | Evidence support | Classification eligibility |
| Indeterminate state | Candidate non deception hypothesis | Evidence contradiction | Classification confidence |
| Fail closed state | Candidate probability | Alternative explanation burden | Classification uncertainty |
| Insufficient evidence state | | | Classifier provenance |
| | | | Model version |
| | | | Calibration version |

---

# D28 — Deception Inference

| Target definition | Evidence representation | Model output | Validation gate |
|---|---|---|---|
| Operational task definition | Evidence vector | Candidate deception probability | Validation population |
| Target claim | Feature vector | Candidate non deception probability | Validation condition |
| | Multimethod evidence representation | Calibrated probability | Dataset provenance |
| | | Confidence matrix | Model provenance |
| | | Evidence convergence | Reliability state |
| | | Evidence conflict | Uncertainty state |
| | | Alternative explanation burden | Final classification |

### Candidate model families

| Statistical | Machine learning | Neural | Fusion |
|---|---|---|---|
| Logistic regression | Tree based models | Neural classifiers | Multimethod fusion classifiers |
| | SVM style models | Learned representation classifiers | Task specific classifiers |
| | Ensemble methods | Temporal classifiers | |

No model family becomes validated by implementation alone.

---

# D29 — Multimodal Audio and Video

| Video | Facial | Synchronization | Fusion |
|---|---|---|---|
| Video frame timestamps | Facial Action Units | Audio video synchronization offset | Audio evidence vector |
| | Facial movement | Cross modal temporal alignment | Visual evidence vector |
| | Facial expression features | | Cross modal agreement |
| | Head movement | | Cross modal conflict |
| | Eye region behavior where supported | | Cross modal confidence |
| | | | Multimodal reliability |

---

# D30 — Synthetic Speech and Media Integrity

| Generation detection | Artifact analysis | Identity | Provenance |
|---|---|---|---|
| Synthetic speech probability | Spectral generation artifacts | Voice identity consistency | Provenance metadata |
| Voice cloning probability | Phase artifacts | | Authenticity confidence |
| Generated audio artifact score | Prosodic generation artifacts | | Benchmark performance |
| Source model artifact indicators | | | |
| Audio video generation mismatch | | | |

This category is media integrity analysis.

It is distinct from deception inference.

---

# D31 — Scientific Validation and Robustness

| Dataset controls | Performance | Calibration | Robustness |
|---|---|---|---|
| Speaker disjoint training split | Accuracy | Calibration error | Speaker identity leakage |
| Speaker disjoint validation split | Balanced accuracy | Brier score | Recording condition leakage |
| Speaker disjoint test split | Precision | Expected calibration error | Dataset artifact leakage |
| Cross dataset test set | Recall | Reliability diagram data | Microphone leakage |
| Recording condition partitions | Sensitivity | Calibration curve data | Channel leakage |
| Language partitions | Specificity | | Language effect |
| Accent partitions | F1 | | Accent effect |
| Population partitions | ROC AUC | | Accent effect |
| Task partitions | PR AUC | | Population effect |
| | Confusion matrix | | Task effect |
| | False positive rate | | Cross dataset degradation |
| | False negative rate | | Distribution shift |
| | Abstention rate | | Out of distribution behavior |
| | Coverage | | |
| | Selective risk | | |
| | Confidence stratified performance | | |

### Validation controls

| Protocol | Reproducibility | Review | Failure analysis |
|---|---|---|---|
| Operational definition freeze | Reproducible preprocessing | Scientific review | Failure analysis |
| Population definition | Frozen evaluation protocol | Independent replication | Abstention analysis |
| Deployment condition definition | | External validation | |

---

# D32 — Final Classification and Disposition

| Current gate | Final output | Evidence context | Provenance |
|---|---|---|---|
| Eligible | Final candidate classification | Evidence convergence summary | Model provenance |
| Ineligible | Calibrated deception probability | Evidence conflict summary | Method provenance |
| Reliable | Confidence matrix | Alternative explanations | Dataset provenance |
| Unreliable | Reliability state | Uncertainty summary | Validation status |
| Evidence available | Abstention reason | | Task definition |
| Evidence unavailable | | | Population definition |
| Insufficient evidence | | | Recording condition definition |
| Abstain | | | |
| Indeterminate | | | |

---

# Cross Cutting Observation Fields

| Identity | Timing | Quality | Provenance |
|---|---|---|---|
| Method ID | Segment start | Quality score or state | Input provenance |
| Feature name | Segment end | Availability state | Speaker provenance |
| Value | Segment duration | Missing data reason | Baseline provenance |
| Unit | | Failure state | Transcript provenance |
| Version | | Validation status | Model provenance |
| Inferential status | | | |

---

# Cross Cutting Failure States

| Input failure | Signal failure | Context failure | Analysis failure |
|---|---|---|---|
| Empty input | Silence | Missing baseline | Insufficient frames |
| Invalid input | Clipping | Missing transcript | Insufficient periods |
| Non finite input | Channel failure | Missing speaker attribution | Insufficient amplitudes |
| Invalid sample rate | Recording artifact | Missing context | Missing alignment |
| Invalid frequency range | | | Missing speaker separation |
| Reversed timestamps | | | Missing timing boundary |

---

# Cross Cutting Scientific Controls

| Evidence discipline | Inference discipline | Validation discipline | Reporting discipline |
|---|---|---|---|
| Observation is not inference | Model score is not automatically probability | Software test is not scientific validation | Report what was measured |
| Feature is not deception label | Probability is not automatically calibrated | Research finding is not automatically capability | Report unavailable data |
| Convergence remains visible | Abstention remains available | Speaker disjoint evaluation | Report reliability |
| Conflict remains visible | Alternative explanations remain visible | Cross dataset evaluation | Report evidence direction |
| Dependence remains visible | Eligibility remains separate | Leakage testing | Report uncertainty |
| Provenance remains visible | Final disposition remains gated | Population evaluation | Report alternatives |

---

# Status Rule

The master index preserves future capability even when implementation is pending.

The repository implementation remains authoritative for current runtime behavior.

A planned data point must not be presented as a current runtime output.

A current runtime output must not be presented as scientifically validated deception inference without completed validation.

The product objective remains deception detection.

The evidence standard determines when a specific inference capability can be promoted.
