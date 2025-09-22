# 🗒️ Documentation Sync Changelog

> Tracks documentation updates made during the 2025-02-14 audit.

## 2025-02-16 — Supabase background job coverage

- Documented Supabase-managed HTTP queue + response tables across integration docs.
- Captured storage analytics/multipart metadata tables in quick reference + playbook.
- Refreshed timestamps on Supabase docs to reflect new capabilities.

## 2025-02-14 — Full documentation realignment

- Rebuilt the site audit report with fresh metrics, mismatch matrix, and backlog checkpoints.
- Rewrote README, site structure, file map, style guide, and component catalog to reflect the current Sass, JS, and page inventory.
- Updated build pipeline, Supabase guides (root + playbook), navigation overview, and indexing strategy with accurate scripts and environment expectations.
- Logged Supabase troubleshooting tools (`js/supabase-logger.js`) and highlighted search index gaps (`/content/` missing) across docs.
- Added quick-reference notes to `docs/supabase.md` and aligned duplicate guides to the new canonical sources.

## 2025-02-13 — Audit refresh & doc corrections

- Re-ran full repo scan; updated `docs/REPORT_SITE_DOC_AUDIT.md` with current metrics, citations, and refreshed backlog.
- Synced `docs/SITE_STRUCTURE.md` + `docs/UI_COMPONENTS.md` to reference `js/main.js` as the component nav controller.
- Updated style, build, and Supabase guides with the 2025-02-13 timestamp to reflect latest audit.
- Extended mismatch tracking for stale README guidance (`.container--dark`, `npm run build`) and legacy Supabase project IDs.

## 2025-09-18 — Repo & docs realignment

- Added `docs/REPORT_SITE_DOC_AUDIT.md` with scan metrics, mismatch catalog, and next-step backlog.
- Authored `docs/SITE_STRUCTURE.md` to document the actual directory tree, page inventory, and module map.
- Published `docs/STYLE_GUIDE.md` consolidating tokens, typography, spacing, and heading usage reality checks.
- Compiled `docs/UI_COMPONENTS.md` mapping every SCSS partial to markup hooks and JavaScript controllers.
- Documented build lifecycle in `docs/BUILD_PIPELINE.md`, including npm scripts, Netlify config, and search/index caveats.
- Summarized Supabase schema and env requirements in `docs/SUPABASE_INTEGRATION.md`.
- Logged search index gap (missing `/content/`) and H1 inconsistencies for follow-up in the audit report.
