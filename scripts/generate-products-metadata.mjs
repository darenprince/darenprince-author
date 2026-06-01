import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const repoRoot = path.resolve(new URL('..', import.meta.url).pathname)
const bibleRoot = path.join(repoRoot, 'docs', 'crownlabsbible')
const dossierRoot = path.join(bibleRoot, '04-product-dossiers')
const dataDir = path.join(repoRoot, 'data')
const assetsDataPath = path.join(repoRoot, 'assets', 'labs-data.json')
const canonicalDataPath = path.join(dataDir, 'products.json')
const crownlabsDataPath = path.join(repoRoot, 'crownlabs', 'assets', 'data.js')

const PRODUCT_OVERRIDES = {
  'crowncode-ai': {
    id: 'crowncode-ai',
    sourcePath: 'docs/crownlabsbible/02-products/crowncode-ai.md',
    detailUrl: 'labs/products/crowncode-ai.html',
    priority: 100,
    categoryLabel:
      'Platform Infrastructure / Applied Intelligence Systems / Shared Crown Labs AI Layer',
    timeToMarket: 'Active platform layer',
    readiness: 74,
  },
}

const READINESS_BY_STATUS = [
  [/production|advanced active/i, 82],
  [/functional|beta/i, 68],
  [/active development/i, 74],
  [/advanced prototype/i, 55],
  [/prototype/i, 42],
]

const readIfExists = async (filePath) => {
  try {
    return await readFile(filePath, 'utf8')
  } catch (error) {
    if (error.code === 'ENOENT') return ''
    throw error
  }
}

const slugToTitle = (slug) =>
  slug
    .split('-')
    .map((part) =>
      part.toLowerCase() === 'ai' ? 'AI' : part.charAt(0).toUpperCase() + part.slice(1)
    )
    .join(' ')

const extractLineValue = (markdown, label) => {
  const match = markdown.match(new RegExp(`^${label}:\\s*(.+)$`, 'im'))
  return match ? match[1].trim() : ''
}

const extractHeading = (markdown) => {
  const match = markdown.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : ''
}

