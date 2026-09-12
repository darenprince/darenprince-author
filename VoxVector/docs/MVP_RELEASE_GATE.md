# VoxVector Engineering MVP Release Gate

**Status:** canonical engineering MVP exit gate  
**Tracker:** #915

## Purpose

This gate defines what must be true before VoxVector can be called an engineering MVP. It does not define scientific validation or commercial-production certification.

## Current source/version context

- backend release: **0.2.27**
- frontend release: **0.2.37**
- 2026-09-12 engineering baseline before the documentation synchronization: `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80`
- exact-baseline VoxVector QA `34679916767`: success
- current living engineering handoff: `CURRENT_ENGINEERING_STATE_2026-09-12.md`

Subsequent documentation/status commits can make `main` newer. The final candidate must be explicitly frozen before the two-run golden proof.

## Already established source foundations

- canonical 21-stage backend contract;
- Stage 05 Speech Segmentation → Stage 06 Speaker Identification / Diarization order;
- case creation/source persistence/signed playback/case-bound analysis routes;
- source/run/provenance persistence foundations;
- faster-whisper adapter with historical real provider execution;
- pyannoteAI cloud-primary provider architecture;
- upstream provider checkpoint foundation before Stage 10;
- fail-fast Stage 10 admission/serialization foundation;
- stable persisted route `run_id` plus separate pipeline identity;
- durable diagnostics and protected Developer Console surfaces;
- merged public navigation/site-map/pipeline projection repairs;
- current login-time API wake and shared profile source;
- canonical hero artwork with obsolete legacy darkening cascade retired.

These foundations are not the exit gate by themselves.

## Remaining entry conditions for the frozen candidate

### P0 runtime / persistence

- [ ] #941: one controlled same-WAV run on the intended deployed revision proves provider completion or bounded failure, durable upstream checkpointing, and Stage 10 completion or clean memory-admission refusal without uncontrolled API restart
- [ ] #970: real cloud-primary pyannoteAI execution persists speaker evidence
- [ ] #971: transcript/audio/speaker alignment executes, persists, and reads back from the same source/run
- [ ] #963: a historical case reopens with protected playback plus persisted transcript/speaker/alignment/report/provenance state without re-upload
- [ ] #930: intermittent authenticated source-upload 400 behavior is reproduced/root-caused or tightly bounded with current repeatability/sanitized envelope evidence
- [ ] #959: one controlled run proves correlated operational evidence and a real sanitized Debug Bundle

### Authenticated application acceptance

- [ ] explicit login wake is observed before role routing without being mistaken for readiness
- [ ] developer/admin/user routing and unauthorized denial are verified
- [ ] session restore, sign-out and password-reset behavior are verified
- [ ] user/admin/developer self-profile save + reload is verified where supported
- [ ] merged pipeline projection is verified on desktop/mobile against real backend state
- [ ] merged Request Access/navigation/site-map/hash behavior is verified on desktop/mobile
- [ ] current hero artwork/cascade is visually verified on desktop/mobile

### Security / operations

- [ ] no protected service-role/provider/deploy-hook secret is exposed to browser source
- [ ] current Supabase SECURITY DEFINER dashboard summary boundary is explicitly accepted/remediated
- [ ] leaked-password protection decision is explicitly addressed
- [ ] critical hardening findings that can affect the golden path are resolved or explicitly bounded

## Candidate freeze

When the entry conditions are accepted:

1. choose one exact Git commit;
2. record frontend and backend release values;
3. record the intended runtime configuration/provider gates;
4. run exact-head repository QA;
5. deliberately publish/deploy the candidate;
6. obtain fresh runtime `/health` evidence for that exact backend revision;
7. do not change candidate-affecting source/configuration until the two-run proof completes.

Any candidate-affecting source or runtime-configuration change resets the two-run count.

## Golden case 1

- [ ] authenticated supported source intake succeeds
- [ ] source/provenance persist
- [ ] speech segmentation completes
- [ ] required speaker provider executes/persists evidence
- [ ] transcription executes/persists evidence
- [ ] multimodal alignment persists
- [ ] upstream checkpoint is readable before dependent heavy work
- [ ] Stage 10 completes or is cleanly bounded without API restart
- [ ] required downstream evidence/report/provenance persist
- [ ] closing/reopening the case restores protected source playback and persisted artifacts
- [ ] Render/Supabase/debug evidence is correlated for the same case/run/request/revision

## Golden case 2

Repeat the required full path on the same exact deployed revision/configuration.

- [ ] complete successfully or terminate only within explicitly accepted bounded behavior
- [ ] persist/read back the required artifacts
- [ ] correlate the same operational evidence classes
- [ ] no candidate-affecting source/configuration change occurred between run 1 and run 2

## Exit decision

The engineering MVP gate passes only when the required current-runtime, persistence, browser and same-revision repeatability evidence is recorded.

A passed engineering MVP gate means a working, repeatable software product path. It does **not** establish deception-detection accuracy, sensitivity/specificity, validated speaker identity, transcript truthfulness, generalization, legal admissibility or universal production readiness.

Scientific validation remains a separate program under `VALIDATION.md`.
