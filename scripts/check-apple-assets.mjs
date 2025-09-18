import { Buffer } from 'buffer';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const iconsDir = path.join(root, 'assets', 'icons');
const payloadPath = path.join(iconsDir, 'icon-data.json');
const generatedDir = path.join(iconsDir, 'generated');

function decodeDataUri(uri) {
  const [header, base64Payload] = uri.split(',', 2);
  if (!header || !base64Payload || !header.startsWith('data:') || !header.endsWith(';base64')) {
    throw new Error('Invalid data URI encountered.');
  }

  const mimeType = header.slice('data:'.length, -';base64'.length);
  const buffer = Buffer.from(base64Payload, 'base64');
  if (!buffer.length) {
    throw new Error('Decoded payload is empty.');
  }

  return { mimeType, buffer };
}

async function readPayload() {
  const raw = await fs.readFile(payloadPath, 'utf8');
  if (!raw.trim()) {
    throw new Error('icon-data.json is empty.');
  }

  const payload = JSON.parse(raw);
  const entries = Object.entries(payload);
  if (!entries.length) {
    throw new Error('icon-data.json contains no assets.');
  }

  return entries;
}

async function ensureGeneratedDir() {
  await fs.mkdir(generatedDir, { recursive: true });
}

async function removeExistingOutputs() {
  await fs.rm(generatedDir, { recursive: true, force: true });
}

async function runMaterializeScript() {
  await ensureGeneratedDir();
  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [path.join(root, 'scripts', 'materialize-apple-assets.mjs')], {
      stdio: 'inherit',
    });

    child.on('error', (error) => {
      reject(error);
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`materialize-apple-assets.mjs exited with status ${code}`));
      }
    });
  });
}

function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

async function ensureAssets(entries) {
  const pngSignature = Buffer.from('89504e470d0a1a0a', 'hex');
  const failures = [];

  for (const [name, dataUri] of entries) {
    try {
      const { mimeType, buffer } = decodeDataUri(dataUri);
      if (mimeType !== 'image/png') {
        failures.push(`${name} does not use a PNG mime type (found ${mimeType}).`);
        continue;
      }

      if (!buffer.subarray(0, pngSignature.length).equals(pngSignature)) {
        failures.push(`${name} is not a valid PNG payload.`);
        continue;
      }

      const materializedPath = path.join(generatedDir, `${name}.png`);
      const fileBuffer = await fs.readFile(materializedPath);
      if (!fileBuffer.equals(buffer)) {
        failures.push(
          `${name} does not match materialized payload checksum (expected ${sha256(buffer)}, got ${sha256(fileBuffer)}).`,
        );
      }
    } catch (error) {
      failures.push(`Unable to validate ${name}: ${(error instanceof Error && error.message) || error}`);
    }
  }

  if (failures.length) {
    const message = failures.map((line) => ` - ${line}`).join('\n');
    throw new Error(`Apple asset verification failed:\n${message}`);
  }
}

async function main() {
  const entries = await readPayload();
  await fs.mkdir(iconsDir, { recursive: true });
  await removeExistingOutputs();
  await runMaterializeScript();
  await ensureAssets(entries);
  console.log(`[apple-assets] Verified ${entries.length} inline Apple icon payloads.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
