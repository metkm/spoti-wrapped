<script setup lang="ts">
import { MsPlayedByYears } from '~~/models/Song';

const hidePercentage = ref(false);

defineProps<{
  dateNodes: MsPlayedByYears,
}>();
</script>

<template>
  <div>
    <div 
      v-for="[key, value] in Object.entries(dateNodes.nodes)"
      class="rounded border p-4 my-1 relative overflow-hidden shadow"
    >
      <div
        v-if="!hidePercentage"
        class="bg-green-500 absolute inset-0 -z-10" 
        :style="{ width: `${value.totalMsPlayed / dateNodes.totalMsPlayed * 100}%` }" 
      />
  
      <p class="pl-2">
        {{ key }} - {{ hidePercentage }}
        <span class="text-xs">Total playtime {{ value.totalMsPlayed }}</span>
      </p>
  
      <StatsShowMore v-model="hidePercentage" :nodes="value" />
    </div>
  </div>
</template>
