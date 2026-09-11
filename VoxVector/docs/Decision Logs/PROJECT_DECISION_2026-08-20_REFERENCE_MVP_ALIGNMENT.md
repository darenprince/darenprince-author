# Project Decision — 2026-08-20 Reference Experience and MVP Alignment

## Decision

The supplied VoxVector reference screens are adopted as the canonical product experience target for the connected Analysis Workspace.

The 21 stage analysis pipeline remains the canonical analytical workflow.

The Developer Console is the engineering cockpit for executing the fastest connected MVP path.

## Product experience target

The target product is one case centered workspace connecting:

- recording intake
- source metadata
- audio playback
- waveform
- spectral view
- analytical tracks
- speaker regions
- transcript
- flagged moments
- evidence timeline
- evidence synthesis
- assessment
- reports
- history

## Canonical pipeline

The product pipeline is:

1. File Upload / Ingest
2. File Decode and Normalization
3. Provenance and Integrity
4. Channel and Recording Assessment
5. Speaker Identification / Diarization
6. Speech Segmentation
7. Transcription Generation
8. Transcript Alignment
9. Eligibility and Reliability
10. Acoustic Feature Extraction
11. Prosodic and Voice Quality Analysis
12. Temporal and Pause Analysis
13. Linguistic and Disfluency Analysis
14. Question / Answer Alignment
15. Within Speaker Baseline
16. Cross Method Evidence Assembly
17. Evidence Convergence and Conflict
18. Candidate Classification
19. Validation and Calibration Gate
20. Final Classification / Disposition
21. Audit and Provenance Output

## MVP decision

Engineering priority is the connected case workflow rather than the breadth of the method library.

The critical path is:

- case identity
- intake and provenance
- playback and waveform
- pipeline lifecycle
- speaker processing
- transcription
- alignment
- analytical tracks
- evidence normalization
- evidence synthesis
- assessment
- reporting
- history and reopen
- browser verification
- production hardening

## Developer Console decision

The Developer Console must expose the canonical MVP plan directly.

It must provide:

- task checkoffs
- phase completion
- dependency visibility
- next task visibility
- methodology links
- architecture links
- pipeline links
- real API inspection
- lifecycle events
- errors
- runtime health

Local task checkoffs represent developer workflow state only.

## Documentation decision

The following records are synchronized to this decision:

- `ANALYSIS_PIPELINE.md`
- `ARCHITECTURE.md`
- `PRODUCT_EXPERIENCE_ARCHITECTURE.md`
- `UI_APPLICATION_ARCHITECTURE.md`
- `IMPLEMENTATION_PLAN.md`
- `MVP_BUILD_PLAN.md`
- `ROADMAP.md`
- `CAPABILITY_STATUS.md`
- `ANALYSIS_METHODS.md`
- `METHOD_QA_MATRIX.md`
- `VALIDATION.md`
- `VERSION_MAP.md`
- `QA_STATUS.md`
- `CHATGPT_PROJECT_INSTRUCTIONS.md`
- `PRODUCT_MESSAGING_POLICY.md`

The Crown Labs VoxVector architecture and overview mirrors are also synchronized.

## Traceability

`docs/DOCS_ALIGNMENT_2026-08-20.md` records the cross document review and synchronization rules.

Historical checkpoint records remain unchanged for traceability.
