import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const outDir = path.join(root, 'assets', 'social')
const bookPath = path.join(root, 'assets', 'gameon-book-hero-transparent.png')
const logoPath = path.join(root, 'assets', 'original-header-logo.png')

const palette = {
  black: '#050705',
  charcoal: '#101410',
  chalk: '#f7f4ed',
  muted: '#c9c7bd',
  lime: '#8cd679',
  green: '#456f3a',
  gold: '#f2c94c',
}

function svgBuffer(svg) {
  return Buffer.from(svg)
}

function textureSvg(width, height) {
  const yardLines = Array.from({ length: 9 }, (_, index) => {
    const x = 120 + index * 115
    const opacity = index % 2 === 0 ? 0.11 : 0.07
    return `<path d="M${x} 60 L${x + 170} ${height - 35}" stroke="${palette.chalk}" stroke-width="1.4" opacity="${opacity}"/>`
  }).join('')

  const chalkMarks = [
    'M760 126 C810 100 866 102 925 136',
    'M780 194 C837 226 905 226 968 190',
    'M690 475 C760 430 842 425 928 470',
    'M126 445 C196 390 270 372 350 390',
  ]
    .map(
      (d, index) =>
        `<path d="${d}" fill="none" stroke="${index === 1 ? palette.lime : palette.chalk}" stroke-width="${index === 1 ? 3 : 2}" stroke-dasharray="14 15" stroke-linecap="round" opacity="${index === 1 ? 0.26 : 0.15}"/>`,
    )
    .join('')

  const xos = [
    [150, 125, 'X'],
    [206, 172, 'O'],
    [275, 136, 'X'],
    [980, 160, 'O'],
    [1032, 235, 'X'],
    [1008, 425, 'O'],
    [88, 518, 'X'],
  ]
    .map(
      ([x, y, text]) =>
        `<text x="${x}" y="${y}" font-size="28" font-family="Arial Black, Impact, sans-serif" fill="${palette.chalk}" opacity="0.13" transform="rotate(-8 ${x} ${y})">${text}</text>`,
    )
    .join('')

  return svgBuffer(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="limeGlow" cx="76%" cy="48%" r="58%">
          <stop offset="0" stop-color="${palette.lime}" stop-opacity="0.32"/>
          <stop offset="0.36" stop-color="${palette.green}" stop-opacity="0.13"/>
          <stop offset="1" stop-color="${palette.black}" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="field" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#050705"/>
          <stop offset="0.46" stop-color="#101410"/>
          <stop offset="1" stop-color="#030403"/>
        </linearGradient>
        <filter id="grain" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.78" numOctaves="3" seed="8"/>
          <feColorMatrix type="saturate" values="0"/>
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.08"/>
          </feComponentTransfer>
        </filter>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#field)"/>
      <rect width="${width}" height="${height}" fill="url(#limeGlow)"/>
      <g opacity="0.5">${yardLines}</g>
      <g>${chalkMarks}</g>
      <g>${xos}</g>
      <path d="M0 500 C210 464 402 478 590 522 C780 568 990 552 1200 512 L1200 630 L0 630 Z" fill="${palette.lime}" opacity="0.045"/>
      <rect width="${width}" height="${height}" filter="url(#grain)"/>
      <rect width="${width}" height="${height}" fill="none" stroke="${palette.lime}" stroke-width="2" opacity="0.32"/>
      <rect x="18" y="18" width="${width - 36}" height="${height - 36}" fill="none" stroke="${palette.chalk}" stroke-width="1" opacity="0.1"/>
    </svg>
  `)
}

function textSvg(width, height, variant) {
  const isSquare = variant === 'square'
  const headlineX = isSquare ? 78 : 78
  const headlineY = isSquare ? 324 : 178
  const headlineSize = isSquare ? 106 : 80
  const lineHeight = isSquare ? 102 : 78
  const copyY = isSquare ? 670 : 450
  const badgeY = isSquare ? 858 : 538
  const copyLines = isSquare
    ? [
        'A practical playbook for',
        'real confidence, better conversations,',
        'and connection that lasts.',
      ]
    : [
        'A practical playbook for real confidence,',
        'better conversations, and connection that lasts.',
      ]
  const copyMarkup = copyLines
    .map((line, index) => {
      const dy = index === 0 ? 0 : isSquare ? 42 : 40
      return `<tspan x="${headlineX}" dy="${dy}">${line}</tspan>`
    })
    .join('')

  return svgBuffer(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="textShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="5" flood-color="#000000" flood-opacity="0.62"/>
        </filter>
      </defs>
      <g filter="url(#textShadow)">
        <text x="${headlineX}" y="${headlineY}" font-size="${headlineSize}" line-height="${lineHeight}" font-family="Impact, Arial Black, Arial, sans-serif" font-weight="900" letter-spacing="-2" fill="${palette.chalk}">
          <tspan x="${headlineX}" dy="0">STOP</tspan>
          <tspan x="${headlineX}" dy="${lineHeight}">GUESSING.</tspan>
          <tspan x="${headlineX}" dy="${lineHeight}" fill="${palette.lime}">START</tspan>
          <tspan x="${headlineX}" dy="${lineHeight}" fill="${palette.lime}">CONNECTING.</tspan>
        </text>
      </g>
      <text x="${headlineX}" y="${copyY}" font-size="${isSquare ? 34 : 28}" font-family="Arial, sans-serif" font-weight="700" fill="${palette.chalk}" opacity="0.93">${copyMarkup}</text>
      <g transform="translate(${headlineX} ${badgeY})">
        <path d="M0 0 H${isSquare ? 530 : 490} L${isSquare ? 552 : 512} 22 L${isSquare ? 530 : 490} 44 H0 Z" fill="#0d120d" stroke="${palette.lime}" stroke-width="1.5" opacity="0.95"/>
        <text x="22" y="29" font-size="22" font-family="Arial Black, Arial, sans-serif" font-weight="900" fill="${palette.gold}" letter-spacing="1.8">★★★★★</text>
        <circle cx="168" cy="22" r="4" fill="${palette.lime}"/>
        <text x="188" y="30" font-size="21" font-family="Arial Black, Arial, sans-serif" font-weight="900" fill="${palette.chalk}" letter-spacing="1.7">5 STAR RATED</text>
        <circle cx="360" cy="22" r="4" fill="${palette.lime}"/>
        <text x="382" y="30" font-size="21" font-family="Arial Black, Arial, sans-serif" font-weight="900" fill="${palette.chalk}" letter-spacing="1.7">AMAZON TOP 100</text>
      </g>
    </svg>
  `)
}

