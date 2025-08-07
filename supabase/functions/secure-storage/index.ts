import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { serve } from 'https://deno.land/std@0.182.0/http/server.ts';

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const authHeader = req.headers.get('Authorization') ?? '';
  const token = authHeader.replace('Bearer ', '');
  const { data: { user } } = await supabase.auth.getUser(token);
  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get('file');
  const bucket = formData.get('bucket');

  if (!file || !(file instanceof File) || !bucket || typeof bucket !== 'string') {
    return new Response(JSON.stringify({ error: 'Missing file or bucket' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { data, error } = await supabase.storage.from(bucket).upload(
    `${user.id}/${file.name}`,
    file.stream(),
    { contentType: file.type },
  );

  if (error || !data) {
    return new Response(JSON.stringify({ error: error?.message ?? 'Upload failed' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ path: data.path }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
