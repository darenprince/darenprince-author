# VoxVector — ChatGPT Project Instructions

## 1. Identity and authority

Use **VoxVector** exclusively as the current system identity.

VoxVector is the end product being built: a modern full stack vocal and audio deception analysis platform.

The GitHub repository is the operational memory and technical source of truth. Never reconstruct VoxVector from conversation memory, screenshots, assumptions, or historical snapshots.

Canonical repository:

`https://github.com/darenprince/darenprince-author/tree/main/VoxVector`

Canonical application boundaries:

- Backend and analysis engine: `VoxVector/`
- Backend HTTP adapter: `VoxVector/api/app.py`
- Analysis engine: `VoxVector/src/voxvector/`
- Public React application: `voxvector/`
- Public frontend path: `/voxvector/`
- Developer Console path: `/voxvector/developer/`
- Production frontend host: GitHub Pages at `https://darenprince.com/voxvector/`
- Production backend host: Render at `https://voxvector.crownlabs.tech`
- Durable operational diagnostics and auth: Supabase
- Vercel: retired from VoxVector architecture

The Crown Labs Bible is an authorized executive and product mirror. It never overrides repository implementation, architecture, validation state, or deployment truth.

## 2. Mandatory preflight

Before substantive work:

1. Read `VoxVector/docs/OPERATING_CHARTER.md`.
2. Read `VoxVector/docs/PROJECT_DECISION_LOG.md` when architecture, workflow, or prior decisions matter.
3. Read `VoxVector/docs/DEVELOPMENT_WORKFLOW.md` for editing, branch, PR, preview, and deployment rules.
4. Read `VoxVector/docs/AI_EDITING_GUARDRAILS.md` before substantive editing.
5. Read `VoxVector/docs/CAPABILITY_STATUS.md` and `VoxVector/docs/ROADMAP.md` for capability scope and maturity.
6. Read `VoxVector/docs/ANALYSIS_PIPELINE.md` for pipeline work.
7. Read `VoxVector/docs/ARCHITECTURE.md` for architecture work.
8. Read `VoxVector/docs/PRODUCT_EXPERIENCE_ARCHITECTURE.md` for product experience work.
9. Read `VoxVector/docs/MASTER_METHOD_INDEX.md`, `ANALYSIS_METHODS.md`, and `METHOD_QA_MATRIX.md` for methodology work.
10. Read `VoxVector/docs/VALIDATION.md` when QA or scientific validation matters.
11. Inspect the actual implementation, package configuration, workflow files, and runtime configuration before making capability or deployment claims.
12. Search for related implementations before creating new files, routes, components, or methods.
13. Preserve historical records while keeping active canonical records current.
14. Never invent measurements, model results, capabilities, tool execution, deployment verification, QA results, or scientific validation.

For `continue`, `go`, `keep developing`, or similar commands, resume from the actual repository state. Do not restart the project from memory.

## 3. Canonical product pipeline

The canonical product workflow contains 21 stages:

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

Do not recreate the obsolete six stage presentation as the canonical pipeline.

Maintain these architectural layers as separate controls:

- eligibility and reliability
- evidence collection and analysis
- candidate classification
- final classification and disposition

Never collapse the system into one opaque score.

## 4. Scientific and evidence policy

No individual vocal, acoustic, linguistic, temporal, behavioral, emotional, psychological, or conversational signal independently proves deception.

Signals are evidence within a larger analytical system. Preserve:

- provenance
- measurement context
- reliability
- uncertainty
- evidence direction
- evidence convergence and conflict
- dependence between evidence sources
- alternative explanations
- calibration requirements
- validation status

VoxVector may combine supported analysis engines, acoustic and linguistic measurements, psychological or behavioral models, and other evidence in downstream analysis to generate a deception probability score and confidence matrix when the configured methodology and validation gates support those outputs.

Never manufacture a probability, confidence value, classification, measurement, or validation result.

A successful build, passing software test, working API request, browser preview, or deployment is software verification. It is not scientific validation.

## 5. Capability maturity policy

Keep these states distinct:

- research candidate
- planned
- implemented
- integrated
- tested
- validated
- production capability
- retired by explicit project decision

Research findings are not automatically VoxVector capabilities.

A planned or research backed capability remains canonical product scope until explicitly retired. Do not delete or silently downgrade future capabilities because implementation is pending.

Use the canonical methodology hierarchy:

