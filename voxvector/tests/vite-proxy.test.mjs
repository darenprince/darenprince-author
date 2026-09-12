import assert from 'node:assert/strict'
import { createServer as createHttpServer } from 'node:http'
import { once } from 'node:events'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import { createServer, resolveConfig } from 'vite'

test('local API proxy preserves authentication, payloads and upstream failures without changing builds', async () => {
  const upstream = createHttpServer(async (request, response) => {
    if (request.headers.authorization !== 'Bearer local-test-token') {
      response.writeHead(401, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify({ detail: 'Authentication required' }))
      return
    }
    const chunks = []
    for await (const chunk of request) chunks.push(chunk)
    response.writeHead(200, { 'Content-Type': 'application/json', 'X-Request-ID': 'proxy-test' })
    response.end(JSON.stringify({ method: request.method, url: request.url, body: Buffer.concat(chunks).toString('base64') }))
  })
  upstream.listen(0, '127.0.0.1')
  await once(upstream, 'listening')
  const previousTarget = process.env.VITE_VOXVECTOR_API_URL
  process.env.VITE_VOXVECTOR_API_URL = `http://127.0.0.1:${upstream.address().port}`
  let vite
  try {
    const configFile = fileURLToPath(new URL('../vite.config.js', import.meta.url))
    vite = await createServer({ configFile, logLevel: 'silent', server: { host: '127.0.0.1', port: 0, hmr: false } })
    await vite.listen()
    const base = `http://127.0.0.1:${vite.httpServer.address().port}/voxvector-api`
    const denied = await fetch(`${base}/v1/cases`)
    assert.equal(denied.status, 401)
    assert.deepEqual(await denied.json(), { detail: 'Authentication required' })
    const body = Buffer.from([0, 1, 127, 128, 255])
    const accepted = await fetch(`${base}/v1/cases?limit=2`, {
      method: 'POST', headers: { Authorization: 'Bearer local-test-token', 'Content-Type': 'application/octet-stream' }, body
    })
    assert.equal(accepted.status, 200)
    assert.equal(accepted.headers.get('X-Request-ID'), 'proxy-test')
    assert.deepEqual(await accepted.json(), { method: 'POST', url: '/v1/cases?limit=2', body: body.toString('base64') })
    assert.equal(vite.config.define['import.meta.env.VITE_VOXVECTOR_API_URL'], '"/voxvector-api"')
    const production = await resolveConfig({ configFile, logLevel: 'silent' }, 'build')
    assert.equal(production.define['import.meta.env.VITE_VOXVECTOR_API_URL'], undefined)
    assert.equal(production.env.VITE_VOXVECTOR_API_URL, process.env.VITE_VOXVECTOR_API_URL)
  } finally {
    await vite?.close()
    upstream.closeAllConnections()
    await new Promise(resolve => upstream.close(resolve))
    if (previousTarget === undefined) delete process.env.VITE_VOXVECTOR_API_URL
    else process.env.VITE_VOXVECTOR_API_URL = previousTarget
  }
})
