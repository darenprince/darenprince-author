# VoxVector Developer Indexes — 2026-08-25

## Change

Added dedicated developer tooling for the VoxVector repository and visual asset library.

## Implemented

- Added `/voxvector/developer/voxvector-images.html` as the individual visual asset index.
- Added live image previews for image files discovered beneath `./voxvector/`.
- Added exact Git paths for every indexed image.
- Added per-image copy controls for Git paths.
- Added per-image descriptions and new-window links to the raw asset and GitHub source.
- Added `/voxvector/developer/voxvector-repository.html` as a live repository index for `./voxvector/`.
- Added recursive folder/file hierarchy, path filtering, file metadata, and new-window GitHub source links.
- Added developer-console navigation entries for `Visual Assets` and `Repository Index`.
- Added shared styling for the indexes using the current VoxVector dark neutral / restrained warm accent direction.

## Source of truth

The indexes query the GitHub tree for the active feature branch at runtime. They do not duplicate repository source files into the application UI.

## Scope discipline

These indexes are developer-facing navigation and asset-inspection tools. They do not claim that an asset, analysis method, model, or workflow is scientifically validated merely because it is present in the repository.

## Verification status

- Source files were read back after modification.
- Developer-console navigation paths were verified against the generated public paths.
- Repository and image indexes use new-window source links and copy controls.
- A production build was not executed in this change set; runtime/browser verification remains required before deployment.
