type Types = {
  "files": File[]
}

interface Events {
  type: keyof Types,
  data: Types[keyof Types]
}

interface File {
  conn_country: string,
  episode_name: null,
  episode_show_name: null,
  incognito_mode: boolean;
  ip_addr_decrypted: string,
  master_metadata_album_album_name: string,
  master_matadata_album_artist_name: string,
  master_metadata_track_name: string,
  ms_played: number,
  offline: boolean,
  offline_timestamp: number,
  platform: string,
  reason_end: string,
  reason_start: string,
  shuffle: boolean,
  skipped: null | boolean,
  spotify_episode_uri: null | string,
  spotify_track_uri: string,
  ts: string,
  user_agent_decrypted: string,
  username: string
}

onmessage = async ({ data: { data, type } }: MessageEvent<Events>) => {
  if (type === "files") {
    for (const file of data) {
      const contents = await readFile(file);
      const parsed = JSON.parse(contents);

      console.log(parsed);
    }
  }
}
