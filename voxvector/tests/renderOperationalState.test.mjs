import test from 'node:test'
import assert from 'node:assert/strict'

import {
  normalizeOperationalState,
  operationalStateTone,
  renderOperationalState,
} from '../src/lib/renderOperationalState.js'

test('normalizes provider state strings for presentation', () => {
  assert.equal(normalizeOperationalState(' update_in_progress '), 'UPDATE IN PROGRESS')
  assert.equal(normalizeOperationalState(undefined), 'NOT REPORTED')
})

test('requires both Render service and deploy state to be live before reporting healthy', () => {
  assert.deepEqual(renderOperationalState({ serviceState: 'active', deployState: 'live' }), {
    serviceState: 'ACTIVE',
    deployState: 'LIVE',
    tone: 'healthy',
    live: true,
  })
  assert.equal(renderOperationalState({ serviceState: 'live', deployState: 'active' }).live, true)
})

test('keeps transitional Render states out of the healthy path', () => {
  assert.equal(renderOperationalState({ serviceState: 'active', deployState: 'build_in_progress' }).tone, 'warning')
  assert.equal(renderOperationalState({ serviceState: 'active', deployState: 'update_in_progress' }).live, false)
  assert.equal(operationalStateTone('pre_deploy_in_progress'), 'warning')
})

test('treats suspended, deactivated, failed, unavailable, and unreported states as errors', () => {
  assert.equal(renderOperationalState({ serviceState: 'suspended', deployState: 'live' }).tone, 'error')
  assert.equal(renderOperationalState({ serviceState: 'active', deployState: 'deactivated' }).tone, 'error')
  assert.equal(renderOperationalState({ serviceState: 'active', deployState: 'build_failed' }).tone, 'error')
  assert.equal(renderOperationalState({ serviceState: 'suspended', deployState: 'build_in_progress' }).tone, 'error')
  assert.equal(renderOperationalState({ serviceState: 'not_reported', deployState: 'deploying' }).tone, 'error')
  assert.equal(renderOperationalState({}).tone, 'error')
  assert.equal(renderOperationalState({ error: true }).tone, 'error')
})

test('reports pending queries as transitional rather than healthy', () => {
  assert.deepEqual(renderOperationalState({ pending: true }), {
    serviceState: 'PENDING',
    deployState: 'PENDING',
    tone: 'warning',
    live: false,
  })
})
