import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const frontend = readFileSync(new URL('../src/lib/api.js', import.meta.url), 'utf8')
const backend = readFileSync(new URL('../../VoxVector/api/app.py', import.meta.url), 'utf8')

const contracts = [
  { name: 'health', client: "apiRequest('/health')", server: '@app.get("/health")' },
  { name: 'case collection', client: "apiRequest('/v1/cases'", server: '@app.post("/v1/cases")' },
  { name: 'case list', client: '`/v1/cases?limit=', server: '@app.get("/v1/cases")' },
  { name: 'case detail', client: '`/v1/cases/${encodeURIComponent(caseId)}`', server: '@app.get("/v1/cases/{case_id}")' },
  { name: 'case delete', client: "method: 'DELETE'", server: '@app.delete("/v1/cases/{case_id}")' },
  { name: 'source upload', client: '/sources`); xhr.timeout', server: '@app.post("/v1/cases/{case_id}/sources")' },
  { name: 'secure playback', client: '/playback?expires=', server: '@app.get("/v1/cases/{case_id}/sources/{source_id}/playback")' },
  { name: 'case analysis', client: '/analyze`, { method:', server: '@app.post("/v1/cases/{case_id}/sources/{source_id}/analyze")' },
  { name: 'diagnostic errors', client: '/v1/diagnostics/errors?days=', server: '@app.get("/v1/diagnostics/errors")' },
  { name: 'diagnostic events', client: '/v1/diagnostics/events?', server: '@app.get("/v1/diagnostics/events")' },
  { name: 'Render status', client: '/v1/developer/render/status?', server: '@app.get("/v1/developer/render/status")' },
  { name: 'Render logs', client: '/v1/developer/render/logs?', server: '@app.get("/v1/developer/render/logs")' },
  { name: 'Render deploy trigger', client: "apiRequest('/v1/developer/render/deploy'", server: '@app.post("/v1/developer/render/deploy")' },
  { name: 'debug bundle', client: '/v1/developer/render/debug-bundle?case_id=', server: '@app.get("/v1/developer/render/debug-bundle")' },
]

test('Developer Console client routes still map to canonical backend route owners', () => {
  for (const contract of contracts) {
    assert.ok(frontend.includes(contract.client), `frontend missing ${contract.name} contract`)
    assert.ok(backend.includes(contract.server), `backend missing ${contract.name} contract`)
  }
})

test('frontend keeps the preserved Render API as its default API base and sends protected calls through bearer auth', () => {
  assert.match(frontend, /https:\/\/voxvector\.crownlabs\.tech/)
  assert.match(frontend, /Authorization: `Bearer \$\{accessToken\}`/)
  assert.doesNotMatch(frontend, /RENDER_API_KEY|RENDER_DEPLOY_HOOK_URL|SUPABASE_SERVICE_ROLE_KEY/)
})
