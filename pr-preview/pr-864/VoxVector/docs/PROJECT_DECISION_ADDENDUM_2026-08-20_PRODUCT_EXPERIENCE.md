# VoxVector Project Decision Addendum — 2026-08-20

## End state product experience

**Decision:** The supplied VoxVector reference screens are adopted as the structural product experience target for the Analysis Workspace and surrounding application surfaces.

**Scope:**

- persistent intelligence application shell
- New Analysis intake
- audio playback
- synchronized waveform
- pitch track
- intensity track
- spectral energy track
- speech activity track
- pause track
- speaker regions
- generated transcript
- transcript alignment
- evidence markers
- key metrics
- evidence timeline
- analysis pipeline
- assessment surface
- Evidence Explorer
- Reports
- Comparisons
- Alerts
- History

**Architectural rule:** The reference screens define interaction and information architecture. They do not override the canonical backend architecture or scientific validation requirements.

**Canonical documents:**

- `docs/PRODUCT_EXPERIENCE_ARCHITECTURE.md`
- `docs/IMPLEMENTATION_PLAN.md`
- `docs/ARCHITECTURE.md`
- `docs/ANALYSIS_PIPELINE.md`
- `docs/ROADMAP.md`

## Synchronized analytical viewer

**Decision:** The primary Analysis Workspace will use one shared time axis and playhead across waveform analytical tracks transcript speaker regions and evidence events.

**Reason:** The core product experience requires users to move directly between a recorded moment its acoustic behavior its speaker context its language and its evidence interpretation.

## Case centered architecture

**Decision:** Upload playback transcription analysis evidence and reporting are treated as connected stages of one analysis case.

**Reason:** The end product must feel like one analytical workflow rather than separate utilities.

## Visual reference boundary

**Decision:** The uploaded references establish layout interaction hierarchy density and analytical presentation patterns.

Color scheme is explicitly excluded from this decision and remains governed by the active product visual system.
