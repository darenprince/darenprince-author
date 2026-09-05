import { useEffect, useState } from 'react'
import { Camera, CheckCircle2, LogOut, Save, Upload, UserRound } from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase, supabaseConfigured } from '../lib/supabase'
import Button from './ui/Button'
import CollapsiblePanel from './ui/CollapsiblePanel'

const AVATAR_BUCKET = 'voxvector-avatars'
const MAX_AVATAR_BYTES = 5 * 1024 * 1024
const AVATAR_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])

async function resolveAvatar(path) {
  const normalized = String(path || '').trim()
  if (!normalized) return ''
  if (/^https?:\/\//i.test(normalized) || normalized.startsWith('data:') || normalized.startsWith('blob:')) return normalized
  const { data, error } = await supabase.storage.from(AVATAR_BUCKET).createSignedUrl(normalized, 60 * 60)
  if (error) throw error
  return data?.signedUrl || ''
}

export function useDeveloperProfile(session) {
  const userId = session?.user?.id || ''
  return useQuery({
    queryKey: ['developer-profile', userId],
    enabled: Boolean(supabaseConfigured && userId),
    staleTime: 60_000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id,email,display_name,avatar_url,created_at,updated_at')
        .eq('id', userId)
        .maybeSingle()
      if (error) throw error
      const row = data || {
        id: userId,
        email: session?.user?.email || '',
        display_name: session?.user?.user_metadata?.full_name || session?.user?.user_metadata?.name || '',
        avatar_url: '',
      }
      let resolved_avatar_url = ''
      try { resolved_avatar_url = await resolveAvatar(row.avatar_url) } catch { resolved_avatar_url = '' }
      return { ...row, resolved_avatar_url }
    },
  })
}

