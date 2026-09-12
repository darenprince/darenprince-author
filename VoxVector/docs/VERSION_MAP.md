# VoxVector Version Map

**Living status document**

This map records current version authorities and evidence boundaries. Dated audit/checkpoint documents remain historical records and are not rewritten to look current.

## Active version authorities

| Area                            | Current authority                     | Current value / state                |
| ------------------------------- | ------------------------------------- | ------------------------------------ |
| Backend source release          | `VoxVector/pyproject.toml`            | **0.2.27**                           |
| Backend package/runtime version | `VoxVector/src/voxvector/__init__.py` | must match backend source release    |
| Pipeline/API software version   | `VoxVectorPipeline.software_version`  | sourced from backend package version |
| Public React application        | `voxvector/package.json`              | **0.2.38**                           |
| Frontend lockfile root package  | `voxvector/package-lock.json`         | **0.2.38**                           |
| Result schema                   | engine result contract                | **0.3**                              |
| Observation layer               | engine observation contract           | **0.1**                              |
| Validation registry             | validation contract                   | **0.3**                              |

Frontend and backend versions are intentionally independent. Frontend 0.2.38 is the Developer Dashboard/file-picker validation repair release. Backend remains 0.2.27 because the validated backend runtime was not changed by that frontend repair.

## Current runtime proof boundary

The current controlled backend proof remains deployed revision `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80` on Render deployment `dep-daifrgoae00c73ebcc20`.

Fresh September 12 runtime evidence for that deployed revision established:

- backend/API version **0.2.27**;
- `/health` status `ok`;
- runtime self-test `passed`;
- faster-whisper execution-ready on the constrained CPU/int8 path;
- pyannoteAI cloud-primary configured and execution-ready;
- controlled 183.3-second run completed **17/21 stages**, with **0 failed** and **4 intentionally not run**;
- faster-whisper completed and its transcript/alignment state was durably checkpointed before Stage 10;
- Stage 10 completed without an uncontrolled API restart.

Issue **#941 is complete**. Current cloud-primary speaker execution/persistence remains #970.

## Frontend 0.2.38 scope

Frontend 0.2.38 updates the existing canonical `voxvector/src/components/DeveloperConsole.jsx`; it does not create a second dashboard or upload implementation.

The release:

- passes the existing upload-progress state setter into `CaseWorkbench`, repairing the file-picker React state path that had been masked by the existing DOM-file-input fallback;
- makes the actual Developer Overview recognize the accepted controlled proof only when the live backend revision matches the proven deployed revision;
- changes the Developer Overview transcription state from generic readiness wording to **PROVEN** when that proof match exists;
- changes **Next Engineering Move** from stale `Transcription first` wording to **#970 diarization**;
- stops presenting the legacy implementation-checklist percentage as release readiness;
- adds a focused source-contract regression test for the upload setter and dashboard proof wording.

## Pipeline and capability versions

| Capability                          |               Version / state | Current engineering interpretation                                                               |
| ----------------------------------- | ----------------------------: | ------------------------------------------------------------------------------------------------ |
| Acoustic observation integration    |                           0.2 | integrated / observational                                                                       |
| Temporal observation integration    |                           0.2 | integrated / observational                                                                       |
| Voice quality HNR                   |                           0.1 | integrated / observational                                                                       |
| Prosodic dynamics                   |                           0.1 | integrated / observational                                                                       |
| Spectral dynamics / rolloff         |                           0.1 | integrated / observational                                                                       |
| Formant frame tracking              |                           0.1 | integrated / observational                                                                       |
| Speech segmentation                 |                           0.1 | integrated foundation                                                                            |
| Speaker baseline                    |                           0.1 | optional integrated / observational                                                              |
| Response latency                    |                           0.1 | optional integrated / observational                                                              |
| Transcript disfluency               |                           0.1 | optional integrated / observational                                                              |
| MFCC / cepstral module              |                           0.1 | integrated / observational                                                                       |
| Evidence acquisition                |                           0.1 | implemented foundation                                                                           |
| faster-whisper adapter              | configured + controlled proof | real current-revision provider execution and durable checkpoint proof established by #941        |
| pyannoteAI cloud primary            |                    configured | provider path ready; real current execution/persisted speaker evidence remains #970              |
| local pyannote Community-1 fallback |                      optional | not part of the constrained cloud-primary path unless explicitly enabled                         |
| Transcript/audio alignment          |                           0.1 | current controlled transcript/audio alignment proven; speaker-aware persisted proof remains #971 |
| Reliability gate                    |                           0.1 | implemented analytical eligibility control                                                       |
| Evidence grouping                   |                           0.1 | implemented / neutral                                                                            |
| Candidate classification boundary   |                           0.1 | implemented guarded foundation                                                                   |
| Final disposition gate              |                           0.1 | implemented guarded foundation                                                                   |
| Reproducibility / QA                |                           0.1 | implemented regression controls                                                                  |
| Research method expansion           |                           0.2 | active backlog                                                                                   |
| Deception classifier                |                  not assigned | no validated production classifier claimed                                                       |
| D Series validated inference        |                  not assigned | not active                                                                                       |

## Canonical 21-stage order

Stages 05 and 06 are authoritative as:

5. Speech Segmentation
6. Speaker Identification / Diarization

Any undated living surface that reverses those stages is stale. Historical dated records may retain prior wording as evidence of the state at that time.

## Frontend version presentation

The Developer Console reads frontend version from `voxvector/package.json` and API version from the live `/health` payload. It must not hard-code a backend release number as frontend truth.

The startup pipeline row verifies that the backend reports the canonical 21-stage contract. The separate foundations count communicates source maturity. Controlled runtime proof and scientific validation remain separate evidence states.

## Current documentation authorities

Use these living records first:

- `docs/VERSION_MAP.md`
- `docs/SYSTEM_STATE_REPORT.md`
- `docs/QA_STATUS.md`
- `docs/PIPELINE_BUILD_STATUS.md`
- `docs/ENDPOINT_REGISTRY.md`
- `docs/CURRENT_ENGINEERING_STATE_2026-09-12.md`
- `docs/CAPABILITY_STATUS.md`
- `docs/MVP_RELEASE_GATE.md`
- `docs/VALIDATION_SNAPSHOT_2026-09-12.md`

The Crown Labs executive mirror is `docs/crownlabsbible/04-product-dossiers/VoxVector/`.

## Verification boundary

Source version, CI, deployment, fresh runtime health, provider execution, persisted artifacts, authenticated browser behavior, engineering-MVP completion, and scientific validation are different evidence states. Never promote one into another by documentation wording alone.
