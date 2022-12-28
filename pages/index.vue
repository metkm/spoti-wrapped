<script setup lang="ts">
// import { Song, WrappedResult } from '~~/models/Song';

// type WorkStatus = "waiting" | "processing" | "done";

// const currentStatus = ref<WorkStatus>("waiting");
// const fileContents = ref();
// // const wrappedResults = reactive<WrappedResult>({
// //   trackPlayCounts: {}
// // });

// const workerMessageHandler = (event: MessageEvent) => {
//   console.log(event.data);

//   currentStatus.value = "done";
// }

// // the contents gets parsed and then gets strintified just to get parsed again. 
// // Maybe there is a better way?
// watch(fileContents, (songs: Song[]) => {
//   currentStatus.value = "processing";
//   console.log("creating worker");
  
//   const worker = new Worker(
//     new URL("./worker.ts", import.meta.url),
//     { type: "module" }
//   );

//   console.log("postmessage");
//   worker.postMessage({
//     job: "parseResults",
//     args: JSON.stringify(songs)
//   });
//   console.log("postmessage end");

//   worker.addEventListener("message", workerMessageHandler);
// })

// // import { Song, WrappedResult } from "../models/Song";

// // type Status = "loaded" | "loading" | "waiting";

// // const worker = new Worker(new URL("./worker.ts", import.meta.url), {
// //   type: "module"
// // });

// // const loadStatus = ref<Status>("waiting");
// // const fileContents = ref();

// // const wrappedResults = reactive<WrappedResult>({
// //   msPlayedByYears: {
// //     nodes: {},
// //     name: "Year",
// //     songsListened: [],
// //     totalMsPlayed: 0
// //   },
// //   trackPlayCounts: {}
// // });

// // watch(fileContents, async (contents: Song[]) => {
// //   loadStatus.value = "loading";

// //   for (const song of contents) {
// //     wrappedResults.msPlayedByYears.totalMsPlayed += song.ms_played;

// //     if (!song.master_metadata_track_name) continue;

// //     if (!wrappedResults.trackPlayCounts.hasOwnProperty(song.master_metadata_track_name)) {
// //       wrappedResults.trackPlayCounts[song.master_metadata_track_name] = {
// //         song,
// //         count: 0
// //       };
// //     } else if (song.master_metadata_track_name) {
// //       wrappedResults.trackPlayCounts[song.master_metadata_track_name].count += 1;
// //     }

// //     let datetime = new Date(song.ts);
// //     let year = datetime.getFullYear();
// //     let month = datetime.getMonth();
// //     let day = datetime.getDate();
    
// //     // the year doesn't exist. create it.
// //     if (!wrappedResults.msPlayedByYears.nodes[year]) {
// //       wrappedResults.msPlayedByYears.nodes[year] = {
// //         nodes: {},
// //         name: "Year",
// //         songsListened: [],
// //         totalMsPlayed: song.ms_played
// //       };
// //     } else {
// //       wrappedResults.msPlayedByYears.nodes[year].totalMsPlayed += song.ms_played;
// //       wrappedResults.msPlayedByYears.nodes[year].songsListened.push(song);
// //     }

// //     // the month doesn't exist.
// //     if (!wrappedResults.msPlayedByYears.nodes[year].nodes[month]) {
// //       wrappedResults.msPlayedByYears.nodes[year].nodes[month] = {
// //         nodes: {},
// //         songsListened: [],
// //         name: "Month",
// //         totalMsPlayed: song.ms_played
// //       }
// //     } else {
// //       wrappedResults.msPlayedByYears.nodes[year].nodes[month].totalMsPlayed += song.ms_played;
// //       wrappedResults.msPlayedByYears.nodes[year].nodes[month].songsListened.push(song);
// //     }

// //     // if day doesn't exist
// //     if (!wrappedResults.msPlayedByYears.nodes[year].nodes[month].nodes[day]) {
// //       wrappedResults.msPlayedByYears
// //         .nodes[year]
// //         .nodes[month]
// //         .nodes[day] = {
// //           nodes: {},
// //           songsListened: [],
// //           name: "Day",
// //           totalMsPlayed: song.ms_played
// //         }
// //     } else {
// //       wrappedResults.msPlayedByYears
// //         .nodes[year]
// //         .nodes[month]
// //         .nodes[day]
// //         .totalMsPlayed += song.ms_played;

// //       wrappedResults.msPlayedByYears
// //         .nodes[year]
// //         .nodes[month]
// //         .nodes[day]
// //         .songsListened.push(song);
// //     }
// //   }

  
// //   loadStatus.value = "loaded";
// // })
</script>

<template>
  <main class="flex flex-col max-w-7xl mx-auto gap-5 p-2 lg:p-10">
    <UploadButton />

    <!-- <p v-if="currentStatus === 'waiting'">Click the button to start uploading.</p>
    <p v-else-if="currentStatus === 'processing'">Processing your data.</p>
    <p v-else>Done.</p> -->

    <!-- <UploadButton v-model="fileContents" />

    <template v-if="loadStatus === 'waiting'">
      <p>Start Loading Your Spotify Data!</p>
    </template>
    <template v-else-if="loadStatus === 'loading'">
      <p>Loading...</p>
    </template>
    <template v-else>
      <div class="section">
        <p class="section-head">How many times you've listened to same tracks?</p>

        <StatsTracks :tracks="wrappedResults.trackPlayCounts" />
      </div>

      <div class="section">
        <p class="section-head">
          Dates with how much you've listened. Total of 
          {{ msToMinutes(wrappedResults.msPlayedByYears.totalMsPlayed) }} minutes
        </p>
        
        <StatsTrackDate :dateNodes="wrappedResults.msPlayedByYears" />
      </div>
    </template> -->
  </main>
</template>

