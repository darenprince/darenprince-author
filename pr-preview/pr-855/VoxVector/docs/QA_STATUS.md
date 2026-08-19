# VoxVector QA Status

This document records repository-level software QA. It is not a scientific validation report.

## Latest observed CI evidence

The observed GitHub Actions run `32212539187`, job `95947898049`, checked out commit `b66551897170b035dd8b2ca7c3d843d18124d00f` and failed at the test step. The run reported **72 passed and 11 failed**.

The failures in that run were concentrated in:

- spectral spread dimensionality
- bounded frame construction
- pipeline integration tests affected by the frame-shape defect
- validation-order behavior for incomplete latency context
- NaN-aware reproducibility comparison
- floating-point tolerance in contour slope

The repository has since advanced beyond that checked-out commit with repairs recorded in the version and incident documentation. A fresh post-repair CI execution must be observed before declaring the repaired state green.

## Current QA coverage map

| Area | Coverage | Current status | Inferential claim |
|---|---|---|---|
| Acoustic | regression and dimensionality coverage | implemented | none |
| Temporal | observation and boundary coverage | implemented | none |
| Voice quality | boundary coverage | implemented | none |
| Pulse / period | regression coverage | implemented | none |
| MFCC / cepstral | regression and boundary coverage | implemented module | none |
| Formant candidates | boundary coverage | implemented | none |
| Reliability | deterministic and non-finite controls | implemented | eligibility only |
| Evidence | grouping/convergence coverage | implemented | neutral |
| Classification | guarded boundary | fail-closed | indeterminate only |
| Disposition | guarded boundary | fail-closed | no verdict enabled |
| Deception classifier | no validated implementation | unavailable | not validated |

## Verification rule

A configured workflow is not evidence of a passing run. A passing software suite establishes implementation behavior only. It does not establish population-level deception-detection performance, causal interpretation, or validated deception probability.
