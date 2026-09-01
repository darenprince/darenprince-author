# VoxVector System Architecture and Observability Audit

**Audit date:** 2026-09-01  
**Status:** Active findings; source repair committed; production verification pending

## Scope

This audit reviewed the current repository implementation, Developer Console ownership, deployment boundaries, connected Supabase schema, private storage buckets, and diagnostic persistence path.

## Evidence reviewed

- voxvector/src/components/DeveloperConsole.jsx
- voxvector/src/lib/api.js
- VoxVector/api/app.py
- VoxVector/api/observability.py
- VoxVector/api/storage.py
- active VoxVector and Crown Labs documentation
- connected Supabase project VoxVector
- Supabase table/schema state
- Supabase storage bucket state

## Architecture findings

### Public application boundary — verified

voxvector/ is the React/Vite public application. GitHub Actions builds and deploys the public artifact through GitHub Pages.

### API boundary — verified

VoxVector/ contains the canonical FastAPI adapter and analysis-engine workspace. Render hosts the API runtime.

### Persistence boundary — verified

The connected Supabase project contains private voxvector-logs and voxvector-media buckets. The media bucket limit is 262,144,000 bytes and is private.

### Observability projection gap — critical

At audit time, Supabase schema inspection found:

- public.api_request_logs: 0 rows
- public.error_reports: 0 rows

The tables existed, but the canonical diagnostic implementation persisted events to the immutable voxvector-logs Storage archive rather than projecting them into the relational tables.

This created a split between the intended Console dashboards and the actual durable event archive.

## Source repair

The canonical observability implementation was updated to:

1. emit sanitized diagnostics to Render stdout;
2. persist the immutable JSON event archive in voxvector-logs;
3. project lifecycle events into public.api_request_logs;
4. project error events into public.error_reports;
5. keep Storage reads as a compatibility fallback when relational reads are unavailable;
6. expose the same normalized event shape to Live Logs and Error Reports.

The Developer Console navigation was also reorganized into collapsible, grouped sections with a scrollable sidebar and a new Audits surface.

## Verification status

The source changes were committed and read back through GitHub.

This audit does **not** claim production verification yet. The exact deployed Render revision must execute authenticated traffic before new relational rows can exist.

Required next verification:

1. deploy the exact backend revision;
2. execute an authenticated case/API request;
3. confirm a new api_request_logs row;
4. trigger or observe a real sanitized error;
5. confirm a new error_reports row;
6. verify Live Logs in the deployed Developer Console;
7. verify Error Reports in the deployed Developer Console;
8. confirm Storage archive records remain present.

## Conclusion

The architecture is explicitly aligned around separate frontend, API-runtime, and persistence boundaries. The main observability defect identified by this audit was not the absence of diagnostic code; it was the absence of a reliable relational projection for the connected Supabase dashboards despite those tables already existing.

The repair is implemented in the canonical backend. Production behavior remains pending deployment and authenticated runtime verification.
