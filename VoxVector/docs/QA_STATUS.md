# VoxVector QA Status

**State date:** 2026-09-09

This document records repository-level software QA and separately observed deployment/runtime evidence. It is not a scientific validation report.

The canonical engineering-MVP exit checklist is [`MVP_RELEASE_GATE.md`](MVP_RELEASE_GATE.md).

## Current source and deployment verification state

`main` is the canonical source. At the 2026-09-09 upload-reliability checkpoint:

- canonical `main` source: `6c1ff7fbcb101fe271b0506d67a55926adf89055` (`fix(voxvector): align frontend/backend operational truth (#937)`);
- `VoxVector QA` run `34322623044` / run #1820: `success` for exact `main` source `6c1ff7fbcb101fe271b0506d67a55926adf89055`;
- `Deploy GitHub Pages` run `34322623024` / run #1700: `success` for exact `main` source `6c1ff7fbcb101fe271b0506d67a55926adf89055`;
- operational-truth PR #937 is merged; frontend build/Pages revision matching remains separate from backend runtime/Render revision matching;
- the active #930 upload-reliability branch is `fix/voxvector-upload-prehandler-400`; code/test head `c73e48712a76c24c5b20172bd1a7b0a0a2374dc0` passed `VoxVector QA` run `34323715115` / run #1822 before this documentation update;
- that branch adds sanitized derived diagnostics for case-source POST responses with HTTP 400/413/415/422 when no matching `case.source_upload_started` event was observed for the same request ID; route-started 4xx responses are explicitly not labeled pre-handler failures;
- Render service: `voxvector-api` (`srv-da2f88n40ujc73a8m26g`), `autoDeploy=no` / automatic trigger off;
- latest separately preserved Render deployment evidence remains `dep-dagcvau7bikc73aki9b0`, observed `live` for source `fbe317660e7b9238cd46ffff3a8101291bc85580`, trigger `deploy_hook`, finished `2026-09-09T03:22:43.934801Z`.

These are separate evidence boundaries. A successful GitHub Pages workflow establishes publication workflow completion for its source revision; it is not authenticated browser verification. The preserved Render deployment record establishes neither a fresh `/health` readback nor authenticated browser verification. The #930 branch is source/test evidence only until it is reviewed, merged, separately deployed, and exercised against an authenticated upload.

The merged source contract keeps frontend build/Pages revision matching separate from backend runtime/Render revision matching. `/health.runtime` and the Render status `operational` object carry normalized source, observation time, and revision metadata. Missing revision identity remains unverified and mismatched revisions remain stale.

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

Do not project those health fields onto newer source or deployment revisions without a fresh runtime readback.

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

[#930](https://github.com/darenprince/darenprince-author/issues/930) remains an engineering-MVP blocker. Connected Render evidence reconfirmed two intermittent POST `/v1/cases/{case_id}/sources` HTTP 400 responses that reached `request.completed` without the normal `case.source_upload_started` route event: request `891cbceb-cee0-4753-90fe-4874fd411ea5` on source `c2a7c3b1322899559ec27744984641b6e115271a` after about 17.6 seconds, and request `21f2bc40-39d8-40a8-8fdf-2b17055272c8` on source `5041e6a32771258918ced153d18725367e1b6a7a` after about 4.59 seconds. The same service also has many successful persisted uploads, including 17,596,936-byte / 183.3-second recordings, so current evidence supports an intermittent pre-handler boundary rather than a deterministic file-size/storage failure.

The #930 branch now correlates `case.source_upload_started` with `request.completed` by request ID. A case-source POST returning HTTP 400/413/415/422 without a matching route-start event emits the sanitized error event `case.source_upload_prehandler_rejected`, which is projected into the existing error-report path. It records method, route, status, duration, boundary, and the evidence basis; blocked raw-body/audio/transcript fields remain excluded. A route-started 4xx remains a normal route-level rejection and is not mislabeled as pre-handler. This hardening does not identify multipart parsing, client truncation, proxy handling, or another exact cause by itself. The root cause remains unresolved until a failure is reproduced or captured with stronger boundary evidence after deployment.

## Render incident evidence

Historical Render OOM and lifecycle evidence remains preserved in prior incident records and workflow artifacts. Provider readiness must not be interpreted as proof that provider execution fits the observed Render resource envelope. Controlled provider execution/profile evidence is required.

## Scientific boundary

A passing software suite establishes implementation behavior only. Provider readiness or successful model execution does not establish transcript truthfulness, verified speaker identity, deception-detection validity, calibration, or generalization. Engineering MVP is a software/product milestone; scientific validation remains a separate program.
