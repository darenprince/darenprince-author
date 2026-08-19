# VoxVector Validation

## Validation objective

VoxVector is being developed toward deception detection from vocal and conversational audio. Validation therefore determines whether the implemented evidence and inference methods can support reliable deception classification for a defined task, population, and recording context.

Validation is task-specific. A method cannot be treated as inferentially validated merely because it is implemented, tested, or reported in research.

## Required progression

1. Freeze the operational method definition.
2. Define the target deception task and operational definition of the outcome.
3. Define the target population, language/context, and intended deployment conditions.
4. Establish speaker-disjoint development and evaluation partitions.
5. Document sampling, class balance, recording conditions, exclusions, and provenance.
6. Evaluate out of sample and, where possible, across datasets and recording conditions.
7. Report uncertainty, error rates, calibration where appropriate, subgroup behavior, and robustness.
8. Test reliability gates, missing-data behavior, and abstention.
9. Evaluate leakage, identity effects, correlated features, and dependence between evidence sources.
10. Replicate externally when feasible.
11. Record the resulting status in the canonical validation record before enabling inferential use.

## What validation must establish

A future deception inference release must demonstrate more than successful feature extraction. The validation program must establish whether the complete analytical chain provides useful discrimination for the defined task without relying on speaker identity, recording artifacts, dataset leakage, or unvalidated universal thresholds.

The evaluation should separately examine:

- technical eligibility and reliability
- individual evidence families
- multimethod convergence
- candidate classification
- calibration and uncertainty
- abstention behavior
- alternative explanations and confounding
- generalization beyond development data

## Current status

Current VoxVector deception classification is **not scientifically validated** and remains fail-closed. The current runtime may produce observations, evidence organization, and an indeterminate candidate state, but it must not represent those outputs as a validated lie/deception determination.

This status describes the current implementation state. It does not change the product objective of building a deception detection system.
