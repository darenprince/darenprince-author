import { access } from 'node:fs/promises'
import path from 'node:path'

const required = [
  'crownlabs/index.html',
  'crownlabs/style-guide.html',
  'crownlabs/STYLE_GUIDE.md',
  'crownlabs/assets/styles.css',
  'crownlabs/assets/app.js',
  'crownlabs/assets/data.js',
  'crownlabs/assets/favicon.svg',
  'crownlabs/assets/og-image.svg',
  'crownlabs/assets/site.webmanifest',
]

async function run() {
  const missing = []
  for (const file of required) {
    try {
      await access(path.resolve(file))
    } catch {
      missing.push(file)
    }
  }

  if (missing.length) {
    console.error('CrownLabs build check failed. Missing files:')
    for (const m of missing) console.error(`- ${m}`)
    process.exit(1)
  }

  console.log('CrownLabs static bundle is GitHub Pages ready.')
}

run()
