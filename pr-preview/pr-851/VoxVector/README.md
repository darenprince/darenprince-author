# VoxVector

VoxVector is a vocal and audio analysis and deception research system for structured evidence collection, acoustic analysis, reliability assessment, and controlled research.

This directory is the canonical implementation and technical documentation home for VoxVector.

## Core principle

VoxVector does not treat pitch change, hesitation, silence, stress, arousal, emotion, cognitive load, speaking rate, or any single acoustic or linguistic feature as proof of deception. The engine preserves the distinction between:

1. eligibility and reliability controls
2. evidence collection and analysis
3. candidate classification
4. final classification or disposition

The system reports measured observations, uncertainty, data quality, evidence convergence, and alternative explanations rather than presenting a single feature as a lie detector.

## Structure

- `docs/OPERATING_CHARTER.md` — authoritative operating model
- `docs/ARCHITECTURE.md` — runtime architecture and stage separation
- `docs/ANALYSIS_METHODS.md` — active observational methods and research candidates
- `docs/RESEARCH_INTEGRATION.md` — research-to-capability boundary
- `docs/RESEARCH_METHOD_EXPANSION.md` — research-derived method backlog
- `docs/RESULTS_CONTRACT.md` — result schema contract
- `docs/VALIDATION.md` — validation and abstention requirements
- `docs/METHOD_QA_MATRIX.md` — method-level QA coverage
- `docs/MIGRATION_INTEGRITY.md` — migration traceability
- `src/voxvector/` — implementation
- `tests/` — automated QA

## Status

The current implementation is an analysis foundation. Implemented methods are observational unless explicitly marked otherwise in the validation registry. The deception classifier remains unvalidated and fail-closed.

## Development

Python 3.11+ is recommended.

```bash
python -m pip install -e '.[dev]'
pytest
```

## Runtime boundary

Model-backed transcription, diarization, learned classifiers, and deployment integrations may be added only when provenance, implementation, evaluation, and failure behavior are documented. Research relevance does not equal VoxVector validation.
