import type { UseFetchOptions } from 'nuxt/app'

export const useSpotifyFetch = <T>(
  url: string | (() => string),
  options?: Omit<UseFetchOptions<T>, 'default'>,
) => {
  const config = useRuntimeConfig()
  const { tokens } = useTokens()

  return useFetch(url, {
    ...options,
    baseURL: config.public.SPOTIFY_BASE_URI,
    headers: {
      Authorization: `Bearer ${tokens.value?.access_token}`,
    },
  })
}
