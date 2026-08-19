# VoxVector Reproducibility

Every analysis run should preserve the software version, configuration, input integrity hash, sampling rate, method IDs, segment definitions, quality state, provenance, and output schema version.

Regression tests should use fixed synthetic inputs and explicit boundary cases. Deterministic software behavior is a prerequisite for scientific validation but is not itself inferential validation.

Promotion requires repeatable implementation behavior, leakage-safe evaluation, speaker-disjoint splits, out-of-sample testing, error analysis, calibration where applicable, and documented abstention behavior.
