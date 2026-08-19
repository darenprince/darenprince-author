# VoxVector Version Map

| Area | Version | Status |
|---|---:|---|
| Repository rebuild | 0.2.24 | active |
| Result schema | 0.1 | active |
| Observation layer | 0.1 | implemented / observational |
| Acoustic observation integration | 0.2 | integrated in pipeline |
| Temporal observation integration | 0.2 | integrated in pipeline |
| Voice-quality HNR | 0.1 | integrated / observational |
| Prosodic dynamics | 0.1 | integrated / observational |
| Spectral dynamics / rolloff | 0.1 | integrated / observational |
| Formant frame tracking | 0.1 | integrated / observational |
| Speaker baseline | 0.1 | optional integrated / observational |
| Response latency | 0.1 | optional integrated / observational |
| Transcript disfluency | 0.1 | optional integrated / observational |
| Reliability gate | 0.1 | implemented / eligibility control |
| Evidence grouping | 0.1 | implemented / neutral |
| Evidence convergence | 0.1 | implemented / neutral |
| Candidate classification boundary | 0.1 | implemented / indeterminate-only |
| Final disposition gate | 0.1 | implemented / guarded |
| Validation registry | 0.3 | synchronized with active methods / fail-closed |
| Reproducibility / QA | 0.1 | implemented / regression controls |
| CI QA workflow | 0.1 | configured / execution must be observed |
| Research method expansion | 0.1 | implemented / research backlog |
| System state report | 0.1 | implemented / repository audit |
| Deception classifier | — | not validated / not active |
| Transcript analysis | — | partial observational features only |
| Speaker diarization | — | not active |
| D-Series validated inference | — | not active |

## Current canonical location

VoxVector is maintained under `VoxVector/` in `darenprince-author`. `crowncodeaisuite` is historical source material for migration and traceability.

## Pipeline integration 0.2.24

The primary `VoxVectorPipeline` orchestrates the existing canonical analysis modules for acoustic summaries, F0/intensity dynamics, HNR, spectral flux/rolloff, formant tracking, pause topology, optional independent speaker baselines, optional response latency, and optional transcript disfluency observations. These remain observational and are preserved with provenance. Frame chunk construction emits exactly the configured number of frames per bounded chunk, preventing partial-frame shape contamination at chunk boundaries.

## Spectral dimension contract

Spectral centroid and spread construct their frequency vector from the actual `rfft` output width. Spectral spread computes the weighted per-frame variance elementwise across FFT columns, preserving one scalar spread value per input frame for arbitrary frame sizes. This is an implementation contract, not a deception-inference claim.

## Formant sample-rate contract

Formant tracking bounds the requested upper frequency by the signal Nyquist frequency. The canonical 5000 Hz default therefore remains usable at lower supported sample rates such as 8000 Hz without attempting to analyze frequencies that cannot exist in the sampled signal.

## Pipeline contract validation

Optional response-latency boundaries are validated before audio feature extraction. Incomplete timing context therefore fails deterministically with the timing contract error instead of being masked by a downstream acoustic/formant error.

## Duplication control

`docs/ANALYSIS_METHODS.md` is the human-readable active method register. `src/voxvector/validation.py` is the runtime method-to-module registry. New implementations must extend an existing canonical module when the capability already exists rather than introducing parallel implementations. `research_prosody.spectral_flux` is now only a compatibility wrapper around the canonical `spectral.spectral_flux` implementation.

## QA boundary

The repository includes automated GitHub Actions QA plus an end-to-end pipeline integration regression test. A configured workflow is not equivalent to a successful execution; execution results must be observed before claiming a pass. The 2026-08-19 QA cycle identified spectral spread dimensionality, bounded-frame construction, NaN-aware reproducibility, floating-point tolerance, sample-rate-aware formant bounds, and validation-order defects. The implementation and regression controls for these findings are now synchronized in 0.2.24; the resulting CI execution must be observed before declaring the repair validated.

## Scientific boundary

All implemented analysis remains observational. A measured feature is not a deception label. Eligibility/reliability, evidence analysis, candidate classification, and final disposition remain separate stages.
