// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css", "~/assets/css/fonts.css"],

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", href: "/favicon_red.png" }],
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    public: {
      strapiBaseUrl: process.env.STRAPI_URL || "http://localhost:1337",
      strapiApi: process.env.STRAPI_TOKEN,
    },
  },

  image: {
    quality: 90,
    format: ["webp"],
    imgix: {
      baseURL: process.env.IMGIX_URL,
    },
  },

  modules: [
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/fonts",
    // "@nuxtjs/seo",
    "@nuxtjs/color-mode",
    "nuxt-umami",
  ],

  colorMode: { classSuffix: "", preference: "dark" },

  umami: {
    id: "6447c54d-c147-45b7-a622-9d86d74fe6d2",
    host: "https://umami.echobase.dev/",
    autoTrack: true,
    ignoreLocalhost: true,
  },
});
