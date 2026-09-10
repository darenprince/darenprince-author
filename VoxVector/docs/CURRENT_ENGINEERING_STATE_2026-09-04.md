# VoxVector Current Engineering State — 2026-09-04

## Canonical runtime snapshot

This is the current engineering snapshot for the active VoxVector repository state. Historical checkpoints remain preserved separately and are not current status evidence.

- Repository: `darenprince/darenprince-author`
- Branch: `main`
- Canonical backend root: `VoxVector/`
- Canonical frontend root: `voxvector/`
- Repository synchronization checkpoint before issue #954 reconciliation: `5d8b6a415609a0a4195cea82fdc795b633d3f505`
- Backend source release: `0.2.27`
- Frontend source release: `0.2.37`
- Exact-main VoxVector QA at that checkpoint: #1989 / `34428496308`, `success`
- Exact-main GitHub Pages workflow at that checkpoint: #1709 / `34428497382`, `success`
- Exact-main CodeQL push run at that checkpoint: #78 / `34428495545`, `success`
- Latest observed live Render deployment source revision: `c21b4cf07f6475eddb15c99e67f1ff70d6a50167`
- Latest observed Render deploy: `dep-dah0g13l550s73d2dbb0`, trigger `api`, status `live`
- Render production auto-deploy: disabled
- Supabase project: `VoxVector` (`tawtkawmjqabydnatavx`)
- Connected Supabase Edge Functions at the latest synchronization: none deployed
- Maximum sample rate: `48,000 Hz`
- Maximum media size: `262,144,000 bytes`
- Current engineering-MVP intake blocker: intermittent case-source upload HTTP 400 tracked in #930, ready for production reproduction on the deployed diagnostics
- Current active source task: issue #954 / PR #956, Render operational-state presentation in the existing Developer Console

The backend and frontend have separate release numbers. Backend source authority is `VoxVector/pyproject.toml`; frontend source authority is `voxvector/package.json`. Production API version, runtime self-test, media/storage readiness and provider readiness remain runtime observations from `/health` and must not be advanced merely because source, documentation or deployment state changed.

The repository revision and Render backend revision are currently different because PR #955 was documentation/audit synchronization only and did not redeploy the backend. That is expected evidence separation, not a deployment failure.

The canonical engineering-MVP exit criteria are maintained in [`MVP_RELEASE_GATE.md`](MVP_RELEASE_GATE.md).

## Current deployment roles

| Surface | Endpoint / role | Current status |
|---|---|---|
| Public React application | `https://darenprince.com/voxvector/` | Canonical GitHub Pages frontend; #1709 published the #955 synchronization merge |
| Original API | `https://voxvector.crownlabs.tech` | Preserved Render API; deployment `dep-dah0g13l550s73d2dbb0` is live on backend source `c21b4cf07f6475eddb15c99e67f1ff70d6a50167` |
| AWS API environment | `https://awsapi.crownlabs.tech` | Separate historical benchmark environment; not part of active QA gating |
| Authentication/persistence/diagnostics/private media | Supabase | Configured boundary; administrator Edge Function source is not currently deployed |

Render hosting the API does not make Render the durable media store. GitHub Pages publishing the React artifact does not make Pages the API host. Supabase stores authenticated persistence/media/diagnostic state but does not own analytical classification logic.

The current Render deploy was triggered through Render's API. It is deployment evidence only and does **not** verify issue #920's authenticated Developer Console **Deploy Now** / server-side deploy-hook path.

A successful Render bridge/control-plane request also does not establish that the service itself is live. The Developer Console must keep bridge connectivity, service lifecycle, latest deployment lifecycle and `/health` runtime evidence separate.

## Current 21-stage pipeline

| Stage | Runtime contract state |
|---:|---|
| 01 File Upload / Ingest | implemented foundation; intermittent production 400 remains open in #930 |
| 02 File Decode and Normalization | implemented |
| 03 Provenance and Integrity | implemented |
| 04 Channel and Recording Assessment | implemented |
| 05 Speech Segmentation | implemented foundation |
| 06 Speaker Identification / Diarization | queued provider path; cloud-primary controlled execution required |
| 07 Transcription Generation | built integration path; isolated faster-whisper execution; controlled provider verification required |
| 08 Transcript Alignment | built synchronized foundation; provider-backed verification required |
| 09 Eligibility and Reliability | implemented |
| 10 Acoustic Feature Extraction | implemented |
| 11 Prosodic and Voice Quality Analysis | implemented foundation |
| 12 Temporal and Pause Analysis | implemented foundation |
| 13 Linguistic and Disfluency Analysis | conditional on transcript artifact |
| 14 Question / Answer Alignment | conditional |
| 15 Within Speaker Baseline | conditional |
| 16 Cross Method Evidence Assembly | implemented foundation |
| 17 Evidence Convergence and Conflict | implemented foundation |
| 18 Candidate Classification | implemented guarded foundation |
| 19 Validation and Calibration Gate | not invoked |
| 20 Final Classification / Disposition | implemented guarded foundation |
| 21 Audit and Provenance Output | implemented foundation |

