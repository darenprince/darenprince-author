# VoxVector

VoxVector is a vocal and audio analysis system for structured evidence collection, acoustic analysis, reliability assessment, and deception research.

This repository is the canonical implementation and technical documentation home for VoxVector.

## Core principle

VoxVector does not treat pitch change, hesitation, silence, stress, arousal, emotion, cognitive load, or any single acoustic or linguistic feature as proof of deception. The engine preserves the distinction between:

1. eligibility and reliability controls
2. evidence collection and analysis
3. candidate classification
4. final classification or disposition

The system reports measured observations, uncertainty, data quality, and evidence convergence rather than presenting a single feature as a lie detector.

## Repository structure

- `VoxVector/docs/OPERATING_CHARTER.md` — authoritative operating model
- `VoxVector/docs/ARCHITECTURE.md` — runtime architecture and stage separation
- `VoxVector/docs/ANALYSIS_METHODS.md` — acoustic, linguistic, temporal, and reliability methods
- `VoxVector/docs/RESULTS_CONTRACT.md` — machine-readable result contract
- `VoxVector/docs/VALIDATION.md` — validation and abstention requirements
- `VoxVector/docs/PROJECT_DECISION_LOG.md` — canonical decisions and changes
- `VoxVector/docs/CHATGPT_PROJECT_INSTRUCTIONS.md` — project instructions for ChatGPT sessions
- `VoxVector/src/voxvector/` — implementation
- `VoxVector/tests/` — automated tests

## Status

The repository is a clean rebuild. It intentionally does not inherit executable code from the previous system. Historical concepts are retained only where they are useful to preserve traceability and research intent.

## Development

Python 3.11+ is recommended.

```bash
python -m pip install -e '.[dev]'
pytest
```

## Runtime boundaries

The current implementation is an analysis foundation, not a validated forensic deception detector. Model-backed transcription, diarization, learned classifiers, and deployment integrations must be added only when their data provenance, evaluation results, and failure behavior are documented.
