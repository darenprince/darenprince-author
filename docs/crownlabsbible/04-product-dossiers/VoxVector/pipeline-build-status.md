# VoxVector Pipeline Build Status

**Status date:** 2026-09-10

This is the Crown Labs executive/product mirror of the canonical engineering status maintained in `VoxVector/docs/PIPELINE_BUILD_STATUS.md`.

## Current engineering state

VoxVector's canonical product architecture contains 21 stages from source intake through audit/provenance output.

Current maturity remains:

- 16 stages with implemented or built analytical/runtime foundations;
- 4 conditional or intentionally not-invoked stages;
- cloud-primary speaker execution still requiring controlled production evidence;
- historical real beam-1 transcription execution established, while current merged durability/Stage 10 runtime behavior still requires controlled verification;
- all 21 stages represented in the canonical backend contract.

Canonical GitHub `main` is `420536771875c6948be51851118b58cb04a596e6`. Exact-main VoxVector QA `34532394431` succeeded and GitHub Pages publication workflow `34532394423` succeeded.

Connected Render inspection reports:

- deployment `dep-dahi2ics728c73b6ujug` `live`;
- deployed source exact `420536771875c6948be51851118b58cb04a596e6`;
- deployment trigger API;
- auto-deploy disabled;
- live build command `requirements.txt` + `requirements-speech.txt`.

The owner-provided Render export generated `2026-09-10T21:38:48Z` independently matches the live service/root/build/start/health/domain/auto-deploy fields and redacts environment values. The canonical root `render.yaml` instead uses `requirements.txt` + `requirements-transcription.txt` and declares `CORS_ORIGINS` server-managed while the export does not list that key. Issue #964 owns deliberate reconciliation into the existing root Blueprint.

No fresh `/health` response for exact deployed `420536...` is recorded by this synchronization pass.

## Historical controlled production execution

The 183.3-second controlled case on older source `f0dda136...` established:

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

This remains historical provider/runtime evidence, not current `420536...` execution proof.

## Merged #962/#967 source and reopened #941 production proof

Current source now provides:

- no cleanup-time PyTorch import solely for CPU-path cleanup;
- durable same-run checkpoint of successful acquisition/transcript/alignment before Stage 10;
- Stage 10 operational memory admission before the stage is represented as running;
- fail-fast process-wide single-flight composite admission;
- RSS recheck under the shared heavyweight lock and lock ownership through composite execution;
- no queued later execution for abandoned/timed-out competing requests;
- explicit bounded downstream failure when headroom is insufficient;
- stable route-owned case `run_id` through finalization with `pipeline_run_id` kept separate;
- per-Python-process `process_instance_id` with separate `render_instance_id` hosting provenance.

Issue #941 was closed at merge despite remaining controlled production criteria and has been reopened. #964 should first establish the intended Render dependency/configuration profile, then #941 must rerun the same controlled WAV and read back current durability/memory/process/run behavior.

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

The 05/06 order above mirrors the backend. Current frontend `PipelineBuildCard.jsx` still preserves the stale opposite local order and queued Stage 07/08 fallback text; #965 owns correction through the canonical existing frontend component.

## Memory and durability boundary

The constrained runtime sequence is:

`provider completion → cleanup → durable upstream checkpoint → Stage 10 route preflight → fail-fast shared composite admission + locked RSS recheck → downstream analysis while admitted`

Current source memory reference is 512 MiB with a 96 MiB reserve, giving a 416 MiB reference admission ceiling. These values are not a fresh current runtime-health claim.

A memory-admission refusal is operational safety and must not be represented as Stage 09 Eligibility and Reliability or as a scientific result.

## Supabase and account state

The last connected Supabase evidence showed:

- `voxvector-user-admin` Edge Function ACTIVE, version 2, JWT verification enabled;
- trusted role inventory: 1 admin, 1 developer, 1 user;
- durable historical case/source/diagnostic persistence surviving an API restart.

Current `main` still lacks the requested login-time API wake. Draft PR #974 under #931 contains that candidate repair plus shared role-aware developer/admin/user self-profile wiring. The PR is not current/deployed behavior and must be refreshed against current `main` before merge recommendation and browser acceptance.

## Related work kept separate

- #964: current first source task, canonical Render Blueprint/runtime profile reconciliation.
- #941: reopened controlled production proof after #964.
- #970: cloud-primary pyannoteAI contract/execution/persisted speaker evidence.
- #971: persisted transcript/audio/speaker alignment.
- #959: merged Render + Supabase observability/Debug Bundle source, production acceptance open.
- #963: historical-case audio/transcript/speaker/alignment/report rehydration.
- #930: intermittent upload pre-handler 400 reliability boundary.
- #965: frontend pipeline contract synchronization.
- #931 / draft PR #974: login wake/shared profiles/current role browser matrix.
- #932: release-critical public CTA/anchor/navigation repair.
- #948 / draft PR #951: auditable secure case deletion.
- #949 / draft PR #952: server-aware Stop Analysis.
- #920: protected Developer Console Deploy Now verification.
- #972: final frozen-candidate two same-revision/configuration golden cases.

## Current engineering sequence

1. Finish #964 Render Blueprint/runtime-profile reconciliation.
2. Deliberately deploy/read back the reconciled exact revision and complete reopened #941.
3. Execute/persist cloud-primary diarization under #970.
4. Persist/read back transcript/audio/speaker alignment under #971.
5. Complete #963 historical-case rehydration.
6. Bound #930 intake reliability and complete #959 production observability acceptance.
7. Correct the existing frontend pipeline projection under #965.
8. Refresh/QA/merge draft PR #974 and complete #931 authenticated role/profile browser acceptance.
9. Complete #932 release-critical public navigation.
10. Freeze one exact candidate and pass two complete golden cases under #972.
11. Advance scientific validation only as a separate program.

## Scientific boundary

The pipeline is an evidence-analysis architecture, not a claim that an individual vocal feature proves deception. Provider execution, memory containment, artifact persistence, software QA, deployment, browser verification, engineering-MVP completion, and scientific validation remain separate states.

**Canonical source:** `VoxVector/docs/PIPELINE_BUILD_STATUS.md`
