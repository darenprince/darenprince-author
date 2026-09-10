# VoxVector audit progress

## Current task status

Prompt: **VV-RUN-LIFECYCLE-RECOVERY-REPORT**. Source base for the current merge cycle: `010676db66e92d715290ee5fe0d1bc3b52c4b208`. Tracking issue: [#945](https://github.com/darenprince/darenprince-author/issues/945). PR: [#946](https://github.com/darenprince/darenprince-author/pull/946). Branch: `fix/voxvector-run-lifecycle-recovery-report`.

This task hardens the existing case/run lifecycle so interrupted analysis runs can be reconciled, terminalized and exported without fabricating successful work or allowing Case History reconciliation to regress a newer same-process run update. It remains separate from secure-deletion issue #948 / PR #951 and Stop Analysis issue #949 / PR #952.

| Task | Status | Evidence or remaining work |
| --- | --- | --- |
| Read canonical charter/workflow/guardrails and actual current source | Complete | Current `main` is `010676db66e92d715290ee5fe0d1bc3b52c4b208` |
| Resolve first three lifecycle review findings | Complete | Fixed deadline handling, historical revision preservation and durable terminal metadata backfill |
| Resolve stale Case History overwrite race | Complete in source | Per-case in-process serialization plus focused concurrency regression |
| Source checkpoint QA | Complete | `18777886bf28c6cac8fb13fc00d5b5653b15b20b` passed VoxVector QA #1954 and PR Preview #815 |
| Synchronize affected canonical docs | Complete in this documentation commit | Pipeline, QA, endpoint and current engineering state owners updated |
| Synchronize Crown Labs Bible mirrors | Complete in this documentation commit | Pipeline/current-engineering mirrors updated |
| Final exact-head QA / PR Preview | Pending | This documentation/audit commit advances the branch head beyond `18777886...` |
| Merge / Render deployment / runtime verification | Not performed at this checkpoint | Must follow final exact-head review/QA; Render auto-deploy is disabled |
| Browser/provider/scientific verification | Not performed | These remain separate evidence gates |

## Task log

### Task 21: harden run lifecycle reconciliation and synchronize active documentation, 2026-09-09

Issue #945 / PR #946 was rechecked against current GitHub source and review threads. The first review cycle had already corrected three defects: legitimate current-worker runs now respect usable configured stage deadlines; old historical runs no longer inherit the source revision of a later runtime merely reading them; and terminal elapsed/report metadata backfill is persisted rather than synthesized only in a response. Head `c332f58e88c73c89c036b127e5bbe57389d6ed05` passed exact-head VoxVector QA #1917 and PR Preview Build #797 after those fixes.

A later P1 review identified a separate stale-snapshot race: Case History could read a whole case object, mutate lifecycle metadata, and then persist that older snapshot after a newer `update_run` result had already been written. The current implementation fixes that within the canonical CaseStore rather than adding a second persistence layer. `CaseStore` now owns per-case in-process serialization; `list_cases` holds the case lock across read/reconcile/write, and explicit reconciliation, `update_run`, source mutation and deletion use the same lock. This matches the current single-process/single-instance Render CaseStore architecture. It is not represented as cross-process compare-and-swap protection for a future horizontally scaled object-store writer model.

`VoxVector/tests/test_case_store_concurrency.py` deliberately blocks a Case History read, starts a newer completed run update, verifies that writer waits while history owns the case lock, releases history, then confirms the final completed run and its artifact remain persisted. Exact-head `18777886bf28c6cac8fb13fc00d5b5653b15b20b` passed VoxVector QA #1954 and PR Preview Build #815.

The active documentation has been synchronized from actual current state rather than preserving stale role-gating/deployment checkpoints as current. `PIPELINE_BUILD_STATUS.md`, `QA_STATUS.md`, `ENDPOINT_REGISTRY.md`, and `CURRENT_ENGINEERING_STATE_2026-09-04.md` now record the lifecycle/report behavior, review chronology, current GitHub `main`, current separately observed Render deployment, per-case serialization boundary, and exact source QA. The Crown Labs Bible pipeline/current-engineering mirrors carry the same product/engineering truth. Historical audit/checkpoint files remain historical evidence and were not rewritten.

Connected service inspection during this task confirmed Render still has one `voxvector-api` service with auto-deploy disabled and latest observed live backend deployment `dep-dagjc3740ujc73ff3ge0` on `09381797d4486bc049cb99a527c624690274b7c7`. Supabase project `VoxVector` remains `ACTIVE_HEALTHY`; its current security advisor still reports the pre-existing guarded `developer_dashboard_summary()` SECURITY DEFINER warning and disabled leaked-password protection. No Supabase schema/policy/role/secret was changed in this lifecycle task.

PR #950 was separately merged before this checkpoint as `010676db66e92d715290ee5fe0d1bc3b52c4b208`; exact-main VoxVector QA #1950 and Deploy GitHub Pages #1707 succeeded. No Render deployment was appropriate for that frontend/docs-only merge. Authenticated desktop/mobile browser verification remains separate.

**Changed files in Task 21 before this audit commit:**

- `VoxVector/api/case_store.py`
- `VoxVector/tests/test_case_store_concurrency.py`
- `VoxVector/docs/PIPELINE_BUILD_STATUS.md`
- `VoxVector/docs/QA_STATUS.md`
- `VoxVector/docs/ENDPOINT_REGISTRY.md`
- `VoxVector/docs/CURRENT_ENGINEERING_STATE_2026-09-04.md`
- `docs/crownlabsbible/04-product-dossiers/VoxVector/pipeline-build-status.md`
- `docs/crownlabsbible/04-product-dossiers/VoxVector/current-engineering-state-2026-09-04.md`
- `voxvector/audits/AUDIT_REPORT.md`

PR #946 also contains earlier scoped lifecycle files `VoxVector/src/voxvector/speech_providers.py`, `VoxVector/tests/test_case_store.py`, `VoxVector/tests/test_speech_providers.py`, and `voxvector/src/components/CaseAnalysisWorkspace.jsx` from the same issue. Final exact-head QA must be observed after this documentation/audit commit before merge. No merge, Render deployment of #946, production case recovery/readback, controlled provider execution, browser verification, or scientific validation is claimed at this checkpoint.

### Task 20: restore Developer engineering status rail and synchronize current documentation, 2026-09-09

Issue #947 / PR #950 was rechecked against actual GitHub branch state rather than conversational or bot summary memory. That readback uncovered an important mismatch: the documentation pass described the engineering rail as a normal-flow sibling below the Developer navigation, but the then-current branch still rendered `DeveloperEngineeringStatus` inside `headerActions`, and the stylesheet still used header-dependent absolute positioning and `:has()` compensation. Those claims were corrected by fixing the canonical source rather than weakening the documentation to match the broken shell.

`voxvector/src/components/DeveloperConsole.jsx` now keeps GitHub/profile controls in `SiteHeader` actions and renders the single existing `DeveloperEngineeringStatus` immediately after `SiteHeader`. `DeveloperEngineeringStatus.css` now gives toolbar mode a real 34px sticky row at `top:56px`; it removes the former header `:has()` compensation and absolute rail positioning. Hiding the component removes that row from layout. Expansion remains the existing fixed status surface from `top:90px` through the available viewport, with internal scrolling on desktop/mobile. `DeveloperEngineeringStatus.jsx` retains the independent X and expand/collapse controls, uses a non-modal `role="region"`, and explicitly connects disclosure controls to the expanded panel with `aria-controls`. `Toast.jsx` remains bottom-right.

The previous accessibility review finding about declaring a modal without a modal focus lifecycle was addressed and resolved. The final PR head `c5aa7f7a6277caf3055afb5dbc565b8438e18b84` passed VoxVector QA #1949 and PR Preview Build #813. PR #950 then merged as `010676db66e92d715290ee5fe0d1bc3b52c4b208`; exact-main VoxVector QA #1950 and Deploy GitHub Pages #1707 also succeeded. Authenticated browser verification remains separate.

Affected current documentation was synchronized rather than creating replacement plans: `CSS_ARCHITECTURE.md`, `UI_APPLICATION_ARCHITECTURE.md`, `DEVELOPER_CONSOLE_DOC_SYNC_RULES.md`, `QA_STATUS.md`, and `CURRENT_ENGINEERING_STATE_2026-09-04.md`. Matching Crown Labs Bible architecture/current-state mirrors describe the same ownership and evidence boundary. Historical checkpoints were not rewritten.

### Task 19: role-gated account access and administrator boundary, 2026-09-09

Tracked in [#931](https://github.com/darenprince/darenprince-author/issues/931). Work started from exact canonical `main` revision `9539fa89ede3295e588feed781971919c542427e` on branch `feat/voxvector-role-gating`.

The prior browser implementation had one developer-specific gate and no canonical role-routed user application entry. The branch added `voxvector/src/lib/access.js` as the single trusted-role interpretation layer, with `admin`, `developer`, and `user` resolved only from Supabase `app_metadata`. User-editable metadata is not accepted for authorization. `AuthGate.jsx` owns session restore, email/password login, password reset, sign-out, unknown-role denial, and role routing. `/voxvector/login` routes trusted `admin` and `developer` sessions to `/voxvector/developer`, trusted `user` sessions to `/voxvector/app`, and unknown/missing roles to a denied login state. Direct protected-route entry independently checks allowed roles instead of relying on redirects alone.

The minimum protected `UserWorkspace.jsx` is intentionally bounded. It exposes authenticated account/session information and a safe user destination without copying the legacy root `voxvector-dashboard.html`, without restoring its old Deception Probability presentation, and without claiming user-facing analysis capability that had not been implemented and verified in the canonical React application at that checkpoint.

The public `SiteHeader.jsx` exposes a visible Login entry on desktop and mobile while preserving the existing landing actions. Backend `VoxVector/api/auth.py` retains the historical `require_developer` dependency name for route stability while accepting trusted `developer` and `admin` roles; trusted `user` remains denied. Automated backend/frontend coverage protects against user-metadata role spoofing.

Administrator account management is added to the existing Developer Console rather than a duplicate application. Privileged operations use the server-side `voxvector-user-admin` Supabase Edge Function source, which revalidates the caller JWT and trusted admin role before using the service-role credential. Administrative mutations write bounded records to `audit_events` without passwords, bearer tokens, or service-role credentials.

The source checkpoint `e97655d59e283d7b3c9cda1065854df469214cb1` passed VoxVector QA run `34329618939` / #1838. Runtime deployment and authenticated browser/admin execution remained separate evidence at that checkpoint.

### Task 18: address PR #937 operational-state and information-exposure review findings, 2026-09-09

PR #937 automated review identified two valid issues on verified head `c595ead24257f31866b412375264d83f2bdb195e`: missing Render suspension evidence could be promoted incorrectly to active, and public `/health` could expose runtime self-test exception details.

The Render bridge now maps explicit suspension evidence through `_reported_suspension_state`; absent/unrecognized provider values remain `not_reported`. The runtime self-test now exposes only bounded `passed` / `failed` status publicly. Regression coverage was added. Prior exact-head `c595ead...` passed VoxVector QA `34317879979` and PR Preview `34317880072`; later correction heads required their own QA.

### Task 17: operational truth wiring and pipeline coverage, 2026-09-09

Tracked in [#914](https://github.com/darenprince/darenprince-author/issues/914). The Developer Console workflow projection was corrected so frontend QA/Pages evidence follows the frontend build revision while backend QA follows the live backend runtime revision. Unknown target revision remains `UNVERIFIED`, mismatch remains `STALE`, and query failure remains `UNAVAILABLE`.

`GET /health` exposes normalized runtime source/time/version/revision fields. The authenticated Render bridge exposes normalized service/deploy state and source revision. The QA workflow uses deterministic frontend installation, runs contract tests, injects the workflow revision/API URL, and builds the React application. Current backend/frontend versions remain separately owned.

Changed implementation owners included `.github/workflows/voxvector-qa.yml`, `VoxVector/api/app.py`, `VoxVector/api/render_api.py`, current console/status/QA/version docs, backend/frontend regression tests, `DeveloperEngineeringStatus`, `PipelineBuildCard`, `githubStatus.js`, and the Crown Labs architecture mirror. This remained software engineering evidence, not deployment/provider/scientific validation.

### Task 16: engineering MVP sprint gate alignment, 2026-09-09

Tracked in [#933](https://github.com/darenprince/darenprince-author/issues/933). Created `VoxVector/docs/MVP_RELEASE_GATE.md` as the single engineering-MVP exit checklist. The gate requires one controlled real-audio fixture to traverse authenticated intake, private persistence/playback, actual faster-whisper and pyannoteAI cloud-primary execution, persisted transcript/speaker/alignment artifacts, eligibility/evidence/synthesis/assessment/report, history/reopen, and authenticated desktop/mobile verification. Sign-off requires two complete successful golden-case executions on the same exact deployed revision; changing source resets repeatability proof.

`MVP_BUILD_PLAN.md`, `QA_STATUS.md`, `CURRENT_ENGINEERING_STATE_2026-09-04.md`, and `PROJECT_DECISION_LOG.md` were aligned to the same release sequence and planning freeze. Repository QA, deployment, runtime health, provider execution, browser verification, engineering-MVP completion and scientific validation remain separate.

### Task 15: API startup progression, release-version alignment, and passive icon treatment, 2026-09-09

Tracked in [#927](https://github.com/darenprince/darenprince-author/issues/927). The Developer Console startup now treats the pre-health period as an indeterminate backend wake state with elapsed time, then progressively reveals checks backed by the returned health/session evidence. This staged reveal is presentation timing only, not simulated backend execution progress.

The startup footer reads frontend version from `voxvector/package.json` and API version from `/health`. Backend release `0.2.27` was synchronized across the source manifest/package/pipeline and protected with `tests/test_version_sync.py`. Passive startup/auth glyphs no longer use decorative button-like square frames. Exact source/build and authenticated browser evidence remained separate.

### Task 14: refresh PR #924 onto merged #919 ground truth and rerun exact-head QA, 2026-09-08

After PR #919 merged, PR #924 was reconciled against the new canonical `main` instead of choosing stale documentation wholesale. The reconciliation preserved cloud-primary pyannote architecture, the explicit diarization route gate, optional local fallback, and Prompt 1 audit history while layering the manual Render deployment-control repair onto current records.

The source repair in `VoxVector/api/render_api.py` accepts successful JSON, text, or empty deploy-hook response bodies without treating body content as deployment completion; `VoxVector/tests/test_render_api.py` covers the response shapes. Render auto-deploy remains disabled. Post-merge evidence remained hook request → deploy observed → commit matched → live → source revision/health → browser.

### Task 13: fix active speech-provider debugging guidance after Codex review, 2026-09-08

Current provider guidance was corrected to the canonical cloud-primary `VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api` contract with `PYANNOTE_KEY`/`PYANNOTE_API_KEY`, the separate `VOXVECTOR_ENABLE_DIARIZATION_RUNS` execution gate, and optional local fallback variables `VOXVECTOR_DIARIZATION_FALLBACK=pyannote_local` plus `VOXVECTOR_DIARIZATION_FALLBACK_ENABLED=true`.

Active QA/capability/version/implementation/roadmap/pipeline/speech/system documentation and the Crown Labs pipeline mirror were corrected. Historical local-primary records were retained as history. No provider configuration, execution or deployment occurred merely from the documentation correction. Published correction head `65eabd64049fea6802e0332941a3a1f764d29344` passed exact-commit VoxVector QA `34288991568` and PR Preview `34288991665`.

### Task 12: Codex review response and architecture correction, 2026-09-08

The active frontend chart owner was verified as application-owned SVG `NativeAreaChart`; no active Recharts import was found despite the manifest dependency. Active design/UI/workflow/migration/version/system/Crown/audit language was corrected so the unused dependency was not represented as active runtime. Provider resolver and route-gate ownership were rechecked as part of the same documentation correction. Static repository checks passed; executable verification came from GitHub Actions on the published correction head.

### Task 11: publish and verify the Prompt 1 review branch, 2026-09-08

Published the 25-file documentation correction set to PR #919. Initial implementation commit `12ec13597e7b7d13554e6b2624b7eceedfcc565b`; report-link head `88a51b6990b45b08cf95928c8c3e80ebf75d91d5`. Exact-head VoxVector QA runs `34259687738` and `34259684138` and PR Preview Build `34259687758` succeeded. Retired Netlify preview status was not treated as canonical Pages evidence.

### Task 10: verify corrections and close Prompt 1 implementation, 2026-09-08

Verified the documentation correction set against source invariants: frontend version 0.2.37, 21 canonical stages with 16 implemented/built foundations, 4 conditional/not invoked and 1 queued stage, relative Markdown targets, git diff whitespace, and all 76 immutable archive hashes. Application tests/browser tests were not claimed for the documentation-only correction; GitHub exact-head QA/preview supplied source evidence after publication.

### Task 9: correct contradicted documentation and create the ground-truth matrix, 2026-09-08

Created `Engineering_Audits/VV-GROUNDTRUTH-2026-09-08.md` with Prompt 1 matrix rows, evidence sources/revisions and observation times. Corrected active documentation for frontend version, QA/publication boundaries, Python baseline, Render transcription dependency, backend authorization, stage counts, cloud-primary/local-fallback diarization, chart/navigation ownership, public/API URLs and Actions-based Bible publication. Dated audit evidence was preserved rather than rewritten as current.

### Task 8: complete the inventoried documentation review, 2026-09-08

Completed the deduplicated documentation corpus review across active VoxVector and Crown Labs Bible records, recovering previously truncated sections and reading API/capability/deployment records needed to close known gaps. The review identified and corrected active inconsistencies while preserving unrelated historical snapshots.

### Task 7: resume after merge and extend document review, 2026-09-08

After PR #916 merged as `66a1616d49e228c6ec57d3cfc4855898675fae2c`, the follow-up review compared current main with the original audited source, continued decision/runbook/research/system documentation review, and recorded remaining candidates without converting old observations into current runtime claims.

### Task 6: PR checks and continued decision review, 2026-09-08

PR #916 head `33e3e8e9317a48e24e386823826c4d1ff3d56226` was reviewed as open/mergeable with exact-head VoxVector QA `34175887756` and PR Preview `34175887840` successful. Separate retired Netlify preview statuses were not treated as canonical Pages failure. Archive hashes and decision records were reverified.

### Task 5: workflow verification and review handoff, 2026-09-08

Tracked in #917. Added the issue/branch/PR/audit workflow entry point to `AI_EDITING_GUARDRAILS.md` and `AUDIT_INSTRUCTIONS.md`, with no React/API/deployment/scientific change. Application tests/build/browser checks were not claimed for the documentation-only policy update.

### Task 4: workflow documentation adoption, 2026-09-08

Updated canonical development flow, charter change control, AI project instructions, engineering plan, system AUTO workflow, production/deployment boundaries, Developer Console sync rules and matching Crown Labs workflow/deployment/system mirrors. `PROJECT_DECISION_LOG.md` records the decision. This established issue scope/owner/dependencies/acceptance criteria, linked PRs, task evidence and verified closure requirements.

### Task 3: GitHub tracking and publication, 2026-09-07

The user explicitly authorized archive publication and task-ticket creation. Created execution tracker #915 plus scoped documentation/publish/speech/closure/truth-model issues. Publication completed through draft PR #916 after shell GitHub authentication was unavailable. No merge/deployment was claimed at the initial publication checkpoint.

### Task 2: archive copy and integrity verification, 2026-09-07

Copied 76 tracked evidence records and preserved the preceding ground-truth report. `SOURCE_INDEX.md` lists source/destination paths and `manifest.json` records hashes. All 76 copies matched originals byte-for-byte at collection time. Historical trailing whitespace was retained where required for byte identity.

### Task 1: archive design and instructions, 2026-09-07

Read applicable root/frontend instructions, inspected existing audit paths/history, and created the audit README, progress report and `AUDIT_INSTRUCTIONS.md`. The archive is an evidence collection, not a replacement implementation.

### Prior evidence

The preceding full evidence report remains preserved at [VV-GROUNDTRUTH-2026-09-07.md](Engineering_Audits/VV-GROUNDTRUTH-2026-09-07.md). Immutable archive copies and Git history remain the authority for the full verbatim detail of earlier checkpoints; the active audit report above maintains their execution chronology without converting historical observations into current claims.

## Next task

After #946 reaches final exact-head QA and merge/deployment verification, continue with the separately scoped secure deletion PR #951 and server-aware Stop Analysis PR #952 on the accepted lifecycle base.
