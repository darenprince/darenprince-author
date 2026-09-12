# VoxVector Engineering MVP Release Gate

**Status:** canonical engineering MVP exit gate  
**Tracker:** #915

## Current source/version context

- backend release: **0.2.27**
- frontend release: **0.2.37**
- currently deployed backend revision: `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80`
- exact-baseline QA `34679916767`: success

## September 12 gate advancement

Issue **#941 passed and is closed**.

The controlled 183.3-second WAV completed the current deployed constrained-production path:

- 17/21 stages complete
- 0 failed
- 4 intentionally not run
- faster-whisper completed in ~150.1 s
- 58 transcript segments / 246 words durably checkpointed
- transcript/audio alignment available before Stage 10
- Stage 10 admitted at 118.6 MB RSS under a 416 MB admission ceiling / 512 MB limit
- Stage 10 completed in ~73.8 s
- no uncontrolled API restart

The first runtime/durability entry condition is therefore complete.

## Remaining entry conditions for the frozen candidate

### P0 runtime / persistence

- [x] #941: controlled current-revision transcription, durable upstream checkpoint and Stage 10 production proof
- [ ] #970: real cloud-primary pyannoteAI execution persists speaker evidence
- [ ] #971: transcript/audio/speaker alignment executes, persists and reads back from the same source/run
- [ ] #963: historical case reopens with protected playback plus persisted transcript/speaker/alignment/report/provenance state without re-upload
- [ ] #930: intermittent authenticated source-upload 400 behavior is reproduced/root-caused or tightly bounded
- [ ] observability persistence failures cannot turn an otherwise healthy product request into HTTP 500
- [ ] #959: controlled run proves complete dual-copy correlation and a real sanitized Debug Bundle

### Debug Bundle evidence

A real sanitized bundle now exists for the successful controlled run and includes case/run data, runtime health, Render status and 100 Render logs. The current manifest reports a Supabase Render-log mirror but zero exported exact VoxVector events and zero correlated error records. Therefore #959 remains incomplete.

### Authenticated application acceptance

September 12 screenshots provide direct visual evidence of:

- Developer Overview / engineering state
- navigation drawer
- case creation
- source upload
- protected playback
- waveform and spectral visualization
- analysis-stage progression

Remaining browser acceptance:

- [ ] role routing / unauthorized denial matrix
- [ ] session restore, sign-out and password-reset behavior
- [ ] profile save + reload for supported roles
- [ ] complete desktop/mobile pipeline/navigation/site-map/hero acceptance
- [ ] visible error recovery after the observability timeout fix

### Security / operations

- [ ] no protected secret exposed to browser source
- [ ] Supabase SECURITY DEFINER dashboard-summary boundary accepted/remediated
- [ ] leaked-password protection decision addressed
- [ ] critical golden-path hardening resolved or bounded

## Candidate freeze

After #970/#971/#963/#930, observability isolation, #959 and authenticated browser acceptance:

1. choose one exact Git commit;
2. record frontend/backend versions;
3. record runtime/provider configuration;
4. run exact-head QA;
5. deliberately publish/deploy;
6. obtain fresh `/health` for that exact backend revision;
7. freeze source/configuration through the two-run proof.

## Golden case 1

- [ ] supported authenticated source intake succeeds
- [ ] provenance persists
- [ ] speech segmentation completes
- [ ] required speaker provider executes/persists evidence
- [ ] transcription executes/persists evidence
- [ ] speaker/transcript/audio alignment persists
- [ ] upstream checkpoint is readable
- [ ] Stage 10 completes without uncontrolled restart
- [ ] downstream evidence/report/provenance persist
- [ ] close/reopen restores protected playback and persisted artifacts
- [ ] Render/Supabase/debug evidence is correlated

## Golden case 2

Repeat the same required full path on the same exact revision/configuration.

## Exit boundary

Engineering MVP requires the remaining runtime, persistence, browser and repeatability evidence. It does not establish deception-detection accuracy, scientific validity, transcript truthfulness, speaker identity validity or legal admissibility.
