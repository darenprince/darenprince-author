import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const apiSource = readFileSync(new URL('../src/lib/api.js', import.meta.url), 'utf8')
const buttonSource = readFileSync(new URL('../src/components/DebugBundleButton.jsx', import.meta.url), 'utf8')
const workspaceSource = readFileSync(new URL('../src/components/CaseAnalysisWorkspace.jsx', import.meta.url), 'utf8')

test('debug bundle client requests an authenticated server generated zip', () => {
  assert.match(apiSource, /export async function downloadDebugBundle/)
  assert.match(apiSource, /\/v1\/developer\/render\/debug-bundle\?case_id=/)
  assert.match(apiSource, /Accept: 'application\/zip'/)
  assert.match(apiSource, /\.blob\(\)/)
})

test('analysis workspace exposes one debug bundle control without a duplicate page', () => {
  assert.match(workspaceSource, /import DebugBundleButton from '\.\/DebugBundleButton'/)
  assert.match(workspaceSource, /<DebugBundleButton accessToken=\{accessToken\} caseId=\{data\?\.case_id\} run=\{run\}\/>/)
  assert.equal((workspaceSource.match(/<DebugBundleButton /g) || []).length, 1)
  assert.match(buttonSource, /Download Debug Bundle/)
})

test('debug bundle is gated to terminal runs and reports loading and missing evidence', () => {
  assert.match(buttonSource, /TERMINAL = new Set/)
  assert.match(buttonSource, /TERMINAL\.has\(String\(run\?\.status/)
  assert.match(buttonSource, /Collecting debug bundle…/)
  assert.match(buttonSource, /missingEvidenceCount/)
  assert.match(buttonSource, /manifest\.json/)
  assert.match(buttonSource, /aria-busy/)
})
