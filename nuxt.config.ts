import FormsPlugin from "@tailwindcss/forms";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/eslint"],
  runtimeConfig: {
    owmApiSecret: process.env.OWM_API_KEY,
  },
  tailwindcss: {
    config: {
      plugins: [FormsPlugin],
    },
  },
});
