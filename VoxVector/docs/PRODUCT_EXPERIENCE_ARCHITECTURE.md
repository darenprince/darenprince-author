# VoxVector Product Experience Architecture

## Purpose

This document defines the end state for the VoxVector product experience represented by the supplied reference screens.

The references are treated as product architecture references rather than pixel specifications.

Color treatment is intentionally excluded from this architecture.

The objective is a complete intelligence application that moves from recording intake through synchronized analysis and evidence synthesis into reporting and final assessment.

## Product experience model

VoxVector is a unified analysis workspace.

The experience is organized around six connected surfaces:

1. Application shell
2. Analysis intake
3. Analysis workspace
4. Evidence explorer
5. Reports and comparisons
6. Developer and operational console

These surfaces share one analysis case model.

The user must never feel that upload playback transcription analysis evidence and reporting are separate products.

## Application shell

### Primary navigation

- Overview
- New Analysis
- Analyses
- Analysis History
- Evidence Explorer
- Reports
- Comparisons
- Alerts
- Settings

### Developer navigation

- API
- Requests
- Errors
- Events
- Runtime
- Documentation
- Development Board

Developer functions remain visually and functionally separated from the customer analysis workflow.

### Global shell behavior

- persistent navigation on desktop
- responsive navigation on mobile
- global case context
- current analysis state
- account state
- notifications
- search where supported
- accessible keyboard navigation
- reduced motion support

## Analysis intake

The New Analysis flow is the primary entry point into the product.

### Intake sequence

1. Select or upload recording
2. Decode and inspect media
3. Display file metadata
4. Establish provenance
5. Assess recording quality
6. Identify available speakers
7. Generate or ingest transcript
8. Establish analysis context
9. Start processing
10. Open the Analysis Workspace

### File intake requirements

The interface should display:

- file name
- duration
- sample rate
- bit depth when available
- channel count
- file size
- detected format
- upload state
- processing state
- provenance state

The intake experience should support drag and drop plus explicit file selection.

Recording capture may be added where supported by the runtime architecture.

## Analysis Workspace

The Analysis Workspace is the core product surface.

It combines playback visualization evidence and workflow state in one synchronized interface.

### Workspace header

Display:

- analysis name
- source file
- duration
- recording metadata
- analysis status
- quality state
- speaker count when available
- transcript state
- processing controls

Primary controls:

- play
- pause
- seek
- zoom
- fullscreen
- analysis actions

## Synchronized audio analysis viewer

The audio viewer is a central analytical surface.

### Primary waveform

Display:

- full recording waveform
- current playhead
- time scale
- speech regions
- pause regions
- evidence markers
- speaker regions when available
- selected evidence intervals

The playhead must synchronize across every analytical track.

### Analytical tracks

The reference experience establishes the following synchronized tracks:

1. Waveform
2. Pitch F0
3. Intensity
4. Spectral Energy
5. Speech Activity
6. Pauses

The architecture should allow additional tracks without redesigning the viewer.

Future track families may include:

- formants
- HNR
- spectral flux
- spectral rolloff
- MFCC activity
- voice quality
- jitter
- shimmer
- articulation timing
- response latency
- speaker turns
- transcript alignment
- evidence events

### Interaction model

- shared time axis
- shared playhead
- synchronized hover
- click to seek
- drag to scrub
- region selection
- zoom window
- reset zoom
- track visibility controls
- event marker navigation
- audio playback from selected region

## Transcript and speaker layer

The workspace must connect language to audio.

### Speaker lane

Display:

- speaker label
- speaker color token from the active theme
- turn boundaries
- overlap regions
- speaker confidence when available
- selected speaker state

The UI must support multiple speakers without requiring a separate analysis screen.

### Transcript lane

Display:

- timestamped transcript
- speaker attribution
- word timing when available
- selected sentence
- selected word
- disfluency markers
- question markers
- response boundaries
- evidence markers

Selecting transcript content should move the audio playhead to the associated time range.

Selecting an audio region should reveal the associated transcript content when available.

## Analysis Overview

The overview is the executive analytical surface for an individual case.

### Header card

Display:

- source file
- duration
- recording quality
- analysis state
- current processing stage

### Signal overview

Display a condensed waveform with:

- evidence markers
- selected regions
- speaker regions
- important event markers
- current playhead

### Key metrics

The metric system is data driven.

Candidate metric families include:

- response latency
- speech rate
- pitch variability
- pause duration
- speaking time
- silence ratio
- turn count
- overlap duration
- transcript confidence
- speaker separation quality
- signal quality

Only values returned by the analysis engine may be rendered as actual measurements.

### Assessment panel

The assessment surface should communicate:

- evidence direction
- confidence state
- reliability state
- candidate classification
- final disposition
- contributing evidence families

The visual hierarchy must keep the evidence structure visible instead of reducing the case to a single number.

### Evidence timeline

Display important analytical events along the recording timeline.

Event types may include:

- response latency event
- pause event
- speech rate change
- pitch movement
- intensity movement
- speaker transition
- transcript event
- linguistic event
- evidence convergence
- evidence conflict
- selected finding

Each event must link to its source interval and supporting evidence.

## Analysis Pipeline

The workspace includes a visible pipeline status surface.

The complete pipeline contains 21 stages.

### Prepare

01 File Upload / Ingest

02 File Decode and Normalization

03 Provenance and Integrity

04 Channel and Recording Assessment

### Understand

05 Speaker Identification / Diarization

