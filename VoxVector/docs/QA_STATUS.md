# VoxVector QA Status

**State date:** 2026-09-09

This document records repository-level software QA and separately observed deployment/runtime evidence. It is not a scientific validation report.

The canonical engineering-MVP exit checklist is [`MVP_RELEASE_GATE.md`](MVP_RELEASE_GATE.md).

## Current source and deployment verification state

Canonical `main` at this lifecycle-documentation checkpoint is `010676db66e92d715290ee5fe0d1bc3b52c4b208`, the merge of Developer engineering-rail PR #950. Exact-main VoxVector QA #1950 completed successfully and Deploy GitHub Pages #1707 completed successfully for that revision. Those workflow results establish repository software QA and publication workflow completion for that exact source; they are not authenticated browser verification.

Render remains intentionally separate because automatic deployment is disabled. Connected Render inspection on 2026-09-09 shows the single `voxvector-api` service (`srv-da2f88n40ujc73a8m26g`) live on deployment `dep-dagjc3740ujc73ff3ge0`, source `09381797d4486bc049cb99a527c624690274b7c7`. No later backend deployment is inferred from frontend/docs merges.

Connected Supabase inspection on 2026-09-09 reports project `VoxVector` (`tawtkawmjqabydnatavx`) as `ACTIVE_HEALTHY`. The current security advisor still reports two known warnings: authenticated execution of the guarded `public.developer_dashboard_summary()` SECURITY DEFINER RPC and disabled leaked-password protection. No Supabase schema, policy, role, or secret was changed by the current lifecycle work.

## PR #946 run lifecycle recovery checkpoint

Issue #945 / PR #946 extends the existing case/run persistence owner so interrupted analysis runs can be terminalized truthfully and exported without inventing successful work.

Current source checkpoint `18777886bf28c6cac8fb13fc00d5b5653b15b20b` includes:

- stale/interrupted run reconciliation from Case History and individual case reads;
- configured-deadline protection so a legitimate current-worker run is not failed before its usable deadline;
- failed active-stage plus explicit `not_run` terminalization for unfinished dependent work;
- persisted active/final elapsed time and terminal `run_report` / `failure_report` metadata;
- preservation of historical source revision rather than assigning the revision of a later reader runtime;
- persistence of legitimate terminal metadata backfill;
- per-case in-process serialization across history reconciliation, run updates, source mutation and deletion so the current single-process Render runtime cannot persist a stale history snapshot over a newer same-process run update;
- a focused concurrency regression proving a concurrent history reconciliation cannot erase a newer completed run artifact;
- preserved pyannoteAI-primary / explicit local-fallback provenance; and
- Copy/Download run-report controls in the existing Analysis Workspace.

Exact-head software evidence for `18777886bf28c6cac8fb13fc00d5b5653b15b20b`:

- VoxVector QA #1954: `success`;
- VoxVector PR Preview Build #815: `success`.

The per-case lock is an in-process serialization guarantee for the current single-process/single-instance CaseStore architecture. It is not represented as cross-process compare-and-swap protection for a future horizontally scaled object-store writer model.

This documentation synchronization advances the PR head beyond `18777886...`, so fresh exact-head QA and PR Preview are required before merge. Merge, Render deployment of the lifecycle change, production report readback, controlled provider execution, and authenticated browser verification remain separate and unperformed at this checkpoint.

## PR #950 Developer engineering rail merged checkpoint

Issue #947 / PR #950 repaired the existing Developer Console engineering-status shell without creating a second status implementation. The final PR head `c5aa7f7a6277caf3055afb5dbc565b8438e18b84` passed VoxVector QA #1949 and PR Preview Build #813, then merged to `main` as `010676db66e92d715290ee5fe0d1bc3b52c4b208`. Exact-main VoxVector QA #1950 and Deploy GitHub Pages #1707 subsequently succeeded.

The source renders the existing `DeveloperEngineeringStatus` immediately after the canonical Developer navigation, uses a real 34px sticky flow row beneath the 56px nav, preserves independent hide/expand/collapse controls, uses non-modal disclosure semantics, and positions Developer Console toasts at the bottom-right. Authenticated desktop/mobile browser interaction remains a separate verification gate.

