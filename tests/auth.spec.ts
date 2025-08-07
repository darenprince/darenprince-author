import { describe, it, expect } from 'vitest';
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL ?? process.env.SUPABASE_DATABASE_URL;
const anonKey = process.env.SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // Skip tests when Supabase credentials are not provided
  describe.skip('supabase auth', () => {
    it('skipped because SUPABASE_URL/SUPABASE_DATABASE_URL or SUPABASE_ANON_KEY is missing', () => {
      expect(true).toBe(true);
    });
  });
} else {
  const supabase = createClient(url, anonKey);
  const email = `test-${Date.now()}@example.com`;
  const password = 'example-password';

  describe('supabase auth', () => {
    it('signs up a new user', async () => {
      const { data, error } = await supabase.auth.signUp({ email, password });
      expect(error).toBeNull();
      expect(data.user?.email).toBe(email);
    });

    it('signs in the user', async () => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      expect(error).toBeNull();
    });

    it('resends email verification', async () => {
      const { error } = await supabase.auth.resend({ type: 'signup', email });
      expect(error).toBeNull();
    });

    it('requests a password reset', async () => {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      expect(error).toBeNull();
    });
  });
}
