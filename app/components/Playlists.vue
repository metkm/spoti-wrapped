<script setup lang="ts" generic="T">
import type { Pagination } from '~/models/pagination'
import type { Playlist } from '~/models/playlist'
import type { Parsed } from '~/models/parsed'

defineProps<{
  counts: Parsed['counts']
}>()

const { data, status, refresh } = await useSpotifyFetch<Pagination<Playlist>>('/me/playlists', {
  key: 'playlists',
  lazy: true,
})

const { width } = useWindowSize()
const { bgImage, updateColorsFromImageElement } = useTheme()

const selectedPlaylist = ref<Playlist>()

const padding = computed(() => width.value / 2 - 384 / 2)

let scrolling = false
const selectPlaylist = async (payload: MouseEvent, playlist: Playlist) => {
  if (scrolling) {
    return
  }

  bgImage.value = playlist.images?.at(0)?.url

  scrolling = true
  const element = payload.target as HTMLElement

  element.scrollIntoView({
    inline: 'center',
    behavior: 'smooth',
    block: 'center',
  })

  await sleep(500)
  scrolling = false
  selectedPlaylist.value = playlist
}

const updateColor = (element: HTMLImageElement) => {
  updateColorsFromImageElement(element)
}
</script>

<template>
  <div class="flex flex-col">
    <div class="flex items-center gap-4 max-w-7xl p-2 mx-auto w-full">
      <h1 class="text-xl font-semibold">
        My Playlists
      </h1>

      <UButton
        leading-icon="i-heroicons-arrow-path-16-solid"
        :loading="status === 'pending'"
        class="ml-auto"
        variant="soft"
        @click="refresh"
      >
        Refresh Playlists
      </UButton>
    </div>

    <div class="relative">
      <div class="absolute inset-0 inset-y-28 blur-[200px] bg-transition">
        <div
          class="h-full w-full bg-center bg-cover"
          :style="{
            backgroundImage: `url('${bgImage}')`,
          }"
        />
      </div>

      <div
        class="flex items-center gap-4 overflow-x-auto py-4 snap-x no-scrollbar relative"
        :style="{ paddingLeft: `${padding}px`, paddingRight: `${padding}px` }"
      >
        <template v-if="data && data?.items.length > 0">
          <Playlist
            v-for="playlist in data.items"
            :key="playlist.id"
            :selected="playlist.id === selectedPlaylist?.id"
            :class="{
              'opacity-20':
                selectedPlaylist && selectedPlaylist.id !== playlist.id,
            }"
            :counts
            :playlist
            @click="selectPlaylist($event, playlist)"
            @update-color="updateColor"
          />
        </template>
        <SkeletonPlaylists v-else-if="status === 'pending'" />
        <p
          v-else
          class="text-center"
        >
          No playlists found
        </p>
      </div>
    </div>
  </div>
</template>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.bg-transition {
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  transition: background-image 10s ease-in-out;
}
</style>