function top100BadgeSvg(size = 162) {
  return svgBuffer(`
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gold" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#fff1a6"/>
          <stop offset="0.48" stop-color="#f2c94c"/>
          <stop offset="1" stop-color="#9b6515"/>
        </linearGradient>
        <filter id="badgeShadow">
          <feDropShadow dx="0" dy="10" stdDeviation="8" flood-color="#000" flood-opacity="0.42"/>
        </filter>
      </defs>
      <g filter="url(#badgeShadow)">
        <path d="M81 4 L99 23 L125 17 L132 43 L157 54 L147 80 L157 106 L132 117 L125 143 L99 137 L81 156 L63 137 L37 143 L30 117 L5 106 L15 80 L5 54 L30 43 L37 17 L63 23 Z" fill="#10120f" stroke="url(#gold)" stroke-width="5"/>
        <circle cx="81" cy="80" r="55" fill="none" stroke="url(#gold)" stroke-width="2.5" opacity="0.86"/>
        <text x="81" y="48" text-anchor="middle" font-size="17" font-family="Arial Black, Arial, sans-serif" fill="#f8eaa2" letter-spacing="1.5">AMAZON</text>
        <text x="81" y="84" text-anchor="middle" font-size="34" font-family="Impact, Arial Black, sans-serif" fill="#ffffff">TOP</text>
        <text x="81" y="114" text-anchor="middle" font-size="34" font-family="Impact, Arial Black, sans-serif" fill="#ffffff">100</text>
        <text x="81" y="134" text-anchor="middle" font-size="13" font-family="Arial Black, Arial, sans-serif" fill="#8cd679" letter-spacing="1.1">BEST SELLER</text>
      </g>
    </svg>
  `)
}