## Current implementation coverage

| Area | Current state | Software evidence | Scientific claim |
|---|---|---|---|
| 21-stage pipeline contract | represented | canonical pipeline tests/contracts | none |
| Implemented / built runtime foundations | 16 | repository coverage and runtime evidence | none |
| Conditional / not invoked | 4 | explicit state contracts | none |
| Queued deeper integration | diarization controlled execution; transcription/alignment built paths pending controlled verification | canonical maturity record | none |
| Intake/upload | implemented foundation; intermittent production 400 remains open in #930 | API/client tests plus production diagnostic evidence | none |
| Authentication/session lifecycle | merged shared role-aware implementation | Supabase client contracts, React build and exact-source QA | none |
| Developer/admin authorization | merged source implementation; runtime deployment evidence remains separate | backend auth tests plus exact-source QA | none |
| Approved-user workspace | minimum protected React destination implemented | frontend role contracts and React build | none |
| Admin user management | source implementation exists; live Edge Function/admin execution evidence remains separate | frontend/server source plus QA build | none |
| Acoustic / temporal / voice quality | implemented foundations | deterministic/unit/pipeline tests | observational only |
| Reliability / eligibility | implemented | pipeline tests and runtime execution | eligibility control |
| Evidence acquisition | implemented foundation | acquisition tests/contracts | none |
| faster-whisper | configured / execution-ready at last health checkpoint; controlled repaired-case execution still required | adapter and provider tests plus dated runtime health evidence | none until provider run + task evaluation |
| pyannoteAI cloud (`pyannote_api`) | configured / primary execution-ready at last health checkpoint; controlled case execution still required | adapter/provider selection tests plus dated runtime health evidence | none until provider run + task evaluation |
| local pyannote Community-1 (`pyannote_local`) | optional fallback; disabled / not execution-ready at latest health checkpoint | local adapter and fallback contract tests | none until explicitly enabled and exercised |
| Transcript/speaker alignment | foundation implemented | alignment regression tests | none until provider-backed execution |
| Results envelope | implemented | API/case result tests | none |
| Stage/execution telemetry | implemented foundation | lifecycle tests | none |
| Case persistence/history | implemented foundation; #946 lifecycle hardening in review | case-store, lifecycle and concurrency tests | none |
| Render API bridge | implemented, environment-gated | bridge code and route tests | none |
| Developer Console | active implementation | component build/QA | none |
| Classification/disposition | guarded boundary | tests and explicit gate | no validated inference |

## Access-control source evidence

The merged access-control implementation consolidates browser authentication into one `AuthGate.jsx`, reads role authority from trusted Supabase `app_metadata`, and routes `admin` / `developer` to `/voxvector/developer`, `user` to `/voxvector/app`, and unknown/missing roles to a denied login state. Direct protected-route entry applies the same role checks; redirects are not treated as access control.

Backend operator authorization retains the existing `require_developer` dependency name for route stability while accepting trusted `developer` and `admin` roles. Automated coverage verifies that a trusted `user` role is denied and user-editable metadata cannot spoof operator access.

The administrator UI appears only for a trusted `admin` session. Its privileged operations are delegated to the `voxvector-user-admin` Supabase Edge Function source. The function revalidates the JWT and trusted admin role before using the server-only Supabase service-role credential. Source operations cover user listing, account creation/invitation, trusted role/permission updates, profile/account edits, password administration/recovery, deletion and sanitized audit recording. Self-deletion and removal of the caller's own admin role are blocked.

Current evidence does **not** establish authenticated live administrator execution from the browser. Granular `voxvector_permissions` are trusted metadata for the administration model; broad backend permission-by-permission enforcement is not claimed where routes currently enforce role only.

## Latest observed `/health` evidence — prior runtime checkpoint

The latest separately recorded detailed `/health` payload checkpoint remains the 2026-09-07 observation for deployed source `73ac03ded08c161e092ee2a4ecbbed7d036771c8`:

