# VoxVector Current Engineering State — 2026-09-04

This Crown Labs product/engineering mirror reflects the active VoxVector engineering state. The repository implementation and canonical `VoxVector/docs/` records remain authoritative.

## Runtime snapshot — 2026-09-10

- Current canonical `main`: `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2`
- Backend source release: `0.2.27`
- Frontend source release: `0.2.37`
- Current Render deployment: `dep-dah7usjl550s73e00350`, `live`
- Current deployed backend source: exact `f0dda136...`
- Render production auto-deploy: disabled
- Render plan/region: free / Oregon
- Live Render build: `requirements.txt` + `requirements-speech.txt`
- Canonical root `render.yaml`: `requirements.txt` + `requirements-transcription.txt`
- Render Blueprint/live-service drift: #964
- Supabase project: `VoxVector` (`tawtkawmjqabydnatavx`)
- `voxvector-user-admin`: ACTIVE, version 2, JWT verification enabled
- Latest trusted role inventory: 1 admin, 1 developer, 1 user
- Active P0 runtime repair: #941 / draft PR #962
- Next P0 observability work: #959 / draft PR #961

Repository QA, deployment, runtime health, provider execution, persisted artifact durability, browser verification, engineering-MVP completion, and scientific validation are separate evidence classes.

## Controlled production transcription and memory result

The latest controlled 183.3-second / 17,596,936-byte WAV successfully passed source upload/private persistence, speech segmentation, and faster-whisper transcription on deployed `f0dda136...`.

Observed:

- Speech Segmentation completed with 26 segments;
- faster-whisper executed `base`, CPU/int8, beam 1, one CPU thread, one worker, isolated child process;
- transcription completed in about 113 seconds;
- 58 timestamped transcript segments and 246 timestamped words were returned;
- transcript alignment state was reached;
- API-parent RSS was about 134.75 MiB before post-provider cleanup and about 482.58 MiB afterward;
- VoxVector's configured downstream admission ceiling was 416 MiB;
- Stage 10 Acoustic Feature Extraction nevertheless started on the deployed source;
- Render sampled 519,041,020 bytes against a 536,870,900-byte service limit;
- the Python API process restarted shortly afterward;
- the owner confirmed the incident was a memory problem;
- source audio remained persisted in Supabase;
- Stage 07/08 lifecycle state survived, but the transcript/provider artifact had not been durably checkpointed before Stage 10.

Render did not emit a dedicated kernel OOM/SIGKILL record, so no exact OS termination mechanism is claimed.

## Active #941 / PR #962 repair

The repair keeps the existing canonical backend pipeline and CaseStore and addresses one reliability subsystem:

- post-heavy cleanup does not import PyTorch merely to clean up a CPU faster-whisper path;
- completed acquisition/transcript/alignment/provider state is checkpointed to the same stable case run before Stage 10;
- checkpoint diagnostics use sanitized state/count metadata rather than transcript text;
- Stage 10 passes a process-RSS admission gate before being represented as running;
- insufficient headroom produces explicit downstream failed/not-run state while preserving completed upstream artifacts;
- `process_instance_id` becomes a true per-Python-process UUID;
- `render_instance_id` remains separate hosting-provider provenance;
- the stable case `run_id` survives finalization and pipeline-internal IDs remain separate;
- `/health` source contract includes process/Render identity and memory-admission fields.

PR #962 remains source-only until final exact-head QA, review/merge, deliberate Render deployment, and controlled production rerun.

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

The 05/06 order above is the current canonical backend contract. Static frontend data showing the old opposite order is a synchronization defect rather than a second valid pipeline.

Current maturity remains 16 implemented/built analytical/runtime foundations, four conditional or intentionally not invoked stages, with cloud-primary speaker execution still requiring controlled production evidence.

## Runtime memory and durability contract

The constrained execution sequence is:

`provider completion → cleanup → durable same-run upstream checkpoint → Stage 10 memory admission → downstream analysis`

Current memory reference is 512 MiB with 96 MiB reserved headroom, producing a 416 MiB admission ceiling.

Memory admission is operational safety. It is not Stage 09 analytical Eligibility and Reliability and must not be represented as a scientific result.

## Provider state

### Transcription

Beam-1 faster-whisper is no longer only configured or execution-ready. Controlled production execution completed successfully through transcription on `f0dda136...`.

The remaining release blocker is durable upstream checkpointing plus downstream memory-safe continuation.

### Diarization

The canonical primary remains pyannoteAI cloud through `pyannote_api`. `VOXVECTOR_ENABLE_DIARIZATION_RUNS` remains the explicit route invocation gate. Local Community-1 is an optional fallback only.

Controlled cloud-primary execution and persisted speaker artifact readback remain open.

## Render Blueprint drift

The current live Render service installs the broader `requirements-speech.txt` set, including the optional local pyannote/PyTorch stack. Canonical root `render.yaml` specifies the narrower transcription requirements.

The cloud-primary pyannoteAI adapter does not require loading local Community-1 merely to call the external provider. #964 therefore owns deliberate dependency/Blueprint reconciliation into the existing root file. No second Blueprint should be uploaded or committed.

## Supabase state

The administrator function is now deployed and active, correcting older current-status records that described it as source-only. Remaining #931 work is the existing User Management UX and authenticated desktop/mobile role verification, not Edge Function deployment/bootstrap.

Supabase also retained the controlled source WAV and pre-termination diagnostics across the Render process restart. Storage persistence does not itself prove browser rehydration; #963 owns that return path.

## Other active work

- #959 / draft PR #961 — dual Render + Supabase logs, provider-worker correlation, bounded Render-log mirroring, server-generated Debug Bundle.
- #930 — intermittent upload pre-handler 400 remains open despite the latest successful controlled upload.
- #920 — current API-triggered Render deployment does not verify protected Developer Console Deploy Now.
- #948 / draft PR #951 — auditable secure deletion.
- #949 / draft PR #952 — server-aware Stop Analysis.
- #963 — persisted historical-case audio/transcript rehydration after #941.
- #964 — canonical Render Blueprint reconciliation.
- #931 — User Management UX and browser role verification.

## Current implementation sequence

1. Finish #941 / PR #962 source/docs/Crown/audit synchronization.
2. Run and inspect exact-head QA, Preview, and applicable security checks.
3. Merge only after review/authorization.
4. Deliberately deploy the reviewed revision to Render.
5. Read fresh `/health` for exact source, beam 1, process/render identity and memory-admission configuration.
6. Rerun the same controlled WAV and prove transcript/alignment checkpoint readback plus Stage 10 completion or explicit bounded admission failure without API restart.
7. Complete #959 / PR #961 observability/debug bundle.
8. Execute cloud-primary diarization and persisted multimodal alignment.
9. Complete #963 historical-case rehydration and remaining browser/product gates.
10. Run two complete golden cases on the same deployed revision before engineering-MVP sign-off.
11. Conduct scientific validation separately.

## Scientific boundary

No individual vocal, acoustic, linguistic, behavioral, emotional, or psychological feature is treated as proof of deception. Runtime memory containment and provider execution are engineering evidence only.
