# VoxVector QA Status

**Living software QA record**

This document separates repository QA from deployment/runtime/provider/browser/scientific evidence.

## Current synchronized baseline

The 2026-09-12 systemwide reconciliation started from GitHub `main` revision `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80`.

Exact-baseline VoxVector QA run `34679916767` completed **successfully**.

That baseline includes merged PR #993 frontend navigation/site-map/pipeline projection work and merged PR #997 landing-cascade cleanup. Documentation synchronization commits after that baseline make `main` newer and therefore require their own CI before they can be called exact-head QA verified.

## Version authorities

- backend source: **0.2.27**
- public React application: **0.2.37**
- frontend and backend remain independent release streams

## Current source-level frontend truth

Merged current source includes:

- Request Access routed to the canonical login;
- route-qualified public anchors and restored hash navigation;
- human site map and direct React route publication support;
- styled Pipeline and Analysis Methods destinations;
- canonical Stage 05 Speech Segmentation → Stage 06 Speaker Identification / Diarization order;
- `PipelineBuildCard.jsx` preferring backend `pipeline_build.status_by_stage` for mutable stage state;
- one-shot login-time `/health` wake through `AuthGate.jsx` / `wakeApi()`;
- shared role-aware self-profile implementation;
- obsolete landing CSS retired from production style ownership so canonical hero artwork is not darkened by the legacy cascade.

Historical PR #974 was closed without merge and is not the current auth/profile authority. Historical PR #986 is likewise not the authority for current Developer Console behavior. Current repository source is authoritative.

## Current Supabase operational evidence

Connected inspection during the same reconciliation pass found:

- project `VoxVector` ACTIVE_HEALTHY;
- PostgreSQL 17.6;
- RLS on inspected operational tables;
- `voxvector-user-admin` ACTIVE at version 2 with JWT verification;
- 1,393 API request records in the last 24 hours;
- one 5xx and 271 4xx request records in that window;
- two open error records in that window;
- current request-log entries tagged with source revision `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80`;
- 6,405 private log objects and 28 private media objects.

This is persistence/diagnostic evidence. It is not exact current `/health`, Render deployment status, provider execution or browser verification.

## Latest retained fresh backend health evidence

The latest separately retained forced-fresh `/health` evidence was observed on 2026-09-11 for source `1cc10f40bb6b94e0a8f3380c1b70529137e89d93` and reported:

- HTTP 200;
- `status=ok`;
- backend/pipeline version **0.2.27**;
- runtime self-test passed;
- 512 MiB memory reference and 416 MiB Stage-10 admission ceiling;
- faster-whisper base / CPU / int8 / beam 1 / one thread / one worker / isolated process / 165-second timeout ready;
- cloud-primary `pyannote_api` configured and execution-ready;
- local fallback disabled in that constrained runtime.

Do not relabel that older health payload as a fresh readback for the current documentation-sync head.

## Historical real provider execution

A controlled 183.3-second WAV on older deployed source `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2` established real faster-whisper execution:

- speech segmentation completed with 26 segments;
- faster-whisper ran `base`, CPU/int8, beam 1, one CPU thread, one worker, isolated child process;
- transcription completed in about 113 seconds;
- output contained 58 timestamped transcript segments and 246 timestamped words.

That same historical run exposed the downstream constrained-memory failure that the later Stage 10 safety work was designed to contain. Historical provider execution is not current repeatability proof.

## Current implementation/evidence matrix

| Area | Source state | Evidence already established | Remaining acceptance |
|---|---|---|---|
| 21-stage contract | implemented | backend source/tests | stage-specific runtime and scientific maturity |
| Public navigation / site map | merged | source + exact-baseline QA | desktop/mobile browser acceptance |
| Frontend pipeline projection | merged | source + exact-baseline QA | authenticated browser acceptance |
| Landing hero cascade cleanup | merged | source + exact-baseline QA | desktop/mobile visual readback |
| Login-time API wake | merged current source | source/tests | authenticated cold/warm browser observation |
| Shared user/admin/developer self-profile | merged current source | source/tests | save/reload browser acceptance |
| Authenticated source upload | implemented | historical successful large WAV persistence | #930 intermittent 400 bounding |
| Private source persistence | implemented | Supabase objects and historical cases | #963 reopen/playback/artifact acceptance |
| faster-whisper | integrated | historical real provider execution | #941 current controlled repeatability |
| Stage 10 memory admission | merged foundation | source/tests | #941 controlled production proof |
| pyannoteAI cloud primary | wired | source/readiness evidence | #970 real execution/persistence |
| Multimodal alignment | foundation | source/tests/historical partial evidence | #971 current durable proof |
| Dual operational observability | merged foundation | active Supabase diagnostics | #959 real dual-copy/debug-bundle acceptance |
| Candidate/final disposition | guarded foundation | source/tests | no validated deception inference claimed |

## Current release-critical order

1. #941
2. #970
3. #971
4. #963
5. #930
6. #959
7. authenticated desktop/mobile acceptance of already-merged frontend/auth changes
8. #972 two complete same-revision/configuration golden cases
9. scientific validation program separately

## Current hardening findings

Supabase advisory review currently identifies:

- SECURITY DEFINER review required for `developer_dashboard_summary()` exposure;
- leaked-password protection disabled;
- unindexed foreign keys;
- some RLS auth-function reevaluation inefficiencies;
- unused `error_reports` indexes.

These findings belong to engineering hardening and must not be confused with scientific model validation.

## Evidence boundary

A passing test suite is software QA. A GitHub commit is source state. Pages publication or backend deployment is distribution state. `/health` is runtime state. Provider execution is workload state. Durable case artifacts are persistence state. Browser acceptance is UX/integration evidence. Two golden cases are engineering repeatability evidence. None of those, alone or together, establishes scientifically validated deception inference.
