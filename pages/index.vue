<script setup lang="ts">
import { Song, WrappedResult } from "../models/Song";

type Status = "loaded" | "loading" | "waiting";

const loadStatus = ref<Status>("waiting");
const fileContents = ref();

const wrappedResults = reactive<WrappedResult>({
  msPlayedByYears: {
    nodes: {},
    name: "Year",
    totalMsPlayed: 0
  },
  trackPlayCounts: {}
});

watch(fileContents, async (contents: Song[]) => {
  loadStatus.value = "loading";

  for (const song of contents) {
    wrappedResults.msPlayedByYears.totalMsPlayed += song.ms_played;

    if (
      song.master_metadata_track_name && 
      !wrappedResults.trackPlayCounts.hasOwnProperty(song.master_metadata_track_name)
    ) {
      wrappedResults.trackPlayCounts[song.master_metadata_track_name] = {
        song,
        count: 0
      };
    } else if (song.master_metadata_track_name) {
      wrappedResults.trackPlayCounts[song.master_metadata_track_name].count += 1;
    }

    let datetime = new Date(song.ts);
    let year = datetime.getFullYear();
    let month = datetime.getMonth();
    let day = datetime.getDate();
    
    // the year doesn't exist. create it.
    if (!wrappedResults.msPlayedByYears.nodes[year]) {
      wrappedResults.msPlayedByYears.nodes[year] = {
        nodes: {},
        name: "Year",
        totalMsPlayed: song.ms_played
      };
    } else {
      wrappedResults.msPlayedByYears.nodes[year].totalMsPlayed += song.ms_played;
    }

    // the month doesn't exist.
    if (!wrappedResults.msPlayedByYears.nodes[year].nodes[month]) {
      wrappedResults.msPlayedByYears.nodes[year].nodes[month] = {
        nodes: {},
        name: "Month",
        totalMsPlayed: song.ms_played
      }
    } else {
      wrappedResults.msPlayedByYears.nodes[year].nodes[month].totalMsPlayed += song.ms_played;
    }

    // if day doesn't exist
    if (!wrappedResults.msPlayedByYears.nodes[year].nodes[month].nodes[day]) {
      wrappedResults.msPlayedByYears
        .nodes[year]
        .nodes[month]
        .nodes[day] = {
          nodes: {},
          name: "Day",
          totalMsPlayed: song.ms_played
        }
    } else {
      wrappedResults.msPlayedByYears
        .nodes[year]
        .nodes[month]
        .nodes[day]
        .totalMsPlayed += song.ms_played;
    }
  }

  loadStatus.value = "loaded";
})
</script>

<template>
  <main class="flex flex-col max-w-7xl mx-auto gap-5 p-2 lg:p-10">
    <UploadButton v-model="fileContents" />

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
    </template>
  </main>
</template>

