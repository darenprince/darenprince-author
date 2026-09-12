# VoxVector Capability Status

This living document separates product scope, current implementation, runtime evidence, engineering acceptance, and scientific validation.

An unimplemented capability remains active product scope unless explicitly removed. A implemented foundation is not automatically production-verified or scientifically validated.

## Version and source context

- backend release authority: **0.2.27**
- frontend release authority: **0.2.37**
- current engineering handoff: `CURRENT_ENGINEERING_STATE_2026-09-12.md`
- 2026-09-12 reconciliation baseline before documentation/status commits: `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80`
- exact-baseline VoxVector QA `34679916767`: success

Subsequent documentation/status commits legitimately make `main` newer. Do not rewrite the baseline SHA as a deployment claim.

## Capability matrix

| Capability | Source state | Runtime / evidence state | Remaining acceptance |
|---|---|---|---|
| Case create/list/read/delete | implemented | active case API | owner-scoped browser/error edge cases continue through release gate |
| Private source upload | implemented | historical/current successful persistence | #930 intermittent authenticated 400 bounding |
| Source metadata + SHA-256 provenance | implemented | persisted in case/source path | final golden-case readback |
| Protected playback | implemented | signed playback route | #963 historical reopen/playback proof |
| Speech segmentation | implemented foundation | historical controlled execution | current golden-path persistence/readback |
| Speaker diarization | cloud-primary path wired | pyannoteAI configured/readiness evidence | #970 real current execution + persisted speaker evidence |
| Transcription | implemented integration | historical real faster-whisper beam-1 execution | #941 current same-revision repeatability/durability |
| Transcript alignment | implemented foundation | historical/partial evidence | #971 persisted transcript/audio/speaker proof |
| Eligibility / reliability | implemented foundation | source/tests | task/population validation remains separate |
| Stage 10 acoustic extraction | implemented with admission controls | source/tests; historical constrained-memory incident | #941 controlled current production proof |
| Prosodic / voice-quality analysis | implemented foundation | source/tests | scientific interpretation/validation separate |
| Temporal / pause analysis | implemented foundation | source/tests | scientific interpretation/validation separate |
| Linguistic / disfluency analysis | conditional | requires transcript evidence | current full-path run and scientific interpretation separate |
| Question / answer alignment | conditional | requires question/context boundaries | product/runtime proof when inputs exist |
| Within-speaker baseline | optional integrated | source/tests | runtime use requires independent baseline input |
| Evidence assembly | implemented foundation | source/tests | complete persisted end-to-end evidence proof |
| Convergence / conflict | implemented foundation | source/tests | scientific interpretation/calibration separate |
| Candidate classification | guarded foundation | intentionally conservative | no validated deception inference claimed |
| Validation / calibration gate | not invoked | scientific program required | explicit validated task/population/model evidence |
| Final disposition | guarded foundation | source/tests | scientific authorization/calibration required for non-indeterminate inference |
| Audit / provenance output | implemented foundation | source/run/diagnostic persistence | final golden-case completeness proof |
| Historical case rehydration | partial foundation | source/case persistence exists | #963 complete reopen/playback/artifact/report proof |
| Developer Console | implemented active surface | health/case/pipeline/diagnostics/docs/QA surfaces exist | authenticated desktop/mobile acceptance |
| Public navigation/site map | merged | source + exact-baseline QA | rendered desktop/mobile acceptance |
| Login-time API wake | current source | source/tests | cold/warm authenticated browser observation |
| Shared self-profile | current source | source/tests | save/reload browser acceptance |
| Dual operational observability | implemented foundation | active Supabase durable diagnostics + protected Render routes | #959 production dual-evidence/debug-bundle acceptance |
| Golden-case engineering repeatability | not yet passed | historical partial/provider evidence only | #972 two complete runs on one frozen revision/configuration |
| General deception validity | not established | no authorized claim | scientific validation program |

## Canonical 21-stage order

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

Any living status surface that reverses Stage 05 and 06 is stale.

## Current provider truth

### Transcription

Canonical provider: faster-whisper.

Historical real execution exists. Current controlled repeatability, durable upstream checkpointing and Stage 10 containment remain #941.

### Speaker diarization

Canonical primary provider: pyannoteAI cloud.

Wired/configured does not mean executed. #970 remains the current execution/persistence gate.

### Hugging Face

Connected identity: `crownlabs-voxvector`.

Hugging Face is relevant to optional/local model and fallback workflows. It does not prove the pyannoteAI cloud-primary path. During the 2026-09-12 reconciliation, model/Space discovery actions returned connector-level not-found errors, so no Hub inventory is claimed from those calls.

### Legacy LLM/Base44 status

Old Base44 TranscribeAudio/InvokeLLM dashboard provider descriptions are retired from current canonical provider truth. Transcription is faster-whisper. Current evidence synthesis/classification is application-owned and guarded; no active LLM analysis provider is claimed by default.

## Current frontend status

Merged/current source includes:

- Request Access → canonical login;
- route-qualified landing anchors and restored hash navigation;
- human site map;
- styled Pipeline and Analysis Methods destinations;
- corrected Stage 05/06 projection;
- backend-driven pipeline status where available;
- canonical hero artwork/cascade ownership;
- one-shot login-time API wake;
- shared role-aware self-profile implementation.

The Developer Console startup step is labeled **Pipeline contract**. COMPLETE there verifies that the backend reported a 21-stage contract. The separate foundations count communicates maturity.

## Current operational evidence

Connected Supabase reconciliation found:

- ACTIVE_HEALTHY project on PostgreSQL 17.6;
- RLS on inspected operational public tables;
- `voxvector-user-admin` Edge Function ACTIVE at version 2 with JWT verification;
- active request/error diagnostics;
- 6,405 private log objects and 28 private media objects at inspection time;
- current diagnostic request rows tagged with the reconciled source baseline `66f2ea...`.

Current Supabase hardening advisories include the dashboard SECURITY DEFINER boundary, leaked-password protection, selected unindexed foreign keys, RLS auth-function reevaluation inefficiencies and unused error-report indexes.

## Current release-critical queue

1. #941 controlled current-revision transcription/durability/Stage 10 proof
2. #970 real cloud-primary diarization + speaker persistence
3. #971 persisted multimodal alignment
4. #963 historical-case rehydration
5. #930 upload reliability bounding
6. #959 production observability/debug-bundle acceptance
7. authenticated desktop/mobile acceptance for current frontend/auth behavior
8. #972 two complete same-revision/configuration golden cases
9. scientific validation separately

## Evidence boundary

Source implementation, test success, deployment, runtime health, provider execution, durable artifacts, browser acceptance, engineering repeatability and scientific validation are different evidence states. This document never promotes one into another without supporting evidence.
