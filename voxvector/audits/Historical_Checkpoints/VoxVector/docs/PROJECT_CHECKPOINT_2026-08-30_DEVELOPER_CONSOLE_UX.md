# Developer Console UX Checkpoint — 2026-08-30

## Implemented

The Developer Console now provides a tighter authenticated analysis workflow:

- native recording selection is filtered to WAV-compatible file types;
- upload requirements are available behind an information icon beside the upload heading;
- upload validation remains enforced server and client side;
- toast notifications provide icon-based success, information, warning, and error feedback;
- persisted diagnostic errors are rendered as structured error records instead of being exposed as raw JSON;
- live diagnostic events are rendered as a polling log stream with event status icons, timestamps, request IDs, HTTP status, stage, and duration where available;
- the header toolbar contains the authenticated developer avatar/profile control and a sign-out action;
- mobile navigation exposes the same profile and sign-out controls.

## Data contract

The error report view consumes the API's diagnostic `events` collection. This corrects the previous frontend mismatch where the error panel attempted to read an `errors` property that the backend did not return.

The browser profile display uses Supabase user metadata when available (`avatar_url`, `picture`, `full_name`, or `name`) and falls back to generated initials. No developer identity is hard-coded.

## Verification boundary

GitHub Actions has been triggered for the resulting source commit. At checkpoint time, the new workflow run remains queued/in progress, so a completed post-change build/QA result is not claimed here.

The UI changes do not alter analysis methodology or scientific interpretation.
