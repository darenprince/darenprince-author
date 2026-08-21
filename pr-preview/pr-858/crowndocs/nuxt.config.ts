export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  devtools: { enabled: false },
  app: {
    head: {
      title: 'Crown Labs Documentation',
      meta: [
        { name: 'description', content: 'Crown Labs institutional documentation platform.' },
        { name: 'theme-color', content: '#0c1117' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#f5f7fa' },
        { property: 'og:title', content: 'Crown Labs Documentation' },
        {
          property: 'og:description',
          content:
            'Institutional documentation, governance, investor frameworks, and product dossiers.',
        },
        { property: 'og:type', content: 'website' },
        {
          property: 'og:image',
          content: 'https://www.darenprince.com/labs/assets/crown-labs-logo.png',
        },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Crown Labs Documentation' },
        {
          name: 'twitter:description',
          content:
            'Institutional documentation, governance, investor frameworks, and product dossiers.',
        },
        {
          name: 'twitter:image',
          content: 'https://www.darenprince.com/labs/assets/crown-labs-logo.png',
        },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/brand/favicon.svg' }],
    },
  },
  nitro: {
    prerender: {
      routes: ['/', '/docs/foundation', '/docs/corporate-infrastructure/documentation-platform'],
      failOnError: false,
    },
  },
})
