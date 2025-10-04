// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css", "~/assets/css/fonts.css"],

  // Enable static site generation
  nitro: {
    prerender: {
      routes: ['/'],
      // Optionally crawl links to discover routes
      crawlLinks: true
    }
  },

  // Generate dynamic routes at build time
  hooks: {
    async 'nitro:config'(nitroConfig) {
      if (!nitroConfig.prerender) nitroConfig.prerender = { routes: [] }

      try {
        // Fetch projects from Strapi to generate routes
        const strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337'
        const strapiToken = process.env.STRAPI_TOKEN

        const response = await fetch(`${strapiUrl}/api/projects?fields[0]=projectName&status=published`, {
          headers: {
            'Authorization': `Bearer ${strapiToken}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          const projectRoutes = data.data.map(project => `/projects/${project.projectName}`)
          nitroConfig.prerender.routes.push(...projectRoutes)
          console.log('Pre-generating routes:', projectRoutes)
        }
      } catch (error) {
        console.warn('Could not fetch projects for pre-rendering:', error.message)
      }
    }
  },

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
