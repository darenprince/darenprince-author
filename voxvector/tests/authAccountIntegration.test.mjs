import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const apiSource = readFileSync(new URL('../src/lib/api.js', import.meta.url), 'utf8')
const authGateSource = readFileSync(new URL('../src/components/AuthGate.jsx', import.meta.url), 'utf8')
const profileSource = readFileSync(new URL('../src/components/DeveloperProfileEditor.jsx', import.meta.url), 'utf8')
const userWorkspaceSource = readFileSync(new URL('../src/components/UserWorkspace.jsx', import.meta.url), 'utf8')
const developerConsoleSource = readFileSync(new URL('../src/components/DeveloperConsole.jsx', import.meta.url), 'utf8')

test('successful password login starts a nonblocking canonical API wake before role routing state is applied', () => {
  assert.match(apiSource, /export async function wakeApi\(\) \{ return apiRequest\('\/health', \{ cache: 'no-store', keepalive: true \}\) \}/)
  assert.match(authGateSource, /import \{ wakeApi \} from '\.\.\/lib\/api'/)

  const signInStart = authGateSource.indexOf('const signIn = async event =>')
  const signInEnd = authGateSource.indexOf('\n\n  if (!supabaseConfigured)', signInStart)
  const signInSource = authGateSource.slice(signInStart, signInEnd)

  assert.notEqual(signInStart, -1)
  assert.notEqual(signInEnd, -1)
  assert.match(signInSource, /data: authData, error: authError/)
  assert.match(signInSource, /if \(authError\) setError\(authError\.message\)\s+else \{/)
  assert.match(signInSource, /void wakeApi\(\)\.catch\(\(\) => \{\}\)/)
  assert.ok(signInSource.indexOf('void wakeApi()') < signInSource.indexOf('setSession(authData.session)'))
})

test('role redirect is held while explicit login is busy so auth-state callbacks cannot outrun the wake call', () => {
  const redirectStart = authGateSource.indexOf("if (busy || !redirectByRole || status !== 'ready' || !session || !role) return")
  assert.notEqual(redirectStart, -1)
  assert.match(authGateSource, /\[busy, redirectByRole, role, session, status, targetRoute\]/)
})

test('session restoration and auth-state observation do not themselves create API keep-awake traffic', () => {
  const restoreStart = authGateSource.indexOf('useEffect(() => {')
  const restoreEnd = authGateSource.indexOf('\n\n  const role =', restoreStart)
  const restoreSource = authGateSource.slice(restoreStart, restoreEnd)
  assert.notEqual(restoreStart, -1)
  assert.notEqual(restoreEnd, -1)
  assert.doesNotMatch(restoreSource, /wakeApi\(/)
})

test('one self-profile implementation is role-aware for developer, admin, and user accounts', () => {
  assert.match(profileSource, /export function useAccountProfile\(session\)/)
  assert.match(profileSource, /export const useDeveloperProfile = useAccountProfile/)
  assert.match(profileSource, /const trustedRole = getVoxVectorRole\(user\)/)
  assert.match(profileSource, /trustedRole === 'admin' \? 'Admin' : trustedRole === 'user' \? 'User' : 'Developer'/)
  assert.match(profileSource, /<span>Role<\/span><input className="vv-input" value=\{trustedRole\} readOnly/)
  assert.match(profileSource, /supabase\.from\('profiles'\)\.upsert\(payload\)/)
  assert.match(profileSource, /supabase\.auth\.updateUser\(\{ data: \{ full_name: normalized, name: normalized \} \}\)/)
})

test('approved user workspace wires the shared editor and administrator console keeps its self-profile route', () => {
  assert.match(userWorkspaceSource, /useAccountProfile\(session\)/)
  assert.match(userWorkspaceSource, /<AccountProfileEditor session=\{session\} profileQuery=\{profileQuery\} signOut=\{signOut\} embedded\/>/)
  assert.match(developerConsoleSource, /section === 'profile' && <DeveloperProfileEditor session=\{session\} profileQuery=\{profileQuery\} signOut=\{signOut\}/)
  assert.match(developerConsoleSource, /section === 'users' && admin && <AdminUsers/)
})
