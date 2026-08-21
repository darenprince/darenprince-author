# VoxVector MVP Build Plan

## Purpose

This document defines the shortest defensible engineering path from the current repository state to a working end-to-end VoxVector product experience.

The plan is intentionally execution oriented. It prioritizes the connected workflow shown by the Analysis Workspace reference instead of expanding the method library first.

The target MVP is one connected case workflow:

1. create an analysis case
2. upload a recording
3. validate the input
4. persist provenance
5. process the recording
6. play the audio
7. render the waveform
8. expose the real pipeline state
9. identify speakers
10. generate a timestamped transcript
11. synchronize transcript and audio
12. expose real analytical tracks
13. create timestamped evidence
14. synthesize evidence
15. produce an assessment object
16. generate a report
17. save the case
18. reopen the case

## Priority rule

Work in dependency order.

Do not expand downstream presentation surfaces before the data contract that powers them exists.

Do not add a second implementation of an existing backend capability merely to make the UI appear complete.

Every visible state should be backed by a real API response or an explicit local UI state.

## P0 — Case spine

### Goal

Create the persistent object that every later feature attaches to.

### Tasks

- define canonical analysis case schema
- define analysis run identity
- define source asset identity
- define provenance record
- define lifecycle state
- persist request ID
- persist source metadata
- connect authenticated user to case
- expose case creation response

### Exit

An uploaded recording can receive a durable case identity before analysis begins.

## P1 — Intake and audio foundation

### Goal

Make recording intake reliable and immediately useful.

### Tasks

- file picker
- drag and drop
- supported format validation
- duration validation
- channel inspection
- sample rate inspection
- bit depth inspection where available
- file size validation
- upload progress
- upload cancellation
- storage reference creation
- provenance creation
- audio metadata response
- playback asset access

### Exit

A supported recording can be uploaded and played from the canonical case.

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

Make the Analysis Pipeline component a direct representation of backend processing.

### Tasks

- expose canonical 21 stage pipeline state
- map backend stage identifiers to product stages
- persist stage start time
- persist stage completion time
- persist stage outcome
- persist stage errors
- expose current stage
- expose completed stages
- expose processing request identity
- expose eligibility state
- expose quality state

### Exit

The workspace can show the actual processing path for a case without synthetic progress values.

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
- speaker separation quality
- speaker aware evidence intervals

### Exit

Speech regions are associated with speaker identities or speaker segments in the canonical result.

## P5 — Production transcription

### Goal

Generate the transcript from the recording inside the product workflow.

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

### Exit

A recording can move from audio input to a persistent timestamped speaker attributed transcript without an externally supplied transcript.

## P6 — Audio transcript alignment

### Goal

Make audio and language behave as one synchronized evidence surface.

### Tasks

- word alignment
- audio to transcript synchronization
- transcript to audio synchronization
- selected word to playhead synchronization
- selected audio region to transcript synchronization
- transcript confidence mapping
- speaker turn synchronization

### Exit

Selecting transcript text moves the audio playhead and selecting audio moves the transcript selection.

## P7 — Analytical observation layer

### Goal

Expose the measurements already supported by the engine through stable timestamped contracts.

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

- normalize observation schema
- attach method identity
- attach source interval
- attach quality metadata
- attach provenance
- expose track data through API
- connect tracks to waveform time
- connect observations to evidence records

### Exit

The Analysis Workspace is populated by real observations from the analysis engine.

## P8 — Evidence architecture

### Goal

Make every meaningful observation traceable.

### Tasks

- normalized evidence record
- evidence family
- method identity
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

Create the intelligence layer between raw observations and assessment.

### Tasks

- cross method grouping
- temporal clustering
- speaker aware grouping
- convergence representation
- conflict representation
- dependency awareness
- alternative hypothesis grouping
- evidence strength representation

### Exit

The product can explain how multiple observations relate without collapsing the evidence record into one opaque value.

## P10 — Assessment and report

### Goal

Complete the user facing analysis loop.

### Tasks

- candidate assessment object
- assessment trace
- confidence matrix
- evidence summary
- convergence summary
- conflict summary
- alternative hypothesis summary
- report data contract
- report generation
- report persistence

### Exit

A completed case produces a structured report that remains linked to the source evidence.

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

### Exit

The complete MVP journey passes reproducible browser level verification.

## Parallel work that does not block the core path

These tracks can proceed while the critical path is being built:

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

They should not displace the case spine speaker transcript alignment and evidence workflow.

## Developer Console operating model

The Developer Console is the engineering cockpit for this plan.

It should answer five questions immediately:

1. What should I build next?
2. What is already complete?
3. What is the dependency blocking the next step?
4. What does the backend actually report right now?
5. Where is the canonical methodology or architecture document?

The MVP Build Plan in the console provides persistent browser local checkoffs.

The methodology links provide direct access to the canonical method register.

The API Workbench provides a real recording request path.

The diagnostic views provide runtime evidence for failures and lifecycle behavior.

## Definition of MVP

MVP is reached when the product can execute one complete connected case workflow from recording intake through synchronized analysis evidence assessment and report persistence.

The MVP is not defined by the number of marketing screens.

The MVP is defined by the number of connected real workflows that work end to end.

## After MVP

Once the connected workflow is stable the engineering program moves toward deeper analytical coverage calibrated classification validation datasets external evaluation and production scale.
