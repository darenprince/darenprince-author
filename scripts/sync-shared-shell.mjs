import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const repoRoot = resolve(new URL('..', import.meta.url).pathname)

const pages = [
  'index.html',
  'home.html',
  'book.html',
  'meet-daren-prince.html',
  'contact.html',
  'login.html',
]

const headerTemplate = readFileSync(resolve(repoRoot, 'partials/site-header.html'), 'utf8').trim()
const footerTemplate = readFileSync(resolve(repoRoot, 'partials/site-footer.html'), 'utf8').trim()

for (const page of pages) {
  const pagePath = resolve(repoRoot, page)
  const emailId = `footer-email-${page.replace(/\.html$/, '')}`
  let html = readFileSync(pagePath, 'utf8')

  html = html.replace(/\s*<div data-shared-header><\/div>\s*/m, `\n${headerTemplate}\n\n`)

  html = html.replace(
    /\s*<div data-shared-footer><\/div>\s*/m,
    `\n${footerTemplate.replaceAll('__FOOTER_EMAIL_ID__', emailId)}\n`
  )

  html = html.replace(/\n\s*<script type="module" src="\/js\/site-shell\.js"><\/script>/g, '')

  writeFileSync(pagePath, html)
}

console.log(`[sync-shared-shell] Updated ${pages.length} pages from shared header/footer partials.`)
