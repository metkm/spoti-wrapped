<script setup lang="ts">
import { ref } from "vue";
import { refDebounced } from "@vueuse/core";
import { TrackPlayCounts, TrackPlayCount } from "~/models/Song";

const { tracks } = defineProps<{
  tracks: TrackPlayCounts;
}>();

const query = ref("");
const queryDebounced = refDebounced(query, 1000);

const results = computed(() => {
  let x = Object.entries(tracks).filter(([key, value]) =>
    value.song.master_metadata_track_name
      ?.toLowerCase()
      .includes(queryDebounced.value.toLowerCase())
  );

  x = x.slice(0, 20);

  let y: Record<string, TrackPlayCount> = {};
  for (const [key, value] of x) {
    if (!value.song.master_metadata_track_name) continue;
    y[value.song.master_metadata_track_name] = value;
  }

  return y;
});
</script>

<template>
  <input
    v-model="query"
    class="rounded border px-4 py-2 m-4"
    placeholder="Search tracks"
  />

  <ul class="divide-y">
    <li
      v-for="result in results"
      :key="result.totalMsPlayed"
      class="p-2 hover:bg-neutral-100"
    >
      <p>{{ result.song.master_metadata_track_name }}</p>
      <p class="text-xs">First Listened in {{ result.firstListenDate.toDateString() }}</p>
    </li>
  </ul>
</template>
