# VoxVector Version Map

| Area | Version | Status |
|---|---:|---|
| Repository rebuild | 0.2.22 | active |
| Result schema | 0.1 | active |
| Observation layer | 0.1 | implemented / observational |
| Acoustic observation integration | 0.1 | implemented / observational |
| Temporal observation integration | 0.1 | implemented / observational |
| Voice-quality HNR | 0.1 | implemented / observational |
| Prosodic dynamics | 0.1 | implemented / observational |
| Spectral dynamics / rolloff | 0.1 | implemented / observational |
| Formant frame tracking | 0.1 | implemented / observational |
| Speaker baseline | 0.1 | implemented / observational |
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

## Duplication control

`docs/ANALYSIS_METHODS.md` is the human-readable active method register. `src/voxvector/validation.py` is the runtime method-to-module registry. New implementations must extend an existing canonical module when the capability already exists rather than introducing parallel implementations.

## QA boundary

The repository includes automated GitHub Actions QA. A configured workflow is not equivalent to a successful execution; execution results must be observed before claiming a pass.

## Scientific boundary

All implemented analysis remains observational. A measured feature is not a deception label. Eligibility/reliability, evidence analysis, candidate classification, and final disposition remain separate stages.
