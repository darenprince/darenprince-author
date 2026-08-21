# VoxVector

VoxVector is a standalone vocal and audio analysis and deception research system for structured evidence collection, acoustic analysis, reliability assessment, and controlled research.

`VoxVector/` is the canonical implementation, runtime adapter, tests, and technical documentation home. The root-level `./api/` directory is not part of VoxVector and must not be recreated.

## Scientific and runtime boundary

VoxVector does not treat pitch change, hesitation, silence, stress, arousal, emotion, cognitive load, speaking rate, or any individual acoustic or linguistic feature as proof of deception. The runtime preserves four distinct stages:

1. eligibility and reliability controls
2. evidence collection and analysis
3. candidate classification
4. final classification or disposition

The current classifier is fail-closed and returns an indeterminate state. No validated deception probability is currently produced.

## Current implementation

The primary `VoxVectorPipeline` currently integrates acoustic summaries, F0 and intensity dynamics, HNR, spectral flux and rolloff, formant tracking, pause topology, optional within-speaker baselines, optional response latency, and optional transcript disfluency observations. MFCC/cepstral processing is implemented as a reusable module but is not yet a primary pipeline output. Additional implemented utilities remain available for controlled expansion.

## Capability status

Every capability is classified as **implemented**, **implemented but not primary-pipeline integrated**, **planned research**, or **validated inferential**. Planned capabilities are intentionally retained and are not treated as deleted merely because implementation is pending. See `docs/CAPABILITY_STATUS.md` and `docs/ROADMAP.md`.

## Canonical documentation

- `docs/OPERATING_CHARTER.md` — governing principles
- `docs/PROJECT_DECISION_LOG.md` — architectural decisions and conflicts
- `docs/ARCHITECTURE.md` — runtime stages and boundaries
- `docs/ANALYSIS_METHODS.md` — implemented observational method register
- `docs/CAPABILITY_STATUS.md` — implemented vs integrated vs planned map
- `docs/ROADMAP.md` — preserved future feature and research roadmap
- `docs/RESEARCH_INTEGRATION.md` — research-to-capability boundary
- `docs/RESEARCH_METHOD_EXPANSION.md` — research-derived backlog
- `docs/RESULTS_CONTRACT.md` — result schema contract
- `docs/VALIDATION.md` — validation and abstention requirements
- `docs/METHOD_QA_MATRIX.md` — method QA coverage
- `docs/SYSTEM_STATE_REPORT.md` — current repository state
- `docs/VERSION_MAP.md` — version and deployment state
- `docs/DEPLOYMENT_PLAN_FREE.md` — deployment runbook
- `docs/RENDER_RUNTIME_INCIDENT_2026-08-19.md` — Render incident and remediation history

## Runtime layout

```text
VoxVector/
  api/                 # FastAPI HTTP adapter only
  src/voxvector/       # canonical analysis engine
  tests/               # automated QA
  docs/                # canonical project documentation
```

Render is configured to use `VoxVector` as the root directory and `api.app:app` as the HTTP entry point. The intended public product target is `voxvector.crownlabs.tech`; deployment verification remains a separate operational check.

## Development

Python 3.12+ is the supported runtime baseline. Dependencies are pinned to the reviewed current versions in `pyproject.toml` and `api/requirements.txt`.

```bash
python -m pip install -e '.[dev]'
pytest
```

A green software test suite is not scientific validation. Model-backed transcription, diarization, learned classifiers, cross-modal analysis, and other research candidates may be added only after provenance, implementation, QA, evaluation, reliability behavior, and validation status are documented.
