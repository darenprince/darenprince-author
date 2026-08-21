# VoxVector Operating Charter

## 1. Identity

Name: VoxVector.

VoxVector is a standalone vocal and audio analysis and deception detection system. Its product objective is to deliver an auditable system for detecting and evaluating potential deception from interview and conversational audio and to mature that system through implementation engineering and validation.

VoxVector is the end product being built. Research and validation work exists to strengthen and validate the product rather than redefine it as a research project.

The intended product capability is deception detection. Implementation state and scientific validation state remain tracked internally in developer and repository documentation.

## 2. Authority model

The GitHub repository is the canonical technical source of truth for implementation, schemas, runtime behavior, validation requirements, product architecture, and project decisions.

Authority order:

1. `docs/OPERATING_CHARTER.md`
2. `docs/PROJECT_DECISION_LOG.md`
3. runtime schemas and implementation under `src/voxvector/`
4. supporting technical documents under `docs/`
5. historical material, experiments, and external research

If sources conflict, the higher authority wins and the conflict is recorded in the decision log.

## 3. Scientific rule

Vocal stress, hesitation, pitch, silence, arousal, emotion, cognitive load, speaking rate, or any other individual signal is one observation within a larger analytical system and is not independently equivalent to deception.

VoxVector may combine multiple supported signals and models for deception inference. The analytical architecture must preserve evidence provenance, reliability, uncertainty, alternative explanations, and validation requirements so the product can mature toward robust deception detection.

Scientific discipline belongs in the engineering, developer, validation, and repository layers. It must not be used as a reason to weaken the product identity or communicate VoxVector as merely an exploratory concept.

## 4. Stage separation

The runtime must keep these stages distinct:

### A. Eligibility and reliability

Determine whether the recording and context provide the inputs required for the requested analysis. Assess signal quality, clipping, duration, channel integrity, speaker separability, transcript confidence when available, and contextual completeness.

### B. Evidence collection and analysis

Extract and organize observations from audio and transcript data. Preserve feature-level measurements and provenance.

### C. Candidate classification

Combine supported evidence into candidate hypotheses using the configured analytical models and evidence rules.

### D. Final classification or disposition

A final disposition is produced by the configured classification architecture after the required eligibility, evidence, calibration, and validation gates are satisfied.

These stages are architectural controls. They must not be collapsed into a single opaque score.

## 5. Evidence model

Evidence should be multimodal within the audio domain where possible:

- acoustic and prosodic measures
- temporal behavior
- voice quality
- lexical and linguistic observations
- transcription and alignment
- speaker identification and diarization
- question/answer alignment
- within-speaker baselines
- cross-feature convergence
- recording quality and artifact checks

The system is designed to combine these evidence families into increasingly sophisticated analytical models as implementation and validation progress.

## 6. Product objective and capability development

VoxVector is being built as an end-to-end vocal deception analysis product.

The project tracks implementation and validation maturity internally so engineering decisions remain auditable. That internal maturity tracking must not change the public product identity.

The product roadmap may include:

- production audio ingestion
- speaker identification and diarization
- transcription generation
- transcript and audio alignment
- acoustic and prosodic analysis
- temporal and pause analysis
- linguistic and disfluency analysis
- question and answer alignment
- within-speaker baselines
- multimethod evidence synthesis
- calibrated deception probability
- confidence matrices
- alternative-hypothesis analysis
- validated final classification and disposition

These are product capabilities being developed toward the end-state system. Their current implementation state is maintained in developer-facing capability records.

## 7. Capability preservation

The project distinguishes implementation state from product scope. A method, model, analysis tool, dataset, or product capability documented as planned or research-backed remains part of the canonical project context until implemented, validated, or explicitly retired by project decision.

`docs/CAPABILITY_STATUS.md` and `docs/ROADMAP.md` are the canonical records for internal capability maturity.

## 8. D-Series

D-Series identifiers are retained as project analysis slots. They must map to documented analytical functions and internal validation status. A D-Series label without an implementation or evidence definition is not considered an active method.

## 9. Results discipline

Developer and validation records must identify what was measured, what data were used, reliability state, evidence direction, uncertainty, provenance, and validation status.

The engine must never manufacture measurements, test results, validation, or confidence values.

## 10. Product messaging and communication

VoxVector customer-facing communication must be confident, direct, premium, technology-forward, and oriented toward the end product.

Public product language should communicate:

- what VoxVector is
- what the platform is designed to analyze
- the breadth of the analysis pipeline
- the technology and intelligence being built
- the product experience
- the end-state capability
- the value of evidence-driven vocal analysis

Do not lead customer-facing pages with internal development limitations, abstention language, scientific caveats, negative framing, or statements that make the technology sound unfinished, speculative, weak, or merely experimental.

Do not use phrases such as `does not yet`, `cannot`, `not a deception detector`, `merely research`, `only observational`, `limitations`, `not validated`, `cannot prove`, or similar confidence-reducing language as primary product messaging.

Internal scientific requirements remain mandatory. They belong in developer documentation, validation records, technical architecture, QA records, method registries, and other appropriate repository-side materials.

Customer-facing confidence must never be created by inventing functionality or results. The correct approach is to communicate the real product architecture and development direction strongly while keeping implementation maturity details in the appropriate internal layer.

## 11. Deployment boundary

VoxVector has two deliberately separated application surfaces in the monorepo:

- **Public React application:** `voxvector/` is the canonical frontend workspace. GitHub Pages builds it and publishes the product landing/application under `https://darenprince.com/voxvector/`.
- **Backend API:** `VoxVector/` remains the canonical backend and analysis-engine workspace. The HTTP adapter lives under `VoxVector/api/`, the analysis engine remains under `VoxVector/src/voxvector/`, and Render serves the API at `https://voxvector.crownlabs.tech`.

The legacy root `voxvector.html` is not a second application. It exists only as a compatibility redirect to `/voxvector/`. It must not contain an independent VoxVector implementation.

The GitHub Pages deployment workflow must build `voxvector/` and stage the generated React artifact at `_site/voxvector/`. The Developer Console is part of the React application and is published under `/voxvector/developer/`.

Render must never be used as the public landing-page host. GitHub Pages must never be treated as the backend API host.

## 12. Change control

Runtime changes require corresponding documentation updates. New methods require a method definition, provenance, validation plan, and failure behavior before being promoted to active status. Documentation must preserve future capabilities rather than deleting them merely because implementation is pending.

Product-facing changes must follow the communication policy in `docs/PRODUCT_MESSAGING_POLICY.md`.