export default function DeveloperProfileEditor({ session, profileQuery, signOut, notify }) {
  const queryClient = useQueryClient()
  const user = session?.user || {}
  const profile = profileQuery?.data || {}
  const metadata = user.user_metadata || {}
  const [displayName, setDisplayName] = useState('')

  useEffect(() => {
    setDisplayName(profile.display_name || metadata.full_name || metadata.name || user.email?.split('@')[0] || '')
  }, [profile.display_name, metadata.full_name, metadata.name, user.email])

  const refresh = () => queryClient.invalidateQueries({ queryKey: ['developer-profile', user.id] })

  const saveProfile = useMutation({
    mutationFn: async () => {
      if (!supabaseConfigured || !supabase || !user.id) throw new Error('Supabase profile services are unavailable.')
      const normalized = displayName.trim()
      if (!normalized) throw new Error('Enter a display name before saving.')
      const payload = {
        id: user.id,
        email: user.email || profile.email || null,
        display_name: normalized,
        avatar_url: profile.avatar_url || null,
        updated_at: new Date().toISOString(),
      }
      const { error } = await supabase.from('profiles').upsert(payload)
      if (error) throw error
      const { error: authError } = await supabase.auth.updateUser({ data: { full_name: normalized, name: normalized } })
      if (authError) throw authError
      return payload
    },
    onSuccess: async () => {
      await refresh()
      notify?.('success', 'Profile Updated', 'Your developer profile was saved.')
    },
    onError: error => notify?.('error', 'Profile Update Failed', error?.message || 'Unable to save the developer profile.'),
  })

  const uploadAvatar = useMutation({
    mutationFn: async file => {
      if (!supabaseConfigured || !supabase || !user.id) throw new Error('Supabase profile services are unavailable.')
      if (!file) throw new Error('Choose a profile image first.')
      if (!AVATAR_TYPES.has(file.type)) throw new Error('Choose a JPG, PNG, or WebP profile image.')
      if (!Number.isFinite(file.size) || file.size <= 0) throw new Error('The selected image is empty.')
      if (file.size > MAX_AVATAR_BYTES) throw new Error('Profile photos must be 5 MB or smaller.')
      const extension = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg'
      const path = `${user.id}/avatar.${extension}`
      const previous = String(profile.avatar_url || '')
      const { error: uploadError } = await supabase.storage.from(AVATAR_BUCKET).upload(path, file, { contentType: file.type, upsert: true, cacheControl: '3600' })
      if (uploadError) throw uploadError
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: user.id,
        email: user.email || profile.email || null,
        display_name: displayName.trim() || profile.display_name || metadata.full_name || metadata.name || user.email?.split('@')[0] || 'Developer',
        avatar_url: path,
        updated_at: new Date().toISOString(),
      })
      if (profileError) throw profileError
      if (previous && previous !== path && !/^https?:\/\//i.test(previous) && previous.startsWith(`${user.id}/`)) {
        await supabase.storage.from(AVATAR_BUCKET).remove([previous]).catch(() => {})
      }
      return path
    },
    onSuccess: async () => {
      await refresh()
      notify?.('success', 'Profile Photo Updated', 'Your new profile photo is now attached to your developer account.')
    },
    onError: error => notify?.('error', 'Photo Upload Failed', error?.message || 'Unable to update the profile photo.'),
  })

  const name = displayName || 'Developer'
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase() || 'D'
  const avatarUrl = profile.resolved_avatar_url || metadata.avatar_url || metadata.picture || ''

  return <div>
    <div className="mb-5"><div className="vv-eyebrow">ACCOUNT</div><h1 className="mt-1 text-2xl font-semibold tracking-tight">Developer Profile</h1></div>
    <CollapsiblePanel title="Profile Details" icon={UserRound} meta={profileQuery?.isFetching ? 'Refreshing…' : 'Supabase profile'}>
      {profileQuery?.isError && <div className="vv-status-row error mb-4"><span>{profileQuery.error?.message || 'Unable to load the developer profile.'}</span></div>}
      <div className="vv-profile-editor">
        <div className="vv-profile-avatar-editor">
          <div className="vv-profile-avatar-preview" aria-label="Current developer profile photo">
            {avatarUrl ? <img src={avatarUrl} alt="" referrerPolicy="no-referrer"/> : <span>{initials}</span>}
          </div>
          <div className="min-w-0">
            <div className="vv-eyebrow">PROFILE PHOTO</div>
            <div className="mt-1 text-sm font-semibold">{avatarUrl ? 'Current photo' : 'No photo uploaded'}</div>
            <p className="vv-copy small">JPG, PNG, or WebP · up to 5 MB · stored in the private VoxVector avatar bucket.</p>
            <label className={`vv-profile-upload-button ${uploadAvatar.isPending ? 'is-disabled' : ''}`}>
              {uploadAvatar.isPending ? <Upload size={15} className="animate-pulse"/> : <Camera size={15}/>} {uploadAvatar.isPending ? 'Uploading…' : avatarUrl ? 'Change photo' : 'Upload photo'}
              <input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploadAvatar.isPending} onChange={event => { const next = event.target.files?.[0]; if (next) uploadAvatar.mutate(next); event.target.value = '' }}/>
            </label>
          </div>
        </div>
        <div className="vv-profile-fields">
          <label><span>Display name</span><input className="vv-input" value={displayName} onChange={event => setDisplayName(event.target.value)} autoComplete="name"/></label>
          <label><span>Email</span><input className="vv-input" value={user.email || profile.email || ''} readOnly aria-readonly="true"/></label>
          <label><span>Developer role</span><input className="vv-input" value={user.app_metadata?.voxvector_role || user.app_metadata?.role || 'developer'} readOnly aria-readonly="true"/></label>
          <label><span>Account ID</span><input className="vv-input vv-profile-id" value={user.id || ''} readOnly aria-readonly="true"/></label>
        </div>
        <div className="vv-profile-actions">
          <Button variant="accent" onClick={() => saveProfile.mutate()} disabled={saveProfile.isPending || !displayName.trim()}><Save size={15}/>{saveProfile.isPending ? 'Saving…' : 'Save Profile'}</Button>
          {saveProfile.isSuccess && <span className="vv-profile-message"><CheckCircle2 size={14}/> Saved</span>}
          <Button variant="secondary" onClick={() => signOut()}><LogOut size={15}/> Sign out</Button>
        </div>
      </div>
    </CollapsiblePanel>
  </div>
}
