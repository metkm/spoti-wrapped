import readFile from "~/utils/ReadFile";
import { WrappedResult, Song } from "~~/models/Song";
import { Jobs } from "./models/Worker";


const prepareWrappedResult = (songs: Song[]) => {
  let wrappedResult: WrappedResult = {
    msPlayedByYears: {
      albumsListened: [],
      songsListened: [],
      name: "Year",
      nodes: {},
      totalMsPlayed: 0
    },
    trackPlayCounts: {},
    skipEndReasons: {
      endReasons: {},
      startReasons: {}
    },
    albumPlayCounts: {},
    incognitoCount: 0,
    totalRecordCount: 0
  };
  
  for (const song of songs) {
    wrappedResult.msPlayedByYears!.totalMsPlayed += song.ms_played;
    
    if (song.incognito_mode) {
      wrappedResult.incognitoCount += 1;
    }
    
    if (!song.master_metadata_track_name) continue;

    wrappedResult.skipEndReasons.startReasons[song.reason_start] = 
      (wrappedResult.skipEndReasons.startReasons[song.reason_start] || 0) + 1
      
    wrappedResult.skipEndReasons.endReasons[song.reason_end] = 
      (wrappedResult.skipEndReasons.endReasons[song.reason_end] || 0) + 1

    wrappedResult.albumPlayCounts[song.master_metadata_album_album_name] = 
      (wrappedResult.albumPlayCounts[song.master_metadata_album_album_name] || 0) + 1;

    if (!wrappedResult.trackPlayCounts[song.master_metadata_track_name]) {
      wrappedResult.trackPlayCounts[song.master_metadata_track_name] = {
        song,
        listenCount: 0,
        skipCount: 0
      };
    } else {
      wrappedResult.trackPlayCounts[song.master_metadata_track_name].listenCount += 1;
      if (song.skipped) {
        wrappedResult.trackPlayCounts[song.master_metadata_track_name].skipCount += 1;
      }
    }

    let date = new Date(song.ts);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    // the year doesn't exist. create it.
    if (!wrappedResult.msPlayedByYears.nodes.hasOwnProperty(year)) {
      wrappedResult.msPlayedByYears.nodes[year] = {
        albumsListened: [],
        songsListened: [],
        name: "Year",
        nodes: {},
        totalMsPlayed: 0
      }
    }

    wrappedResult.msPlayedByYears.nodes[year].songsListened.push(song);
    wrappedResult.msPlayedByYears.nodes[year].albumsListened.push(song.master_metadata_album_album_name);
    wrappedResult.msPlayedByYears.nodes[year].totalMsPlayed += song.ms_played;
    ///////////

    // the month doesn't exist.
    if (!wrappedResult.msPlayedByYears.nodes[year].nodes.hasOwnProperty(month)) {
      wrappedResult.msPlayedByYears.nodes[year].nodes[month] = {
        albumsListened: [],
        songsListened: [],
        name: "Month",
        nodes: {},
        totalMsPlayed: 0
      }
    }

    wrappedResult.msPlayedByYears.nodes[year].nodes[month].songsListened.push(song);
    wrappedResult.msPlayedByYears.nodes[year].nodes[month].albumsListened.push(song.master_metadata_album_album_name);
    wrappedResult.msPlayedByYears.nodes[year].nodes[month].totalMsPlayed += song.ms_played;
    /////////////////////

    // if day doesn't exist
    if (!wrappedResult.msPlayedByYears.nodes[year].nodes[month].nodes.hasOwnProperty(day)) {
      wrappedResult.msPlayedByYears.nodes[year].nodes[month].nodes[day] = {
        albumsListened: [],
        songsListened: [],
        name: "Day",
        nodes: {},
        totalMsPlayed: 0
      }
    }

    wrappedResult.msPlayedByYears.nodes[year].nodes[month].nodes[day].songsListened.push(song);
    wrappedResult.msPlayedByYears.nodes[year].nodes[month].nodes[day].albumsListened.push(song.master_metadata_album_album_name);
    wrappedResult.msPlayedByYears.nodes[year].nodes[month].nodes[day].totalMsPlayed += song.ms_played;
  }

  wrappedResult.totalRecordCount = songs.length;

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
