import { Song } from "~~/models/Song";

export const mostFrequent = (
  songs: Song[],
  fieldToUse: keyof Song
) => {
  if (songs.length < 1) return [];

  let newSongList: Song[] = [];
  let seen: Record<string, number> = {};

  for (let index = 0; index < songs.length; index++) {
    const song = songs[index];

    if (!song[fieldToUse]) continue;

    if (!seen.hasOwnProperty(song[fieldToUse])) {
      seen[song[fieldToUse]] = 0;
      newSongList.push(song);
    } else {
      seen[song[fieldToUse]] += 1;
    }
  }

  newSongList.sort((firstSong, secondSong) => {
    let firstSongSeenCount = seen[firstSong[fieldToUse]!];
    let secondSongSeenCount = seen[secondSong[fieldToUse]!];

    return secondSongSeenCount - firstSongSeenCount;
  });

  return newSongList;
}
