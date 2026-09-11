# VoxVector Current Engineering State — 2026-09-04

## Canonical runtime snapshot

This file remains the canonical current engineering-state owner despite its historical filename. Dated audit/checkpoint files remain preserved separately and are not rewritten to make old evidence appear current.

- Repository: `darenprince/darenprince-author`
- Canonical branch: `main`
- Canonical backend root: `VoxVector/`
- Canonical frontend root: `voxvector/`
- Current canonical `main` observed for this task: `1cc10f40bb6b94e0a8f3380c1b70529137e89d93`
- Backend source release: `0.2.27`
- Frontend source release: `0.2.37`
- Current Render service: `voxvector-api` (`srv-da2f88n40ujc73a8m26g`)
- Latest separately recorded Render deployment: `dep-dahi2ics728c73b6ujug`, `live`
- Latest separately recorded deployed source: exact `420536771875c6948be51851118b58cb04a596e6`
- Render deploy trigger for that deployment: `api`
- Render deploy finished: `2026-09-10T21:36:23.3655Z`
- Render production auto-deploy: disabled
- Render plan/region: free / Oregon
- Latest separately recorded live Render build command: `pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`
- Canonical root Blueprint build command: `pip install -r api/requirements.txt && pip install -r api/requirements-transcription.txt`
- Owner Render export observed: `2026-09-10T21:38:48Z`; it independently matches service/repository/root/build/start/health/domain/auto-deploy fields and redacts environment values with `sync: false`
- Supabase project: `VoxVector` (`tawtkawmjqabydnatavx`)
- `voxvector-user-admin` Edge Function: last verified ACTIVE, version 2, JWT verification enabled
- Latest verified trusted role inventory: 1 admin, 1 developer, 1 user
- Maximum sample rate: `48,000 Hz`
- Default maximum media size: `262,144,000 bytes`
- Current first source/configuration task: #964 Render Blueprint/runtime-dependency reconciliation
- Reopened runtime verification gate after #964: #941 controlled post-#967 production proof
- Cloud-primary diarization: #970 after #941
- Persisted multimodal alignment: #971 after #970
- Persisted old-case playback/transcript/artifact rehydration: #963 after the runtime/provider evidence gates
- Frontend pipeline-contract correction: #965 before final browser/golden verification
- Login wake/shared self-profile candidate: draft PR #974 under #931; not merged into current `main`

Current GitHub `main` is newer than the separately recorded Render deployment and the `420536...` QA/Pages baseline. The backend and frontend have separate release numbers. Backend source authority is `VoxVector/pyproject.toml`; frontend source authority is `voxvector/package.json`. Production API version, runtime self-test, provider configuration, process identity, memory settings and other `/health` fields remain runtime observations and must not be advanced merely because source, deployment metadata or documentation changes.

No fresh `/health` payload for current GitHub `main` or a newer Render deployment is recorded by the current synchronization pass. Older health readbacks remain historical evidence and are not reused as current runtime evidence.

The canonical engineering-MVP exit criteria are maintained in [`MVP_RELEASE_GATE.md`](MVP_RELEASE_GATE.md).

## Current deployment roles

| Surface | Endpoint / role | Current status |
|---|---|---|
| Public React application | `https://darenprince.com/voxvector/` | Canonical GitHub Pages frontend; the latest recorded exact-revision Pages baseline in this document is workflow `34532394423` for `420536...`, not current-main proof; browser verification remains separate |
| Original API | `https://voxvector.crownlabs.tech` | Preserved Render API; latest separately recorded deploy `dep-dahi2ics728c73b6ujug` is `live` on exact `420536...`, which is older than current GitHub `main`; fresh `/health` readback remains separate |
| AWS API environment | `https://awsapi.crownlabs.tech` | Separate environment; not substituted for Render production evidence |
| Authentication/persistence/diagnostics/private media | Supabase | Configured boundary; previously verified administrator Edge Function remains separate from current browser acceptance |

