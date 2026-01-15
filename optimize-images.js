#!/usr/bin/env node
/*
 * # optimize-images.js
 *
 * Post-build utility for static deployments that rewrites inline image tags
 * so that press/download assets are copied to a dedicated `/downloads/` folder
 * while regular site imagery can be optionally optimized through CDN resize
 * parameters (for hosts that support them).
 *
 * ## Responsibilities
 * - Traverse every HTML document under the provided `--root` directory.
 * - Detect `<img>` tags that should be treated as downloadable assets versus
 *   site imagery (based on DOM attributes and filesystem globs).
 * - Copy downloadable assets into `/downloads/` (preserving directory
 *   structure) and rewrite the `src` attribute to point at that location.
 * - Augment site imagery with `nf_resize` query parameters (for compatible CDNs), responsive
 *   `srcset`/`sizes` attributes, and `loading="lazy"` to encourage fast page
 *   loads.
 * - Leave SVGs, data URLs, and remote (http/https) sources untouched, and skip
 *   any `<img>` tag that is already optimized or already points at
 *   `/downloads/` so the script is safe to rerun.
 *
 * ## How it works
 * 1. Uses a recursive HTML glob (e.g. double-star paths ending in .html) via `globby`.
 * 2. Parses each file with `cheerio`, which gives a server-friendly DOM API.
 * 3. Applies detection logic powered by `micromatch` and DOM traversal to
 *    categorise images.
 * 4. Uses `fs-extra` for idempotent backups (`.bak`), file copies, and writes.
 * 5. Appends parameters of the form
 *    `?nf_resize=<mode>&w=<width>&q=<quality>` which instruct compatible CDNs to
 *    deliver right-sized, compressed assets on the fly. The defaults target an
 *    800px hero image with 80% quality, but widths/quality can be overridden
 *    via `--config`.
 *
 * ## Usage
 * ```bash
 * node optimize-images.js --root dist
 * node optimize-images.js --root dist --dry-run
 * node optimize-images.js --root dist --config scripts/image-config.json
 * ```
 *
 * The optional `--config` JSON file may provide:
 * ```json
 * {
 *   "downloadable_globs": ["/press/**", "/downloads/**"],
 *   "optimize_globs": ["/assets/images/**"],
 *   "optimize_extensions": [".jpg", ".jpeg", ".png", ".webp"],
 *   "optimize": {
 *     "widths": [400, 800, 1200],
 *     "quality": 80,
 *     "mode": "fit"
 *   }
 * }
 * ```
 *
 * ## Idempotency guarantees
 * - HTML files are backed up once as `<file>.bak` before the first mutation.
 * - `<img>` tags whose `src` already begins with `/downloads/` or already
 *   contains an `nf_resize` parameter are skipped.
 * - Re-running the script will detect previously injected `srcset`/`sizes`
 *   values and keep them consistent.
 *
 * ## Safety
 * - Copy operations and HTML writes are skipped entirely when `--dry-run` is
 *   supplied.
 * - Paths are normalised to avoid escaping the project root.
 */

import path from 'node:path'
import process from 'node:process'
import { parseArgs } from 'node:util'
import fs from 'fs-extra'
import { globby } from 'globby'
import { load } from 'cheerio'
import micromatch from 'micromatch'

const DEFAULT_CONFIG = {
  downloadable_globs: ['/press/**', '/downloads/**', '/media/**'],
  optimize_globs: ['/assets/images/**', '/public/images/**'],
  optimize_extensions: ['.jpg', '.jpeg', '.png', '.webp', '.gif'],
  optimize: {
    widths: [400, 800, 1200],
    quality: 80,
    mode: 'fit',
  },
  leave_svg_unoptimized: true,
}

function getCliOptions(argv) {
  const { values } = parseArgs({
    args: argv,
    options: {
      root: { type: 'string' },
      config: { type: 'string' },
      'dry-run': { type: 'boolean', default: false },
    },
    allowPositionals: false,
  })
  return values
}

