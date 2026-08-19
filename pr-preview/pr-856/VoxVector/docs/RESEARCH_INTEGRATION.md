# VoxVector Research Integration Map

This document maps prior research into implementation candidates. Research statements are hypotheses or design inputs until independently verified and validated.

## Interpretable acoustic layer

Candidate methods include openSMILE/eGeMAPS-style descriptors, F0 and intonation statistics, intensity and energy contours, jitter and shimmer, spectral tilt and harmonic measures, MFCCs, pauses, and response latency. Status: candidate implementation layer; validation required before inferential use.

## Glottal-source analysis

Candidate methods include IAIF, NAQ, CQ, OQ, H1-H2 and related source/tilt measures. Status: research candidate. Vocal tension or pressed phonation must not be translated directly into deception.

## Self-supervised representations

WavLM, wav2vec 2.0, and HuBERT are candidate speech representations. Speaker identity and recording-condition leakage must be tested explicitly.

## Temporal/deep architectures

Conformer, Audio Spectrogram Transformer, temporal attention, and sequence models are research candidates for longer-context modeling. No performance claim is inherited from source material.

## Linguistic analysis

Candidate stack: high-quality ASR, word/phoneme timestamps, forced alignment, transformer linguistic representations, contradiction/consistency, repair, hedging, certainty, and discourse measures. Transcript errors must propagate into reliability scoring.

## Cross-modal extension

Where synchronized video exists, facial action units, audio/video synchronization, and cross-modal fusion are future candidates. This remains distinct from human deception inference.

## Synthetic-media detection

Synthetic-speech detection is a separate problem. Candidate signals include spectral/phase artifacts, high-frequency generation artifacts, codec/resampling fingerprints, and vocoder/TTS/voice-conversion signatures. Candidate benchmark families require provenance and licensing review.

## Anti-shortcut validation

VoxVector requires speaker-disjoint splits, cross-dataset evaluation, recording-condition stress tests, identity sensitivity analysis, subgroup/language robustness where applicable, calibrated uncertainty, and explicit abstention.

Earlier project research that used causal-sounding language or precise performance claims is not treated as a VoxVector fact until its original sources, datasets, methods, and evaluation procedures are independently verified.