06 Speech Segmentation

07 Transcription Generation

08 Transcript Alignment

09 Eligibility and Reliability

### Analyze

10 Acoustic Feature Extraction

11 Prosodic and Voice Quality Analysis

12 Temporal and Pause Analysis

13 Linguistic and Disfluency Analysis

14 Question and Answer Alignment

15 Within Speaker Baseline

### Synthesize and Decide

16 Cross Method Evidence Assembly

17 Evidence Convergence and Conflict

18 Candidate Classification

19 Validation and Calibration Gate

20 Final Classification and Disposition

21 Audit and Provenance Output

### Pipeline interaction

Each stage should expose:

- stage name
- stage purpose
- input
- output
- current state
- timing
- evidence produced
- methods involved
- linked source regions
- related events

The pipeline must remain connected to actual backend lifecycle state.

## Method intelligence surfaces

The product should expose analytical method families as intelligible product modules.

### Acoustic Analysis

Measure and visualize:

- pitch
- intensity
- spectral energy
- spectral shape
- harmonicity
- HNR
- MFCC
- formant candidates

### Linguistic Intelligence

Analyze:

- transcription
- word choice
- structure
- semantics
- disfluency
- repairs
- lexical behavior
- contradiction
- consistency
- certainty
- hedging
- discourse structure

### Behavioral and Temporal Intelligence

Analyze:

- response latency
- pauses
- speech rate
- turn timing
- overlap
- speaking duration
- temporal shifts

### Speaker Intelligence

Analyze:

- speaker identification
- diarization
- speaker turns
- speaker separation
- within speaker baselines
- speaker aware evidence

### Evidence Synthesis

Combine:

- acoustic evidence
- prosodic evidence
- linguistic evidence
- temporal evidence
- speaker evidence
- baseline evidence
- contextual evidence

The synthesis layer must preserve convergence and conflict rather than flattening them prematurely.

### Probabilistic Assessment

The product end state supports:

- candidate classification
- calibrated probability
- confidence matrix
- uncertainty state
- alternative hypothesis analysis
- final disposition

The backend validation architecture controls when inferential outputs become active production outputs.

## Evidence Explorer

Evidence Explorer is a dedicated case investigation surface.

Users can filter and inspect:

- speaker
- timestamp
- method family
- evidence type
- evidence direction
- confidence
- reliability
- transcript segment
- audio segment
- question
- response

Every evidence item should link back to its originating audio interval and analytical method.

## Reports

Reports convert the workspace into an auditable deliverable.

### Report structure

1. Case summary
2. Recording information
3. Speaker information
4. Eligibility and reliability
5. Analysis methods
6. Acoustic findings
7. Prosodic findings
8. Temporal findings
9. Linguistic findings
10. Speaker findings
11. Evidence timeline
12. Convergence and conflict
13. Candidate assessment
14. Confidence and uncertainty
15. Alternative explanations
16. Final disposition
17. Audit and provenance

Reports must retain links to underlying evidence.

## Comparisons

The product should support comparison between:

- recordings
- speakers
- sessions
- baseline segments
- question responses
- evidence regions
- analysis runs

Comparison views must preserve source identity and provenance.

## Alerts

Alerts provide case level notifications for meaningful analytical events.

Potential alert families include:

- processing completed
- processing failed
- reliability change
- speaker separation issue
- transcript completed
- evidence convergence
- evidence conflict
- selected finding
- report ready

Alerts are event driven and must not be simulated by interface animation.

## Dashboard

The Overview dashboard is the product command center.

It should surface:

- recent analyses
- active analyses
- analysis counts
- processing status
- recent evidence activity
- reports
- alerts
- saved comparisons

Operational metrics must come from persistent data sources.

The interface may use empty states until those data contracts exist.

## Visual analytical language

The reference screens establish the following structural principles.

- dark intelligence workspace
- restrained surfaces
- thin borders
- dense but readable information hierarchy
- large analytical canvases
- compact metric cards
- persistent navigation
- synchronized timelines
- strong typography
- purposeful motion
- minimal decorative UI

Color is intentionally excluded from this architecture document.

## Responsive behavior

Desktop should prioritize:

- persistent sidebar
- wide synchronized waveform
- multi column evidence layout
- simultaneous analytical tracks

Tablet should prioritize:

- collapsible navigation
- stacked evidence panels
- horizontally scrollable analytical tracks

Mobile should prioritize:

- compact navigation
- full width waveform
- vertically stacked metrics
- expandable analytical tracks
- bottom sheet or drawer evidence details
- touch friendly playback controls

## Data architecture requirements

The experience requires a shared analysis case model containing:

- case ID
- analysis ID
- source file metadata
- provenance
- recording metadata
- speaker records
- transcript records
- alignment records
- feature observations
- evidence records
- evidence relationships
- pipeline stage states
- events
- findings
- report state
- final disposition

The frontend must consume these structures through canonical API contracts.

## Engineering rule

The interface is not a second analysis engine.

The browser may visualize measurements and state but it must not calculate or fabricate analytical results that belong to the backend.

Every visualization must have a defined data contract.

Every analytical event must have a provenance path.

Every status indicator must represent real runtime state.

Every final assessment must be derived from the canonical analysis result.

## End state

The completed VoxVector product should feel like a professional intelligence workstation built specifically for vocal analysis.

A user should be able to move from recording intake to synchronized audio review to speaker and transcript inspection to analytical evidence exploration to synthesis and reporting without leaving the core case workspace.
