# VoxVector QA Status

**State date:** 2026-09-10

This document records repository-level software QA and separately observed deployment/runtime evidence. It is not a scientific validation report.

The canonical engineering-MVP exit checklist is [`MVP_RELEASE_GATE.md`](MVP_RELEASE_GATE.md).

## Current source and deployment verification state

Canonical `main` is `c21b4cf07f6475eddb15c99e67f1ff70d6a50167`, the merge of run-lifecycle recovery PR #946.

Exact-main repository evidence for that revision:

- VoxVector QA #1963 / run `34425588762`: **success**. API package installation, the full API test suite, tested source revision recording, frontend dependency installation, frontend contract tests, and the React production build all completed successfully.
- Deploy GitHub Pages #1708 / run `34425588752`: **success**. The build/staging/upload job and the Pages deployment job both completed successfully.
- CodeQL push run #71 / `34425587747`: **success**.

These establish software QA and Pages publication workflow completion for that exact source. They do not establish authenticated browser verification.

Connected Render inspection on 2026-09-10 shows deployment `dep-dah0g13l550s73d2dbb0` **live** for the same source revision `c21b4cf07f6475eddb15c99e67f1ff70d6a50167`, finished at `2026-09-10T01:36:34.195005Z`. Its trigger is `api`. Render production auto-deploy remains disabled. This proves the current source was deployed to Render, but the API trigger does not verify the protected Developer Console **Deploy Now** / deploy-hook path tracked in #920.

No fresh complete `/health` payload readback is recorded by this synchronization. Runtime self-test details, provider readiness, transcription settings, diarization route-gate state, and other health-contract fields must therefore be read fresh before they are attributed to the `c21b4cf...` runtime.

Connected Supabase inspection in this synchronization reports **zero deployed Edge Functions** for project `VoxVector` (`tawtkawmjqabydnatavx`). The merged `voxvector-user-admin` function source therefore must not be described as deployed or successfully executed in production. Earlier connected evidence reported the project itself `ACTIVE_HEALTHY`; this synchronization did not replace that project-health observation with a new one.

## Run lifecycle recovery — issue #945 / PR #946

Issue #945 is complete and closed. PR #946 merged as current `main` `c21b4cf07f6475eddb15c99e67f1ff70d6a50167`.

Final PR head `de343d593f320eea3ef23fd970bae614fcc240b1` passed:

- VoxVector QA #1962 / run `34425431175`: success;
- PR Preview Build #818 / run `34425431147`: success;
- changed-code CodeQL: success, no new alerts;
- all six existing inline review threads: resolved.

Merged behavior includes eligible stale/interrupted run reconciliation from Case History and individual case reads, configured-deadline protection, truthful failed/not-run terminalization, persisted elapsed time, terminal `run_report` / `failure_report` metadata, historical source-revision preservation, legitimate terminal metadata backfill, same-process per-case serialization across reconciliation and mutation, and Copy/Download run-report controls in the existing Analysis Workspace.

The per-case lock is an in-process serialization guarantee for the current single-process/single-instance CaseStore architecture. It is not cross-process compare-and-swap protection for a future horizontally scaled writer model.

The current Render deployment contains this merged lifecycle source. Production Case History reconciliation and terminal report readback have not yet been verified in this synchronization.

## Developer engineering rail — issue #947 / PR #950

Issue #947 is closed. PR #950 remains merged in the ancestry of current `main`. Its single `DeveloperEngineeringStatus` owner is rendered directly after `SiteHeader` as a real sticky flow row with independent hide/expand/collapse controls, non-modal disclosure semantics, and bottom-right Developer Console toasts.

Source and workflow evidence exist. Authenticated desktop/mobile interaction remains a separate browser-verification gate.

## Access control and login — issue #931

The shared role-aware authentication implementation and the canonical login route are merged. PR #940 created the physical GitHub Pages entry for `/voxvector/login/` while continuing to use the same React `AuthGate.jsx`; PR #943 hardened login visibility so the entrance animation cannot leave the form opacity-zero if motion progress stalls.

Trusted authorization reads Supabase `app_metadata`; user-editable metadata is not accepted for role authority. Current source routes trusted `admin` / `developer` sessions to the Developer Console, trusted `user` sessions to the protected user workspace, and unknown/missing roles to denial.

The current Render source also contains the backend operator-role implementation. However, production account administration is **not** complete: the connected Supabase project currently lists no deployed Edge Functions, so `voxvector-user-admin` is source-only at this checkpoint. An explicitly trusted admin assignment, authenticated administrator execution, and desktop/mobile role-routing verification remain required before #931 can close.

## Current implementation coverage

| Area | Current state | Software evidence | Scientific claim |
|---|---|---|---|
| 21-stage pipeline contract | represented | canonical pipeline tests/contracts | none |
| Implemented / built runtime foundations | 16 | repository coverage and runtime evidence | none |
| Conditional / not invoked | 4 | explicit state contracts | none |
| Intake/upload | implemented diagnostics live; intermittent production 400 still under #930 | API/client tests + deployed diagnostic source | none |
| Authentication/session lifecycle | merged shared role-aware implementation | auth/frontend tests + builds | none |
| Developer/admin backend authorization | merged and present in current Render source | backend auth tests + exact-source QA | none |
| Approved-user workspace | minimum protected React destination implemented | frontend role contracts + build | none |
| Admin user management | source implemented; Edge Function not deployed | source + QA build | none |
| Case persistence/history | lifecycle recovery merged and deployed source; production readback pending | case-store/lifecycle/concurrency tests | none |
| faster-whisper | repaired integration source live; controlled execution still required | adapter/process tests + deployment evidence | none until provider execution/task evaluation |
| pyannoteAI cloud (`pyannote_api`) | configured architecture; controlled execution still required | adapter/provider contracts | none until provider execution/task evaluation |
| local pyannote Community-1 | optional fallback; production enablement/memory safety unverified | fallback contract tests | none |
| Transcript/speaker alignment | foundation implemented | alignment tests | none until provider-backed execution |
| Results envelope | implemented | API/case result tests | none |
| Stage/execution telemetry | implemented foundation | lifecycle tests | none |
| Developer Console | active implementation | component/build/QA evidence | none |
| Classification/disposition | guarded boundary | tests + explicit gate | no validated inference |

