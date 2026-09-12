import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const developerConsole = readFileSync(
  new URL('../src/components/DeveloperConsole.jsx', import.meta.url),
  'utf8',
)

test('Case Workbench receives the upload progress setter', () => {
  assert.match(developerConsole, /setProgress=\{setProgress\}/)
  assert.match(developerConsole, /function CaseWorkbench\(\{[\s\S]*?setProgress/)
})

test('Developer Overview reflects controlled proof and the #970 gate', () => {
  assert.match(developerConsole, /CONTROLLED_PROOF_REVISION/)
  assert.match(developerConsole, /meta="#970 diarization"/)
  assert.doesNotMatch(developerConsole, /meta="Transcription first"/)
  assert.doesNotMatch(developerConsole, /execution ready, unverified/)
})

test('legacy checklist coverage is not presented as release readiness', () => {
  assert.doesNotMatch(developerConsole, /% complete/)
  assert.match(developerConsole, /Legacy implementation coverage only/)
})
