import { beforeEach, describe, expect, it } from 'vitest'
import liveSharingWorker from '../emergency-911/worker.js'

const ORIGIN = 'https://darenprince.com'
const ID = '123e4567-e89b-12d3-a456-426614174000'
const OWNER = 'owner-token-'.padEnd(64, 'a')
const VIEWER = 'viewer-token-'.padEnd(64, 'b')

function makeEnv() {
  const values = new Map<string, string>()
  return {
    SOS_SESSIONS: {
      get: async (key: string) => values.get(key) ?? null,
      put: async (key: string, value: string) => { values.set(key, value) },
      delete: async (key: string) => { values.delete(key) },
    },
  }
}

function makeRequest(path: string, method = 'GET', body?: unknown, token?: string, origin = ORIGIN) {
  const headers = new Headers({ origin })
  if (body !== undefined) headers.set('content-type', 'application/json')
  if (token) headers.set('authorization', 'Bearer ' + token)
  return new Request('https://worker.test' + path, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  })
}

describe('911 live-sharing Worker', () => {
  let env: ReturnType<typeof makeEnv>

  beforeEach(() => {
    env = makeEnv()
  })

  it('creates a short-lived session and stores only token digests', async () => {
    const response = await liveSharingWorker.fetch(
      makeRequest('/api/sessions', 'POST', { id: ID, ownerToken: OWNER, viewerToken: VIEWER }),
      env as never,
    )
    expect(response.status).toBe(201)
    const body = await response.json()
    expect(body.ttlSeconds).toBe(7200)
    const stored = JSON.parse((await env.SOS_SESSIONS.get('s:' + ID))!)
    expect(stored.ownerHash).not.toBe(OWNER)
    expect(stored.viewerHash).not.toBe(VIEWER)
    expect(stored.location).toBeNull()
  })

  it('allows owner updates and viewer reads but rejects the wrong token', async () => {
    await liveSharingWorker.fetch(
      makeRequest('/api/sessions', 'POST', { id: ID, ownerToken: OWNER, viewerToken: VIEWER }),
      env as never,
    )
    const fix = { latitude: 31.31, longitude: -92.45, accuracy: 12, timestamp: Date.now() }
    const update = await liveSharingWorker.fetch(
      makeRequest('/api/sessions/' + ID + '/location', 'PUT', fix, OWNER),
      env as never,
    )
    expect(update.status).toBe(200)
    const denied = await liveSharingWorker.fetch(
      makeRequest('/api/sessions/' + ID + '/location', 'GET', undefined, OWNER),
      env as never,
    )
    expect(denied.status).toBe(403)
    const view = await liveSharingWorker.fetch(
      makeRequest('/api/sessions/' + ID + '/location', 'GET', undefined, VIEWER),
      env as never,
    )
    expect(view.status).toBe(200)
    expect((await view.json()).location.latitude).toBe(31.31)
  })

  it('rejects invalid coordinates and disallowed origins', async () => {
    await liveSharingWorker.fetch(
      makeRequest('/api/sessions', 'POST', { id: ID, ownerToken: OWNER, viewerToken: VIEWER }),
      env as never,
    )
    const invalid = await liveSharingWorker.fetch(
      makeRequest('/api/sessions/' + ID + '/location', 'PUT', { latitude: 300, longitude: 0, accuracy: 5 }, OWNER),
      env as never,
    )
    expect(invalid.status).toBe(400)
    const blocked = await liveSharingWorker.fetch(
      makeRequest('/api/sessions', 'POST', { id: '123e4567-e89b-12d3-a456-426614174001', ownerToken: OWNER, viewerToken: VIEWER }, undefined, 'https://evil.example'),
      env as never,
    )
    expect(blocked.status).toBe(403)
  })

  it('revokes the share when the owner stops it', async () => {
    await liveSharingWorker.fetch(
      makeRequest('/api/sessions', 'POST', { id: ID, ownerToken: OWNER, viewerToken: VIEWER }),
      env as never,
    )
    const revoke = await liveSharingWorker.fetch(
      makeRequest('/api/sessions/' + ID, 'DELETE', undefined, OWNER),
      env as never,
    )
    expect(revoke.status).toBe(200)
    const view = await liveSharingWorker.fetch(
      makeRequest('/api/sessions/' + ID + '/location', 'GET', undefined, VIEWER),
      env as never,
    )
    expect(view.status).toBe(404)
  })
})
