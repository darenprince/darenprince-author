import test from 'node:test'
import assert from 'node:assert/strict'

import { normalizeWorkflowRun, selectWorkflowRuns, workflowEvidenceState } from '../src/lib/githubStatus.js'

const run = (name, sha, overrides = {}) => ({
  id: `${name}-${sha}`,
  name,
  head_sha: sha,
  status: 'completed',
  conclusion: 'success',
  updated_at: '2026-09-09T12:00:00Z',
  html_url: `https://example.test/${sha}`,
  run_number: 42,
  ...overrides,
})

test('normalizes completed and in-progress workflow states without truthy string coercion', () => {
  assert.equal(normalizeWorkflowRun(run('VoxVector QA', 'front')).state, 'PASS')
  assert.equal(normalizeWorkflowRun(run('VoxVector QA', 'front', { status: 'in_progress', conclusion: null })).state, 'IN_PROGRESS')
  assert.equal(normalizeWorkflowRun(run('VoxVector QA', 'front', { conclusion: 'failure' })).state, 'FAIL')
})

test('matches Pages and frontend QA to the frontend revision and backend QA separately', () => {
  const selected = selectWorkflowRuns([
    run('VoxVector QA', 'back'),
    run('VoxVector QA', 'front'),
    run('Deploy GitHub Pages', 'front'),
  ], { frontendRevision: 'front', backendRevision: 'back' })

  assert.equal(selected.frontendQa.sha, 'front')
  assert.equal(selected.backendQa.sha, 'back')
  assert.equal(selected.deployment.sha, 'front')
  assert.equal(selected.frontendQaMatchesSource, true)
  assert.equal(selected.backendQaMatchesSource, true)
  assert.equal(selected.deploymentMatchesSource, true)
})

test('reports stale or unknown freshness explicitly', () => {
  const stale = selectWorkflowRuns([
    run('VoxVector QA', 'old'),
    run('Deploy GitHub Pages', 'old'),
  ], { frontendRevision: 'front', backendRevision: 'back' })
  assert.equal(stale.frontendQaMatchesSource, false)
  assert.equal(stale.backendQaMatchesSource, false)
  assert.equal(stale.deploymentMatchesSource, false)

  const unknown = selectWorkflowRuns([run('VoxVector QA', 'old')])
  assert.equal(unknown.frontendQaMatchesSource, null)
  assert.equal(unknown.backendQaMatchesSource, null)
  assert.equal(unknown.deploymentMatchesSource, null)
  assert.equal(workflowEvidenceState(unknown.frontendQa, null), 'UNVERIFIED')
  assert.equal(workflowEvidenceState(stale.frontendQa, false), 'STALE')
  assert.equal(workflowEvidenceState(null, null, { isError: true }), 'UNAVAILABLE')
})
