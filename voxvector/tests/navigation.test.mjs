import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = relativePath => readFileSync(new URL(relativePath, import.meta.url), 'utf8')

const app = read('../src/App.jsx')
const header = read('../src/components/SiteHeader.jsx')
const main = read('../src/main.jsx')
const siteMap = read('../src/components/SiteMapPage.jsx')
const pipeline = read('../public/pipeline.html')

test('landing primary actions and canonical anchors resolve to real VoxVector destinations', () => {
  assert.match(app, /onClick=\{goToRequestAccess\}>Request Access/)
  assert.match(app, /window\.location\.href = '\/voxvector\/login'/)
  assert.match(app, /goToSection\('workflow'\)/)
  for (const id of ['product', 'workflow', 'technology', 'analysis-interface', 'scientific-discipline', 'use-cases', 'briefing']) {
    assert.match(app, new RegExp(`id=["']${id}["']`), `missing landing anchor ${id}`)
  }
})

test('public header links use landing-qualified anchors and styled reference pages', () => {
  for (const href of ['/voxvector/#product', '/voxvector/#workflow', '/voxvector/#technology', '/voxvector/#use-cases', '/voxvector/#briefing']) {
    assert.ok(header.includes(`href: '${href}'`), `missing ${href}`)
  }
  assert.match(header, /href="\/voxvector\/pipeline\.html"/)
  assert.match(header, /href="\/voxvector\/methods\.html"/)
  assert.match(header, /href="\/voxvector\/site-map"/)
  assert.doesNotMatch(header, /Methods &amp; Research/)
})

test('React router exposes the real site map page and hash restoration does not force anchors to top', () => {
  assert.match(main, /path === '\/voxvector\/site-map'/)
  assert.match(main, /target\.scrollIntoView\(\{ block: 'start', behavior: 'auto' \}\)/)
  assert.doesNotMatch(main, /addEventListener\('hashchange', scrollTop\)/)
  assert.match(siteMap, /Every published VoxVector surface, organized\./)
  for (const href of ['/voxvector/pipeline.html', '/voxvector/methods.html', '/voxvector/login', '/voxvector/app', '/voxvector/developer']) {
    assert.ok(siteMap.includes(href), `site map missing ${href}`)
  }
})

test('styled pipeline page follows the canonical Stage 05 and Stage 06 order', () => {
  const speech = pipeline.indexOf("['05','Speech Segmentation'")
  const diarization = pipeline.indexOf("['06','Speaker Identification / Diarization'")
  assert.ok(speech >= 0, 'Stage 05 Speech Segmentation missing')
  assert.ok(diarization > speech, 'Stage 06 diarization must follow Stage 05 speech segmentation')
  assert.match(pipeline, /href="\/voxvector\/site-map">Site Map<\/a>/)
})
