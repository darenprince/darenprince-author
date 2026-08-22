# VoxVector — ChatGPT Project Instructions

## 1. Canonical source and scope

The GitHub repository is the operational memory and technical source of truth for VoxVector.

`https://github.com/darenprince/darenprince-author/tree/main/VoxVector`

The canonical VoxVector backend and analysis root is `VoxVector/`.

The canonical public React application is `voxvector/`.

All VoxVector source code runtime configuration tests application documentation and implementation work must remain within the established repository boundaries.

The Crown Labs Bible is an authorized documentation mirror for executive and product context.

## 2. Mandatory preflight

Before substantive VoxVector work:

1. Read `VoxVector/docs/OPERATING_CHARTER.md`.
2. Read `VoxVector/docs/PROJECT_DECISION_LOG.md` when decisions or architectural boundaries matter.
3. Review the active contents of `VoxVector/docs/` sufficiently to understand the current project state.
4. Read `VoxVector/docs/CAPABILITY_STATUS.md` and `VoxVector/docs/ROADMAP.md` for capability scope.
5. Read `VoxVector/docs/ANALYSIS_PIPELINE.md` for pipeline work.
6. Read `VoxVector/docs/ARCHITECTURE.md` for architecture work.
7. Read `VoxVector/docs/PRODUCT_EXPERIENCE_ARCHITECTURE.md` for product experience work.
8. Read `VoxVector/docs/IMPLEMENTATION_PLAN.md` and `VoxVector/docs/MVP_BUILD_PLAN.md` for engineering sequence.
9. Read `VoxVector/docs/MASTER_METHOD_INDEX.md` and `VoxVector/docs/ANALYSIS_METHODS.md` for method work.
10. Read `VoxVector/docs/METHOD_QA_MATRIX.md` and `VoxVector/docs/VALIDATION.md` when QA or validation matters.
11. Read `VoxVector/docs/DEVELOPMENT_WORKFLOW.md` for editing, branch, PR, preview, and deployment rules.
12. Inspect actual implementation and runtime configuration before making capability claims.
13. Preserve historical records while keeping active canonical records current.
14. Never invent measurements model results capabilities tool execution deployment verification or validation.

## 3. End product identity

Use **VoxVector** exclusively as the current system identity.

VoxVector is the end product being built: a modern full stack vocal and audio deception analysis platform.

The supplied reference screens define the target product experience.

The product target is a connected case centered workflow from recording intake through synchronized analysis evidence synthesis assessment reporting and final disposition.

## 4. Canonical pipeline

The canonical product pipeline contains 21 stages:

1. File Upload / Ingest
2. File Decode and Normalization
3. Provenance and Integrity
4. Channel and Recording Assessment
5. Speaker Identification / Diarization
6. Speech Segmentation
7. Transcription Generation
8. Transcript Alignment
9. Eligibility and Reliability
10. Acoustic Feature Extraction
11. Prosodic and Voice Quality Analysis
12. Temporal and Pause Analysis
13. Linguistic and Disfluency Analysis
14. Question / Answer Alignment
15. Within Speaker Baseline
16. Cross Method Evidence Assembly
17. Evidence Convergence and Conflict
18. Candidate Classification
19. Validation and Calibration Gate
20. Final Classification / Disposition
21. Audit and Provenance Output

Do not recreate the older six stage presentation as the canonical pipeline.

## 5. Stage separation

Maintain these distinct architectural layers:

- eligibility and reliability
- evidence collection and analysis
- candidate classification
- final classification and disposition

Never collapse them into one opaque score.

## 6. Scientific engineering rule

Individual vocal acoustic linguistic temporal behavioral or psychological signals are evidence within a larger analytical system.

Engineering must preserve:

- provenance
- reliability
- uncertainty
- alternative explanations
- evidence dependence
- validation requirements

This rule governs engineering and internal validation.

It must not weaken the identity of VoxVector as the end product being built.

## 7. Product architecture

The connected product must support:

- persistent analysis cases
- source asset identity
- audio playback
- synchronized waveform
- speaker regions
- transcript
- transcript alignment
- analytical tracks
- evidence timeline
- evidence explorer
- pipeline state
- assessment
- reports
- history
- comparisons
- alerts
- developer tooling

All surfaces share one case identity.

## 8. Developer Console

The Developer Console is the engineering cockpit.

Use it to answer:

1. What should be built next?
2. What is complete?
3. What dependency blocks the next task?
4. What does the backend report now?
5. Where is the canonical methodology or architecture record?

The console should expose:

- runtime health
- API workbench
- request inspection
- lifecycle events
- errors
- diagnostics
- methodology navigation
- architecture navigation
- pipeline navigation
- MVP board
- task checkoffs
- phase completion
- dependency visibility
- next task visibility

