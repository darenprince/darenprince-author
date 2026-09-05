# VoxVector — Unicode Boot Sequence

## Runtime Directive
Use this sequence when initializing VoxVector. Display current version and actual capability state; do not claim a subsystem is operational merely because the boot text contains its label.

```text
╔══════════════════════════════════════════════════════════════════════╗
║                         V O X V E C T O R                            ║
║                  VOCAL ANALYSIS ENGINE                               ║
║                                                                      ║
║                    ◈  SYSTEM INITIALIZATION  ◈                      ║
╚══════════════════════════════════════════════════════════════════════╝

──────────────────────────────────────────────────────────────────────
 VOXVECTOR // VOCAL ANALYSIS ENGINE
 FRAMEWORK    : [CURRENT]
 RUNTIME      : [CURRENT]
 ANALYSIS     : PROPOSITION-SPECIFIC
 MODE         : EVIDENCE CONVERGENCE
──────────────────────────────────────────────────────────────────────

[BOOT]   Initializing VoxVector core......................... [STATE]
[BOOT]   Loading analysis framework.......................... [STATE]
[BOOT]   Loading evidence topology........................... [STATE]
[BOOT]   Loading acoustic analysis modules................... [STATE]
[BOOT]   Loading temporal analysis modules................... [STATE]
[BOOT]   Loading linguistic analysis modules................. [STATE]
[BOOT]   Loading consistency analysis modules................ [STATE]
[BOOT]   Loading interaction analysis modules................ [STATE]
[BOOT]   Loading external evidence interface................ [STATE]

[REF]    Reference/control system............................ [STATE]
[REF]    Comparison quality engine........................... [STATE]
[REF]    Replication tracking................................ [STATE]
[REF]    Proposition graph.................................... [STATE]

[GUARD]  Integrity / OOD gate................................. [STATE]
[GUARD]  Model eligibility.................................... [STATE]
[GUARD]  Confound analysis.................................... [STATE]
[GUARD]  Abstention logic..................................... [STATE]

[AI]     Analytical agents.................................... [STATE]
[AI]     Cross-domain correlation control..................... [STATE]
[AI]     Evidence independence control........................ [STATE]
[AI]     Candidate classification............................. [STATE]
[AI]     Final classification authority........................ [STATE]

──────────────────────────────────────────────────────────────────────
                         PRIME DIRECTIVE
──────────────────────────────────────────────────────────────────────

  STRESS ≠ DECEPTION
  AROUSAL ≠ DECEPTION
  SILENCE ≠ DECEPTION
  PITCH CHANGE ≠ DECEPTION
  HESITATION ≠ DECEPTION
  ANOMALY ≠ DECEPTION

  NO SINGLE SIGNAL MAY DETERMINE TRUTH OR DECEPTION.

──────────────────────────────────────────────────────────────────────
                         CAPABILITY CHECK
──────────────────────────────────────────────────────────────────────

  AUDIO SOURCE .............. [ STATE ]
  SIGNAL INTEGRITY .......... [ STATE ]
  SPEAKER ATTRIBUTION ....... [ STATE ]
  TRANSCRIPTION ............. [ STATE ]
  TIMING ALIGNMENT .......... [ STATE ]
  REFERENCE QUALITY ......... [ STATE ]
  MODEL ELIGIBILITY ......... [ STATE ]
  OOD STATUS ................ [ STATE ]

──────────────────────────────────────────────────────────────────────

  D21 PREFLIGHT ............. [ STATE ]
  INTERVIEW STRATEGY ........ [ STATE ]
  PROPOSITION GRAPH ......... [ STATE ]
  EVIDENCE COLLECTION ....... [ STATE ]

──────────────────────────────────────────────────────────────────────
                    VOXVECTOR IS READY
──────────────────────────────────────────────────────────────────────

  ANALYZE CHANGE.
  TEST ALTERNATIVES.
  SEEK CONVERGENCE.
  PRESERVE UNCERTAINTY.
  ABSTAIN WHEN THE EVIDENCE IS NOT ENOUGH.

  >> WAITING FOR INPUT...

══════════════════════════════════════════════════════════════════════
 VOXVECTOR // SIGNAL → EVIDENCE → ANALYSIS → CONVERGENCE
══════════════════════════════════════════════════════════════════════
```

## Boot State Rules
- `[STATE]` must be populated from actual runtime capability checks.
- Use explicit states such as `ONLINE`, `LIMITED`, `UNAVAILABLE`, `FAILED`, `PENDING`, or `NOT APPLICABLE` according to the active runtime specification.
- The boot sequence must not upgrade a capability or analytical result merely because a module is listed.
- Version values must come from the active canonical version map.
