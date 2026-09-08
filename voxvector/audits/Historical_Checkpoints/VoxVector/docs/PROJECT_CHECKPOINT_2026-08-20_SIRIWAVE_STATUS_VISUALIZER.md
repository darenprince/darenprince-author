# VoxVector Checkpoint — SiriWave iOS9 Status Visualizer

**Date:** 2026-08-20

## Change

Replaced the generic animated bar visualization used by the Developer Console API status block with the `siriwave` JavaScript library using its documented `ios9` style.

The source project documents the iOS9 style as the fluorescent wave introduced in iOS9 and exposes `start()`, `stop()`, `setSpeed()`, `setAmplitude()`, and `dispose()` controls. VoxVector uses those runtime controls so the visualizer follows the real API request state rather than pretending to be analysis telemetry.

## VoxVector treatment

The default blue, red, and green iOS9 curve colors are not used. The four curves are rethemed to:

* warm off white support line
* neutral grey
* coffee brown
* muted tan

The visualizer remains a presentation of API request state. It is not an analytical measurement, audio waveform, or deception result.

## Runtime behavior

* active request: higher amplitude and faster wave
* successful/ready state: slower, lower amplitude wave
* idle state: restrained low amplitude motion
* error state: muted brand palette and reduced saturation
* `prefers-reduced-motion` disables the animated wave
* container resizing recreates the wave at the correct display width

## Dependency

`voxvector/package.json` now includes `siriwave` `^2.4.0`. The package is MIT licensed and has no runtime dependencies according to its npm package metadata.

## Verification status

Source changes are committed to GitHub. A fresh frontend dependency installation and production build are still required before claiming deployment success. Browser inspection should specifically verify the canvas sizing, mobile console layout, state transitions, and reduced-motion behavior.

## Boundary

This change is interface behavior only. It does not alter VoxVector analysis methods, evidence collection, reliability gates, classification, or scientific validation status.
