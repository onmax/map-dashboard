import { defineNuxtConfig } from 'nuxt/config'
import { object, string } from 'valibot'
import process from 'node:process'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['@nuxthub/core', '@nuxt/eslint', '@nuxt/fonts', '@nuxt/icon', '@nuxt/image', 'nuxt-safe-runtime-config', 'shadcn-nuxt'],

  devtools: { enabled: true },

  runtimeConfig: {
    betterAuthSecret: process.env.BETTER_AUTH_SECRET,
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
    }
  },

  safeRuntimeConfig: {
    $schema: object({
      betterAuthSecret: string(),
      google: object({
        clientId: string(),
        clientSecret: string(),
      }),
      public: object({
        baseUrl: string(),
      }),
    }),
  },

  compatibilityDate: '2025-07-07',

  hub: {
    database: true,
    kv: true,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
