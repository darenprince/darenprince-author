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
    })
    expect(result.ok).toBe(true)
    expect(result.reason).toBe('dry-run')
    expect(result.commands).toEqual([
      { description: 'Deploy edge function: alpha', args: ['functions', 'deploy', 'alpha'] },
      { description: 'Deploy edge function: beta', args: ['functions', 'deploy', 'beta'] },
    ])
    expect(fakeSpawn).toHaveBeenCalledOnce()
  })
})
