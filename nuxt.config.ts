// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/eslint', '@vueuse/nuxt'],
  css: ['~/assets/main.css'],
  future: {
    compatibilityVersion: 4,
  },
  eslint: {
    config: {
      stylistic: {
        braceStyle: '1tbs',
      },
    },
  },
  colorMode: {
    preference: 'dark',
  },
  runtimeConfig: {
    SPOTIFY_CLIENT_SECRET: '',
    public: {
      SPOTIFY_CLIENT_ID: '',
      SPOTIFY_REDIRECT_URI: '',
      SPOTIFY_BASE_URI: '',
    },
  },
})
