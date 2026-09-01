export const AUDIT_REPORTS = [
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
