# VoxVector Current Engineering State — 2026-09-04

## Canonical runtime snapshot

This file remains the canonical current engineering-state owner despite its historical filename. Dated audit/checkpoint files remain preserved separately and are not rewritten to make old evidence appear current.

- Repository: `darenprince/darenprince-author`
- Canonical branch: `main`
- Canonical backend root: `VoxVector/`
- Canonical frontend root: `voxvector/`
- Current canonical `main`: `1cc10f40bb6b94e0a8f3380c1b70529137e89d93`
- Backend source release: `0.2.27`
- Frontend source release: `0.2.37`
- Current Render workspace: `tea-da2errdg1s2s73cl4eeg`
- Current Render service: `voxvector-api` (`srv-da2f88n40ujc73a8m26g`)
- Current Render deployment: `dep-dahnv7p42hec739o7phg`, `live`
- Current deployed source: exact `1cc10f40bb6b94e0a8f3380c1b70529137e89d93`
- Current deploy trigger: `deploy_hook`
- Current deploy finished: `2026-09-11T04:14:41.882165Z`
- Render production auto-deploy: disabled
- Render plan/region: free / Oregon
- Current live Render build command: `pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`
- Canonical root Blueprint build command: `pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`
- Confirmed Render workspace inventory: exactly one VoxVector API service; #964 closure gate complete
- Supabase project: `VoxVector` (`tawtkawmjqabydnatavx`), current project status `ACTIVE_HEALTHY`
- `voxvector-user-admin` Edge Function: last verified ACTIVE, version 2, JWT verification enabled
- Latest verified trusted role inventory: 1 admin, 1 developer, 1 user
- Maximum sample rate: `48,000 Hz`
- Default maximum media size: `262,144,000 bytes`
- Current active runtime task: #941 controlled same-WAV Stage 10 production proof
- Render Blueprint/runtime dependency reconciliation: #964 **DONE**
- Cloud-primary diarization: #970 after #941
- Persisted multimodal alignment: #971 after #970
- Persisted old-case playback/transcript/artifact rehydration: #963 after the runtime/provider evidence gates
- Frontend pipeline-contract correction: #965 before final browser/golden verification
- Login wake/shared self-profile candidate: draft PR #974 under #931; not merged into current `main`
- Developer Console manual Wake API/chrome candidate: draft PR #986 under #981; not merged into current `main`

The backend and frontend have separate release numbers. Backend source authority is `VoxVector/pyproject.toml`; frontend source authority is `voxvector/package.json`. Production API version, runtime self-test, provider configuration, process identity, memory settings and other `/health` fields remain runtime observations and must not be advanced merely because source, deployment metadata or documentation changes.

A forced-fresh `/health` readback at `2026-09-11T04:31:47.647002Z` returned HTTP 200 from exact deployed source `1cc10f40...` with `status=ok`, runtime self-test `passed`, process instance `0f629722-aa1c-4bab-8151-0c720945b78b`, Render instance `srv-da2f88n40ujc73a8m26g-hibernate-57dd8fc574-f82n8`, 512 MiB memory reference, 416 MiB Stage-10 admission ceiling, faster-whisper execution readiness, and cloud-primary `pyannote_api` readiness. That is current runtime/readiness evidence, not provider execution.

The canonical engineering-MVP exit criteria are maintained in [`MVP_RELEASE_GATE.md`](MVP_RELEASE_GATE.md).

## Current deployment roles

| Surface | Endpoint / role | Current status |
|---|---|---|
| Public React application | `https://darenprince.com/voxvector/` | Canonical GitHub Pages frontend; exact-main Pages workflow `34557928184` succeeded for `1cc10f40...`; browser verification remains separate |
| Original API | `https://voxvector.crownlabs.tech` | Preserved Render API; deploy `dep-dahnv7p42hec739o7phg` is `live` on exact `1cc10f40...`; forced-fresh `/health` returned HTTP 200 and exact source revision |
| AWS API environment | `https://awsapi.crownlabs.tech` | Separate environment; not substituted for Render production evidence |
| Authentication/persistence/diagnostics/private media | Supabase | Configured boundary; project `tawtkawmjqabydnatavx` observed `ACTIVE_HEALTHY`; browser acceptance remains separate |

