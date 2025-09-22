import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest'
import {
  clearSupabaseDiagnostics,
  getSupabaseDiagnostics,
  logSupabaseDiagnosticError,
  logSupabaseDiagnosticInfo,
  logSupabaseDiagnosticWarn,
} from '../supabase/diagnostics.js'

let infoSpy
let warnSpy
let errorSpy

beforeEach(() => {
  clearSupabaseDiagnostics()
  infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {})
  warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
  errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  infoSpy?.mockRestore()
  warnSpy?.mockRestore()
  errorSpy?.mockRestore()
  clearSupabaseDiagnostics()
})

describe('supabase/diagnostics', () => {
  it('records info, warn, and error entries with console output', () => {
    logSupabaseDiagnosticInfo('test-step', 'info message', { detail: 'value' })
    logSupabaseDiagnosticWarn('test-step', 'warn message', { detail: 'warn' })
    logSupabaseDiagnosticError('test-step', 'error message', { detail: 'error' })

    const entries = getSupabaseDiagnostics()
    expect(entries).toHaveLength(3)
    expect(entries[0]).toMatchObject({ level: 'info', step: 'test-step', message: 'info message' })
    expect(entries[1]).toMatchObject({ level: 'warn', step: 'test-step', message: 'warn message' })
    expect(entries[2]).toMatchObject({
      level: 'error',
      step: 'test-step',
      message: 'error message',
    })

    expect(infoSpy).toHaveBeenCalledWith(
      '[Supabase][test-step] info message',
      expect.objectContaining({ detail: 'value' })
    )
    expect(warnSpy).toHaveBeenCalledWith(
      '[Supabase][test-step] warn message',
      expect.objectContaining({ detail: 'warn' })
    )
    expect(errorSpy).toHaveBeenCalledWith(
      '[Supabase][test-step] error message',
      expect.objectContaining({ detail: 'error' })
    )
  })

  it('masks sensitive values in diagnostic details', () => {
    logSupabaseDiagnosticInfo('masking', 'Testing masking', {
      anonKey: 'anon123456789',
      nested: { serviceRoleKey: 'service123456789' },
    })
    const [entry] = getSupabaseDiagnostics()
    expect(entry.detail.anonKey).toMatch(/…/)
    expect(entry.detail.nested.serviceRoleKey).toMatch(/…/)
  })

  it('caps stored entries to 100', () => {
    for (let index = 0; index < 120; index += 1) {
      logSupabaseDiagnosticInfo('overflow', `message-${index}`)
    }
    const entries = getSupabaseDiagnostics()
    expect(entries).toHaveLength(100)
    expect(entries[0].message).toBe('message-20')
    expect(entries.at(-1)?.message).toBe('message-119')
  })
})