function safeZoneSvg(width, height) {
  return svgBuffer(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fadeRight" x1="0" x2="1">
          <stop offset="0" stop-color="#050705" stop-opacity="0"/>
          <stop offset="0.58" stop-color="#050705" stop-opacity="0.04"/>
          <stop offset="1" stop-color="#050705" stop-opacity="0.74"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#fadeRight)"/>
      <rect x="0" y="0" width="${width}" height="${height}" fill="#000" opacity="0.09"/>
    </svg>
  `)
}

async function renderCard({ fileBase, width, height, variant }) {
  const bookWidth = variant === 'square' ? 430 : 354
  const bookTop = variant === 'square' ? 190 : 68
  const bookLeft = variant === 'square' ? width - bookWidth - 112 : width - bookWidth - 82
  const logoWidth = variant === 'square' ? 310 : 188
  const logoLeft = 72
  const logoTop = variant === 'square' ? 68 : 34
  const badgeSize = variant === 'square' ? 162 : 120

  const book = await sharp(bookPath).resize({ width: bookWidth }).png().toBuffer()
  const logo = await sharp(logoPath).resize({ width: logoWidth }).png().toBuffer()
  const shadow = svgBuffer(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="blur"><feGaussianBlur stdDeviation="24"/></filter>
      </defs>
      <ellipse cx="${bookLeft + bookWidth * 0.5}" cy="${bookTop + bookWidth * 1.36}" rx="${bookWidth * 0.42}" ry="34" fill="#000" opacity="0.58" filter="url(#blur)"/>
      <rect x="${bookLeft + 28}" y="${bookTop + 34}" width="${bookWidth * 0.82}" height="${bookWidth * 1.35}" fill="#000" opacity="0.34" filter="url(#blur)"/>
    </svg>
  `)

  const composites = [
    { input: textureSvg(width, height), left: 0, top: 0 },
    { input: safeZoneSvg(width, height), left: 0, top: 0 },
    { input: shadow, left: 0, top: 0 },
    { input: book, left: Math.round(bookLeft), top: Math.round(bookTop) },
    ...(variant === 'square'
      ? []
      : [
          {
            input: top100BadgeSvg(badgeSize),
            left: Math.round(bookLeft - badgeSize * 0.12),
            top: Math.round(bookTop + bookWidth * 1.03),
          },
        ]),
    { input: logo, left: logoLeft, top: logoTop },
    { input: textSvg(width, height, variant), left: 0, top: 0 },
  ]

  const pngPath = path.join(outDir, `${fileBase}.png`)
  const webpPath = path.join(outDir, `${fileBase}.webp`)

  const image = sharp({
    create: {
      width,
      height,
      channels: 4,
      background: '#050705',
    },
  }).composite(composites)

  await image.png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(pngPath)
  await sharp(pngPath).webp({ quality: 88, effort: 6 }).toFile(webpPath)

  return { pngPath, webpPath }
}

await fs.mkdir(outDir, { recursive: true })

const outputs = [
  await renderCard({ fileBase: 'game-on-og-1200x630', width: 1200, height: 630, variant: 'wide' }),
  await renderCard({ fileBase: 'game-on-twitter-1200x630', width: 1200, height: 630, variant: 'wide' }),
  await renderCard({ fileBase: 'game-on-social-square-1200', width: 1200, height: 1200, variant: 'square' }),
]

console.log(
  outputs
    .flatMap((output) => [output.pngPath, output.webpPath])
    .map((file) => path.relative(root, file))
    .join('\n'),
)
