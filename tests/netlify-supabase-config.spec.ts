import { beforeEach, afterEach, describe, expect, it } from 'vitest'
import { handler } from '../netlify/functions/supabase-config.js'

const ORIGINAL_ENV = { ...process.env }

const restoreEnv = () => {
  for (const key of Object.keys(process.env)) {
    if (!(key in ORIGINAL_ENV)) {
      delete process.env[key]
    }
  }
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) {
      delete process.env[key]
    } else {
      process.env[key] = value
    }
  }
}

beforeEach(() => {
  restoreEnv()
  delete process.env.SUPABASE_DATABASE_URL
  delete process.env.SUPABASE_URL
  delete process.env.SUPABASE_DB_URL
  delete process.env.SUPABASE_PROJECT_URL
  delete process.env.SUPABASE_REST_URL
  delete process.env.NEXT_PUBLIC_SUPABASE_URL
  delete process.env.NEXT_PUBLIC_SUPABASE_DATABASE_URL
  delete process.env.PUBLIC_SUPABASE_URL
  delete process.env.SUPABASE_ANON_KEY
  delete process.env.SUPABASE_PUBLIC_ANON_KEY
  delete process.env.SUPABASE_PUBLIC_API_KEY
  delete process.env.SUPABASE_API_KEY
  delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  delete process.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY
  delete process.env.PUBLIC_SUPABASE_ANON_KEY
})

afterEach(() => {
  restoreEnv()
})

describe('netlify/functions/supabase-config', () => {
  it('rejects non-GET methods', async () => {
    const response = await handler({ httpMethod: 'POST' })
    expect(response.statusCode).toBe(405)
    const payload = JSON.parse(response.body)
    expect(payload.message).toBe('Method Not Allowed')
  })

  it('returns configured=false when env vars missing', async () => {
    const response = await handler({ httpMethod: 'GET' })
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

    const response = await handler({ httpMethod: 'GET' })
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

    const response = await handler({ httpMethod: 'GET' })
    expect(response.statusCode).toBe(200)
    const payload = JSON.parse(response.body)
    expect(payload.configured).toBe(true)
    expect(payload.url).toBe('https://alias.supabase.co')
    expect(payload.anonKey).toBe('alias-anon')
  })

  it('returns anon key when only SUPABASE_KEY alias is provided', async () => {
    process.env.SUPABASE_PROJECT_URL = 'https://legacy.supabase.co'
    process.env.SUPABASE_KEY = 'legacy-anon'

    const response = await handler({ httpMethod: 'GET' })
    expect(response.statusCode).toBe(200)
    const payload = JSON.parse(response.body)
    expect(payload.configured).toBe(true)
    expect(payload.url).toBe('https://legacy.supabase.co')
    expect(payload.anonKey).toBe('legacy-anon')
  })
})
