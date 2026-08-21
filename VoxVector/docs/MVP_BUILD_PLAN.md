# VoxVector MVP Build Plan

## Purpose

This document defines the shortest engineering path from the current repository state to a working connected VoxVector product experience.

The plan is execution oriented. It prioritizes the connected Analysis Workspace represented by the reference screens instead of expanding the method library first.

## MVP definition

The MVP is one complete connected case workflow:

1. create an analysis case
2. upload a recording
3. validate the source
4. persist provenance
5. decode the recording
6. play the audio
7. render the waveform
8. expose real pipeline state
9. identify speakers
10. generate a timestamped transcript
11. synchronize transcript and audio
12. expose real analytical tracks
13. create timestamped evidence
14. synthesize evidence
15. create an assessment object
16. generate a report
17. persist the case
18. reopen the case

The MVP is defined by connected real workflows rather than the number of screens.

## Priority rule

Work in dependency order.

Do not build downstream presentation surfaces before the contract that powers them exists.

Do not create a second backend capability in the frontend merely to make a screen appear complete.

Every visible state must come from a real API response or an explicit local interaction state.

## Current execution checkpoint — 2026-08-20

The first connected case-spine slice is now implemented in the canonical backend.

Implemented in this slice:

- authenticated case creation
- authenticated case listing
- authenticated case retrieval
- durable case metadata persistence through the existing Supabase Storage architecture
- source asset identity
- source SHA-256 provenance
- source recording metadata
- durable private audio media storage
- signed playback URL generation
- authenticated source upload endpoint
- case-bound analysis endpoint
- analysis run persistence
- 21-stage run state records with actual implemented stages represented separately from queued or not-run stages
- frontend API client contracts for case creation upload playback and case analysis
- automated case-store ownership and persistence tests

The next engineering step is to connect the Developer Console Workbench to these case contracts and then build the shared audio playback and waveform contract in the Analysis Workspace.

## P0 — Case spine

### Goal

Create the persistent object that every later feature attaches to.

### Tasks

- [x] canonical case schema
- [x] analysis run schema
- [x] source asset schema
- [x] provenance record
- [x] lifecycle state
- [x] request ID
- [x] source metadata
- [x] authenticated user relation
- [x] case creation endpoint
- [x] case retrieval endpoint
- [x] run identity
- [x] version identity

### Exit

A recording can receive a durable case identity before analysis begins.

**Status:** backend contract implemented. Developer Console wiring and browser verification remain next.

## P1 — Intake and audio foundation

### Goal

Make recording intake reliable and immediately useful.

### Tasks

- [x] file picker contract
- [x] supported format validation
- [x] duration validation
- [x] channel inspection
- [x] sample rate inspection
- [x] bit depth inspection where available
- [x] file size validation
- [x] MIME validation
- [x] upload progress contract
- [ ] upload cancellation on case upload route
- [x] storage reference
- [x] provenance creation
- [x] audio metadata response
- [x] playback asset access
- [x] source hashing
- [ ] browser playback integration against signed case media

### Exit

A supported recording can be uploaded stored identified and played from the canonical case.

**Status:** backend intake and media contract implemented. Frontend case workflow and shared playback contract are next.

## P2 — Synchronized analysis canvas

### Goal

Build the primary analytical surface around the real audio asset.

### Tasks

- waveform generation
- waveform rendering
- audio playback
- play and pause
- seek
- scrub
- zoom
- shared playhead
- time ruler
- region selection
- fullscreen
- speaker region layer
- event marker model
- synchronized track contract

### Initial tracks

- waveform
- pitch F0
- intensity
- spectral energy
- speech activity
- pauses

### Exit

Selecting an audio position updates every available analytical view to the same time position.

## P3 — Real pipeline lifecycle

### Goal

Make the Analysis Pipeline a direct representation of backend processing.

### Tasks

- [x] canonical 21 stage identifiers
- [x] stage ordering
- [x] stage state enum
- [x] stage start time
- [x] stage completion time
- [x] stage duration
- [x] stage outcome
- [x] stage error reference
- [x] current run identity
- [x] completed stage records
- [x] processing request identity
- [x] eligibility state
- [x] recording quality state
- [x] lifecycle event linkage

### Exit

The workspace can show actual processing state without synthetic percentages.

**Status:** backend stage-state contract implemented for the current case analysis path. Workspace consumption remains next.

## P4 — Speaker intelligence

### Goal

Turn a multi speaker recording into speaker aware analytical regions.

### Tasks

- speech segmentation
- speaker segmentation
- diarization integration
- speaker labels
- turn boundaries
- overlap detection
- speaker confidence
- separation quality
- speaker aware waveform regions
- speaker aware transcript attribution
- speaker aware evidence intervals

### Exit

Speech regions are associated with speaker identities or speaker segments in the canonical result.

## P5 — Production transcription

### Goal

Generate the transcript inside the product workflow.

### Tasks

