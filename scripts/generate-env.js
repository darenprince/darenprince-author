const fs = require('fs');
const path = require('path');

const { SUPABASE_URL, SUPABASE_DATABASE_URL, SUPABASE_ANON_KEY } = process.env;

const url = SUPABASE_URL ?? SUPABASE_DATABASE_URL;

if (!url || !SUPABASE_ANON_KEY) {
  throw new Error('SUPABASE_URL or SUPABASE_DATABASE_URL and SUPABASE_ANON_KEY must be set');
}

const content = `export const SUPABASE_URL = '${url}';\nexport const SUPABASE_KEY = '${SUPABASE_ANON_KEY}';\n`;
const dest = path.join(__dirname, '..', 'js', 'env.js');
fs.writeFileSync(dest, content);
