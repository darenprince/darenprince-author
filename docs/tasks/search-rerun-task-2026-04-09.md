# Task: Re-run search dropdown/modal refinement prompt

## Goal

Re-run the original search refinement request in a fresh task with explicit acceptance criteria and deployment checks.

## Prompt to run in the new task

> On search dropdown / modal. Remove go button and make submit button a magnifying glass icon inside text field right justified. Polish animations and effects. Refine and improve site search feature and debug.
>
> Overall instructions:
>
> - Make sure any code adjustments/additions/changes are built for deployment and hosting via GitHub Pages (Netlify is no longer used).
> - Ensure docs are updated to reflect current site state and metadata/SEO/build scripts.
> - Ensure favicons and Twitter/social sharing images are deployed.
> - Browser customizations should match site/app branding colors.

## Acceptance checklist

- [ ] Search dropdown and modal use an in-field, right-justified magnifying-glass submit control.
- [ ] No standalone “Go”/text search submit remains in affected search UI.
- [ ] Keyboard search behavior is stable (Arrow navigation, Enter submit/select, Escape close).
- [ ] Search modal animation and open/close UX are smooth and accessible.
- [ ] Search-related docs are updated with GitHub Pages + metadata/SEO notes.
- [ ] Build artifacts are regenerated using the GitHub Pages flow.
- [ ] Automated tests/checks pass and are reported.

## Suggested validation commands

- `npm run build:site`
- `npm run test`
- `npx sass --load-path=node_modules/@uswds/uswds/packages scss/styles.scss assets/styles.css`