1. `MASTER_METHOD_INDEX.md`
2. `ANALYSIS_METHODS.md`
3. `METHOD_QA_MATRIX.md`
4. `CAPABILITY_STATUS.md`
5. `VALIDATION.md`
6. `ROADMAP.md`

Keep status synchronized across these records.

## 6. Connected product architecture

The product target is one case centered workflow from recording intake through synchronized analysis, evidence synthesis, assessment, reporting, and disposition.

Shared case identity must connect:

- persistent analysis case
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
- history and reopen
- comparisons
- alerts
- developer tooling

The frontend is an interface over the canonical API. It must never duplicate the analysis engine, fabricate telemetry, or use animation as evidence that analysis occurred.

## 7. Developer Console policy

The Developer Console is the engineering cockpit.

It should expose real system state where a real contract exists, including:

- runtime health
- API workbench
- request inspection
- request correlation IDs
- upload lifecycle
- server lifecycle events
- errors and diagnostics
- methodology navigation
- architecture navigation
- pipeline navigation
- MVP board
- task state
- phase completion
- dependency visibility
- next task visibility

A task checkbox is developer workflow state only. It never certifies implementation or scientific validation.

Where the backend does not expose numeric progress, keep progress indeterminate rather than inventing percentages.

Live UI animation must reflect actual request or runtime state where possible. Decorative animation remains decorative and must never imply scientific evidence, telemetry, or completed analysis that did not occur.

## 8. Current frontend system

The public application is standardized on:

- React 18.3.1
- shadcn style application owned composition
- Base UI interaction primitives
- Tremor React analytical components
- Tailwind CSS
- Lucide React
- Motion for React
- TanStack Query
- Supabase Auth and persistence

Tremor remains the dominant analytical visual language. shadcn style composition and Base UI provide application owned interaction structure. Motion provides purposeful state driven animation. Do not introduce a competing visual system without an explicit architecture decision.

The approved active visual language is restrained and premium: espresso black, warm brown, copper, muted amber, warm white, neutral black/white/gray foundations, thin low contrast borders, and purposeful semantic state colors. The approved landing palette does not use blue or cyan accents.

## 9. Current landing and brand rules

The landing page is an existing canonical application surface. Edit it surgically.

Current workflow presentation includes:

- `Deep Forensic Vocal Analysis + State of the art Linguistics`
- `State of the art Linguistics` uses the approved coffee accent
- CTA text: `Deep Analysis Methods`
- current workflow description: `See what really makes VoxVector the future of trusted vocal deception detection. Explore the audio intelligence architecture, data extraction processing engines, analysis frameworks, psychological inference models, and long term vision behind VoxVector.`
- the supplied audio analysis console image remains the canonical workflow visual
- the coffee colored animated waveform behind it is decorative interface motion only

Current header brand treatment:

- icon and wordmark are one cohesive lockup
- mobile header allocation is approximately 50% of the available header width
- icon and wordmark maintain the same visual height
- desktop uses a restrained professional SaaS/application size rather than the oversized mobile treatment
- footer uses the supplied icon above wordmark as the canonical centered lockup

Do not replace the landing page with a new page or recreate it from a screenshot.

## 10. Surgical editing policy

Existing pages, routes, components, stylesheets, and product surfaces are canonical assets.

For an edit request:

1. Read the current implementation.
2. Classify the request as content, visual, behavior, feature, new page, or architecture change.
3. Identify the smallest exact region that satisfies the request.
4. Make the smallest defensible change.
5. Preserve unrelated code, imports, routes, state, API behavior, authentication, responsive behavior, accessibility, animation, and styling.
6. Read back the modified file.
7. Inspect the diff and search for duplicate or competing implementations.
8. Run applicable build, test, or browser verification when available.
9. Synchronize affected documentation.

Never completely recreate, regenerate, or overwrite an existing page for a normal edit request.

A full rewrite is permitted only when the user explicitly requests a rewrite, replacement, migration, or architectural restructuring.

Never create workaround files such as `v2`, `new`, `final`, `backup`, `index2`, or replacement copies for an existing page.

A screenshot is a visual target, not permission to remove functionality that is not visible in it.

If the user asks for a UI or application change, implement it in the actual application. Do not substitute an image mockup for working code unless the user explicitly requests an image/design artifact.

## 11. Development and branch policy

Substantive work follows:

`main → feature/fix branch → pull request → production-like build → PR build artifact or isolated preview → manual visual/functional review → merge → production Pages deployment`

Do not use `main` as the iterative development branch for substantive changes.

Production frontend deployment comes from `main` only.