A task checkbox represents developer workflow state only.

It does not certify implementation or validation.

## 9. Fastest MVP rule

The primary engineering sequence is:

1. case identity
2. intake and provenance
3. playback and waveform
4. real pipeline lifecycle
5. speaker processing
6. transcription
7. alignment
8. analytical tracks
9. evidence normalization
10. evidence synthesis
11. assessment
12. report
13. history and reopen
14. browser verification
15. production hardening

Do not displace this dependency chain with lower priority visual work.

## 10. Methodology hierarchy

Use these records in this order:

1. `MASTER_METHOD_INDEX.md` — complete data point inventory
2. `ANALYSIS_METHODS.md` — method definitions
3. `METHOD_QA_MATRIX.md` — software QA controls
4. `CAPABILITY_STATUS.md` — implementation maturity
5. `VALIDATION.md` — scientific validation
6. `ROADMAP.md` — future development

Keep status consistent across all six records.

## 11. Capability preservation

A planned research method or future capability remains canonical product scope until explicitly retired.

Do not delete or silently downgrade a capability because implementation is pending.

Do not confuse product scope with current runtime state.

## 12. Research discipline

Research may identify candidate methods architectures datasets models and hypotheses.

Research claims must not be fabricated as executed results.

When a capability is not implemented preserve it in the roadmap and continue the engineering path.

## 13. Product messaging

Customer facing VoxVector communication must be:

- confident
- direct
- premium
- modern
- technology forward
- ambitious
- evidence oriented

Lead with capability technology workflow intelligence and product value.

Keep detailed implementation maturity in developer documentation.

Do not invent execution results to strengthen messaging.

## 14. Deployment boundary

The canonical backend is:

- `VoxVector/api/app.py`
- `VoxVector/src/voxvector/`

The public frontend is:

- `voxvector/`

GitHub Pages hosts the public React application.

Render hosts the FastAPI backend.

Supabase provides authentication persistence and durable diagnostics.

Vercel is retired from the VoxVector architecture.

Production frontend deployment is from `main` only. Feature branches and pull requests must not deploy to the production Pages target.

The PR workflow and isolated preview requirements are defined in `VoxVector/docs/DEVELOPMENT_WORKFLOW.md`.

## 15. Capability honesty

Never claim that a tool model dataset integration dependency deployment analysis method test validation result or runtime behavior was executed or verified unless it actually was.

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

Accuracy is mandatory.

## 16. Surgical editing and page preservation

Existing pages, components, routes, and features must be edited surgically by default.

When asked to edit an existing page:

- read the existing implementation first;
- identify the canonical page or route;
- change only the smallest region necessary;
- preserve unrelated code, features, imports, state, routes, responsive behavior, accessibility, and styling;
- inspect the resulting diff and read back the modified file;
- verify that existing functionality was not accidentally removed.

AI agents must not completely recreate or overwrite an existing page file unless the user explicitly requests a rewrite, replacement, migration, or architectural restructuring.

Do not create alternate versions of an existing page to avoid editing the canonical page. Names such as `landing-v2`, `dashboard-new`, `dashboard-final`, `index2`, or replacement copies are prohibited unless they are explicitly defined as genuinely new product surfaces.

A new page or route may be created only when it is truly an additional page in the site architecture.

A screenshot or reference image is a visual target, not permission to remove existing functionality that is not visible in the reference.

## 17. Change control

For substantive changes:

- update affected canonical documentation
- update dependent documentation when runtime behavior changes
- synchronize the method registry
- synchronize capability status
- synchronize the roadmap
- synchronize the QA matrix when applicable
- update version records when appropriate
- record material decisions
- perform a readback and integrity check
- preserve historical traceability
- use a feature branch and pull request for substantive work
- inspect an isolated preview before merging when available

Use `docs/DOCS_ALIGNMENT_2026-08-20.md` as the current cross document synchronization record and `docs/DEVELOPMENT_WORKFLOW.md` as the active editing and deployment procedure.

## 18. Completion rule

Do not call a substantive task complete merely because files were edited.

Before completion establish:

- what changed
- what was actually verified
- current implementation state
- current QA state
- affected documentation state
- preserved planned work
- confirmation that no duplicate or competing page implementation was introduced

## Final rule

Build from the GitHub canon.

Build the end product.

Use the reference experience as the product target.

Use the 21 stage pipeline as the canonical workflow.

Use the MVP plan as the fastest dependency path.

Use the Developer Console as the engineering cockpit.

Preserve scientific rigor in engineering and validation.

Keep customer communication confident and technology forward.

Edit existing pages surgically.

Never recreate an existing page unless explicitly instructed.

Never create duplicate versions of existing pages.

Use pull requests and isolated previews to review substantive changes before production.

Never fabricate execution measurements validation or results.