Render hosting the API does not make Render the durable media store. GitHub Pages publishing the React artifact does not make Pages the API host. Supabase owns configured auth/persistence/diagnostics/private media, not analytical classification logic.

The separately recorded Render deployment was triggered through Render's API. It is deployment evidence only and does not verify issue #920's authenticated Developer Console **Deploy Now** / server-side deploy-hook path.

## Recorded #967 exact-main software QA baseline

GitHub Actions on exact revision `420536771875c6948be51851118b58cb04a596e6` reported:

- VoxVector QA run `34532394431`: `success`;
- API test step: success;
- React application contract-test step: success;
- React production-build step: success;
- Deploy GitHub Pages run `34532394423`: `success`.

Those are repository/build/publication workflow results for `420536...`. The GitHub connector did not return a push-triggered exact-main QA run for current `1cc10f40...` through the commit-run/status lookups used in this synchronization, so these runs remain a historical baseline rather than current-main QA proof. They also do not establish a newer Render `/health` payload, controlled provider execution, browser verification or scientific validation.

## Controlled production result — historical evidence from 2026-09-10

The controlled reference WAV evidence below belongs to deployed source `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2`. It is intentionally preserved as historical incident/provider evidence and is not relabeled as execution of current GitHub `main`.

Case/run evidence:

- case `3515362e-f801-463d-961a-df7b3302a596`
- source `cbdcdbf8-e528-49b0-a474-5cd64588d301`
- request `32fdb25aee704ee4ad0a0615e2496e09`
- duration 183.3 seconds
- size 17,596,936 bytes

Observed sequence:

1. authenticated source upload/private persistence succeeded;
2. Speech Segmentation completed with 26 segments;
3. faster-whisper executed `base`, CPU/int8, beam 1, one CPU thread, one worker, isolated child process, 165-second child deadline;
4. transcription completed in about 113 seconds with 58 timestamped segments and 246 timestamped words;
5. transcript alignment state was reached;
6. API-parent RSS was about 134.75 MiB before post-provider cleanup and about 482.58 MiB after cleanup;
7. VoxVector's configured memory admission ceiling was 416 MiB on a 512 MiB reference budget;
8. Stage 10 Acoustic Feature Extraction nevertheless started on deployed `f0dda136...`;
9. Render sampled 519,041,020 bytes against a 536,870,900-byte service memory limit in the incident window;
10. the API process restarted shortly afterward;
11. the owner confirmed the incident was a memory problem;
12. the source WAV remained persisted in Supabase;
13. Stage 07/08 lifecycle state survived, but the transcript/provider artifact had not been durably attached to the run before downstream work.

Render did not provide a dedicated kernel OOM/SIGKILL line for this exact run, so the precise OS termination mechanism is not separately claimed.

This is real historical provider-execution evidence. It is not evidence that current GitHub `main` has completed the same path, transcript truthfulness, browser verification or scientific validation.

## Merged #941 source repair and reopened production proof

PR #962 merged the first containment/durability foundation. PR #967 then merged the reviewed follow-up as revision `420536771875c6948be51851118b58cb04a596e6`; those repairs remain present in later current source.

The current source contains:

- cleanup that avoids importing PyTorch solely for cleanup on the CPU transcription path;
- checkpointing of completed acquisition/transcript/alignment/provider state to the same persisted run before downstream Stage 10 work;
- state/count-only checkpoint diagnostics rather than transcript text;
- Stage 10 operational memory admission before representing Stage 10 as running;
- fail-fast process-wide single-flight admission for the composite Stage 10 analysis boundary;
- RSS recheck while holding the shared heavyweight lock and lock ownership through composite execution;
- prevention of a competing request waiting behind that lock and later executing abandoned heavyweight work after its route has already failed;
- a fresh Python-process `process_instance_id` distinct from Render infrastructure identity;
- stable persisted route-owned `run_id` with the pipeline-internal UUID stored separately as `pipeline_run_id`;
- safe process/Render identity and memory-admission information through the runtime contract.

