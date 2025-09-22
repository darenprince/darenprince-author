import { readFileSync } from 'node:fs'
import { describe, it, expect, vi } from 'vitest'
import {
  planSupabaseCommands,
  checkSupabaseCli,
  deploySupabase,
} from '../scripts/deploy-supabase.js'

describe('deploy-supabase automation', () => {
  it('plans db push and default functions', () => {
    const plan = planSupabaseCommands({ projectRef: 'abcd1234' })
    expect(plan).toEqual([
      { description: 'Apply database migrations', args: ['db', 'push'] },
      {
        description: 'Deploy edge function: secure-storage',
        args: ['functions', 'deploy', 'secure-storage', '--project-ref', 'abcd1234'],
      },
      {
        description: 'Deploy edge function: admin-users',
        args: ['functions', 'deploy', 'admin-users', '--project-ref', 'abcd1234'],
      },
    ])
  })

  it('detects missing Supabase CLI', () => {
    const fakeSpawn = () => ({ error: { code: 'ENOENT' } })
    const result = checkSupabaseCli(fakeSpawn as any)
    expect(result.ok).toBe(false)
    expect(result.reason).toBe('missing')
  })

  it('aborts deployment when CLI is unavailable', () => {
    const fakeSpawn = vi.fn(() => ({ error: { code: 'ENOENT' } }))
    const result = deploySupabase({ spawn: fakeSpawn as any })
    expect(result.ok).toBe(false)
    expect(result.reason).toBe('cli-missing')
    expect(fakeSpawn).toHaveBeenCalledOnce()
  })

  it('supports dry run execution with custom functions', () => {
    const fakeSpawn = vi.fn(() => ({ status: 0, stdout: 'Supabase CLI 1.0.0' }))
    const result = deploySupabase({
      dryRun: true,
      includeDbPush: false,
      functions: ['alpha', 'beta', 'alpha'],
      spawn: fakeSpawn as any,
      env: {
        SUPABASE_DATABASE_URL: 'https://example.supabase.co',
        SUPABASE_SERVICE_ROLE_KEY: 'service-role-key',
      },
    })
    expect(result.ok).toBe(true)
    expect(result.reason).toBe('dry-run')
    expect(result.commands?.[0]).toEqual({
      description: 'Sync Supabase edge function secrets',
      args: ['secrets', 'set', '--env-file', expect.stringMatching(/supabase\.env$/)],
    })
    expect(result.commands?.slice(1)).toEqual([
      { description: 'Deploy edge function: alpha', args: ['functions', 'deploy', 'alpha'] },
      { description: 'Deploy edge function: beta', args: ['functions', 'deploy', 'beta'] },
    ])
    expect(fakeSpawn).toHaveBeenCalledOnce()
  })

  it('fails when attempting to deploy functions without Supabase secrets', () => {
    const fakeSpawn = vi.fn(() => ({ status: 0, stdout: 'Supabase CLI 1.0.0' }))
    const result = deploySupabase({
      dryRun: true,
      includeDbPush: false,
      functions: ['alpha'],
      spawn: fakeSpawn as any,
      env: {},
    })
    expect(result.ok).toBe(false)
    expect(result.reason).toBe('missing-secrets')
  })

  it('syncs optional Supabase secrets when provided', () => {
    const captured: string[] = []
    const fakeSpawn = vi.fn((command: string, args: string[]) => {
      if (args[0] === '--version') {
        return { status: 0, stdout: 'Supabase CLI 1.0.0' }
      }

      if (args[0] === 'secrets' && args[1] === 'set') {
        const fileFlagIndex = args.indexOf('--env-file')
        const filePath = args[fileFlagIndex + 1]
        const contents = readFileSync(filePath, 'utf8').trim().split('\n')
        captured.push(...contents)
      }

      return { status: 0, stdout: '' }
    })

    const result = deploySupabase({
      includeDbPush: false,
      functions: ['alpha'],
      spawn: fakeSpawn as any,
      env: {
        SUPABASE_DATABASE_URL: 'https://example.supabase.co',
        SUPABASE_SERVICE_ROLE_KEY: 'service-role-key',
        SUPABASE_ANON_KEY: 'anon-key',
        SUPABASE_JWT_SECRET: 'jwt-secret',
      },
    })

    expect(result.ok).toBe(true)
    expect(captured).toContain('SUPABASE_URL=https://example.supabase.co')
    expect(captured).toContain('SUPABASE_SERVICE_ROLE_KEY=service-role-key')
    expect(captured).toContain('SUPABASE_ANON_KEY=anon-key')
    expect(captured).toContain('SUPABASE_JWT_SECRET=jwt-secret')
  })
})
