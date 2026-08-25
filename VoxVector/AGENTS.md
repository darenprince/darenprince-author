# VoxVector AI Editing Rules — READ FIRST

These rules apply to all AI agents editing anything under `VoxVector/`.

**NON-NEGOTIABLE: edit the existing canonical source. Do not create patch layers because the original file is large or inconvenient.**

1. Search first. Identify the existing owner of the requested feature.
2. Read that actual implementation before editing.
3. Edit the canonical file in place.
4. Never recreate an existing page/component from memory, screenshots, summaries, or an older snapshot for a normal change.
5. Never create a competing `Refinement`, `Override`, `Patch`, `Enhancement`, `Recovery`, `V2`, `New`, or duplicate implementation merely to avoid editing the original.
6. A large file is not an excuse to avoid it. Read it in ranges and make targeted edits directly in the source.
7. Do not use runtime DOM mutation or CSS override stacks as a substitute for editing the owning source.
8. Preserve every existing feature, control, route, interaction, API path, state path, responsive behavior, accessibility behavior, and approved copy that the user did not ask to change.
9. Dependency migrations must preserve the existing product surface. Replacing a library is not permission to simplify or rebuild the UI.
10. After every substantive edit, read the file back, inspect the diff, search for duplicates, build/test, and browser-verify when applicable.

### The rule in one sentence

> **If it already exists, edit it where it lives. Never add a layer because editing the original is cumbersome.**

The detailed project rules are in `VoxVector/docs/CHATGPT_PROJECT_INSTRUCTIONS.md`, `VoxVector/docs/AI_EDITING_GUARDRAILS.md`, and `VoxVector/docs/DEVELOPMENT_WORKFLOW.md`.