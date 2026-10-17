// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Munni Khan — Portfolio',
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'description', content: 'Munni Khan — Web developer from Nepal with 2+ years experience. Websites, admin panels and e-commerce.' },
        { name: 'theme-color', content: '#000000' },
        { property: 'og:title', content: 'Munni Khan — Portfolio' },
        { property: 'og:description', content: 'Web developer · Websites, admin panels, e-commerce · Nepal' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@500;600;700;800&display=swap',
        },
      ],
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },
  experimental: {
    viewTransition: false,
  },
  vite: {
    resolve: {
      dedupe: ['three'],
    },
    optimizeDeps: {
      include: ['three'],
    },
  },
})
