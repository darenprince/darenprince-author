# VoxVector pyannote Provider Architecture Audit — 2026-09-04

This mirror records the canonical VoxVector engineering decision and audit state.

## Architecture

- Primary diarization path: pyannoteAI cloud API using protected `PYANNOTE_KEY`.
- Optional fallback: local pyannote Community-1 using protected `HF_TOKEN`.
- Fallback is explicit, configuration-controlled, and recorded in provenance.
- The public frontend never receives either credential.

## Status

The canonical backend implementation and provider tests were updated on the associated engineering branch. Runtime execution and scientific validation remain separate verification gates.

See canonical audit:

`VoxVector/docs/audits/PYANNOTE_PROVIDER_ARCHITECTURE_2026-09-04.md`
