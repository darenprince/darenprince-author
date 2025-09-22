import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { handler } from '../netlify/functions/supabase-config.js'
import {
  SUPABASE_URL_KEYS,
  SUPABASE_ANON_KEYS,
  SUPABASE_SERVICE_ROLE_KEYS,
} from '../supabase/config-keys.js'

const originalEnv = { ...process.env }

const restoreProcessEnv = () => {
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
}

const clearSupabaseEnv = () => {
  const extraKeys = new Set([
    ...SUPABASE_URL_KEYS,
    ...SUPABASE_ANON_KEYS,
    ...SUPABASE_SERVICE_ROLE_KEYS,
  ])
  for (const key of extraKeys) {
    delete process.env[key]
  }
}

const resetNetlifyGlobal = () => {
  if (typeof globalThis !== 'undefined' && 'Netlify' in globalThis) {
    // @ts-expect-error -- cleanup test shim
    delete globalThis.Netlify
  }
}

let infoSpy
let warnSpy

beforeEach(() => {
  restoreProcessEnv()
  clearSupabaseEnv()
  resetNetlifyGlobal()
  infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {})
  warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
})

afterEach(() => {
  infoSpy?.mockRestore()
  warnSpy?.mockRestore()
  resetNetlifyGlobal()
  restoreProcessEnv()
})

describe('netlify/functions/supabase-config', () => {
  it('rejects non-GET methods', async () => {
    const response = await handler({ httpMethod: 'POST' }, {})
    expect(response.statusCode).toBe(405)
    const payload = JSON.parse(response.body)
    expect(payload.message).toBe('Method Not Allowed')
  })

  it('returns configured=false when env vars missing', async () => {
    const response = await handler({ httpMethod: 'GET' }, {})
    expect(response.statusCode).toBe(200)
    const payload = JSON.parse(response.body)
    expect(payload.configured).toBe(false)
    expect(payload.url).toBe('')
    expect(payload.anonKey).toBe('')
    expect(payload.missing).toEqual({ url: true, anonKey: true })
  })

  it('returns Supabase url and anon key when configured', async () => {
    process.env.SUPABASE_DATABASE_URL = 'https://example.supabase.co'
    process.env.SUPABASE_ANON_KEY = 'anon-key'

    const response = await handler({ httpMethod: 'GET' }, {})
    expect(response.statusCode).toBe(200)
    const payload = JSON.parse(response.body)
    expect(payload.configured).toBe(true)
    expect(payload.url).toBe('https://example.supabase.co')
    expect(payload.anonKey).toBe('anon-key')
    expect(payload.key).toBe('anon-key')
    expect(payload.missing).toEqual({ url: false, anonKey: false })
  })

  it('resolves Netlify Supabase integration aliases', async () => {
    process.env.SUPABASE_DB_URL = 'https://alias.supabase.co'
    process.env.SUPABASE_API_KEY = 'alias-anon'

    const response = await handler({ httpMethod: 'GET' }, {})
    expect(response.statusCode).toBe(200)
    const payload = JSON.parse(response.body)
    expect(payload.configured).toBe(true)
    expect(payload.url).toBe('https://alias.supabase.co')
    expect(payload.anonKey).toBe('alias-anon')
  })

  it('returns anon key when only SUPABASE_KEY alias is provided', async () => {
    process.env.SUPABASE_PROJECT_URL = 'https://legacy.supabase.co'
    process.env.SUPABASE_KEY = 'legacy-anon'

    const response = await handler({ httpMethod: 'GET' }, {})
    expect(response.statusCode).toBe(200)
    const payload = JSON.parse(response.body)
    expect(payload.configured).toBe(true)
    expect(payload.url).toBe('https://legacy.supabase.co')
    expect(payload.anonKey).toBe('legacy-anon')
  })

  it('returns credentials supplied via context.env', async () => {
    const context = {
      env: {
        SUPABASE_DATABASE_URL: 'https://context.supabase.co',
        SUPABASE_ANON_KEY: 'context-anon',
      },
    }

    const response = await handler({ httpMethod: 'GET' }, context)
    expect(response.statusCode).toBe(200)

    const payload = JSON.parse(response.body)
    expect(payload.configured).toBe(true)
    expect(payload.url).toBe('https://context.supabase.co')
    expect(payload.anonKey).toBe('context-anon')
    expect(payload.missing).toEqual({ url: false, anonKey: false })
  })

  it('falls back to process.env values when context env is empty', async () => {
    process.env.SUPABASE_DATABASE_URL = 'https://process.supabase.co'
    process.env.SUPABASE_ANON_KEY = 'process-anon'

    const response = await handler({ httpMethod: 'GET' }, { env: {} })
    expect(response.statusCode).toBe(200)

    const payload = JSON.parse(response.body)
    expect(payload.configured).toBe(true)
    expect(payload.url).toBe('https://process.supabase.co')
    expect(payload.anonKey).toBe('process-anon')
  })

  it('reads credentials from Netlify.env.get when provided', async () => {
    const values = new Map([
      ['SUPABASE_DATABASE_URL', 'https://netlify-env.supabase.co'],
      ['SUPABASE_ANON_KEY', 'netlify-env-anon'],
    ])

    // @ts-expect-error -- define Netlify global for tests
    globalThis.Netlify = {
      env: {
        get: (key) => values.get(key),
      },
    }

    const response = await handler({ httpMethod: 'GET' }, {})
    expect(response.statusCode).toBe(200)

    const payload = JSON.parse(response.body)
    expect(payload.configured).toBe(true)
    expect(payload.url).toBe('https://netlify-env.supabase.co')
    expect(payload.anonKey).toBe('netlify-env-anon')
  })

  it('ignores blank values in higher-precedence sources', async () => {
    const context = {
      env: {
        SUPABASE_DATABASE_URL: '   ',
        SUPABASE_ANON_KEY: '',
      },
    }
    process.env.SUPABASE_DATABASE_URL = 'https://fallback.supabase.co'
    process.env.SUPABASE_ANON_KEY = 'fallback-anon'

    const response = await handler({ httpMethod: 'GET' }, context)
    expect(response.statusCode).toBe(200)

    const payload = JSON.parse(response.body)
    expect(payload.configured).toBe(true)
    expect(payload.url).toBe('https://fallback.supabase.co')
    expect(payload.anonKey).toBe('fallback-anon')
  })
})
