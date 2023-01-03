<script setup lang="ts">
import { MsPlayedByYears } from '~~/models/Song';

const hidePercentage = ref(false);

defineProps<{
  dateNodes: MsPlayedByYears,
}>();
</script>

<template>
  <div class="flex flex-col gap-2 min-h-0">
    <div 
      v-for="[key, value] in Object.entries(dateNodes.nodes)"
      class="p-2 lg:p-4 relative shadow border-y"
    >
      <div
        v-if="!hidePercentage"
        class="absolute bg-green-500 inset-x-0 top-0 h-1" 
        :style="{ width: `${value.totalMsPlayed / dateNodes.totalMsPlayed * 100}%` }" 
      />
  
      <div class="flex flex-col gap-2 relative">
        <div>
          <p class="text-lg font-bold">{{ value.name }} {{ key }}</p>
          <p class="text-sm text-neutral-600">
            Total of {{ msToMinutes(value.totalMsPlayed) }} minutes
          </p>

          <div class="flex gap-2">
            <div class="most-listened">
              <p class="text-xs">Song you've listened to most.</p>
              <StatsDateNodeMostListenedTrack :songs="value.songsListened" />
            </div>
            <div class="most-listened">
              <p class="text-xs">Album you've listened to most.</p>
              <StatsDateNodeMostListenedAlbum :albums="value.albumsListened" />
            </div>
          </div>
        </div>

        <StatsDateNodeShowMore v-if="value.name !== 'Day'" v-model="hidePercentage" :nodes="value" />
      </div>
    </div>
  </div>
</template>

