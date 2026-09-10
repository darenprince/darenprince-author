# VoxVector Pipeline Build Status

**Status date:** 2026-09-10

This is the Crown Labs executive/product mirror of the canonical engineering status maintained in `VoxVector/docs/PIPELINE_BUILD_STATUS.md`.

## Current engineering state

VoxVector's canonical product architecture contains 21 stages from source intake through audit/provenance output.

Current maturity remains:

- 16 stages with implemented or built analytical/runtime foundations;
- 4 conditional or intentionally not invoked without required inputs;
- cloud-primary speaker execution still requiring controlled production verification;
- transcription now having real beam-1 provider execution evidence, while post-transcription durability and memory containment remain active reliability work;
- all 21 stages represented in the canonical backend contract.

Canonical GitHub `main` is `f0dda13694bd17ae3347e9e0eaf73e54a379fbb2`.

Connected Render inspection on 2026-09-10 reports:

- deployment `dep-dah7usjl550s73e00350` live;
- deployed source exact `f0dda136...`;
- auto-deploy disabled;
- live build command `requirements.txt` + `requirements-speech.txt`.

The canonical root `render.yaml` instead uses `requirements.txt` + `requirements-transcription.txt`. Issue #964 owns that drift and will reconcile the existing root Blueprint rather than add a duplicate.

## Controlled production execution

The latest 183.3-second controlled case established:

1. source upload/private persistence succeeded;
2. Speech Segmentation completed with 26 segments;
3. faster-whisper executed `base`, CPU/int8, beam 1, one CPU thread, one worker, isolated child process;
4. transcription completed in about 113 seconds with 58 timestamped segments and 246 timestamped words;
5. transcript alignment state was reached;
6. API-parent RSS rose from about 134.75 MiB before post-provider cleanup to about 482.58 MiB afterward;
7. Stage 10 Acoustic Feature Extraction started despite the configured 416 MiB admission ceiling already being exceeded;
8. Render sampled 519,041,020 bytes against a 536,870,900-byte service limit;
9. the Python API process restarted;
10. the owner confirmed the incident was a memory problem;
11. the source WAV survived in private Supabase Storage, while the normalized transcript/provider artifact was not yet durably checkpointed before downstream work.

Render did not emit a dedicated kernel OOM/SIGKILL record for this run, so no specific OS termination mechanism is claimed.

## Active #941 / draft PR #962

The active reliability repair remains one backend subsystem:

- no cleanup-time PyTorch import solely for cleanup;
- durable same-run checkpoint of successful acquisition/transcript/alignment before Stage 10;
- Stage 10 memory admission before the stage is represented as running;
- explicit bounded downstream failure when headroom is insufficient;
- stable case `run_id` through finalization;
- per-Python-process `process_instance_id` with separate `render_instance_id` hosting provenance;
- focused regression coverage and synchronized documentation.

This is source work only until final exact-head QA succeeds, the PR is reviewed/merged, and the resulting revision is deliberately deployed and rerun.

## Canonical stage order

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

The 05/06 order above mirrors the backend. Current frontend static metadata that preserves the prior opposite order is a synchronization defect to fix through the canonical frontend owner, not an alternate pipeline.

## Memory and durability boundary

The constrained runtime sequence is:

`provider completion → cleanup → durable upstream checkpoint → Stage 10 memory admission → downstream analysis`

Current memory reference is 512 MiB with a 96 MiB reserve, giving a 416 MiB admission ceiling. A memory-admission refusal is operational safety and must not be represented as Stage 09 Eligibility and Reliability or as a scientific result.

## Supabase state

Connected Supabase evidence now shows:

- `voxvector-user-admin` Edge Function ACTIVE, version 2, JWT verification enabled;
- latest trusted role inventory: 1 admin, 1 developer, 1 user;
- durable case/source/diagnostic persistence surviving the controlled API restart.

That corrects older current-status statements that described the administrator function as undeployed. Remaining #931 work is User Management UX and authenticated browser acceptance.

## Related work kept separate

- #959 / draft PR #961: dual Render + Supabase logs, provider-worker correlation, bounded Render-log mirroring, one-click Debug Bundle.
- #963: historical-case audio/transcript rehydration using persisted source/run state after #941 checkpoint durability.
- #964: canonical Render Blueprint reconciliation.
- #930: intermittent upload pre-handler 400 investigation; latest controlled upload succeeded.
- #948 / draft PR #951: auditable secure case deletion.
- #949 / draft PR #952: server-aware Stop Analysis.
- #920: protected Developer Console Deploy Now verification.

## Current engineering sequence

1. Finish #941 / PR #962 implementation/docs/Crown/audit synchronization.
2. Run and inspect exact-head VoxVector QA, Preview and applicable security checks.
3. Merge only after review/authorization.
4. Deliberately deploy the reviewed revision to Render.
5. Capture fresh `/health` with exact source, beam 1, process/render identity and memory-admission fields.
6. Rerun the same controlled WAV and require transcript/alignment checkpoint readback plus Stage 10 completion or clean memory-admission failure without API restart.
7. Complete #959 / PR #961 observability/debug-bundle work.
8. Execute pyannoteAI cloud-primary diarization and persist speaker provenance.
9. Complete transcript/audio/speaker alignment and #963 historical-case rehydration.
10. Finish product/browser/release gates and run two complete golden cases on the same deployed revision.
11. Advance scientific validation only as a separate program.

## Scientific boundary

The pipeline is an evidence-analysis architecture, not a claim that an individual vocal feature proves deception. Provider execution, memory containment, artifact persistence, software QA, deployment, browser verification, engineering-MVP completion, and scientific validation remain separate states.

**Canonical source:** `VoxVector/docs/PIPELINE_BUILD_STATUS.md`
