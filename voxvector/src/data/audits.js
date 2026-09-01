export const AUDIT_REPORTS = [
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
