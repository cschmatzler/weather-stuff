// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
		devtools: { enabled: true },
		modules: ["@nuxtjs/tailwindcss"],
    runtimeConfig: {
      owmApiSecret: process.env.OWM_API_KEY
    },
})
