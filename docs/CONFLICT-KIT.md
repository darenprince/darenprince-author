# Conflict Kit Cheat Sheet

## Apply a Pull Request Patch

1. From the repository root, run `./scripts/apply-pr.sh <PR-number>` to download and apply the upstream patch with a three-way merge.
2. If the script reports conflicts during `git am`, fix the files, choose incoming changes with `git checkout --theirs <file>`, or keep local edits with `git checkout --ours <file>`, then stage and run `git am --continue`.
3. If the script falls back to `git apply --3way` and conflicts remain, resolve them with the same `--theirs`/`--ours` flow, stage the files, and finish with `git commit`.
4. Review `git status` to confirm a clean working tree before continuing development.

## Daily Sync

1. `git checkout main`
2. `git fetch origin`
3. `git rebase origin/main`
4. When conflicts occur, prefer the remote version for dependency manifests like `package.json` by running `git checkout --theirs package.json` before staging.
5. For generated assets (e.g., files in `public/` or build outputs), keep the local copy with `git checkout --ours <generated-file>` prior to staging.
6. After resolving conflicts, run `git rebase --continue` until the rebase completes, and push with `git push --force-with-lease` if required.

## New Work

1. `git checkout -b <feature-branch> origin/main`
2. Build features with confidence—Husky hooks and Prettier will auto-format on commit.
3. Keep commits focused and descriptive to make reviews faster and more effective.

## Rollback Safety

1. Abort an in-progress rebase with `git rebase --abort` to restore the previous state.
2. Reset your local main branch to the remote source of truth anytime with `git checkout main` followed by `git reset --hard origin/main`.
3. When in doubt, create a safety branch (`git checkout -b backup/<date>`) before experimenting.
