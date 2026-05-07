export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  devtools: { enabled: false },
  app: {
    head: {
      title: 'Crown Labs Documentation',
      meta: [
        { name: 'description', content: 'Crown Labs institutional documentation platform.' },
        { name: 'theme-color', content: '#0c1117' },
        { property: 'og:title', content: 'Crown Labs Documentation' },
        {
          property: 'og:description',
          content:
            'Institutional documentation, governance, investor frameworks, and product dossiers.',
        },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/brand/favicon.svg' }],
    },
  },
  nitro: {
    preset: 'static',
    prerender: { routes: ['/'], failOnError: false },
  },
})
