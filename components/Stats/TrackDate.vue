<script setup lang="ts">
import { MsPlayedByYears } from '~~/models/Song';

const hidePercentage = ref(false);

defineProps<{
  dateNodes: MsPlayedByYears,
}>();
</script>

<template>
  <div class="">
    <div 
      v-for="[key, value] in Object.entries(dateNodes.nodes)"
      class="rounded border p-4 my-1 relative overflow-hidden shadow"
    >
      <div
        v-if="!hidePercentage"
        class="bg-green-500 bg-opacity-50 absolute inset-0 -z-10" 
        :style="{ width: `${value.totalMsPlayed / dateNodes.totalMsPlayed * 100}%` }" 
      />
  
      <div class="relative">
        <div>
          <p class="text-lg font-bold">{{ value.name }} {{ key }}</p>
          <p class="text-sm text-neutral-600">
            Total of {{ msToMinutes(value.totalMsPlayed) }} minutes
          </p>

          <div class="border rounded-lg p-2 opacity-70">
            <p class="text-xs">The song you've listened to most.</p>
            <StatsTrackMostListened :songs="value.songsListened" />
          </div>
        </div>

        <StatsShowMore v-if="value.name !== 'Day'" v-model="hidePercentage" :nodes="value" />
      </div>
    </div>
  </div>
</template>
