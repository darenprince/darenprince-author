# Render Runtime Status Refresh Repair — 2026-09-05

This Crown Labs Bible record mirrors the canonical VoxVector repair audit at `VoxVector/docs/audits/RENDER_RUNTIME_STATUS_REFRESH_2026-09-05.md`. The repository implementation and canonical VoxVector documentation remain authoritative.

The Developer Console Render Runtime page was incorrectly showing the connected Render service as suspended and was not populating the latest deployment card. The backend bridge was misreading current Render API response shapes: `not_suspended` was treated as truthy, and wrapped deployment/instance rows were forwarded without unwrapping their `deploy` or `instance` objects.

The canonical bridge now explicitly normalizes the suspension state and unwraps those resource envelopes before returning them to the React console. Regression tests cover the active-service/live-deploy projection.

External Render inspection before deployment of this repair showed:

- service `voxvector-api`
- service ID `srv-da2f88n40ujc73a8m26g`
- auto deploy disabled
- actual suspension state `not_suspended`
- latest deployment `dep-dae5m26q1p3s7382mbpg`
- latest deployment status `live`
- deployed source revision `145e3c64507f75a32e83a25a5e854ac15bae57e6`

Production verification remains source commit → exact-commit QA → merge → manual Render deploy → deployed revision readback → authenticated browser refresh. This is infrastructure observability work and does not modify scientific inference or validation status.
