import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const statusSource = readFileSync(new URL('../src/components/DeveloperEngineeringStatus.jsx', import.meta.url), 'utf8')
const consoleCss = readFileSync(new URL('../src/components/DeveloperConsole.css', import.meta.url), 'utf8')

test('live engineering status exposes an explicit health-backed API wake control', () => {
  assert.match(statusSource, /const wakeMutation=useMutation\(\{/)
  assert.match(statusSource, /mutationFn:getHealth/)
  assert.match(statusSource, />WAKE API</)
  assert.match(statusSource, /API responded healthy/)
  assert.match(statusSource, /did not report healthy status/)
})

test('collapsed case workflow tracker uses an opaque theme-aware surface', () => {
  assert.match(consoleCss, /background:color-mix\(in srgb,var\(--vv-panel\) 92%,#b98b62 8%\)!important;/)
  assert.doesNotMatch(consoleCss, /background:rgba\(185,139,98,\.14\)!important;/)
})

test('developer drawer suppresses the duplicate account footer presentation', () => {
  assert.match(consoleCss, /nav\[aria-label="Developer Console"\] \+ \.mt-4 \{ display:none; \}/)
})