- pipeline `0.2.26`;
- runtime self-test `passed`;
- diagnostic/media storage `configured_media_ready`;
- media storage `true`;
- transcription provider `faster_whisper`; adapter installed; execution-ready;
- diarization primary provider `pyannote_api`; API key detected; primary execution-ready;
- local fallback `pyannote_local`; disabled and not execution-ready;
- runtime-reported current commit QA `external_workflow_required`; external GitHub QA must be matched by revision.

A later Render deployment record proves `09381797d4486bc049cb99a527c624690274b7c7` reached `live` and returned health-check HTTP 200 responses, but no newer complete `/health` payload readback is projected here. Do not project older detailed provider fields onto newer source without a fresh runtime readback.

`/health` readiness and route invocation are separate checks. The authenticated case-analysis path invokes diarization only when `VOXVECTOR_ENABLE_DIARIZATION_RUNS` is enabled and the runtime reports diarization execution readiness. A ready cloud provider is therefore not proof that a particular case run invoked diarization.

## Current engineering gates

The authoritative release checklist is `MVP_RELEASE_GATE.md`. The immediate QA/execution sequence is:

1. Complete PR #946 lifecycle documentation synchronization, fresh exact-head QA/preview, review-thread closure and merge if clean.
2. Deliberately deploy the merged #946 backend revision to Render because automatic deployment is disabled; verify intended source revision, `live` state and `/health` before runtime claims.
3. Reproduce or sufficiently capture #930 on the deployed diagnostic revision, then verify authenticated upload, private persistence, provenance and playback for the golden fixture.
4. Verify the current administrator path only with an explicitly trusted admin account and live authenticated execution; keep browser verification distinct from source presence.
5. Execute a controlled golden WAV with faster-whisper and verify timestamped transcript segments/words are persisted and read back (`#915 → VV-TRANSCRIBE`).
6. Execute the same fixture through the configured pyannoteAI cloud primary with `VOXVECTOR_ENABLE_DIARIZATION_RUNS=true`; verify speaker turns, provider provenance and persisted diarization artifacts (`#915 → VV-DIARIZE`).
7. Persist and read back transcript, diarization and alignment artifacts under the same case/run identity (`#915 → VV-ALIGN`).
8. Verify Analysis Results / Review Evidence / assessment / report / history/reopen in the deployed application.
9. Complete authenticated desktop/mobile, keyboard, reduced-motion, failure-path and revision-identity browser verification.
10. Repeat the complete golden-case path a second time on the same exact deployed revision. Any source change resets that two-run release proof.
11. Keep software QA, provider execution, engineering-MVP sign-off and scientific validation as separate states.

## Active reliability evidence

[#930](https://github.com/darenprince/darenprince-author/issues/930) remains an engineering-MVP blocker. Connected Render evidence reconfirmed two intermittent POST `/v1/cases/{case_id}/sources` HTTP 400 responses that reached `request.completed` without the normal `case.source_upload_started` route event: request `891cbceb-cee0-4753-90fe-4874fd411ea5` on source `c2a7c3b1322899559ec27744984641b6e115271a` after about 17.6 seconds, and request `21f2bc40-39d8-40a8-8fdf-2b17055272c8` on source `5041e6a32771258918ced153d18725367e1b6a7a` after about 4.59 seconds. The same service also has many successful persisted uploads, including 17,596,936-byte / 183.3-second recordings, so current evidence supports an intermittent pre-handler boundary rather than a deterministic file-size/storage failure.

Merged source correlates `case.source_upload_started` with `request.completed` by request ID. A case-source POST returning HTTP 400/413/415/422 without a matching route-start event emits the sanitized error event `case.source_upload_prehandler_rejected`, which is projected into the existing error-report path. This hardening does not identify multipart parsing, client truncation, proxy handling, or another exact cause by itself.

## Render incident evidence

Historical Render OOM and lifecycle evidence remains preserved in prior incident records and workflow artifacts. Provider readiness must not be interpreted as proof that provider execution fits the observed Render resource envelope. Controlled provider execution/profile evidence is required.

## Scientific boundary

A passing software suite establishes implementation behavior only. Authentication/authorization tests establish software access-control contracts, not scientific capability. Provider readiness or successful model execution does not establish transcript truthfulness, verified speaker identity, deception-detection validity, calibration, or generalization. Engineering MVP is a software/product milestone; scientific validation remains a separate program.