function normaliseConfig(configFromFile) {
  const cfg = configFromFile ?? {}
  return {
    downloadable_globs: Array.isArray(cfg.downloadable_globs)
      ? cfg.downloadable_globs
      : DEFAULT_CONFIG.downloadable_globs,
    optimize_globs: Array.isArray(cfg.optimize_globs)
      ? cfg.optimize_globs
      : DEFAULT_CONFIG.optimize_globs,
    optimize_extensions: Array.isArray(cfg.optimize_extensions)
      ? cfg.optimize_extensions.map((ext) => ext.toLowerCase())
      : DEFAULT_CONFIG.optimize_extensions,
    optimize: {
      widths: Array.isArray(cfg.optimize?.widths)
        ? cfg.optimize.widths
        : DEFAULT_CONFIG.optimize.widths,
      quality: Number.isFinite(cfg.optimize?.quality)
        ? Number(cfg.optimize.quality)
        : DEFAULT_CONFIG.optimize.quality,
      mode:
        typeof cfg.optimize?.mode === 'string' ? cfg.optimize.mode : DEFAULT_CONFIG.optimize.mode,
    },
    leave_svg_unoptimized: cfg.leave_svg_unoptimized ?? DEFAULT_CONFIG.leave_svg_unoptimized,
  }
}

function splitUrl(rawSrc) {
  try {
    const url = new URL(rawSrc, 'https://placeholder.local')
    const query = url.search.replace(/^\?/, '')
    const hash = url.hash
    const pathLength = rawSrc.length - (query ? query.length + 1 : 0) - hash.length
    const pathPart = rawSrc.slice(0, pathLength)
    return { path: pathPart, query, hash }
  } catch {
    return { path: rawSrc, query: '', hash: '' }
  }
}

function combineQuery(existing, addition) {
  const cleanedExisting = existing.replace(/^\?/, '').trim()
  const cleanedAddition = addition.replace(/^\?/, '').trim()
  if (!cleanedExisting && !cleanedAddition) {
    return ''
  }
  if (!cleanedExisting) {
    return cleanedAddition
  }
  if (!cleanedAddition) {
    return cleanedExisting
  }
  const parts = cleanedExisting.split('&').filter(Boolean)
  if (!parts.includes(cleanedAddition)) {
    parts.push(cleanedAddition)
  }
  return parts.join('&')
}

function isRemoteOrData(src) {
  return /^https?:\/\//i.test(src) || src.startsWith('data:')
}

function toPosix(value) {
  return value.split(path.sep).join('/')
}

function resolveFsPath(root, htmlFile, assetPath) {
  const normalised = assetPath.startsWith('/')
    ? path.join(root, assetPath)
    : path.resolve(path.dirname(htmlFile), assetPath)
  return normalised
}

function ensureWithinRoot(root, filePath) {
  const relative = path.relative(root, filePath)
  if (relative && (relative.startsWith('..') || path.isAbsolute(relative))) {
    return null
  }
  return path.join(root, relative)
}

function deriveWebPath(root, fsPath, originalPath) {
  if (!fsPath) return null
  const safePath = ensureWithinRoot(root, fsPath)
  if (!safePath) return null
  const rel = toPosix(path.relative(root, safePath))
  if (!rel || rel.startsWith('..')) {
    return originalPath.startsWith('/') ? originalPath : `/${originalPath}`
  }
  return `/${rel}`.replace(/\/+/g, '/')
}

async function createBackupOnce(filePath, dryRun) {
  if (dryRun) return
  const backupPath = `${filePath}.bak`
  const exists = await fs.pathExists(backupPath)
  if (!exists) {
    await fs.copy(filePath, backupPath)
  }
}

