<script setup lang="ts">
import { WrappedResult } from '~~/models/Song';

const wrappedResult = shallowRef<WrappedResult>();
</script>

<template>
  <main class="flex flex-col max-w-7xl mx-auto gap-5 p-2 lg:p-10">
    <UploadButton v-model="wrappedResult" />

    <Section v-if="!wrappedResult">
      <template #head>
        <p class="title">How to use this thing?</p>
      </template>

      <div class="p-4">
        <p>
          First, you should go to the <a href="https://www.spotify.com/us/account/privacy/" class="text-green-500">Spotify
            Privacy</a> page.
          Request your data and wait for Spotify to send your data to your email.
        </p>

        <p class="mt-4">
          If you have your data already downloaded, click the upload button and
          select all the files that starts with <span class="bg-neutral-200 p-1 rounded">endsong_NUMBER</span> and
          ends with <span class="bg-neutral-200 p-1 rounded">.json</span> in the folder you have downloaded.
        </p>
      </div>
    </Section>

    <template v-else>
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

        <StatsBar 
          :count="wrappedResult.incognitoCount"
          :totalCount="wrappedResult.totalRecordCount"
        />
      </Section>

      <Section>
        <template #head>
          <p class="title">Shuffle</p>
          <p class="desc">Count of how many times you left the shuffle mode open.</p>
        </template>

        <StatsBar 
          :count="wrappedResult.shuffleCount"
          :totalCount="wrappedResult.totalRecordCount"
        />
      </Section>

      <Section>
        <template #head>
          <p class="title">Offline</p>
          <p class="desc">Count of whether the track was played in offline mode.</p>
        </template>

        <StatsBar 
          :count="wrappedResult.offlineCount"
          :totalCount="wrappedResult.totalRecordCount"
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
