import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { load } from 'cheerio'
import { describe, expect, it } from 'vitest'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(currentDir, '..')
const html = readFileSync(path.join(repoRoot, '911.html'), 'utf8')
const locationScript = readFileSync(path.join(repoRoot, 'emergency-911/live-location.js'), 'utf8')
const $ = load(html)

describe('911 portal privacy and location behavior', () => {
  it('asks search engines not to index the emergency page', () => {
    expect($('meta[name="robots"]').attr('content')).toContain('noindex')
    expect($('meta[name="robots"]').attr('content')).toContain('noarchive')
  })

  it('does not ship account credential snippets or stored passwords', () => {
    expect($('.credential-snippets, .credential-snippet').length).toBe(0)
    expect($('#trackers').text()).toContain('Never share your Apple ID password')
    expect($('#trackers').text()).not.toMatch(/Apple ID credentials|Copy password/i)
  })

  it('does not publish stale device identifiers or network names', () => {
    expect(html).not.toMatch(/\b\d{18,}\b/)
    expect(html).not.toMatch(/Familywifi|Google Fi|Apple iPhone 16 Pro Max/)
    expect($('#device-status-title').text()).toContain('Device Information')
    expect($('#sos-intel').text()).toContain('not verified')
  })

  it('does not present unverified medical details as confirmed facts', () => {
    expect($('#medical').text()).toContain('Not verified')
    expect($('#if-unresponsive').text()).toContain('Do not give food or drink by mouth')
    expect($('#if-unresponsive').text()).not.toContain('Give glucagon shot or any sugary food or drink')
  })

  it('includes user-controlled GPS and sharing controls with privacy copy', () => {
    expect($('[data-location-refresh]').length).toBe(1)
    expect($('[data-location-start]').length).toBe(1)
    expect($('[data-location-stop]').length).toBe(1)
    expect($('[data-location-copy]').length).toBe(1)
    expect($('[data-location-share]').length).toBe(1)
    expect($('[data-live-location]').text()).toContain('not automatically transmitted')
    expect($('[data-live-location]').text()).toContain('not continuous tracking')
  })

  it('keeps browser GPS local and passes JavaScript syntax validation', () => {
    expect(locationScript).not.toMatch(/\bfetch\s*\(|XMLHttpRequest|WebSocket/)
    expect(() => new Function(locationScript)).not.toThrow()
    expect(locationScript).toContain('navigator.geolocation.watchPosition')
    expect(locationScript).toContain('navigator.geolocation.clearWatch')
  })

  it('labels the client-side access code as non-security', () => {
    expect($('#gate-title').text()).toBe('Incident Code')
    expect($('#gate-subtitle').text()).toContain('not real authentication')
    expect($('#gate-title').text()).not.toContain('Secure Access Required')
  })
})