PRs must never replace the production GitHub Pages deployment. Until a separate isolated Pages preview target exists, the PR workflow must use a downloadable build artifact or local browser preview.

Keep each PR coherent. Do not mix unrelated redesigns, speculative rewrites, or architecture changes into a narrow fix.

## 12. Deployment policy

GitHub Pages is the only canonical public frontend host.

Render is the only canonical VoxVector backend host.

GitHub Pages must build the `voxvector/` React application and publish the generated artifact under `/voxvector/`.

Render must serve the canonical FastAPI backend from `VoxVector` using `api.app:app`.

The root `voxvector.html` is a compatibility redirect only. It must never contain a competing implementation.

The GitHub Pages workflow must stage `docs/crownlabsbible/` so the public Crown Labs documentation viewer is preserved in the deployed artifact.

Never reintroduce Vercel deployment code, configuration, or dependencies into VoxVector.

Deployment success must be verified rather than assumed. A green workflow does not by itself prove the live browser experience is correct.

## 13. QA and verification policy

For substantive frontend changes:

- inspect the diff
- inspect the production build output
- inspect the PR artifact or isolated preview when available
- verify desktop and mobile behavior
- verify the requested behavior
- verify unrelated functionality remains present
- verify accessibility and reduced motion behavior where relevant
- after merge, verify the production URL and deployed revision when tooling permits

For backend/runtime changes, verify applicable tests, health state, API behavior, diagnostics, and deployment state when tooling permits.

Never claim a test, build, deployment, browser check, live API call, or scientific validation unless it actually occurred.

## 14. Documentation synchronization policy

When a substantive change affects behavior, architecture, workflow, methodology, capability, deployment, or persistent project policy, update the affected canonical documentation.

At minimum consider:

- `OPERATING_CHARTER.md`
- `CHATGPT_PROJECT_INSTRUCTIONS.md`
- `AI_EDITING_GUARDRAILS.md`
- `DEVELOPMENT_WORKFLOW.md`
- `PROJECT_DECISION_LOG.md`
- `CAPABILITY_STATUS.md`
- `ROADMAP.md`
- method and QA records
- deployment/build documentation
- Crown Labs Bible mirrors

Historical records remain available for traceability, but obsolete instructions must be explicitly marked superseded.

## 15. Product communication policy

Customer facing VoxVector communication should be confident, direct, premium, modern, technology forward, ambitious, and evidence oriented.

Lead with:

- what VoxVector is
- analysis depth
- technology and intelligence
- multimethod workflow
- evidence synthesis
- product experience
- end state capability
- value

Do not turn public product pages into internal QA reports or lead with development limitations.

At the same time, accuracy is absolute. Never claim an implemented, tested, validated, deployed, or scientifically established capability that the repository does not support.

Internal maturity, failure modes, validation requirements, uncertainty, and engineering caveats belong in the appropriate developer, QA, validation, and repository records.

## 16. Evidence presentation policy

Analysis screens must not hide uncertainty behind a dramatic single score.

Where implemented and supported, present:

- eligibility and data quality
- evidence sources and provenance
- contributing methods
- evidence convergence and conflict
- uncertainty
- alternative explanations
- candidate classification
- validation/calibration state
- final classification or disposition
- audit/provenance information

A final result must be traceable to the evidence and methodology that produced it.

## 17. Change completion rule

A substantive task is not complete merely because a file was written or a UI appears correct.

Completion requires, as applicable:

- implementation review
- dependency review
- readback and integrity check
- duplicate/competing implementation check
- applicable build/test/browser verification
- documentation synchronization
- preservation of planned work and historical traceability
- clear statement of what was actually verified

If verification is unavailable, record that internally and do not imply verification occurred.

## Final directive

Build from the GitHub canon.

Build the end product.

Resume from actual repository state.

Use the 21 stage pipeline as the canonical workflow.

Keep eligibility, evidence, candidate classification, and final disposition separate.

Preserve scientific rigor without weakening the product identity.

Treat research as research until implementation and validation establish capability.

Use the Developer Console as the engineering cockpit.

Edit existing pages surgically.

Never recreate an existing page unless explicitly instructed.

Never create duplicate versions of existing pages.

Use feature branches and pull requests for substantive changes.

Keep PR previews isolated from production.

GitHub Pages is frontend. Render is backend. Vercel is retired.

Never fabricate telemetry, measurements, results, probabilities, confidence, testing, deployment, or validation.

Keep VoxVector auditable, reproducible, evidence based, technically capable, and honest about what it can actually do.
