<script setup lang="ts">
import type { Parsed } from '~/models/parsed'

const runtimeConfig = useRuntimeConfig()
const { tokens } = useTokens()
const { open, onChange } = useFileDialog()

const loading = ref(false)
const ready = ref(false)
const data = ref<Parsed>()

const worker = new Worker(
  new URL('~/core/parser.ts', import.meta.url),
  { type: 'module' },
)

onChange((files) => {
  loading.value = true
  ready.value = false
  data.value = undefined

  if (!files) return

  const fileList = []
  for (let index = 0; index < files.length; index++) {
    const file = files.item(index)
    if (!file) continue

    fileList.push(file)
  }

  worker.postMessage({ fileList })
})

worker.addEventListener('message', (event: MessageEvent<Parsed>) => {
  data.value = event.data
})

const redirectToAuth = async () => {
  const url = new URL('https://accounts.spotify.com/authorize')

  url.searchParams.append('client_id', runtimeConfig.public.SPOTIFY_CLIENT_ID)
  url.searchParams.append('response_type', 'code')
  url.searchParams.append('redirect_uri', runtimeConfig.public.SPOTIFY_REDIRECT_URI)

  await navigateTo(url.toString(), {
    external: true,
  })
}

const parseExample = async () => {
  loading.value = true

  const response = await fetch('/example.json')
  const blob = await response.blob()

  const file = new File([blob], 'example')

  worker.postMessage({ fileList: [file] })
  loading.value = false
}

watch(data, () => {
  loading.value = false
  ready.value = true
})
</script>

<template>
  <main class="space-y-4 my-auto">
    <div
      v-if="!ready"
      class="absolute inset-0 bg-gradient-to-br from-green-500 -z-10 opacity-40"
    />

    <BaseSection class="!max-w-2xl">
      <a
        class="flex"
        href="https://github.com/metkm/spoti-wrapped"
        target="_blank"
      >
        <IconGithub class="size-8 fill-[rgb(var(--color-primary-400))]" />
      </a>

      <p>
        First, you should go to the Spotify Privacy page. Request your Extended
        Streaming History and wait for Spotify to send your data to your email.
        If you have your data already downloaded, click the upload button and
        select all the files that starts with endsong_NUMBER and ends with .json
        in the folder you have downloaded.
      </p>

      <div class="flex gap-2">
        <div
          v-if="tokens"
          class="w-full grid grid-cols-2 gap-2"
        >
          <UButton
            leading-icon="i-heroicons-arrow-up-tray-20-solid"
            :loading
            block
            @click="open"
          >
            Process
          </UButton>
          <UButton
            leading-icon="i-heroicons-chart-bar"
            :loading
            block
            @click="parseExample"
          >
            Show example
          </UButton>
        </div>

        <UButton
          v-else
          block
          icon="i-heroicons-arrow-right-end-on-rectangle-20-solid"
          @click="redirectToAuth"
        >
          Login
        </UButton>
      </div>
    </BaseSection>

    <template v-if="ready && data">
      <Playlists :counts="data.counts" />
      <TrackStats
        :dates="data.dates"
        :counts="data.counts"
        :history-by-track-id="data.historyByTrackId"
      />
      <History :node-list="data.history" />
      <Reasons :reasons="data.reasons" />
      <Other :counts="data.counts" />
      <MostListened
        title="Most Listened Albums"
        :most-listened="data.counts.listenAlbum"
      />
      <MostListened
        title="Most Listened Artists"
        :most-listened="data.counts.listenArtist"
      />
    </template>
  </main>
</template>
