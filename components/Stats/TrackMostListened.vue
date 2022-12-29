<script setup lang="ts">
import { Song } from '~~/models/Song';

const { songs } = defineProps<{
  songs: Song[]
}>()

let sorted = mostFrequentObject(songs, "master_metadata_track_name").slice(0, 1);
</script>

<template>
  <div v-for="song in sorted">
    <p>{{ song.master_metadata_track_name }}</p>
    <p class="text-xs">{{ song.master_metadata_album_artist_name }}</p>
  </div>
</template>
