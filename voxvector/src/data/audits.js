export const AUDIT_REPORTS = [
  {
    id: 'connected-render-cloud-audit-2026-09-03',
    date: '2026-09-03',
    title: 'Connected Render Runtime and Multi-Cloud Readiness Audit',
    status: 'baseline-verified-cloud-benchmark-pending',
    scope: ['Connected Render workspace','Live VoxVector API','Deployment history','Runtime limits','CPU and memory telemetry','Health logs','AWS connectivity','Azure Cosmos boundary'],
    summary: 'Connected infrastructure audit verified the live VoxVector API on Render and established an observed baseline before any migration. Render is currently operational; the main infrastructure limitation observed is its constrained free-tier compute envelope rather than a demonstrated production outage.',
    findings: [
      { severity: 'verified', title: 'Render API is live', detail: 'voxvector-api is live, unsuspended, externally reachable, and configured with /health. Recent sampled application logs show repeated HTTP 200 health responses.' },
      { severity: 'verified', title: 'Canonical deployment is current', detail: 'The current live deployment completed on 2026-09-03 from commit ccbcbec261812c51920a9305ffb265607616d575.' },
      { severity: 'high', title: 'Render compute envelope is constrained', detail: 'Observed service limits are 0.15 CPU and approximately 512 MiB memory on the free plan. This is the primary infrastructure reason to benchmark adjustable container compute.' },
      { severity: 'verified', title: 'Idle runtime memory was below the observed limit', detail: 'Sampled idle memory was approximately 92 to 100 MB. This is not a peak analysis measurement and must not be treated as proof that heavy audio workloads fit comfortably.' },
      { severity: 'warning', title: 'Performance baseline is incomplete', detail: 'HTTP request-count and latency metrics were unavailable in the sampled window. Startup, upload, and full analysis timings still require controlled measurement.' },
      { severity: 'recommended', title: 'Keep Supabase as the storage boundary', detail: 'No observed requirement justifies replacing or duplicating Supabase with Cosmos DB during compute benchmarking.' },
      { severity: 'recommended', title: 'AWS remains benchmark-ready but not selected', detail: 'AWS Core connectivity and region discovery are available. Account resource and credit conclusions were not fabricated because direct resource enumeration was unavailable in this audit surface.' }
    ],
    next: [
      'Create a reproducible container for the canonical VoxVector API without changing API contracts.',
      'Capture controlled Render startup, upload, and analysis measurements.',
      'Deploy the identical container to one cloud benchmark environment using available credits.',
      'Do not change production DNS or frontend routing until measured comparison results exist.',
      'Keep Supabase unchanged and do not introduce Cosmos DB as a duplicate primary store.',
      'Record every benchmark result and provider decision in canonical documentation and the Developer Console audit surface.'
    ],
    evidence: ['Render connected workspace audit','Render service configuration','Render deployment history','Render CPU and memory telemetry','Render application health logs','VoxVector/api/app.py','VoxVector/api/requirements.txt','VoxVector/api/requirements-speech.txt','VoxVector/docs/OPERATING_CHARTER.md']
  },

  {
    id: 'cloud-platform-architecture-audit-2026-09-03',
    date: '2026-09-03',
    title: 'Cloud Platform, API, Storage, and Deployment Architecture Audit',
    status: 'migration-assessment-complete',
    scope: ['Canonical repository','Frontend deployment','FastAPI runtime','Audio intake','Supabase services','Render constraints','AWS credit option','Azure credit option'],
    summary: 'Canonical architecture audit completed before any cloud migration. The public React application is correctly separated from the FastAPI analysis runtime. The working production boundaries should be preserved: GitHub Pages remains the frontend host, Supabase remains the configured authentication, persistence, diagnostics, and private media layer, and only the Render-hosted API/compute boundary is a migration candidate.',
    findings: [
      { severity: 'verified', title: 'Frontend should not migrate', detail: 'The canonical voxvector/ React/Vite application is already deployed separately through GitHub Pages. Moving static frontend delivery to AWS or Azure would add cost and operational complexity without solving the API/runtime constraints.' },
      { severity: 'verified', title: 'Backend migration boundary is clear', detail: 'VoxVector/ contains the canonical Python/FastAPI HTTP adapter and analysis-engine workspace. This is the isolated compute boundary that can be containerized and moved without relocating the public application.' },
      { severity: 'verified', title: 'Supabase should remain in place initially', detail: 'Supabase is already the configured authentication, persistence, diagnostics, and private media-storage boundary. A cloud migration does not require duplicating this layer into S3, Blob Storage, or another database during the first compute migration.' },
      { severity: 'high', title: 'Render resource pressure is the primary infrastructure candidate', detail: 'Current engineering status documents a constrained Render runtime and separates heavier transcription/diarization dependencies. Container-based compute with adjustable CPU and memory is the clearest infrastructure improvement target.' },
      { severity: 'high', title: 'Current analysis request model is synchronous', detail: 'The browser uploads through the FastAPI case route and invokes case-bound analysis through the API. Before introducing queues, jobs, or serverless orchestration, lifecycle behavior must be measured because asynchronous migration should solve an observed runtime constraint rather than be added speculatively.' },
      { severity: 'warning', title: 'Do not split AWS and Azure production paths', detail: 'Using both credits for one production request path would create unnecessary cross-cloud credentials, networking, billing, and observability complexity. Select one primary compute platform after a small benchmark.' },
      { severity: 'recommended', title: 'Azure is the first benchmark candidate', detail: 'Given available Azure credit and the existing Python container/runtime boundary, benchmark Azure Container Apps for the FastAPI service first. AWS should remain a comparison target rather than an immediate parallel production migration.' },
      { severity: 'recommended', title: 'AWS remains a valid second benchmark', detail: 'If Azure Container Apps does not meet cold-start, memory, CPU, deployment, or cost requirements, benchmark the same container on AWS Fargate/App Runner. Preserve the application and Supabase contracts so the comparison is infrastructure-only.' }
    ],
    next: [
      'Build the canonical VoxVector API as a reproducible container without changing API contracts.',
      'Measure the current Render baseline: startup time, health readiness, upload latency, analysis duration, memory pressure, and failure rate.',
      'Deploy the identical container to Azure Container Apps using the available credit and run the same controlled smoke workload.',
      'Compare Azure results against the measured Render baseline before changing DNS, frontend API configuration, or production routing.',
      'Use AWS credit only for a controlled equivalent benchmark if Azure does not provide a clear operational advantage.',
      'Keep GitHub Pages and Supabase unchanged during the compute benchmark.',
      'Record runtime measurements in the audit surface; do not represent cloud-provider migration as scientific validation.'
    ],
    evidence: [
      'VoxVector/docs/OPERATING_CHARTER.md',
      'VoxVector/docs/DEPLOYMENT_BOUNDARY.md',
      'VoxVector/docs/SYSTEM_STATE_REPORT.md',
      'VoxVector/docs/CAPABILITY_STATUS.md',
      'VoxVector/api/app.py',
      'VoxVector/api/storage.py',
      'VoxVector/api/README.md',
      'voxvector/src/lib/api.js',
      'voxvector/src/components/DeveloperConsole.jsx'
    ]
  },

  {
    id: 'full-auto-audit-2026-09-01-0516',
    date: '2026-09-01',
    title: 'Full AUTO Repository, CI, Architecture, and Observability Audit',
    status: 'remediation-in-progress',
    scope: ['GitHub HEAD','GitHub Actions','API tests','GitHub Pages deployment','Supabase observability','Developer Console'],
    summary: 'Automated audit of the current canonical repository and connected infrastructure. The production Pages deployment succeeded, while the current VoxVector QA workflow failed in API tests before the React build step could execute.',
    findings: [
      { severity: 'critical', title: 'QA gate failing', detail: 'Latest QA run failed with 3 test failures. The relational observability projection introduced a compatibility failure for lightweight test storage doubles, and one storage assertion still unpacked the old request tuple shape.' },
      { severity: 'high', title: 'Frontend build not reached by QA', detail: 'Because pytest failed first, the workflow skipped npm dependency installation and the React production build. Pages deployment success is therefore not equivalent to a clean full QA pass.' },
      { severity: 'verified', title: 'Pages deployment', detail: 'The latest Deploy GitHub Pages workflow for the audited HEAD completed successfully.' },
      { severity: 'critical', title: 'Operational observability still requires runtime proof', detail: 'The connected Supabase operational tables were previously observed empty. Source-level projection exists, but production API traffic must prove rows are being written.' }
    ],
    next: ['Commit compatibility remediation for QA failures.', 'Wait for the new QA run and verify pytest plus React build.', 'Verify deployed API revision against Supabase api_request_logs and error_reports.', 'Update this audit status only from observed workflow and runtime evidence.'],
    evidence: ['GitHub Actions run 33472929781','Workflow job 99746188447','VoxVector/api/observability.py','VoxVector/tests/test_observability.py','VoxVector/tests/test_storage.py','Connected Supabase audit']
  },

  {
    id: 'system-architecture-2026-09-01',
    date: '2026-09-01',
    title: 'System Architecture and Observability Audit',
    status: 'active',
    scope: ['Repository architecture','Deployment boundaries','Developer Console','Supabase observability'],
    summary: 'Architecture boundaries were reviewed against the current repository and connected Supabase project. The public frontend, Render API runtime, and Supabase persistence boundaries are explicitly separated.',
    findings: [
      { severity: 'critical', title: 'Observability projection gap', detail: 'Diagnostic objects existed in Storage while public.error_reports and public.api_request_logs were empty, leaving the Console dependent on nested object traversal.' },
      { severity: 'high', title: 'Live feed reliability', detail: 'The Developer Console had endpoints for diagnostics, but the durable relational projections required by the connected Supabase schema were not being written.' },
      { severity: 'resolved-in-source', title: 'Dual-write repair', detail: 'The canonical observability layer now projects sanitized diagnostic events into Supabase request/error tables while retaining immutable Storage archive writes and archive fallback reads.' },
      { severity: 'verified', title: 'Hosting boundaries', detail: 'GitHub Actions/GitHub Pages own the public frontend deployment; Render hosts the API; Supabase owns configured authentication, persistence, and private media storage.' }
    ],
    next: ['Verify the deployed API revision writes new rows during a real authenticated request.', 'Verify Error Reports and Live Logs in the production Developer Console.', 'Keep Storage archive and relational projections reconciled.'],
    evidence: ['VoxVector/api/observability.py','VoxVector/api/storage.py','VoxVector/api/app.py','VoxVector/docs/STORAGE_AND_OBSERVABILITY.md','Connected Supabase schema inspection']
  }
]
