const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const token = event.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return { statusCode: 401, body: 'Missing auth token' };
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) {
    return { statusCode: 401, body: 'Unauthorized' };
  }

  // Example storage write
  const body = JSON.parse(event.body || '{}');
  const { path, content } = body;
  const { error: uploadError } = await supabase.storage
    .from('user-data')
    .upload(`${user.id}/${path}`, Buffer.from(content, 'base64'), { upsert: true });

  if (uploadError) {
    return { statusCode: 400, body: uploadError.message };
  }

  return { statusCode: 200, body: 'OK' };
};
