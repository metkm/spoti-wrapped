import type { Owner } from './playlist'
import type { Album, Artist, ExternalIds, ExternalUrls } from './spotify'

export interface TrackItem {
  added_at: string
  added_by: Owner
  is_local: boolean
  primary_color: string | null
  track: Track
  video_thumbnail: {
    url: string | null
  }
}

export interface Track {
  album: Album
  artists: Artist[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: ExternalIds
  external_urls: ExternalUrls
  href: string
  id: string
  is_local: boolean
  name: string
  popularity: number
  preview_url?: string
  track_number: number
  type: string
  uri: string
}
