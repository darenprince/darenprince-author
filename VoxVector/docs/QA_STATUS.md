# VoxVector QA Status

**State date:** 2026-09-09

This document records repository-level software QA and separately observed deployment/runtime evidence. It is not a scientific validation report.

The canonical engineering-MVP exit checklist is [`MVP_RELEASE_GATE.md`](MVP_RELEASE_GATE.md).

## Current source and deployment verification state

`main` is the canonical source. At the 2026-09-09 MVP gate-alignment checkpoint:

- repository source: `fbe317660e7b9238cd46ffff3a8101291bc85580`;
- `VoxVector QA` run `34305133803` / run #1800: `success` for that exact source revision;
- `Deploy GitHub Pages` run `34305133777` / run #1697: `success` for that exact source revision;
- Render service: `voxvector-api` (`srv-da2f88n40ujc73a8m26g`), `autoDeploy=no` / automatic trigger off;
- Render deployment `dep-dagcvau7bikc73aki9b0`: observed `live`, source `fbe317660e7b9238cd46ffff3a8101291bc85580`, trigger `deploy_hook`, finished `2026-09-09T03:22:43.934801Z`.

These are separate evidence boundaries. The Render deployment record establishes neither a fresh `/health` readback nor authenticated browser verification. No fresh `/health` response for `dep-dagcvau7bikc73aki9b0` was observed during this documentation-alignment task, so runtime self-test, provider readiness, and media/storage readiness are not advanced from the last separately observed runtime evidence below.

The source contract now keeps frontend build/Pages revision matching separate from backend runtime/Render revision matching. `/health.runtime` and the Render status `operational` object carry normalized source, observation time, and revision metadata. This source change is not represented as deployed or browser verified until the post-merge runtime and frontend evidence is observed.

## Current implementation coverage

| Area | Current state | Software evidence | Scientific claim |
|---|---|---|---|
| 21-stage pipeline contract | represented | canonical pipeline tests/contracts | none |
| Implemented / built runtime foundations | 16 | repository coverage and runtime evidence | none |
| Conditional / not invoked | 4 | explicit state contracts | none |
| Queued deeper integration | diarization controlled execution; transcription/alignment built paths pending controlled verification | canonical maturity record | none |
| Intake/upload | implemented foundation; intermittent production 400 remains open in #930 | API/client tests plus production diagnostic evidence | none |
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

Do not project those health fields onto the newer `fbe317...` deployment without a fresh runtime readback.

`/health` readiness and route invocation are separate checks. The authenticated case-analysis path invokes diarization only when `VOXVECTOR_ENABLE_DIARIZATION_RUNS` is enabled and the runtime reports diarization execution readiness. A ready cloud provider is therefore not proof that a particular case run invoked diarization.

## Current engineering gates

The authoritative release checklist is `MVP_RELEASE_GATE.md`. The immediate QA/execution sequence is:

1. Preserve exact-revision linkage between source, GitHub QA, Pages publication, backend deployment, runtime `/health`, and browser evidence; do not combine results from different revisions.
2. Resolve or reproducibly bound the intermittent case-source upload 400 in #930, then verify authenticated upload, private persistence, provenance, and playback for the golden fixture.
3. Execute a controlled golden WAV with faster-whisper and verify timestamped transcript segments/words are persisted and read back (`#915 → VV-TRANSCRIBE`).
4. Execute the same fixture through the configured pyannoteAI cloud primary (`VOXVECTOR_DIARIZATION_PROVIDER=pyannote_api`) with `VOXVECTOR_ENABLE_DIARIZATION_RUNS=true`; verify speaker turns, provider provenance, and persisted diarization artifacts (`#915 → VV-DIARIZE`).
5. Test local Community-1 only as a separate fallback exercise when fallback behavior itself is in scope; do not substitute fallback testing for primary cloud verification.
6. Persist and read back transcript, diarization, and alignment artifacts under the same case/run identity (`#915 → VV-ALIGN`).
7. Capture provider timing/resource telemetry needed to distinguish successful execution, failure, timeout, and constrained-runtime behavior.
8. Verify Analysis Results / Review Evidence / assessment / report / history/reopen in the deployed application.
9. Complete authenticated desktop/mobile, keyboard, reduced-motion, failure-path, and revision-identity browser verification.
10. Repeat the complete golden-case path a second time on the same exact deployed revision. Any source change resets that two-run release proof.
11. Keep software QA, provider execution, engineering-MVP sign-off, and scientific validation as separate states.

## Active reliability evidence

[#930](https://github.com/darenprince/darenprince-author/issues/930) remains an engineering-MVP blocker. The latest investigated production upload 400 reached the API middleware boundary but did not emit the normal `case.source_upload_started` route event, and no media object was created for the failed request. Historical evidence contains a similar pre-handler 400 pattern. The exact pre-handler cause remains unresolved; it must not be reported as a fixed parser, invalid-WAV, storage, or memory defect until reproduced and evidenced.

## Render incident evidence

Historical Render OOM and lifecycle evidence remains preserved in prior incident records and workflow artifacts. Provider readiness must not be interpreted as proof that provider execution fits the observed Render resource envelope. Controlled provider execution/profile evidence is required.

## Scientific boundary

A passing software suite establishes implementation behavior only. Provider readiness or successful model execution does not establish transcript truthfulness, verified speaker identity, deception-detection validity, calibration, or generalization. Engineering MVP is a software/product milestone; scientific validation remains a separate program.
