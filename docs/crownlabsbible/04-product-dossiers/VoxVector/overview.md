# VoxVector Overview

## Product Classification

**Category:** Crown Labs intelligence vocal analysis and deception detection platform

**Type:** Full stack vocal and audio intelligence system with API access

**Product objective:** Build an advanced auditable vocal and audio deception analysis platform for interview and conversational audio.

**Canonical implementation:** VoxVector/

**Public application:** voxvector/

**Backend target:** voxvector.crownlabs.tech

## Executive Summary

VoxVector is an advanced vocal and audio deception analysis platform designed to transform interview and conversational audio into structured intelligence through a connected multimethod evidence workflow.

The product spans recording ingestion, technical preparation, speaker intelligence, transcription, alignment, acoustic and vocal analysis, linguistic and conversational analysis, evidence synthesis, classification, validation, final disposition, and audit.

VoxVector is being engineered for deception detection as its central product purpose.

## Analytical Depth

One of VoxVector's core product advantages is the breadth of its analytical method library.

The canonical Master Method Index contains **more than 300 individually defined data points and evidence fields** across acoustic, spectral, cepstral, pitch, prosodic, voice-quality, temporal, linguistic, speaker, integrity, evidence, uncertainty, classification, and validation domains.

That number represents the breadth of the analytical vocabulary maintained by the product architecture. It does not mean every analysis run emits every data point. Current runtime output depends on implementation status and the inputs available for a particular recording.

This distinction allows VoxVector to market the depth of its analytical system without misrepresenting planned capabilities as current runtime output.

## Product Architecture

The system is organized around four understandable product stages:

1. **Analysis Readiness** — determine whether the recording and available context are suitable for analysis.
2. **Evidence Analysis** — examine the voice, audio, language, timing, and conversational characteristics supported by the current analysis configuration.
3. **Analytical Assessment** — bring findings together and examine agreement, conflict, uncertainty, and alternative explanations.
4. **Final Result** — communicate what the evidence supports after the required analytical and validation gates.

The complete product pipeline contains 21 technical stages from file intake through audit and provenance output.

## Core Product Experience

The target experience is one persistent case-centered workspace containing:

- source metadata
- audio playback
- synchronized waveform
- speaker regions
- transcript
- analytical tracks
- evidence timeline
- evidence explorer
- pipeline state
- assessment
- reports
- history

## Public Landing Visual System

The canonical public landing page uses a restrained black, white, gray, espresso, copper, and warm-amber visual language. The production visual asset library under `voxvector/public/assets/marketing/` provides atmospheric imagery for the product story.

The current landing composition uses:

- the 1920×1080 audio-signal artwork as the hero background, with a controlled bottom fade into the page
- the network background behind the analytical workflow and existing console artwork
- the topographic background in the Technology section
- evidence-analysis editorial artwork in the Analytical Interface section
- evidence-path editorial artwork in the Scientific Discipline section
- science-of-voice editorial artwork in the Use Cases section

These assets are presentation imagery only. They are not live telemetry, analytical measurements, scientific validation, or deception results.

## Complete Analytical Scope

The VoxVector pipeline encompasses:

- file upload and ingestion
- audio decoding and normalization
- provenance and integrity
- recording and channel assessment
- speaker identification and diarization
- speech segmentation
- transcription generation
- transcript alignment
- analysis readiness and reliability
- acoustic analysis
- prosodic and voice-quality analysis
- temporal and pause analysis
- linguistic and disfluency analysis
- question and answer alignment
- within-speaker baselines
- evidence assembly
- evidence convergence and conflict
- candidate classification
- validation and calibration
- final classification and disposition
- audit and provenance output

## API and Developer Platform

VoxVector exposes its canonical backend through a FastAPI service.

The API currently supports:

- runtime health
- direct WAV analysis
- authenticated case creation
- case listing and retrieval
- source upload and provenance
- signed source playback
- case-bound analysis runs
- persisted pipeline stage state
- request correlation and diagnostics

The API is not a separate analysis engine. It is the interface to the canonical VoxVector engine.

This enables VoxVector to serve both as a premium analytical application and as an integration layer for developers building investigative, security, research, or enterprise workflows.

## Analytical Method Families

The current analytical foundation includes:

- RMS and intensity
- zero crossing rate
- spectral centroid and spread
- fundamental frequency and harmonicity
- F0 and intensity dynamics
- harmonic to noise ratio
- spectral flux and rolloff
- MFCC
- formant candidate tracking
- pause topology
- response latency when timing is supplied
- transcript disfluency when transcript is supplied
- within speaker baseline deviations when a baseline is supplied

The broader method library preserves deeper voice quality, spectral, glottal, linguistic, speaker, learned representation, multimethod classification, media integrity, and validation capabilities for continued engineering and validation.

## Developer Experience

The Developer Console is the engineering cockpit for the connected MVP path.

It provides:

- runtime health
- API workbench
- request inspection
- lifecycle events
- errors
- diagnostics
- methodology navigation
- documentation navigation
- MVP task board
- task checkoffs
- phase completion

## Product Development Direction

VoxVector is being engineered toward a world-class multimethod deception analysis engine with:

- deeper audio intelligence
- production transcription
- precise transcript and audio alignment
- speaker identification and diarization
- conversational intelligence
- speaker-aware baselines
- multimethod evidence synthesis
- calibrated deception probability
- confidence matrices
- alternative hypothesis analysis
- robust validation programs
- auditable final classification and disposition

These capabilities form one coherent product architecture.

## Documentation Authority

The VoxVector/ repository is the technical source of truth.

This Crown Labs dossier is the executive and product mirror.

Material runtime and architecture changes must be reflected here while preserving the complete product roadmap and internal validation record.
