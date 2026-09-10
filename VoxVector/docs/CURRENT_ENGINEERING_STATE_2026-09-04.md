# VoxVector Current Engineering State — 2026-09-04

## Canonical runtime snapshot

This is the current engineering snapshot for the active VoxVector repository state. Historical checkpoints remain preserved separately and are not current status evidence.

- Repository: `darenprince/darenprince-author`
- Branch: `main`
- Canonical backend root: `VoxVector/`
- Canonical frontend root: `voxvector/`
- Current canonical `main` source: `c21b4cf07f6475eddb15c99e67f1ff70d6a50167`
- Backend source release: `0.2.27`
- Frontend source release: `0.2.37`
- Exact-main VoxVector QA: #1963, `success`
- Exact-main GitHub Pages workflow: #1708, `success`
- Latest directly observed live Render deployment source revision: `c21b4cf07f6475eddb15c99e67f1ff70d6a50167`
- Latest directly observed Render deploy: `dep-dah0g13l550s73d2dbb0`, status `live`
- Render service suspension state at the direct 2026-09-09/10 observation: `not_suspended`
- Render production auto-deploy: disabled
- Supabase project `VoxVector` (`tawtkawmjqabydnatavx`): `ACTIVE_HEALTHY` at the 2026-09-09 connected inspection
- Current Render operational-status UI task: issue #954 on `fix/voxvector-render-operational-status-ui`; source changes remain unmerged until exact-head QA/PR evidence is complete
- Maximum sample rate: `48,000 Hz`
- Maximum media size: `262,144,000 bytes`
- Current engineering-MVP intake blocker: intermittent case-source upload HTTP 400 tracked in #930

The backend and frontend have separate release numbers. Backend source authority is `VoxVector/pyproject.toml`; frontend source authority is `voxvector/package.json`. Production API version, runtime self-test, source revision, media/storage readiness and provider readiness remain runtime observations from `/health` and must not be advanced merely because source or documentation changes.

The canonical engineering-MVP exit criteria are maintained in [`MVP_RELEASE_GATE.md`](MVP_RELEASE_GATE.md).

## Current deployment roles

| Surface | Endpoint / role | Current status |
|---|---|---|
| Public React application | `https://darenprince.com/voxvector/` | Canonical GitHub Pages frontend; #1708 succeeded on current main |
| Original API | `https://voxvector.crownlabs.tech` | Preserved Render API; manually deployed; latest directly observed deploy revision `c21b4cf07f...` reached `live` |
| AWS API environment | `https://awsapi.crownlabs.tech` | Separate historical benchmark environment; not part of active QA gating |
| Authentication/persistence/diagnostics/private media | Supabase | Configured boundary; connected project currently healthy |

Render hosting the API does not make Render the durable media store. GitHub Pages publishing the React artifact does not make Pages the API host. Supabase stores authenticated persistence/media/diagnostic state but does not own analytical classification logic.

A Render control-plane/API response also does not by itself establish live application service state. The console now treats normalized service state and latest deployment state as independent operational evidence, while `/health` remains the separate runtime verification boundary.

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

The canonical implementation supports faster-whisper. The September 9 repair defaults the provider to a disposable spawned child process with a hard local deadline, one CPU thread, one worker, beam size 1, CPU/int8 execution, and explicit cleanup. The route-level evidence-acquisition deadline remains an outer boundary.

The current main revision `c21b4cf07f6475eddb15c99e67f1ff70d6a50167` incorporates the run-lifecycle recovery/report work and passed exact-main VoxVector QA #1963. Direct Render inspection observed deploy `dep-dah0g13l550s73d2dbb0` for that same revision in terminal `live` state. Controlled real-audio transcription and persisted transcript artifact readback remain required before provider execution is called verified.

### Diarization

The canonical implementation supports pyannoteAI cloud primary plus explicit local pyannote Community-1 fallback architecture. Provider configuration/readiness, local-adapter installation, Hugging Face token presence, pyannote API-key presence, primary readiness, fallback readiness and overall execution readiness remain separate runtime fields.

