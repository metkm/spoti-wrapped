<script setup lang="ts">
import { Song } from '~~/models/Song';

const { tracks } = defineProps<{
  tracks: {
    [key: string]: {
      song: Song,
      count: number
    }
  }
}>();

let values = Object.entries(tracks);
values.sort(([_, a], [__, b]) => {
  return b.count - a.count
});

values = values.slice(0, 30);
</script>

<template>
  <div v-for="[key, value] in values" class="track">
    <div>
      <p>{{ key }}</p>
      <p class="text-xs">{{ value.song.master_metadata_album_artist_name }}</p>
    </div>

    <p>{{ value.count }} <span>times</span></p>
  </div>
</template>
