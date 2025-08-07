const fs = require('fs');
const path = require('path');

const { SUPABASE_URL, SUPABASE_ANON_KEY } = process.env;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY must be set');
}

const content = `export const SUPABASE_URL = '${SUPABASE_URL}';\nexport const SUPABASE_KEY = '${SUPABASE_ANON_KEY}';\n`;
const dest = path.join(__dirname, '..', 'js', 'env.js');
fs.writeFileSync(dest, content);
