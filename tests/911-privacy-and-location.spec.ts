import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (file: string) => readFileSync(path.join(root, file), 'utf8')
const entry = read('911.html')
const owner = read('911-owner.html')
const viewer = read('911-share.html')
const api = read('supabase/functions/crown-sos/index.ts')
const migration = read('supabase/migrations/20261016163000_crown_sos_private_emergency_sharing.sql')

describe('Crown SOS authenticated full-information sharing', () => {
  it('keeps the public 911 entry free of embedded emergency profile data', () => {
    expect(entry).toContain('noindex,nofollow,noarchive')
    expect(entry).toContain('Emergency Contact Directory')
    expect(entry).toContain('Historical Central Louisiana directory preserved')
    expect(entry).toContain('renderPublicDirectory')
    expect(entry).not.toContain('64235548')
    expect(entry).toContain('Medical Information')
    expect(entry).toContain("x-share-token")
    expect(entry).not.toMatch(/Haley Holden|215 Dawn Dr|Lori Simmons|64235548/)
    expect(entry).not.toContain('signInWithPassword')
  })

  it('uses Supabase Auth for owner sign-in and provides profile editing and link controls', () => {
    expect(owner).toContain('supabase.auth.signInWithPassword')
    expect(owner).toContain('supabase.auth.signUp')
    expect(owner).toContain("'/profile'")
    expect(owner).toContain("'/shares'")
    expect(owner).toContain('Start Live Location')
    expect(owner).toContain('Import Existing 911 Portal')
    expect(owner).toContain('/profile/import-legacy-preview')
    expect(owner).toContain('Revoke SOS Link')
    expect(owner).toContain('sb_publishable_')
    expect(owner).not.toMatch(/service_role|sb_secret_/i)
  })

  it('renders every saved profile field to a recipient without requiring login', () => {
    expect(viewer).toContain("location.replace('/911.html'+location.hash)")
    expect(entry).toContain("history.replaceState(null,'',location.pathname+location.search)")
    expect(entry).toContain('Emergency Contact Directory')
    expect(entry).toContain('Evidence Uploads &amp; Media')
    expect(entry).toContain('Medical Information')
    expect(viewer).not.toContain('signInWithPassword')
  })

  it('verifies owner JWTs server-side and stores only bearer-token digests', () => {
    expect(api).toContain('auth.getUser(token)')
    expect(api).toContain('/profile/import-legacy-preview')
    expect(api).toContain('requiresOwnerReview: true')
    expect(api).toContain('legacyReviewRequired: true')
    expect(api).toContain('LEGACY IMPORT — REVIEW REQUIRED')
    expect(api).toContain('e3ba6bf5fb3be8e461473281deb4d23615b15207')
    expect(api).toContain('crypto.subtle.digest')
    expect(api).toContain('token_hash')
    expect(api).toContain('revoked_at')
    expect(api).toContain('expires_at')
    expect(api).toContain('x-share-token')
    expect(api).toContain('MAX_SHARE_HOURS = 24')
    expect(api).not.toMatch(/SUPABASE_SERVICE_ROLE_KEY.*(?:const|let).*window/i)
    expect(api).toContain('const user = await requireOwner(req)')
    expect(read('emergency-911/dist/911.js')).not.toContain('64235548')
    expect(read('emergency-911/dist/911.js')).not.toContain('const CODE')
  })

  it('denies direct browser table access and enables row-level security', () => {
    expect(migration).toContain('enable row level security')
    expect(migration).toContain('revoke all on table public.crown_sos_profiles from anon, authenticated')
    expect(migration).toContain('revoke all on table public.crown_sos_shares from anon, authenticated')
    expect(migration).toContain('references auth.users')
  })
})
