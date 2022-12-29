import { Song } from "~~/models/Song";

export const mostFrequentSong = (
  songs: Song[]
) => {
  if (songs.length < 1) return [];

  let seen: Record<string, {
    song: Song,
    seenCount: number
  }> = {};

  for (let index = 0; index < songs.length; index++) {
    const song = songs[index];

    if (!song.master_metadata_track_name) continue;

    if (!seen[song.master_metadata_track_name]) {
      seen[song.master_metadata_track_name] = {
        song,
        seenCount: 0
      }
    } else {
      seen[song.master_metadata_track_name].seenCount += 1;
    }
  }

  songs.sort((firstSong, secondSong) => {
    let firstSongSeenCount = seen[firstSong.master_metadata_track_name!].seenCount;
    let secondSongSeenCount = seen[secondSong.master_metadata_track_name!].seenCount;

    return secondSongSeenCount - firstSongSeenCount;
  });

  return Object.values(seen)
    .map(value => {
      return value.song
    })
}
