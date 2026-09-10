# VoxVector QA Status

**State date:** 2026-09-10

This document records repository-level software QA and separately observed deployment/runtime evidence. It is not a scientific validation report.

The canonical engineering-MVP exit checklist is [`MVP_RELEASE_GATE.md`](MVP_RELEASE_GATE.md).

## Current source and deployment state

Canonical GitHub `main` is `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2`, the merge of PR #960 that corrected the constrained faster-whisper source profile to beam 1.

The latest connected Render deployment is `dep-dah7usjl550s73e00350`, status `live`, on exact backend source `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2`. Render production auto-deploy remains disabled and the observed deployment trigger is `api`.

The active runtime-memory repair is draft PR #962 on branch `fix/voxvector-post-transcription-memory-cleanup`. Source changes on that branch are not deployed production behavior until the PR passes exact-head QA, is reviewed/merged, and an approved Render deployment is separately verified.

## Controlled production transcription result — 2026-09-10

Controlled case:

- case: `3515362e-f801-463d-961a-df7b3302a596`
- source: `cbdcdbf8-e528-49b0-a474-5cd64588d301`
- analysis request: `32fdb25aee704ee4ad0a0615e2496e09`
- source duration: 183.3 seconds
- source bytes: 17,596,936
- deployed revision: `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2`

Observed provider execution:

- speech segmentation completed with 26 segments;
- faster-whisper executed `base`, CPU, int8, beam 1, one CPU thread, one worker, isolated child process, 165-second child deadline;
- transcription completed in approximately 113 seconds;
- output contained 58 timestamped transcript segments and 246 timestamped words;
- language was reported as `en`.

This is successful provider execution evidence for that one controlled run. It is not transcript truthfulness validation and it does not establish reliable end-to-end analysis completion.

## Confirmed post-transcription memory failure

The same run then exposed a separate reliability defect after successful transcription.

Application memory telemetry reported approximately 134.75 MiB parent RSS before the post-heavy-phase cleanup completed and approximately 482.58 MiB after cleanup. The configured VoxVector admission ceiling was 416 MiB on a 512 MiB reference budget. Render's 30-second service telemetry sampled 519,041,020 bytes during the incident window against a 536,870,900-byte service limit.

Stage 10 Acoustic Feature Extraction was then marked started and the API process disappeared without a graceful application shutdown record. Render launched Uvicorn again shortly afterward. The owner confirmed the incident was a memory problem. Render did not emit a dedicated kernel-level OOM/SIGKILL line for this exact run, so the precise OS termination mechanism is not separately claimed.

Source inspection identified four directly related defects now owned by #941 / draft PR #962:

1. post-heavy-phase cleanup imported PyTorch merely to inspect CUDA, even on the CPU-only faster-whisper path;
2. Stage 10 did not perform an explicit memory admission check before being represented as running;
3. completed acquisition/transcript/alignment/provider state was not checkpointed durably before Stage 10;
4. `process_instance_id` reused `RENDER_INSTANCE_ID`, so a Python-process restart inside one Render instance could retain the same infrastructure identity.

The active repair removes the cleanup-time Torch import, adds a Stage 10 memory admission gate, persists an upstream provider checkpoint before downstream work, and separates process-start identity from Render instance provenance.

## Current branch test status

Focused source tests have been added or strengthened on PR #962 for:

- cleanup not attempting a Torch import when Torch is absent;
- cleanup using an already-loaded CUDA cache when applicable;
- upstream acquisition checkpoint preservation under the same run identity;
- downstream memory-admission rejection preserving completed Stage 05/07/08 states;
- `/health` separation of process identity and Render instance identity.

**No final exact-head QA result is recorded here yet.** The branch remains in progress. This document must be updated with exact final workflow IDs and pass counts before merge recommendation.

## Supabase evidence

Connected Supabase project `VoxVector` (`tawtkawmjqabydnatavx`) currently has the `voxvector-user-admin` Edge Function active, version 2, with JWT verification enabled. Current trusted role inventory readback is one admin, one developer, and one user.

