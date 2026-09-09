import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const authGateSource = readFileSync(new URL('../src/components/AuthGate.jsx', import.meta.url), 'utf8')

const loginShellStart = authGateSource.indexOf('if (login) {')
const loginShellEnd = authGateSource.indexOf('\n  return <div className="flex min-h-screen', loginShellStart)
const loginShellSource = authGateSource.slice(loginShellStart, loginShellEnd)

test('login shell remains visible if the entrance animation does not settle', () => {
  assert.notEqual(loginShellStart, -1)
  assert.notEqual(loginShellEnd, -1)
  assert.match(loginShellSource, /initial=\{\{ opacity: 1, y: 12 \}\}/)
  assert.match(loginShellSource, /animate=\{\{ opacity: 1, y: 0 \}\}/)
  assert.doesNotMatch(loginShellSource, /initial=\{\{ opacity: 0,/)
})
