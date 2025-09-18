import { Buffer } from 'buffer';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const iconsDir = path.join(root, 'assets', 'icons');
const payloadPath = path.join(iconsDir, 'icon-data.json');
const generatedDir = path.join(iconsDir, 'generated');

function decodeDataUri(uri) {
  const [header, base64Payload] = uri.split(',', 2);
  if (!header || !base64Payload || !header.startsWith('data:') || !header.endsWith(';base64')) {
    throw new Error('Invalid data URI.');
  }

  const mimeType = header.slice('data:'.length, -';base64'.length);
  const buffer = Buffer.from(base64Payload, 'base64');
  if (!buffer.length) {
    throw new Error('Decoded payload is empty.');
  }

  return { mimeType, buffer };
}

async function main() {
  let payload;
  try {
    const raw = await fs.readFile(payloadPath, 'utf8');
    payload = JSON.parse(raw);
  } catch (error) {
    console.error('[apple-assets] Unable to read icon-data.json:', error);
    process.exitCode = 1;
    return;
  }

  const entries = Object.entries(payload);
  if (!entries.length) {
    console.error('[apple-assets] icon-data.json does not contain any entries.');
    process.exitCode = 1;
    return;
  }

  await fs.mkdir(iconsDir, { recursive: true });
  await fs.rm(generatedDir, { recursive: true, force: true });
  await fs.mkdir(generatedDir, { recursive: true });

  await Promise.all(
    entries.map(async ([name, dataUri]) => {
      const { mimeType, buffer } = decodeDataUri(dataUri);
      if (mimeType !== 'image/png') {
        throw new Error(`Unsupported MIME type for ${name}: ${mimeType}`);
      }

      const target = path.join(generatedDir, `${name}.png`);
      await fs.writeFile(target, buffer);
    }),
  );

  const relativeDir = path.relative(root, generatedDir) || generatedDir;
  console.log(`[apple-assets] Materialized ${entries.length} inline icons into ${relativeDir}.`);
}

main().catch((error) => {
  console.error('[apple-assets] Failed to materialize icons:', error);
  process.exitCode = 1;
});
