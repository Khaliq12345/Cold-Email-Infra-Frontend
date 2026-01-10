// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_BASE,
    },
  },
  modules: [
    "@nuxt/ui",
    "nuxt-charts",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],
  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  colorMode: {
    preference: "system",
  },

  routeRules: {
    "/": { prerender: true },
  },

  compatibilityDate: "2025-01-15",
});
