#!/usr/bin/env node
import { readdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const assetsDir = path.join(root, 'assets')
const exts = new Set(['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'])
const ignoreDirs = new Set(['.git', 'node_modules', 'dist', 'build', 'coverage', '.cache'])

const folderLabels = [
  { key: 'assets/images/sitebg', label: 'site background texture' },
  { key: 'assets/images/placeholders', label: 'placeholder image asset' },
  { key: 'assets/images', label: 'core site image asset' },
  { key: 'assets/icons', label: 'icon graphic asset' },
  { key: 'assets/logos', label: 'brand logo asset' },
  { key: 'assets/badges', label: 'retailer badge asset' },
  { key: 'labs/crowncode/images', label: 'CrownCode lab visual' },
  { key: 'labs/assets', label: 'labs promotional visual' },
  { key: 'app icons', label: 'application icon concept' },
  { key: 'Picdetective', label: 'PicDetective app visual' },
  { key: 'emergency-911', label: 'Emergency 911 project visual' },
]

function walk(dir, list = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (ignoreDirs.has(entry.name)) continue
      walk(full, list)
    } else if (exts.has(path.extname(entry.name).toLowerCase())) {
      list.push(path.relative(root, full).replace(/\\/g, '/'))
    }
  }
  return list
}

function titleizeSlug(raw) {
  return raw
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function folderHint(imagePath) {
  const normalized = imagePath.toLowerCase()
  const matched = folderLabels.find(({ key }) => normalized.includes(key))
  return matched ? matched.label : 'site image asset'
}

function describe(imagePath) {
  const ext = path.extname(imagePath).replace('.', '').toUpperCase()
  const name = path.basename(imagePath, path.extname(imagePath))
  const titled = titleizeSlug(name)
  const lower = `${imagePath} ${name}`.toLowerCase()

  let subject = folderHint(imagePath)
  if (lower.includes('hero')) subject = 'hero banner visual'
  else if (lower.includes('logo')) subject = 'brand logo treatment'
  else if (lower.includes('icon')) subject = 'icon mark'
  else if (lower.includes('favicon')) subject = 'favicon variant'
  else if (lower.includes('og')) subject = 'social sharing preview graphic'
  else if (lower.includes('cover') || lower.includes('book'))
    subject = 'book cover or publication visual'
  else if (lower.includes('profile') || lower.includes('daren')) subject = 'profile portrait visual'
  else if (lower.includes('bg') || lower.includes('background'))
    subject = 'background texture visual'

  return `${titled} — ${subject} (${ext}).`
}

const images = walk(root)
  .sort((a, b) => a.localeCompare(b))
  .map((imagePath) => ({
    path: imagePath,
    description: describe(imagePath),
  }))

writeFileSync(path.join(assetsDir, 'image-manifest.json'), JSON.stringify(images, null, 2))
console.log(`Wrote ${images.length} images with descriptions to assets/image-manifest.json`)
