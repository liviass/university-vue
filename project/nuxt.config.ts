// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  css: ['@/public/css/theme.scss'],
  typescript: {
    typeCheck: true,
  }
})
