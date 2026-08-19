# VoxVector Version Map

| Area | Version | Status |
|---|---:|---|
| Repository rebuild | 0.2.25 | active |
| Result schema | 0.2 | active |
| Observation layer | 0.1 | implemented / observational |
| Acoustic observation integration | 0.2 | integrated |
| Temporal observation integration | 0.2 | integrated for pause topology and timing inputs |
| Voice-quality HNR | 0.1 | integrated / observational |
| Prosodic dynamics | 0.1 | integrated / observational |
| Spectral dynamics / rolloff | 0.1 | integrated / observational |
| Formant frame tracking | 0.1 | integrated / observational |
| Speaker baseline | 0.1 | optional integrated / observational |
| Response latency | 0.1 | optional integrated / observational |
| Transcript disfluency | 0.1 | optional integrated / observational |
| MFCC / cepstral module | 0.1 | implemented / not primary-pipeline integrated |
| Jitter / shimmer utilities | 0.1 | implemented / not primary-pipeline integrated |
| Reliability gate | 0.1 | implemented / eligibility control |
| Evidence grouping | 0.1 | implemented / neutral |
| Candidate classification boundary | 0.1 | implemented / indeterminate-only |
| Final disposition gate | 0.1 | implemented / guarded |
| Validation registry | 0.3 | fail-closed |
| Reproducibility / QA | 0.1 | implemented / regression controls |
| CI QA workflow | 0.2 | Python 3.12 configured; fresh result pending |
| Research method expansion | 0.2 | active preserved backlog |
| Capability status map | 0.1 | active |
| Roadmap | 0.1 | active |
| Deception classifier | — | not validated / not active |
| Speaker diarization | — | planned |
| Learned speech representations | — | planned |
| D-Series validated inference | — | not active |

## Canonical location

VoxVector is maintained under `VoxVector/` in `darenprince-author`. Historical systems remain historical source material for traceability and are not alternate active implementations.

## Primary pipeline integration

`VoxVectorPipeline` currently orchestrates acoustic summaries, F0/intensity dynamics, HNR, spectral flux/rolloff, formant tracking, pause topology, optional within-speaker baselines, optional response latency, and optional transcript disfluency observations. MFCC/cepstral processing and several lower-level utilities remain implemented but outside the primary pipeline output contract.

## Runtime and deployment

The HTTP adapter is `VoxVector/api/app.py`. Render must use `VoxVector` as its root directory and launch `api.app:app`. The intended public target is `voxvector.crownlabs.tech`. Repository state alone does not prove that the public domain is currently serving the latest commit.

## QA boundary

The observed GitHub Actions run `32212539187` checked out commit `b66551897170b035dd8b2ca7c3d843d18124d00f` and reported 72 passed and 11 failed. The repository has advanced with repairs after that run. A fresh execution must be observed before claiming a passing suite.

## Scientific boundary

All implemented analysis remains observational. A measured feature is not a deception label. Eligibility/reliability, evidence analysis, candidate classification, and final disposition remain separate stages.
