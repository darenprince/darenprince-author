import { Buffer } from 'buffer';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const iconsDir = path.join(root, 'assets', 'icons');
const payloadPath = path.join(iconsDir, 'icon-data.json');

function parseDataUri(value, name) {
  if (typeof value !== 'string') {
    throw new TypeError(`Icon payload for ${name} must be a string data URI.`);
  }

  if (!value.startsWith('data:')) {
    throw new Error(`Icon payload for ${name} is not a valid data URI.`);
  }

  const commaIndex = value.indexOf(',');
  if (commaIndex === -1) {
    throw new Error(`Icon payload for ${name} is missing a comma separator.`);
  }

  const metadata = value.slice(5, commaIndex);
  const data = value.slice(commaIndex + 1);
  const params = metadata.split(';');
  const mimeType = params[0] || 'application/octet-stream';
  const isBase64 = params.includes('base64');

  if (!data) {
    throw new Error(`Icon payload for ${name} is empty.`);
  }

  if (isBase64) {
    const normalized = data.replace(/\s+/g, '');
    return { mimeType, buffer: Buffer.from(normalized, 'base64') };
  }

  return { mimeType, buffer: Buffer.from(decodeURIComponent(data), 'utf8') };
}

async function main() {
  let payload;
  try {
    const raw = await fs.readFile(payloadPath, 'utf8');
    payload = JSON.parse(raw);
  } catch (error) {
    console.error('[apple-assets] Unable to read payload file:', error);
    process.exitCode = 1;
    return;
  }

  await fs.mkdir(iconsDir, { recursive: true });
  const entries = Object.entries(payload);

  await Promise.all(
    entries.map(async ([name, dataUri]) => {
      const { buffer } = parseDataUri(dataUri, name);
      const target = path.join(iconsDir, name);
      await fs.writeFile(target, buffer);
    }),
  );

  console.log(`[apple-assets] Materialized ${entries.length} Apple icon files from icon-data.json.`);
}

main().catch((error) => {
  console.error('[apple-assets] Failed to materialize icons:', error);
  process.exitCode = 1;
});