Current maturity remains **16 implemented or built runtime foundations**, **4 conditional or intentionally not-invoked stages**, with speaker execution still queued for controlled cloud-primary verification. Provider readiness does not promote a stage to verified execution and does not establish scientific validation.

## Speech runtime readiness

### Transcription

The canonical implementation supports faster-whisper. The September 9 repair defaults the provider to a disposable spawned child process with a hard local deadline, one CPU thread, one worker, beam size 1, CPU/int8 execution, explicit cleanup, and dependency-ordered evidence acquisition.

That source repair is included in the deployed Render revision. This is not controlled provider-execution evidence. Issue #941 remains open for fresh `/health` settings readback, controlled real-audio transcription, Render memory/instance correlation, and persisted transcript/run artifact readback.

### Diarization

The canonical implementation supports pyannoteAI cloud primary plus explicit local pyannote Community-1 fallback architecture. Provider configuration/readiness, local-adapter installation, Hugging Face token presence, pyannote API-key presence, primary readiness, fallback readiness, route-gate state, and actual execution remain separate evidence fields.

The case-analysis invocation gate `VOXVECTOR_ENABLE_DIARIZATION_RUNS` remains separate from provider configuration/readiness. A successful controlled cloud-primary run and persisted speaker artifact are required before execution is promoted.

## Run lifecycle recovery — issue #945 / PR #946

Issue #945 is closed. PR #946 merged the canonical CaseStore/run-lifecycle recovery and report work into source ancestry now present in both current repository main and the deployed Render backend revision.

Merged behavior:

- eligible stale/deadline-expired persisted `running` runs can be reconciled from Case History and individual case reads;
- a legitimate current-worker run with a usable configured stage deadline is preserved until that deadline expires;
- interruption recovery marks the active stage `failed` and unfinished dependent stages `not_run` with explicit reason;
- active and terminal elapsed time is real, not simulated;
- terminal `run_report` metadata is persisted, and failed / `completed_with_failures` runs persist a `failure_report`;
- historical source revision is preserved rather than fabricated from a later reader runtime;
- legitimate terminal metadata backfill is persisted;
- Case History reconciliation, explicit reconciliation, `update_run`, source mutation and deletion use the same per-case in-process serialization owner;
- `CaseAnalysisWorkspace` exposes Copy/Download controls for the persisted run report;
- explicit diarization fallback retains primary/fallback failure provenance.

Production Case History reconciliation/report readback remains unverified. The per-case lock is not represented as cross-process compare-and-swap protection for a future horizontally scaled object-store writer model.

## Runtime provenance and QA

Repository synchronization PR #955 merged as `5d8b6a415609a0a4195cea82fdc795b633d3f505` and then passed exact-main VoxVector QA #1989, Deploy GitHub Pages #1709 and CodeQL #78. That merge was documentation/audit synchronization only.

Connected Render deployment `dep-dah0g13l550s73d2dbb0` remains live on backend source `c21b4cf07f6475eddb15c99e67f1ff70d6a50167`. This establishes a separately observed backend deployment identity; it must not be rewritten as `5d8b6a...` merely because repository documentation advanced. A fresh complete `/health` payload has not yet been recorded for the latest synchronization.

## Render operational status projection — issue #954 / PR #956

Issue #954 tightens the existing Developer Console status projection without changing Render deployment policy, backend service behavior, analysis execution, authentication, or scientific methodology.

The PR #956 source behavior is:

- `voxvector/src/lib/renderOperationalState.js` is the single frontend normalization owner for Render lifecycle presentation;
- only an `ACTIVE`/`LIVE` service combined with an `ACTIVE`/`LIVE` latest deployment is green/healthy;
- pending, queued, building, deploying, updating and other in-progress states are transitional rather than healthy;
- suspended, deactivated, failed, unavailable and unreported states are explicit attention/error states;
- the compact live engineering rail is red whenever the combined Render service/deployment state is anything other than terminal-live, including transitional states;
- Developer Overview requests Render status while the dashboard itself is open and adds a full-card color-coded Render Service block;
- API, Runtime, Pipeline, Transcription and Render Service blocks carry always-visible subtext such as version, revision, provider, stage-count, region and deploy context;
- Render Runtime separates authenticated bridge connectivity from operational state and color-codes service and deployment blocks independently;
- missing Render state is not defaulted to `Active`.

PR #956 was reconciled after PR #955 advanced `main`; the reconciliation preserves #955's current repository/runtime evidence and #956's canonical Developer Console source changes. These statements remain source-level behavior until final exact-head QA/review, merge, Pages publication and browser verification are separately established.

## Developer Console requirements and current shell

