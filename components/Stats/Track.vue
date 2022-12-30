<script setup lang="ts">
import { TrackPlayCount } from '~/models/Song';

defineProps<{
  track: TrackPlayCount
}>();
</script>

<template>
  <div class="item">
    <div>
      <p>{{ track.song.master_metadata_track_name }}</p>
      <p class="text-xs">{{ track.song.master_metadata_album_artist_name }}</p>
    </div>

    <div class="item-info">
      <slot name="right">
        <p>Listened {{ track.listenCount }} times</p>
        <p v-if="track.skipCount > 0">Skipped {{ track.skipCount }} times</p>
      
        <p> Played for average of 
          {{ Math.round(track.totalMsPlayed / track.listenCount / 1000) }} seconds
        </p>
      </slot>
    </div>
  </div>
</template>
