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
const payloadPath = path.join(iconsDir, 'apple-assets.json');

async function readPayload() {
  const raw = await fs.readFile(payloadPath, 'utf8');
  if (!raw.trim()) {
    throw new Error('apple-assets.json is empty.');
  }

  const payload = JSON.parse(raw);
  const entries = Object.entries(payload);
  if (!entries.length) {
    throw new Error('apple-assets.json contains no assets.');
  }

  return entries;
}

async function runMaterializeScript() {
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

  for (const [name, base64] of entries) {
    const expectedPath = path.join(iconsDir, name);
    const expectedBuffer = Buffer.from(base64, 'base64');

    if (expectedBuffer.length === 0) {
      failures.push(`Payload for ${name} is empty.`);
      continue;
    }

    try {
      const fileBuffer = await fs.readFile(expectedPath);
      if (!fileBuffer.subarray(0, pngSignature.length).equals(pngSignature)) {
        failures.push(`${name} is not a valid PNG.`);
        continue;
      }

      if (!fileBuffer.equals(expectedBuffer)) {
        failures.push(
          `${name} does not match payload checksum (expected ${sha256(expectedBuffer)}, got ${sha256(fileBuffer)}).`,
        );
      }
    } catch (error) {
      failures.push(`Missing icon ${name}: ${(error instanceof Error && error.message) || error}`);
    }
  }

  if (failures.length) {
    const message = failures.map((line) => ` - ${line}`).join('\n');
    throw new Error(`Apple asset verification failed:\n${message}`);
  }
}

async function removeExistingOutputs(entries) {
  await Promise.all(
    entries.map(async ([name]) => {
      try {
        await fs.rm(path.join(iconsDir, name), { force: true });
      } catch (error) {
        // Best effort cleanup; ignore individual failures so the check can surface
        // more meaningful errors when verifying output later.
        console.warn(`Warning: unable to remove ${name}:`, error);
      }
    }),
  );
}

async function main() {
  const entries = await readPayload();
  await fs.mkdir(iconsDir, { recursive: true });
  await removeExistingOutputs(entries);
  await runMaterializeScript();
  await ensureAssets(entries);
  console.log(`[apple-assets] Verified ${entries.length} Apple icon files.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
