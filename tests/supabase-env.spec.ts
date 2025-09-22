import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { resolveSupabaseConfig, resolveSupabaseConfigSync } from '../supabase/env.js'

const SUPABASE_URL_KEYS = [
  'SUPABASE_DATABASE_URL',
  'SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_DATABASE_URL',
]

const SUPABASE_KEY_KEYS = [
  'SUPABASE_SERVICE_ROLE_KEY',
  'SUPABASE_ANON_KEY',
  'SUPABASE_PUBLIC_ANON_KEY',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'PUBLIC_SUPABASE_PUBLISHABLE_KEY',
  'PUBLIC_SUPABASE_ANON_KEY',
]

const originalEnv = { ...process.env }

function resetEnv() {
  for (const key of Object.keys(process.env)) {
    if (!(key in originalEnv)) {
      delete process.env[key]
    }
  }
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) {
      delete process.env[key]
    } else {
      process.env[key] = value
    }
  }
  if (typeof globalThis !== 'undefined') {
    delete globalThis._env_
    if ('window' in globalThis) {
      // @ts-expect-error -- cleanup test stubs
      delete globalThis.window
    }
    if ('document' in globalThis) {
      // @ts-expect-error -- cleanup test stubs
      delete globalThis.document
    }
  }
}

function clearSupabaseKeys() {
  for (const key of [...SUPABASE_URL_KEYS, ...SUPABASE_KEY_KEYS]) {
    delete process.env[key]
  }
}

let infoSpy
let warnSpy

beforeEach(() => {
  resetEnv()
  clearSupabaseKeys()
  infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {})
  warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
})

afterEach(() => {
  infoSpy?.mockRestore()
  warnSpy?.mockRestore()
  resetEnv()
})

describe('resolveSupabaseConfigSync', () => {
  it('returns empty strings when env vars are missing', () => {
    const config = resolveSupabaseConfigSync()
    expect(config.url).toBe('')
    expect(config.key).toBe('')
  })

  it('prefers service role keys over anon', () => {
    process.env.SUPABASE_DATABASE_URL = 'https://example.supabase.co'
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-key'
    process.env.SUPABASE_ANON_KEY = 'anon-key'

    const config = resolveSupabaseConfigSync()
    expect(config.url).toBe('https://example.supabase.co')
    expect(config.key).toBe('service-key')
  })

  it('falls back to anon key when service role is missing', () => {
    process.env.SUPABASE_DATABASE_URL = 'https://example.supabase.co'
    process.env.SUPABASE_ANON_KEY = 'anon-key'

    const config = resolveSupabaseConfigSync()
    expect(config.key).toBe('anon-key')
  })

  it('supports NEXT_PUBLIC aliases when primary keys are absent', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://alias.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'alias-anon'

    const config = resolveSupabaseConfigSync()
    expect(config.url).toBe('https://alias.supabase.co')
    expect(config.key).toBe('alias-anon')
  })

  it('falls back to SUPABASE_URL when SUPABASE_DATABASE_URL is missing', () => {
    process.env.SUPABASE_URL = 'https://url-only.supabase.co'
    process.env.SUPABASE_ANON_KEY = 'anon-key'

    const config = resolveSupabaseConfigSync()
    expect(config.url).toBe('https://url-only.supabase.co')
    expect(config.key).toBe('anon-key')
  })

  it('reads PUBLIC_SUPABASE_ANON_KEY when anon aliases are provided', () => {
    process.env.SUPABASE_DATABASE_URL = 'https://example.supabase.co'
    process.env.PUBLIC_SUPABASE_ANON_KEY = 'public-anon'

    const config = resolveSupabaseConfigSync()
    expect(config.key).toBe('public-anon')
  })

  it('reads credentials from global runtime overrides', () => {
    globalThis._env_ = {
      SUPABASE_DATABASE_URL: 'https://runtime.supabase.co',
      SUPABASE_ANON_KEY: 'runtime-anon',
    }

    const config = resolveSupabaseConfigSync()
    expect(config.url).toBe('https://runtime.supabase.co')
    expect(config.key).toBe('runtime-anon')
  })
})

describe('resolveSupabaseConfig (async)', () => {
  it('merges browser env module with global overrides', async () => {
    globalThis._env_ = {
      NEXT_PUBLIC_SUPABASE_URL: 'https://global.supabase.co',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: 'global-anon',
    }

    const config = await resolveSupabaseConfig()
    expect(config.url).toBe('https://global.supabase.co')
    expect(config.key).toBe('global-anon')
    expect(infoSpy).toHaveBeenCalledWith(
      'Supabase env.js not found; continuing with runtime overrides'
    )
    expect(warnSpy).not.toHaveBeenCalled()
  })

  it('reads runtime overrides from localStorage when present', async () => {
    const store = new Map<string, string>()
    const storage = {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, value)
        return null
      },
      removeItem: (key: string) => {
        store.delete(key)
      },
      clear: () => {
        store.clear()
      },
      key: (index: number) => Array.from(store.keys())[index] ?? null,
      get length() {
        return store.size
      },
    }

    // @ts-expect-error -- simulate browser window for tests
    globalThis.window = { localStorage: storage }
    // @ts-expect-error -- minimal document stub for browser detection
    globalThis.document = {}

    storage.setItem(
      'supabaseRuntimeConfig',
      JSON.stringify({ url: 'https://runtime.supabase.co', anonKey: 'runtime-anon' })
    )

    const config = await resolveSupabaseConfig()
    expect(config.url).toBe('https://runtime.supabase.co')
    expect(config.key).toBe('runtime-anon')
  })
})
