<script setup lang="ts">
import { TrackPlayCount } from '~/models/Song';

defineProps<{
  track: TrackPlayCount
}>();
</script>

<template>
  <div>
    <p aria-label="Track name">{{ track.song.master_metadata_track_name }}</p>
    <p aria-label="Track artist name" class="text-xs">{{ track.song.master_metadata_album_artist_name }}</p>
  </div>

  <div class="item-info">
    <slot name="right">
      <p aria-label="Listen count of track">Listened {{ track.listenCount }} times</p>
      <p aria-label="Skip count of track" v-if="track.skipCount > 0">Skipped {{ track.skipCount }} times</p>
    
      <p aria-label="Average playtime of track in seconds"> Played for average of 
        {{ Math.round(track.totalMsPlayed / track.listenCount / 1000) }} seconds
      </p>
    </slot>
  </div>
</template>