Issue #941 was automatically/administratively closed at the #967 merge even though its production proof criteria were still open. It has been reopened. Before accepting the controlled rerun as a reproducibility proof, #964 should first reconcile the final Render dependency/profile boundary so the tested runtime does not immediately change afterward.

## Current 21-stage pipeline

| Stage | Runtime/source contract state |
|---:|---|
| 01 File Upload / Ingest | implemented; prior controlled 17.6 MB uploads succeeded; intermittent #930 remains open |
| 02 File Decode and Normalization | implemented |
| 03 Provenance and Integrity | implemented |
| 04 Channel and Recording Assessment | implemented |
| 05 Speech Segmentation | implemented foundation; historical controlled run completed 26 segments |
| 06 Speaker Identification / Diarization | cloud-primary provider path built; controlled pyannoteAI execution required under #970 |
| 07 Transcription Generation | historical controlled beam-1 faster-whisper execution observed; merged durability path requires current controlled readback under #941 |
| 08 Transcript Alignment | built synchronized foundation; same-run checkpoint path merged; persisted multimodal proof remains #971 |
| 09 Eligibility and Reliability | implemented analytical gate; separate from runtime memory admission |
| 10 Acoustic Feature Extraction | implemented source; merged bounded admission/single-flight safety requires controlled production proof under #941 |
| 11 Prosodic and Voice Quality Analysis | implemented foundation |
| 12 Temporal and Pause Analysis | implemented foundation |
| 13 Linguistic and Disfluency Analysis | conditional on available persisted transcript artifact |
| 14 Question / Answer Alignment | conditional |
| 15 Within Speaker Baseline | conditional |
| 16 Cross Method Evidence Assembly | implemented foundation |
| 17 Evidence Convergence and Conflict | implemented foundation |
| 18 Candidate Classification | implemented guarded foundation |
| 19 Validation and Calibration Gate | not invoked |
| 20 Final Classification / Disposition | implemented guarded foundation |
| 21 Audit and Provenance Output | implemented foundation |

The canonical backend stage order is Speech Segmentation at 05 and Speaker Identification / Diarization at 06. The previously documented frontend `PipelineBuildCard.jsx` projection defect remains owned by #965 in the existing component.

Current maturity remains **16 implemented or built runtime foundations** with four conditional/intentionally not-invoked stages and the speaker path still requiring controlled cloud-primary execution. This count does not mean validated deception indicators.

## Memory safety and artifact durability

The constrained execution sequence is:

`provider completion → provider cleanup → durable same-run upstream checkpoint → Stage 10 route preflight → fail-fast shared Stage 10 admission + locked RSS recheck → downstream composite analysis while the lock remains held`

Current source reference policy remains:

- `VOXVECTOR_MEMORY_LIMIT_MB=512`
- `VOXVECTOR_MEMORY_HEADROOM_MB=96`
- effective reference admission ceiling `416 MiB`

Those values are source/runtime-profile references, not a fresh current `/health` claim. A memory-admission rejection is operational runtime safety. It is not analytical Stage 09 Eligibility and Reliability and must not be presented as a scientific result.

## Process and Render instance identity

`process_instance_id` identifies the current Python API process and must change when that process restarts.

`render_instance_id` identifies Render infrastructure when available. It can remain stable across an internal Python/Uvicorn restart, so it cannot serve as the sole worker identity for interruption recovery.

## Speech runtime readiness and execution

### Transcription

The canonical constrained source profile is faster-whisper `base`, CPU/int8, beam 1, one CPU thread, one worker, isolated child process and 165-second child deadline.

That profile has historical controlled execution evidence on `f0dda136...`. The merged source includes the durability and Stage 10 safety repairs, but current production execution/readback is still required under reopened #941 after #964 establishes the final runtime configuration.

### Diarization

The canonical primary path remains pyannoteAI cloud through `pyannote_api`. `VOXVECTOR_ENABLE_DIARIZATION_RUNS` is a separate invocation gate.

