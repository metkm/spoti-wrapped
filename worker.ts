import { WrappedResult, Song } from "~~/models/Song";
import { Jobs } from "./models/Worker";


const prepareWrappedResult = (songs: Song[]) => {
  let wrappedResult: WrappedResult = {
    msPlayedByYears: {
      name: "Year",
      nodes: {},
      songsListened: [],
      totalMsPlayed: 0
    },
    trackPlayCounts: {}
  };
  
  for (const song of songs) {
    wrappedResult.msPlayedByYears!.totalMsPlayed += song.ms_played;
    if (!song.master_metadata_track_name) continue;

    if (!wrappedResult.trackPlayCounts[song.master_metadata_track_name]) {
      wrappedResult.trackPlayCounts[song.master_metadata_track_name] = {
        song,
        count: 0
      };
    } else {
      wrappedResult.trackPlayCounts[song.master_metadata_track_name].count += 1;
    }

    let date = new Date(song.ts);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    // the year doesn't exist. create it.
    if (!wrappedResult.msPlayedByYears.nodes[year]) {
      wrappedResult.msPlayedByYears.nodes[year] = {
        nodes: {},
        name: "Year",
        songsListened: [],
        totalMsPlayed: song.ms_played
      };
    } else {
      wrappedResult.msPlayedByYears.nodes[year].totalMsPlayed += song.ms_played;
      wrappedResult.msPlayedByYears.nodes[year].songsListened.push(song);
    }

    // the month doesn't exist.
    if (!wrappedResult.msPlayedByYears.nodes[year].nodes[month]) {
      wrappedResult.msPlayedByYears.nodes[year].nodes[month] = {
        nodes: {},
        songsListened: [],
        name: "Month",
        totalMsPlayed: song.ms_played
      }
    } else {
      wrappedResult.msPlayedByYears.nodes[year].nodes[month].totalMsPlayed += song.ms_played;
      wrappedResult.msPlayedByYears.nodes[year].nodes[month].songsListened.push(song);
    }

    // if day doesn't exist
    if (!wrappedResult.msPlayedByYears.nodes[year].nodes[month].nodes[day]) {
      wrappedResult.msPlayedByYears
        .nodes[year]
        .nodes[month]
        .nodes[day] = {
          nodes: {},
          songsListened: [],
          name: "Day",
          totalMsPlayed: song.ms_played
        }
    } else {
      wrappedResult.msPlayedByYears
        .nodes[year]
        .nodes[month]
        .nodes[day]
        .totalMsPlayed += song.ms_played;

      wrappedResult.msPlayedByYears
        .nodes[year]
        .nodes[month]
        .nodes[day]
        .songsListened.push(song);
    }
  }

  return wrappedResult
}

onmessage = async (event: MessageEvent<Jobs>) => {
  switch (event.data.job) {
    case "parseFiles":
      let parsedContents: Song[] = [];

      for (const file of event.data.args as FileList) {
        let result = await readFile(file);
        let parsed: Song[] = JSON.parse(result);

        parsedContents.push(...parsed);
      }

      let result = prepareWrappedResult(parsedContents);
      postMessage(result);

      break;
    default:
      break;
  }
}
