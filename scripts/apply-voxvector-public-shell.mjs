#!/usr/bin/env node
import fs from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const files = [
  'voxvector/public/methods.html',
  'voxvector/public/pipeline.html',
  'voxvector/public/image-index/index.html',
]

const icons = {
  Product: '<svg class="vv-static-nav-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" stroke="currentColor" stroke-width="1.7"/></svg>',
  'How it works': '<svg class="vv-static-nav-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  Technology: '<svg class="vv-static-nav-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 3v4M17 3v4M4 7h16v13H4zM8 11h2M14 11h2M8 15h2M14 15h2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  'Use cases': '<svg class="vv-static-nav-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 6h16v12H4zM8 6V4h8v2M8 12h8M10 15h4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  Resources: '<svg class="vv-static-nav-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 0-4 4zM5 4v16a4 4 0 0 1 4-4h10" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  Developer: '<svg class="vv-static-nav-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
}

const nav = (className = 'vv-static-primary-nav') => `<nav class="${className}" aria-label="Primary navigation">${[
  ['Product', '/voxvector/#product'], ['How it works', '/voxvector/#workflow'], ['Technology', '/voxvector/#technology'], ['Use cases', '/voxvector/#use-cases'], ['Resources', '/voxvector/#briefing'], ['Developer', '/voxvector/developer/'],
].map(([label, href]) => `<a href="${href}">${icons[label]}${label}</a>`).join('')}</nav>`
const mobile = `<details class="mobile-public-menu"><summary aria-label="Open navigation"><span class="menu-glyph" aria-hidden="true"></span></summary>${nav('vv-static-mobile-nav')}</details>`

const ensureHeadLink = (html, href) => html.includes('public-shell.css') ? html : html.replace('</head>', `  <link rel="stylesheet" href="${href}">\n</head>`)
const markBody = html => html.replace(/<body([^>]*)>/, (_m, attrs) => {
  const clean = attrs.replace(/\sclass="[^"]*"/i, '').trim()
  return `<body${clean ? ` ${clean}` : ''} class="vv-static-public">`
})

async function transform(file) {
  let html = await fs.readFile(path.join(root, file), 'utf8')
  const depth = file.includes('/image-index/') ? '../' : ''
  html = ensureHeadLink(html, `${depth}public-shell.css`)
  html = markBody(html)

  if (file.endsWith('methods.html')) {
    html = html.replace(/<nav class="desktop-nav"[^>]*>[\s\S]*?<\/nav>/, nav())
    html = html.replace(/<nav class="side-nav"[^>]*>[\s\S]*?<\/nav>/, nav('side-nav'))
  } else if (file.endsWith('image-index/index.html')) {
    html = html.replace(/<nav class="desktop-nav"[^>]*>[\s\S]*?<\/nav>/, nav())
    if (!html.includes('class="mobile-public-menu"')) html = html.replace(/(<a class="mobile-header-link"[\s\S]*?<\/a>)/, `$1${mobile}`)
  } else if (file.endsWith('pipeline.html')) {
    const oldTop = /<div class="shell top">[\s\S]*?<div class="shell hero">/
    const replacement = `<div class="shell top"><a class="back" href="/voxvector/" aria-label="Back to VoxVector">VoxVector</a>${nav()}${mobile}<span class="eyebrow">Vocal intelligence architecture</span></div><div class="shell hero">`
    html = html.replace(oldTop, replacement)
  }

  await fs.writeFile(path.join(root, file), html)
  console.log(`[voxvector] public shell normalized: ${file}`)
}

for (const file of files) await transform(file)
