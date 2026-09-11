import test from 'node:test'
import assert from 'node:assert/strict'

import {
  getVoxVectorPermissions,
  getVoxVectorRole,
  hasVoxVectorPermission,
  isAdmin,
  isApprovedUser,
  isDeveloper,
  permissionsForRole,
  roleAllowed,
  routeForVoxVectorRole,
  VOXVECTOR_PERMISSION_DEFAULTS,
} from '../src/lib/access.js'

const userWith = (appMetadata = {}, userMetadata = {}) => ({ app_metadata: appMetadata, user_metadata: userMetadata })
const ADMIN_PERMISSIONS = [...VOXVECTOR_PERMISSION_DEFAULTS.admin]
const DEVELOPER_PERMISSIONS = [...VOXVECTOR_PERMISSION_DEFAULTS.developer]
const USER_PERMISSIONS = [...VOXVECTOR_PERMISSION_DEFAULTS.user]

test('canonical role permission defaults stay explicit and stable', () => {
  assert.deepEqual(permissionsForRole('admin'), ['developer.console', 'users.manage', 'cases.manage', 'deploy.manage', 'diagnostics.read'])
  assert.deepEqual(permissionsForRole('developer'), ['developer.console', 'cases.manage', 'deploy.manage', 'diagnostics.read'])
  assert.deepEqual(permissionsForRole('user'), ['user.workspace'])
  assert.deepEqual(permissionsForRole('unknown'), [])
})

test('trusted app metadata routes each supported VoxVector role with required baseline permission', () => {
  const developer = userWith({ voxvector_role: 'developer', voxvector_permissions: DEVELOPER_PERMISSIONS })
  const admin = userWith({ role: 'admin', voxvector_permissions: ADMIN_PERMISSIONS })
  const user = userWith({ voxvector_role: 'user', voxvector_permissions: USER_PERMISSIONS })

  assert.equal(getVoxVectorRole(developer), 'developer')
  assert.equal(routeForVoxVectorRole(developer), '/voxvector/developer')
  assert.equal(isDeveloper(developer), true)
  assert.equal(isAdmin(developer), false)
  assert.equal(roleAllowed(developer, ['developer', 'admin']), true)

  assert.equal(getVoxVectorRole(admin), 'admin')
  assert.equal(routeForVoxVectorRole(admin), '/voxvector/developer')
  assert.equal(isDeveloper(admin), true)
  assert.equal(isAdmin(admin), true)
  assert.equal(roleAllowed(admin, ['developer', 'admin']), true)
  assert.equal(roleAllowed(admin, ['admin'], ['users.manage']), true)
  assert.deepEqual(getVoxVectorPermissions(admin), ADMIN_PERMISSIONS)

  assert.equal(getVoxVectorRole(user), 'user')
  assert.equal(routeForVoxVectorRole(user), '/voxvector/app')
  assert.equal(isApprovedUser(user), true)
  assert.equal(roleAllowed(user, ['user']), true)
})

test('missing permission metadata does not inherit runtime authorization from a role', () => {
  const developer = userWith({ voxvector_role: 'developer' })
  const user = userWith({ voxvector_role: 'user' })
  assert.equal(isDeveloper(developer), true)
  assert.deepEqual(getVoxVectorPermissions(developer), [])
  assert.equal(roleAllowed(developer, ['developer', 'admin']), false)
  assert.equal(roleAllowed(user, ['user']), false)
})

test('permissions are independently enforceable inside an allowed role', () => {
  const adminWithoutUserManagement = userWith({
    role: 'admin',
    voxvector_permissions: ['developer.console', 'cases.manage', 'diagnostics.read'],
  })
  assert.equal(roleAllowed(adminWithoutUserManagement, ['admin']), true)
  assert.equal(hasVoxVectorPermission(adminWithoutUserManagement, 'cases.manage'), true)
  assert.equal(hasVoxVectorPermission(adminWithoutUserManagement, 'users.manage'), false)
  assert.equal(roleAllowed(adminWithoutUserManagement, ['admin'], ['users.manage']), false)
})

test('role-incompatible and unknown permissions are discarded', () => {
  const developer = userWith({
    role: 'developer',
    voxvector_permissions: ['developer.console', 'users.manage', 'made.up.permission'],
  })
  assert.deepEqual(getVoxVectorPermissions(developer), ['developer.console'])
  assert.equal(hasVoxVectorPermission(developer, 'users.manage'), false)
  assert.equal(hasVoxVectorPermission(developer, 'made.up.permission'), false)
})

test('unknown or missing roles route to login and fail protected-role checks', () => {
  const unknown = userWith({ voxvector_role: 'viewer', voxvector_permissions: ADMIN_PERMISSIONS })
  assert.equal(getVoxVectorRole(unknown), null)
  assert.equal(routeForVoxVectorRole(unknown), '/voxvector/login')
  assert.equal(roleAllowed(unknown, ['developer', 'admin']), false)
  assert.equal(roleAllowed(null, ['user']), false)
})

test('user-editable metadata never grants VoxVector role or permission authorization', () => {
  const spoofed = userWith({}, { voxvector_role: 'admin', role: 'developer', voxvector_permissions: ADMIN_PERMISSIONS })
  assert.equal(getVoxVectorRole(spoofed), null)
  assert.deepEqual(getVoxVectorPermissions(spoofed), [])
  assert.equal(isDeveloper(spoofed), false)
  assert.equal(isAdmin(spoofed), false)
  assert.equal(hasVoxVectorPermission(spoofed, 'developer.console'), false)
})

test('roleAllowed distinguishes user and operator surfaces after permission checks', () => {
  const developer = userWith({ role: 'developer', voxvector_permissions: DEVELOPER_PERMISSIONS })
  const admin = userWith({ role: 'admin', voxvector_permissions: ADMIN_PERMISSIONS })
  const user = userWith({ role: 'user', voxvector_permissions: USER_PERMISSIONS })
  assert.equal(roleAllowed(developer, ['developer', 'admin']), true)
  assert.equal(roleAllowed(admin, ['developer', 'admin']), true)
  assert.equal(roleAllowed(user, ['developer', 'admin']), false)
  assert.equal(roleAllowed(user, ['user']), true)
})
