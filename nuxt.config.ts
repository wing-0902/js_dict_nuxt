// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: [
    '@unocss/reset/sanitize/sanitize.css',
    '@unocss/reset/sanitize/assets.css',
    '~/assets/global.scss'
  ],
  devtools: { enabled: true },
  modules: ['@unocss/nuxt']
});
