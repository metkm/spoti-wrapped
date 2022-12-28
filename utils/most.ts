import { Song } from "~~/models/Song";

export const mostFrequentSong = (
  songs: Song[]
) => {
  if (songs.length < 1) return [];

  let seen: Record<string, number> = {};

  for (let index = 0; index < songs.length; index++) {
    const song = songs[index];

    if (!song.master_metadata_track_name) continue;
    
    if (!seen[song.master_metadata_track_name]) {
      seen[song.master_metadata_track_name] = 1;
    } else {
      seen[song.master_metadata_track_name] += 1;
    }
  }

  songs.sort((firstSong, secondSong) => {
    let firstSongSeenCount = seen[firstSong.master_metadata_track_name!];
    let secondSongSeenCount = seen[secondSong.master_metadata_track_name!];

    return secondSongSeenCount - firstSongSeenCount;
  });

  return songs
}
