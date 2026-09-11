# VoxVector Architecture

## Canonical runtime boundary

```text
Public React application
https://darenprince.com/voxvector/
          |
          | configured API endpoint
          +------------------------------+
          |                              |
          v                              v
https://voxvector.crownlabs.tech   https://awsapi.crownlabs.tech
Original Render API               Separate AWS API environment
          |
          v
VoxVector/api/app.py
          |
          +--> mounted developer Render router
          |    VoxVector/api/render_api.py
          |
          v
VoxVector/src/voxvector/
          |
          v
21-stage canonical pipeline
          |
          v
Supabase authentication / persistence / diagnostics / private media
```

The repository implementation and `VoxVector/docs/` remain authoritative. This page mirrors the active architecture for Crown Labs documentation.

## Evidence boundary

Repository source, branch candidates, software QA, deployment, fresh runtime readback, provider readiness, provider execution, durable artifact persistence, browser verification, engineering-MVP completion, and scientific validation are separate evidence classes.

Historical controlled production execution on older source `f0dda136...` established real faster-whisper beam-1 execution with 58 transcript segments and 246 timestamped words. That run later entered the confirmed post-provider memory-failure path. Merged #962/#967 added durable upstream checkpointing, bounded Stage 10 admission, fail-fast single-flight composite execution, process/hosting provenance separation and stable route-owned `run_id`. Reopened #941 remains the controlled production proof gate for those merged behaviors.

Issue #964 is complete after reconciliation of the sole root Render Blueprint/runtime profile and confirmation that the connected workspace contains one VoxVector API service. Configuration is not execution.

## Public frontend architecture

The canonical public and styled-reference surfaces are:

- `/voxvector/` — public VoxVector application;
- `/voxvector/site-map` — human-readable VoxVector site/page inventory using the existing React public shell;
- `/voxvector/pipeline.html` — styled 21-stage analysis-pipeline reference;
- `/voxvector/methods.html` — styled analysis-method/data-point reference;
- `/voxvector/image-index/` — visual asset index;
- `/voxvector/loading-demo.html` — loading-state demonstration surface.

Protected React routes are:

- `/voxvector/login` — account login and trusted-role router;
- `/voxvector/developer` — developer/admin Developer Console;
- `/voxvector/app` — approved-user workspace.

GitHub Pages does not provide an SPA rewrite. The production and PR-preview workflows therefore stage physical entries for `developer`, `login`, `app`, and `site-map`, all serving the same built React application. They are aliases of one canonical application, not duplicate page implementations.

PR #993 repairs the existing shared public shell and landing navigation: Request Access routes to login, landing anchors are route-qualified, direct hash restoration is preserved, styled Pipeline and Analysis Methods pages replace raw GitHub-document destinations where those styled pages exist, and the human site map inventories the published VoxVector surfaces.

## Complete product pipeline

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

The 05/06 order above matches the canonical backend stage contract. Historical dated records may retain the earlier numbering as historical evidence.

The existing `voxvector/src/components/PipelineBuildCard.jsx` is corrected in PR #993 instead of being replaced. It uses the canonical Stage 05/06 order, prefers backend `pipeline_build.status_by_stage` whenever available, labels source-contract fallback state while backend status is loading or unavailable, and presents Stage 07/08 fallback state consistently with the backend implemented-foundation contract. No second frontend pipeline owner was introduced.

**[Detailed 21-stage pipeline →](./analysis-pipeline.md)**

## Post-transcription durability and memory boundary

The constrained execution sequence is:

`provider completion → provider cleanup → durable same-run upstream checkpoint → Stage 10 route preflight → fail-fast shared Stage 10 admission lock + RSS recheck → downstream composite analysis while the lock remains held`

Completed transcript/alignment/provider output must be persisted before dependent heavyweight work is trusted to complete.

Stage 10 memory admission is an operational runtime guard. It is separate from Stage 09 Eligibility and Reliability and must not be interpreted as a scientific eligibility result.

The source reference memory policy is 512 MiB with 96 MiB reserved headroom, yielding a 416 MiB reference admission ceiling. Those values are source/configuration facts unless independently confirmed by fresh runtime readback.

`process_instance_id` identifies the current Python process. `render_instance_id` preserves hosting-provider instance provenance separately. The route-owned persisted `run_id` remains distinct from pipeline-internal `pipeline_run_id`.

## Product experience target

The product target remains a connected case-centered intelligence workspace containing recording intake, source metadata, audio playback, synchronized waveform, speaker regions, transcript, analytical tracks, evidence markers, pipeline state, evidence synthesis, assessment, reports, and history.

Persisted source/transcript artifacts must remain available after later-stage failure. Reopened-case playback/transcript/speaker/alignment/report rehydration is tracked in #963 and consumes the existing case/source/run model rather than creating a duplicate persistence path.

## Provider boundary

The constrained Render architecture uses faster-whisper for transcription and pyannoteAI cloud as the primary diarization provider. Local Community-1 remains an optional fallback with a separate dependency boundary.

Provider configuration/readiness is not provider execution. Issue #970 owns controlled cloud-primary diarization execution plus persisted speaker evidence. Issue #971 owns persisted transcript/audio/speaker alignment after that evidence exists.

## Authentication and profile boundary

Authentication remains owned by `voxvector/src/components/AuthGate.jsx`. Current merged source starts one non-blocking canonical API wake after successful password login before trusted-role routing settles and preserves trusted authorization in application metadata separately from editable profile metadata.

A wake request is connectivity/readiness behavior. It is not provider execution, successful analysis, deployment verification or scientific validation.

## Developer Console and observability

The Developer Console remains the engineering cockpit over real backend/runtime evidence. Its frontend client in `voxvector/src/lib/api.js` maps to the preserved case, health, diagnostics and developer Render backend routes. PR #993 adds source-level contract coverage tracing those client calls to `VoxVector/api/app.py` and the mounted `VoxVector/api/render_api.py` router.

Source-route ownership verification is not external-service execution or browser verification.

Merged PRs #961/#966/#968 provide dual Render + Supabase observability and Debug Bundle source foundations. Issue #959 owns production correlated dual-copy, real bundle/redaction, terminal Render capture, restart durability and browser acceptance.

## Render Blueprint boundary

The existing root `render.yaml` is the sole canonical Blueprint owner. Issue #964 is complete. Protected credentials remain server-managed and omitted from Git.

A Blueprint declaration is configuration, not a deployment or runtime execution record.

## Current engineering sequence

`reopened #941 controlled proof → #970 cloud diarization execution/persistence → #971 persisted multimodal alignment → #963 case rehydration → #930/#959 reliability/observability → #965/#932 PR #993 frontend source + browser acceptance → #972 frozen-candidate two-run golden proof → scientific validation program`

## Design properties

- one canonical analysis engine
- one case/run model
- one 21-stage dependency contract
- one public React shell
- bounded frame processing
- durable completed upstream artifacts
- Stage 10 fail-fast process-wide single-flight admission with locked RSS recheck and lock ownership through composite execution
- explicit operational memory admission
- stable case-run identity separate from pipeline-internal run identity
- distinct process and hosting-instance provenance
- immutable input fingerprinting
- reproducible configuration
- auditable evidence provenance
- synchronized audio/evidence time axis
- preserved full capability roadmap

## Scientific boundary

Runtime memory containment, provider execution, artifact persistence, software QA, deployment, browser verification, engineering-MVP completion, and scientific validation are separate states. No individual vocal or behavioral feature is treated as proof of deception.