Render hosting the API does not make Render the durable media store. GitHub Pages publishing the React artifact does not make Pages the API host. Supabase owns configured auth/persistence/diagnostics/private media, not analytical classification logic.

The current Render deployment is recorded with trigger `deploy_hook`. That deployment metadata alone does not establish the complete authenticated Developer Console **Deploy Now** browser path owned by #920; no matching protected POST request was established by the log query used in this synchronization.

## Current exact-main software QA

GitHub Actions on exact `main` `1cc10f40bb6b94e0a8f3380c1b70529137e89d93` reports:

- VoxVector QA run `34560251931`: `success`;
- API test step: success;
- React application contract-test step: success;
- React production-build step: success;
- Deploy GitHub Pages run `34557928184`: `success`.

These are repository/build/publication workflow results. The separate Render deployment and forced-fresh `/health` establish current backend deployment/readiness for the same source revision. They do not establish controlled provider execution on `1cc10f40...`, browser verification or scientific validation.

## Controlled production result — historical evidence from 2026-09-10

The controlled reference WAV evidence below belongs to deployed source `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2`. It is intentionally preserved as historical incident/provider evidence and is not relabeled as execution of current `1cc10f40...`.

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

This is real historical provider-execution evidence. It is not evidence that current `1cc10f40...` has completed the same path, transcript truthfulness, browser verification or scientific validation.

## Merged #941 source repair and active production proof

PR #962 merged the first containment/durability foundation. PR #967 then merged the reviewed follow-up. Those repairs remain present in current `main`.

The current source:

- avoids importing PyTorch solely for cleanup on the CPU transcription path;
- checkpoints completed acquisition/transcript/alignment/provider state to the same persisted run before downstream Stage 10 work;
- records only state/count metadata in checkpoint diagnostics rather than transcript text;
- performs Stage 10 operational memory admission before representing Stage 10 as running;
- uses fail-fast process-wide single-flight admission for the composite Stage 10 analysis boundary;
- rechecks RSS while holding the shared heavyweight lock and retains that lock through composite execution;
- prevents a competing request from waiting behind that lock and later executing abandoned heavyweight work after its route has already failed;
- uses a fresh Python-process `process_instance_id` distinct from Render infrastructure identity;
- preserves the stable persisted route-owned `run_id` and stores the pipeline-internal UUID separately as `pipeline_run_id`;
- exposes safe process/Render identity and memory-admission information through the runtime contract.

Issue #964 is now closed completed, including direct service-inventory verification. #941 is therefore the active runtime acceptance gate.

Current preflight after exact `1cc10f40...` became live found no controlled Analyze invocation in Render logs and no case/analyze request in the checked post-deployment Supabase request-log window. The protected endpoint requires the owner's authenticated VoxVector session and must not be bypassed through service tools.

## Current 21-stage pipeline

| Stage | Runtime/source contract state |
|---:|---|
| 01 File Upload / Ingest | implemented; prior controlled 17.6 MB uploads succeeded; intermittent #930 remains open |
| 02 File Decode and Normalization | implemented |
| 03 Provenance and Integrity | implemented |
| 04 Channel and Recording Assessment | implemented |
| 05 Speech Segmentation | implemented foundation; historical controlled run completed 26 segments |
| 06 Speaker Identification / Diarization | cloud-primary provider path configured/ready; controlled pyannoteAI execution required under #970 |
| 07 Transcription Generation | historical controlled beam-1 faster-whisper execution observed; current configuration ready; exact-current controlled readback requires #941 |
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

The canonical backend stage order is Speech Segmentation at 05 and Speaker Identification / Diarization at 06. Current `voxvector/src/components/PipelineBuildCard.jsx` still preserves the stale opposite local order and queued Stage 07/08 text on `main`; #965 owns that existing-component synchronization defect.

Current maturity remains **16 implemented or built runtime foundations** with four conditional/intentionally not-invoked stages and one queued stage in the current `/health` pipeline projection. This count does not mean validated deception indicators.

## Memory safety and artifact durability

