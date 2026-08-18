# VoxVector Version Map

| Area | Version | Status |
|---|---:|---|
| Repository rebuild | 0.2.20 | active |
| Result schema | 0.1 | active |
| Observation layer | 0.1 | implemented / observational |
| Acoustic observation integration | 0.1 | implemented / observational |
| Temporal observation integration | 0.1 | implemented / observational |
| Reliability gate | 0.1 | implemented / eligibility control |
| Evidence grouping | 0.1 | implemented / neutral |
| Evidence convergence | 0.1 | implemented / neutral |
| Candidate classification boundary | 0.1 | implemented / indeterminate-only |
| Final disposition gate | 0.1 | implemented / guarded |
| Validation registry | 0.2 | expanded research candidates / fail-closed |
| Reproducibility / QA | 0.1 | implemented / regression controls |
| Method QA matrix | 0.1 | implemented / coverage control |
| QA status report | 0.1 | implemented / coverage report |
| Research method expansion | 0.1 | implemented / research backlog |
| Research timing | 0.1 | implemented / observational |
| Research prosody | 0.1 | implemented / observational |
| Validation registry regression tests | 0.1 | implemented |
| CI QA workflow | 0.1 | configured / execution pending |
| Deception classifier | — | not validated / not active |
| Transcript analysis | — | not active |
| Speaker diarization | — | not active |
| D-Series validated inference | — | not active |

## Current canonical location

VoxVector is maintained under `VoxVector/` in `darenprince-author`. `crowncodeaisuite` is historical source material for migration and traceability.

## QA boundary

The repository now includes an automated GitHub Actions workflow at `VoxVector/.github/workflows/voxvector-qa.yml`. It installs the package and runs the complete pytest suite on VoxVector changes. A configured workflow is not equivalent to a successful execution; execution results must be observed before claiming a pass.

## Scientific boundary

All implemented analysis remains observational. A measured feature is not a deception label. Eligibility/reliability, evidence analysis, candidate classification, and final disposition remain separate stages.
