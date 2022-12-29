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

    <div class="flex flex-col justify-center text-end">
      <slot name="right">
        <p><span>Listened</span> {{ track.listenCount }} <span>times</span></p>
        <p v-if="track.skipCount > 0"><span>skipped</span> {{ track.skipCount }} <span>times</span></p>
      </slot>
    </div>
  </div>
</template>
