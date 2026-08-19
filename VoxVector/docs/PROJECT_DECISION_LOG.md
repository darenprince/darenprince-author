# VoxVector Project Decision Log

## 2026-08-19 — Canonical application root and deployment layout

**Decision:** `./VoxVector/` is the canonical VoxVector application root. The root-level `./api/` directory is not part of VoxVector and must not be used as its deployment root.

**Reason:** The migration integrity record defines `darenprince-author/VoxVector` as the destination and states that new VoxVector work belongs under `VoxVector/`. The existing deployment adapter was created at the repository root as `./api/`, which introduced a conflicting project boundary and made Render configuration point outside the canonical application.

**Resolution:**

- Move the HTTP adapter to `VoxVector/api/app.py`.
- Keep the canonical analysis engine under `VoxVector/src/voxvector/`.
- Keep API dependencies under `VoxVector/api/requirements.txt`.
- Configure Render with `Root Directory: VoxVector`.
- Configure Render to install `api/requirements.txt` and launch `api.app:app`.
- Remove the conflicting root-level `api/` files.

**Boundary:** The API adapter is an interface/runtime adapter only. It must import and execute the canonical VoxVector pipeline and must not become a second analysis engine.

**Verification required:** After deployment, verify `/health` provenance paths point into `VoxVector/src/voxvector` and run the known WAV fixture through `/v1/analyze`. A successful deployment alone is not runtime or scientific validation.
