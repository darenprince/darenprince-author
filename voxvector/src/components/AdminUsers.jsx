import { useEffect, useState } from 'react'
import { KeyRound, RefreshCw, Save, Send, Trash2, UserPlus, Users } from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isAdmin, supabase, supabaseConfigured } from '../lib/supabase'
import Button from './ui/Button'
import CollapsiblePanel from './ui/CollapsiblePanel'

const FUNCTION_NAME = 'voxvector-user-admin'
const ROLES = ['user', 'developer', 'admin']
const DEFAULT_PERMISSIONS = {
  admin: ['developer.console', 'users.manage', 'cases.manage', 'deploy.manage', 'diagnostics.read'],
  developer: ['developer.console', 'cases.manage', 'deploy.manage', 'diagnostics.read'],
  user: ['user.workspace'],
}

async function invokeAdmin(body) {
  if (!supabaseConfigured || !supabase) throw new Error('Supabase user administration is unavailable.')
  const { data, error } = await supabase.functions.invoke(FUNCTION_NAME, { body })
  if (error) throw new Error(error.message || 'User administration request failed.')
  if (data?.error) throw new Error(data.error)
  return data || {}
}

const permissionsText = value => Array.isArray(value) ? value.join(', ') : ''
const permissionsFrom = value => [...new Set(String(value || '').split(',').map(item => item.trim()).filter(Boolean))]

