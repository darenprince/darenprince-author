# VoxVector Deception Detection Program

## Mission

Develop VoxVector into an auditable, evidence-based vocal and audio deception detection system for defined interview and conversational tasks.

## Detection model

VoxVector is not intended to infer deception from a single acoustic feature. The intended system combines multiple evidence families, evaluates their reliability and dependence, compares observations with appropriate context and baselines, and produces a guarded inference only when the scientific and technical gates support it.

### Evidence families

- acoustic and energy behavior
- fundamental frequency and prosodic dynamics
- spectral characteristics
- harmonicity and voice quality
- pauses and timing
- speech and articulation rate
- response latency
- disfluencies and conversational repairs
- transcript and linguistic structure
- question/answer alignment
- within-speaker baseline deviations
- speaker and interaction behavior
- recording and channel integrity
- future multimodal audio/video evidence

## Detection workflow

### 1. Eligibility

Determine whether the recording, speaker separation, timing context, transcript quality, and recording conditions support analysis.

### 2. Evidence extraction

Generate reproducible observations and preserve their provenance, quality state, and comparison context.

### 3. Evidence synthesis

Evaluate convergence and conflict across evidence families. Correlated measurements must not be counted as independent simply because they have different names.

### 4. Candidate classification

Generate provisional hypotheses regarding potential deception, truth-consistent explanations, or indeterminate evidence. Candidate classifications remain subject to validation gates.

### 5. Final disposition

Only a validated model operating within its defined task and population may issue an inferential deception classification or calibrated probability. Otherwise VoxVector abstains or reports insufficient evidence.

## Alternative explanations

The system must preserve plausible non-deception explanations including anxiety, fatigue, illness, topic sensitivity, cognitive load, accent or language effects, microphone and channel artifacts, environmental noise, speaker adaptation, normal conversational variation, and other context-specific causes.

## Scientific boundary

No individual vocal, acoustic, linguistic, behavioral, emotional, or psychological signal proves deception.

A future deception score must be based on validated methodology rather than a universal threshold applied to stress, pitch, pauses, hesitation, or other individual features.

## Validation gate

Before inferential deployment, the program requires:

- frozen operational definitions
- defined target task and population
- speaker-disjoint development/evaluation
- out-of-sample and cross-dataset testing where feasible
- recording-condition stress testing
- identity and leakage analysis
- uncertainty and calibration analysis
- reliability and abstention testing
- subgroup/language robustness where applicable
- external replication where feasible

## Current state

VoxVector currently provides an observational analysis foundation and guarded indeterminate classification. It is being developed toward deception detection, but no scientifically validated deception inference capability is currently enabled.

## Promotion principle

Research candidate → operational definition → implementation → QA → reliability characterization → speaker-disjoint evaluation → out-of-sample evaluation → calibration/error analysis → validation → controlled deployment.

The product objective remains deception detection throughout this progression.
