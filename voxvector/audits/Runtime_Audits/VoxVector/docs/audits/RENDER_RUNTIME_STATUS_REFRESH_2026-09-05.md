# Render Runtime Status Refresh Repair — 2026-09-05

## Incident

The authenticated Developer Console Render Runtime page showed the connected `voxvector-api` service as `suspended` and displayed no latest deployment even though the connected Render account reported the service as not suspended and its latest deployment as live.

## Root cause

The server-side Render bridge in `VoxVector/api/render_api.py` did not fully normalize current Render API response shapes.

Two distinct payload-shape errors were identified:

1. Render reports service suspension with string states such as `not_suspended`. The bridge treated any non-empty string as truthy when deriving its fallback state, causing `not_suspended` to be rendered as `suspended`.
2. Render list endpoints can wrap resources as rows such as `{ "deploy": { ... }, "cursor": "..." }`. The bridge forwarded those wrappers directly, while the Developer Console expects deployment fields such as `id` and `status` at the top level. This produced an empty-looking Latest Deployment card.

## Repair

The canonical bridge now:

- explicitly normalizes Render suspension values to a boolean;
- maps `not_suspended` to active rather than suspended;
- unwraps per-row `deploy` envelopes before returning deployment records;
- unwraps per-row `instance` envelopes before returning instance records;
- preserves direct non-wrapped rows for compatibility with alternate/older Render response shapes.

## Regression coverage

`VoxVector/tests/test_render_api.py` now covers:

- `suspended` and `not_suspended` string normalization;
- wrapped deployment rows;
- wrapped instance rows;
- the complete `/v1/developer/render/status` projection for an active service with a live deployment.

## Observed external state before repair deployment

The connected Render service was independently inspected through the authorized Render integration:

- service: `voxvector-api`
- service ID: `srv-da2f88n40ujc73a8m26g`
- configured branch: `main`
- Render auto deploy: disabled
- suspension state: `not_suspended`
- latest deployment: `dep-dae5m26q1p3s7382mbpg`
- latest deployment status: `live`
- latest deployed source revision before this repair: `145e3c64507f75a32e83a25a5e854ac15bae57e6`

## Verification boundary

Repository implementation and tests do not by themselves prove the production Developer Console is repaired. Verification requires:

`repair commit → exact-commit QA → merge to main → manual Render deployment → deployed source revision readback → authenticated Render Runtime page refresh`

This repair changes infrastructure observability only. It does not alter analysis methodology, evidence generation, classification, or scientific validation status.
