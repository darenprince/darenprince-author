# VoxVector Project Memory & Findings Protocol

Version: 1.0

## Purpose
GitHub is the persistent operational memory of VoxVector. ChatGPT conversations are working sessions. Material knowledge must be transferred into this repository so the project can resume accurately from any future session.

## Memory Layers
1. CANON — approved active specifications controlling runtime behavior.
2. PROJECT STATE — current phase, objectives, progress, blockers, risks, open questions, and next actions.
3. FINDINGS — research observations, experiments, discoveries, failures, corrections, and candidate improvements.
4. DECISIONS — reviewed choices explaining why the system is designed a particular way.
5. HISTORY — superseded or deprecated material preserved for traceability.

Never promote a finding directly into CANON without review.

## Required Finding Record
Record Finding ID, date, source/provenance, type, claim/observation, evidence, evidence quality, confidence, implication, decision/recommended action, affected components/files, validation required, status, and follow-up.

## Required Decision Record
Record Decision ID, date, decision, problem, evidence considered, alternatives, reason for selection, affected canonical files, validation required, and status.

## Active Project State
Maintain one current state record containing current phase, objective, versions, completed work, in-progress work, blockers, recent decisions, open questions, risks, failures/corrections, next actions, files changed, last verification, and integrity status.

## Lifecycle
INIT → PLAN → RESEARCH → DESIGN → BUILD → TEST → REVIEW → DECIDE → DOCUMENT → VERIFY → COMPLETE

A task is not COMPLETE merely because a chat response was written. Relevant repository records must be updated and verified.

## Findings Reporting
Every substantive completion report answers:
1. What was examined?
2. What was found?
3. What evidence supports it?
4. What changed?
5. Which files changed?
6. What was tested?
7. What passed?
8. What failed?
9. What remains uncertain?
10. What happens next?

Never convert uncertainty into certainty for presentation quality.

## Integrity Rules
After substantive changes:
- read back changed documents;
- check version references;
- check dependent files for stale terminology;
- verify schemas/examples remain structurally valid;
- verify runtime order is consistent;
- verify outputs match the active Results Contract;
- preserve historical traceability;
- record verification in Project State.

## Source Discipline
Active VoxVector canon outranks chat memory. Active documents outrank archives. New research remains distinguishable from established findings until reviewed. Never invent measurements, capabilities, tests, or implementation status.

## Identity
VoxVector is standalone. Do not introduce CrownCode terminology into active VoxVector specifications.