The constrained execution sequence is:

`provider completion → provider cleanup → durable same-run upstream checkpoint → Stage 10 route preflight → fail-fast shared Stage 10 admission + locked RSS recheck → downstream composite analysis while the lock remains held`

Current fresh runtime readback reports:

- memory reference `512 MiB`;
- Stage-10 admission ceiling `416 MiB`.

A memory-admission rejection is operational runtime safety. It is not analytical Stage 09 Eligibility and Reliability and must not be presented as a scientific result.

## Process and Render instance identity

`process_instance_id` identifies the current Python API process and must change when that process restarts. The fresh runtime readback observed `0f629722-aa1c-4bab-8151-0c720945b78b`.

`render_instance_id` identifies Render infrastructure when available. The fresh runtime readback observed `srv-da2f88n40ujc73a8m26g-hibernate-57dd8fc574-f82n8`. It can remain stable across an internal Python/Uvicorn restart, so it cannot serve as the sole worker identity for interruption recovery.

## Speech runtime readiness and execution

### Transcription

Fresh `/health` reports faster-whisper configured and execution-ready as `base`, CPU/int8, beam 1, one CPU thread, one worker, isolated child process and 165-second child deadline.

That profile has historical controlled execution evidence on `f0dda136...`. Exact-current provider execution/readback remains required under #941. Readiness is not execution.

### Diarization

The canonical primary path remains pyannoteAI cloud through `pyannote_api`. Fresh `/health` reports the API key configured and primary execution ready; local fallback is `none`, disabled, and the local adapter is not installed in the constrained Render image.

`VOXVECTOR_ENABLE_DIARIZATION_RUNS` remains a separate invocation gate. Controlled cloud-primary execution and persisted speaker artifact readback remain required under #970.

## Render Blueprint configuration state

Git contains one canonical root `render.yaml`.

Canonical root `render.yaml` and the connected Render service both build:

`pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`

The cloud-primary Render runtime excludes the optional local pyannote/Torch dependency stack. Optional local Community-1 capability remains isolated in its dedicated local/container path. Explicit production CORS and bounded transcription/memory/thread settings remain source-controlled; protected credentials remain server-managed.

Issue #964 is closed completed. Its final external gate was direct Render workspace inventory, which returned exactly one VoxVector API service. Configuration reconciliation is not provider execution.

## Run lifecycle recovery

Issue #945 / PR #946 remains complete at source/merge boundaries and provides Case History reconciliation, terminal run/failure reports, real elapsed timing, historical source-revision preservation, terminal metadata backfill and same-process per-case serialization.

Merged #962/#967 strengthen that canonical lifecycle with durable pre-Stage-10 provider checkpointing, true process identity and stable route-owned run identity.

## Developer Console and observability

The Developer Console remains the engineering cockpit for runtime health, case workflow, 21-stage state, live run polling, diagnostics, Render status/logs, methodology, structured audits, report/log export controls and protected deployment actions.

PRs #961, #966 and #968 are merged into current source. Issue #959 owns **production acceptance**: confirm correlated Render + Supabase copies on a controlled run, generate/inspect a real Debug Bundle, complete the automatic terminal Render snapshot gap and record authenticated browser readback separately.

Issue #981 / draft PR #986 is a separate frontend-only Developer Console refinement adding a manual health-backed Wake API action, opaque compact Case Workflow rail and duplicate drawer-account presentation cleanup. Its exact-head QA and PR Preview pass, but authenticated desktop/mobile browser verification remains open and it is not merged into current production.

## Authentication and administrator state — issue #931 / draft PR #974

The prior administrator Edge Function infrastructure blocker is resolved at the previously verified infrastructure boundary: `voxvector-user-admin` was ACTIVE version 2 with JWT verification enabled, and the verified trusted-role inventory contained an admin, developer and user.

Draft PR #974 contains the candidate one-shot login wake repair and generalizes the existing self-profile implementation across developer/admin/user roles without creating duplicate profile stores. The user workspace receives User Profile; the existing Developer Console profile route becomes role-aware for Developer Profile/Admin Profile; Admin User Management remains separately privileged.