The case-analysis invocation gate `VOXVECTOR_ENABLE_DIARIZATION_RUNS` remains separate from provider configuration/readiness. A successful controlled cloud-primary run and persisted speaker artifact are required before execution is promoted.

## Render memory hardening

The constrained Render service is treated as a bounded runtime budget. Current source includes heavyweight phase serialization, memory admission/headroom logic, RSS telemetry, explicit cleanup, bounded speech-frame processing, float32 normalized audio, dependency-ordered evidence acquisition and isolated faster-whisper child execution.

These source safeguards are operational engineering. They do not prove that every production recording fits the memory ceiling. Controlled provider execution with Render memory/instance correlation remains required.

## Run lifecycle recovery — issue #945 / PR #946

PR #946 extended the existing CaseStore and Analysis Workspace rather than creating a duplicate lifecycle or report system and is now merged into canonical main as `c21b4cf07f6475eddb15c99e67f1ff70d6a50167`.

Current source behavior:

- eligible stale/deadline-expired persisted `running` runs can be reconciled from Case History and individual case reads;
- a legitimate current-worker run with a usable configured deadline is preserved until that deadline expires;
- interruption recovery marks the active stage `failed` and unfinished dependent stages `not_run` with explicit reason;
- active and terminal elapsed time is real, not simulated;
- terminal `run_report` metadata is persisted, and failed / `completed_with_failures` runs persist a `failure_report`;
- historical source revision is preserved rather than fabricated from a later reader runtime;
- legitimate terminal metadata backfill is persisted;
- Case History reconciliation, explicit reconciliation, `update_run`, source mutation and deletion use the same per-case in-process serialization owner, preventing a stale history read/reconcile/write from overwriting a newer same-process run update in the current single-process/single-instance runtime;
- `CaseAnalysisWorkspace` exposes Copy/Download controls for the persisted run report;
- explicit diarization fallback retains primary/fallback failure provenance.

The per-case lock is not represented as cross-process compare-and-swap protection for a future horizontally scaled object-store writer model.

Merge and runtime chronology:

- `c332f58e88c73c89c036b127e5bbe57389d6ed05`: VoxVector QA #1917 success; PR Preview #797 success after the first lifecycle review fixes.
- `18777886bf28c6cac8fb13fc00d5b5653b15b20b`: VoxVector QA #1954 success; PR Preview #815 success after the history-write concurrency fix and focused regression test.
- `c21b4cf07f6475eddb15c99e67f1ff70d6a50167`: merged main; exact-main VoxVector QA #1963 success and GitHub Pages #1708 success.
- Render deploy `dep-dah0g13l550s73d2dbb0` was directly observed for `c21b4cf...` in terminal `live` state.

Production failure-report readback, controlled provider execution, authenticated browser verification, engineering-MVP proof, and scientific validation remain separate evidence gates unless independently observed.

## Runtime provenance and QA

The live Developer Console reads `/health`, GitHub Actions and the authenticated Render bridge separately so repository revision, QA result, Pages publication, Render service state, Render deployment state and runtime health are not collapsed into one synthetic status.

Current canonical main `c21b4cf07f6475eddb15c99e67f1ff70d6a50167` passed exact-main VoxVector QA #1963 and Deploy GitHub Pages #1708. Direct Render evidence observes the same revision in deploy `dep-dah0g13l550s73d2dbb0` with `live` deployment state and `not_suspended` service state. A fresh `/health` source-revision readback remains a distinct runtime-verification step.

## Render operational status projection — issue #954

Issue #954 tightens the existing Developer Console status projection without changing Render deployment policy, backend service behavior, analysis execution, authentication, or scientific methodology.

The source-level behavior on `fix/voxvector-render-operational-status-ui` is:

