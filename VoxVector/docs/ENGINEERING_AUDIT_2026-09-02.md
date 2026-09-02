# VoxVector Engineering Audit — 2026-09-02

## Scope

Current audit of the canonical React application, Developer Console, backend/analysis engine, GitHub Actions verification, deployment path, Render runtime evidence, documentation synchronization, and active engineering status.

## Current source state

- Canonical frontend: `voxvector/`
- Canonical backend/analysis engine: `VoxVector/`
- Public frontend deployment: GitHub Pages through GitHub Actions
- Backend runtime: Render
- Persistence/auth/media/diagnostics: configured Supabase services
- Current public React package: `0.2.36`
- Current backend package: `0.2.26`
- Canonical pipeline contract: 21 stages
- Current maturity count: 14 implemented foundations, 4 conditional/not invoked, 3 queued

## Verification state

The React typography repair was independently verified by GitHub Actions on commit `ba03650549b1b49172eda60fc5d9c0bb91f7e548` before merge. The `VoxVector QA` workflow completed successfully, including API tests, React dependency installation, and the React production build. The PR preview build also completed successfully.

The subsequent GitHub Pages production workflow failures were traced to the root repository build pipeline rather than the VoxVector React bundle. On run `33593774608`, `Deploy GitHub Pages` failed in `Build existing site` before reaching the VoxVector staging/build steps. The exact failure was a JavaScript syntax error in `scripts/generate-labs-product-pages.mjs`: the generated dossier URL expression contained a malformed regular-expression literal. A corrective change now replaces that regex dependency with a direct path-string replacement.

The failure was therefore converted into an explicit engineering repair task rather than being classified as an unrelated external failure.

## Render runtime evidence

The connected Render evidence established a 512 MB free web-service memory budget and repeated OOM events explicitly reported by Render as instances exceeding that budget. Captured telemetry around the reported incident showed a rapid rise from approximately 94.9 MB to 198.5 MB followed by a sharp process-lifecycle discontinuity to approximately 73.6 MB and stabilization near 89–93 MB.

The sampled telemetry does not establish the instantaneous peak above 512 MB and does not prove which application component caused the spike. It does establish that the service experienced a genuine runtime memory incident when combined with Render's direct OOM notifications.

## Memory-efficiency implementation

Known temporary-allocation paths have been reduced in the speech acquisition layer. RMS calculation uses bounded frame groups, heavy transcription and diarization phases are serialized, provider caches are released after attempts, and runtime memory telemetry is emitted around heavyweight phases.

These changes are resource-management and observability controls. They do not change analytical methodology or scientific validity state.

## Developer Console state

The console now has compact 56px navigation chrome, Inter for UI/body text, Cal Sans for display hierarchy, restrained 5–8% surface gradients, Streamline Sharp as the shared icon direction, mobile sheet dismissal, collapsible workbench sections, and state-oriented workflow presentation.

The Case Workbench workflow tracker uses subtle tonal differentiation, coffee/copper active emphasis, semantic green completed states, compact collapsed presentation, and right-aligned status metadata. Literal `Collapsed` labels are removed from the workbench chrome.

## Transcription runtime root-cause analysis

The transcription failure was traced through the canonical boundaries. The adapter and provider-selection code existed, but `render.yaml` built the Render service with only `api/requirements.txt`; `faster-whisper` lived in an optional dependency file and therefore was absent from the deployed runtime. This created a false appearance of readiness: configuration could name the provider while execution failed at import time.

The repair creates a transcription-only dependency set, installs it in the canonical Render blueprint, and keeps pyannote out of the default 512 MB service. Case analysis now projects actual acquisition state back into the 21-stage run record instead of permanently leaving transcription/diarization/alignment as queued after acquisition executes.

**Verification boundary:** the wiring repair is source-level until Render rebuild and real WAV execution provide runtime evidence.

## Current engineering gaps

- Authenticated browser verification of public and Developer Console desktop/mobile presentation remains outstanding.
- The workflow tracker should use explicit React scroll/timer state for deterministic auto-collapse behavior rather than relying primarily on CSS timing.
- Live speech-provider execution on Render remains deployment/runtime verification work.
- Transcript, speaker, and alignment artifact persistence needs real provider-backed execution verification.
- Internal composite pipeline callback coverage remains incomplete.
- Scientific deception-detection validation remains separate from software QA.

## Current conclusion

The project has a verified React/API software build path for the repaired typography commit, a reproducible Render incident evidence path, and a defined memory-hardening strategy. The immediate reliability priority is to repair and re-run the root GitHub Pages build, then complete browser/runtime verification of the current VoxVector state. No scientific validation claim is implied by the software gates.
