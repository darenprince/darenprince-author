# VoxVector — Crown Labs Product Dossier

**Status:** active development
**Canonical implementation:** `VoxVector/` in `darenprince-author`
**Public target:** `voxvector.crownlabs.tech`
**Current software version:** `0.2.25` in the repository
**Current maturity:** functional observational research foundation with an open runtime reliability incident

## Product definition

VoxVector is a standalone vocal and audio **deception detection system** under active development. Its intended product capability is to analyze interview and conversational audio, organize multiple evidence families, evaluate reliability and data quality, and ultimately support validated deception classification when the scientific validation program permits it.

The current runtime is an observational analysis foundation. It currently measures acoustic, spectral, prosodic, temporal, voice-quality, formant, transcript, interaction, and baseline observations while preserving provenance and guarded classification/disposition boundaries. It does not currently provide a scientifically validated deception probability or deception verdict.

## Executive summary

VoxVector is designed around an auditable evidence chain rather than a dramatic single score. The architecture separates:

1. eligibility and reliability
2. evidence collection and analysis
3. candidate classification
4. final classification or disposition

The product objective remains deception detection. Current maturity is reported separately so that the absence of validated inference is not confused with a change in product direction.

## Current engineering status

The canonical application root is `VoxVector/`. The FastAPI adapter is `VoxVector/api/app.py`, the analysis engine is `VoxVector/src/voxvector/`, tests are under `VoxVector/tests/`, and technical documentation is under `VoxVector/docs/`.

The current repository pipeline version is `0.2.25`. MFCC observations are integrated into the primary pipeline. Formant FFT peak selection has been hardened against the final spectrum-bin boundary. Render is configured to deploy the `VoxVector` root using Python 3.11.9 and the compatible NumPy 2.4.6 baseline.

## Runtime and deployment status

Render successfully builds and starts the API and repeated `/health` checks have returned HTTP 200 with the runtime self-test passing.

A subsequent public `/v1/analyze` request returned HTTP 502 through Cloudflare with Render identified as the origin and an empty response body. This is an **open engineering reliability incident**. The cause has not been assumed or promoted to a scientific finding.

The API now has durable operational observability wired to the existing Supabase architecture. `/v1/analyze` requests receive a correlation ID, lifecycle and stage events are recorded as sanitized JSON, and the response exposes `X-Request-ID`. Diagnostic objects are stored in a private `voxvector-logs` bucket when Render storage credentials are configured. Raw audio and raw transcript content are explicitly excluded from diagnostic records. If durable storage is unavailable, the API falls back to a sanitized Render process-log marker rather than turning storage failure into an API outage.

The next runtime priority is to configure and verify the production storage secrets, then use the persisted request lifecycle evidence to reproduce and diagnose the 502. Resource and timeout safeguards remain open work.

## Current capabilities

The primary pipeline currently integrates acoustic energy/intensity, zero-crossing rate, spectral centroid and spread, fundamental-frequency and harmonicity observations, F0/intensity dynamics, HNR, spectral flux and rolloff, MFCC observations, formant candidate tracking, pause topology, optional within-speaker baselines, optional response latency, and optional transcript disfluency observations.

Additional reusable modules include jitter, shimmer, pulse-period utilities, and lower-level interaction/timing utilities. Capability status is maintained in `VoxVector/docs/CAPABILITY_STATUS.md`.

## Deception detection program

The long-term product is intended to combine independently justified evidence families and validated models into task-specific deception inference. Planned components include richer acoustic and glottal-source measures, learned speech representations, linguistic and conversational analysis, speaker/interaction analysis, multimodal integrity analysis, calibrated uncertainty, dependence-aware evidence convergence, explicit abstention, speaker-disjoint evaluation, cross-dataset testing, and external replication.

No individual vocal, acoustic, linguistic, behavioral, emotional, or psychological feature is treated as proof of deception. Stress, hesitation, pitch, silence, arousal, emotion, cognitive load, speaking rate, pauses, prosody, and other features are signals/evidence only.

## Research and future capability roadmap

Planned work remains part of the product context and includes openSMILE/eGeMAPS-style descriptors, LPCC/GFCC, Teager energy, WavLM, wav2vec 2.0, HuBERT, Conformer, AST, temporal models, production ASR, forced alignment, richer linguistic analysis, diarization, cross-modal analysis, synthetic-media detection, dependence-aware convergence, calibration, uncertainty, and eventual validated inference.

Planned capabilities are not treated as implemented or validated merely because they are documented.

## Commercial model

VoxVector's prospective monetization model includes professional analysis workspaces, advanced analytical workflows, enterprise licensing, API usage, research/evaluation programs, managed analytical services, institutional deployments, and future validated detection tiers. Current documentation does not assert production revenue, customer counts, or validated inference performance.

Commercial value is expected to increase with verified analytical capabilities, scientific validation, reliable infrastructure, auditability, persistent case workflows, and enterprise/API integration.

## Architecture

The canonical engine is separated from the HTTP adapter:

- `VoxVector/src/voxvector/` — analysis engine
- `VoxVector/api/app.py` — FastAPI adapter and request observability boundary
- `VoxVector/api/observability.py` — request correlation and sanitized diagnostic events
- `VoxVector/api/storage.py` — durable Supabase Storage adapter
- `VoxVector/tests/` — QA
- `VoxVector/docs/` — canonical technical documentation

Render must use `VoxVector` as its root directory. The root-level `./api/` directory is not part of the product and must not be recreated.

## Scientific status

All current feature extraction and evidence outputs are observational. Eligibility/reliability, evidence analysis, candidate classification, and final disposition remain separate. No validated deception probability or deception verdict is currently active.

Scientific validation remains a future gate requiring task and population definition, speaker-disjoint evaluation, out-of-sample testing, uncertainty and calibration analysis, reliability and abstention testing, and external replication where feasible.

## Operational checkpoint

The canonical handoff record is `VoxVector/docs/PROJECT_CHECKPOINT_2026-08-19.md`. It records completed work, CI status, Render verification, the open 502 incident, durable diagnostics implementation, and the immediate verification sequence.

## Crown Labs dossier sections

- [Overview](VoxVector/overview.md)
- [Monetization](VoxVector/monetization.md)
- [Valuation](VoxVector/valuation.md)
- [Licensing](VoxVector/licensing.md)
- [Positioning](VoxVector/positioning.md)
- [Architecture](VoxVector/architecture.md)
- [Website copy](VoxVector/website-copy.md)
- [Ecosystem role](VoxVector/ecosystem-role.md)

## Documentation authority

The technical source of truth is the VoxVector directory in GitHub. The Crown Labs Bible is the executive/product documentation mirror and must be synchronized with material changes without replacing the repository as the implementation authority.