const extractSection = (markdown, heading) => {
  const headingPattern = new RegExp(`^##\\s+${heading}\\s*$`, 'im')
  const match = headingPattern.exec(markdown)
  if (!match) return ''
  const start = match.index + match[0].length
  const next = markdown.slice(start).search(/^##\s+/m)
  const end = next === -1 ? markdown.length : start + next
  return markdown.slice(start, end).trim()
}

const extractAnyHeadingSection = (markdown, heading) => {
  const headingPattern = new RegExp(`^#{1,2}\\s+${heading}\\s*$`, 'im')
  const match = headingPattern.exec(markdown)
  if (!match) return ''
  const start = match.index + match[0].length
  const next = markdown.slice(start).search(/^#{1,2}\s+/m)
  const end = next === -1 ? markdown.length : start + next
  return markdown.slice(start, end).trim()
}

const paragraphsFrom = (section) =>
  section
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .filter((item) => item && !item.startsWith('- '))

const bulletsFrom = (section, max = 5) =>
  [...section.matchAll(/^-\s+(.+)$/gm)].map((match) => match[1].trim()).slice(0, max)

const readinessFromStatus = (status) => {
  const found = READINESS_BY_STATUS.find(([pattern]) => pattern.test(status || ''))
  return found ? found[1] : 50
}

const firstSentence = (text) => {
  const clean = text.replace(/\s+/g, ' ').trim()
  const match = clean.match(/^(.+?[.!?])(?:\s|$)/)
  return match ? match[1] : clean
}

const buildProduct = async ({ slug, overviewPath, sourcePath, priority }) => {
  const overview = await readFile(overviewPath, 'utf8')
  const valuation = await readIfExists(path.join(path.dirname(overviewPath), 'valuation.md'))
  const positioning = await readIfExists(path.join(path.dirname(overviewPath), 'positioning.md'))
  const architecture = await readIfExists(path.join(path.dirname(overviewPath), 'architecture.md'))

  const executive =
    extractSection(overview, 'Executive Summary') ||
    extractAnyHeadingSection(overview, 'Executive Overview')
  const capabilities =
    extractSection(overview, 'Core Capabilities') ||
    extractSection(architecture, 'Core Capabilities')
  const notSection = extractSection(overview, 'Functional Positioning')
  const paragraphs = paragraphsFrom(executive)
  const summary = firstSentence(paragraphs[0] || '')
  const status =
    extractLineValue(overview, 'Status') ||
    extractSection(overview, 'Status').split('\n')[0]?.trim() ||
    'Documented'
  const category =
    extractLineValue(overview, 'Category') ||
    extractSection(overview, 'Classification').split('\n')[0]?.trim() ||
    'Crown Labs System'
  const type =
    extractLineValue(overview, 'Type') ||
    extractLineValue(overview, 'Distribution Model') ||
    extractSection(overview, 'Primary Role').split('\n')[0]?.trim() ||
    ''
  const valueLine =
    valuation.match(/\$[0-9][^\n]+/)?.[0]?.trim() || 'See canonical valuation dossier'

  return {
    id: slug,
    slug,
    name: extractHeading(overview) || slugToTitle(slug),
    status,
    category,
    categoryLabel: type || category,
    oneLiner:
      summary ||
      `${extractHeading(overview) || slugToTitle(slug)} is documented in the Crown Labs Bible.`,
    tagline: summary || type || category,
    whatItIs: paragraphs.slice(0, 3),
    bullets: bulletsFrom(executive, 4),
    capabilities: bulletsFrom(capabilities, 8),
    not: bulletsFrom(notSection, 4)
      .filter((item) =>
        /not|replacement|generic|social|casual|novelty|therapy|diagnostic|chatbot/i.test(item)
      )
      .slice(0, 4),
    statusDetail: status,
    nextGate: 'Maintain canonical dossier integrity before public positioning changes.',
    monetization: 'See canonical monetization and licensing dossiers where available.',
    valuationCurrent: valueLine,
    valuationProjected: valueLine,
    readiness: readinessFromStatus(status),
    completion: `${readinessFromStatus(status)}% documentation readiness signal`,
    timeToMarket: /prototype/i.test(status)
      ? 'Requires additional validation before public launch'
      : 'Canonical dossier active',
    projectedRevenue: {
      year1: 'See canonical valuation dossier',
      year2: 'See canonical valuation dossier',
      year3: 'See canonical valuation dossier',
    },
    value: valueLine,
    growthLabel: 'Canonical-docs governed',
    metrics: [
      { label: 'Canonical source', value: sourcePath },
      { label: 'Classification', value: category },
      { label: 'Status', value: status },
    ],
    keywords: [
      slug,
      category,
      status,
      type,
      ...(positioning.match(/^##\s+(.+)$/gm) || []).map((item) => item.replace(/^##\s+/, '')),
    ].filter(Boolean),
    sourcePath,
    canonicalDocsUrl: sourcePath,
    detailUrl: `labs/products/${slug}.html`,
    priority,
  }
}

const build = async () => {
  const products = []
  const entries = await readdir(dossierRoot, { withFileTypes: true })
  for (const entry of entries
    .filter((item) => item.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name))) {
    const overviewPath = path.join(dossierRoot, entry.name, 'overview.md')
    products.push(
      await buildProduct({
        slug: entry.name,
        overviewPath,
        sourcePath: `docs/crownlabsbible/04-product-dossiers/${entry.name}/overview.md`,
        priority: 80 - products.length,
      })
    )
  }

  const crownCodePath = path.join(bibleRoot, '02-products', 'crowncode-ai.md')
  const crownCode = await buildProduct({
    slug: 'crowncode-ai',
    overviewPath: crownCodePath,
    sourcePath: 'docs/crownlabsbible/02-products/crowncode-ai.md',
    priority: PRODUCT_OVERRIDES['crowncode-ai'].priority,
  })
  products.unshift({ ...crownCode, ...PRODUCT_OVERRIDES['crowncode-ai'] })

  const payload = {
    generatedAt: new Date().toISOString(),
    generatedFrom: 'docs/crownlabsbible/',
    authority:
      'Crown Labs product truth is governed by docs/crownlabsbible/. Do not hand-edit product definitions here.',
    productCount: products.length,
    products,
  }

  await mkdir(dataDir, { recursive: true })
  await writeFile(canonicalDataPath, `${JSON.stringify(payload, null, 2)}\n`)
  await writeFile(assetsDataPath, `${JSON.stringify(payload, null, 2)}\n`)
  const crownlabsProducts = products.map((product) => ({
    name: product.name,
    slug: product.slug,
    status: product.status,
    category: product.category,
    summary: product.oneLiner,
    gate: product.nextGate,
    value: product.valuationProjected,
    score: product.readiness,
    sourcePath: product.sourcePath,
    detailUrl: `../labs/products/${product.slug}.html`,
  }))
  const dataModule = `export const philosophy = [
  {
    title: 'Canonical governance',
    highlight: 'Docs first. Metadata second.',
    text: 'Crown Labs product truth is maintained in docs/crownlabsbible/ and delivered through generated metadata.',
  },
  {
    title: 'Public discovery',
    highlight: 'The site introduces; the Bible proves.',
    text: 'Public cards and briefs are discovery layers above preserved product dossiers, architecture, governance, and valuation references.',
  },
  {
    title: 'Portfolio discipline',
    highlight: 'No parallel product inventories.',
    text: 'Products appear publicly only after canonical documentation exists in the Crown Labs Bible.',
  },
]

export const products = ${JSON.stringify(crownlabsProducts, null, 2)}
`
  await writeFile(crownlabsDataPath, dataModule)
  console.log(`Generated ${products.length} Crown Labs products from docs/crownlabsbible/`)
}

build().catch((error) => {
  console.error(error)
  process.exit(1)
})
