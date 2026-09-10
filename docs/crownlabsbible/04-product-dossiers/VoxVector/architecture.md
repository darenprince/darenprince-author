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

- canonical GitHub `main` observed before the current follow-up branch: `a249f3f781a221313549e941b9cdb650b8683a2f`
- last documented controlled Render deploy: `dep-dah7usjl550s73e00350`, `live`
- that deployed source: exact `f0dda136...`
- Render auto-deploy: disabled
- live Render build at that evidence point: `requirements.txt` + `requirements-speech.txt`
- canonical root `render.yaml` at that evidence point: `requirements.txt` + `requirements-transcription.txt`
- Blueprint/live-service drift: issue #964

One controlled 183.3-second production case completed faster-whisper beam-1 transcription with 58 transcript segments and 246 timestamped words. The API later restarted during the post-provider/downstream transition after memory entered the constrained runtime danger zone. The owner confirmed the incident was a memory problem.

PR #962 merged the first #941 containment repair. A post-merge Codex review identified two remaining source defects: Stage 10's route preflight did not reserve the shared heavyweight execution boundary for the full composite analysis, and the result envelope could prefer the pipeline-internal UUID over the stable case-run ID. Follow-up branch `fix/voxvector-stage10-admission-envelope` addresses both findings before production rerun evidence is accepted. This work does not change VoxVector's scientific methodology.

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

**[Detailed 21-stage pipeline →](./analysis-pipeline.md)**

## Post-transcription durability and memory boundary

The constrained execution sequence is:

`provider completion → provider cleanup → durable same-run upstream checkpoint → Stage 10 route preflight → shared heavyweight admission lock + RSS recheck → downstream composite analysis while the lock remains held`

Completed transcript/alignment/provider output must be persisted before dependent heavyweight work is trusted to complete.

Stage 10 memory admission is an operational runtime guard. It is separate from Stage 09 Eligibility and Reliability and must not be interpreted as a scientific eligibility result.

Current reference memory policy is 512 MiB with 96 MiB reserved headroom, yielding a 416 MiB admission ceiling.

The follow-up source applies the existing process-wide heavyweight phase guard to the complete canonical `VoxVectorPipeline.analyze()` call. That makes the actual downstream admission and execution one serialized resource boundary instead of allowing separate case requests to pass independent RSS checks and overlap heavyweight composite work.

`process_instance_id` identifies the current Python process. `render_instance_id` preserves hosting-provider instance provenance separately because Render can restart Python while retaining the same infrastructure instance label.

## Case and run identity

The persisted case run remains the durable analysis identity across source, acquisition, stage state, reporting, history, and failure recovery. The result envelope exposes that stable ID as `run_id`.

The canonical analytical pipeline still creates its own internal UUID. That identifier is preserved separately as `pipeline_run_id`; it must not replace the case-run identifier used by persisted cases and reopened history.

## Product experience target

The product target remains a connected case-centered intelligence workspace containing recording intake, source metadata, audio playback, synchronized waveform, speaker regions, transcript, analytical tracks, evidence markers, pipeline state, evidence synthesis, assessment, reports, and history.

Persisted source/transcript artifacts must remain available after later-stage failure. Reopened-case playback/transcript rehydration is tracked in #963 and consumes the existing case/source/run model rather than creating a duplicate persistence path.

## Provider boundary

Current production architecture uses:

- transcription: faster-whisper, constrained `base` / CPU / int8 / beam 1 path
- diarization primary: pyannoteAI cloud via `pyannote_api`
- diarization fallback: optional local Community-1 only when explicitly enabled

The cloud-primary diarization adapter does not require loading local Community-1/PyTorch merely to call the cloud provider. Current documented live Render dependency drift involving the broader speech requirements is therefore tracked separately in #964.

Provider readiness is not provider execution. The controlled faster-whisper run is real provider-execution evidence, but end-to-end memory-safe analysis still requires #941 follow-up review, exact-head QA, deliberate deployment, and controlled production verification.

## Developer Console and observability

The Developer Console remains the engineering cockpit over real backend/runtime evidence. Issue #959 separately owns dual Render + Supabase log durability, provider-worker correlation, bounded Render-log mirroring, and the server-generated Download Debug Bundle.

## Design properties

- one canonical analysis engine
- one case/run model
- one 21-stage dependency contract
- bounded frame processing
- durable completed upstream artifacts
- process-wide serialized heavyweight execution under one admission guard
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
