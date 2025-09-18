import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { resolveSupabaseConfigSync } from '../supabase/env.js';

const SUPABASE_URL_KEYS = [
  'SUPABASE_DATABASE_URL',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_DATABASE_URL',
];

const SUPABASE_KEY_KEYS = [
  'SUPABASE_SERVICE_ROLE_KEY',
  'SUPABASE_ANON_KEY',
  'SUPABASE_PUBLIC_ANON_KEY',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
];

const originalEnv = { ...process.env };

function resetEnv() {
  for (const key of Object.keys(process.env)) {
    if (!(key in originalEnv)) {
      delete process.env[key];
    }
  }
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
}

function clearSupabaseKeys() {
  for (const key of [...SUPABASE_URL_KEYS, ...SUPABASE_KEY_KEYS]) {
    delete process.env[key];
  }
}

beforeEach(() => {
  resetEnv();
  clearSupabaseKeys();
});

afterEach(() => {
  resetEnv();
});

describe('resolveSupabaseConfigSync', () => {
  it('returns empty strings when env vars are missing', () => {
    const config = resolveSupabaseConfigSync();
    expect(config.url).toBe('');
    expect(config.key).toBe('');
  });

  it('prefers service role keys over anon', () => {
    process.env.SUPABASE_DATABASE_URL = 'https://example.supabase.co';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-key';
    process.env.SUPABASE_ANON_KEY = 'anon-key';

    const config = resolveSupabaseConfigSync();
    expect(config.url).toBe('https://example.supabase.co');
    expect(config.key).toBe('service-key');
  });

  it('falls back to anon key when service role is missing', () => {
    process.env.SUPABASE_DATABASE_URL = 'https://example.supabase.co';
    process.env.SUPABASE_ANON_KEY = 'anon-key';

    const config = resolveSupabaseConfigSync();
    expect(config.key).toBe('anon-key');
  });

  it('supports NEXT_PUBLIC aliases when primary keys are absent', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://alias.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'alias-anon';

    const config = resolveSupabaseConfigSync();
    expect(config.url).toBe('https://alias.supabase.co');
    expect(config.key).toBe('alias-anon');
  });
});
