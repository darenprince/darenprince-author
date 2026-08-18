# VoxVector Free Deployment Plan

**Status:** Active deployment runbook
**Target:** $0 development/prototype deployment
**Repository:** `darenprince/darenprince-author`
**Product:** VoxVector
**Last reviewed:** 2026-08-18

## 1. Purpose

This runbook defines the simplest practical deployment path for VoxVector while keeping development costs at $0. It is written for a non-specialist operator and gives the exact dashboard navigation to use at each provider.

The deployment separates the product frontend from the Python audio-analysis runtime and uses managed services rather than requiring the operator to install servers, Docker, Python, or PostgreSQL locally.

The repository remains the canonical technical source of truth. The VoxVector Operating Charter requires runtime changes, schemas, validation requirements, and project decisions to remain documented and auditable.

## 2. Target architecture

```text
User
  |
  v
Vercel
Next.js + TypeScript + Tailwind + shadcn/ui
  |
  +--------------------+
  |                    |
  v                    v
Supabase             Render Free
Auth                  FastAPI
Postgres                |
Storage                 v
  |                VoxVector Python engine
  |
  +------ user/case/audio data
```

### Responsibilities

**Vercel**
- Hosts the VoxVector web application.
- Handles the public web URL and frontend deployment.
- Connects directly to GitHub for automatic deployments.

**Supabase Free**
- User authentication.
- PostgreSQL database.
- Secure audio/object storage.
- Row Level Security for user-owned data.

**Render Free**
- Hosts the Python/FastAPI VoxVector runtime.
- Receives analysis requests from the frontend.
- Runs the canonical Python analysis pipeline.

**GitHub**
- Canonical source.
- Version history.
- Deployment trigger.

## 3. Cost target and limitations

The initial target is $0/month. Free tiers are appropriate for development, demonstrations, testing, and early prototype use, not guaranteed production availability.

### Vercel

Use the free Hobby tier if it is available to the account and project configuration. Vercel's current documented deployment flow is Dashboard > Add New > Project, select the Git provider, import the repository, allow framework detection, then Deploy.

### Supabase

The current Free plan is $0/month and includes 500 MB database size, 1 GB file storage, 5 GB egress, and 50,000 monthly active users. Supabase currently states that Free projects pause after one week of inactivity and that the Free plan has a two-project limit. Check the live pricing page before creating production data.

### Render

The current Free web-service tier provides 750 free instance hours per workspace per calendar month. Free services spin down after 15 minutes of inactivity and typically take about one minute to wake. The filesystem is ephemeral, so audio and persistent application data must not be stored on the Render filesystem. Render explicitly describes Free services as appropriate for testing/hobby projects rather than production.

**Important:** Free-tier policies can change. Re-check the provider's current pricing/limits immediately before enabling anything that could incur charges.

## 4. What Daren needs to do

Only these account-level actions should require the operator:

1. Sign into Vercel with GitHub.
2. Create/connect the Supabase Free project.
3. Create/connect the Render Free service.
4. Authorize GitHub access when each provider requests it.
5. Copy only the public project values and secrets that the application requires into the provider's environment-variable panels.

Do not paste passwords, service-role keys, database passwords, or private tokens into GitHub files or chat.

## 5. Phase 0 — Do not deploy yet

Before clicking Deploy anywhere, verify that the VoxVector frontend and Python API are actually present in the repository in their intended final locations.

Expected eventual application layout:

```text
VoxVector/
  app/                 # Next.js application
  components/          # reusable UI
  lib/                 # API/auth helpers
  public/              # product assets
  api/voxvector/       # Python API/runtime
  src/voxvector/       # canonical analysis engine
  docs/
```

Do not create duplicate runtime implementations merely to satisfy a hosting provider. The Python runtime must call the canonical VoxVector pipeline.

## 6. Phase 1 — Vercel setup

### Step 1: Open Vercel

Open:

https://vercel.com/

Sign in using the GitHub account that owns or can access `darenprince/darenprince-author`.

### Step 2: Import the repository

In the Vercel Dashboard:

1. Click **Add New**.
2. Click **Project**.
3. Under Git repositories, select/connect **GitHub** if it is not already connected.
4. Find `darenprince/darenprince-author`.
5. Click **Import**.

Vercel's current documentation says the dashboard flow is Add New > Project, choose the Git provider, import the repository, allow framework detection, then Deploy.

### Step 3: Configure the project

Use these values when the application has been migrated to Next.js:

- **Project Name:** `voxvector`
- **Framework Preset:** `Next.js`
- **Root Directory:** use the actual frontend directory once the migration is complete; do not guess.
- **Build Command:** leave the Vercel default unless repository configuration requires otherwise.
- **Output Directory:** leave the Vercel default.
- **Install Command:** leave the Vercel default.

Do not click Deploy until the repository contains the Next.js application and its required environment-variable names have been documented.

### Step 4: Environment variables

After importing the project:

1. Open the Vercel project.
2. Click **Settings**.
3. Click **Environment Variables**.
4. Add only the variables documented by the VoxVector application.
5. Apply them to the required environments: Development, Preview, and/or Production.
6. Save.

