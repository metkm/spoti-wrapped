<script setup lang="ts">
import { WrappedResult } from '~~/models/Song';

const wrappedResult = shallowRef<WrappedResult>();
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

      <div class="section">
        <p class="section-head">The reasons why your tracks are ended or started.</p>
        <p class="text-neutral-400">I don't have any what most of these means either.</p>

        <div v-for="[key, value] in Object.entries(wrappedResult.skipEndReasons)" class="p-4">
          <p class="font-bold text-center">{{ key.toLocaleUpperCase() }}</p>

          <StatsTrackStartEndReasons :reasons="value" />
        </div>
      </div>
    </template>
  </main>
</template>
