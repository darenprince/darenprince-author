# VoxVector Operating Charter

## 1. Identity

Name: VoxVector.

VoxVector is a standalone vocal and audio analysis and deception research system. It is not a subsystem, wrapper, presentation layer, or rebrand of another product.

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

## 6. D-Series

D-Series identifiers are retained as project analysis slots. They must map to documented analytical functions and validation status. A D-Series label without an implementation or evidence definition is not considered an active method.

## 7. Results discipline

Every result must identify what was measured, what data were used, what was unavailable, the reliability state, the evidence direction, uncertainty, and whether the system abstained.

The engine must never manufacture confidence from missing data.

## 8. Change control

Runtime changes require corresponding documentation updates. New methods require a method definition, provenance, validation plan, and failure/abstention behavior before being promoted to active status.