- ASR provider abstraction
- production ASR integration
- segment timestamps
- word timestamps
- transcript confidence
- speaker attribution
- transcript persistence
- transcript search
- transcript selection
- transcript provenance

### Exit

A recording can move from audio input to a persistent timestamped speaker attributed transcript without an externally supplied transcript.

## P6 — Audio transcript alignment

### Goal

Make audio and language one synchronized evidence surface.

### Tasks

- word alignment
- audio to transcript synchronization
- transcript to audio synchronization
- selected word to playhead synchronization
- selected audio region to transcript synchronization
- transcript confidence mapping
- speaker turn synchronization
- evidence marker synchronization

### Exit

Selecting transcript text moves the audio playhead and selecting audio moves the transcript selection.

## P7 — Analytical observation layer

### Goal

Expose the measurements supported by the engine through stable timestamped contracts.

### Priority families

1. acoustic energy
2. pitch
3. intensity
4. spectral measures
5. temporal measures
6. pauses
7. speech rate
8. voice quality
9. MFCC
10. formants
11. transcript disfluency
12. within speaker baseline

### Tasks

- observation schema
- method identity
- source interval
- unit
- quality metadata
- provenance
- stage identity
- track API
- waveform time mapping
- evidence references

### Exit

The Analysis Workspace is populated by real observations from the analysis engine.

## P8 — Evidence architecture

### Goal

Make every meaningful observation traceable.

### Tasks

- normalized evidence record
- evidence family
- method identity
- stage identity
- source interval
- observation reference
- evidence direction
- evidence quality
- provenance
- supporting evidence
- conflicting evidence
- dependency relationships
- alternative explanation record

### Exit

Every evidence item can be traced from the UI to the originating observation and source interval.

## P9 — Evidence synthesis

### Goal

Create the intelligence layer between observations and assessment.

### Tasks

- cross method grouping
- temporal clustering
- speaker aware grouping
- convergence representation
- conflict representation
- dependency awareness
- alternative hypothesis grouping
- evidence strength representation
- evidence relationship graph

### Exit

The product can explain how observations relate without collapsing the evidence record into one opaque value.

## P10 — Assessment and report

### Goal

Complete the user facing analysis loop.

### Tasks

- candidate assessment object
- assessment trace
- confidence matrix contract
- evidence summary
- convergence summary
- conflict summary
- alternative hypothesis summary
- report schema
- report generation
- report persistence
- source evidence links

### Exit

A completed case produces a structured report linked to the source evidence.

## P11 — Case persistence and return path

### Goal

Make the product useful beyond one browser session.

### Tasks

- analysis history
- case list
- case search
- case filters
- reopen case
- versioned analysis runs
- saved report reference
- saved evidence state
- case activity timeline

### Exit

A user can leave a case and return to the same analytical state.

## P12 — Browser verification and production hardening

### Goal

Verify the connected workflow from browser through API and persistence.

### Tasks

- upload journey verification
- playback verification
- waveform synchronization verification
- pipeline verification
- speaker workflow verification
- transcript verification
- alignment verification
- evidence verification
- report verification
- history verification
- mobile verification
- keyboard verification
- reduced motion verification
- API failure verification
- timeout verification
- cancellation verification
- resource limit verification
- secure media access verification
- provenance verification
- reproducibility verification

### Exit

The complete MVP journey passes reproducible browser level verification.

## Parallel work

These tracks can proceed while the critical path is built:

- expanded method library
- research feature families
- learned representations
- deeper linguistic models
- comparative analysis
- alerts
- advanced reports
- Evidence Explorer refinements
- developer observability improvements
- performance optimization

They must not displace the case spine speaker transcript alignment and evidence workflow.

## Developer Console operating model

The Developer Console is the engineering cockpit for this plan.

It must answer five questions immediately:

1. What should I build next?
2. What is already complete?
3. What dependency is blocking the next step?
4. What does the backend report right now?
5. Where is the canonical methodology or architecture document?

### Required console functions

- prioritized phase board
- individual task checkboxes
- persistent browser local task state
- phase completion state
- expand and collapse controls
- methodology navigator
- architecture navigator
- pipeline navigator
- API workbench
- request inspection
- lifecycle inspection
- error inspection
- runtime health
- developer profile

## Methodology links

The console should route directly to:

- `docs/MASTER_METHOD_INDEX.md`
- `docs/ANALYSIS_METHODS.md`
- `docs/METHOD_QA_MATRIX.md`
- `docs/CAPABILITY_STATUS.md`
- `docs/ANALYSIS_PIPELINE.md`
- `docs/VALIDATION.md`

## Definition of done

MVP is reached when one connected case can move from recording intake through synchronized audio speaker and transcript analysis evidence synthesis assessment reporting persistence and reopening.

## After MVP

Once the connected workflow is stable the engineering program moves toward deeper analytical coverage calibrated classification validation datasets external evaluation comparative analysis advanced reporting and production scale.
