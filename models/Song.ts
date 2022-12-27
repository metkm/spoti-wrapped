export interface Song {
  ts: string
  username: string
  platform: string
  ms_played: number
  conn_country: string
  ip_addr_decrypted: string
  user_agent_decrypted: string
  master_metadata_track_name: string | null
  master_metadata_album_artist_name: string
  master_metadata_album_album_name: string
  spotify_track_uri: string
  episode_name: any
  episode_show_name: any
  spotify_episode_uri: any
  reason_start: string
  reason_end: string
  shuffle: boolean
  skipped: any
  offline: boolean
  offline_timestamp: number
  incognito_mode: boolean
}

export interface MsPlayedByYears {
  years: {
    [key: number]: {
      months: {
        [key: number]: {
          days: {
            [key: number]: number
          }
          totalMsPlayed: number
        }
      },
      totalMsPlayed: number
    }
  }
  totalMsPlayed: number
}

export interface WrappedResult {
  msPlayedByYears: MsPlayedByYears,
  trackPlayCounts: {
    [key: string]: any
  },
}
