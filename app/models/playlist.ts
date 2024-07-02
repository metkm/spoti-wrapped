import type { Image, ExternalUrls } from './spotify'

export interface Playlist {
  collaborative: boolean
  description: string
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[] | null
  name: string
  owner: Owner
  public: boolean
  snapshot_id: string
  tracks: Tracks
  type: string
  uri: string
}

export interface Owner {
  followers: Followers
  href: string
  id: string
  type: string
  uri: string
  display_name: string
}

export interface Followers {
  href: string
  total: number
}

export interface Tracks {
  href: string
  total: number
}
