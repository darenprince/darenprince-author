# VoxVector MVP Build Plan

## Purpose

This document defines the shortest dependency-ordered path from the current repository state to a complete connected engineering MVP. It is subordinate to `MVP_RELEASE_GATE.md` for the final exit criteria.

## Current starting state

- backend release: **0.2.27**
- frontend release: **0.2.37**
- current engineering handoff: `CURRENT_ENGINEERING_STATE_2026-09-12.md`
- canonical 21-stage order uses Stage 05 Speech Segmentation and Stage 06 Speaker Identification / Diarization
- public navigation/site-map/pipeline projection source work is merged
- login-time API wake and shared account-profile source behavior are present in current `main`
- no duplicate frontend/backend implementation should be created to finish the remaining gates

## Already connected

The current product foundation includes:

- case creation/list/read
- private source upload/persistence
- source metadata/provenance
- authenticated signed playback route
- case-bound analysis route
- persisted run/stage/provenance structures
- deterministic speech segmentation foundation
- faster-whisper integration with historical real provider execution
- pyannoteAI cloud-primary diarization architecture
- transcript/alignment foundations
- acoustic/prosodic/temporal/evidence foundations
- Stage 10 bounded-admission source foundation
- guarded classification/disposition architecture
- Developer Console health/case/pipeline/diagnostic/documentation surfaces
- durable Supabase request/error evidence
- public/authenticated React shell and current navigation paths

## Shortest remaining dependency chain

### 1. #941 — controlled current-revision speech/durability/Stage 10 proof

Use the known controlled 183.3-second source through the authenticated canonical Analysis Workspace on the intended deployed revision.

Acceptance:

- transcription completes or fails within the explicit bounded provider contract;
- upstream transcript/provider/alignment state is durably checkpointed before Stage 10;
- Stage 10 either completes or is refused cleanly by memory admission;
- no uncontrolled API restart;
- case/run/request/process/memory evidence is correlated.

### 2. #970 — real cloud-primary speaker execution

Recheck the current pyannoteAI provider contract, deliberately enable the intended route gate, run the real cloud-primary provider, normalize/persist speaker evidence, and read it back from the same run.

### 3. #971 — persisted multimodal alignment

Consume the persisted transcript and persisted speaker evidence from the same source/run. Build/persist/read back the canonical transcript/audio/speaker timeline with ambiguity represented explicitly.

### 4. #963 — historical case rehydration

Reopen a persisted case without re-upload and restore:

- protected source playback;
- persisted transcript;
- persisted speaker/alignment evidence;
- report/failure/provenance state;
- correct source/case switching without stale browser-local state.

### 5. #930 — bound intake reliability

Use current candidate uploads to either reproduce and identify the intermittent pre-handler 400 or record enough consecutive successful attempts plus sanitized request-envelope evidence to bound the residual risk honestly.

### 6. #959 — production observability acceptance

For one controlled run, prove the intended correlated evidence appears through the operational logging boundaries and generate/inspect one real sanitized Debug Bundle. Preserve the distinction between Render-native evidence, Supabase durable evidence and browser presentation.

### 7. Authenticated browser acceptance

Verify already-merged/current-source behavior rather than creating replacement implementations:

- login wake ordering and cold/warm readiness presentation;
- developer/admin/user routing and unauthorized denial;
- session restore/sign-out/reset;
- self-profile save/reload;
- pipeline projection against live backend data;
- Request Access, anchors, site map and nested-route navigation;
- current landing hero treatment;
- desktop/mobile accessibility and responsive behavior.

### 8. #972 — freeze and prove two golden cases

Freeze one exact candidate revision/configuration. Run exact-head QA, intentionally deploy/publish, obtain fresh runtime identity, then complete two full golden cases without candidate-affecting changes between them.

### 9. Scientific validation

Continue task/population-specific validation separately. Do not convert an engineering-MVP pass into a scientific accuracy claim.

## Current stage maturity context

The canonical 21-stage pipeline currently has approximately 16 implemented analytical/runtime foundations, four conditional/not-invoked stages, and an open current cloud-primary speaker-execution gate. This is a planning/maturity map, not a validated-indicator count.

## Non-blocking work

Unless it becomes a direct golden-path blocker, defer convenience/polish work such as richer notification-center UX, additional operator controls, broad visual refinements and nonessential secondary dashboards until the P0 dependency chain is accepted.

## Engineering rule

Finish existing canonical owners. Do not create patch layers, duplicate case stores, alternate analysis pipelines, second authentication systems, replacement workspaces or competing status modules to satisfy these steps.
