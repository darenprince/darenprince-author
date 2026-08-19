# VoxVector Architecture

## Canonical runtime boundary

```text
voxvector.crownlabs.tech / client
          |
          v
   HTTP adapter: VoxVector/api/app.py
          |
          v
 canonical engine: VoxVector/src/voxvector/
          |
          v
 eligibility / reliability
          |
          v
 evidence collection and analysis
          |
          v
 candidate classification
          |
          v
 final disposition gate
```

The FastAPI adapter is an interface/runtime boundary only. It must import and execute the canonical engine. It must never become a second analysis implementation.

## Analysis stages

1. **Ingest and provenance**: accept supported audio, normalize input representation, record provenance, and identify the analysis run.
2. **Eligibility and reliability**: determine whether the input is technically meaningful. This stage can downgrade or reject an input before substantive analysis.
3. **Evidence collection and analysis**: compute measurable acoustic, temporal, voice-quality, spectral, formant, prosodic, interaction, transcript, and baseline observations as supported by the current pipeline and supplied context.
4. **Evidence grouping and convergence**: organize observations without assigning deception meaning. Dependence and correlated features must remain explicit.
5. **Candidate classification**: produce a candidate state. The current implementation is indeterminate-only.
6. **Final disposition**: apply reliability and validation gates. Current outputs are abstention or insufficient evidence; no validated deception verdict is enabled.

## Current primary pipeline

`VoxVectorPipeline.analyze()` currently orchestrates acoustic summaries, F0/intensity dynamics, HNR, spectral flux/rolloff, formant tracking, pause topology, optional within-speaker baselines, optional response latency, and optional transcript disfluency observations.

MFCC/cepstral processing and several lower-level research utilities are implemented but remain outside the primary output path until their integration and QA requirements are completed.

## Reliability boundary

Reliability is an eligibility control. It is not a probability of deception and must not be merged into a deception score.

## Classification boundary

A measured observation is not a candidate label. Candidate classification must remain capable of returning `indeterminate` and must not bypass validation gates.

## Deployment boundary

Render must use `VoxVector` as the root directory and launch `api.app:app`. The intended public target is `voxvector.crownlabs.tech`. Public-domain availability or a green deployment is not itself runtime or scientific verification.

## Design properties

- deterministic feature extraction where practical
- bounded frame processing for constrained runtimes
- immutable run provenance
- explicit missing-data states
- reproducible configuration
- no hidden feature-to-deception shortcut
- auditable evidence contributions
- abstention as a first-class outcome
- planned capabilities preserved independently of current implementation status
