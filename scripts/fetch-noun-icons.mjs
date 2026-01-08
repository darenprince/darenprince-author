import { createRequire } from 'node:module'
import fs from 'node:fs/promises'

const require = createRequire(import.meta.url)
const NounProject = require('the-noun-project-v2')

const { NOUN_PROJECT_API_KEY, NOUN_PROJECT_API_SECRET } = process.env

if (!NOUN_PROJECT_API_KEY || !NOUN_PROJECT_API_SECRET) {
  console.error('Missing NOUN_PROJECT_API_KEY or NOUN_PROJECT_API_SECRET environment variables.')
  process.exit(1)
}

const nounProject = new NounProject({
  key: NOUN_PROJECT_API_KEY,
  secret: NOUN_PROJECT_API_SECRET,
})

const iconTerms = {
  compass: 'compass',
  grid: 'grid',
  framework: 'framework',
  book: 'book',
  status: 'checklist',
  shield: 'shield',
  spark: 'spark',
  signal: 'signal',
  crown: 'crown',
  check: 'check',
  lab: 'flask',
  guide: 'map',
  filter: 'filter',
  bolt: 'lightning',
  eye: 'eye',
  users: 'users',
  camera: 'camera',
  alert: 'alert',
  timer: 'timer',
  network: 'network',
  lock: 'lock',
  chat: 'chat',
  map: 'map',
  trend: 'trend',
  box: 'box',
  audio: 'audio',
  calendar: 'calendar',
  heart: 'heart',
}

const getIconsByTerm = (term) =>
  new Promise((resolve, reject) => {
    nounProject.getIconsByTerm(term, { limit: 1 }, (error, data) => {
      if (error) reject(error)
      resolve(data?.icons?.[0])
    })
  })

const fetchSvg = async (url) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`)
  }
  return response.text()
}

const icons = {}

for (const [name, term] of Object.entries(iconTerms)) {
  // eslint-disable-next-line no-await-in-loop
  const icon = await getIconsByTerm(term)
  if (!icon?.icon_url) {
    console.warn(`No icon found for ${term}`)
    continue
  }
  // eslint-disable-next-line no-await-in-loop
  const svg = await fetchSvg(icon.icon_url)
  icons[name] = svg.replace(/\s+/g, ' ').trim()
}

const output = `/* eslint-disable max-len */\n/* Generated via The Noun Project API. */\nwindow.nounIcons = ${JSON.stringify(
  icons,
  null,
  2
)}\n`

await fs.writeFile(new URL('../assets/noun-icons.js', import.meta.url), output)
console.log('Saved icons to assets/noun-icons.js')
