const fs = require('fs');
const path = require('path');

const {
  SUPABASE_DATABASE_URL = '',
  SUPABASE_ANON_KEY = '',
  SUPABASE_SERVICE_ROLE_KEY = ''
} = process.env;

if (!SUPABASE_DATABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('Warning: SUPABASE_DATABASE_URL and/or SUPABASE_ANON_KEY are not set.');
}

const content = `window._env_ = {
  SUPABASE_DATABASE_URL: "${SUPABASE_DATABASE_URL}",
  SUPABASE_ANON_KEY: "${SUPABASE_ANON_KEY}",
  SUPABASE_SERVICE_ROLE_KEY: "${SUPABASE_SERVICE_ROLE_KEY}"
};
`;

const destinations = [
  path.join(__dirname, '..', 'js', 'env.js'),
  path.join(__dirname, '..', 'assets', 'js', 'env.js'),
];

for (const dest of destinations) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, content);
  console.log('Environment file generated at', dest);
}
