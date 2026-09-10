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

## Current runtime evidence — 2026-09-10

- canonical GitHub `main`: `420536771875c6948be51851118b58cb04a596e6`
- exact-main VoxVector QA `34532394431`: success
- exact-main GitHub Pages publication workflow `34532394423`: success
- current Render deploy: `dep-dahi2ics728c73b6ujug`, `live`
- deployed source: exact `420536771875c6948be51851118b58cb04a596e6`
- deploy trigger: API
- Render auto-deploy: disabled
- live Render build: `requirements.txt` + `requirements-speech.txt`
- canonical root `render.yaml`: `requirements.txt` + `requirements-transcription.txt`
- owner Render export: `2026-09-10T21:38:48Z`, matching current live service/root/build/start/health/domain/auto-deploy fields with environment values redacted
- Blueprint/live-service/configuration drift: issue #964

No fresh `/health` response for exact deployed `420536...` is recorded by the current synchronization pass. Deployment `live` remains separate from runtime readback.

One historical controlled 183.3-second production case on older source `f0dda136...` completed faster-whisper beam-1 transcription with 58 transcript segments and 246 timestamped words. The API later restarted during the post-provider/downstream transition after memory entered the constrained runtime danger zone. The owner confirmed the incident was a memory problem.

PR #962 merged the first #941 containment repair. PR #967 merged the reviewed follow-up and is current `main`. Current source now persists completed upstream provider evidence before Stage 10, applies operational memory admission, uses fail-fast process-wide single-flight admission around the full downstream composite analysis with locked RSS recheck, distinguishes process and Render instance identity, and preserves stable route-owned `run_id` separately from `pipeline_run_id`.

Issue #941 has been reopened because controlled production acceptance remains unexecuted. #964 should establish the intended runtime dependency/configuration profile before the same controlled WAV is rerun.

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

Current `voxvector/src/components/PipelineBuildCard.jsx` still carries the stale opposite local 05/06 order and queued Stage 07/08 fallback text. Issue #965 owns correction in that existing component so backend `pipeline_build.status_by_stage` is the mutable runtime authority when available.

**[Detailed 21-stage pipeline →](./analysis-pipeline.md)**

## Post-transcription durability and memory boundary

The constrained execution sequence is:

`provider completion → provider cleanup → durable same-run upstream checkpoint → Stage 10 route preflight → fail-fast shared Stage 10 admission lock + RSS recheck → downstream composite analysis while the lock remains held`

Completed transcript/alignment/provider output must be persisted before dependent heavyweight work is trusted to complete.

Stage 10 memory admission is an operational runtime guard. It is separate from Stage 09 Eligibility and Reliability and must not be interpreted as a scientific eligibility result.

Current source reference memory policy is 512 MiB with 96 MiB reserved headroom, yielding a 416 MiB reference admission ceiling. These values are not a fresh current `/health` claim.

The merged source applies the existing process-wide heavyweight phase guard to the complete canonical `VoxVectorPipeline.analyze()` call. Stage 10 composite admission is fail-fast: a competing composite call does not wait in a worker-thread queue behind an active heavyweight phase. It fails before entering the analytical body. An admitted call rechecks RSS while holding the shared lock and retains that lock through composite execution. Existing provider `measured_phase(...)` behavior remains separate.

`process_instance_id` identifies the current Python process. `render_instance_id` preserves hosting-provider instance provenance separately because Render can restart Python while retaining the same infrastructure instance label.

## Case and run identity

The persisted case run remains the durable analysis identity across source, acquisition, stage state, reporting, history, and failure recovery. The result envelope exposes that stable ID as `run_id`.

The canonical analytical pipeline still creates its own internal UUID. That identifier is preserved separately as `pipeline_run_id`; it must not replace the case-run identifier used by persisted cases and reopened history.

## Product experience target

The product target remains a connected case-centered intelligence workspace containing recording intake, source metadata, audio playback, synchronized waveform, speaker regions, transcript, analytical tracks, evidence markers, pipeline state, evidence synthesis, assessment, reports, and history.

Persisted source/transcript artifacts must remain available after later-stage failure. Reopened-case playback/transcript/speaker/alignment/report rehydration is tracked in #963 and consumes the existing case/source/run model rather than creating a duplicate persistence path.

## Provider boundary

Current production architecture uses:

- transcription: faster-whisper, constrained `base` / CPU / int8 / beam 1 path;
- diarization primary: pyannoteAI cloud via `pyannote_api`;
- diarization fallback: optional local Community-1 only when explicitly enabled.

The cloud-primary diarization adapter does not require loading local Community-1/PyTorch merely to call the cloud provider. Current live Render dependency drift involving the broader speech requirements is therefore tracked in #964.

Provider readiness is not provider execution. The historical controlled faster-whisper run is real provider-execution evidence, but current durable/end-to-end memory-safe analysis still requires #964 reconciliation and reopened #941 controlled production verification.

Issue #970 owns rechecking the current pyannoteAI cloud media-upload/job contract and obtaining real cloud-primary diarization plus persisted speaker evidence after #964/#941. Issue #971 then owns persisted transcript/audio/speaker alignment.

## Authentication and profile boundary

Current `main` `AuthGate.jsx` still does not issue the requested login-time API wake. Draft PR #974 under #931 contains the candidate one-shot `/health` wake and shared role-aware self-profile editor for developer/admin/user accounts. It reuses the existing `public.profiles` and private avatar boundary; trusted authorization remains in `app_metadata`.

PR #974 is not current or deployed behavior. Its prior integration QA predates the #967 advance of `main`, so current-main integration QA/Preview and authenticated desktop/mobile/profile-save verification remain open.

## Developer Console and observability

The Developer Console remains the engineering cockpit over real backend/runtime evidence. Merged PRs #961/#966/#968 provide dual Render + Supabase observability and Debug Bundle source foundations. Issue #959 owns production correlated dual-copy, real bundle/redaction, terminal Render capture, restart durability and browser acceptance.

## Render Blueprint boundary

The existing root `render.yaml` is the sole canonical Blueprint owner. The owner export is reconciliation evidence, not canonical replacement source. Environment values redacted as `sync: false` must not be inferred.

`CORS_ORIGINS` exists in the root Blueprint but is absent from the owner export; backend source defaults to `*` if it is unset. #964 must resolve that difference deliberately together with the dependency set and other reproducible runtime fields.

## Current engineering sequence

`#964 Render profile reconciliation → reopened #941 controlled proof → #970 cloud diarization → #971 persisted multimodal alignment → #963 case rehydration → #930/#959 reliability/observability → #965 frontend pipeline truth → #931/PR #974 auth/profile browser acceptance → #932 public navigation → #972 frozen-candidate two-run golden proof`

## Design properties

- one canonical analysis engine
- one case/run model
- one 21-stage dependency contract
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
