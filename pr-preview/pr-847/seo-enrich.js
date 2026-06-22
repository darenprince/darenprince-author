#!/usr/bin/env node
/**
 * # seo-enrich.js
 *
 * Static site SEO enhancer tailored for GitHub Pages builds. The script traverses
 * generated HTML files, injects missing metadata, and produces sitemap/robots
 * artefacts without relying on external services or image generation.
 *
 * ## Responsibilities
 * - Ensure every page has a `<title>`, meta description (~155 characters), and
 *   a canonical `<link>` pointing at `--domain` plus the page path.
 * - Add Open Graph & Twitter tags (without altering existing `og:image` URLs)
 *   so social shares display rich previews.
 * - Generate JSON-LD structured data for the homepage (Organization & WebSite)
 *   and interior pages (Article/BlogPosting plus BreadcrumbList) in an
 *   idempotent way.
 * - Produce `sitemap.xml` and `robots.txt` driven by the canonical URLs; when
 *   `SITE_ENV=preview`, the robots file disallows crawling.
 *
 * ## Why no OG image manipulation?
 * GitHub Pages serves static assets directly, so this tool simply reuses any
 * existing `og:image` tag or an optional `--fallback-og` URL. It never appends
 * CDN transformation parameters (`nf_resize`, etc.) to social images to keep
 * share cards deterministic and cache-friendly.
 *
 * ## Usage
 * ```bash
 * node seo-enrich.js --root dist --domain https://example.com
 * node seo-enrich.js --root dist --domain https://example.com --dry-run
 * node seo-enrich.js --root dist --domain https://example.com --fallback-og /assets/og-default.jpg
 * ```
 *
 * ## Idempotency safeguards
 * - HTML files are backed up once as `<file>.bak` prior to mutation.
 * - JSON-LD snippets are written inside `<script>` tags carrying
 *   `data-generated-by="seo-enrich"` so reruns can cleanly replace them.
 * - Canonical and Open Graph elements are updated in place when they already
 *   exist, preventing duplicates.
 */

import path from 'node:path'
import process from 'node:process'
import { parseArgs } from 'node:util'
import fs from 'fs-extra'
import { globby } from 'globby'
import { load } from 'cheerio'

function getCliOptions(argv) {
  const { values } = parseArgs({
    args: argv,
    options: {
      root: { type: 'string' },
      domain: { type: 'string' },
      'dry-run': { type: 'boolean', default: false },
      'fallback-og': { type: 'string' },
    },
    allowPositionals: false,
  })
  return values
}

function toPosix(value) {
  return value.split(path.sep).join('/')
}

function normaliseWhitespace(value) {
  return value.replace(/\s+/g, ' ').trim()
}

function truncateDescription(value) {
  const trimmed = normaliseWhitespace(value)
  if (trimmed.length <= 155) return trimmed
  return `${trimmed.slice(0, 152).trimEnd()}...`
}

function titleFromFilename(relativePath) {
  const base = path.basename(relativePath, path.extname(relativePath))
  return base
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(' ')
}

function canonicalPathFor(relativePath) {
  const posixPath = `/${toPosix(relativePath)}`.replace(/\/+/g, '/')
  if (posixPath === '/index.html') return '/'
  if (posixPath.endsWith('/index.html')) {
    return posixPath.slice(0, -'/index.html'.length) + '/'
  }
  return posixPath
}

function ensureMeta($, selector, attrs, createTag = () => $('<meta />')) {
  let element = $(selector).first()
  if (!element.length) {
    element = createTag()
    $('head').append(element)
  }
  element.attr(attrs)
  return element
}

function ensureLink($, selector, attrs) {
  let element = $(selector).first()
  if (!element.length) {
    element = $('<link />')
    $('head').append(element)
  }
  element.attr(attrs)
  return element
}

function removeGeneratedJsonLd($) {
  $('script[type="application/ld+json"][data-generated-by="seo-enrich"]').remove()
}

function appendJsonLd($, data) {
  const script = $('<script type="application/ld+json" data-generated-by="seo-enrich"></script>')
  script.text(JSON.stringify(data, null, 2))
  $('head').append('\n')
  $('head').append(script)
}

function hasElement($, selector) {
  return $(selector).length > 0
}

async function createBackupOnce(filePath, dryRun) {
  if (dryRun) return
  const backupPath = `${filePath}.bak`
  if (!(await fs.pathExists(backupPath))) {
    await fs.copy(filePath, backupPath)
  }
}

function extractFirstText($, selector) {
  const text = $(selector).first().text()
  return normaliseWhitespace(text || '')
}