export default function AdminUsers({ session, notify }) {
  const queryClient = useQueryClient()
  const admin = isAdmin(session?.user)
  const [selectedId, setSelectedId] = useState('')
  const [createOpen, setCreateOpen] = useState(false)
  const [draft, setDraft] = useState({ email: '', display_name: '', role: 'user', permissions: permissionsText(DEFAULT_PERMISSIONS.user), password: '', invite: true })
  const users = useQuery({
    queryKey: ['admin-users'],
    enabled: admin,
    queryFn: () => invokeAdmin({ action: 'list', page: 1, per_page: 200 }),
    staleTime: 15_000,
  })
  const list = Array.isArray(users.data?.users) ? users.data.users : []
  const selected = list.find(user => user.id === selectedId) || null

  useEffect(() => {
    if (!selectedId && list.length) setSelectedId(list[0].id)
    if (selectedId && !list.some(user => user.id === selectedId)) setSelectedId(list[0]?.id || '')
  }, [list, selectedId])

  const refresh = async () => queryClient.invalidateQueries({ queryKey: ['admin-users'] })

  const createUser = useMutation({
    mutationFn: () => invokeAdmin({
      action: 'create',
      email: draft.email.trim(),
      display_name: draft.display_name.trim(),
      role: draft.role,
      permissions: permissionsFrom(draft.permissions),
      password: draft.invite ? '' : draft.password,
      invite: draft.invite,
    }),
    onSuccess: async data => {
      setCreateOpen(false)
      setDraft({ email: '', display_name: '', role: 'user', permissions: permissionsText(DEFAULT_PERMISSIONS.user), password: '', invite: true })
      await refresh()
      setSelectedId(data?.user?.id || '')
      notify?.('success', 'User Added', draft.invite ? 'The account was created and an invitation was requested.' : 'The account was created with the supplied password.')
    },
    onError: error => notify?.('error', 'User Creation Failed', error?.message || 'Unable to create the account.'),
  })

  if (!admin) return <div className="vv-panel"><div className="vv-status-row error">Admin role required.</div></div>

  return <div>
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><div className="vv-eyebrow">ADMINISTRATION</div><h1 className="mt-1 text-2xl font-semibold tracking-tight">User Management</h1></div><div className="flex flex-wrap gap-2"><Button variant="secondary" onClick={() => users.refetch()} disabled={users.isFetching}><RefreshCw size={14} className={users.isFetching ? 'animate-spin' : ''}/>{users.isFetching ? 'Refreshing…' : 'Refresh'}</Button><Button variant="accent" onClick={() => setCreateOpen(value => !value)}><UserPlus size={15}/>{createOpen ? 'Close Add User' : 'Add User'}</Button></div></div>
    <CollapsiblePanel title="Security Boundary" icon={Users} meta="Supabase Auth · admin only" className="mb-4"><p className="vv-copy">User creation, role changes, password administration, recovery and deletion are executed by a JWT-protected Supabase Edge Function. The service-role credential remains server-side. VoxVector roles are read from trusted application metadata; user-editable profile metadata does not grant access.</p></CollapsiblePanel>
    {createOpen && <section className="vv-panel mb-4"><div className="vv-panel-head"><h2>Add VoxVector User</h2><span>Invite or direct account</span></div><div className="grid gap-4 md:grid-cols-2"><Field label="Email"><input className="vv-input w-full" value={draft.email} onChange={event => setDraft(current => ({ ...current, email: event.target.value }))} type="email" autoComplete="off"/></Field><Field label="Display name"><input className="vv-input w-full" value={draft.display_name} onChange={event => setDraft(current => ({ ...current, display_name: event.target.value }))} autoComplete="off"/></Field><Field label="Role"><select className="vv-input w-full" value={draft.role} onChange={event => { const role = event.target.value; setDraft(current => ({ ...current, role, permissions: permissionsText(DEFAULT_PERMISSIONS[role] || []) })) }}>{ROLES.map(role => <option key={role} value={role}>{role}</option>)}</select></Field><Field label="Permissions"><input className="vv-input w-full" value={draft.permissions} onChange={event => setDraft(current => ({ ...current, permissions: event.target.value }))} placeholder="permission.one, permission.two"/></Field></div><label className="mt-4 flex items-center gap-2 text-sm text-white/60"><input type="checkbox" checked={draft.invite} onChange={event => setDraft(current => ({ ...current, invite: event.target.checked }))}/>Send invitation instead of assigning a password now</label>{!draft.invite && <Field label="Temporary password" className="mt-4"><input className="vv-input w-full" value={draft.password} onChange={event => setDraft(current => ({ ...current, password: event.target.value }))} type="password" autoComplete="new-password"/></Field>}<div className="mt-5"><Button variant="accent" onClick={() => createUser.mutate()} disabled={createUser.isPending || !draft.email.trim()}><UserPlus size={15}/>{createUser.isPending ? 'Creating…' : 'Create User'}</Button></div></section>}
    {users.isPending ? <section className="vv-panel"><p className="vv-copy">Loading Supabase users…</p></section> : users.isError ? <section className="vv-panel"><div className="vv-status-row error"><span>{users.error?.message || 'Unable to load users.'}</span></div></section> : <div className="grid gap-4 lg:grid-cols-[minmax(280px,.8fr)_minmax(0,1.2fr)]"><section className="vv-panel"><div className="vv-panel-head"><h2>Accounts</h2><span>{list.length} user{list.length === 1 ? '' : 's'}</span></div><div className="space-y-1">{list.map(user => <button key={user.id} type="button" className={`vv-status-row w-full text-left ${selectedId === user.id ? 'active' : ''}`} onClick={() => setSelectedId(user.id)}><span className="min-w-0 flex-1"><strong className="block truncate text-sm">{user.display_name || user.email || 'Unnamed account'}</strong><span className="block truncate text-[10px] text-white/40">{user.email}</span></span><span className="shrink-0 text-[10px] uppercase tracking-[.08em] text-white/45">{user.role || 'unassigned'}</span></button>)}</div></section><section className="vv-panel">{selected ? <UserEditor key={selected.id} user={selected} callerId={session?.user?.id} onSaved={refresh} notify={notify}/> : <p className="vv-copy">Select an account to review access and profile settings.</p>}</section></div>}
  </div>
}

function Field({ label, children, className = '' }) {
  return <label className={`block ${className}`}><span className="vv-field-label">{label}</span>{children}</label>
}

