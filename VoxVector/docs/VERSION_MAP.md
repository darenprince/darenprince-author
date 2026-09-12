# VoxVector Version Map

**Living status document**

This map records current version authorities and evidence boundaries. Dated audit/checkpoint documents remain historical records and are not rewritten to look current.

## Active version authorities

| Area | Current authority | Current value / state |
|---|---|---|
| Backend source release | `VoxVector/pyproject.toml` | **0.2.27** |
| Backend package/runtime version | `VoxVector/src/voxvector/__init__.py` | must match backend source release |
| Pipeline/API software version | `VoxVectorPipeline.software_version` | sourced from backend package version |
| Public React application | `voxvector/package.json` | **0.2.37** |
| Frontend lockfile root package | `voxvector/package-lock.json` | **0.2.37** |
| Result schema | engine result contract | **0.3** |
| Observation layer | engine observation contract | **0.1** |
| Validation registry | validation contract | **0.3** |

Frontend and backend versions are intentionally independent. Do not force them into numeric lockstep. A documentation reconciliation does not itself create a new software release.

## Current synchronization baseline

The engineering baseline reconciled by the 2026-09-12 systemwide information pass was GitHub `main` revision `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80`, which includes the merged public navigation/site-map/pipeline projection repair from PR #993 and the merged landing-cascade repair from PR #997.

Because documentation synchronization is itself committed after that baseline, the branch head can legitimately be newer. Use the package manifests for release numbers and Git history for exact source identity rather than treating this baseline SHA as a forever-current head pointer.

Exact-baseline VoxVector QA run `34679916767` completed successfully.

## Runtime evidence boundary

The latest previously recorded forced-fresh backend `/health` readback reported backend version **0.2.27**, `status=ok`, and `runtime_self_test=passed` on source `1cc10f40bb6b94e0a8f3380c1b70529137e89d93` on 2026-09-11.

The 2026-09-12 connected Supabase diagnostic stream is receiving production API request records tagged with source revision `66f2ea8049e2139a22c453d1e0ab9d6e18a9ca80`. Those records establish current diagnostic source attribution, not a substitute for a fresh `/health` response or a Render deployment record. `pipeline_version` remains `unknown` on the sampled request-log rows and must not be invented from source metadata.

## Pipeline and capability versions

| Capability | Version / state | Current engineering interpretation |
|---|---:|---|
| Acoustic observation integration | 0.2 | integrated / observational |
| Temporal observation integration | 0.2 | integrated / observational |
| Voice quality HNR | 0.1 | integrated / observational |
| Prosodic dynamics | 0.1 | integrated / observational |
| Spectral dynamics / rolloff | 0.1 | integrated / observational |
| Formant frame tracking | 0.1 | integrated / observational |
| Speech segmentation | 0.1 | integrated foundation |
| Speaker baseline | 0.1 | optional integrated / observational |
| Response latency | 0.1 | optional integrated / observational |
| Transcript disfluency | 0.1 | optional integrated / observational |
| MFCC / cepstral module | 0.1 | integrated / observational |
| Evidence acquisition | 0.1 | implemented foundation |
| faster-whisper adapter | configured | historical real beam-1 provider execution exists; current controlled repeatability remains #941 |
| pyannoteAI cloud primary | configured | provider path wired; current real execution/persisted speaker evidence remains #970 |
| local pyannote Community-1 fallback | optional | not part of the constrained cloud-primary path unless explicitly enabled |
| Transcript/speaker alignment | 0.1 | foundation implemented; persisted multimodal proof remains #971 |
| Reliability gate | 0.1 | implemented analytical eligibility control |
| Evidence grouping | 0.1 | implemented / neutral |
| Candidate classification boundary | 0.1 | implemented guarded foundation |
| Final disposition gate | 0.1 | implemented guarded foundation |
| Reproducibility / QA | 0.1 | implemented regression controls |
| Research method expansion | 0.2 | active backlog |
| Deception classifier | not assigned | no validated production classifier claimed |
| D Series validated inference | not assigned | not active |

## Canonical 21-stage order

Stages 05 and 06 are authoritative as:

5. Speech Segmentation
6. Speaker Identification / Diarization

Any undated living surface that reverses those stages is stale. Historical dated records may retain prior wording as evidence of the state at that time.

## Frontend version presentation

The Developer Console startup footer reads the frontend version from `voxvector/package.json` and reads the API version from the live `/health` payload. It must not hard-code a backend version in the React source.

The startup pipeline row verifies that the backend reports the canonical 21-stage contract. The maturity count shown beside it is a separate engineering status and must not be represented as all 21 stages being production-complete or scientifically validated.

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

The Crown Labs executive mirror is `docs/crownlabsbible/04-product-dossiers/VoxVector/`.

## Verification boundary

Source version, CI, deployment, fresh runtime health, provider execution, persisted artifacts, authenticated browser behavior, engineering-MVP completion, and scientific validation are different evidence states. Never promote one into another by documentation wording alone.