async function main() {
  const args = getCliOptions(process.argv.slice(2))
  const root = path.resolve(process.cwd(), args.root ? String(args.root) : '.')
  const dryRun = Boolean(args['dry-run'])
  const configPath = args.config ? path.resolve(process.cwd(), String(args.config)) : null
  let configFromFile = null
  if (configPath) {
    try {
      const raw = await fs.readFile(configPath, 'utf8')
      configFromFile = JSON.parse(raw)
    } catch (error) {
      console.error('Failed to read --config file:', error)
      process.exit(1)
    }
  }
  const config = normaliseConfig(configFromFile)

  const htmlFiles = await globby(['**/*.html'], { cwd: root, absolute: true })
  const summary = {
    htmlProcessed: 0,
    downloadsRewritten: 0,
    siteImagesOptimized: 0,
    skippedRemoteOrSvg: 0,
    missingSource: 0,
  }

  for (const filePath of htmlFiles) {
    summary.htmlProcessed += 1
    const original = await fs.readFile(filePath, 'utf8')
    const $ = load(original, { decodeEntities: false })
    let mutated = false

    for (const element of $('img').toArray()) {
      const img = $(element)
      const rawSrc = (img.attr('src') ?? '').trim()
      if (!rawSrc) continue
      if (isRemoteOrData(rawSrc)) {
        summary.skippedRemoteOrSvg += 1
        continue
      }
      if (rawSrc.startsWith('/downloads/')) {
        continue
      }
      if (/nf_resize=/.test(rawSrc)) {
        continue
      }
      const { path: pathPart, query } = splitUrl(rawSrc)
      const extension = path.extname(pathPart).toLowerCase()
      if (extension === '.svg' && config.leave_svg_unoptimized) {
        summary.skippedRemoteOrSvg += 1
        continue
      }

      const hasDownloadAttr = img.is('[data-download]') || img.is('[data-press]')
      const ancestorDownloadAttr = img.parents('[data-download],[data-press]').length > 0

      const fsPath = resolveFsPath(root, filePath, pathPart)
      const safeFsPath = ensureWithinRoot(root, fsPath)
      if (!safeFsPath) {
        summary.missingSource += 1
        continue
      }
      const webPath = deriveWebPath(root, safeFsPath, pathPart)
      if (!webPath) {
        summary.missingSource += 1
        continue
      }

      const isDownloadMatch = micromatch.isMatch(webPath, config.downloadable_globs)
      const treatAsDownload = hasDownloadAttr || ancestorDownloadAttr || isDownloadMatch

      if (treatAsDownload) {
        const relativePath = webPath.replace(/^\//, '')
        const destinationWeb = `/downloads/${relativePath}`.replace(/\/+/g, '/')
        const destinationFs = path.join(root, destinationWeb)
        img.attr('src', destinationWeb)
        img.removeAttr('srcset')
        img.removeAttr('sizes')
        mutated = true
        summary.downloadsRewritten += 1
        if (!dryRun) {
          try {
            await fs.ensureDir(path.dirname(destinationFs))
            await fs.copy(safeFsPath, destinationFs)
          } catch (error) {
            console.warn(`Failed to copy ${safeFsPath} -> ${destinationFs}:`, error.message)
          }
        }
        continue
      }

      const isOptimizableExt = config.optimize_extensions.includes(extension)
      const matchesOptimizeGlob = micromatch.isMatch(webPath, config.optimize_globs)

      if (!isOptimizableExt || !matchesOptimizeGlob) {
        continue
      }

      const widths = config.optimize.widths
      const quality = config.optimize.quality
      const mode = config.optimize.mode
      const baseWidth = widths.includes(800) ? 800 : (widths[0] ?? 800)
      const existingQuery = query

      const baseQuery = combineQuery(existingQuery, `nf_resize=${mode}&w=${baseWidth}&q=${quality}`)
      const newSrc = baseQuery ? `${pathPart}?${baseQuery}` : pathPart
      img.attr('src', newSrc)

      const srcset = widths
        .map((width) => {
          const queryForWidth = combineQuery(
            existingQuery,
            `nf_resize=${mode}&w=${width}&q=${quality}`
          )
          return `${pathPart}?${queryForWidth} ${width}w`
        })
        .join(', ')
      img.attr('srcset', srcset)
      const maxWidth = Math.max(...widths)
      img.attr('sizes', `(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`)
      if (!img.attr('loading')) {
        img.attr('loading', 'lazy')
      }
      mutated = true
      summary.siteImagesOptimized += 1
    }

    if (mutated) {
      await createBackupOnce(filePath, dryRun)
      if (!dryRun) {
        await fs.writeFile(filePath, $.html())
      }
    }
  }

  console.log('\nImage optimization summary')
  console.table([
    { Metric: 'HTML processed', Total: summary.htmlProcessed },
    { Metric: 'Download images rewritten', Total: summary.downloadsRewritten },
    { Metric: 'Site images optimized', Total: summary.siteImagesOptimized },
    { Metric: 'Remote/SVG skipped', Total: summary.skippedRemoteOrSvg },
    { Metric: 'Images with missing sources', Total: summary.missingSource },
  ])

  process.exit(0)
}

main().catch((error) => {
  console.error('optimize-images.js failed:', error)
  process.exit(1)
})
