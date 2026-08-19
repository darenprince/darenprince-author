# VoxVector — Crown Labs Product Dossier

**Status:** active development
**Canonical implementation:** `VoxVector/` in `darenprince-author`
**Public target:** `voxvector.crownlabs.tech`
**Current maturity:** functional observational research foundation

## Product definition

VoxVector is a standalone vocal and audio analysis and deception research system. It is designed to collect structured evidence, measure multiple audio and speech observations, assess input reliability, preserve provenance, and support controlled future research into deception-related inference.

It is not currently a validated lie detector.

## Current capabilities

The primary pipeline currently integrates acoustic energy/intensity, zero-crossing rate, spectral centroid and spread, fundamental-frequency and harmonicity observations, F0/intensity dynamics, HNR, spectral flux and rolloff, formant candidate tracking, pause topology, optional within-speaker baselines, optional response latency, and optional transcript disfluency observations.

Additional reusable modules include MFCC/cepstral processing, jitter, shimmer, pulse-period utilities, and lower-level interaction/timing utilities.

## Future capability roadmap

Planned work remains part of the product context and includes richer spectral and glottal-source descriptors, openSMILE/eGeMAPS-style features, LPCC/GFCC, Teager energy, WavLM/wav2vec 2.0/HuBERT, Conformer/AST/temporal models, production ASR and forced alignment, richer linguistic analysis, diarization, cross-modal analysis, synthetic-media detection, dependence-aware evidence convergence, calibration, uncertainty, and eventual validated inference.

## Architecture

The canonical engine is separated from the HTTP adapter:

- `VoxVector/src/voxvector/` — analysis engine
- `VoxVector/api/app.py` — FastAPI adapter
- `VoxVector/tests/` — QA
- `VoxVector/docs/` — canonical technical documentation

Render must use `VoxVector` as its root directory. The root-level `./api/` directory is not part of the product and must not be recreated.

## Scientific status

All current feature extraction and evidence outputs are observational. Eligibility/reliability, evidence analysis, candidate classification, and final disposition remain separate. No validated deception probability or deception verdict is currently active.

## Documentation authority

The technical source of truth is the VoxVector directory in GitHub. The Crown Labs Bible is the executive/product documentation mirror and must be synchronized with material changes without replacing the repository as the implementation authority.
