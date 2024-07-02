import type { History } from '~/models/history'

export const getSongId = (payload: History) => {
  return payload.spotify_track_uri?.split(':').at(-1)
}
