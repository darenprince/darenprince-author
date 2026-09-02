# VoxVector Public Shell Alignment

Canonical decision: `VoxVector/docs/PROJECT_DECISION_2026-09-02_PUBLIC_SHELL_ALIGNMENT.md`.

The public VoxVector landing shell is the visual source for non-developer public surfaces. `methods.html`, `pipeline.html`, and the image asset index retain their existing page content while receiving the shared public shell through the build-time normalization script and `public-shell.css`.

The shared menu labels are restored as **Product**, **How it works**, **Technology**, **Use cases**, **Resources**, and **Developer**. Icons are placed directly in the navigation links rather than inside decorative containers. The menu trigger remains a simple two-line control.

The public shell uses the landing language: black and graphite surfaces, warm tan accents, Inter/system typography, thin borders, controlled spacing, responsive behavior, and direct/sharp iconography.

The earlier GitHub Actions metadata failure was traced to `labs/index.html` having `#090a0c` while the deployment validator expected `#070b14`. The current source is aligned to the expected token. Production success still requires a fresh workflow pass and browser verification.
