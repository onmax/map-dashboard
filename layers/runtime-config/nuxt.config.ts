import { toStandardJsonSchema } from '@valibot/to-json-schema'
import { defineNuxtConfig } from 'nuxt/config'
import { object, string } from 'valibot'

export default defineNuxtConfig({
  runtimeConfig: toStandardJsonSchema(object({
    betterAuthSecret: string(),
    google: object({
      clientId: string(),
      clientSecret: string(),
    }),
    public: object({
      baseUrl: string(),
    }),
  })),
})
