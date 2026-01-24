// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Existantly - Cold Email Platform",
      link: [{ rel: "icon", type: "image/x-icon", href: "/logo.webp" }],
      meta: [{ property: "og:image", content: "/logo.webp" }],
    },
  },
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