Never commit `.env`, `.env.local`, Supabase service-role keys, Render tokens, or database passwords.

### Step 5: Deploy

Return to the project overview and start the deployment.

After deployment, Vercel provides a temporary `vercel.app` URL. Test that URL before changing the custom domain.

### Step 6: Automatic deployment

Once connected, pushes to the configured production branch should trigger new deployments. Pull requests/branches should be used for preview validation where practical.

## 7. Phase 2 — Supabase Free setup

### Step 1: Open Supabase

Open:

https://supabase.com/

Sign in and create a new organization/project using the Free plan.

### Step 2: Create the project

In the Supabase Dashboard:

1. Click **New project**.
2. Select/create the organization.
3. Enter a project name such as `voxvector`.
4. Choose a strong database password and store it securely.
5. Select a region appropriate to the application/users.
6. Choose the **Free** plan if offered.
7. Create the project and wait for provisioning.

Do not put the database password in GitHub.

### Step 3: Authentication

Supabase Auth will provide the real login/logout system.

The application should use email/password or magic-link authentication initially. Do not retain the current browser-local demo identity as production authentication.

In Supabase:

1. Open **Authentication**.
2. Open **Providers**.
3. Enable the selected email provider/method.
4. Configure email settings according to the current Supabase dashboard.
5. Keep public sign-up enabled only if the product is intended to allow self-registration.

Supabase Auth integrates with JWT sessions and Row Level Security, which is the intended mechanism for protecting user-owned VoxVector cases and analyses.

### Step 4: Database

The application migration should create tables for at least:

- profiles
- cases
- analyses
- analysis_observations
- analysis_evidence
- audio_assets

Every user-owned table must include ownership information and Row Level Security policies.

Do not create these manually if the repository contains canonical SQL migrations. Run the repository migration instead so the deployed schema matches source control.

### Step 5: Storage

Open **Storage** in the Supabase Dashboard.

Create a private bucket for audio recordings, for example:

`voxvector-audio`

Do not make the bucket public.

Audio should be accessed using authenticated requests or short-lived signed URLs.

Supabase's current storage guidance recommends storing large media files in Storage rather than database rows and organizing files into buckets with appropriate access rules.

### Step 6: Retrieve application values

The frontend normally needs the project URL and public/anon key.

The Python service may require server-side credentials depending on the final API design.

Never expose a Supabase service-role key in browser code.

## 8. Phase 3 — Render Free Python runtime

### Step 1: Open Render

Open:

https://render.com/

Create/sign into the account.

### Step 2: Connect GitHub

In Render, connect GitHub when prompted.

Current Render documentation says the first-service flow can authorize GitHub and then display accessible repositories.

### Step 3: Create the Python service

In the Render Dashboard:

1. Click **New**.
2. Select **Web Service**.
3. Select the GitHub provider.
4. Select `darenprince/darenprince-author`.
5. Click **Connect**.

### Step 4: Configure the service

Use the actual runtime directory after the repository migration is complete.

Recommended initial values:

- **Name:** `voxvector-api`
- **Branch:** `main`
- **Language:** `Python 3`
- **Root Directory:** actual Python API directory, if using a monorepo
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `uvicorn <actual_module>:app --host 0.0.0.0 --port $PORT`
- **Instance Type:** `Free`

Do not guess the module path. It must match the committed FastAPI application.

Render's official FastAPI example uses `pip install -r requirements.txt` and Uvicorn with `0.0.0.0:$PORT`.

### Step 5: Python version

Pin the Python version in the repository with `.python-version` or Render's `PYTHON_VERSION` environment variable after confirming the version supported by the VoxVector dependency set.

Do not rely on a provider's changing default Python version for a scientific runtime.

### Step 6: Environment variables

In the Render service:

1. Open the service.
2. Click **Environment**.
3. Under Environment Variables, click **+ Add Environment Variable**.
4. Add the variables documented by the VoxVector API.
5. Choose **Save, rebuild, and deploy** when appropriate.

Render documents this exact Environment-panel flow and supports storing secrets as environment variables rather than committing them to source control.

### Step 7: Health endpoint

The API should expose a lightweight health endpoint such as:

`GET /health`

It should return a deterministic service-health response without performing audio analysis.

After deployment, test:

`https://<render-service>.onrender.com/health`

### Step 8: API documentation

FastAPI normally exposes:

`/docs`

Use this for development testing only. Do not expose sensitive internal configuration through the documentation endpoint.

## 9. Phase 4 — Connect Vercel to Render

The Next.js frontend should have an environment variable similar to:

`VOXVECTOR_API_URL=https://<render-service>.onrender.com`

If browser-side code directly calls the API, use a deliberately named public variable and configure CORS securely. Preferably, production browser requests should pass through a controlled Next.js server/API layer so secrets are never exposed.

Configure the value in Vercel:

**Project → Settings → Environment Variables**

Then redeploy.

The Render API must allow requests only from the intended VoxVector web origin(s), not unrestricted `*` CORS in the finished product.

## 10. Phase 5 — Custom domain

Only after the Vercel deployment works on its temporary URL should the custom domain be changed.

In Vercel:

