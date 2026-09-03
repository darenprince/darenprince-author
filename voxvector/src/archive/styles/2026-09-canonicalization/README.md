# Archived VoxVector stylesheet layers — September 2026 canonicalization

These files are historical snapshots retained for audit and recovery. They are **not imported by the production application**.

## Why they were archived

- Temporary refinement, enhancement, visibility, and chrome layers were merged into an owning stylesheet or retired because they were no longer referenced.
- Unreferenced stylesheets were removed from the active source tree to prevent future developers from treating them as competing sources of truth.
- The active stylesheet contract is documented in `VoxVector/docs/CSS_ARCHITECTURE.md`.

Do not restore an archived file as an override. If a historical rule is genuinely needed, migrate that rule into the stylesheet that owns the relevant component or page and document the reason.
