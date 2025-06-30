// @ts-ignore types are not working
import { D1Dialect } from '@atinux/kysely-d1'
import { betterAuth } from 'better-auth'
import { admin, anonymous } from 'better-auth/plugins'

let _auth: ReturnType<typeof betterAuth>
export function serverAuth() {
  const { google, betterAuthSecret, public: { baseUrl } } = useRuntimeConfig()

  if (!_auth) {
    _auth = betterAuth({
      database: {
        // @ts-expect-error: types are not working
        dialect: new D1Dialect({ database: hubDatabase() }),
        type: 'sqlite',
      },
      secondaryStorage: {
        get: key => hubKV().getItemRaw(`_auth:${key}`),
        set: (key, value, ttl) => hubKV().set(`_auth:${key}`, value, { ttl }),
        delete: key => hubKV().del(`_auth:${key}`),
      },
      baseUrl,
      secret: betterAuthSecret,
      emailAndPassword: { enabled: true },
      socialProviders: {
        google: {
          clientId: google.clientId,
          clientSecret: google.clientSecret,
        },
      },
      account: { accountLinking: { enabled: true } },
      plugins: [anonymous(), admin()],
    })
  }
  return _auth
}

/**
 * Get the current user and session from the server-side request
 */
export async function getServerSession(event: any) {
  const auth = serverAuth()
  return await auth.api.getSession({
    headers: event.node.req.headers,
  })
}
