const fs = require('fs');
const path = require('path');

const {
  SUPABASE_DATABASE_URL,
  SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY = '',
  SUPABASE_JWT_SECRET = '',
} = process.env;

if (!SUPABASE_DATABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('SUPABASE_DATABASE_URL and SUPABASE_ANON_KEY must be set');
}

const content = `export const SUPABASE_DATABASE_URL = '${SUPABASE_DATABASE_URL}';\nexport const SUPABASE_ANON_KEY = '${SUPABASE_ANON_KEY}';\nexport const SUPABASE_SERVICE_ROLE_KEY = '${SUPABASE_SERVICE_ROLE_KEY}';\nexport const SUPABASE_JWT_SECRET = '${SUPABASE_JWT_SECRET}';\n`;
const dest = path.join(__dirname, '..', 'js', 'env.js');
fs.writeFileSync(dest, content);
