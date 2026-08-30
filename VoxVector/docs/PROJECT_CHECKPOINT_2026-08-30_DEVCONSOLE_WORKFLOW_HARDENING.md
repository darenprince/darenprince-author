# Project Checkpoint — 2026-08-30

## Developer Console workflow hardening

### Scope

This checkpoint records the connected Developer Console workflow work covering runtime status presentation, dark form controls, upload reliability, secure playback, case-bound analysis, spacing, and state feedback.

### User-facing console changes

The dashboard now presents runtime states with clearer visual semantics:

- green check state for healthy runtime/API conditions
- red warning state for unhealthy or unavailable conditions
- animated health indicators while the API state is being observed
- tighter dashboard card spacing and more deliberate internal padding
- improved mobile metric stacking

Case Workbench controls now use the console's dark visual system consistently:

- case title input
- case selector
- WAV file selector
- playback controls
- textarea and related form controls
- disabled and focus states

The file input remains restricted to WAV intake, matching the current case-source API contract.

### Upload workflow hardening

`voxvector/src/lib/api.js` validates the developer session, case selection, file selection, WAV extension, non-zero size, and configured media ceiling before upload.

The upload request:

1. creates a request correlation ID;
2. sends the original filename in the multipart body;
3. reports progress from zero through completion;
4. has an explicit ten-minute timeout;
5. distinguishes network, timeout, cancellation, and HTTP failure conditions;
6. preserves API-provided error details when available;
7. returns the canonical request ID for diagnostics.

The browser does not manually set `Content-Type` for the multipart request so the browser can provide the correct multipart boundary.

### Definitive client-side upload bug — 2026-08-30

A production screenshot showed a WAV file visibly selected in the native browser file control while the console still displayed `Choose Recording` when **Upload Source** was pressed.

Repository inspection identified the definitive failure point in `DeveloperConsole.jsx`: `handleUpload()` tested the component's transient React `file` state and returned before invoking the upload mutation when that state was null. The native input could still retain a selected `File` object, so the UI and mutation state could disagree.

The canonical fix is now:

- `handleUpload()` resolves the selected file from React state first and then the live `#audio-file` `FileList`;
- it validates the resolved file before upload;
- it passes that exact file as a mutation variable to `uploadCaseSource()` instead of relying on a stale closure;
- the upload button is no longer disabled merely because transient React file state is empty when a selected case exists;
- successful upload stores the returned persisted source separately from the local `File` object.

This removes the specific pre-network guard that produced the screenshot's `Choose Recording` toast.

### Persisted-source workflow

Playback and analysis share the same persisted-source resolution behavior.

If the Developer Console has no transient `source` state but the selected case contains a persisted source, the API helper retrieves the case and resolves the first available persisted `source_id` before calling playback or analysis.

Canonical routes remain:

- `GET /v1/cases/{case_id}/sources/{source_id}/playback`
- `POST /v1/cases/{case_id}/sources/{source_id}/analyze`

The backend remains the canonical analysis engine. The Developer Console does not duplicate pipeline behavior.

### Architecture discipline

No alternate analysis engine, duplicate case implementation, or Vercel integration was introduced.

The canonical implementation remains:

`voxvector/`

The API target remains the configured VoxVector backend, defaulting to:

`https://voxvector.crownlabs.tech`

### Verification status

The modified frontend API helper and Developer Console were written directly to `main` and read back from GitHub after the changes.

The VoxVector QA workflow was triggered for commit `6288c85f7e89bba51e736b6f9c0599dcd62edf98`; at checkpoint time, the QA and GitHub Pages workflows were still in progress. A completed run is required before calling the new upload fix production-verified.

The repository tools available in this session do not provide an authenticated browser session for the protected Developer Console, so this checkpoint does not claim successful end-to-end upload, playback, or analysis execution in production.

Successful source modification and a passing build are not treated as scientific validation.