function deriveBreadcrumbs(domain, canonicalPath) {
  if (canonicalPath === '/') return null
  const segments = canonicalPath.replace(/\/$/, '').split('/').filter(Boolean)
  const items = []
  let accum = ''
  segments.forEach((segment, index) => {
    accum += `/${segment}`
    const name = segment
      .split(/[-_]+/)
      .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
      .join(' ')
    const itemUrl = `${domain}${accum}/`
    items.push({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: itemUrl,
    })
  })
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  }
}

async function main() {
  const args = getCliOptions(process.argv.slice(2))
  if (!args.domain) {
    console.error('--domain is required (e.g. https://example.com)')
    process.exit(1)
  }
  const domain = String(args.domain).replace(/\/$/, '')
  const root = path.resolve(process.cwd(), args.root ? String(args.root) : '.')
  const dryRun = Boolean(args['dry-run'])
  const fallbackOg = args['fallback-og'] ? String(args['fallback-og']) : null

  const htmlFiles = await globby(['**/*.html'], { cwd: root, absolute: true })
  const searchExists = await fs.pathExists(path.join(root, 'search'))
  const summary = {
    htmlProcessed: 0,
    titlesEnsured: 0,
    descriptionsEnsured: 0,
    canonicalsEnsured: 0,
    socialUpdated: 0,
    jsonLdInjected: 0,
  }
  const sitemapEntries = []

  for (const filePath of htmlFiles) {
    summary.htmlProcessed += 1
    const relativePath = path.relative(root, filePath)
    const canonicalPath = canonicalPathFor(relativePath)
    const canonicalUrl = `${domain}${canonicalPath}`
    const original = await fs.readFile(filePath, 'utf8')
    const $ = load(original, { decodeEntities: false })

    const head = $('head')
    if (!head.length) {
      $('html').prepend('<head></head>')
    }

    let mutated = false

    const existingTitle = $('head > title').first()
    let titleText = normaliseWhitespace(existingTitle.text() || '')
    if (!titleText) {
      const fallbackTitle = extractFirstText($, 'h1') || titleFromFilename(relativePath)
      titleText = fallbackTitle
      if (!existingTitle.length) {
        $('head').prepend(`<title>${fallbackTitle}</title>`)
      } else {
        existingTitle.text(fallbackTitle)
      }
      summary.titlesEnsured += 1
      mutated = true
    }

    const descriptionMeta = ensureMeta($, 'meta[name="description"]', { name: 'description' })
    let description = descriptionMeta.attr('content')
    if (!description) {
      const fallbackDesc = extractFirstText($, 'p')
      if (fallbackDesc) {
        description = truncateDescription(fallbackDesc)
        descriptionMeta.attr('content', description)
        summary.descriptionsEnsured += 1
        mutated = true
      }
    } else {
      const normalised = truncateDescription(description)
      if (normalised !== description) {
        descriptionMeta.attr('content', normalised)
        description = normalised
        summary.descriptionsEnsured += 1
        mutated = true
      }
    }
    description = descriptionMeta.attr('content') || ''

    const canonicalLink = ensureLink($, 'link[rel="canonical"]', {
      rel: 'canonical',
      href: canonicalUrl,
    })
    if (canonicalLink.attr('href') !== canonicalUrl) {
      canonicalLink.attr('href', canonicalUrl)
      summary.canonicalsEnsured += 1
      mutated = true
    }

    const siteName =
      $('meta[property="og:site_name"]').attr('content') ||
      new URL(domain).hostname.replace(/^www\./, '')
    const authorName = $('meta[name="author"]').attr('content') || 'Daren Prince'
    const ogType = hasElement($, 'article') ? 'article' : 'website'
    ensureMeta($, 'meta[property="og:title"]', { property: 'og:title', content: titleText })
    ensureMeta($, 'meta[property="og:site_name"]', {
      property: 'og:site_name',
      content: siteName,
    })
    ensureMeta($, 'meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    })
    ensureMeta($, 'meta[property="og:type"]', { property: 'og:type', content: ogType })
    ensureMeta($, 'meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })
    ensureMeta($, 'meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary_large_image',
    })
    ensureMeta($, 'meta[name="twitter:title"]', { name: 'twitter:title', content: titleText })
    ensureMeta($, 'meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description,
    })
    ensureMeta($, 'meta[name="author"]', {
      name: 'author',
      content: authorName,
    })
    ensureMeta($, 'meta[name="robots"]', {
      name: 'robots',
      content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    })

    let ogImageMeta = $('meta[property="og:image"]').first()
    if (!ogImageMeta.length && fallbackOg) {
      ogImageMeta = ensureMeta($, 'meta[property="og:image"]', {
        property: 'og:image',
        content: fallbackOg,
      })
    }

    if (ogImageMeta.length) {
      ensureMeta($, 'meta[name="twitter:image"]', {
        name: 'twitter:image',
        content: ogImageMeta.attr('content'),
      })
    }

    summary.socialUpdated += 1

    removeGeneratedJsonLd($)
    const organizationId = `${domain}#organization`
    const websiteId = `${domain}#website`
    const authorId = `${domain}#author`
    const jsonLdSnippets = []

    if (canonicalPath === '/') {
      jsonLdSnippets.push({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': organizationId,
        name: siteName,
        url: domain,
      })
      jsonLdSnippets.push({
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': authorId,
        name: authorName,
        url: domain,
      })
      const website = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': websiteId,
        name: siteName,
        url: domain,
        publisher: { '@id': organizationId },
        author: { '@id': authorId },
        ...(searchExists
          ? {
              potentialAction: {
                '@type': 'SearchAction',
                target: `${domain}/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }
          : {}),
      }
      jsonLdSnippets.push(website)
    } else {
      const isBlogPosting = hasElement($, 'article')
      const structuredType = isBlogPosting ? 'BlogPosting' : 'WebPage'
      const ogImage = ogImageMeta?.attr('content')
      const published =
        $('meta[property="article:published_time"]').attr('content') ||
        $('time[datetime]').first().attr('datetime')
      const modified =
        $('meta[property="article:modified_time"]').attr('content') ||
        $('time[datetime][itemprop="dateModified"]').first().attr('datetime') ||
        published
      const pageSchema = isBlogPosting
        ? {
            '@context': 'https://schema.org',
            '@type': structuredType,
            headline: titleText,
            description,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': canonicalUrl,
            },
            publisher: { '@id': organizationId },
            author: { '@id': authorId },
          }
        : {
            '@context': 'https://schema.org',
            '@type': structuredType,
            name: titleText,
            description,
            url: canonicalUrl,
            isPartOf: { '@id': websiteId },
            publisher: { '@id': organizationId },
            author: { '@id': authorId },
          }
      if (published) pageSchema.datePublished = published
      if (modified) pageSchema.dateModified = modified
      if (ogImage) pageSchema.image = ogImage
      jsonLdSnippets.push(pageSchema)

      const breadcrumbs = deriveBreadcrumbs(domain, canonicalPath)
      if (breadcrumbs) {
        jsonLdSnippets.push(breadcrumbs)
      }
    }

    jsonLdSnippets.forEach((snippet) => appendJsonLd($, snippet))
    if (jsonLdSnippets.length) {
      summary.jsonLdInjected += 1
      mutated = true
    }

    sitemapEntries.push({
      loc: canonicalUrl,
      lastmod: (await fs.stat(filePath)).mtime.toISOString(),
    })

    if (mutated) {
      await createBackupOnce(filePath, dryRun)
      if (!dryRun) {
        await fs.writeFile(filePath, $.html())
      }
    }
  }

  const sitemapXml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    sitemapEntries
      .map(
        (entry) =>
          `  <url>\n    <loc>${entry.loc}</loc>\n    <lastmod>${entry.lastmod}</lastmod>\n  </url>`
      )
      .join('\n') +
    '\n</urlset>\n'

  const robotsLines = ['User-agent: *']
  if (process.env.SITE_ENV === 'preview') {
    robotsLines.push('Disallow: /')
  } else {
    robotsLines.push('Disallow:')
  }
  robotsLines.push('', `Sitemap: ${domain}/sitemap.xml`, '')
  const robotsTxt = robotsLines.join('\n')

  if (!dryRun) {
    await fs.writeFile(path.join(root, 'sitemap.xml'), sitemapXml)
    await fs.writeFile(path.join(root, 'robots.txt'), robotsTxt)
  }

  console.log('\nSEO enrichment summary')
  console.table([
    { Metric: 'HTML processed', Total: summary.htmlProcessed },
    { Metric: 'Titles ensured', Total: summary.titlesEnsured },
    { Metric: 'Descriptions ensured/normalized', Total: summary.descriptionsEnsured },
    { Metric: 'Canonicals ensured', Total: summary.canonicalsEnsured },
    { Metric: 'Social metadata updated', Total: summary.socialUpdated },
    { Metric: 'JSON-LD injections', Total: summary.jsonLdInjected },
  ])

  process.exit(0)
}

main().catch((error) => {
  console.error('seo-enrich.js failed:', error)
  process.exit(1)
})
