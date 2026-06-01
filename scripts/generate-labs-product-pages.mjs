import { mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import productsPayload from '../data/products.json' with { type: 'json' }

const outputDir = new URL('../labs/products/', import.meta.url)

const escapeHtml = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const list = (items = []) => items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')

const paragraphs = (items = []) => items.map((item) => `<p>${escapeHtml(item)}</p>`).join('')

const metrics = (items = []) =>
  items
    .map(
      (metric) =>
        `<li><strong>${escapeHtml(metric.label)}:</strong> ${escapeHtml(metric.value)}</li>`
    )
    .join('')

const template = (product) => `<!doctype html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>${escapeHtml(product.name)} | Crown Labs</title>
  <meta name="description" content="${escapeHtml(product.oneLiner)}" />
  <meta name="theme-color" content="#0b0f17" />
  <link rel="canonical" href="https://www.darenprince.com/labs/products/${escapeHtml(product.id)}.html" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escapeHtml(product.name)} | Crown Labs" />
  <meta property="og:description" content="${escapeHtml(product.oneLiner)}" />
  <meta property="og:url" content="https://www.darenprince.com/labs/products/${escapeHtml(product.id)}.html" />
  <meta property="og:image" content="https://www.darenprince.com/labs/assets/labs-opengraph.svg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(product.name)} | Crown Labs" />
  <meta name="twitter:description" content="${escapeHtml(product.oneLiner)}" />
  <meta name="twitter:image" content="https://www.darenprince.com/labs/assets/labs-opengraph.svg" />
  <link rel="icon" type="image/svg+xml" href="../assets/labs-favicon.svg" />
  <link rel="stylesheet" href="../../assets/labs-product.css" />
</head>
<body class="theme-dark product-page">
  <header class="top-nav">
    <div class="nav-brand">
      <img src="../assets/crown-labs-logo.png" alt="Crown Labs" />
      <div>
        <strong>${escapeHtml(product.name)}</strong>
        <div class="footer-note">Sourced from ${escapeHtml(product.sourcePath)}</div>
      </div>
    </div>
    <div class="nav-actions">
      <a class="back-link" href="../../labs.html#portfolio">Back to portfolio</a>
      <a class="back-link" href="../../docs/crownlabsbible/docs/index.html">Crown Labs Bible</a>
      <button class="theme-toggle" id="theme-toggle" type="button" aria-pressed="false" aria-label="Toggle light and dark mode">Theme</button>
    </div>
  </header>

  <main>
    <section class="product-hero">
      <div>
        <div class="hero-tags">
          <span class="tag">${escapeHtml(product.status)}</span>
          <span class="tag">${escapeHtml(product.category)}</span>
        </div>
        <h1>${escapeHtml(product.name)}</h1>
        <p class="subtitle">${escapeHtml(product.tagline)}</p>
        <p>${escapeHtml(product.oneLiner)}</p>
        <div class="access-actions">
          <a class="primary-btn" href="../../${escapeHtml(product.sourcePath)}">Open canonical dossier</a>
          <a class="ghost-btn" href="../../labs.html#portfolio">Explore portfolio</a>
        </div>
      </div>
    </section>

    <section class="panel-grid">
      <div class="panel-card">
        <h2>Canonical status</h2>
        <p><strong>Status:</strong> ${escapeHtml(product.statusDetail)}</p>
        <p><strong>Classification:</strong> ${escapeHtml(product.categoryLabel || product.category)}</p>
        <p><strong>Readiness signal:</strong> ${escapeHtml(product.completion)}</p>
      </div>
      <div class="panel-card">
        <h2>Source governance</h2>
        <p><strong>Authority:</strong> docs/crownlabsbible/</p>
        <p><strong>Source file:</strong> ${escapeHtml(product.sourcePath)}</p>
        <p><strong>Update rule:</strong> edit the dossier first, then regenerate metadata.</p>
      </div>
      <div class="panel-card">
        <h2>Valuation reference</h2>
        <p>${escapeHtml(product.valuationProjected)}</p>
        <p class="footer-note">Financial language remains directional and must be verified against canonical valuation dossiers.</p>
      </div>
    </section>

    <section class="section-block">
      <h2>What it is</h2>
      ${paragraphs(product.whatItIs?.length ? product.whatItIs : [product.oneLiner])}
    </section>

    <section class="panel-grid">
      <div class="panel-card">
        <h2>Product signals</h2>
        <ul>${list(product.bullets)}</ul>
      </div>
      <div class="panel-card">
        <h2>Core capabilities</h2>
        <ul>${list(product.capabilities)}</ul>
      </div>
      <div class="panel-card">
        <h2>Metadata checks</h2>
        <ul>${metrics(product.metrics)}</ul>
      </div>
    </section>
  </main>

  <footer class="product-footer">
    <p>© Crown Labs • Generated from canonical Crown Labs Bible metadata.</p>
  </footer>

  <script src="../../assets/labs-product.js" defer></script>
</body>
</html>
`

await mkdir(outputDir, { recursive: true })
await rm(outputDir, { recursive: true, force: true })
await mkdir(outputDir, { recursive: true })

for (const product of productsPayload.products) {
  await writeFile(path.join(outputDir.pathname, `${product.id}.html`), template(product))
}

console.log(`Generated ${productsPayload.products.length} canonical Labs product pages.`)
