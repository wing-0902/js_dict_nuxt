// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'JavaScript - Dictionary for Developers',
      htmlAttrs: {
        lang: 'ja'
      }
    }
  },
  compatibilityDate: '2025-07-15',
  css: [
    '@unocss/reset/sanitize/sanitize.css',
    '@unocss/reset/sanitize/assets.css',
    '~/assets/global.scss'
  ],
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@unocss/nuxt']
});
