# VoxVector Engineering MVP Release Gate

**Status:** Canonical engineering MVP exit gate  
**Effective:** 2026-09-10  
**Prompt:** `VV-MVP-SPRINT-GATE-ALIGNMENT`  
**Tracker:** [#915](https://github.com/darenprince/darenprince-author/issues/915)  
**Alignment task:** [#933](https://github.com/darenprince/darenprince-author/issues/933)

## Purpose

This document is the single canonical checklist for deciding whether VoxVector has reached **engineering MVP**.

It complements `MVP_BUILD_PLAN.md`, `CAPABILITY_STATUS.md`, `QA_STATUS.md`, `DEVELOPMENT_WORKFLOW.md`, and the active GitHub issue queue. It does not replace the Operating Charter, Project Decision Log, runtime implementation, or scientific validation records.

Engineering MVP is a connected, reproducible product milestone. It is not defined by screen count, provider configuration, a successful build, a successful deployment, or a scientific-validation claim.

## Engineering MVP definition

VoxVector reaches engineering MVP only when a real authenticated case can traverse the canonical connected path:

`create case → upload recording → provenance → decode/playback → speech segmentation → speaker processing → transcription → durable provider checkpoint → alignment → eligibility/reliability → memory-safe downstream analysis → analytical observations → evidence assembly → convergence/conflict → candidate assessment → report → persistence → close/reopen`

The required evidence must come from the same exact deployed source revision and must be reproducible.

## Current release candidate boundary — 2026-09-10

Canonical GitHub `main` is `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2`. Connected Render deployment `dep-dah7usjl550s73e00350` is live on that exact source with auto-deploy disabled.

One controlled 183.3-second WAV completed faster-whisper beam-1 transcription with 58 transcript segments and 246 timestamped words. The API then encountered confirmed post-transcription memory exhaustion during the downstream transition. Active #941 / draft PR #962 repairs cleanup, same-run upstream checkpointing, Stage 10 memory admission, stable run identity, and process-vs-Render-instance provenance.

That controlled transcription is provider-execution evidence, not a completed engineering-MVP pass. The golden-case repeatability count remains zero until a reviewed deployed revision completes all required gates.

## Golden-case fixture

The MVP proof uses one controlled real-audio fixture whose identity is stable across verification runs.

Record for the fixture:

- fixture identifier;
- SHA-256 or equivalent repository-approved source hash;
- duration;
- media container/codec and sample rate;
- expected speaker count when known from authorized ground truth;
- expected language when known;
- any known quality constraints relevant to eligibility.

Do not commit private raw audio, raw transcripts, authentication material, provider secrets, or private customer content to the repository. Repository evidence should contain only sanitized identifiers, hashes, state, timing, provider provenance, and verification outcomes permitted by the existing audit rules.

## Gate 1 — Source and exact-head software QA

Required before a release candidate can enter production verification:

- [ ] Candidate Git commit SHA recorded.
- [ ] Backend source version recorded from `VoxVector/pyproject.toml`.
- [ ] Frontend source version recorded from `voxvector/package.json`.
- [ ] `VoxVector QA` succeeds for the exact candidate SHA.
- [ ] React production build succeeds for the exact candidate SHA.
- [ ] Applicable Preview/Pages/security workflow evidence is recorded without conflating PR preview with production publication.
- [ ] No P0 issue is knowingly left unresolved for the golden-case path.

A green workflow is software verification only. It is not deployment, provider execution, browser verification, or scientific validation.

## Gate 2 — Exact deployment and runtime identity

Required for the backend release candidate:

- [ ] Render deployment is observed for the intended candidate SHA.
- [ ] Render deployment reaches `live`.
- [ ] `/health` is read after that deployment.
- [ ] `/health` reports the intended backend `source_revision`.
- [ ] Runtime self-test state is recorded from `/health`.
- [ ] `process_instance_id` is present and identifies the current Python process.
- [ ] `render_instance_id` is recorded separately when supplied by Render and is not treated as the process identity.
- [ ] Configured transcription profile is read back, including beam/thread/worker/isolation/deadline state.
- [ ] Memory reference and effective downstream admission ceiling are read back when exposed by the runtime contract.
- [ ] Storage/runtime readiness is recorded from the runtime response where applicable.
- [ ] Frontend build revision and backend runtime revision remain separate.

Hook acceptance is not deployment completion. Render `live` is not a substitute for runtime readback.

## Gate 3 — Reliable authenticated intake

Using the golden fixture through the real authenticated application path:

- [ ] Case creation succeeds and returns a persisted case identity.
- [ ] Source upload succeeds through the canonical upload client.
- [ ] Upload request ID/correlation evidence is retained.
- [ ] Media persists to the configured private media store.
- [ ] Source provenance includes expected hash and media metadata.
- [ ] Signed/authenticated playback succeeds from the persisted source.
- [ ] Repeated upload attempts do not reproduce an unresolved intermittent pre-handler 4xx failure.
- [ ] User-visible upload failure preserves useful sanitized API detail and request correlation.

Current related work: #930 owns intermittent pre-handler reliability; #928 owns upload UX after the transport boundary is sufficiently resolved.

## Gate 4 — Actual speech-provider execution and durable checkpoint

Provider configuration or readiness does not satisfy this gate.

### Transcription

- [ ] Configured faster-whisper actually executes against the persisted golden source.
- [ ] Provider identity and execution provenance are persisted.
- [ ] Timestamped transcript segments are persisted and read back.
- [ ] Timestamped words are persisted and read back when supplied by the provider contract.
- [ ] Successful provider output is checkpointed to the same case run **before** downstream heavy analysis begins.
- [ ] Provider failure is represented as failure rather than synthetic completion.
- [ ] A later downstream failure/restart does not erase an already-completed transcript checkpoint.

The September 10 controlled run satisfies actual beam-1 provider execution for one historical attempt but does not satisfy this gate because the transcript artifact was not durably checkpointed before the later process restart. #941 / PR #962 owns that repair.

### Speaker diarization

- [ ] Configured pyannoteAI cloud primary actually executes against the same persisted golden source.
- [ ] `VOXVECTOR_ENABLE_DIARIZATION_RUNS=true` is verified as the case-route invocation gate.
- [ ] Speaker turns/segments are normalized, persisted, and read back.
- [ ] Provider identity, job/provenance fields, and fallback state are persisted without secrets.
- [ ] Local pyannote fallback, if tested, is recorded separately and is not substituted for cloud-primary proof.

Successful provider execution establishes only that the configured software path ran. It does not establish transcript truthfulness, verified human identity, or deception-detection validity.

## Gate 5 — Persisted multimodal alignment

For the same case/run:

- [ ] Audio timeline, transcript segments/words, and speaker turns share the canonical timing frame.
- [ ] Persisted alignment is read back after the run rather than reconstructed only in transient UI state.
- [ ] Alignment checkpoint survives downstream failure/restart when it completed upstream.
- [ ] Transcript selection/playback seeking is synchronized with persisted audio.
- [ ] Speaker attribution is connected to persisted diarization where available.
- [ ] Evidence records can reference aligned source intervals.

## Gate 6 — Memory-safe downstream analysis

The constrained runtime must not knowingly enter a heavyweight phase without required resource headroom.

- [ ] Completed upstream provider artifacts are durably checkpointed before Stage 10 admission.
- [ ] Stage 10 checks actual process RSS against the configured memory admission threshold before being represented as running.
- [ ] If headroom is insufficient, Stage 10 records an explicit bounded failure and dependent unfinished work becomes `not_run` rather than causing an uncontrolled process restart.
- [ ] A memory-admission rejection preserves completed transcript/alignment/provider artifacts.
- [ ] Runtime memory admission is presented as an operational safety decision, not Stage 09 analytical Eligibility and Reliability.
- [ ] The controlled golden run does not restart the API process due to memory exhaustion.
- [ ] Render memory/process evidence is correlated to the same run/request window.

Active owner: #941 / PR #962.

## Gate 7 — Eligibility, evidence, and assessment integrity

The golden case must preserve the Operating Charter's architectural stage boundaries.

### Eligibility and reliability

- [ ] Recording/data quality state is persisted.
- [ ] Relevant reliability/eligibility observations are available to downstream review.
- [ ] Missing or unreliable required evidence can block or qualify downstream interpretation.
- [ ] Runtime resource admission remains separate from scientific/analytical eligibility.

### Evidence collection and analysis

- [ ] Acoustic/prosodic/temporal observations used by the run are persisted with method identity and provenance.
- [ ] Transcript-derived observations are persisted when transcription executes successfully.
- [ ] Speaker-aware observations use persisted speaker artifacts where required.
- [ ] Evidence records expose direction/strength/confidence only where actually produced by implementation.

### Convergence, conflict, uncertainty, and alternatives

- [ ] Review Evidence exposes contributing methods/evidence rather than only an aggregate number.
- [ ] Convergence and conflict are represented when present.
- [ ] Uncertainty/data quality are visible.
- [ ] Alternative explanations remain inspectable.

### Candidate and final disposition boundaries

- [ ] Candidate classification remains distinct from eligibility/reliability and raw evidence collection.
- [ ] Final disposition remains gated by the implemented validation/calibration boundary.
- [ ] Engineering MVP does not fabricate a scientifically validated deception result when validation has not been satisfied.

## Gate 8 — Assessment, report, persistence, and reopen

- [ ] Canonical assessment/result contract is produced from persisted run data.
- [ ] Report is generated from the same persisted case/run evidence.
- [ ] Report references eligibility/data quality, contributing evidence, convergence/conflict, uncertainty, alternatives, provenance, and disposition boundary.
- [ ] Case appears in persisted history.
- [ ] User can leave the active case and reopen it.
- [ ] Reopened case resolves persisted source audio through the existing authenticated playback boundary without re-upload.
- [ ] Reopened case exposes the same persisted transcript/speaker/alignment/evidence/report artifacts rather than a fabricated reconstruction.

Current related work: #963 owns persisted audio/transcript rehydration after #941 establishes canonical checkpoint durability.

## Gate 9 — Observability, failure, and recovery behavior

The MVP candidate must fail honestly and preserve enough evidence to debug the failure.

- [ ] Malformed/unsupported upload returns a bounded error without corrupting the case.
- [ ] Provider failure leaves persisted failure/not-run state rather than fake completion.
- [ ] Provider success already checkpointed remains available if a downstream stage fails.
- [ ] Timeout behavior is distinguishable from success.
- [ ] Process restart is distinguishable from Render infrastructure instance identity.
- [ ] Browser request cancellation is not represented as guaranteed server termination.
- [ ] Retrying/reopening does not overwrite unrelated prior-run evidence.
- [ ] VoxVector-owned diagnostic/provider events required for debugging are durably available after restart once #959 is complete.
- [ ] Case/run debugging evidence can be exported through the canonical sanitized Debug Bundle once #959 is complete.

## Gate 10 — Authenticated browser verification and same-revision repeatability

The exact deployed release candidate must be exercised in real browsers.

- [ ] Authenticated desktop flow: login → case → upload → playback → analysis → evidence → report → history/reopen.
- [ ] Authenticated mobile flow exercises the same critical path.
- [ ] Navigation and gating route users to intended surfaces.
- [ ] Keyboard interaction works for critical controls.
- [ ] Reduced-motion behavior does not break state visibility.
- [ ] Failure states preserve understandable status and correlation evidence.
- [ ] Browser verification records frontend build revision and backend runtime revision actually observed.

Engineering MVP sign-off requires **two successful complete golden-case executions on the same exact deployed revision**. A source change resets the count.

For each run record:

- candidate/deployed SHA;
- frontend build revision;
- backend `/health` source revision;
- case ID and run ID in authorized operational evidence;
- source hash;
- provider identities;
- request/correlation IDs;
- persisted artifact readback;
- memory/process outcome;
- browser/device boundary;
- pass/fail outcome and UTC timestamp.

## Engineering MVP sign-off matrix

| Boundary | Required status for engineering MVP | Evidence owner |
| --- | --- | --- |
| Repository source | exact candidate SHA recorded | GitHub / release record |
| Software QA | exact-head QA + production build successful | GitHub Actions |
| Frontend publication | applicable exact artifact/publication evidence | GitHub Actions / Pages |
| Backend deployment | intended SHA observed `live` | Render |
| Runtime identity | `/health` exact revision, process identity, self-test, memory profile | deployed API |
| Intake | authenticated upload/persistence/playback passes | case/runtime/browser evidence |
| Transcription | actual provider execution + durable same-run artifact readback | case/run provenance |
| Diarization | actual cloud-primary execution + artifact readback | case/run provenance |
| Alignment | persisted transcript/audio/speaker timing readback | case/run evidence |
| Memory safety | Stage 10 admitted safely or bounded without restart; golden pass completes | runtime + Render evidence |
| Evidence/assessment | inspectable eligibility/evidence/synthesis/assessment | persisted result + browser |
| Report/history | report persists and case reopens with same artifacts | persisted case + browser |
| Observability | failures/restarts leave durable correlated debugging evidence | Supabase/Render/bundle |
| Repeatability | two complete passes, same deployed revision | golden-case record |
| Scientific validation | **not implied by engineering MVP** | separate validation program |

## Current release-gate mapping — 2026-09-10

| Release area | Current owner |
| --- | --- |
| MVP coordination | #915 |
| Confirmed post-transcription memory + durable upstream checkpoint | #941 / PR #962 |
| Dual Render/Supabase logs + Debug Bundle | #959 / PR #961 |
| Intermittent upload reliability | #930 |
| Persisted historical case playback/transcript reopen | #963 |
| Canonical Render Blueprint drift | #964 |
| Manual Render deployment-control verification | #920 |
| Server-aware Stop Analysis | #949 |
| Auditable secure deletion | #948 |
| User Management / role browser verification | #931 |
| Public CTA/anchor/menu repair | #932 |
| Upload progress/cancel UX | #928 |
| Startup/mobile authenticated verification | #927 |
| Controlled diarization execution | #915 → `VV-DIARIZE` |
| Persisted speaker/audio/transcript alignment | #915 → `VV-ALIGN` |
| API contract hardening | #915 → `VV-API-CONTRACT` |
| Security/cost hardening | #915 → `VV-SECURITYCOST` |
| Exact deployed/browser verification | #915 → `VV-DEPLOYVERIFY` |
| Final engineering MVP sign-off | #915 → `VV-LAUNCHGATE` |

## Documentation freeze during the MVP sprint

1. Do not create another planning document merely to restate the MVP.
2. Add a new document only when an active release gate genuinely requires a new canonical record or intentionally replaces an explicitly retired owner.
3. Put task scope/acceptance criteria in GitHub Issues, source changes in PRs, and executed evidence in `voxvector/audits/AUDIT_REPORT.md`.
4. Update existing affected canonical records instead of creating `v2`, `new`, `final`, duplicate roadmaps, or competing checklists.
5. Preserve dated historical evidence rather than rewriting it to match current runtime state.

## Verification boundary

Repository QA, build success, Render deployment, runtime health, provider execution, artifact durability, memory containment, browser verification, engineering-MVP completion, and scientific validation remain separate claims.
