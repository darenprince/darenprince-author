# VoxVector MVP Build Plan

## Purpose

This document defines the shortest dependency-ordered path from the current repository state to a complete connected engineering MVP. `MVP_RELEASE_GATE.md` remains the final exit checklist.

## Current starting state

- backend release: **0.2.27**
- frontend release: **0.2.37**
- deployed backend revision: `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80`
- current engineering handoff: `CURRENT_ENGINEERING_STATE_2026-09-12.md`
- current runtime snapshot: `VALIDATION_SNAPSHOT_2026-09-12.md`
- canonical 21-stage order uses Stage 05 Speech Segmentation and Stage 06 Speaker Identification / Diarization
- #941 controlled transcription/durability/Stage 10 proof: **passed and closed**

## Already connected and currently proven

The current product foundation includes:

- case creation/list/read
- private source upload/persistence
- source metadata/provenance
- authenticated signed playback
- case-bound analysis
- persisted run/stage/provenance structures
- deterministic speech segmentation
- faster-whisper integration
- **current same-revision faster-whisper execution proof**
- **durable transcript checkpoint before Stage 10**
- **current transcript/audio alignment proof**
- **bounded Stage 10 admission and completion proof**
- pyannoteAI cloud-primary diarization architecture/readiness
- acoustic/prosodic/temporal/linguistic/evidence foundations
- guarded classification/disposition architecture
- Developer Console health/case/pipeline/diagnostic/documentation surfaces
- durable Supabase request/error evidence
- real sanitized Debug Bundle foundation
- public/authenticated React shell and current navigation paths

## Shortest remaining dependency chain

### 1. #970 — real cloud-primary speaker execution

This is now the first P0 runtime gate.

Acceptance:

- confirm current pyannoteAI cloud request/response contract;
- deliberately invoke the provider on the controlled source;
- capture sanitized provider/run provenance;
- normalize speaker regions;
- persist speaker evidence to the same case/source/run;
- read the speaker artifact back;
- keep provider failure explicit and bounded;
- record timing/cost/limits for the constrained MVP path.

### 2. #971 — persisted multimodal alignment

Consume the persisted transcript and persisted speaker evidence from the same source/run. Persist/read back the canonical transcript/audio/speaker timeline with ambiguity represented explicitly.

### 3. #963 — historical case rehydration

Reopen a persisted case without re-upload and restore:

- protected source playback;
- persisted transcript;
- persisted speaker/alignment evidence;
- report/failure/provenance state;
- correct source/case switching without stale browser-local state.

### 4. #930 — bound intake reliability

Use current candidate uploads to either reproduce and identify the intermittent pre-handler 400 or tightly bound the residual risk with repeated successful attempts and sanitized request-envelope evidence.

### 5. #998 — isolate observability persistence from product success

A September 12 browser validation case returned HTTP 500 because `DIAGNOSTICS.emit()` timed out while persisting a completed-request record. `/health` stayed healthy and later case reads succeeded.

Acceptance:

- external diagnostic persistence is best-effort/non-fatal;
- product GET success remains success if telemetry storage times out;
- local/Render evidence still records the degradation;
- no recursive diagnostic failure loop;
- regression coverage exists;
- Render/browser verification confirms the repair.

### 6. #959 — complete production observability acceptance

A real sanitized Debug Bundle now exists with case/run state, runtime health, Render status and 100 Render logs plus a Supabase Render-log mirror.

Remaining acceptance:

- exact durable VoxVector event correlation;
- correlated error-report behavior where applicable;
- final secret/redaction review;
- non-fatal observability behavior from #998;
- Developer Console browser readback of the completed evidence path.

### 7. Authenticated browser acceptance

Verify the current canonical implementation:

- login wake ordering and cold/warm readiness presentation;
- developer/admin/user routing and unauthorized denial;
- session restore/sign-out/reset;
- self-profile save/reload;
- pipeline projection against live backend data;
- Request Access, anchors, site map and nested-route navigation;
- current landing hero treatment;
- error recovery after #998;
- desktop/mobile accessibility and responsive behavior.

The September 12 PDFs already provide direct visual evidence for dashboard, drawer, case creation, upload, protected playback, waveform/spectral rendering and live analysis progression.

### 8. #972 — freeze and prove two golden cases

Freeze one exact candidate revision/configuration. Run exact-head QA, deliberately deploy/publish, obtain fresh runtime identity, then complete two full golden cases without candidate-affecting changes between them.

### 9. Scientific validation

Continue task/population-specific validation separately. Do not convert an engineering-MVP pass into a scientific accuracy claim.

## Current stage maturity context

Fresh health reports approximately 16 implemented analytical/runtime foundations, one queued stage and four conditional/not-invoked stages.

The September 12 controlled run separately completed 17/21 stages with zero failures and four intentionally not run. These are different metrics and must not be collapsed into a single completion percentage.

## Engineering rule

Finish existing canonical owners. Do not create patch layers, duplicate case stores, alternate analysis pipelines, second authentication systems, replacement workspaces or competing status modules.
