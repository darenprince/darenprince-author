# Developer Console Engineering Decision Record — 2026-09-01

## Scope

This addendum records the architectural decisions for the Developer Console live runtime, Render integration, case history, and workbench interaction improvements. The canonical project decision log remains authoritative for broader architecture decisions.

## Decision 1 — Render credentials stay server-side

The Developer Console will not call the Render API directly from browser code.

The console calls authenticated VoxVector API routes:

- `GET /v1/developer/render/status`
- `GET /v1/developer/render/logs`

The backend reads protected `RENDER_API_KEY` and `RENDER_SERVICE_ID` environment variables. This prevents the Render API credential from entering the React bundle, browser storage, or client network request payloads.

GitHub Actions uses repository secrets of the same names for infrastructure inspection. GitHub secrets and Render runtime environment variables are separate scopes and must be configured independently.

## Decision 2 — Use the existing case record as the live progress transport

The case store already persists analysis runs under the authenticated case record. Rather than introduce a second progress database, the case-analysis route now writes a `running` run record before processing, updates it at real route boundaries, and replaces it with a final completed or failed run.

The Developer Console polls the existing case retrieval route while analysis is active.

This keeps case identity, run identity, stage state, and final results in one auditable case record.

## Decision 3 — Do not fabricate internal stage progress

The canonical composite engine does not currently expose callbacks for every stage.

Therefore:

- real route-boundary stages may expose measured lifecycle state;
- completed-stage counts may drive determinate progress where persisted data supports it;
- the composite processing interval may display an indeterminate activity animation;
- per-stage durations remain null where no real callback/timer exists.

Animation is interface feedback, not analytical evidence.

## Decision 4 — Case history is a first-class workflow

Persisted cases are not a temporary upload list. The Developer Console now treats them as an archive that can be reopened for later review.

Opening a history item reads the existing authenticated case record and its stored runs. It does not silently create a new analysis run.

## Decision 5 — Infrastructure evidence is separate from application timing truth

Render deployment state, instance state, logs, and service metrics provide infrastructure evidence.

Application timing remains grounded in VoxVector monotonic measurements and UTC lifecycle events.

Neither Render telemetry nor frontend animation is permitted to substitute for application instrumentation or scientific validation.

## Decision 6 — Console usability is part of the engineering surface

The Developer Console must remain usable under short desktop viewports and mobile layouts.

Required behavior:

- route navigation resets the main work surface to the top;
- sidebar navigation scrolls independently when content exceeds viewport height;
- each workbench step can collapse without losing state;
- Expand All / Collapse All is available;
- startup initialization progress visibly advances after real API readiness;
- low-level technical states receive consistent human-readable labels while preserving technical metadata.

## Resulting status

These decisions are implemented on feature branch `feature/devconsole-render-live-history` and require fresh CI and authenticated browser verification before being recorded as production-verified behavior.
