<script setup lang="ts">
import { TrackPlayCounts } from '~/models/Song';

const { tracks } = defineProps<{
  tracks: TrackPlayCounts
}>();

let values = Object.entries(tracks);
values.sort(([_, a], [__, b]) => {
  return b.skipCount - a.skipCount
});

values = values.slice(0, 20);
</script>

<template>
  <div class="divide-y">
    <div v-for="[key, value] in values" class="item">
      <div>
        <p>{{ key }}</p>
        <p class="text-xs">{{ value.song.master_metadata_album_artist_name }}</p>
      </div>

      <div class="flex flex-col justify-center text-end">
        <p><span>Skipped</span> {{ value.skipCount }} <span>times</span></p>
      </div>
    </div>
  </div>
</template>