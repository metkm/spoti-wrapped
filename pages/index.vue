<script setup lang="ts">
import { WrappedResult } from '~~/models/Song';

const wrappedResult = ref<WrappedResult>();
</script>

<template>
  <main class="flex flex-col max-w-7xl mx-auto gap-5 p-2 lg:p-10">
    <UploadButton v-model="wrappedResult" />

    <template v-if="wrappedResult">
      <div class="section">
        <p class="section-head">How many times you've listened to same tracks?</p>

        <StatsTracks :tracks="wrappedResult.trackPlayCounts" />
      </div>

      <div class="section">
        <p class="section-head">
          Dates with how much you've listened. Total of 
          {{ msToMinutes(wrappedResult.msPlayedByYears.totalMsPlayed) }} minutes
        </p>
        
        <StatsTrackDate :dateNodes="wrappedResult.msPlayedByYears" />
      </div>
    </template>
  </main>
</template>
