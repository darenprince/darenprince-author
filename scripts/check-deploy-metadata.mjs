#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import { load } from 'cheerio'

const repoRoot = process.cwd()

const pagesToValidate = [
  { file: 'index.html', brandColor: '#456f3a' },
  { file: 'book.html', brandColor: '#456f3a' },
  { file: 'contact.html', brandColor: '#456f3a' },
  { file: 'haley.html', brandColor: '#11162a' },
  { file: 'labs.html', brandColor: '#070b14' },
  { file: 'src/nexuswho/index.html', brandColor: '#456f3a' },
]

const requiredMetaSelectors = [
  'meta[property="og:image"]',
  'meta[name="twitter:image"]',
  'meta[name="theme-color"]',
  'link[rel="icon"]',
  'link[rel="apple-touch-icon"]',
]

const urlToLocalPath = (value) => {
  if (!value) return null
  if (value.startsWith('http://') || value.startsWith('https://')) {
    try {
      const parsed = new URL(value)
      return parsed.pathname
    } catch {
      return null
    }
  }
  if (value.startsWith('/')) return value
  return null
}

const formatFailures = (failures) => failures.map((failure) => `- ${failure}`).join('\n')

const main = async () => {
  const failures = []

  for (const page of pagesToValidate) {
    const fullPath = path.join(repoRoot, page.file)
    const html = await fs.readFile(fullPath, 'utf8')
    const $ = load(html)

    for (const selector of requiredMetaSelectors) {
      if ($(selector).length === 0) {
        failures.push(`${page.file}: missing required "${selector}" tag`)
      }
    }

    const themeColor = $('meta[name="theme-color"]').attr('content')?.toLowerCase()
    if (!themeColor) {
      failures.push(`${page.file}: theme-color tag is present but missing a content value`)
    } else if (themeColor !== page.brandColor.toLowerCase()) {
      failures.push(
        `${page.file}: theme-color expected "${page.brandColor}" but found "${themeColor}"`
      )
    }

    const assetRefs = [
      $('meta[property="og:image"]').attr('content'),
      $('meta[name="twitter:image"]').attr('content'),
      $('link[rel="icon"]').first().attr('href'),
      $('link[rel="apple-touch-icon"]').first().attr('href'),
    ]

    for (const assetRef of assetRefs) {
      const localPathFromRef = urlToLocalPath(assetRef)
      if (!localPathFromRef) continue
      const normalized = localPathFromRef.replace(/^\/+/, '')
      const target = path.join(repoRoot, normalized)
      try {
        await fs.access(target)
      } catch {
        failures.push(`${page.file}: referenced metadata asset does not exist -> ${assetRef}`)
      }
    }
  }

  if (failures.length) {
    console.error('Metadata deployment checks failed:\n' + formatFailures(failures))
    process.exitCode = 1
    return
  }

  console.log(
    `Metadata deployment checks passed for ${pagesToValidate.length} page templates (GitHub Pages ready).`
  )
}

main().catch((error) => {
  console.error('Unable to run metadata deployment checks.', error)
  process.exitCode = 1
})