function UserEditor({ user, callerId, onSaved, notify }) {
  const [email, setEmail] = useState(user.email || '')
  const [displayName, setDisplayName] = useState(user.display_name || '')
  const [role, setRole] = useState(user.role || 'user')
  const [permissions, setPermissions] = useState(permissionsText(user.permissions || DEFAULT_PERMISSIONS[user.role] || []))
  const [password, setPassword] = useState('')
  const self = callerId === user.id

  const update = useMutation({
    mutationFn: () => invokeAdmin({ action: 'update', user_id: user.id, email: email.trim(), display_name: displayName.trim(), role, permissions: permissionsFrom(permissions), password }),
    onSuccess: async () => { setPassword(''); await onSaved(); notify?.('success', 'User Updated', 'Trusted role, profile and account fields were saved.') },
    onError: error => notify?.('error', 'User Update Failed', error?.message || 'Unable to update the user.'),
  })
  const recovery = useMutation({
    mutationFn: () => invokeAdmin({ action: 'recovery', user_id: user.id }),
    onSuccess: () => notify?.('success', 'Recovery Requested', 'Supabase accepted the password recovery request.'),
    onError: error => notify?.('error', 'Recovery Failed', error?.message || 'Unable to request password recovery.'),
  })
  const remove = useMutation({
    mutationFn: () => invokeAdmin({ action: 'delete', user_id: user.id }),
    onSuccess: async () => { await onSaved(); notify?.('success', 'User Deleted', 'The authentication account was permanently deleted.') },
    onError: error => notify?.('error', 'Delete Failed', error?.message || 'Unable to delete the account.'),
  })

  const requestDelete = () => {
    if (self || remove.isPending) return
    const confirmed = window.confirm(`Delete ${user.email || user.id}?\n\nThis permanently deletes the Supabase Auth user. This cannot be undone.`)
    if (confirmed) remove.mutate()
  }

  return <div><div className="vv-panel-head"><h2>Account Details</h2><span>{self ? 'Current admin' : user.id.slice(0, 8)}</span></div><div className="grid gap-4 md:grid-cols-2"><Field label="Email"><input className="vv-input w-full" value={email} onChange={event => setEmail(event.target.value)} type="email"/></Field><Field label="Display name"><input className="vv-input w-full" value={displayName} onChange={event => setDisplayName(event.target.value)}/></Field><Field label="Role"><select className="vv-input w-full" value={role} onChange={event => { const next = event.target.value; setRole(next); setPermissions(permissionsText(DEFAULT_PERMISSIONS[next] || [])) }} disabled={self}>{ROLES.map(item => <option key={item} value={item}>{item}</option>)}</select></Field><Field label="Permissions"><input className="vv-input w-full" value={permissions} onChange={event => setPermissions(event.target.value)} /></Field><Field label="New password" className="md:col-span-2"><input className="vv-input w-full" value={password} onChange={event => setPassword(event.target.value)} type="password" autoComplete="new-password" placeholder="Leave blank to keep the current password"/></Field></div><div className="mt-5 grid gap-3 text-xs text-white/45 sm:grid-cols-2"><div>Created: {user.created_at ? new Date(user.created_at).toLocaleString() : '—'}</div><div>Last sign in: {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'Never'}</div><div>Confirmed: {user.confirmed_at ? 'Yes' : 'No'}</div><div>Account ID: <span className="font-mono">{user.id}</span></div></div><div className="mt-6 flex flex-wrap gap-2"><Button variant="accent" onClick={() => update.mutate()} disabled={update.isPending}><Save size={15}/>{update.isPending ? 'Saving…' : 'Save Changes'}</Button><Button variant="secondary" onClick={() => recovery.mutate()} disabled={recovery.isPending}><Send size={15}/>{recovery.isPending ? 'Sending…' : 'Send Password Reset'}</Button><Button variant="secondary" className="text-red-200" onClick={requestDelete} disabled={self || remove.isPending}><Trash2 size={15}/>{self ? 'Current Admin' : remove.isPending ? 'Deleting…' : 'Delete User'}</Button></div>{self && <p className="vv-copy mt-4">Self-deletion and removal of your own admin role are blocked by the server-side administration function.</p>}</div>
}
