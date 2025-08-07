import { describe, it, expect } from 'vitest';
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL ?? process.env.SUPABASE_DATABASE_URL;
const anonKey = process.env.SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // Skip tests when Supabase credentials are not provided
  describe.skip('supabase storage', () => {
    it('skipped because SUPABASE_URL/SUPABASE_DATABASE_URL or SUPABASE_ANON_KEY is missing', () => {
      expect(true).toBe(true);
    });
  });
} else {
  const supabase = createClient(url, anonKey);

  describe('supabase storage', () => {
    it('uploads and retrieves a file from the avatars bucket', async () => {
      const path = `test-${Date.now()}.txt`;
      const content = 'hello world';
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, content, { contentType: 'text/plain', upsert: true });
      expect(uploadError).toBeNull();

      const { data, error: downloadError } = await supabase.storage
        .from('avatars')
        .download(path);
      expect(downloadError).toBeNull();
      const text = await data.text();
      expect(text).toBe(content);
    });

    it('returns a permission error for user-data bucket without auth', async () => {
      const { error } = await supabase.storage
        .from('user-data')
        .upload(`test-${Date.now()}.txt`, 'test', { contentType: 'text/plain', upsert: true });
      expect(error).toBeTruthy();
    });
  });
}
