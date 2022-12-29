<script setup lang="ts">
import { TrackPlayCounts } from '~~/models/Song';

const { tracks } = defineProps<{
  tracks: TrackPlayCounts
}>();

let values = Object.entries(tracks);
values.sort(([_, a], [__, b]) => {
  return b.listenCount - a.listenCount
});

values = values.slice(0, 20);
</script>

<template>
  <div class="divide-y">
    <StatsTrack v-for="[key, value] in values" :track="value" />
  </div>
</template>
