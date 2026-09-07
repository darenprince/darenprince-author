# AI audit execution and reporting instructions

## Authority and scope

Follow repository AGENTS.md, voxvector/AGENTS.md, the VoxVector Operating Charter, AI Editing Guardrails and Development Workflow. These instructions organize audit work; they do not replace those authorities. Backend source is `VoxVector/`; frontend source is `voxvector/`; the Crown Labs Bible is a documentation mirror. User instructions take precedence. Never claim a copied document has been semantically reviewed merely because it was inventoried or hashed.

Before work, read the user's complete plan, identify the exact prompt and acceptance criteria, inspect current git status and revision, and resume the existing report. Preserve unrelated user changes. Record the actual read coverage and outstanding documents. Complete required reading before changing existing canonical documentation or implementation. A specific request to archive records authorizes copying them without certifying their contents.

## Execution procedure

1. Break the requested audit into bounded tasks with explicit completion criteria. Reuse existing evidence unless it is stale for the claim being made. Do not repeatedly restart discovery or run broad checks without a concrete remaining risk.
2. Establish architecture, canonical ownership, and the complete source to build to deployment to runtime to persistence to browser chain. A successful step does not prove the next step.
3. Read relevant source and instructions fully, including referenced decisions. Inventory duplicates by hash but review differing mirrors independently. Record files actually read, not just search hits.
4. For each finding, record claim, observed state, evidence locator, UTC observed_at, event time where different, exact source revision, limitation, severity, canonical owner and proposed action. Label facts, inferences and unknowns explicitly.
5. Keep frontend source/version, QA revision/result, publish revision/result, backend package/runtime versions, deployed revision, health, Render state, authentication, storage, persistence, provider configuration/readiness/execution, pipeline maturity, browser behavior and scientific validation as separate matrix rows.
6. Inspect workflow triggers, publish jobs, accessible variables/environment rules and developer deployment bridges. Do not equate a build with publication, a trigger acceptance with deployment, or an unavailable inventory with an absent configuration.
7. Distinguish provider adapter existence, credential presence, model readiness, invocation, successful execution, persisted artifacts and independently verified artifacts. Record fixture provenance and artifact identifiers without exposing private content. Historical execution is not proof at the current revision.
8. Use read-only service queries for audit evidence when sufficient. Never export secrets, bearer tokens, personal records, audio or transcripts into this repository. Keep service diagnostics aggregates separate from raw logs. Do not bypass permission or subscription restrictions.
9. Preserve scientific boundaries. Technical tests, interface illustrations, readiness flags and individual vocal features do not establish validated deception detection. Record validation evidence and limitations separately.
10. For Prompt 1, make only factual documentation corrections supported by evidence after required reading. Preserve dated historical observations and mark supersession where needed. Update corresponding active mirrors. Implementation changes belong to their authorized later prompts.
11. Before ending EACH task, update AUDIT_REPORT.md with completed work, exact files, checks and results, new evidence, blockers, remaining work and next task. Update the source manifest whenever archive contents change. Keep prior observations dated; do not silently turn old measurements into current claims.
12. Verify changes proportionately. For byte copies, check source coverage, byte equality, SHA-256, collisions and original-file preservation. For docs, inspect diffs, source references and applicable links. Run application tests only when required by a gate or changed behavior. Report inspected historical CI separately from tests executed now.
13. Use a feature branch and reviewable PR. Do not merge or deploy without existing authorization. Report push/PR failures honestly and preserve completed local work.

## Archive rules

Copies retain their original bytes and repository-relative source paths under their category. SOURCE_INDEX.md and manifest.json record source, destination, SHA-256, source revision and collection timestamp. Do not rewrite copied historical evidence to match a newer plan. Correct its canonical owner separately and record a new snapshot explicitly if needed. Do not overwrite a snapshot while retaining its old hash or timestamp. The frontend JavaScript audit snapshot is evidence only and must never be imported by the application.

## Required report and final handoff

Include task status (complete, incomplete, blocked or not started), exact acceptance criteria, evidence matrix, coverage and exclusions, findings and corrections, exact changed paths, checks actually run with outcomes, inspected CI links with revisions, base and change revisions, PR URL if created, unresolved issues, and the next prompt identifier. A report must never label the entire prompt complete while mandatory reading, corrections or verification remain unfinished.

Use concise plain English. Lead with delivered work and material limitations. Explain blockers once with the failing action and reason. Do not require the user to reconstruct progress from chat. Keep AUDIT_REPORT.md updated between tasks and preserve the full evidence report it links to.
