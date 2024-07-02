import type { AsyncDataOptions } from '#app'

type FetchOptions = Parameters<typeof $fetch>[1]

interface Options<T> {
  key: string
  url: string
  options?: FetchOptions
  optionsAsyncData?: AsyncDataOptions<T>
}

export const useSpotifyFetch = <T>({
  key,
  url,
  options,
  optionsAsyncData,
}: Options<T>) => {
  const config = useRuntimeConfig()
  const { tokens } = useTokens()

  return useAsyncData<T>(
    key,
    () => {
      return $fetch(url, {
        ...options,
        baseURL: config.public.SPOTIFY_BASE_URI,
        headers: {
          ...options?.headers,
          Authorization: `Bearer ${tokens.value?.access_token}`,
        },
      })
    },
    optionsAsyncData,
  )
}
