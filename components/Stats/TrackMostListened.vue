<script setup lang="ts">
import { Song } from '~~/models/Song';

const { songs } = defineProps<{
  songs: Song[]
}>()

let sorted = mostFrequentSong(songs);
</script>

<template>
  <div class="mt-2">
    <p>{{ sorted[0].master_metadata_track_name }}</p>
    <p class="text-xs">{{ sorted[0].master_metadata_album_artist_name }}</p>
  </div>
</template>
