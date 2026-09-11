# VoxVector Pipeline Build Status

**Status date:** 2026-09-11

This is the Crown Labs executive/product mirror of the canonical engineering status maintained in `VoxVector/docs/PIPELINE_BUILD_STATUS.md`.

## Current engineering state

VoxVector's canonical product architecture contains 21 stages from source intake through audit/provenance output.

Current maturity remains:

- 16 stages with implemented or built analytical/runtime foundations;
- 4 conditional or intentionally not-invoked stages;
- cloud-primary speaker execution still requiring controlled production evidence;
- historical real beam-1 transcription execution established, while current durability/Stage 10 runtime behavior still requires controlled verification;
- all 21 stages represented in the canonical backend contract.

Those are engineering maturity statements, not scientifically validated deception indicators.

## Frontend pipeline projection — PR #993

The existing Developer Console `PipelineBuildCard.jsx` is corrected in PR #993 without creating a second component or alternate pipeline definition.

The candidate source:

- uses the canonical Stage 05 Speech Segmentation → Stage 06 Speaker Identification / Diarization order;
- prefers backend `pipeline_build.status_by_stage` for mutable row state when `/health` provides it;
- normalizes `implemented*` foundation variants for presentation while keeping readiness separate from execution;
- labels source-contract fallback state explicitly when backend status is loading or unavailable;
- represents Stage 07 and Stage 08 fallback state as implemented foundations rather than the obsolete queued state;
- marks a current stage only when the backend supplies an exact current-stage token;
- preserves the existing `/health` contract and the existing frontend component owner.

Exact-head software QA, deployment, authenticated browser verification, provider execution, engineering-MVP completion, and scientific validation remain separate evidence classes.

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

The 05/06 order above mirrors the backend contract and now also matches the PR #993 Developer Console projection.

## Memory and durability boundary

The constrained runtime sequence remains:

`provider completion → cleanup → durable upstream checkpoint → Stage 10 route preflight → fail-fast shared composite admission + locked RSS recheck → downstream analysis while admitted`

The source memory reference is 512 MiB with a 96 MiB reserve, giving a 416 MiB reference admission ceiling. This is a source/configuration boundary, not a fresh runtime-health or provider-execution claim.

A memory-admission refusal is operational safety and must not be represented as Stage 09 Eligibility and Reliability or as a scientific result.

## Historical controlled production evidence

A preserved 183.3-second controlled case on older source `f0dda136...` established successful source persistence and real faster-whisper provider execution: Stage 05 produced 26 speech segments and Stage 07 produced 58 timestamped transcript segments / 246 words in about 113 seconds using `base`, CPU/int8, beam 1, one CPU thread and one worker.

That older run later entered the constrained-memory danger zone before Stage 10 and the Python API restarted. The source WAV survived, while the completed transcript/provider artifact had not yet been durably checkpointed before downstream work on that historical revision. This historical evidence is not proof of current end-to-end execution, transcript correctness or scientific validity.

Merged #962/#967 subsequently added same-run upstream durability, Stage 10 operational admission, fail-fast single-flight execution, locked RSS recheck, stable route-owned `run_id`, separate `pipeline_run_id`, and process/hosting-instance provenance. Reopened #941 remains the controlled production proof gate for those behaviors.

## Account and navigation state

Current merged authentication source performs a non-blocking canonical API wake after successful password login before trusted-role routing settles. That is a connectivity/readiness behavior, not provider execution or successful analysis.

PR #993 also owns the bounded public navigation repair under #932: Request Access, route-qualified landing anchors, styled Pipeline and Analysis Methods destinations, a human `/voxvector/site-map` route, and physical Pages entries for direct React routes. Browser acceptance remains separate from source QA.

## Related work kept separate

- #964: **completed** Render Blueprint/runtime profile reconciliation.
- #941: reopened controlled production proof.
- #970: cloud-primary pyannoteAI contract/execution/persisted speaker evidence.
- #971: persisted transcript/audio/speaker alignment.
- #959: merged Render + Supabase observability/Debug Bundle source, production acceptance open.
- #963: historical-case audio/transcript/speaker/alignment/report rehydration.
- #930: intermittent upload pre-handler 400 reliability boundary.
- #965 / PR #993: frontend pipeline contract synchronization.
- #932 / PR #993: public CTA/anchor/menu/site-map repair.
- #972: final frozen-candidate two same-revision/configuration golden cases.

## Scientific boundary

The pipeline is an evidence-analysis architecture, not a claim that an individual vocal feature proves deception. Provider execution, memory containment, artifact persistence, software QA, deployment, browser verification, engineering-MVP completion, and scientific validation remain separate states.

**Canonical source:** `VoxVector/docs/PIPELINE_BUILD_STATUS.md`
