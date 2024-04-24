<script setup lang="ts">
import { TrackPlayCounts } from "~/models/Song";
import { refDebounced } from "@vueuse/core";

const props = defineProps<{
  tracks: TrackPlayCounts;
}>();

const query = ref("");
const queryDebounced = refDebounced(query, 1000);

const results = computed(() => {
  

  return Object.values(props.tracks)
    .sort((a, b) => b.skipCount - a.skipCount)
    .filter((value) =>
      value.song.master_metadata_track_name
        ?.toLowerCase()
        .includes(queryDebounced.value.toLowerCase())
    )
    .slice(0, 20)
});
</script>

<template>
  <div>
    <input
      v-model="query"
      class="rounded border px-4 py-2 m-4"
      placeholder="Search tracks"
    />

    <ul class="divide-y">
      <li
        v-for="res in results"
        :key="res.totalMsPlayed"
        class="flex justify-between p-2 hover:bg-neutral-100"
      >
        <StatsTracksTrack :track="res" />
      </li>
    </ul>
  </div>
</template>
