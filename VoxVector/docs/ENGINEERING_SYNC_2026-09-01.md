# VoxVector Engineering Synchronization — 2026-09-01

## Current source of truth

Canonical branch: `main`

Current source revision: see GitHub `main` branch at time of use. Historical commit references in older records remain historical evidence.

## Operational foundation

- production case workflow has previously completed the observed case → upload → private media persistence → case-bound analysis path;
- canonical results envelope is integrated at the case-analysis API boundary;
- diagnostic duration projection is normalized to the existing integer schema;
- relational diagnostic date filtering is enforced;
- package/runtime version is synchronized at 0.2.26.

## Evidence acquisition

Implemented foundation and contracts:

- media profile;
- speech/silence timeline;
- provider-neutral transcript artifact;
- provider-neutral diarization artifact;
- faster-whisper adapter;
- pyannote Community-1 adapter;
- transcript/speaker overlap alignment;
- multimodal timeline artifact;
- explicit configured, not configured, completed, and unavailable provider states.

Production execution of the heavy providers is still an external runtime verification gate.

## Execution observability

Implemented:

- request_id;
- trace_id;
- analysis_run_id;
- UTC lifecycle timestamps;
- monotonic duration measurements;
- stage lifecycle records;
- speech provider runtime log lines;
- persistent sanitized diagnostics;
- GitHub Actions Render observability bridge.

Internal per-stage callbacks remain incomplete in the monolithic analytical pipeline. No fabricated stage timing is permitted.

## Render integration

GitHub Actions workflow:

`.github/workflows/render-observability.yml`

Secret:

`RENDER_API_KEY`

The key is consumed only in Actions and is not stored in the application or repository.

Manual workflow inputs:

- Render service ID;
- log lookback window.

The workflow gathers service inventory, deployment history, and recent service logs, then stores a seven-day diagnostic artifact.

Render's CLI supports API-key authentication through `RENDER_API_KEY`, service deploy inspection, and filtered log access. Render also provides dashboard log explorer/live tail, service CPU/memory metrics, and optional external log streaming. These remain infrastructure observability rather than substitutes for application timing truth.

## Developer Console target state

The Console should expose:

- source/runtime revision;
- exact QA state;
- Render deployment state;
- speech provider readiness;
- active analysis run;
- trace correlation;
- stage progress;
- stage durations where measured;
- provider progress/events;
- evidence acquisition artifacts;
- warnings/errors;
- uncertainty and limitations.

It must distinguish configured from installed from executed from validated.

## Active engineering sequence

### P0

1. Verify the new GitHub Actions Render observability workflow with the configured repository secret.
2. Run the short controlled WAV against the speech-enabled Render runtime.
3. Record real faster-whisper transcription runtime and output.
4. Record real pyannote diarization runtime and output.
5. Persist and read back transcript, speaker, and multimodal artifacts.

### P1

6. Connect transcript output to the existing linguistic/disfluency analysis path.
7. Make acoustic aggregation speaker-aware.
8. Build within-speaker baseline acquisition from real speaker tracks.
9. Build transcript/audio alignment validation fixtures.
10. Expose trace-linked live analysis progress in the Developer Console.
11. Add Render CPU/memory evidence to the engineering run record where the account/API exposes it.

### P2

12. Expand multimodal Evidence Explorer.
13. Add question/answer context ingestion.
14. Add evidence relationship graph and convergence/conflict views.
15. Build assessment/reporting workflow.
16. Add case history/reopen behavior.
17. Complete authenticated browser/mobile verification.

## Scientific boundary

None of these engineering tasks establish deception-detection validity. Provider output, acoustic measurements, transcript content, diarization labels, and runtime confidence are observations/evidence inputs. Scientific inference requires the separate validation program.
