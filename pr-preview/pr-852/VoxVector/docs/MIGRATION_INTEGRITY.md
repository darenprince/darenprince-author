# VoxVector Migration Integrity

## Migration source

Source repository: `darenprince/crowncodeaisuite`

Source main commit captured for migration: `b91d543de3ba4f8cb5d8a5dda8c5aa0bf85a30c0`.

Destination: `darenprince-author/VoxVector`.

## Expected migrated file set

| Category | Count |
|---|---:|
| README | 1 |
| Project configuration | 1 |
| Documentation | 13 |
| Runtime source modules | 20 |
| Tests | 20 |
| **Total** | **55** |

The destination was rebuilt as a nested VoxVector project so the author repository's existing site and assets remain untouched.

## Integrity policy

Migration preserves repository terminology and source behavior where possible. Where an inherited test asserted fields or behavior that no longer matched the active result schema/runtime, the test was aligned to the current canonical implementation rather than preserving a known-invalid assertion.

The source repository remains private and historical. Its README points to this canonical location. New VoxVector work belongs under `VoxVector/` in `darenprince-author`.

A successful repository migration does not constitute scientific validation of deception detection.