1. Open the VoxVector project.
2. Click **Settings**.
3. Click **Domains**.
4. Add the desired domain/subdomain.
5. Vercel will display the required DNS record(s).
6. Add those records at the DNS provider that currently controls `darenprince.com`.
7. Return to Vercel and wait for verification.

Do not delete existing DNS records until the current website/domain routing is understood.

For the first migration, prefer a subdomain or a dedicated VoxVector route if that avoids disrupting the existing author site.

## 11. Phase 6 — Render API domain

A custom API domain is optional at the free stage. The `onrender.com` HTTPS URL is sufficient for development.

If a branded API domain is later desired, Render supports custom domains and managed TLS.

## 12. Deployment order

Do not perform the services in random order. Use this sequence:

1. Finish the Next.js frontend migration in GitHub.
2. Finish the FastAPI runtime wrapper in GitHub.
3. Add tests and health endpoint.
4. Create Supabase Free project.
5. Apply database/storage migrations.
6. Deploy Python API to Render Free.
7. Test `/health`.
8. Test the real analysis endpoint with a known WAV fixture.
9. Deploy Next.js frontend to Vercel.
10. Configure Vercel environment variables.
11. Test login/logout.
12. Test audio upload.
13. Test analysis request.
14. Test results retrieval.
15. Test case persistence.
16. Test logout and session invalidation.
17. Test mobile layout.
18. Only then attach the production domain.

## 13. Free-tier operational constraints

### Render

The Python service may sleep after inactivity. The first request can therefore be slow. Do not interpret a cold start as an analysis failure.

Do not store permanent audio, cases, logs, or databases on the Render filesystem. Free Render filesystems are ephemeral.

### Supabase

The Free plan has limited database and file storage. Audio retention must therefore be designed intentionally. Large recordings can consume the 1 GB file-storage quota quickly.

The Free project can pause after inactivity. Confirm current behavior before relying on it for important user data.

### Vercel

The frontend should remain within the current Hobby plan's usage and commercial-use rules. Re-check the live Vercel pricing/terms before public commercial launch.

## 14. Security rules

- Never commit secrets.
- Never put Supabase service-role credentials in browser code.
- Keep audio buckets private.
- Use authenticated access and signed URLs where required.
- Enforce Row Level Security.
- Validate uploaded file type and size server-side.
- Do not trust browser-supplied analysis results.
- The Python runtime must be the authority for analysis results.
- Restrict CORS to the VoxVector web origin.
- Log analysis provenance without logging unnecessary sensitive audio content.
- Do not store raw audio longer than the product's stated retention policy.

## 15. Verification checklist

A deployment is **not verified** merely because a page loads.

### Frontend

- [ ] Vercel deployment succeeds.
- [ ] Landing page loads.
- [ ] Dashboard loads.
- [ ] Login works.
- [ ] Logout works.
- [ ] Session persists across refresh.
- [ ] Unauthorized users cannot open protected dashboard routes.
- [ ] Mobile layout works.
- [ ] Buttons perform their documented actions.

### Backend

- [ ] Render deployment succeeds.
- [ ] `/health` returns success.
- [ ] `/docs` loads in development.
- [ ] API accepts a supported WAV fixture.
- [ ] Invalid files are rejected safely.
- [ ] Runtime calls the canonical VoxVector pipeline.
- [ ] Provenance is returned.
- [ ] No fabricated probability is returned when the model is unavailable.

### Data

- [ ] User record is created.
- [ ] Case is created.
- [ ] Audio is stored in private Supabase Storage.
- [ ] Analysis record is persisted.
- [ ] Observations are persisted.
- [ ] Evidence is persisted.
- [ ] User A cannot access User B's records.
- [ ] Logout invalidates the authenticated application session.

### Scientific/runtime integrity

- [ ] Eligibility remains separate from analysis.
- [ ] Evidence remains separate from candidate classification.
- [ ] Final disposition remains separate from candidate classification.
- [ ] Missing data does not create artificial confidence.
- [ ] Deception Probability is never fabricated by the UI.
- [ ] Demo values are visibly identified as demo values.
- [ ] Production probability requires the configured calibrated model and validation gates.

## 16. Provider references

- Vercel deployment: https://vercel.com/academy/vercel-foundations/vercel-account-setup
- Supabase Auth: https://supabase.com/docs/guides/auth
- Supabase Storage: https://supabase.com/docs/guides/storage/quickstart
- Supabase pricing: https://supabase.com/pricing
- Render first deploy: https://render.com/docs/your-first-deploy
- Render FastAPI: https://render.com/docs/deploy-fastapi
- Render free tier: https://render.com/docs/free
- Render environment variables: https://render.com/docs/configure-environment-variables
- Render Python version: https://render.com/docs/python-version

## 17. Final operating rule

The operator should not have to manually deploy code after initial setup. The intended steady-state workflow is:

```text
Change VoxVector
      ↓
GitHub commit/push
      ↓
Vercel frontend deployment
+
Render Python deployment
      ↓
Automated tests / health checks
      ↓
Preview / production
```

Any deployment failure must be diagnosed from the actual provider logs and repository state. Never claim deployment success without verifying the resulting service.
