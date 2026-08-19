# VoxVector Operating Charter

## 1. Identity

Name: VoxVector.

VoxVector is a standalone vocal and audio analysis and deception detection research system. Its product objective is to develop an auditable system for detecting and evaluating potential deception from interview and conversational audio. It is not a subsystem, wrapper, presentation layer, or rebrand of another product.

The intended product capability is deception detection. Current implementation and scientific validation status must be reported separately from that product objective.

## 2. Authority model

The GitHub repository is the canonical technical source of truth for implementation, schemas, runtime behavior, validation requirements, and project decisions.

Authority order:

1. `docs/OPERATING_CHARTER.md`
2. `docs/PROJECT_DECISION_LOG.md`
3. runtime schemas and implementation under `src/voxvector/`
4. supporting technical documents under `docs/`
5. historical material, experiments, and external research

If sources conflict, the higher authority wins and the conflict is recorded in the decision log.

## 3. Scientific rule

Vocal stress, hesitation, pitch, silence, arousal, emotion, cognitive load, speaking rate, or any other individual signal is not equivalent to deception.

VoxVector must preserve alternative explanations such as fatigue, illness, microphone effects, language, accent, topic sensitivity, anxiety, environmental noise, speaker adaptation, and ordinary conversational variation.

The product may ultimately combine multiple supported signals and models for deception inference, but no individual feature proves deception.

## 4. Stage separation

The runtime must keep these stages distinct:

### A. Eligibility and reliability

Determine whether the recording and context are adequate for analysis. Assess signal quality, clipping, duration, channel integrity, speaker separability, transcript confidence when available, and contextual completeness.

### B. Evidence collection and analysis

Extract and organize observations from audio and optional transcript data. Preserve feature-level measurements and provenance.

### C. Candidate classification

Combine independent evidence into candidate hypotheses. Candidate classifications are provisional and must expose uncertainty and conflicting evidence.

### D. Final classification or disposition

A final disposition may be issued only when the configured eligibility and validation gates are satisfied. Otherwise the correct outcome is abstention or insufficient evidence.

## 5. Evidence model

Evidence should be multimodal within the audio domain where possible:

- acoustic and prosodic measures
- temporal behavior
- voice quality
- lexical and linguistic observations
- question/answer alignment
- within-speaker baselines
- cross-feature convergence
- recording quality and artifact checks

No fixed universal threshold should be treated as a deception threshold without validation for the target population, task, recording conditions, and deployment context.

## 6. Product objective versus capability state

VoxVector is being built toward deception detection. The current runtime is an observational analysis foundation and does not yet establish scientifically validated deception inference. Documentation must therefore distinguish:

- **Product objective:** deception detection from structured vocal/audio evidence.
- **Current implementation:** measurable observations, evidence organization, reliability controls, and guarded indeterminate classification.
- **Research candidates:** methods under consideration or development.
- **Validated capability:** inference supported by completed VoxVector validation requirements.

The absence of a validated inference capability today does not change the product's intended purpose.

## 7. Capability preservation

The project distinguishes implementation state from project scope. A method, model, analysis tool, dataset, or product capability documented as planned or research-backed remains part of the canonical project context even when it is not yet implemented. It may be moved to implemented or validated status as evidence accumulates, or retired only through an explicit project decision.

`docs/CAPABILITY_STATUS.md` and `docs/ROADMAP.md` are the canonical records for this distinction.

## 8. D-Series

D-Series identifiers are retained as project analysis slots. They must map to documented analytical functions and validation status. A D-Series label without an implementation or evidence definition is not considered an active method.

## 9. Results discipline

Every result must identify what was measured, what data were used, what was unavailable, the reliability state, the evidence direction, uncertainty, alternative explanations, and whether the system abstained.

The engine must never manufacture confidence from missing data.

## 10. Deployment boundary

VoxVector has two deliberately separated application surfaces in the monorepo:

- **Public React application:** `voxvector/` is the canonical frontend workspace. GitHub Pages builds it and publishes the product landing/application under `https://darenprince.com/voxvector/`.
- **Backend API:** `VoxVector/` remains the canonical backend and analysis-engine workspace. The HTTP adapter lives under `VoxVector/api/`, the analysis engine remains under `VoxVector/src/voxvector/`, and Render serves the API at `https://voxvector.crownlabs.tech`.

The legacy root `voxvector.html` is not a second application. It exists only as a compatibility redirect to `/voxvector/`. It must not contain an independent VoxVector implementation.

The GitHub Pages deployment workflow must build `voxvector/` and stage the generated React artifact at `_site/voxvector/`. The Developer Console is part of the React application and is published under `/voxvector/developer/`.

Render must never be used as the public landing-page host. GitHub Pages must never be treated as the backend API host.

## 11. Change control

Runtime changes require corresponding documentation updates. New methods require a method definition, provenance, validation plan, and failure/abstention behavior before being promoted to active status. Documentation must preserve future capabilities rather than deleting them merely because implementation is pending.
