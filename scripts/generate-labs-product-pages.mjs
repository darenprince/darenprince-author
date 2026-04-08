import { readFile, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const dataPath = new URL('../assets/labs-data.json', import.meta.url)
const outputDir = new URL('../labs/products/', import.meta.url)

const template = ({
  id,
  name,
  tagline,
  status,
  category,
  categoryLabel,
  oneLiner,
  bullets,
  whatItIs,
  whoFor,
  capabilities,
  not,
  statusDetail,
  nextGate,
  monetization,
  valuationCurrent,
  valuationProjected,
  completion,
  timeToMarket,
  projectedRevenue,
  value,
  growthLabel,
  metrics,
}) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} | Crown Labs</title>
  <meta name="description" content="${tagline}">
  <meta name="theme-color" content="#0a7a57">
  <link rel="canonical" href="https://www.darenprince.com/labs/products/${id}.html">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${name} | Crown Labs">
  <meta property="og:description" content="${oneLiner}">
  <meta property="og:url" content="https://www.darenprince.com/labs/products/${id}.html">
  <meta property="og:image" content="https://www.darenprince.com/labs/assets/labs-opengraph.svg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${name} | Crown Labs">
  <meta name="twitter:description" content="${oneLiner}">
  <meta name="twitter:image" content="https://www.darenprince.com/labs/assets/labs-opengraph.svg">
  <link rel="icon" type="image/svg+xml" href="../assets/labs-favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="../../assets/icons/generated/favicon-32x32.png">
  <link rel="stylesheet" href="../../assets/labs-product.css">
</head>
<body class="theme-dark product-page">
  <header class="top-nav">
    <div class="nav-brand">
      <img src="../assets/crown-labs-logo.png" alt="Crown Labs" />
      <div>
        <strong>${name}</strong>
        <div class="footer-note">${categoryLabel || category}</div>
      </div>
    </div>
    <div class="nav-actions">
      <a class="back-link" href="../../labs.html#portfolio">Back to portfolio</a>
      <button class="theme-toggle" id="theme-toggle" type="button" aria-pressed="false" aria-label="Toggle light and dark mode">Theme</button>
    </div>
  </header>

  <main>
    <section class="product-hero">
      <div>
        <div class="hero-tags">
          <span class="tag">${status}</span>
          <span class="tag">${category}</span>
        </div>
        <h1>${name}</h1>
        <p class="subtitle">${tagline}</p>
        <p>${oneLiner}</p>
        <div class="access-actions">
          <a class="primary-btn" href="#access">Request access</a>
          <a class="ghost-btn" href="../../labs.html#portfolio">Explore all products</a>
        </div>
      </div>
    </section>

    <section class="panel-grid">
      <div class="panel-card">
        <h3>Readiness snapshot</h3>
        <p><strong>Status:</strong> ${status} — ${statusDetail}</p>
        <p><strong>Next gate:</strong> ${nextGate}</p>
        <p><strong>Completion:</strong> ${completion}</p>
        <p><strong>Time to market:</strong> ${timeToMarket}</p>
      </div>
      <div class="panel-card">
        <h3>Valuation trajectory</h3>
        <p><strong>As-is valuation:</strong> ${valuationCurrent}</p>
        <p><strong>Projected valuation:</strong> ${valuationProjected}</p>
        <p><strong>Signal:</strong> ${value}</p>
        <p><strong>Growth:</strong> ${growthLabel}</p>
      </div>
      <div class="panel-card">
        <h3>Revenue outlook</h3>
        <p><strong>Monetization:</strong> ${monetization}</p>
        <p><strong>Year 1:</strong> ${projectedRevenue.year1}</p>
        <p><strong>Year 2:</strong> ${projectedRevenue.year2}</p>
        <p><strong>Year 3:</strong> ${projectedRevenue.year3}</p>
      </div>
    </section>

    <section class="panel-grid">
      <div class="panel-card">
        <h3>Key outcomes</h3>
        <ul>${bullets.map((item) => `<li>${item}</li>`).join('')}</ul>
      </div>
      <div class="panel-card">
        <h3>Performance metrics</h3>
        <ul>${metrics.map((metric) => `<li><strong>${metric.label}:</strong> ${metric.value}</li>`).join('')}</ul>
      </div>
    </section>

    <section class="section-block">
      <h2>What it is</h2>
      ${whatItIs.map((paragraph) => `<p>${paragraph}</p>`).join('')}
    </section>

    <section class="panel-grid">
      <div class="panel-card">
        <h3>Who it’s for</h3>
        <ul>${whoFor.map((item) => `<li>${item}</li>`).join('')}</ul>
      </div>
      <div class="panel-card">
        <h3>Core capabilities</h3>
        <ul>${capabilities.map((item) => `<li>${item}</li>`).join('')}</ul>
      </div>
      <div class="panel-card">
        <h3>What it is NOT</h3>
        <ul>${not.map((item) => `<li>${item}</li>`).join('')}</ul>
      </div>
    </section>

    <section id="access" class="section-block">
      <h2>Request access</h2>
      <p>Tell the Lab what you need, timeline, and environment. We reply with controlled next steps.</p>
      <form class="access-form" name="${id}-access" method="POST" action="./${id}.html">
        <input type="hidden" name="form-name" value="${id}-access">
        <input type="hidden" name="product" value="${name}">
        <label>Your name<input type="text" name="name" required></label>
        <label>Email<input type="email" name="email" required></label>
        <label>Role / organization<input type="text" name="role"></label>
        <label>What do you need?<textarea name="message" required></textarea></label>
        <button class="primary-btn" type="submit">Send request</button>
      </form>
      <p class="footer-note">Direct channel: <a href="mailto:labs@darenprince.com">labs@darenprince.com</a></p>
    </section>
  </main>

  <script src="../../assets/labs-product.js"></script>
</body>
</html>
`

const run = async () => {
  const raw = await readFile(dataPath, 'utf8')
  const { products } = JSON.parse(raw)

  await mkdir(outputDir, { recursive: true })

  await Promise.all(
    products.map(async (product) => {
      const filePath = path.join(outputDir.pathname, `${product.id}.html`)
      await writeFile(filePath, template(product), 'utf8')
    })
  )
}

await run()
