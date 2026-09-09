# VoxVector Engineering MVP Release Gate

**Status:** Canonical engineering MVP exit gate  
**Effective:** 2026-09-09  
**Prompt:** `VV-MVP-SPRINT-GATE-ALIGNMENT`  
**Tracker:** [#915](https://github.com/darenprince/darenprince-author/issues/915)  
**Alignment task:** [#933](https://github.com/darenprince/darenprince-author/issues/933)

## Purpose

This document is the single canonical checklist for deciding whether VoxVector has reached **engineering MVP**.

It complements `MVP_BUILD_PLAN.md`, `CAPABILITY_STATUS.md`, `QA_STATUS.md`, `DEVELOPMENT_WORKFLOW.md`, and the active GitHub issue queue. It does not replace the Operating Charter, Project Decision Log, runtime implementation, or scientific validation records.

Engineering MVP is a connected, reproducible product milestone. It is not defined by screen count, provider configuration, a successful build, a successful deployment, or a scientific-validation claim.

## Engineering MVP definition

VoxVector reaches engineering MVP only when a real authenticated case can traverse the canonical connected path:

`create case → upload recording → provenance → decode/playback → speaker processing → transcription → alignment → eligibility/reliability → analytical observations → evidence assembly → convergence/conflict → candidate assessment → report → persistence → close/reopen`

The required evidence must come from the same exact deployed source revision and must be reproducible.

## Golden-case fixture

The MVP proof uses one controlled real-audio fixture whose identity is stable across the verification runs.

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
- [ ] Applicable GitHub Pages build/publication evidence is recorded for that same frontend source.
- [ ] No P0 issue is knowingly left unresolved for the golden-case path.

A green build or workflow is software verification only. It is not deployment, provider execution, browser verification, or scientific validation.

## Gate 2 — Exact deployment and runtime identity

Required for the backend release candidate:

- [ ] Render deployment is observed for the intended candidate SHA.
- [ ] Render deployment reaches `live`.
- [ ] `/health` is read after that deployment.
- [ ] `/health` reports the intended backend `source_revision`.
- [ ] Runtime self-test state is recorded from `/health` rather than inferred from Render deploy state.
- [ ] Storage/runtime readiness is recorded from the runtime response where applicable.
- [ ] Frontend build revision and backend runtime revision are not collapsed into one synthetic status.

Hook acceptance is not deployment completion. A Render `live` record is not a substitute for runtime readback.

## Gate 3 — Reliable authenticated intake

Using the golden fixture through the real authenticated browser/application path:

- [ ] Case creation succeeds and returns a persisted case identity.
- [ ] Source upload succeeds through the canonical upload client.
- [ ] Upload request ID/correlation evidence is retained.
- [ ] Media persists to the configured private media store.
- [ ] Source provenance includes the expected hash and media metadata.
- [ ] Signed/authenticated playback succeeds from the persisted source.
- [ ] Repeated upload attempts do not reproduce an unresolved intermittent pre-handler 4xx failure.
- [ ] User-visible upload failure preserves useful sanitized API detail and request correlation.

Current blocker: [#930](https://github.com/darenprince/darenprince-author/issues/930) tracks the intermittent case-source upload HTTP 400. Upload UX enhancement [#928](https://github.com/darenprince/darenprince-author/issues/928) follows the reliability boundary.

## Gate 4 — Actual speech-provider execution

Provider configuration or readiness does not satisfy this gate.

### Transcription

- [ ] The configured faster-whisper path actually executes against the persisted golden source.
- [ ] Provider identity and execution provenance are persisted.
- [ ] Timestamped transcript segments are persisted and read back.
- [ ] Timestamped words are persisted and read back when supplied by the provider contract.
- [ ] Provider failure is represented as failure rather than synthetic completion.

Execution owner until promoted to a dedicated issue: tracker #915 backlog identifier `VV-TRANSCRIBE`.

### Speaker diarization

- [ ] The configured pyannoteAI cloud primary actually executes against the same persisted golden source.
- [ ] `VOXVECTOR_ENABLE_DIARIZATION_RUNS=true` is verified as the explicit case-route invocation gate for the run.
- [ ] Speaker turns/segments are normalized, persisted, and read back.
- [ ] Provider identity, job/provenance fields, and fallback state are persisted without exposing secrets.
- [ ] Local pyannote fallback, if tested, is recorded separately and is not substituted for cloud-primary execution proof.

Execution owner until promoted to a dedicated issue: tracker #915 backlog identifier `VV-DIARIZE`.

Successful provider execution establishes only that the configured software path ran. It does not establish transcript truthfulness, verified human identity, or deception-detection validity.

## Gate 5 — Persisted multimodal alignment

For the same case/run:

- [ ] Audio timeline, transcript segments/words, and speaker turns share the canonical timing frame.
- [ ] Persisted alignment is read back after the run rather than reconstructed only in transient UI state.
- [ ] Transcript selection/playback seeking is synchronized with the persisted audio timeline.
- [ ] Speaker attribution is connected to the persisted diarization artifact where available.
- [ ] Evidence records can reference source intervals in the aligned timeline.

Execution owner until promoted to a dedicated issue: tracker #915 backlog identifier `VV-ALIGN`.

## Gate 6 — Eligibility, evidence, and assessment integrity

The golden case must preserve the architectural stage boundaries required by the Operating Charter.

### Eligibility and reliability

- [ ] Recording/data quality state is persisted.
- [ ] Relevant reliability/eligibility observations are available to downstream review.
- [ ] Missing or unreliable required evidence can block or qualify downstream interpretation.

### Evidence collection and analysis

- [ ] Acoustic/prosodic/temporal observations used by the run are persisted with method identity and provenance.
- [ ] Transcript-derived observations used by the run are persisted when transcription executes successfully.
- [ ] Speaker-aware observations use persisted speaker artifacts where required.
- [ ] Evidence records expose direction/strength/confidence only where actually produced by the implementation.

### Convergence, conflict, uncertainty, and alternatives

- [ ] Review Evidence exposes contributing methods/evidence rather than only a dramatic aggregate number.
- [ ] Convergence and conflict are represented when present.
- [ ] Uncertainty/data quality are visible.
- [ ] Recorded alternative explanations remain inspectable.

### Candidate and final disposition boundaries

- [ ] Candidate classification remains distinct from eligibility/reliability and raw evidence collection.
- [ ] Final disposition remains gated by the implemented validation/calibration boundary.
- [ ] The engineering MVP does not fabricate a scientifically validated deception result when the validation gate has not been satisfied.

Execution mapping: tracker #915 `VV-DEVCONSOLE`, `VV-API-CONTRACT`, and `VV-LAUNCHGATE` as applicable when promoted.

## Gate 7 — Assessment, report, persistence, and reopen

- [ ] Canonical assessment/result contract is produced from persisted run data.
- [ ] Report is generated from the same persisted case/run evidence.
- [ ] Report includes or references eligibility/data quality, contributing evidence, convergence/conflict, uncertainty, alternatives, provenance, and disposition boundary.
- [ ] Case appears in persisted history.
- [ ] User can leave the active case, return to history, and reopen it.
- [ ] Reopened case exposes the same persisted source/run/transcript/speaker/alignment/evidence/report artifacts rather than a newly fabricated reconstruction.

Execution owner until promoted to a dedicated issue: tracker #915 backlog identifier `VV-LAUNCHGATE`.

## Gate 8 — Authenticated browser verification

The exact deployed release candidate must be exercised in real browsers.

- [ ] Authenticated desktop flow: login → case → upload → playback → analysis → evidence → report → history/reopen.
- [ ] Authenticated mobile flow exercises the same critical path.
- [ ] Navigation and gating route the user to the intended developer/user surface.
- [ ] Keyboard interaction works for the critical controls that support keyboard operation.
- [ ] Reduced-motion behavior does not break state visibility.
- [ ] Upload/provider/analysis failure states are understandable and preserve request correlation where available.
- [ ] Browser verification records the frontend build revision and backend runtime revision actually observed.

Current mapped work: #927, #931, #932, and tracker #915 identifiers `VV-DEPLOYVERIFY` / `VV-LAUNCHGATE` as applicable.

## Gate 9 — Failure and recovery behavior

The MVP candidate must fail honestly and recover predictably.

- [ ] Malformed/unsupported upload returns an appropriate bounded error without corrupting the case.
- [ ] Intermittent pre-handler upload rejection is resolved or reproducibly bounded before sign-off.
- [ ] Provider failure leaves a persisted failure/queued/not-run state rather than fake completion.
- [ ] Timeout behavior is distinguishable from successful completion.
- [ ] Browser cancellation semantics remain explicit: cancelling the browser request is not represented as guaranteed termination of server computation already in flight.
- [ ] Retrying/reopening a case does not silently overwrite unrelated prior-run evidence.

Current mapped work: #930, #928, and tracker #915 `VV-ASYNCJOBS` where asynchronous execution/retry behavior becomes necessary.

## Gate 10 — Same-revision repeatability

Engineering MVP sign-off requires **two successful complete golden-case executions on the same exact deployed revision**.

For each run record:

- candidate/deployed SHA;
- frontend build revision;
- backend `/health` source revision;
- case ID and run ID in authorized operational evidence;
- source hash;
- provider identities;
- request/correlation IDs;
- required persisted artifact readback;
- browser/device boundary used;
- pass/fail outcome and UTC timestamp.

The two runs may use separate cases or separate canonical runs of the same controlled fixture, but they must not rely on changing source between run 1 and run 2. If source changes, the repeatability count resets for the new release candidate.

## Engineering MVP sign-off matrix

All rows below must be explicitly evidenced.

| Boundary | Required status for engineering MVP | Evidence owner |
| --- | --- | --- |
| Repository source | exact candidate SHA recorded | GitHub / release record |
| Software QA | exact-head QA + production build successful | GitHub Actions |
| Frontend publication | exact applicable Pages artifact/publication recorded | GitHub Actions / Pages |
| Backend deployment | intended SHA observed `live` | Render |
| Runtime | `/health` exact revision and self-test read back | deployed API |
| Intake | authenticated real upload/persistence/playback passes | case/runtime/browser evidence |
| Transcription | actual provider execution + artifact readback | case/run provenance |
| Diarization | actual cloud-primary execution + artifact readback | case/run provenance |
| Alignment | persisted transcript/audio/speaker timing readback | case/run evidence |
| Evidence/assessment | inspectable eligibility/evidence/synthesis/assessment | persisted result + browser |
| Report/history | report persists and case reopens with same artifacts | persisted case + browser |
| Failure paths | critical failures bounded and truthful | tests + runtime/browser evidence |
| Repeatability | two complete passes, same deployed revision | golden-case record |
| Scientific validation | **not implied by engineering MVP** | separate validation program |

## Current release-gate mapping

As of the 2026-09-09 alignment pass:

| Release area | Current owner |
| --- | --- |
| MVP coordination | #915 |
| Release-gate documentation alignment | #933 |
| Intermittent upload reliability | #930 |
| Upload cancellation/progress UX after reliability | #928 |
| Manual Render deployment-control production verification | #920 |
| User/developer role gating and public Login | #931 |
| Public CTA/anchor/menu and drawer repair | #932 |
| Startup/mobile authenticated verification | #927 |
| Post-merge publication evidence | #910 |
| Operational truth-state normalization | #914 |
| Controlled transcription execution | #915 → `VV-TRANSCRIBE` |
| Controlled diarization execution | #915 → `VV-DIARIZE` |
| Persisted alignment verification | #915 → `VV-ALIGN` |
| API contract release hardening | #915 → `VV-API-CONTRACT` |
| Security/cost hardening | #915 → `VV-SECURITYCOST` |
| Exact deployed/browser release verification | #915 → `VV-DEPLOYVERIFY` |
| Final engineering MVP sign-off | #915 → `VV-LAUNCHGATE` |

Backlog identifiers remain planning owners until #915 promotes them into dedicated execution issues. Promotion does not itself establish completion.

## Documentation freeze during the MVP sprint

The existing canonical architecture is sufficient to execute the MVP sprint. Until engineering MVP sign-off:

1. do not create another planning document merely to restate the MVP;
2. add a new document only when an active release gate genuinely requires a new canonical record or when it intentionally replaces an explicitly retired owner;
3. put task scope/acceptance criteria in GitHub Issues, source changes in PRs, and executed evidence in `voxvector/audits/AUDIT_REPORT.md`;
4. update existing affected canonical records instead of creating `v2`, `new`, `final`, duplicate roadmaps, or competing checklists;
5. defer non-blocking research expansion, visual experimentation, and new analysis-method work unless it is required to pass a listed MVP gate.

## Current observed alignment checkpoint — 2026-09-09

At the start of this gate-alignment task:

- GitHub `main`: `fbe317660e7b9238cd46ffff3a8101291bc85580`;
- exact-main `VoxVector QA`: run `34305133803`, successful;
- exact-main `Deploy GitHub Pages`: run `34305133777`, successful;
- Render service: `voxvector-api` (`srv-da2f88n40ujc73a8m26g`), auto-deploy disabled;
- latest observed Render deployment: `dep-dagcvau7bikc73aki9b0`, source `fbe317660e7b9238cd46ffff3a8101291bc85580`, status `live`, finished `2026-09-09T03:22:43.934801Z`.

This checkpoint does **not** claim a fresh `/health` readback for that deployment, successful authenticated browser verification, successful controlled transcription/diarization execution, successful golden-case completion, or scientific validation. Those remain release gates above.
