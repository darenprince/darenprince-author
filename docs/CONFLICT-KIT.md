# Conflict Kit Quick Start

The Conflict Kit keeps GitHub Pages deploys from `main` smooth, even when multiple features land simultaneously. Use this cheat sheet before and during every rebase or patch apply.

## 1. Configure Git Once

```bash
git config merge.conflictstyle diff3
git config rerere.enabled true
```

Diff3 shows the shared ancestor so conflicts are easier to reason about. `rerere` remembers your resolutions and replays them automatically the next time the same conflict appears.

## 2. Daily Sync Flow

1. `git checkout main`
2. `git fetch origin && git rebase origin/main`
3. If conflicts appear and you are not actively reviewing them yet, quick-accept the remote copy:
   ```bash
   git checkout --theirs <file>
   git add <file>
   git rebase --continue
   ```
4. Start fresh work from the clean default branch: `git checkout -b feat/my-feature`.
5. Format before committing: `npm run format` (or let the pre-commit hook format staged files).
6. Apply incoming patches with `scripts/apply-patch.sh` to minimize manual fixes.

## 3. Conflict Strategy

- **Generated or bundled assets** (`dist/**`, `build/**`, `*.min.*`, `assets/image-manifest.json`, `assets/js/env.js`) are marked `merge=ours`. Keep your copy, continue the rebase, then rerun the build.
- **Docs and changelogs** use the `union` merge driver so contributions from both sides survive. Give the final copy a quick proofread.
- **package.json / package-lock.json**: when bootstrapping and you are not reviewing dependency updates, accept the remote copy (`git checkout --theirs ...`) and rerun `npm install`.

## 4. Fast Follow After Conflicts

- Run the relevant build (`npm run build`, `npm run generate:images`, etc.) if you resolved generated files.
- Execute smoke checks or `npm test` if code paths changed.
- Push once the branch is clean: `git status` should show no staged generated artifacts.

## 5. Patch Helper

Use `scripts/apply-patch.sh path/to/file.patch`. It tries `git am --3way` first (preserving authorship) and falls back to `git apply --3way`. On failure it prints the exact next steps so you can finish the merge confidently.

Stay bold, stay smooth, and keep merges boring.
