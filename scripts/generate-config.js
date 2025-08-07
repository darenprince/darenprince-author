const { writeFileSync } = require('fs');

const url = process.env.SUPABASE_URL || '';
const anon = process.env.SUPABASE_ANON_KEY || '';

const content = `// This file is generated during build from environment variables\nwindow.SUPABASE_URL = '${url}';\nwindow.SUPABASE_ANON_KEY = '${anon}';\n`;

writeFileSync('js/supabase-config.js', content);
