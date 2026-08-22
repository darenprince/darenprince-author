# VoxVector Project Checkpoint — Original Console Menu

## Change

The Developer Console now exposes the existing original VoxVector dashboard from its navigation without replacing or modifying the current React Developer Console.

## Navigation

- Developer Console route: `/voxvector/developer`
- Original Console link: `/voxvector-dashboard.html`
- The original dashboard is the repository's existing `voxvector-dashboard.html` implementation.
- The link is available in both the desktop sidebar and the mobile navigation because both use the shared sidebar component.

## Preservation rule

The current React Developer Console, Case Workbench, Analysis Workspace, MVP Build Plan, diagnostics, documentation navigation, authentication gate, and backend contracts remain unchanged.

The original console is linked as a separate compatibility surface rather than reconstructed or merged into the current React console.

## Verification

Source change committed to GitHub in commit `ee37399019df6bf48a8c657545be8a53a5e968a8`.

A fresh GitHub Pages deployment remains the required production verification step.
