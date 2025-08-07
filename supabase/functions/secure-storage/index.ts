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

  // Placeholder for storage write logic
  return new Response(JSON.stringify({ message: 'Authorized' }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
