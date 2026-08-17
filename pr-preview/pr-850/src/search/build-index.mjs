import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'
import { globSync } from 'glob'
import matter from 'gray-matter'
import { marked } from 'marked'
import * as cheerio from 'cheerio'
import MiniSearch from 'minisearch'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '../../')
const contentDir = path.join(rootDir, 'content')
const pagesDir = path.join(rootDir, 'pages')
const publicDir = path.join(rootDir, 'public/search')

const stopwordsPath = path.join(__dirname, 'stopwords.en.txt')
const synonymsPath = path.join(__dirname, 'synonyms.json')

const stopwords = new Set(
  fs.existsSync(stopwordsPath) ? fs.readFileSync(stopwordsPath, 'utf8').split(/\s+/).filter(Boolean) : []
)
const synonyms = fs.existsSync(synonymsPath) ? JSON.parse(fs.readFileSync(synonymsPath, 'utf8')) : {}

function hash(str) {
  return crypto.createHash('md5').update(str).digest('hex')
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

function stripStopwords(text) {
  return text
    .split(/\s+/)
    .filter((w) => w.length > 1 && !stopwords.has(w.toLowerCase()))
    .join(' ')
}

function extractHtmlData(html) {
  const $ = cheerio.load(html)
  const title = $('title').first().text().trim()
  const description = $('meta[name="description"]').attr('content') || ''
  const headings = $('h1, h2, h3')
    .map((_, el) => $(el).text().trim())
    .get()
    .join(' ')
  const text = $('body').text()

  return { title, description, headings, text }
}

function toStoredContent(text = '') {
  return text.replace(/\s+/g, ' ').trim().slice(0, 400)
}

async function parseMarkdown(file) {
  const src = fs.readFileSync(file, 'utf8')
  const { data, content } = matter(src)
  const html = marked.parse(content)
  const { title, description, headings, text } = extractHtmlData(html)
  const urlSlug = data.slug || slugify(path.basename(file, path.extname(file)))
  const url = `/${urlSlug}/`

  return {
    id: hash(file),
    url,
    title: data.title || title || urlSlug,
    description: data.description || description || '',
    date: data.date || null,
    category: data.category || '',
    tags: data.tags || [],
    headings,
    content: stripStopwords(text.replace(/\s+/g, ' ').trim()),
    storedContent: toStoredContent(text),
  }
}

function toUrlFromRelativeHtml(rel) {
  const normalized = rel.replace(/\\/g, '/')
  if (normalized === 'index.html') return '/'
  if (normalized.endsWith('/index.html')) {
    return `/${normalized.replace(/\/index\.html$/, '/')}`
  }
  if (normalized.endsWith('.html')) {
    return `/${normalized.replace(/\.html$/, '/')}`
  }
  return `/${normalized}`
}

async function parseHtml(file, baseDir) {
  const src = fs.readFileSync(file, 'utf8')
  const { title, description, headings, text } = extractHtmlData(src)
  const rel = path.relative(baseDir, file)
  const url = toUrlFromRelativeHtml(rel)

  return {
    id: hash(file),
    url,
    title: title || slugify(path.basename(file, '.html')),
    description,
    date: null,
    category: '',
    tags: [],
    headings,
    content: stripStopwords(text.replace(/\s+/g, ' ').trim()),
    storedContent: toStoredContent(text),
  }
}

async function build() {
  const mdFiles = fs.existsSync(contentDir)
    ? globSync('**/*.md', { cwd: contentDir, absolute: true })
    : []

  const pagesHtmlFiles = fs.existsSync(pagesDir)
    ? globSync('**/*.html', { cwd: pagesDir, absolute: true, ignore: ['search.html'] })
    : []

  const rootHtmlFiles = globSync('*.html', { cwd: rootDir, absolute: true })
  const nestedHtmlFiles = globSync('{hxd,member,labs,nexuswho,Picdetective}/**/*.html', {
    cwd: rootDir,
    absolute: true,
  })

  const htmlFiles = [...pagesHtmlFiles, ...rootHtmlFiles, ...nestedHtmlFiles]

  const docs = []
  const urlSeen = new Set()

  for (const file of mdFiles) {
    const doc = await parseMarkdown(file)
    if (urlSeen.has(doc.url)) continue
    urlSeen.add(doc.url)
    docs.push(doc)
  }

  for (const file of htmlFiles) {
    const baseDir = file.includes(`${path.sep}pages${path.sep}`) ? pagesDir : rootDir
    const doc = await parseHtml(file, baseDir)
    if (urlSeen.has(doc.url)) continue
    urlSeen.add(doc.url)
    docs.push(doc)
  }

  const miniSearch = new MiniSearch({
    fields: ['title', 'headings', 'content', 'tags', 'category'],
    storeFields: ['title', 'url', 'description', 'date', 'category', 'tags', 'storedContent'],
    searchOptions: {
      prefix: true,
      fuzzy: 0.15,
      boost: { title: 5, headings: 3, tags: 2, category: 1 },
      combineWith: 'AND',
    },
    synonyms,
  })

  miniSearch.addAll(docs.map((doc) => ({ ...doc, storedContent: undefined })))

  const docsOut = docs.map(({ storedContent, ...rest }) => ({ ...rest, content: storedContent }))

  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true })
  fs.writeFileSync(path.join(publicDir, 'docs.json'), JSON.stringify(docsOut))
  fs.writeFileSync(path.join(publicDir, 'index.json'), JSON.stringify(miniSearch.toJSON()))

  const docsSize = Buffer.byteLength(JSON.stringify(docsOut))
  const indexSize = Buffer.byteLength(JSON.stringify(miniSearch.toJSON()))
  const totalSize = ((docsSize + indexSize) / 1024).toFixed(2)
  console.log(`Indexed ${docs.length} documents. Size: ${totalSize} KB`)
}

build().catch((err) => {
  console.error(err)
  process.exit(1)
})
