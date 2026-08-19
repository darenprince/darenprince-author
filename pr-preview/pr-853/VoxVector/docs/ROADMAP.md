# VoxVector Roadmap

VoxVector is being built toward a comprehensive vocal and audio deception detection system. This roadmap preserves capabilities that have been discussed, researched, or documented but are not yet fully implemented or scientifically validated.

Absence from the current runtime does not make a roadmap item obsolete.

## Phase A — Foundation hardening

- **MFCC/cepstral observations integrated into the primary pipeline — COMPLETE**
- **Render deployment baseline established — COMPLETE**
- **Formant FFT boundary hardening — COMPLETE**
- **Runtime 502 incident investigation — OPEN**
- add structured request IDs and correlation across API requests
- add persistent sanitized error/diagnostic records
- add stage-level timing and resource instrumentation
- add explicit audio/request resource limits and safe failure behavior
- reproduce and resolve origin-side 502/process termination/timeout conditions
- complete current CI repair verification
- keep Python/dependency versions reproducible
- expand reliability and eligibility checks
- synchronize runtime registry, method register, QA matrix, and documentation
- preserve provenance and deterministic failure behavior
- maintain Render runtime fingerprinting and known-fixture verification

## Phase B — Feature-depth expansion

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

## Phase E — Linguistic and conversational intelligence

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

## Phase G — Deception inference research

- define operational deception tasks
- build speaker-disjoint development and evaluation datasets
- evaluate multimethod evidence convergence
- evaluate alternative explanations and confounders
- test identity and recording-condition leakage
- develop candidate deception classifiers
- compare interpretable and learned model families
- establish calibrated uncertainty and explicit abstention behavior

## Phase H — Scientific validation

- freeze operational definitions
- define target populations and deployment conditions
- speaker-disjoint evaluation
- cross-dataset evaluation
- recording-condition stress tests
- identity sensitivity analysis
- subgroup/language robustness where appropriate
- calibration and uncertainty analysis
- explicit abstention testing
- external replication

Only methods that satisfy the validation program may be promoted to validated inferential use.

## Phase I — Controlled deception detection engine

Future production work may enable a validated multi-engine deception detection layer combining independently justified observations, validated models, reliability, evidence convergence, uncertainty, alternative explanations, and task-specific calibration.

Potential future outputs include:

- candidate deception classification
- calibrated deception probability
- confidence and uncertainty matrix
- evidence convergence/conflict summary
- alternative-explanation analysis
- final classification/disposition with abstention

These outputs are roadmap capabilities, not current validated runtime capabilities.

## Product and deployment roadmap

- production-grade frontend under the canonical VoxVector project boundary
- authenticated user and case management
- secure audio storage and retention controls
- analysis job lifecycle and result persistence
- mobile-first polished UX
- deployment verification at `voxvector.crownlabs.tech`
- monitoring, provenance, and operational audit trails

Every roadmap stage remains subject to the Operating Charter and Project Decision Log.

## Current checkpoint

See `docs/PROJECT_CHECKPOINT_2026-08-19.md` for the current implementation, deployment, CI, open runtime incident, and immediate next-step sequence.
