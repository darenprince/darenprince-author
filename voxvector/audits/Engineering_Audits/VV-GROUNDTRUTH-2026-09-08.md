# VV-GROUNDTRUTH source-of-truth audit

**Prompt:** VV-GROUNDTRUTH (Prompt 1)  
**Report date:** 2026-09-08 UTC  
**Repository:** `darenprince/darenprince-author`  
**Source reviewed:** `66a1616d49e228c6ec57d3cfc4855898675fae2c` plus the working documentation corrections on `docs/vv-groundtruth-followup`

## Evidence rules

Every row below identifies the evidence boundary and observation time. Repository source, GitHub QA, GitHub Pages publication, Render deployment, Supabase persistence, provider readiness, provider execution, browser behavior, and scientific validation are separate facts. A successful result at one boundary does not prove another.

## Source-of-truth matrix

| State | Finding | Evidence source | Observed at (UTC) |
| --- | --- | --- | --- |
| Frontend source revision | Canonical `main` is `66a1616d49e228c6ec57d3cfc4855898675fae2c`. The Pages build receives `${{ github.sha }}` as `VITE_GITHUB_SHA`. | GitHub `main`; `.github/workflows/deploy-pages.yml` | 2026-09-08T04:44:26Z |
| Frontend package version | `0.2.37`. | `voxvector/package.json` at `66a1616` | 2026-09-08 |
| Frontend QA revision/status | VoxVector QA run `34187973846` succeeded for exact revision `66a1616`; job `101940043972` completed successfully. The workflow runs backend tests and the React production build. | GitHub Actions run `34187973846`; `.github/workflows/voxvector-qa.yml` | 2026-09-08T04:43:35Z |
| Frontend publish trigger | Production Pages runs on eligible pushes to `main` and manual dispatch. Backend-only `VoxVector/**` changes are excluded except assets/docs/workflow paths. No developer API route is a Pages production trigger. | `.github/workflows/deploy-pages.yml` | 2026-09-08 |
| Frontend publish revision/status | Pages run `34187973929` built and deployed exact revision `66a1616`; build job `101940044304` and deploy job `101940232652` both succeeded. | GitHub Actions run `34187973929` | 2026-09-08T04:44:25Z |
| Publish-variable visibility | The connected GitHub surface rejected repository/environment Actions-variable endpoints, so undisclosed variables cannot be certified. The canonical workflow hard-codes the VoxVector API URL and uses secrets only for Supabase browser-safe configuration. | GitHub connector response; `.github/workflows/deploy-pages.yml` | 2026-09-08 |
| Backend package version | Distribution/package manifest is `0.2.27`. | `VoxVector/pyproject.toml` at `66a1616` | 2026-09-08 |
| Backend runtime version | Runtime package and health contract report pipeline `0.2.26`. The package/runtime version difference is real and must remain explicit. | `VoxVector/src/voxvector/__init__.py`; `VoxVector/api/app.py`; latest observed `/health` | source 2026-09-08; runtime 2026-09-07T17:08:07.471887Z |
| Backend deployed revision | Latest connected Render observation reports `73ac03ded08c161e092ee2a4ecbbed7d036771c8`, deployment `dep-dae7cvm7bikc738bhn30`, status `live`. The September 8 merge changed documentation only and is not claimed as a Render deployment. | Connected Render service/deploy inspection preserved in active audit record | 2026-09-07T17:10:38.148Z |
| API `/health` | HTTP 200; healthy; self-test passed; pipeline `0.2.26`; source `73ac03d`; storage `configured_media_ready`; 48 kHz and 250 MiB limits. | Live Render API response captured in `voxvector/audits/AUDIT_REPORT.md` and prior checkpoint | 2026-09-07T17:08:07.471887Z |
| Render service/deploy | Service `voxvector-api`, ID `srv-da2f88n40ujc73a8m26g`, root `VoxVector`, branch `main`, Oregon, one free-plan instance, not suspended, auto-deploy disabled. Latest observed deployment was live. A fresh connector call was not made because no workspace is selected in the current session and the connector requires user workspace selection before access. | Connected Render inspection; current connector selection response | service 2026-09-07T17:10:38.148Z; selection checked 2026-09-08 |
| Supabase project | Project `tawtkawmjqabydnatavx` is `ACTIVE_HEALTHY`, PostgreSQL 17.6.1, `us-east-1`. | Connected Supabase `get_project` | 2026-09-08 |
| Supabase auth | One profile row exists; source review verifies trusted `app_metadata` developer-role authorization. This does not prove multi-user isolation. | Connected Supabase table summary; `VoxVector/api/auth.py` | 2026-09-08 |
| Supabase storage | Private `voxvector-logs`, `voxvector-media`, and `voxvector-avatars` buckets were previously read back; latest counted state was 3,444 log objects, 26 media objects, 0 avatar objects. No private object content was exported. | Connected Supabase storage inspection preserved in prior checkpoint | 2026-09-07T17:12:42.480286Z |
| Supabase persistence | Nine public tables have RLS enabled. Current row counts include 2,234 API request logs, 6 error reports, 5 analysis runs, 5 provider-status rows, and 1 profile. | Connected Supabase `list_tables` | 2026-09-08 |
| Transcription configuration/readiness | Provider `faster_whisper`, model `base`, CPU/int8, adapter ready in latest observed health. Readiness is configuration evidence. | Render `/health`; `render.yaml`; speech-provider source | runtime 2026-09-07T17:08:07.471887Z; source 2026-09-08 |
| Transcription last real execution | Three historical canonical completion diagnostics were found; latest was attached to revision `6f339f45ac14233a30708103967f8c6791407875` at 2026-09-04T14:36:05.238223Z. Artifact contents were not read back, and this is not execution proof for `73ac03d` or `66a1616`. Five Base44-backed analysis rows are a separate lineage. | Supabase diagnostic/provider queries preserved in prior checkpoint | queried 2026-09-07; latest event 2026-09-04T14:36:05.238223Z |
| Diarization configuration/readiness | Latest observed health uses primary `pyannote_api`, API-key present, primary ready. `pyannote_local` fallback is disabled and not ready. The local Community-1 model repository exists and is gated. | Render `/health`; provider source; Hugging Face repo metadata | runtime 2026-09-07T17:08:07.471887Z; HF 2026-09-08 |
| Diarization last real execution | No canonical successful diarization execution was established. The latest related historical diagnostic recorded `not_invoked`. | Supabase diagnostic query preserved in prior checkpoint | queried 2026-09-07 |
| Hugging Face connection | Authenticated as `crownlabs-voxvector`; OAuth has read scopes. Model metadata is visible. Connected identity and model visibility do not prove that the Render runtime can download or execute the gated model. | Hugging Face `whoami` and model metadata | 2026-09-08 |
| Pipeline stage state | Source contract: 21 total, 16 implemented or built foundations, 4 conditional/not invoked, 1 queued. Stage 05 is queued; stages 07/08 are built foundations pending controlled provider-backed verification. | `VoxVector/api/app.py`; `VoxVector/docs/PIPELINE_BUILD_STATUS.md` | 2026-09-08 |
| Developer Console source | Active console exposes case workflow, runtime health, GitHub status, Render bridge, logs, audits, and engineering state. The protected Render Deploy Now route triggers a backend Render hook only; it is not a Pages frontend publish trigger. | React source; `VoxVector/api/render_api.py`; docs | 2026-09-08 |
| Browser verification | Public desktop landing was previously observed rendering. Authenticated console, mobile, keyboard, and current-revision production behavior remain unverified in this audit. | Prior browser observation preserved in checkpoint | 2026-09-07 |
| Scientific validation | No task-specific validated deception classifier, calibrated performance result, speaker-disjoint evaluation, cross-dataset generalization result, or validated final disposition is established. Current analytical output remains observational. | `VoxVector/docs/VALIDATION.md`, `DECEPTION_DETECTION_PROGRAM.md`, capability/source review | 2026-09-08 |