PR #974 is not current production behavior. #931 requires current-main integration QA/Preview plus authenticated desktop/mobile browser verification and profile save/reload before closure.

## Active issue state

- #941 — **P0 ACTIVE.** Exact current deployment/readiness is proven; one authenticated same-WAV controlled run and durable readback remain.
- #970 — **P0 Blocked on accepted #941 proof.** Cloud-primary pyannoteAI contract correction/execution/persistence.
- #971 — **P0 Blocked on #970 + accepted #941 proof.** Persist transcript/audio/speaker alignment.
- #963 — **P0 queued after runtime/provider evidence.** Historical-case audio/transcript/speaker/alignment/report rehydration.
- #930 — **P0 release blocker.** Intermittent pre-handler upload 400 requires bounding before candidate freeze.
- #959 — **P0 production acceptance open.** Merged observability/debug source; real dual-copy/bundle/terminal-capture proof remains.
- #965 — **P0 Ready before final browser freeze.** Correct current frontend pipeline projection from backend contract.
- #931 / PR #974 — **P0 auth/account candidate + browser matrix.** Candidate source not merged; current-main integration/browser acceptance required.
- #932 — **P1 release-critical frontend navigation.** Complete before final browser/golden freeze.
- #981 / PR #986 — **P1 Developer Console candidate.** Source QA/Preview complete; authenticated desktop/mobile browser verification and merge remain.
- #920 — **P1 browser verification.** Current `deploy_hook` deployment metadata does not by itself verify protected Developer Console Deploy Now.
- #948 / PR #951 and #949 / PR #952 — separate secure-deletion/cancellation work, not the current source task.
- #928, #958, #927 — remain mapped in tracker #915.
- #964 — **DONE.** Sole Render Blueprint/runtime dependency reconciliation and no-duplicate-service inventory accepted.
- #972 — **P0 final gate, blocked.** Freeze only after prerequisites and pass two complete same-revision/configuration golden cases.

## Supabase current boundary

Supabase is the configured durable persistence boundary for cases, private media, diagnostics and authentication. The project is currently observed `ACTIVE_HEALTHY`.

At the current preflight query, `voxvector-logs` contained 4,976 objects and `voxvector-media` contained 25 objects. Multiple owner-scoped 17,596,936-byte WAVs remain present. Historical persistence does not by itself prove the current #941 case mapping or browser rehydration; #941 requires canonical case/run checkpoint readback, and #963 owns the old-case browser return path.

## Manual Render deployment control

The canonical Developer Console includes **Deploy Now**, calling `POST /v1/developer/render/deploy` server-side. Render production auto-deploy remains intentionally disabled.

Current deployment metadata reports trigger `deploy_hook`; the synchronization log query did not establish the matching protected POST request. #920 still requires:

`Developer Console action → server deploy-hook accepted → new Render deploy → intended commit → live → backend source_revision → fresh /health → browser/runtime verification where required`

## Current engineering sequence

1. complete #941 with one authenticated same-WAV controlled run on exact deployed `1cc10f40...`, correlating provider/checkpoint/Stage-10/process/memory evidence;
2. execute/persist cloud-primary diarization under #970;
3. persist/read back transcript/audio/speaker alignment under #971;
4. complete #963 historical case rehydration;
5. bound #930 authenticated upload reliability and #959 production observability acceptance;
6. correct the existing frontend pipeline projection under #965;
7. refresh/complete #931 / draft PR #974 integration and browser/profile acceptance;
8. complete #932 release-critical CTA/anchor/navigation behavior;
9. complete #981 / PR #986 authenticated browser acceptance when an eligible session is available;
10. freeze one exact candidate revision/configuration and complete #972 two-run golden proof;
11. continue scientific validation separately.

## Evidence and scientific boundary

No single vocal, acoustic, linguistic, behavioral, emotional or psychological feature proves deception. Candidate classification and final disposition remain separate from eligibility/reliability and evidence collection. Validation and calibration remain a distinct gate.

Source, repository QA, Pages publication, Render deployment, fresh `/health` runtime readback, provider execution, artifact persistence, browser verification, engineering-MVP completion and scientific validation are different claims.