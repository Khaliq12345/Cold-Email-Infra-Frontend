// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/ui", "nuxt-charts"],
  typescript: {
    typeCheck: true,
  },

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  colorMode: {
    preference: 'system'
  },

  routeRules: {
    "/": { prerender: true },
  },

  compatibilityDate: "2025-01-15",
});