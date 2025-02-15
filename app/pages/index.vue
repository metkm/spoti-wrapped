<script setup lang="ts">
import type { Parsed } from '~/models/parsed'
import type { Node } from '~/models/node'

const runtimeConfig = useRuntimeConfig()
const { tokens } = useTokens()
const { open, onChange } = useFileDialog()

const loading = ref(false)
const ready = ref(false)
const data = ref<Parsed>()

let worker: Worker
onMounted(() => {
  worker = new Worker(new URL('~/core/parser.ts', import.meta.url), { type: 'module' })

  worker?.addEventListener('message', async (event: MessageEvent<Parsed>) => {
    // Now that I'm done coding this, I'm not sure why we need this at all lol
    if (data.value) {
      const { mergician } = await import('mergician')
      const customMergician = mergician({
        afterEach: ({ mergeVal, targetObj, key }) => {
          // @ts-expect-error: Don't care
          if (!targetObj[key]) return

          if (typeof mergeVal === 'number') {
            // @ts-expect-error: Don't care
            return mergeVal + targetObj[key]
          }
        },
        skipKeys: ['id'],
      })

      const newData = {
        historyByTrackId: mergician(
          data.value.historyByTrackId,
          event.data.historyByTrackId,
        ) as Parsed['historyByTrackId'],
        counts: customMergician(data.value.counts, event.data.counts),
        reasons: {
          end: customMergician(data.value.reasons.end, event.data.reasons.end),
          start: customMergician(data.value.reasons.start, event.data.reasons.start),
        },
        dates: mergician({
          afterEach: ({ mergeVal, depth, targetObj, key }) => {
            type D = { date: Date, history: History }
            // @ts-expect-error: Don't care
            const target = targetObj[key] as D

            if (depth !== 0 || !target) return

            const d = mergeVal as D
            if (d.date < target.date) {
              return target
            }
          },
        })(data.value.dates, event.data.dates),
        history: data.value.history
          .map((his) => {
            const target = event.data.history.find(h => h.id === his.id)
            if (!target) return his

            // if (data.value?.counts.listen[getSongId(his.mostListenedSong.spotify_track_uri)!] > target)

            const result = {
              id: his.id,
              ...customMergician(his, target),
            } as Node

            const entriesTracks = Object.entries(result.songListenCounts)
            let currMaxSong: [string, number] | undefined = entriesTracks.at(0)

            for (let index = 0; index < entriesTracks.length; index++) {
              const count = entriesTracks[index]
              if (count && currMaxSong && currMaxSong[1] < count[1]) {
                currMaxSong = count
              }
            }

            const entriesAlbums = Object.entries(result.albumListenCounts)
            let currMaxAlbum: [string, number] | undefined = entriesAlbums.at(0)

            for (let index = 0; index < entriesAlbums.length; index++) {
              const count = entriesAlbums[index]
              if (count && currMaxAlbum && currMaxAlbum[1] < count[1]) {
                currMaxAlbum = count
              }
            }

            const track = event.data.historyByTrackId[currMaxSong![0]]
            if (track) {
              result.mostListenedSong = track
            }

            const album = event.data.historyByTrackId[currMaxSong![0]]
            if (album) {
              result.mostListenedAlbum = album
            }

            return result
          })
          .concat(
            event.data.history.filter(val => !data.value?.history.find(his => his.id === val.id)),
          ),
      }

      data.value = newData
    } else {
      data.value = event.data
    }
  })
})

const processFiles = () => {
  ready.value = false
  data.value = undefined

  open()
}

onChange((files) => {
  if (!files) return

  loading.value = true

  const fileList = []
  for (let index = 0; index < files.length; index++) {
    const file = files.item(index)
    if (!file) continue

    fileList.push(file)
  }

  worker?.postMessage({ fileList })
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

  worker?.postMessage({ fileList: [file] })
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
      class="absolute inset-0 -z-10 opacity-40"
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
        First, you should go to the Spotify Privacy page. Request your Extended Streaming History
        and wait for Spotify to send your data to your email. If you have your data already
        downloaded, click the upload button and select all the files that starts with endsong_NUMBER
        and ends with .json in the folder you have downloaded.
      </p>

      <div class="flex gap-2">
        <div
          v-if="tokens"
          class="w-full grid grid-cols-3 gap-2"
        >
          <UButton
            leading-icon="i-heroicons-arrow-up-tray-20-solid"
            :loading
            block
            @click="processFiles"
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
          <UButton
            block
            icon="i-heroicons-plus"
            @click="() => open()"
          >
            Add files (experimental)
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