For the controlled memory incident, Supabase retained:

- the private source WAV in `voxvector-media`;
- the case JSON in the private VoxVector storage path;
- parent request diagnostic records through transcription start and later Stage 10 start.

The provider child completion events were visible in Render but were not durably correlated into the parent Supabase diagnostic chain. That separate observability gap is owned by #959 / draft PR #961.

## Render configuration drift

Canonical root `render.yaml` currently specifies:

`pip install -r api/requirements.txt && pip install -r api/requirements-transcription.txt`

The connected live Render service currently reports:

`pip install -r api/requirements.txt && pip install -r api/requirements-speech.txt`

`requirements-speech.txt` installs local `pyannote.audio` in addition to faster-whisper, while the canonical primary diarization adapter is the cloud `pyannote_api` path. The downloaded Render Blueprint export has not been committed as a second file. Drift reconciliation belongs to #964 and must update the existing canonical root `render.yaml` rather than creating a duplicate Blueprint owner.

Configuration reconciliation is not provider execution and is intentionally separate from the active #941 source repair.

## Current implementation and evidence matrix

| Area | Current state | Evidence | Remaining gate |
|---|---|---|---|
| 21-stage pipeline contract | represented | source/tests | engineering and scientific maturity remain stage-specific |
| Authenticated source upload | implemented | latest 17.6 MB controlled WAV persisted successfully | intermittent #930 400 still requires reproduction/bounding |
| Source persistence | implemented | Supabase object readback | old-case browser rehydration is #963 |
| faster-whisper | provider execution proven once with beam 1 | 58 segments / 246 words on deployed `f0dda136...` | end-to-end memory-safe repeatability after #941 |
| Transcript alignment | runtime stage completed in controlled run | Render/stage evidence | durable checkpoint/readback repair in #941 |
| Acoustic Feature Extraction | implemented source, failed current runtime transition | source tests + memory incident | Stage 10 admission and controlled rerun |
| pyannoteAI cloud primary | implemented/configured architecture | source/provider contracts | controlled cloud-primary execution still required |
| local Community-1 | optional fallback | local adapter contracts | do not treat as current primary production path |
| Run recovery/reporting | merged foundation | #945/#946 | process identity strengthened by #941; browser readback still separate |
| Dual Render/Supabase observability | draft implementation | #959/#961 | reconcile after #941 and production verify |
| Admin user management backend | Edge Function active | Supabase readback | remaining console UX/browser acceptance under #931 |
| Classification/disposition | guarded foundation | source/tests | no validated deception inference |

## Related issue queue

### #941 — active P0

Contain post-transcription memory exhaustion, checkpoint successful upstream speech evidence, gate Stage 10 on actual memory headroom, and use a process-start UUID independent of Render infrastructure identity. Draft PR #962 owns this source subsystem.

### #959 / PR #961 — next observability P0

Preserve Render-native logs while also persisting sanitized VoxVector/provider evidence in Supabase, propagate parent request/run correlation to spawned speech workers, mirror bounded Render observations, and provide a server-generated case/run Debug Bundle.

### #963 — persisted case rehydration

After #941 establishes the canonical durable transcript checkpoint, make the existing frontend resolve persisted `activeSource`, obtain the existing owner-scoped signed playback URL, and render saved audio/transcript after reopening a historical case.

### #964 — Render Blueprint reconciliation

Reconcile live/exported Render service state into the existing root `render.yaml`, preserve secrets as external values, keep reproducible non-secret constraints in Git, and avoid duplicate infrastructure.

## Verification boundary

A passing software suite establishes implementation behavior only. A GitHub merge is not a Render deployment. A Render deployment is not provider execution. Successful faster-whisper execution is not transcript truthfulness, verified speaker identity, deception-detection validity, calibration, or generalization. Engineering-MVP completion and scientific validation remain separate programs.
