import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const buttonsPath = path.join(root, 'scss', 'components', '_buttons.scss');

const source = readFileSync(buttonsPath, 'utf8');
const mapMatch = source.match(/\$btn-variants:\s*\(([\s\S]*?)\);/);

if (!mapMatch) {
  console.error('Unable to locate the $btn-variants map in scss/components/_buttons.scss');
  process.exitCode = 1;
  process.exit();
}

const mapBody = mapMatch[1];
const variantRegex = /(\w[\w-]*):\s*\(([\s\S]*?)\),?\n(?=\s*[\w-]+:|\s*\))/g;
let match;
const failures = [];

while ((match = variantRegex.exec(mapBody)) !== null) {
  const [, name, config] = match;
  if (!/\btext\s*:/m.test(config)) {
    failures.push(`• Variant "${name}" is missing a text token. Each button variant must explicitly set a readable text color.`);
  }
  if (!/\bbg\s*:/m.test(config)) {
    failures.push(`• Variant "${name}" is missing a background token.`);
  }
}

if (failures.length > 0) {
  console.error('Button token validation failed:');
  for (const failure of failures) {
    console.error(failure);
  }
  process.exitCode = 1;
  process.exit();
}

console.log('Button variant tokens look good.');
