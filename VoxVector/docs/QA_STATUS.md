# VoxVector QA Status

**State date:** 2026-09-09

This document records repository-level software QA and separately observed deployment/runtime evidence. It is not a scientific validation report.

The canonical engineering-MVP exit checklist is [`MVP_RELEASE_GATE.md`](MVP_RELEASE_GATE.md).

## Current source and deployment verification state

`main` is the canonical source. At the 2026-09-09 role-gating checkpoint:

- canonical `main` source: `9539fa89ede3295e588feed781971919c542427e` (`fix(voxvector): preserve pre-handler upload 4xx evidence (#938)`);
- exact-main `VoxVector QA` run `34324101337` / run #1825: `success` for `9539fa89ede3295e588feed781971919c542427e`;
- exact-main `Deploy GitHub Pages` run `34324101349` / run #1701: `success` for `9539fa89ede3295e588feed781971919c542427e`;
- active access-control implementation is issue #931 on branch `feat/voxvector-role-gating`, based on that exact `main` revision;
- source checkpoint `e97655d59e283d7b3c9cda1065854df469214cb1` passed `VoxVector QA` run `34329618939` / run #1838, including the complete API test suite, frontend contract tests and React production build;
- documentation synchronization has advanced the branch beyond that source checkpoint, so fresh exact-head QA and PR Preview Build evidence are required before merge recommendation;
- connected Supabase inspection found the existing Auth population carrying one trusted `developer` role and no current trusted `admin` or `user` assignment; no production account role was silently changed by #931;
- source now defines a server-only Supabase Edge Function, `voxvector-user-admin`, for authenticated administrator account operations, but that function has not yet been deployed or exercised from the branch;
- Render service remains `voxvector-api` (`srv-da2f88n40ujc73a8m26g`) with automatic deploy disabled;
- latest separately preserved Render deployment evidence remains `dep-dagcvau7bikc73aki9b0`, observed `live` for source `fbe317660e7b9238cd46ffff3a8101291bc85580`, trigger `deploy_hook`, finished `2026-09-09T03:22:43.934801Z`.

These are separate evidence boundaries. A successful GitHub Pages workflow establishes publication workflow completion for its source revision; it is not authenticated browser verification. A passing source branch establishes tested implementation behavior; it does not deploy the Supabase Edge Function, assign a live admin role, deploy the Render backend authorization change, or verify browser behavior.

The merged operational-truth contract keeps frontend build/Pages revision matching separate from backend runtime/Render revision matching. `/health.runtime` and the Render status `operational` object carry normalized source, observation time and revision metadata. Missing revision identity remains unverified and mismatched revisions remain stale.

## Current implementation coverage

| Area | Current state | Software evidence | Scientific claim |
|---|---|---|---|
| 21-stage pipeline contract | represented | canonical pipeline tests/contracts | none |
| Implemented / built runtime foundations | 16 | repository coverage and runtime evidence | none |
| Conditional / not invoked | 4 | explicit state contracts | none |
| Queued deeper integration | diarization controlled execution; transcription/alignment built paths pending controlled verification | canonical maturity record | none |
| Intake/upload | implemented foundation; intermittent production 400 remains open in #930 | API/client tests plus production diagnostic evidence | none |
| Authentication/session lifecycle | shared role-aware source implementation in #931 | Supabase client contracts, React build, exact-source QA | none |
| Developer/admin authorization | source implementation in #931; production Render deployment pending | backend auth tests plus exact-source QA | none |
| Approved-user workspace | minimum protected React destination implemented in #931 | frontend role contracts and React build | none |
| Admin user management | source implementation in #931; Edge Function deployment/admin execution pending | frontend/server source plus QA build | none |
| Acoustic / temporal / voice quality | implemented foundations | deterministic/unit/pipeline tests | observational only |
| Reliability / eligibility | implemented | pipeline tests and runtime execution | eligibility control |
| Evidence acquisition | implemented foundation | acquisition tests/contracts | none |
| faster-whisper | configured / execution-ready at last health checkpoint; controlled case execution still required | adapter and provider tests plus dated runtime health evidence | none until provider run + task evaluation |
| pyannoteAI cloud (`pyannote_api`) | configured / primary execution-ready at last health checkpoint; controlled case execution still required | adapter/provider selection tests plus dated runtime health evidence | none until provider run + task evaluation |
| local pyannote Community-1 (`pyannote_local`) | optional fallback; disabled / not execution-ready at latest health checkpoint | local adapter and fallback contract tests | none until explicitly enabled and exercised |
| Transcript/speaker alignment | foundation implemented | alignment regression tests | none until provider-backed execution |
| Results envelope | implemented | API/case result tests | none |
| Stage/execution telemetry | implemented foundation | lifecycle tests | none |
| Case persistence/history | implemented foundation | storage/API tests | none |
| Render API bridge | implemented, environment-gated | bridge code and route tests | none |
| Developer Console | active implementation | component build/QA | none |
| Classification/disposition | guarded boundary | tests and explicit gate | no validated inference |

## #931 access-control source evidence

The current #931 branch consolidates browser authentication into one `AuthGate.jsx`, reads role authority from trusted Supabase `app_metadata`, and routes `admin` / `developer` to `/voxvector/developer`, `user` to `/voxvector/app`, and unknown/missing roles to a denied login state. Direct protected-route entry applies the same role checks; redirects are not treated as access control.

