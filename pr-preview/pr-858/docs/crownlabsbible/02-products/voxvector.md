# VoxVector

**Category:** Crown Labs intelligence / vocal and audio deception detection system

**Status:** Active development

**Maturity:** Functional observational analysis foundation; runtime reliability hardening in progress

**Product objective:** Build an auditable vocal and audio deception detection platform for defined interview and conversational tasks.

**Current software version:** `0.2.25`

**Canonical code:** `VoxVector/`

**Public target:** `voxvector.crownlabs.tech`

**Crown Labs product page:** `https://www.darenprince.com/labs/products/voxvector.html`

VoxVector is a standalone vocal and audio **deception detection system** under active development. The current software performs observational acoustic, temporal, spectral, formant, voice-quality, prosodic, interaction, transcript, baseline, MFCC, reliability, and evidence analysis while maintaining provenance, candidate-classification boundaries, and guarded disposition.

The product is being built toward deception detection. The current implementation is not yet scientifically validated for reliable deception inference, and no validated deception probability or deception verdict is currently active. This is a maturity statement, not a change to the product objective.

A durable operational diagnostics layer is now implemented in the API using the existing Supabase architecture. `/v1/analyze` requests receive correlation IDs and emit sanitized lifecycle/stage/error records to a private diagnostics bucket when production storage credentials are configured. Raw audio and raw transcript content are excluded from these records. The diagnostics layer is designed to preserve evidence across Render instance restarts without becoming a new API availability dependency.

The latest deployment checkpoint records successful Render startup and `/health` verification but an open HTTP 502 incident affecting a public `/v1/analyze` request. The next engineering priority is to configure and verify durable storage, correlate a reproduced 502 with its lifecycle records, add resource safeguards, and complete exact deployed-revision verification.

Planned research capabilities remain part of the product roadmap even when they are not yet implemented.

**Technical source of truth:** `VoxVector/docs/`

**Executive dossier:** `docs/crownlabsbible/04-product-dossiers/VoxVector.md`

**Operational checkpoint:** `VoxVector/docs/PROJECT_CHECKPOINT_2026-08-19.md`

**Companion dossier sections:** overview, monetization, positioning, architecture, validation, deception detection program, and ecosystem role.
