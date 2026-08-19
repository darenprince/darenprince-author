# VoxVector Roadmap

This roadmap preserves future capabilities that have been discussed, researched, or documented but are not yet validated or fully implemented. Absence from the current runtime does not make a roadmap item obsolete.

## Phase A — Foundation hardening

- complete current CI repair verification
- keep Python/dependency versions reproducible
- expand reliability and eligibility checks
- synchronize runtime registry, method register, QA matrix, and documentation
- preserve provenance and deterministic failure behavior
- maintain Render runtime fingerprinting and known-fixture verification

## Phase B — Feature-depth expansion

- integrate MFCC/cepstral observations into the primary pipeline
- expand pause topology and question/answer placement
- add richer pulse and voice-quality observations
- strengthen formant tracking and quality controls
- extend transcript disfluency into false starts and repairs
- improve within-speaker baseline workflows
- add richer interaction timing and turn structure

## Phase C — Research feature families

- openSMILE/eGeMAPS-style interpretable descriptors
- LPCC and GFCC
- Teager Energy Operator descriptors
- IAIF, NAQ, CQ, OQ, H1-H2 and related glottal-source measures
- broader spectral tilt and harmonic measures

## Phase D — Learned representations and temporal models

- WavLM
- wav2vec 2.0
- HuBERT
- Conformer
- Audio Spectrogram Transformer
- temporal attention and sequence models
- speaker identity and recording-condition leakage testing

## Phase E — Linguistic intelligence

- high-quality ASR
- word and phoneme timestamps
- forced alignment
- transformer linguistic representations
- contradiction/consistency analysis
- hedging, certainty, repair, lexical diversity, negation, and discourse measures
- richer question/answer alignment
- transcript confidence propagation into reliability

## Phase F — Multimodal and media integrity

- speaker diarization
- synchronized video analysis
- facial action units
- audio/video synchronization
- cross-modal fusion
- synthetic-speech detection and provenance-aware benchmark evaluation

## Phase G — Scientific validation

- freeze operational definitions
- define target tasks and populations
- speaker-disjoint development/evaluation partitions
- cross-dataset evaluation
- recording-condition stress tests
- identity sensitivity analysis
- subgroup/language robustness where appropriate
- calibration and uncertainty analysis
- explicit abstention testing
- external replication

Only after this phase can a candidate method be considered for validated inferential use.

## Phase H — Controlled inference engine

Future work may include a validated multi-engine deception research layer that combines independently justified observations, validated models, uncertainty, reliability, evidence convergence, and alternative explanations. A deception probability score or confidence matrix is not an active validated capability today and must never be fabricated by the interface.

## Product and deployment roadmap

- production-grade frontend under the canonical VoxVector project boundary
- authenticated user and case management
- secure audio storage and retention controls
- analysis job lifecycle and result persistence
- mobile-first polished UX
- deployment verification at `voxvector.crownlabs.tech`
- monitoring, provenance, and operational audit trails

Every roadmap stage remains subject to the Operating Charter and Project Decision Log.
