export const mostFrequent = <K extends keyof any, T extends Record<K, any>>(
  songs: T[],
  fieldToUse: K
) => {
  if (songs.length < 1) return [];

  let newSongList: T[] = [];
  let seen: Record<any, any> = {};

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
