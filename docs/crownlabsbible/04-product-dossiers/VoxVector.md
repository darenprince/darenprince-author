# VoxVector — Crown Labs Product Dossier

**Product:** VoxVector  
**Category:** Advanced vocal and audio intelligence with deception-analysis research architecture  
**Canonical backend:** `VoxVector/`  
**Canonical frontend:** `voxvector/`  
**Primary API:** `voxvector.crownlabs.tech`  
**Separate AWS API environment:** `awsapi.crownlabs.tech`  
**Public application:** `darenprince.com/voxvector/`  
**Backend release:** **0.2.27**  
**Frontend release:** **0.2.38**

## Product definition

VoxVector is Crown Labs' case-centered vocal and audio intelligence platform. It combines private source handling, speaker/transcript evidence acquisition, acoustic and temporal measurements, evidence assembly, guarded assessment architecture, reporting and auditable provenance in one workflow.

VoxVector is purpose-built for deception-analysis research and professional evidence review, but the current system must not be marketed as a scientifically validated universal lie detector. Engineering capability, provider execution, repeatability and scientific validation are separate evidence states.

## Current engineering posture

Current executive engineering authority is `VoxVector/current-engineering-state-2026-09-12.md` in this dossier mirror and `VoxVector/docs/CURRENT_ENGINEERING_STATE_2026-09-12.md` in the technical source.

The current production backend remains release **0.2.27** on deployed revision `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80`. Frontend release authority is **0.2.38**.

Current product status is best described as an **advanced pre-release engineering / connected MVP build with current controlled transcription-through-Stage-10 proof**.

## September 12 validation snapshot

A controlled 183.3-second WAV completed the deployed canonical path on backend 0.2.27:

- run elapsed: **247,984 ms**
- pipeline result: **17/21 complete, 0 failed, 4 intentionally not run**
- Stage 05: **26 speech segments**
- Stage 07 faster-whisper: **about 150.1 seconds**
- durable acquisition checkpoint: **58 transcript segments / 246 words**
- Stage 08 transcript/audio alignment: **available before Stage 10**
- Stage 10 admission: **118.6 MB RSS** under **416 MB** admission ceiling / **512 MB** service limit
- Stage 10 acoustic extraction: **about 73.8 seconds**
- Stage 10 post-GC RSS: **128.63 MB**
- uncontrolled API restart: **none**

Issue **#941 is passed and closed**.

## Canonical 21-stage pipeline

### Prepare

1. File Upload / Ingest
2. File Decode and Normalization
3. Provenance and Integrity
4. Channel and Recording Assessment

### Understand

5. Speech Segmentation
6. Speaker Identification / Diarization
7. Transcription Generation
8. Transcript Alignment
9. Eligibility and Reliability

### Analyze

10. Acoustic Feature Extraction
11. Prosodic and Voice Quality Analysis
12. Temporal and Pause Analysis
13. Linguistic and Disfluency Analysis
14. Question / Answer Alignment
15. Within Speaker Baseline

### Synthesize and Decide

16. Cross Method Evidence Assembly
17. Evidence Convergence and Conflict
18. Candidate Classification
19. Validation and Calibration Gate
20. Final Classification / Disposition
21. Audit and Provenance Output

The canonical numbering is Stage 05 **Speech Segmentation** and Stage 06 **Speaker Identification / Diarization**.

## Current maturity

Source-level health reports approximately 16 implemented foundations, one queued stage and four conditional/not-invoked stages. That is a source maturity summary.

The September 12 controlled runtime run separately completed 17 stages, failed none, and intentionally did not run four. Those runtime and source maturity numbers answer different questions and must not be collapsed into one percentage.

Current cloud-primary speaker execution and persisted speaker evidence remain the first P0 gate under #970. Speaker-inclusive transcript/audio alignment remains #971.

## Current frontend and Developer Console

The canonical React application includes:

- public landing and styled reference pages;
- Request Access routed to canonical login;
- route-safe landing anchors and restored direct hash navigation;
- human site map;
- protected user and Developer Console surfaces;
- one-shot login-time API wake;
- shared self-profile behavior across supported account roles;
- backend-driven 21-stage pipeline projection;
- current landing hero artwork with obsolete legacy darkening styles retired.

Frontend **0.2.38** updates the actual `DeveloperConsole.jsx` owner directly:

- the Developer Overview shows the accepted deployed transcription proof as **PROVEN** only when the live backend revision matches `66f2ea...`;
- **Next Engineering Move** is **#970 diarization**;
- stale `Transcription first`, `execution ready, unverified`, 71% and 20-of-28 release-readiness presentation is retired;
- the 28-task checklist remains available as implementation coverage, not the release gate;
- `setProgress` is now passed into `CaseWorkbench`, fixing the file-picker state-setter error exposed during validation;
- the existing direct file-input read remains defensive fallback rather than the normal state path;
- a focused regression contract guards the repaired Dashboard/picker behavior.

Validation-snapshot QA `34684789612` passed before the 0.2.38 repair. Exact-head 0.2.38 QA and authenticated browser readback are separate acceptance evidence.

## Provider architecture

### Transcription

Canonical provider path: faster-whisper.

Current same-revision controlled execution is proven on the deployed 0.2.27 candidate. Durable transcript checkpointing and bounded Stage 10 completion are also proven for that run.

### Speaker intelligence

Canonical primary path: pyannoteAI cloud.

Fresh `/health` reports cloud-primary diarization configured and execution-ready. Stage 06 was intentionally not invoked in the successful controlled case, so #970 remains the first P0 runtime gate.

### Hugging Face

The connected Hugging Face identity is `crownlabs-voxvector`. Hugging Face supports optional/local model workflows and fallback tooling. It is not proof of cloud-primary pyannoteAI execution.

## Data and infrastructure

Current architecture uses:

- GitHub for source, issues and CI;
- GitHub Pages for the public React application;
- FastAPI for the API boundary;
- Supabase for authentication, private storage, durable diagnostics and persistence;
- Render for the primary API service boundary;
- a separately addressed AWS API environment;
- cloud speech providers selected by the canonical backend runtime.

Fresh Render inspection shows `voxvector-api` live in Oregon on deployment `dep-daifrgoae00c73ebcc20`, source `66f2ea...`, with `/health` returning 200 and runtime self-test passed.

## Observability and Debug Bundle

A real sanitized Debug Bundle exists for the successful controlled run. It includes case/run state, runtime health, Render status and 100 Render logs, plus a Supabase Render-log mirror path.

The current manifest reports zero exported exact VoxVector events and zero correlated error records. #959 therefore remains open for full dual-copy correlation acceptance.

A separate browser validation case also reproduced an HTTP 500 caused by a `TimeoutError` while diagnostic middleware persisted a completed-request record. `/health` remained 200 and later reads succeeded. Issue **#998** tracks the requirement that observability persistence be best-effort/non-fatal to product requests.

## Current release gates

1. #970 real cloud-primary diarization and persisted speaker evidence
2. #971 persisted speaker/transcript/audio alignment
3. #963 historical-case reopen/playback/artifact/report rehydration
4. #930 upload reliability bounding
5. #998 observability persistence isolation
6. #959 complete dual-copy observability and Debug Bundle correlation
7. authenticated desktop/mobile acceptance, including frontend 0.2.38 readback
8. #972 two complete same-revision/configuration golden cases
9. scientific validation separately

## Commercial posture

The strongest near-term commercial framing is **auditable vocal/audio evidence intelligence and professional workflow**, not an automated universal lie verdict.

Potential revenue layers include professional/team subscriptions, enterprise/institutional licensing, API usage, managed analytical services, research/evaluation engagements, private deployments, OEM/embedded licensing and later task-specific validated inference offerings if scientific evidence supports them.

## Documentation authority

Technical source of truth: `VoxVector/`.

Executive/product mirror: `docs/crownlabsbible/04-product-dossiers/VoxVector/`.

Key living records:

- `VoxVector/docs/CURRENT_ENGINEERING_STATE_2026-09-12.md`
- `VoxVector/docs/VERSION_MAP.md`
- `VoxVector/docs/SYSTEM_STATE_REPORT.md`
- `VoxVector/docs/PIPELINE_BUILD_STATUS.md`
- `VoxVector/docs/ENDPOINT_REGISTRY.md`
- `VoxVector/docs/QA_STATUS.md`
- `VoxVector/docs/CAPABILITY_STATUS.md`
- `VoxVector/docs/MVP_RELEASE_GATE.md`

Dated historical audit/checkpoint documents remain evidence of their original state and should not be rewritten to appear current.