Local Community-1 is an optional explicit fallback requiring the local pyannote/PyTorch stack and protected Hugging Face credential. It is not required merely to invoke the cloud-primary adapter.

Controlled cloud-primary execution and persisted speaker artifact readback remain required under #970.

## Render Blueprint configuration drift

Git already contains the sole canonical root `render.yaml`.

The latest separately recorded connected Render service and owner-provided `2026-09-10T21:38:48Z` export build `requirements-speech.txt`, while root `render.yaml` declares `requirements-transcription.txt`. `requirements-speech.txt` includes local `pyannote.audio` in addition to faster-whisper; `requirements-transcription.txt` contains faster-whisper only.

The owner export lists environment-variable names with `sync: false` and no values. That redaction is not evidence that explicit reproducible non-secret source values should be deleted. Root `render.yaml` also declares `CORS_ORIGINS` as server-managed while the owner export does not list it; current backend source defaults to `*` if the variable is absent. #964 must inspect and resolve that ownership/configuration deliberately rather than infer a value from the export.

Issue #964 owns reconciliation. Do not upload the Render-generated export as a second Blueprint or create a duplicate service. Secret values remain external; reproducible non-secret operational values should remain source-controlled where supported.

## Run lifecycle recovery

Issue #945 / PR #946 remains complete at source/merge boundaries and provides Case History reconciliation, terminal run/failure reports, real elapsed timing, historical source-revision preservation, terminal metadata backfill and same-process per-case serialization.

Merged #962/#967 strengthen that canonical lifecycle with durable pre-Stage-10 provider checkpointing, true process identity and stable route-owned run identity.

## Developer Console and observability

The Developer Console remains the engineering cockpit for runtime health, case workflow, 21-stage state, live run polling, diagnostics, Render status/logs, methodology, structured audits, report/log export controls and protected deployment actions.

PRs #961, #966 and #968 are merged into later source. Issue #959 owns **production acceptance**, not a queued draft foundation: confirm correlated Render + Supabase copies on a controlled run, generate/inspect a real Debug Bundle, complete the automatic terminal Render snapshot gap and record authenticated browser readback separately.

## Developer Console wake/chrome candidate — issue #981 / draft PR #986

Issue #981 is a bounded frontend-only refinement of the existing Developer Console. Draft PR #986 adds a manual **Wake API** action to the existing `DeveloperEngineeringStatus` surface using the canonical `GET /health` client boundary, makes the compact Case Workflow tracker opaque/theme-aware, and suppresses the duplicate drawer account/email/sign-out presentation while retaining the canonical header profile menu.

The implementation checkpoint before this documentation synchronization was `81c7f776a4504bafa13682c8e0f1c79f0887ad2a` on branch `fix/voxvector-developer-console-wake-chrome`, based on GitHub `main` `1cc10f40bb6b94e0a8f3380c1b70529137e89d93`. GitHub's merge candidate `5c8e41e706930cb7e4ee8f44fbca1ba95a2df719` passed VoxVector QA `34560296284`: 224 backend tests passed, 19 frontend contract tests passed, and the Vite production build succeeded. PR Preview Build `34560296296` also succeeded.

The documentation synchronization advances the branch beyond that implementation checkpoint, so fresh final-head QA and Preview are required before merge recommendation. Authenticated desktop/mobile browser verification remains open. A health request attempt is not deployment or readiness proof; a preview build is not production publication or browser verification. No additional public landing/shared-shell change is included; the earlier trailing phrase was a punctuation/transcription error.

This manual Developer Console wake control is distinct from #931 / PR #974's requested login-triggered wake. It does not replace that auth-flow work.

## Authentication and administrator state — issue #931 / draft PR #974

The prior administrator Edge Function infrastructure blocker is resolved at the previously verified infrastructure boundary: `voxvector-user-admin` was ACTIVE version 2 with JWT verification enabled, and the verified trusted-role inventory contained an admin, developer and user.