- `renderOperationalState.js` is the single frontend normalization owner for Render lifecycle presentation;
- only an `ACTIVE`/`LIVE` service combined with an `ACTIVE`/`LIVE` latest deployment is green/healthy;
- pending, queued, building, deploying, updating and other in-progress states are transitional rather than healthy;
- suspended, deactivated, failed, unavailable and unreported states are explicit attention/error states;
- the compact live engineering rail is red whenever the combined Render service/deployment state is anything other than terminal-live, including transitional states;
- the Developer Overview requests Render status while the dashboard itself is open and adds a full-card color-coded Render Service block;
- API, Runtime, Pipeline, Transcription and Render Service blocks carry always-visible subtext such as version, revision, provider, stage-count, region and deploy context;
- the Render Runtime page separates authenticated bridge connectivity from operational state and color-codes service and deployment blocks independently;
- no missing Render state is defaulted to `Active`.

These statements describe branch source behavior only until exact-head QA and PR evidence are complete. They do not establish publication, deployment, authenticated browser behavior, provider execution, or scientific validation.

## Developer Console requirements and current shell

The Developer Console remains the engineering cockpit for current API revision, commit-specific QA, 21-stage state, speech readiness, Render runtime/deployment state and logs, structured audits, export controls, documentation traceability and the protected manual Render deployment trigger.

PR #950 remains merged. The existing `DeveloperEngineeringStatus` is rendered immediately after `SiteHeader` as a real 34px sticky flow row beneath the 56px navigation. It has independent hide/expand/collapse controls, a full-height non-modal disclosure region and bottom-right Developer Console toasts. Issue #954 changes the status semantics and coloring inside those canonical owners rather than creating a second rail or dashboard implementation.

The console must not convert provider configuration into execution, a workflow success into deployment, a deployment into browser verification, or software QA into scientific validation.

## Supabase current boundary

Connected project inspection reports `ACTIVE_HEALTHY`. The security advisor still reports two known warnings: authenticated execution of `public.developer_dashboard_summary()` while it is `SECURITY DEFINER`, and disabled leaked-password protection. The summary RPC itself performs the existing `is_developer_admin()` authorization check. No schema, RLS, Auth role, function permission or secret was changed by the current Render-status UI task.

These warnings remain explicit security-hardening evidence and must not be silently represented as fixed.

## Manual Render deployment control

The canonical Developer Console includes a **Deploy Now** control on the Render Runtime surface. It calls the authenticated server-side route `POST /v1/developer/render/deploy`. Render production auto-deploy is intentionally disabled.

A successful trigger response means only that Render accepted a deployment request. Required evidence remains:

`hook accepted → new Render deploy observed → intended commit matched → deploy live → backend source_revision verified → /health verified → browser/runtime verification when required`

## Current engineering sequence

1. Finish #954 source/docs synchronization and exact-head QA/PR preview against the current main base.
2. Review the exact #954 diff for accidental changes and resolve any PR findings before merge recommendation.
3. Browser-verify the Developer Overview and Render Runtime at desktop and mobile widths, including live, transitional and attention-state presentation where a safe reproducible fixture or real provider state is available.
4. Merge #954 only if exact-head QA remains clean and the branch is synchronized with current main.
5. Treat GitHub Pages publication of the merged frontend separately from the already-live Render backend; #954 does not itself require a Render backend deployment.
6. Continue the separate #930 intermittent upload investigation and controlled provider execution program.
7. Execute controlled faster-whisper and correlate execution with Render memory/instance evidence.
8. Execute controlled pyannoteAI cloud-primary diarization when its route gate is enabled and persist/read back speaker provenance.
9. Persist transcript/speaker/alignment artifacts under the same case/run identity.
10. Repeat the complete golden case on the same exact deployed revision before engineering-MVP sign-off.
11. Keep scientific validation as a separate program.

## Evidence and scientific boundary

No single vocal, acoustic, linguistic, behavioral, emotional or psychological feature proves deception. Candidate classification and final disposition remain separate from eligibility/reliability and evidence collection. Validation and calibration remain a distinct gate.

Infrastructure health, provider execution, software tests and engineering-MVP completion must not be represented as scientific validation.