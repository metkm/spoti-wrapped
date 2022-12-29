<script setup lang="ts">
import { Song } from '~~/models/Song';

const { songs } = defineProps<{
  songs: Song[]
}>()

let sorted = mostFrequentSong(songs).slice(0, 2);
</script>

<template>
  <div v-for="song in sorted" class="mt-2">
    <p>{{ song.master_metadata_track_name }}</p>
    <p class="text-xs">{{ song.master_metadata_album_artist_name }}</p>
  </div>
</template>
