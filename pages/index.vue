<script setup lang="ts">
import { WrappedResult } from '~~/models/Song';

const wrappedResult = shallowRef<WrappedResult>();
</script>

<template>
  <main class="flex flex-col max-w-7xl mx-auto gap-5 p-2 lg:p-10">
    <UploadButton v-model="wrappedResult" />

    <template v-if="wrappedResult">
      <Section>
        <template #head>
          <p class="title">How many times you've listened to same tracks?</p>
        </template>
        <StatsTracks :tracks="wrappedResult.trackPlayCounts" />
      </Section>

      <Section>
        <template #head>
          <p class="title">The albums you've listened the most.</p>
        </template>
        
        <StatsAlbums :albums="wrappedResult.albumPlayCounts" />
      </Section>

      <Section>
        <template #head>
          <p class="title">Dates with how much you've listened.</p>
          <p class="desc"> Total of {{ msToMinutes(wrappedResult.msPlayedByYears.totalMsPlayed) }} minutes</p>
        </template>
        
        <StatsTrackDate :dateNodes="wrappedResult.msPlayedByYears" />
      </Section>

      <Section>
        <template #head>
          <p class="title">The reasons why your tracks are ended or started.</p>
          <p class="desc">I don't have idea what most of these means either.</p>
        </template>

        <div class="flex flex-col gap-5">
          <div v-for="[key, value] in Object.entries(wrappedResult.skipEndReasons)">
            <p class="font-bold text-center">{{ key.toLocaleUpperCase() }}</p>
  
            <StatsTrackStartEndReasons :reasons="value" />
          </div>
        </div>
      </Section>

      <Section>
        <template #head>
          <p class="title">Incognito</p>
          <p class="desc">Count of how many tracks you've listened to while you were in incognito mode.</p>
        </template>

        <StatsIncognito 
          :incognitoCount="wrappedResult.incognitoCount"
          :totalRecordCount="wrappedResult.totalRecordCount"
        />
      </Section>

      <Section>
        <template #head>
          <p class="title">Skipped Tracks</p>
          <p class="desc">Tracks that you skipped the most.</p>
        </template>

        <StatsTracksMostSkipped :tracks="wrappedResult.trackPlayCounts" />
      </Section>
    </template>
  </main>
</template>
