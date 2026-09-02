# VoxVector QA Status

**State date:** 2026-09-02

This document records repository-level software QA. It is not a scientific validation report.

## Current source and verification state

`main` is the canonical source. The most recent verified VoxVector React repair was commit `ba03650549b1b49172eda60fc5d9c0bb91f7e548`, which restored the missing `voxvector/src/Typography.css` import target. Its `VoxVector QA` run completed successfully, including API tests, React dependency installation, and the React production build. The matching VoxVector PR preview build also completed successfully.

## Current implementation coverage

| Area | Current state | Scientific claim |
|---|---|---|
| 21-stage pipeline contract | represented | none |
| Implemented foundations | 14 | none |
| Conditional / not invoked | 4 | none |
| Queued stages | 3 | none |
| Acoustic / temporal / voice quality | implemented foundations | observational only |
| Reliability / eligibility | implemented | eligibility control |
| Evidence acquisition | implemented foundation | none |
| faster-whisper | implemented, provider-gated | none |
| pyannote Community-1 | implemented, provider-gated | none |
| Transcript/speaker alignment | implemented foundation | none |
| Results envelope | implemented | none |
| Stage/execution telemetry | implemented foundation | none |
| Case persistence/history | implemented | none |
| Render API bridge | implemented, environment-gated | none |
| Developer Console | active implementation | none |
| Classification/disposition | guarded boundary | no validated inference |

## Render incident evidence

Render directly reported repeated `voxvector-api` OOM events exceeding the **512 MB** free web-service budget. The connected observability workflow captured an incident memory series from approximately 94.9 MB to 198.5 MB before a sharp lifecycle discontinuity. The sampled telemetry does not identify the instantaneous >512 MB peak or prove the responsible application component.

The raw incident artifact remains GitHub Actions artifact `9829899743` from workflow run `33585450916`.

## Deployment failure audit

A GitHub Pages workflow failure on run `33593774608` was traced to `Build existing site`, before VoxVector staging/build steps. The exact root cause was a malformed regular-expression literal in `scripts/generate-labs-product-pages.mjs` while constructing the generated Crown Labs dossier URL. A corrective commit replaces the fragile regex with direct canonical path-string replacement.

This failure is a repository build-pipeline defect, not a VoxVector React compiler defect. It remains subject to its own GitHub Actions verification gate.

## Developer Console QA state

Implemented and tracked:

- compact 56px navigation baseline;
- Inter UI/body typography and Cal Sans display hierarchy;
- mobile Sheet navigation with X close, scrim and swipe dismissal;
- Streamline Sharp shared icon direction;
- 5–8% tonal surface gradients;
- collapsible workbench sections;
- coffee/copper active workflow state and semantic green completion treatment;
- right-aligned workflow/check statuses;
- removal of redundant `Collapsed` text;
- live case run projection and case history/reopen;
- Render Runtime service/deployment/log surface;
- engineering status surface with source revision, frontend/backend versions, pipeline maturity, QA/deployment state and Render memory constraint.

Authenticated browser verification remains required for visual/interaction claims.

## Current engineering gates

1. Verify the root GitHub Pages build repair and complete Pages artifact.
2. Verify authenticated browser behavior on desktop/mobile.
3. Verify deterministic workflow tracker timer/scroll collapse behavior.
4. Deploy and execute real speech providers on Render with memory/CPU profiling.
5. Persist transcript, speaker and alignment artifacts and read them back through the case workflow.
6. Complete internal 21-stage callback instrumentation where real method boundaries exist.
7. Keep software QA and scientific validation separate.

## Scientific boundary

A passing software suite establishes implementation behavior only. Provider adapter tests do not establish model quality, transcript truthfulness, speaker identity, or deception-detection validity.
