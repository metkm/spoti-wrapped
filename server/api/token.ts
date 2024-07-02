import type { Tokens } from '~/models/tokens'

export default defineEventHandler(async (event) => {
  const code = getQuery(event).code as string | undefined

  if (!code) {
    throw createError({
      message: 'Code is a required parameter',
    })
  }

  const config = useRuntimeConfig()
  const authorization = `Basic ${(Buffer.from(`${config.public.SPOTIFY_CLIENT_ID}:${config.SPOTIFY_CLIENT_SECRET}`)).toString('base64')}`

  const response = await $fetch<Tokens>('https://accounts.spotify.com/api/token', {
    method: 'POST',
    params: {
      grant_type: 'authorization_code',
      redirect_uri: config.public.SPOTIFY_REDIRECT_URI,
      code,
    },
    headers: {
      'Authorization': authorization,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  return response
})