## Active P0 reliability and runtime gates

### #930 — intermittent case-source upload 400

The merged pre-handler diagnostic hardening is now present in the current live Render source. #930 is therefore no longer blocked merely on backend deployment. It is ready for authenticated production reproduction/verification.

The exact cause remains unproven. Required evidence is fresh request-correlated upload behavior on the current runtime, including whether `case.source_upload_prehandler_rejected` is emitted for a reproduced 400, or a successful bounded upload/playback verification if the failure does not reproduce. A fresh `/health` readback should be captured before attributing detailed runtime settings to the current deployment.

### #941 — transcription OOM/dependency-order runtime verification

The source repair merged through PR #942 and is included in current `main` and the current live Render deployment. The repaired implementation uses dependency-ordered evidence acquisition and a disposable bounded faster-whisper child process.

Still required before #941 closes: controlled real-audio transcription, bounded completion/failure without API OOM restart, Render memory/instance correlation, persisted transcript/run artifact readback, supported incident-media cleanup, and authenticated browser stage verification.

### #920 — protected Developer Console deploy path

Current `main` is live on Render, but deployment `dep-dah0g13l550s73d2dbb0` reports trigger `api`. That does not satisfy #920, whose acceptance criterion is the authenticated Developer Console `Deploy Now` path and its server-side deploy hook. #920 remains blocked on that specific authenticated action and subsequent deploy/source/runtime verification.

### #948 / PR #951 — auditable secure deletion

Draft PR #951 is open on current `main`. It is not merge-ready. Review findings remain around deletion/mutation concurrency, durable terminal receipt recovery, and explicit receipt opt-in at the authenticated DELETE route. Application-level storage deletion must not be represented as cryptographic provider-level physical sanitization.

### #949 / PR #952 — server-aware Stop Analysis

Draft PR #952 is open on current `main`. Its current checkpoint only adds the canonical frontend `stopAnalysisRun(...)` API action. Server cancellation lifecycle, persistence, safe-boundary orchestration, existing Analysis Workspace states, tests, and documentation remain to be implemented. Browser transport abort is not server cancellation.

## P1/P2 queue state

- #932 is now **Ready** for landing CTA/anchor/menu/mobile-drawer work because the canonical `/voxvector/login/` destination exists. #931's remaining admin/runtime verification does not require recreating a login path.
- #928 remains dependent on #930 being sufficiently resolved/bounded before upload cancellation/progress/waveform UX work is finalized.
- #927 remains an authenticated desktop/mobile browser-verification task for already-merged startup/version/icon presentation.
- #935 remains a documentation-maintenance item until the required post-merge audit record for PR #936 is present in `voxvector/audits/AUDIT_REPORT.md` and merged.

## Latest detailed health evidence boundary

The latest separately recorded detailed `/health` payload predates current `main`. Do not project its provider/readiness fields onto `c21b4cf...` merely because Render shows the new deployment `live`.

The current evidence chain is intentionally separated:

`source c21b4cf... → exact-main QA success → Pages publication success → Render deploy dep-dah0... live on c21b4cf...`

Still separate:

`fresh /health payload → authenticated case execution → persisted provider artifacts → authenticated browser verification → two-run engineering-MVP proof → scientific validation`

## Current engineering gates

The authoritative release checklist is `MVP_RELEASE_GATE.md`. Current execution order is:

1. capture a fresh `/health` payload for the current Render source and preserve exact source/runtime settings;
2. reproduce or sufficiently bound #930 with authenticated upload/private persistence/provenance/playback;
3. execute controlled faster-whisper under #941 and persist/read back timestamped transcript artifacts with Render memory/instance evidence;
4. execute controlled pyannoteAI cloud-primary diarization with the explicit invocation gate enabled and persist/read back speaker provenance;
5. verify transcript/speaker/alignment artifacts under the same case/run identity;
6. finish #948 and #949 as separate source subsystems with exact-head QA before merge;
7. deploy and verify the #931 Supabase administrator function only after its trusted admin boundary is intentionally established;
8. complete #932 and, after intake reliability, #928;
9. complete authenticated desktop/mobile, keyboard, reduced-motion, failure/cancellation, report/history/reopen, and revision-identity browser verification;
10. repeat the complete golden-case path a second time on the same exact deployed revision;
11. keep engineering-MVP sign-off and scientific validation separate.

## Scientific boundary

A passing software suite establishes implementation behavior only. Authentication/authorization tests establish software access-control contracts, not scientific capability. Provider readiness or successful model execution does not establish transcript truthfulness, verified speaker identity, deception-detection validity, calibration, or generalization. Engineering MVP is a software/product milestone; scientific validation remains a separate program.
