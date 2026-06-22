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

function getTags(imagePath) {
  const lower = imagePath.toLowerCase()
  const tags = new Set()

  if (lower.includes('heroposter1')) {
    tags.add('game on')
    tags.add('hero')
    tags.add('book promo')
    tags.add('psychology of real connection')
  }
  if (lower.includes('crownicon')) {
    tags.add('crown labs')
    tags.add('app icon')
    tags.add('favicon')
    tags.add('squircle')
  }
  if (lower.includes('905437ad-6656-4ad8-b5a6-cf08f6199f27')) {
    tags.add('crowncode.ai')
    tags.add('intelligence suite')
    tags.add('official seal')
    tags.add('white logo')
  }
  if (lower.includes('07e3bf89-7e81-46e4-bc13-3e0112a9b922')) {
    tags.add('crowncode.ai')
    tags.add('3d icon')
    tags.add('app listing')
  }
  if (lower.includes('img_6265')) {
    tags.add('3d modal background')
    tags.add('viewer backdrop')
    tags.add('texture')
  }
  if (lower.includes('/assets/images/og-') || lower.includes('/og-image')) {
    tags.add('social sharing')
    tags.add('open graph')
    tags.add('twitter card')
  }
  if (lower.includes('favicon') || lower.includes('/icons/generated')) {
    tags.add('favicon')
  }

  const ext = path.extname(lower).replace('.', '')
  if (ext) tags.add(ext)

  return Array.from(tags)
}

const images = walk(root)
  .sort((a, b) => a.localeCompare(b))
  .map((imagePath) => ({
    path: imagePath,
    description: describe(imagePath),
    tags: getTags(imagePath),
  }))

const payload = {
  generatedAt: new Date().toISOString(),
  imageCount: images.length,
  images,
}

writeFileSync(path.join(assetsDir, 'image-manifest.json'), JSON.stringify(payload, null, 2))
console.log(`Wrote ${images.length} images with descriptions to assets/image-manifest.json`)
