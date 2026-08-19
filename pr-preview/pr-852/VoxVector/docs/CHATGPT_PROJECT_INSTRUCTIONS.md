# VoxVector — ChatGPT Project Instructions

## 1. Canonical source and scope

The GitHub repository is the operational memory and technical source of truth for VoxVector:

`https://github.com/darenprince/darenprince-author/tree/main/VoxVector`

The canonical VoxVector application root is `VoxVector/`.

All VoxVector source code, runtime configuration, tests, application documentation, and implementation work must remain under `VoxVector/`. Do not create a second VoxVector implementation, shadow API, duplicate analysis engine, or competing deployment root elsewhere in the repository.

The Crown Labs Bible is an authorized documentation mirror for executive/product context. When a material VoxVector change affects that mirror, synchronize the relevant Bible records as required by the project documentation. This exception does not permit application code or runtime implementations outside `VoxVector/`.

External research may be consulted when appropriate, but external sources do not override the GitHub canon and must not be presented as implemented VoxVector capability without documented provenance, implementation, testing, and validation status.

## 2. Mandatory preflight before substantive work

Before substantive VoxVector work:

1. Review the complete current contents of `VoxVector/docs/` sufficiently to understand the active project state, not merely the document named in the request.
2. Read `VoxVector/docs/OPERATING_CHARTER.md` first because it defines project authority and invariants.
3. Read `VoxVector/docs/PROJECT_DECISION_LOG.md` when a decision, conflict, historical transition, or architectural boundary matters.
4. Read `VoxVector/docs/CAPABILITY_STATUS.md` and `VoxVector/docs/ROADMAP.md` whenever feature scope, research methods, product capabilities, or future development are involved.
5. Read `VoxVector/docs/VERSION_MAP.md`, `VoxVector/docs/QA_STATUS.md`, and `VoxVector/docs/METHOD_QA_MATRIX.md` when implementation, dependencies, testing, validation status, or release state matters.
6. Read the relevant architecture, deployment, incident, analysis-method, or system-state documentation for the task.
7. Inspect the actual current implementation and runtime configuration before making claims about behavior.
8. Prefer current active files over historical material while preserving historical material needed for traceability.
9. Preserve repository terminology and factual basis.
10. Never invent measurements, model results, capabilities, tool execution, deployment verification, or validation.

If documentation and implementation disagree, do not silently choose one. Determine the authority order from the Operating Charter, inspect the implementation, and record a decision when the conflict is material.

## 3. Identity

Use **VoxVector** exclusively as the current system identity.

VoxVector is a standalone vocal/audio analysis and deception research system under development, with the long-term product goal of becoming a modern, world-class, user-friendly full-stack application.

Do not reintroduce historical system names or treat historical implementations as alternate active systems.

## 4. Runtime and stage-separation rule

Maintain these stages as distinct architectural boundaries:

- eligibility and reliability controls
- evidence collection and analysis
- candidate classification
- final classification/disposition

Never collapse these stages into a single score or bypass an earlier gate to produce a downstream result.

Reliability is an eligibility property, not a deception probability.

Observations are not classifications. Candidate classification is not final disposition. Final disposition must remain guarded by the configured reliability and validation requirements.

## 5. Scientific rule

Do not equate vocal stress, hesitation, pitch change, silence, arousal, emotion, cognitive load, speaking rate, or any individual acoustic, linguistic, temporal, spectral, or voice-quality feature with deception by itself.

VoxVector must report what was measured, what evidence converges, what conflicts, what data were unavailable, the reliability state, uncertainty, provenance, and plausible alternative explanations.

Correlated measurements must not be silently treated as independent evidence.

A software test passing does not establish deception-detection validity. A research paper or external model does not become validated VoxVector inference merely because it is relevant to the project.

## 6. Deception probability and confidence-matrix rule

A future post-analysis deception insight engine may combine independently justified multimethod evidence, validated models, uncertainty, reliability, alternative explanations, and dependence-aware evidence convergence to produce a deception probability score and confidence matrix.

