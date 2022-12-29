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
  <div v-for="[key, value] in values" class="item">
    <div>
      <p>{{ key }}</p>
      <p class="text-xs">{{ value.song.master_metadata_album_artist_name }}</p>
    </div>

    <div class="flex flex-col justify-center text-end">
      <p><span>Listened</span> {{ value.listenCount }} <span>times</span></p>
      <p v-if="value.skipCount > 0"><span>skipped</span> {{ value.skipCount }} <span>times</span></p>
    </div>
  </div>
</template>
