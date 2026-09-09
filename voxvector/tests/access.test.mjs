import test from 'node:test'
import assert from 'node:assert/strict'

import { getVoxVectorRole, isAdmin, isApprovedUser, isDeveloper, roleAllowed, routeForVoxVectorRole } from '../src/lib/access.js'

const userWith = (appMetadata = {}, userMetadata = {}) => ({ app_metadata: appMetadata, user_metadata: userMetadata })

test('trusted app metadata routes each supported VoxVector role', () => {
  const developer = userWith({ voxvector_role: 'developer' })
  const admin = userWith({ role: 'admin' })
  const user = userWith({ voxvector_role: 'user' })

  assert.equal(getVoxVectorRole(developer), 'developer')
  assert.equal(routeForVoxVectorRole(developer), '/voxvector/developer')
  assert.equal(isDeveloper(developer), true)
  assert.equal(isAdmin(developer), false)

  assert.equal(getVoxVectorRole(admin), 'admin')
  assert.equal(routeForVoxVectorRole(admin), '/voxvector/developer')
  assert.equal(isDeveloper(admin), true)
  assert.equal(isAdmin(admin), true)

  assert.equal(getVoxVectorRole(user), 'user')
  assert.equal(routeForVoxVectorRole(user), '/voxvector/app')
  assert.equal(isApprovedUser(user), true)
})

test('unknown or missing roles route to login and fail protected-role checks', () => {
  const unknown = userWith({ voxvector_role: 'viewer' })
  assert.equal(getVoxVectorRole(unknown), null)
  assert.equal(routeForVoxVectorRole(unknown), '/voxvector/login')
  assert.equal(roleAllowed(unknown, ['developer', 'admin']), false)
  assert.equal(roleAllowed(null, ['user']), false)
})

test('user-editable metadata never grants VoxVector authorization', () => {
  const spoofed = userWith({}, { voxvector_role: 'admin', role: 'developer' })
  assert.equal(getVoxVectorRole(spoofed), null)
  assert.equal(isDeveloper(spoofed), false)
  assert.equal(isAdmin(spoofed), false)
})

test('roleAllowed distinguishes user and operator surfaces', () => {
  const developer = userWith({ role: 'developer' })
  const admin = userWith({ role: 'admin' })
  const user = userWith({ role: 'user' })
  assert.equal(roleAllowed(developer, ['developer', 'admin']), true)
  assert.equal(roleAllowed(admin, ['developer', 'admin']), true)
  assert.equal(roleAllowed(user, ['developer', 'admin']), false)
  assert.equal(roleAllowed(user, ['user']), true)
})
