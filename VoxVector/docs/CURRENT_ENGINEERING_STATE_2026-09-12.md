# VoxVector Current Engineering State — 2026-09-12

## Authority

- Repository: `darenprince/darenprince-author`
- Branch: `main`
- Backend/API/analysis: `VoxVector/`
- React frontend: `voxvector/`
- Crown Labs executive mirror: `docs/crownlabsbible/04-product-dossiers/VoxVector/`
- Backend source release: **0.2.27**
- Frontend source release: **0.2.38**
- Current deployed backend revision: `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80`

This is the living engineering handoff. Older dated state files remain historical evidence.

## September 12 validation snapshot

A controlled 183.3-second WAV completed the deployed constrained-production path on backend **0.2.27** and source revision `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80`.

Identifiers:

- case `ecdc428a-7009-47ed-99de-7b58baf52860`
- source `9c464d7b-89f0-41ea-b1eb-8707f12c9b2b`
- request `8e43718cb11746f3852863da4dbe536a`
- run `d05dc0bb-0f04-4c15-bb0e-6da1dba38935`

Result:

- run status: **completed**
- elapsed: **247,984 ms**
- **17/21 stages completed**
- **0 stages failed**
- **4 stages intentionally not run**
- Stage 05 detected **26 speech segments**
- faster-whisper completed in about **150.1 seconds**
- durable acquisition checkpoint recorded **58 timestamped transcript segments / 246 words**
- transcript/audio alignment was available before Stage 10
- transcription post-GC RSS: **116.63 MB**
- Stage 10 admission RSS: **118.6 MB** under the **416 MB** admission ceiling / **512 MB** memory limit
- Stage 10 acoustic extraction completed in about **73.8 seconds**
- Stage 10 after-GC RSS: **128.63 MB**
- the same Render instance remained active; no uncontrolled API restart occurred

Issue **#941 is complete**. Current controlled transcription durability and Stage 10 production proof are established for this deployed revision.

## Frontend 0.2.38 validation repair

The actual canonical Developer Dashboard in `voxvector/src/components/DeveloperConsole.jsx` was updated after the browser/validation review.

Frontend 0.2.38 now:

- passes `setProgress` into `CaseWorkbench`, fixing the file-picker state-setter error that had been masked by the existing direct file-input fallback;
- keeps the fallback as defensive recovery rather than making it the normal React state path;
- recognizes the controlled transcription proof only when live backend revision matches the accepted proof revision;
- shows transcription as **PROVEN** on that matched runtime rather than `execution ready, unverified`;
- changes **Next Engineering Move** from stale `Transcription first` copy to **#970 diarization**;
- replaces the old 71% / 20-of-28 release-readiness presentation with evidence-backed controlled-proof, foundation, next-P0 and Render state;
- labels the 28-task checklist as implementation coverage rather than release readiness;
- includes a focused regression contract for the upload setter and dashboard proof wording.

The immediately preceding validation-snapshot QA run `34684789612` completed successfully. Because 0.2.38 changes frontend source after that run, exact-head QA for the final 0.2.38 synchronization head remains the required verification boundary before calling the release source QA-verified.

## Intentionally not run in the successful backend case

- Stage 06 Speaker Identification / Diarization: cloud provider was not invoked in the constrained Render analysis path
- Stage 14 Question / Answer Alignment: no question context attached
- Stage 15 Within Speaker Baseline: no independent baseline attached
- Stage 19 Validation and Calibration Gate: inferential validation gate not invoked

These are not failures.

## Fresh Render state

Connected Render inspection on September 12 established:

- service: `voxvector-api`
- service status: live / not suspended
- region: Oregon
- health check: `/health`
- production auto-deploy: disabled
- live deployment: `dep-daifrgoae00c73ebcc20`
- deployed commit: `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80`
- fresh `/health`: HTTP 200, `status=ok`, runtime self-test passed
- pipeline version: **0.2.27**
- health contract: 21 total, 16 implemented foundations, 1 queued, 4 conditional/not invoked
- faster-whisper: base, CPU/int8, beam 1, one thread, one worker, isolated process, 165-second timeout, execution ready
- pyannoteAI cloud primary: configured and execution ready

Backend deployment identity is intentionally separate from frontend 0.2.38 source identity.

## Runtime defect discovered during visual validation

A separate Developer Console browser session exposed a real case-read failure while the service itself remained healthy. At 2026-09-12 08:28 UTC:

- `/health` continued returning 200
- `GET /v1/cases/1813af9d-9d8b-4090-a4b3-0acff4551f81` encountered `TimeoutError: The read operation timed out`
- the traceback originated while diagnostic middleware persisted the completed-request record through `observability.py`
- that request returned HTTP 500
- subsequent reads of the same case returned HTTP 200

This is classified as an **observability persistence timeout leaking into the request path**, tracked by **#998**. Diagnostic persistence must become best-effort/non-fatal to an otherwise successful product request.

## Visual/browser evidence

The September 12 Confidential IP screenshot set visually confirms current Developer Console surfaces for:

- dashboard/health and engineering state
- navigation drawer
- case creation
- source upload and persistence progress
- protected playback
- waveform and spectral visualization
- analysis engine stage progression

The visual 4:16 `1017 LA-524 2.wav` session is separate from the 183.3-second controlled proof case and must not be conflated with it. Its visible fetch failure is evidence for the reliability work above, not evidence that the successful controlled analysis run failed.

## Debug Bundle status

A sanitized debug bundle was generated for the successful controlled run. It includes:

- case/run record
- runtime health snapshot
- Render service/deploy status
- 100 Render logs for the bounded analysis window
- a Supabase Render-log mirror path

The bundle intentionally excludes raw audio and transcript text. Its manifest currently reports zero correlated VoxVector event rows and zero correlated error-report rows in the exported bundle, so **#959 remains open** until the dual-copy correlation path is complete.

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

## Current release-critical order

1. **#970** real cloud-primary pyannoteAI execution and persisted speaker evidence
2. **#971** persisted transcript/audio/speaker alignment using the same run/source
3. **#963** historical-case reopen/playback/artifact/report rehydration
4. **#930** bound intermittent authenticated upload 400 behavior
5. **#998** make diagnostic persistence non-fatal to product requests
6. **#959** complete dual-copy observability and Debug Bundle correlation
7. authenticated desktop/mobile acceptance for current auth/profile/navigation/pipeline/upload UI
8. **#972** two complete same-revision/configuration golden cases
9. scientific validation separately

## Evidence boundary

Current evidence proves a real completed same-revision controlled transcription + Stage 10 backend run and source-level frontend 0.2.38 repairs. It does **not** prove current cloud speaker execution, human speaker identity, general deception validity, transcript truthfulness, legal admissibility, or scientific accuracy.