## Contradictions corrected

The documentation correction pass fixes active claims that were directly contradicted by repository or connected evidence:

- frontend `0.2.36` corrected to package authority `0.2.37`;
- Python 3.12 described as an historical audit intention because active QA uses Python 3.11;
- the Render build command now includes the transcription requirements installed by `render.yaml`;
- backend authentication guidance now acknowledges implemented Supabase token validation and protected developer routes;
- stage totals aligned to 16 implemented/built, 4 conditional/not invoked, and 1 queued;
- local pyannote Community-1 language separated from the cloud-primary `pyannote_api` runtime path;
- persistent-sidebar and Tremor guidance aligned to the current navigation and application-owned SVG chart stack; Recharts remains an unused manifest dependency;
- public application URLs separated from the original API hostname;
- Crown Labs static documentation publishing aligned to the canonical GitHub Actions Pages workflow;
- historical Render-access limitations scoped to their original sessions.

Dated audits retain their original evidence and receive clarification only where an old sentence could be mistaken for active guidance.

## Remaining evidence gaps

- Repository and environment Actions variables are inaccessible through the connected GitHub surface.
- The current Render connector has no selected workspace. Latest authorized Render evidence is therefore the timestamped September 7 observation.
- No controlled canonical diarization success or current-revision transcription artifact readback was established.
- Authenticated desktop/mobile browser verification is incomplete.
- Scientific validation remains a separate future program.

These gaps are reported as unknown or incomplete. None is converted into an inferred success state.