The Developer Console remains the engineering cockpit for current API revision, commit-specific QA, 21-stage state, speech readiness, Render runtime/deployment state and logs, structured audits, export controls, documentation traceability and the protected manual Render deployment trigger.

The existing `DeveloperEngineeringStatus` remains the single engineering rail under `SiteHeader`. PR #956 changes status semantics and coloring inside that canonical owner; it does not introduce a second rail or dashboard implementation.

## Authentication and administrator state — issue #931

The canonical role-aware login and protected routing are merged. `/voxvector/login/` has a physical Pages entry generated from the same React build; no duplicate login implementation exists. PR #943 also prevents the login Motion wrapper from starting opacity-zero.

The deployed Render source contains backend operator authorization for trusted `developer` and `admin` roles. The connected Supabase project currently lists no deployed Edge Functions, so `voxvector-user-admin` must still be deployed and verified before the administrator console can be called operational. Trusted admin assignment plus authenticated developer/admin/user browser verification also remain open.

## Active issue state

- #954 / PR #956 — **In progress.** Render operational-state Developer Console source has been reconciled onto the #955 repository state; final exact-head QA/review, merge/publication, and browser verification remain separate gates.
- #930 — **Ready for production reproduction/verification.** Live Render source includes the bounded pre-handler upload diagnostics; exact root cause and authenticated upload evidence remain open.
- #941 — **Ready for controlled production transcription verification.** Source repair is deployed; provider execution, memory behavior, transcript artifact readback, and supported cleanup remain open.
- #920 — **Blocked on authenticated Developer Console action.** Current Render deployment was API-triggered and does not verify the protected deploy-hook path.
- #931 — **Blocked on Supabase administrator deployment/role/browser evidence.** Login and role source are merged; `voxvector-user-admin` is not deployed.
- #948 / draft PR #951 — **In progress.** Secure deletion receipt/concurrency/recovery review work remains; not merge-ready.
- #949 / draft PR #952 — **In progress.** Only the frontend cancellation API action exists at the current checkpoint; server lifecycle and workspace wiring remain.
- #932 — **Ready.** The canonical login-route dependency exists.
- #928 — **Blocked by #930** until intake reliability is sufficiently bounded.
- #927 — **Browser verification pending** for merged startup/version/icon presentation.
- #935 — **Done.** The Node-24-backed GitHub Action wrapper migration and required post-merge audit record are complete.

## Supabase current boundary

Earlier connected inspection reported project `VoxVector` `ACTIVE_HEALTHY` and two known security-advisor warnings: authenticated execution of the guarded `public.developer_dashboard_summary()` SECURITY DEFINER RPC and disabled leaked-password protection. Those warnings are not represented as fixed by this work.

Latest Edge Function inventory returned no deployed functions. That is the controlling evidence for the production status of `voxvector-user-admin`.

## Manual Render deployment control

The canonical Developer Console includes a **Deploy Now** control on the Render Runtime surface. It calls the authenticated server-side route `POST /v1/developer/render/deploy`. Render production auto-deploy is intentionally disabled.

A successful trigger response means only that Render accepted a deployment request. Required #920 evidence remains:

`Developer Console action → server deploy-hook request accepted → new Render deploy observed → intended commit matched → deploy live → backend source_revision verified → fresh /health verified → browser/runtime verification when required`

The current API-triggered deployment is not substituted for that acceptance path.

## Current engineering sequence

1. finish #954 exact-head QA/review on the reconciled branch and merge only if clean;
2. publish the merged frontend through GitHub Pages and browser-verify Developer Overview and Render Runtime on desktop/mobile where tooling permits;
3. capture fresh `/health` on the deployed Render backend and preserve exact runtime/provider configuration fields;
4. reproduce or sufficiently bound #930 through authenticated upload/private persistence/provenance/playback;
5. execute controlled faster-whisper under #941 with Render memory/instance correlation and persisted transcript/run readback;
6. execute controlled pyannoteAI cloud-primary diarization with its route gate enabled and persist/read back speaker provenance;
7. verify transcript/speaker/alignment artifacts under the same case/run identity;
8. finish #948 and #949 as separate bounded source changes with exact-head QA and review;
9. deploy and verify the #931 Supabase administrator function and trusted admin boundary;
10. complete #932 and, after #930, #928;
11. complete authenticated desktop/mobile browser verification and history/reopen/report acceptance;
12. repeat the complete golden case on the same exact deployed revision before engineering-MVP sign-off;
13. keep scientific validation as a separate program.

## Evidence and scientific boundary

No single vocal, acoustic, linguistic, behavioral, emotional or psychological feature proves deception. Candidate classification and final disposition remain separate from eligibility/reliability and evidence collection. Validation and calibration remain a distinct gate.

Infrastructure health, provider execution, software tests and engineering-MVP completion must not be represented as scientific validation.
