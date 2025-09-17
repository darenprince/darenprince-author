import { Buffer } from 'buffer';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const iconsDir = path.join(root, 'assets', 'icons');
const payloadPath = path.join(iconsDir, 'apple-assets.json');

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
  await Promise.all(
    Object.entries(payload).map(async ([name, base64]) => {
      const target = path.join(iconsDir, name);
      const buffer = Buffer.from(base64, 'base64');
      await fs.writeFile(target, buffer);
    }),
  );

  console.log(`[apple-assets] Materialized ${Object.keys(payload).length} Apple icon files.`);
}

main().catch((error) => {
  console.error('[apple-assets] Failed to materialize icons:', error);
  process.exitCode = 1;
});
