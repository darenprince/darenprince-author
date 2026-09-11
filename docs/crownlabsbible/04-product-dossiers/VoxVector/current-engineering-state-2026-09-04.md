# VoxVector Current Engineering State — 2026-09-04

This Crown Labs product/engineering mirror reflects the active VoxVector engineering state. Repository implementation and canonical `VoxVector/docs/` records remain authoritative.

## Runtime snapshot — 2026-09-11

- Current canonical `main`: `1cc10f40bb6b94e0a8f3380c1b70529137e89d93`
- Backend source release: `0.2.27`
- Frontend source release: `0.2.37`
- Exact-main VoxVector QA: `34560251931`, success
- Exact-main GitHub Pages publication workflow: `34557928184`, success
- Current Render workspace: `tea-da2errdg1s2s73cl4eeg`
- Current Render service: `voxvector-api` (`srv-da2f88n40ujc73a8m26g`)
- Current Render deployment: `dep-dahnv7p42hec739o7phg`, `live`
- Current deployed backend source: exact `1cc10f40bb6b94e0a8f3380c1b70529137e89d93`
- Render deployment trigger: `deploy_hook`
- Render deployment finished: `2026-09-11T04:14:41.882165Z`
- Render production auto-deploy: disabled
- Render plan/region: free / Oregon
- Live Render build: `requirements.txt` + `requirements-speech.txt`
- Canonical root `render.yaml`: same `requirements.txt` + `requirements-speech.txt` cloud-primary build owner
- Confirmed workspace inventory: exactly one VoxVector API service; #964 closed completed
- Supabase project: `VoxVector` (`tawtkawmjqabydnatavx`), observed `ACTIVE_HEALTHY`
- `voxvector-user-admin`: last verified ACTIVE, version 2, JWT verification enabled
- Latest verified trusted role inventory: 1 admin, 1 developer, 1 user
- Current runtime gate: #941 same-WAV controlled Stage 10 production proof
- Current auth/profile candidate: draft PR #974 under #931; not merged into current `main`
- Current Developer Console Wake API/chrome candidate: draft PR #986 under #981; not merged into current `main`

Forced-fresh `/health` at `2026-09-11T04:31:47.647002Z` returned HTTP 200 from exact `1cc10f40...`, `status=ok`, runtime self-test `passed`, process instance `0f629722-aa1c-4bab-8151-0c720945b78b`, Render instance `srv-da2f88n40ujc73a8m26g-hibernate-57dd8fc574-f82n8`, 512 MiB memory reference, 416 MiB Stage-10 admission ceiling, faster-whisper execution readiness, and cloud-primary `pyannote_api` readiness.

Repository QA, Pages publication, Render deployment, runtime health readback, provider execution, persisted artifact durability, browser verification, engineering-MVP completion and scientific validation are separate evidence classes. Current readiness does not prove the still-unexecuted #941 controlled provider/Stage-10 run.

## Historical controlled production transcription and memory result

The 183.3-second / 17,596,936-byte controlled WAV on older deployed source `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2` successfully passed source upload/private persistence, speech segmentation and faster-whisper transcription.

Observed:

- Speech Segmentation completed with 26 segments;
- faster-whisper executed `base`, CPU/int8, beam 1, one CPU thread, one worker, isolated child process;
- transcription completed in about 113 seconds;
- 58 timestamped transcript segments and 246 timestamped words were returned;
- transcript alignment state was reached;
- API-parent RSS was about 134.75 MiB before post-provider cleanup and about 482.58 MiB afterward;
- VoxVector's configured downstream admission ceiling was 416 MiB;
- Stage 10 Acoustic Feature Extraction nevertheless started on that historical deployed source;
- Render sampled 519,041,020 bytes against a 536,870,900-byte service limit;
- the Python API process restarted shortly afterward;
- the owner confirmed the incident was a memory problem;
- source audio remained persisted in Supabase;
- Stage 07/08 lifecycle state survived, but the transcript/provider artifact had not been durably checkpointed before Stage 10.

Render did not emit a dedicated kernel OOM/SIGKILL record, so no exact OS termination mechanism is claimed.

This remains valid historical provider/runtime evidence. It is not current `1cc10f40...` execution evidence.

## Merged #962/#967 reliability source and active #941 proof

The repair keeps the existing canonical backend pipeline and CaseStore and remains present in current source:

- post-heavy cleanup does not import PyTorch merely to clean up a CPU faster-whisper path;
- completed acquisition/transcript/alignment/provider state is checkpointed to the same stable case run before Stage 10;
- checkpoint diagnostics use sanitized state/count metadata rather than transcript text;
- Stage 10 passes a process-RSS admission gate before being represented as running;
- downstream composite analysis uses fail-fast process-wide single-flight admission;
- an admitted composite call rechecks RSS under the shared lock and keeps the lock through execution;
- abandoned/timed-out competing requests cannot queue behind the heavy phase and execute later;
- insufficient headroom produces explicit downstream failed/not-run state while preserving completed upstream artifacts;
- `process_instance_id` remains a per-Python-process UUID;
- `render_instance_id` remains separate hosting-provider provenance;
- the stable route-owned `run_id` survives finalization and `pipeline_run_id` remains separate.

Issue #964 is closed completed, including direct Render workspace inventory. #941 is now the active runtime proof gate.