#931 / draft PR #974 remains the independently owned login-triggered wake and shared self-profile candidate. It is not current source or deployed behavior merely because PR #986 adds a separate manual Developer Console wake control. #931 requires its own current-main integration QA/Preview plus authenticated desktop/mobile browser verification and profile save/reload.

## Active issue state

- #964 — **P0 Ready / current first source-config task.** Reconcile the sole root Render Blueprint with live/exported service state.
- #941 — **P0 Reopened for production proof.** Source fixes merged; controlled rerun/readback remains after #964.
- #970 — **P0 Blocked on #964 + #941.** Cloud-primary pyannoteAI contract correction/execution/persistence.
- #971 — **P0 Blocked on #970 + accepted #941 proof.** Persist transcript/audio/speaker alignment.
- #963 — **P0 queued after runtime/provider evidence.** Historical-case audio/transcript/speaker/alignment/report rehydration.
- #930 — **P0 release blocker.** Intermittent pre-handler upload 400 requires bounding before candidate freeze.
- #959 — **P0 production acceptance open.** Merged observability/debug source; real dual-copy/bundle/terminal-capture proof remains.
- #965 — **P0 Ready before final browser freeze.** Correct current frontend pipeline projection from backend contract.
- #931 / PR #974 — **P0 auth/account candidate + browser matrix.** Candidate source not merged; independent current-main integration QA required.
- #981 / PR #986 — **P1 Developer Console wake/chrome candidate.** Source/docs are synchronized; final-head QA/Preview and authenticated desktop/mobile browser verification remain.
- #932 — **P1 release-critical frontend navigation.** Complete before final browser/golden freeze.
- #920 — **P1 browser verification.** API-triggered Render deploy does not verify protected Developer Console Deploy Now.
- #948 / PR #951 and #949 / PR #952 — separate secure-deletion/cancellation work, not the current source task.
- #928, #958, #927 — remain mapped in tracker #915.
- #972 — **P0 final gate, blocked.** Freeze only after prerequisites and pass two complete same-revision/configuration golden cases.

## Supabase current boundary

Supabase is the configured durable persistence boundary for cases, private media, diagnostics and authentication. Historical incident evidence demonstrated that source media and pre-termination diagnostic records can survive a Render process restart.

That persistence is not proof of current GitHub-main execution or browser rehydration. #963 owns the old-case playback/transcript/artifact return path.

## Manual Render deployment control

The canonical Developer Console includes **Deploy Now**, calling `POST /v1/developer/render/deploy` server-side. Render production auto-deploy remains intentionally disabled.

A successful trigger response establishes only request acceptance. #920 still requires:

`Developer Console action → server deploy-hook accepted → new Render deploy → intended commit → live → backend source_revision → fresh /health → browser/runtime verification where required`

## Current engineering sequence

1. complete #964 Render Blueprint/runtime-dependency reconciliation in the existing root `render.yaml`;
2. deliberately deploy/read back the reconciled exact revision and complete reopened #941 with the same controlled WAV;
3. execute/persist cloud-primary diarization under #970;
4. persist/read back transcript/audio/speaker alignment under #971;
5. complete #963 historical case rehydration;
6. bound #930 authenticated upload reliability and #959 production observability acceptance;
7. correct the existing frontend pipeline projection under #965;
8. refresh draft PR #974 against current `main`, rerun integration QA, merge after review and complete #931 browser/profile acceptance;
9. complete #981 Developer Console wake/chrome final-head QA/Preview and authenticated desktop/mobile verification;
10. complete #932 release-critical CTA/anchor/navigation behavior;
11. freeze one exact candidate revision/configuration and complete #972 two-run golden proof;
12. continue scientific validation separately.

## Evidence and scientific boundary

No single vocal, acoustic, linguistic, behavioral, emotional or psychological feature proves deception. Candidate classification and final disposition remain separate from eligibility/reliability and evidence collection. Validation and calibration remain a distinct gate.

Source, repository QA, Pages publication, Render deployment, fresh `/health` runtime readback, provider execution, artifact persistence, browser verification, engineering-MVP completion and scientific validation are different claims.