# VoxVector Architecture

## Pipeline

```text
Input audio
   |
   v
Ingest + provenance
   |
   v
Signal quality / eligibility
   |
   +----> speaker/channel checks
   |
   v
Segmentation
   |
   +----> acoustic/prosodic analysis
   +----> voice-quality analysis
   +----> temporal analysis
   +----> optional transcript/linguistic analysis
   |
   v
Within-speaker baseline comparison
   |
   v
Evidence aggregation
   |
   v
Candidate classification
   |
   v
Validation / policy gates
   |
   +----> abstain / insufficient evidence
   |
   v
Final disposition
```

## Runtime modules

### Ingest

Accepts supported audio, records format and provenance, and computes integrity metadata.

### Eligibility

Evaluates whether analysis is technically meaningful. This stage can reject or downgrade an input before substantive inference.

### Feature extraction

Extracts measurable acoustic and temporal observations without assigning deception meaning at extraction time.

### Baseline

Prefer within-speaker comparison over population-wide assumptions. Baselines should be established from contextually appropriate speech whenever available.

### Evidence aggregation

Combines independent observations while preserving their provenance. Correlated measurements should not be counted as independent evidence without justification.

### Classification

Produces a candidate state, not an automatic truth claim. The classifier must be able to return `indeterminate`.

### Disposition

Applies validation and reliability gates to determine whether a final result can be emitted.

## Design properties

- deterministic feature extraction where practical
- immutable provenance for each analysis run
- explicit missing-data states
- reproducible configuration
- no hidden feature-to-deception shortcut
- auditable evidence contributions
- abstention as a first-class outcome