Current post-deployment preflight found no controlled Analyze request in Render logs and no case/analyze request in the checked post-deployment Supabase request-log window. The protected endpoint requires the owner's authenticated VoxVector session; service tools must not bypass that boundary.

## Canonical 21-stage pipeline

1. File Upload / Ingest
2. File Decode and Normalization
3. Provenance and Integrity
4. Channel and Recording Assessment
5. Speech Segmentation
6. Speaker Identification / Diarization
7. Transcription Generation
8. Transcript Alignment
9. Eligibility and Reliability
10. Acoustic Feature Extraction
11. Prosodic and Voice Quality Analysis
12. Temporal and Pause Analysis
13. Linguistic and Disfluency Analysis
14. Question / Answer Alignment
15. Within Speaker Baseline
16. Cross Method Evidence Assembly
17. Evidence Convergence and Conflict
18. Candidate Classification
19. Validation and Calibration Gate
20. Final Classification / Disposition
21. Audit and Provenance Output

The 05/06 order above is the current canonical backend contract. Current frontend `PipelineBuildCard.jsx` still carries the stale opposite local order and queued Stage 07/08 fallback text; #965 owns that synchronization defect in the existing component.

Current runtime `/health` projects 16 implemented/built foundations, four conditional or intentionally not-invoked stages and one queued stage. This maturity count does not mean validated deception indicators.

## Runtime memory and durability contract

The constrained execution sequence is:

`provider completion → cleanup → durable same-run upstream checkpoint → Stage 10 route preflight → fail-fast shared composite admission + locked RSS recheck → downstream analysis while admitted`

Fresh runtime evidence reports a 512 MiB memory reference and a 416 MiB Stage-10 admission ceiling.

Memory admission is operational safety. It is not Stage 09 analytical Eligibility and Reliability and must not be represented as a scientific result.

## Provider state

### Transcription

Fresh `/health` reports faster-whisper configured and execution-ready as `base`, CPU/int8, beam 1, one CPU thread, one worker, isolated child process and 165-second timeout.

Beam-1 faster-whisper has historical controlled production execution evidence on `f0dda136...`. The current release blocker is proving the merged durability/downstream memory-safe continuation on exact current production under #941. Readiness is not execution.

### Diarization

The canonical primary remains pyannoteAI cloud through `pyannote_api`. Fresh `/health` reports the API key configured and primary execution ready. Local fallback is `none`, disabled, and the local adapter is not installed in the constrained Render image.

#970 owns the current provider API contract, real cloud-primary execution, persisted speaker artifact readback and provenance after #941.

## Render Blueprint state

The live service and canonical root `render.yaml` both build `requirements-speech.txt` after `requirements.txt`. The constrained cloud-primary Render speech image excludes optional local `pyannote.audio`/Torch dependencies; optional Community-1 dependencies remain preserved in the dedicated local/container path.

The confirmed Render workspace contains exactly one VoxVector API service. #964 is therefore closed completed. Blueprint/service configuration is not provider execution.

## Frontend and account state

Draft PR #974 contains the candidate login-time `/health` wake plus shared role-aware developer/admin/user self-profile implementation. It remains unmerged and requires current-main integration/browser acceptance.

Issue #981 / draft PR #986 is a separate frontend-only Developer Console refinement. It adds a manual health-backed Wake API action to the existing engineering status surface, makes the compact Case Workflow tracker opaque/theme-aware and suppresses the duplicate drawer account/email/sign-out footer. Its exact-head QA and PR Preview pass; authenticated desktop/mobile browser verification remains open and it is not merged into current production.

## Supabase and observability state

Supabase project `tawtkawmjqabydnatavx` is observed `ACTIVE_HEALTHY`. At preflight, `voxvector-logs` contained 4,976 objects and `voxvector-media` contained 25 objects. Multiple owner-scoped 17,596,936-byte WAVs remain present, but direct storage-object-name search did not expose the historical #941 case/source UUIDs, so no object-name mapping is inferred without canonical case API/CaseStore readback.

Merged PRs #961/#966/#968 provide the dual Render/Supabase observability and Debug Bundle source foundation. #959 remains open for production correlated dual-copy, real bundle/redaction, terminal Render capture, restart durability and browser acceptance.

Supabase persistence does not itself prove browser rehydration; #963 owns that return path after upstream artifacts are established.

## Current implementation sequence

1. #941 — invoke the persisted 183.3-second WAV once from the authenticated Analysis Workspace on exact deployed `1cc10f40...` and correlate durable provider/checkpoint/Stage-10/process/memory evidence.
2. #970 — execute/persist cloud-primary diarization.
3. #971 — persist/read back transcript/audio/speaker alignment.
4. #963 — historical-case source/playback/artifact rehydration.
5. #930 / #959 — intake reliability and production observability acceptance.
6. #965 — truthful frontend pipeline projection.
7. #931 / draft PR #974 — current-main integration, login wake/shared profiles, authenticated role/browser matrix.
8. #932 — release-critical public CTA/anchor/navigation repair.
9. #981 / draft PR #986 — authenticated Developer Console wake/chrome browser acceptance when an eligible session is available.
10. #972 — freeze one exact revision/configuration and pass two complete golden cases.
11. Conduct scientific validation separately.

## Scientific boundary

No individual vocal, acoustic, linguistic, behavioral, emotional or psychological feature is treated as proof of deception. Runtime memory containment, provider execution, deployment, browser verification and engineering-MVP completion are engineering evidence only and remain separate from scientific validation.