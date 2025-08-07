const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const {
  SUPABASE_DATABASE_URL = '',
  SUPABASE_ANON_KEY = '',
  SUPABASE_SERVICE_ROLE_KEY = '',
} = process.env;

const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET || SUPABASE_SERVICE_ROLE_KEY || '';

const missing = [];
if (!SUPABASE_DATABASE_URL) missing.push('SUPABASE_DATABASE_URL');
if (!SUPABASE_ANON_KEY) missing.push('SUPABASE_ANON_KEY');

if (missing.length) {
  console.error(`Missing required environment variables: ${missing.join(', ')}`);
  process.exit(1);
}

const content = `export const SUPABASE_DATABASE_URL = '${SUPABASE_DATABASE_URL}';\nexport const SUPABASE_ANON_KEY = '${SUPABASE_ANON_KEY}';\nexport const SUPABASE_SERVICE_ROLE_KEY = '${SUPABASE_SERVICE_ROLE_KEY}';\nexport const SUPABASE_JWT_SECRET = '${SUPABASE_JWT_SECRET}';\n`;
const dest = path.join(__dirname, '..', 'js', 'env.js');
fs.writeFileSync(dest, content);
