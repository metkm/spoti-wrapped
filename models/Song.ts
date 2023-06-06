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
  nodes: {
    [key: number]: MsPlayedByYears
  },
  songsListened: Song[],
  albumsListened: string[]
  name: string,
  totalMsPlayed: number
}

export interface SkipEndReasons {
  startReasons: {
    [key: string]: number
  },
  endReasons: {
    [key: string]: number
  }
}

export interface TrackPlayCounts {
  [key: string]: TrackPlayCount
}

export interface TrackPlayCount {
  song: Song,
  listenCount: number,
  skipCount: number,
  totalMsPlayed: number,
  firstListenDate: Date
}

export interface WrappedResult {
  msPlayedByYears: MsPlayedByYears,
  skipEndReasons: SkipEndReasons,
  incognitoCount: number,
  shuffleCount: number,
  offlineCount: number,
  totalRecordCount: number,
  trackPlayCounts: TrackPlayCounts,
  albumPlayCounts: {
    [key: string]: number
  }
}
