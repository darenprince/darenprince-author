# VoxVector Project Decision Log

## 2026-08-19 — Canonical application root and deployment layout

**Decision:** `./VoxVector/` is the canonical VoxVector application root. The root-level `./api/` directory is not part of VoxVector and must not be used as its deployment root.

**Resolution:**

- HTTP adapter: `VoxVector/api/app.py`
- Analysis engine: `VoxVector/src/voxvector/`
- API dependencies: `VoxVector/api/requirements.txt`
- Render root: `VoxVector`
- Render entry point: `api.app:app`
- conflicting root-level VoxVector API files removed

The adapter is an interface/runtime boundary only and must not become a second analysis engine.

## 2026-08-19 — Documentation capability preservation

**Decision:** Features and analysis methods documented as planned, research candidates, or future capabilities remain part of the canonical VoxVector project context even when they are not currently implemented.

**Reason:** Documentation is also the research and product roadmap. Removing a capability because implementation is pending destroys traceability and incorrectly converts a development gap into an apparent retirement decision.

**Rule:** A capability may move between `planned`, `implemented`, `integrated`, and `validated` states. It may be retired only by an explicit project decision. No feature is considered obsolete solely because it is not yet present in code.

**Canonical records:** `docs/CAPABILITY_STATUS.md` and `docs/ROADMAP.md` preserve the full future-development map.

## 2026-08-19 — Dependency baseline

**Decision:** Move the scientific/runtime baseline to Python 3.12 and pin the reviewed dependency versions.

**Reason:** Current NumPy 2.5.1 requires Python >=3.12. The previous CI workflow executed Python 3.11, creating an unnecessary version mismatch risk.

**Pinned baseline:** NumPy 2.5.1, pytest 9.1.1, setuptools 83.0.0, FastAPI 0.140.8, Uvicorn 0.51.0, python-multipart 0.0.32.

**Boundary:** Dependency upgrades are software compatibility changes, not scientific validation.

## 2026-08-19 — Public deployment target

**Decision:** The intended public VoxVector product target is `voxvector.crownlabs.tech`.

**Verification rule:** Repository configuration, a green build, or DNS configuration alone is not sufficient to claim deployment verification. The deployed `/health` provenance and known WAV `/v1/analyze` fixture must be checked against the canonical `VoxVector/src/voxvector` implementation.
