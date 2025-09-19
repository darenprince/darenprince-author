# Contributing to the Daren Prince Author Platform

Thanks for helping keep the site healthy. This guide summarizes the day-to-day workflow, merge conflict guardrails, and formatting standards that support fast, low-drama deploys from the `main` branch.

## Branching & Pull Request Flow

- Always branch from the up-to-date default branch: `git checkout main && git fetch origin && git rebase origin/main`.
- Use focused feature branches (e.g. `feat/...`, `fix/...`, `chore/...`). Rebase your branch onto `main` before opening a PR to keep history linear.
- Confirm CI/CD is green before requesting review. Netlify deploys from `main`, so merged commits should be release-ready.
- Never commit generated artifacts (anything in `dist/`, `build/`, `assets/image-manifest.json`, compiled CSS/JS bundles, or files that end with `.min.*`). Rebuild locally after merges instead.

## Formatting & Tooling

- Run `npm install` once to install Husky, lint-staged, and Prettier.
- Stage changes, then commit. The Husky pre-commit hook will run lint-staged, which formats staged files with Prettier (semi-colons off, single quotes on).
- To manually format everything, run `npm run format`.
- Respect `.editorconfig` to keep indentation and end-of-line behavior consistent across editors.

## Conflict Kit

- Enable helpful Git settings once per machine:
  ```bash
  git config merge.conflictstyle diff3
  git config rerere.enabled true
  ```
- During a rebase/merge, use quick-accept helpers when you are not actively reviewing the changes:
  - Take remote copy: `git checkout --theirs <file> && git add <file>`
  - Keep your copy: `git checkout --ours <file> && git add <file>`
- Generated/minified assets are marked with `merge=ours` in `.gitattributes`; never hand-edit conflicts there—resolve the conflict by keeping your side, continue the rebase, and rebuild.
- For `package.json` or `package-lock.json` conflicts during bootstrap work, accept the remote (`--theirs`) version and reinstall dependencies.

## Patch Application Helper

- Use `scripts/apply-patch.sh fix.patch` to apply patches safely. It will try `git am --3way` first, then fall back to `git apply --3way`, printing next steps if manual intervention is required.

## Deploy Readiness Checklist

- ✅ Tests or relevant smoke checks run locally.
- ✅ `npm run format` applied (or let lint-staged do it on commit).
- ✅ No generated/minified artifacts staged.
- ✅ Branch rebased on the latest `main` before pushing.

By following these guardrails, we minimize merge conflicts, keep the commit history tidy, and ensure Netlify deploys stay predictable. Thank you for contributing!
