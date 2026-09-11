import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const profileSource = readFileSync(new URL('../src/components/DeveloperProfileEditor.jsx', import.meta.url), 'utf8')
const userWorkspaceSource = readFileSync(new URL('../src/components/UserWorkspace.jsx', import.meta.url), 'utf8')
const developerConsoleSource = readFileSync(new URL('../src/components/DeveloperConsole.jsx', import.meta.url), 'utf8')

test('one canonical profile implementation supports developer, admin, and user accounts', () => {
  assert.match(profileSource, /export function useAccountProfile\(session\)/)
  assert.match(profileSource, /export const useDeveloperProfile = useAccountProfile/)
  assert.match(profileSource, /const trustedRole = getVoxVectorRole\(user\)/)
  assert.match(profileSource, /trustedRole === 'admin' \? 'Admin' : trustedRole === 'user' \? 'User' : 'Developer'/)
  assert.match(profileSource, /<span>Role<\/span><input className="vv-input" value=\{trustedRole\} readOnly/)
  assert.match(profileSource, /supabase\.from\('profiles'\)\.upsert\(payload\)/)
  assert.match(profileSource, /supabase\.auth\.updateUser\(\{ data: \{ full_name: normalized, name: normalized \} \}\)/)
})

test('approved user workspace embeds the shared profile editor instead of a duplicate profile implementation', () => {
  assert.match(userWorkspaceSource, /useAccountProfile\(session\)/)
  assert.match(userWorkspaceSource, /<AccountProfileEditor session=\{session\} profileQuery=\{profileQuery\} signOut=\{signOut\} embedded\/>/)
  assert.doesNotMatch(userWorkspaceSource, /UserRound/)
})

test('developer console keeps its existing compatibility import and self-profile route', () => {
  assert.match(developerConsoleSource, /DeveloperProfileEditor, \{ useDeveloperProfile \} from '\.\/DeveloperProfileEditor'/)
  assert.match(developerConsoleSource, /section === 'profile' && <DeveloperProfileEditor/)
  assert.match(developerConsoleSource, /section === 'users' && admin && <AdminUsers/)
})
