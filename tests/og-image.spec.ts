import { accessSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { load } from 'cheerio'
import { describe, expect, it } from 'vitest'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(currentDir, '..')
const htmlPath = path.join(repoRoot, '911.html')
const imageRelativePath = 'emergency-911/911-ogimage.jpeg'
const imagePath = path.join(repoRoot, imageRelativePath)

describe('911 metadata og:image', () => {
  const html = readFileSync(htmlPath, 'utf8')
  const $ = load(html)

  it('references the dedicated OG asset', () => {
    const ogImage = $('meta[property="og:image"]').attr('content')
    const twitterImage = $('meta[name="twitter:image"]').attr('content')

    expect(ogImage).toBe(imageRelativePath)
    expect(twitterImage).toBe(imageRelativePath)
  })

  it('includes the OG image file in the repository', () => {
    expect(() => accessSync(imagePath)).not.toThrow()
  })
})
