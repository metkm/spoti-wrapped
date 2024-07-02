export interface History {
  conn_country: string
  episode_name: string | null
  episode_show_name: string | null
  incognito_mode: boolean
  ip_addr_decrypted: string
  master_metadata_album_album_name: string
  master_metadata_album_artist_name: string
  master_metadata_track_name: string | null
  ms_played: number
  offline: boolean
  offline_timestamp: number
  platform: string
  reason_end: string
  reason_start: string
  shuffle: boolean
  skipped: boolean | null
  spotify_episode_uri: string | null
  spotify_track_uri: string | null
  ts: string
  user_agent_decrypted: string
  username: string
}
