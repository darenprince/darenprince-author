# VoxVector Results Contract

A complete analysis result must preserve the connected case and run identity.

## Required result families

- case identifier
- analysis identifier
- run identifier
- schema version
- source asset identifier
- source provenance
- recording metadata
- eligibility and reliability state
- pipeline stage states
- speaker records
- speech segments
- transcript records
- alignment records
- analytical observations
- analytical track references
- evidence records
- evidence relationships
- candidate state
- assessment trace
- final disposition
- report references
- lifecycle events
- uncertainty
- alternative explanations
- software provenance

## Evidence record requirements

Every evidence record should preserve:

- method ID
- stage ID
- source interval
- speaker ID when applicable
- observation reference
- measurement
- unit
- quality
- evidence direction
- provenance
- supporting evidence
- conflicting evidence
- dependencies

## Pipeline state requirements

Each stage may expose:

- pending
- running
- complete
- failed
- unavailable
- skipped

The status must represent actual runtime state.

## Assessment boundary

Candidate classification and final disposition remain separate result fields.

The result model must not collapse eligibility evidence candidate classification and final disposition into one field.

The result contract supports calibrated probability confidence matrices uncertainty and alternative hypotheses when the configured analytical architecture provides them.

## Current runtime boundary

The current runtime may return an indeterminate candidate state and controlled disposition state.

Future validated classification outputs must use the same result contract rather than creating a parallel result format.

## Provenance rule

No analytical result may exist without a traceable source and method provenance path.
