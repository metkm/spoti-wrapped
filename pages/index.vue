<script setup lang="ts">
import { WrappedResult } from '~~/models/Song';

const wrappedResult = shallowRef<WrappedResult>();

const example = async () => {
  const data = await import("../assets/example.json?raw");
  const worker = useWorker();

  worker.postMessage({
    job: "parseFiles",
    contents: data.default
  })

  worker.addEventListener("message", (event: MessageEvent<WrappedResult>) => {
    wrappedResult.value = event.data;
  })
}
</script>

<template>
  <main class="flex flex-col max-w-7xl mx-auto gap-4 p-2 lg:p-10">
    <div class="space-y-2">
      <UploadButton v-model="wrappedResult" />
      <BaseButton @click="example">Show Example</BaseButton>
    </div>

    <Section v-if="!wrappedResult" :title="'How to use this thing?'" class="flex flex-col gap-4 p-4">
      <a class="absolute right-2 top-2" href="https://github.com/metkm/spoti-wrapped">
        <IconsGithub class="h-8 aspect-square" />
      </a>

      <div>
        <p>
          First, you should go to the <a href="https://www.spotify.com/us/account/privacy/"
            class="text-green-500">Spotify
            Privacy</a> page.
          Request your Extended Streaming History and wait for Spotify to send your data to your email.
        </p>

        <p class="mt-4">
          If you have your data already downloaded, click the upload button and
          select all the files that starts with <span class="bg-neutral-200 p-1 rounded">endsong_NUMBER</span> and
          ends with <span class="bg-neutral-200 p-1 rounded">.json</span> in the folder you have downloaded.
        </p>
      </div>
    </Section>

    <template v-else>
      <Section :title="'How many times you\'ve listened to same tracks?'">
        <StatsTracksMostListened :tracks="wrappedResult.trackPlayCounts" />
      </Section>

      <Section :title="'The albums you\'ve listened the most.'">
        <StatsAlbumsMostListened :albums="wrappedResult.albumPlayCounts" />
      </Section>

      <Section :title="'First time you listened to a song.'">
        <StatsTracksFirstListened :tracks="wrappedResult.trackPlayCounts" />
      </Section>

      <Section :title="'Dates with how much you\'ve listened.'"
        :desc="`Total of ${msToMinutes(wrappedResult.msPlayedByYears.totalMsPlayed)} minutes`">
        <StatsDateNode :dateNodes="wrappedResult.msPlayedByYears" />
      </Section>

      <Section :title="'The reasons why your tracks are ended or started.'"
        :desc="'I don\'t have idea what most of these means either.'">
        <div class="flex flex-col gap-5">
          <div v-for="[key, value] in Object.entries(wrappedResult.skipEndReasons)">
            <p class="font-bold text-center">{{ key.toLocaleUpperCase() }}</p>

            <StatsTracksStartEndReasons :reasons="value" />
          </div>
        </div>
      </Section>

      <Section :title="'Incognito'"
        :desc="'Count of how many tracks you\'ve listened to while you were in incognito mode.'">
        <StatsBar :count="wrappedResult.incognitoCount" :totalCount="wrappedResult.totalRecordCount" />
      </Section>

      <Section :title="'Shuffle'" :desc="'Count of how many times you left the shuffle mode open.'">
        <StatsBar :count="wrappedResult.shuffleCount" :totalCount="wrappedResult.totalRecordCount" />
      </Section>

      <Section :title="'Offline'" :desc="'Count of whether the track was played in offline mode.'">
        <StatsBar :count="wrappedResult.offlineCount" :totalCount="wrappedResult.totalRecordCount" />
      </Section>

      <Section :title="'Skipped Tracks'" :desc="'Tracks that you skipped the most.'">
        <StatsTracksMostSkipped :tracks="wrappedResult.trackPlayCounts" />
      </Section>
    </template>
  </main>
</template>