Backend operator authorization retains the existing `require_developer` dependency name for route stability while accepting trusted `developer` and `admin` roles. Automated coverage verifies that a trusted `user` role is denied and user-editable metadata cannot spoof operator access.

The administrator UI appears only for a trusted `admin` session. Its privileged operations are delegated to the `voxvector-user-admin` Supabase Edge Function source. The function revalidates the JWT and trusted admin role before using the server-only Supabase service-role credential. Source operations cover user listing, account creation/invitation, trusted role/permission updates, profile/account edits, password administration/recovery, deletion and sanitized audit recording. Self-deletion and removal of the caller's own admin role are blocked.

Current evidence does **not** establish that the Edge Function is deployed, that a live account has been promoted to admin, or that admin operations have executed successfully. Granular `voxvector_permissions` are trusted metadata for the administration model; broad backend permission-by-permission enforcement is not claimed where routes currently enforce role only.

## Latest observed `/health` evidence — prior runtime checkpoint

The latest separately recorded health checkpoint remains the 2026-09-07 observation for deployed source `73ac03ded08c161e092ee2a4ecbbed7d036771c8`:

- pipeline `0.2.26`;
- runtime self-test `passed`;
- diagnostic/media storage `configured_media_ready`;
- media storage `true`;
- transcription provider `faster_whisper`; adapter installed; execution-ready;
- diarization primary provider `pyannote_api`; API key detected; primary execution-ready;
- local fallback `pyannote_local`; disabled and not execution-ready;
- runtime-reported current commit QA `external_workflow_required`; external GitHub QA must be matched by revision.

Do not project those health fields onto newer source or deployment revisions without a fresh runtime readback.

`/health` readiness and route invocation are separate checks. The authenticated case-analysis path invokes diarization only when `VOXVECTOR_ENABLE_DIARIZATION_RUNS` is enabled and the runtime reports diarization execution readiness. A ready cloud provider is therefore not proof that a particular case run invoked diarization.

## Current engineering gates

The authoritative release checklist is `MVP_RELEASE_GATE.md`. The immediate QA/execution sequence is:

1. Finish #931 source synchronization, exact-head QA, PR Preview Build and review; keep function deployment, Render deployment and authenticated browser verification separate.
2. Exercise #920 through the canonical authenticated Developer Console `Deploy Now` control; verify the intended backend revision reaches Render `live`, then read back `/health.runtime.source_revision`.
3. Reproduce or sufficiently capture #930 on the deployed diagnostic revision, then verify authenticated upload, private persistence, provenance and playback for the golden fixture.
4. Deploy `voxvector-user-admin` from an approved merged revision and verify authenticated administrator behavior only after an explicit trusted admin assignment exists.
5. Execute a controlled golden WAV with faster-whisper and verify timestamped transcript segments/words are persisted and read back (`#915 → VV-TRANSCRIBE`).
6. Execute the same fixture through the configured pyannoteAI cloud primary with `VOXVECTOR_ENABLE_DIARIZATION_RUNS=true`; verify speaker turns, provider provenance and persisted diarization artifacts (`#915 → VV-DIARIZE`).
7. Persist and read back transcript, diarization and alignment artifacts under the same case/run identity (`#915 → VV-ALIGN`).
8. Verify Analysis Results / Review Evidence / assessment / report / history/reopen in the deployed application.
9. Complete authenticated desktop/mobile, keyboard, reduced-motion, failure-path and revision-identity browser verification.
10. Repeat the complete golden-case path a second time on the same exact deployed revision. Any source change resets that two-run release proof.
11. Keep software QA, provider execution, engineering-MVP sign-off and scientific validation as separate states.

## Active reliability evidence

[#930](https://github.com/darenprince/darenprince-author/issues/930) remains an engineering-MVP blocker. Connected Render evidence reconfirmed two intermittent POST `/v1/cases/{case_id}/sources` HTTP 400 responses that reached `request.completed` without the normal `case.source_upload_started` route event: request `891cbceb-cee0-4753-90fe-4874fd411ea5` on source `c2a7c3b1322899559ec27744984641b6e115271a` after about 17.6 seconds, and request `21f2bc40-39d8-40a8-8fdf-2b17055272c8` on source `5041e6a32771258918ced153d18725367e1b6a7a` after about 4.59 seconds. The same service also has many successful persisted uploads, including 17,596,936-byte / 183.3-second recordings, so current evidence supports an intermittent pre-handler boundary rather than a deterministic file-size/storage failure.

Merged source now correlates `case.source_upload_started` with `request.completed` by request ID. A case-source POST returning HTTP 400/413/415/422 without a matching route-start event emits the sanitized error event `case.source_upload_prehandler_rejected`, which is projected into the existing error-report path. This hardening does not identify multipart parsing, client truncation, proxy handling, or another exact cause by itself. Because Render remains on older source `fbe317...`, the merged diagnostic hardening is not yet observed in production.

## Render incident evidence

Historical Render OOM and lifecycle evidence remains preserved in prior incident records and workflow artifacts. Provider readiness must not be interpreted as proof that provider execution fits the observed Render resource envelope. Controlled provider execution/profile evidence is required.

## Scientific boundary

A passing software suite establishes implementation behavior only. Authentication/authorization tests establish software access-control contracts, not scientific capability. Provider readiness or successful model execution does not establish transcript truthfulness, verified speaker identity, deception-detection validity, calibration, or generalization. Engineering MVP is a software/product milestone; scientific validation remains a separate program.
