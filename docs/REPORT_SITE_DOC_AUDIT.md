# 📋 Site & Documentation Audit — 2025-02-14

## Scan summary

- Files scanned (excluding `.git/` and `node_modules/`): 370 files across 53 folders.
- HTML surfaces audited: 21 published and prototype documents, plus `pages/search.html` for the Minisearch results shell.
- Sass component partials indexed: 33 partials imported by `scss/styles.scss`.
- CSS custom properties extracted: 77 tokens defined in `scss/tokens/_css-vars.scss`.

## Mismatch matrix

| Category                                   | Findings                                                                                                                                                                        | Impact                                                                          | Fix status                                                        |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| 1. Documented but not implemented          | The legacy member hub (`member/index.html`) is linked throughout docs but ships without an auth guard, so the page renders for unauthenticated visitors.                        | Exposes unfinished UI and risks leaking gated copy.                             | Add guard bootstrap or clearly mark the folder as prototype-only. |
| 2. Implemented but undocumented            | The new `js/auth-service.js` placeholder communicates downtime, but onboarding docs still referenced the retired database tooling.                                              | Contributors may search for removed scripts instead of the new migration layer. | Addressed by documenting the migration plan and auth placeholder. |
| 3. Implemented differently than documented | Netlify deploy runs only `generate-env.js` + Sass, while docs previously implied full `npm run build`. Search indexes and image manifests are stale unless regenerated locally. | Production deploys omit search data and image manifest updates.                 | Clarified in BUILD_PIPELINE with manual predeploy checklist.      |
| 4. Outdated links/paths                    | `components.html` still references `./js/mobile-nav.js`, a file that no longer exists.                                                                                          | 404 in every browser session; wastes console signal.                            | P0 cleanup ticket captured below.                                 |
| 5. Style/typography mismatches             | Home and book detail pages hide their only `<h1>` while the hero demos render multiple H1s per page.                                                                            | Breaks accessible heading hierarchy and contradicts brand guidance.             | Logged as P1 markup fix.                                          |

## Documentation actions completed

- Rewrote `docs/README.md` so every stack, navigation, and branding note mirrors the current code paths and feature set.
- Updated `docs/SITE_STRUCTURE.md`, `docs/FILE_STRUCTURE.md`, and `docs/UI_COMPONENTS.md` to map the actual directory tree, component inventory, and script crosswalk.
- Refreshed `docs/STYLE_GUIDE.md` with the active tokens, spacing scale, and heading audit (including reality checks for hidden H1s and missing brand fonts).
- Revised `docs/BUILD_PIPELINE.md` to spell out the real npm script chain, Netlify behavior, and manual predeploy tasks.
- Published `docs/data-platform-migration.md` to outline the new provider rollout and downtime messaging expectations.
- Brought supporting guides (`docs/navigation_overview.md`, `docs/indexing-strategy.md`) in line with the updated build/search workflow.
- Logged the February 14 update set in `docs/CHANGELOG_DOC_SYNC.md` for traceability.

## Issue-ready backlog

### P0 (blockers)

1. **Search index ships zero documents** — `/content/` is absent so `public/search/index.json` and `docs.json` remain empty. _Action_: seed Markdown content or adjust `src/search/build-index.mjs`, then rerun `npm run build:search`.
2. **Missing `js/mobile-nav.js` include** — Remove the stale script tag from `components.html` or restore the module to silence 404s.

### P1 (brand/style alignment)

1. **Accessible H1 structure** — Expose a single visible `<h1>` on `index.html` and `book.html`, and downgrade extra hero demo headings to H2/H3 levels.
2. **Member hub gating** — Add `auth-guard.js` (and folder checks if needed) to `member/` templates before linking from live surfaces.
3. **Font consistency** — Decide whether to ship League Spartan/Futura assets or formalize Helvetica Neue as the official stack.

### P2 (DX & maintenance)

1. **Automate search manifest refresh** — Netlify deploy should run `npm run build:search` and `npm run generate:images` (or a dedicated script) to prevent stale artifacts.
2. **Finalize data platform docs** — Keep the migration plan updated as provider decisions solidify.
3. **Audit legacy archives** — Move unused reference experiments (`References-ignore/`, `archive/`) behind contributor-only toggles or document their status.

## Next steps checklist

### Immediate (P0)

- [ ] Populate `/content/` and rebuild the Minisearch payloads via `npm run build:search`.
- [ ] Resolve the missing `js/mobile-nav.js` dependency in `components.html`.

### Recommended (P1/P2)

- [ ] Normalize heading hierarchy across hero surfaces.
- [ ] Protect `/member/` routes with `auth-guard.js` or clearly mark them as prototypes.
- [ ] Ship official brand fonts or update guidance to the Helvetica baseline.
- [ ] Automate search/index regeneration inside the Netlify pipeline.
- [ ] Archive or document the legacy experiments folder-by-folder.

## Snapshot — Doc Sync & Site Audit

- Repo branch scanned: `work`
- Files scanned: 370 • Components indexed: 33 • SCSS tokens extracted: 77
- Key mismatches:
  1. Member hub documented but currently ungated.
  2. Netlify deploy skips search/image builds despite docs implying parity with `npm run build`.
  3. `components.html` references `js/mobile-nav.js`, which no longer exists.
- Docs updated/created:
  - /docs/SITE_STRUCTURE.md
  - /docs/FILE_STRUCTURE.md
  - /docs/STYLE_GUIDE.md
  - /docs/UI_COMPONENTS.md
  - /docs/BUILD_PIPELINE.md
  - /docs/README.md
  - /docs/data-platform-migration.md
  - /docs/navigation_overview.md
  - /docs/indexing-strategy.md
  - /docs/CHANGELOG_DOC_SYNC.md
- Immediate next steps (P0):
  - [ ] Seed `/content/` and rerun the search index build.
  - [ ] Remove or reinstate `js/mobile-nav.js` in `components.html`.
- Recommended next steps (P1/P2):
  - [ ] Normalize hero `<h1>` usage and document font decisions.
  - [ ] Protect the `/member/` prototype with `auth-guard.js` before linking publicly.
- Links:
  - PR: pending
  - Issues: see “Issue-ready backlog” above

---
