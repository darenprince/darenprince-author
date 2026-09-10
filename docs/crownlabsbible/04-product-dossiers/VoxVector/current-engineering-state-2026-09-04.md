# VoxVector Current Engineering State — 2026-09-04

This Crown Labs product/engineering mirror reflects the active VoxVector engineering state. Repository implementation and canonical `VoxVector/docs/` records remain authoritative.

## Runtime snapshot — 2026-09-10

- Current canonical `main`: `420536771875c6948be51851118b58cb04a596e6`
- Backend source release: `0.2.27`
- Frontend source release: `0.2.37`
- Exact-main VoxVector QA: `34532394431`, success
- Exact-main GitHub Pages publication workflow: `34532394423`, success
- Current Render deployment: `dep-dahi2ics728c73b6ujug`, `live`
- Current deployed backend source: exact `420536771875c6948be51851118b58cb04a596e6`
- Render deployment trigger: API
- Render deployment finished: `2026-09-10T21:36:23.3655Z`
- Render production auto-deploy: disabled
- Render plan/region: free / Oregon
- Live Render build: `requirements.txt` + `requirements-speech.txt`
- Canonical root `render.yaml`: `requirements.txt` + `requirements-transcription.txt`
- Owner Render export: `2026-09-10T21:38:48Z`, matching live service/root/build/start/health/domain/auto-deploy fields with environment values redacted
- Render Blueprint/live-service drift: #964
- Supabase project: `VoxVector` (`tawtkawmjqabydnatavx`)
- `voxvector-user-admin`: last verified ACTIVE, version 2, JWT verification enabled
- Latest verified trusted role inventory: 1 admin, 1 developer, 1 user
- Current first source/configuration task: #964
- Controlled runtime proof after #964: reopened #941
- Current auth/profile candidate: draft PR #974 under #931; not merged into current `main`

No fresh `/health` response for exact deployed `420536...` is recorded by the current synchronization pass. Repository QA, Pages publication, Render deployment, runtime health readback, provider execution, persisted artifact durability, browser verification, engineering-MVP completion, and scientific validation are separate evidence classes.

## Historical controlled production transcription and memory result

The 183.3-second / 17,596,936-byte controlled WAV on older deployed source `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2` successfully passed source upload/private persistence, speech segmentation, and faster-whisper transcription.

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

This remains valid historical provider/runtime evidence. It is not current `420536...` execution evidence.

## Merged #962/#967 reliability source and reopened #941 proof

The repair keeps the existing canonical backend pipeline and CaseStore and now exists in current source:

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

Issue #941 was closed at source merge while controlled production acceptance remained open and has been reopened. #964 should first establish the intended runtime dependency/configuration profile, then #941 must rerun the same controlled WAV and read back the merged behavior.

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

Current maturity remains 16 implemented/built analytical/runtime foundations, four conditional or intentionally not-invoked stages, with cloud-primary speaker execution still requiring controlled evidence.

## Runtime memory and durability contract

The constrained execution sequence is:

`provider completion → cleanup → durable same-run upstream checkpoint → Stage 10 route preflight → fail-fast shared composite admission + locked RSS recheck → downstream analysis while admitted`

Current source memory reference is 512 MiB with 96 MiB reserved headroom, producing a 416 MiB reference admission ceiling. These values are not a fresh current `/health` claim.

Memory admission is operational safety. It is not Stage 09 analytical Eligibility and Reliability and must not be represented as a scientific result.

## Provider state

### Transcription

Beam-1 faster-whisper has historical controlled production execution evidence on `f0dda136...`. The current release blocker is proving the merged durability/downstream memory-safe continuation on the reconciled runtime under #941.

### Diarization

The canonical primary remains pyannoteAI cloud through `pyannote_api`. `VOXVECTOR_ENABLE_DIARIZATION_RUNS` remains the explicit route invocation gate. Local Community-1 is an optional fallback only.

#970 owns rechecking the current provider API contract, real cloud-primary execution, persisted speaker artifact readback and provenance after #964/#941.

## Render Blueprint drift

The current live Render service and owner export install `requirements-speech.txt`, including optional local `pyannote.audio`/PyTorch. Canonical root `render.yaml` specifies the narrower `requirements-transcription.txt` path.

Root `render.yaml` also declares `CORS_ORIGINS` server-managed while the owner export does not list it and backend source defaults to `*` when unset. The export redacts environment values and must not be treated as proof of their values.

#964 owns deliberate dependency/configuration reconciliation into the existing root file. No second Blueprint or duplicate service should be created.

## Frontend and account state

Current `main` `AuthGate.jsx` still does not start the requested API wake at successful login. Draft PR #974 contains the candidate one-shot `/health` wake plus the shared role-aware developer/admin/user self-profile implementation. It reuses the existing `public.profiles` and private avatar boundary; trusted role/account ID remain read-only and authorization stays in trusted `app_metadata`.

PR #974 is not current/deployed behavior. Its prior integration QA predates the #967 main advance, so #931 requires a current-main refresh, current-base QA/Preview, merge review, and authenticated desktop/mobile/profile-save verification.

## Supabase and observability state

The administrator Edge Function was last verified active, correcting older records that described it as source-only. Remaining #931 work is current PR/browser/account behavior, not Edge Function bootstrap.

Merged PRs #961/#966/#968 provide the dual Render/Supabase observability and Debug Bundle source foundation. #959 remains open for production correlated dual-copy, real bundle/redaction, terminal Render capture, restart durability, and browser acceptance.

Supabase historical persistence does not itself prove browser rehydration; #963 owns that return path after upstream artifacts are established.

## Current implementation sequence

1. #964 — reconcile the sole Render Blueprint/runtime profile.
2. #941 — deliberately deploy/read back that runtime and rerun the controlled WAV.
3. #970 — execute/persist cloud-primary diarization.
4. #971 — persist/read back transcript/audio/speaker alignment.
5. #963 — historical-case source/playback/artifact rehydration.
6. #930 / #959 — intake reliability and production observability acceptance.
7. #965 — truthful frontend pipeline projection.
8. #931 / draft PR #974 — current-main integration, login wake/shared profiles, authenticated role/browser matrix.
9. #932 — release-critical public CTA/anchor/navigation repair.
10. #972 — freeze one exact revision/configuration and pass two complete golden cases.
11. Conduct scientific validation separately.

## Scientific boundary

No individual vocal, acoustic, linguistic, behavioral, emotional, or psychological feature is treated as proof of deception. Runtime memory containment, provider execution, deployment, browser verification and engineering-MVP completion are engineering evidence only and remain separate from scientific validation.
