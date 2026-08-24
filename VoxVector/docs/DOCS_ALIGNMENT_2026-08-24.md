# VoxVector Documentation Alignment — 2026-08-24

## Purpose

This is the active cross document synchronization audit following a deep review of the VoxVector technical, product, analytical, validation, operational, API, and Crown Labs documentation.

The repository remains the technical source of truth. Historical checkpoint documents remain historical records.

## Review scope

Reviewed:

- operating authority
- project decisions
- architecture
- analysis pipeline
- product experience architecture
- implementation plan
- MVP build plan
- roadmap
- capability status
- master method index
- analysis methods
- QA matrix and QA status
- validation
- results contract
- version map
- system state
- API documentation
- README
- AI project instructions
- current visual asset checkpoint
- Crown Labs product overview
- Crown Labs positioning
- website copy
- editorial
- marketing samples

## Alignment decisions

### Product language

Customer experience is standardized as:

**Recording → Analysis → Assessment → Result**

The 21 stage pipeline remains the canonical technical architecture.

Customer facing language should favor:

- Recording
- Audio
- Voice
- Vocal analysis
- Audio data
- Analysis
- Evidence
- Assessment
- Result
- Reliability
- Confidence
- Uncertainty
- Context
- Convergence
- Conflict
- Alternative explanations

Internal stage terminology remains available where technical precision is required.

### Analytical depth

The Master Method Index contains more than 300 individually defined analytical data points and evidence fields.

This is the breadth of the documented method library. It is not a claim that every analysis run returns more than 300 outputs.

Current runtime output remains governed by implemented methods and available inputs.

### API

The API is a first class product surface and the interface to the canonical VoxVector engine.

Documented current contracts include runtime health, direct WAV analysis, authenticated case workflow, source upload and provenance, signed playback, case bound analysis, persisted stage state, request correlation, and diagnostics.

The API must not become a parallel analysis engine.

### Scientific architecture

VoxVector remains a deception detection product.

The analytical architecture keeps these stages separate:

**Eligibility and reliability → Evidence collection and analysis → Candidate classification → Final classification and disposition**

Software QA, implementation, runtime execution, and deployment are not scientific validation.

### Version and runtime alignment

- Backend package: 0.2.25
- Public React application: 0.2.36
- Reviewed production Python baseline: 3.11.9
- NumPy: 2.4.6

### Deployment alignment

- GitHub Pages: public React application
- Render: FastAPI backend
- Supabase: authentication, persistence, diagnostics, and case media architecture
- Vercel: retired

## Documentation synchronization map

| Change | Required documents |
|---|---|
| Pipeline | Architecture, Analysis Pipeline, Product Experience Architecture, Implementation Plan, MVP Build Plan, Roadmap, Capability Status |
| Runtime capability | Capability Status, Analysis Methods, Results Contract, Method QA Matrix, System State |
| Scientific validation | Validation, Capability Status, Method QA Matrix, Results Contract where applicable |
| Product architecture | Product Experience Architecture, Architecture, Implementation Plan, MVP Build Plan |
| Public product language | Executive Summary, Crown Labs overview, positioning, website copy, editorial, marketing |
| Version or deployment | Version Map, System State, README, deployment records |
| API contract | API README, Results Contract, Architecture, Capability Status, QA records |

## Integrity rules

1. A planned method is not a current runtime output.
2. An implemented observation is not automatically validated deception inference.
3. Software testing is not scientific validation.
4. A UI illustration is not live analytical telemetry.
5. The frontend is not a second analysis engine.
6. The API is not a second analysis engine.
7. Historical records remain historical.
8. The product identity remains vocal and audio deception detection.
9. The 21 stage pipeline remains canonical.
10. Repository implementation determines current runtime capability.

## Corrections made in this pass

- aligned the public frontend version to 0.2.36
- aligned the README Python requirement with the reviewed 3.11.9 production baseline
- refreshed the system state date to 2026-08-24
- refreshed the active documentation audit reference
- added speech segmentation to the active version map
- removed outdated customer facing use of the term "signal" from the README's product description
- preserved the 300+ analytical data point claim as a method library breadth statement rather than a per run output claim
- preserved API positioning as an interface to the canonical engine
- retained scientific and implementation boundaries in the technical documentation

## Next synchronization trigger

Run another documentation synchronization pass after the next substantive runtime, API, product workflow, or verified deployment change.