Those outputs are **planned future capabilities unless and until the documented validation gates are completed**. They are not to be fabricated, implied, simulated, or represented as currently validated merely because the product vision calls for them.

The interface must never display a fabricated deception probability, confidence matrix, or validated deception verdict.

## 7. Capability preservation rule

A feature, analysis method, model, dataset, integration, or product capability documented as planned, research-backed, or future development remains valid canonical project context even when it is not currently implemented.

Do not delete, silently downgrade, or call a capability obsolete merely because it has not yet been built.

Capability status must be explicit. Use the repository's established status vocabulary, including:

- implemented
- integrated
- implemented but not primary-pipeline integrated
- planned research
- validated inferential
- retired only by explicit project decision

Non-implementation is a development state, not retirement.

## 8. Research discipline

Research may identify candidate methods, architectures, datasets, psychological models, acoustic markers, or hypotheses.

Research claims must not become validated VoxVector capabilities until their provenance, operational definition, implementation, testing, reliability characterization, evaluation, and validation status are documented.

When a requested capability is unavailable, say exactly what is unavailable and either reduce scope, preserve it as planned work, or abstain. Never simulate a result to make the system appear more complete.

## 9. Change control and documentation synchronization

For substantive changes:

- update affected canonical documentation;
- update dependent documentation when runtime behavior changes;
- synchronize the method registry, capability status, version map, QA matrix, and roadmap when applicable;
- preserve historical material needed for traceability;
- record material architectural or scientific decisions in the Project Decision Log;
- perform a readback/integrity check before completion;
- distinguish observed facts from inference, research, and planned work.

When a material VoxVector change affects the Crown Labs Bible mirror, update the relevant product documentation so the mirror does not contradict the canonical repository.

Do not delete project context solely because implementation is pending.

## 10. Deployment and runtime-verification rule

The canonical application root is `VoxVector/`.

The canonical HTTP adapter is `VoxVector/api/app.py`.

The canonical analysis engine is `VoxVector/src/voxvector/`.

The root-level `./api/` directory is not VoxVector and must not be recreated or used as its deployment root.

Render must use:

- Root Directory: `VoxVector`
- Entry point: `api.app:app`

The intended public target is:

`voxvector.crownlabs.tech`

Repository configuration, DNS, a successful build, or a green CI run is not by itself proof that the public deployment is serving the current canonical runtime.

Do not claim deployment verified until the documented runtime readback is actually performed, including `/health` provenance/self-test and the known WAV `/v1/analyze` fixture where applicable.

## 11. Capability honesty

Never claim that a tool, model, dataset, integration, dependency, deployment, analysis method, test, validation result, or runtime behavior was executed or verified unless it actually was.

If evidence is missing, state that it is missing.

Never manufacture:

- measurements
- benchmark scores
- model outputs
- confidence values
- deception probabilities
- QA results
- deployment status
- tool execution
- scientific validation

## 12. Boot behavior

At startup:

1. identify VoxVector;
2. load the current GitHub canon;
3. review the current documentation state;
4. determine actual runtime capability status;
5. check the current version map;
6. inspect relevant implementation and configuration;
7. follow the active architecture and Project Decision Log;
8. preserve planned capabilities without presenting them as implemented;
9. establish what is actually verified before making status claims.

## 13. Completion rule

Do not call a substantive task complete merely because files were edited or a build command was configured.

Before completion, perform the applicable readback/integrity checks and report:

- what changed;
- what was actually verified;
- what remains unverified;
- current implementation status;
- current QA status;
- affected documentation status;
- planned work that remains preserved.

VoxVector must remain auditable, reproducible, evidence-based, fail-closed where validation is absent, and capable of growing without silently converting research plans into unsupported inference.

## Final rule

Build from the GitHub canon.

Do not recreate the old system by assumption.

Do not silently merge experimental methods into validated inference.

Do not remove planned project capabilities merely because they are not yet built.

Keep VoxVector auditable, reproducible, evidence-based, scientifically disciplined, and capable.