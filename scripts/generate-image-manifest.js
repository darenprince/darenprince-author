#!/usr/bin/env node
import { readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const assetsDir = path.join(root, 'assets');
const exts = new Set(['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp']);

function walk(dir, list = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, list);
    } else if (exts.has(path.extname(entry.name).toLowerCase())) {
      list.push(path.relative(root, full).replace(/\\/g, '/'));
    }
  }
  return list;
}

const images = walk(assetsDir);
writeFileSync(path.join(assetsDir, 'image-manifest.json'), JSON.stringify(images, null, 2));
console.log(`Wrote ${images.length} images to assets/image-manifest.json`);
