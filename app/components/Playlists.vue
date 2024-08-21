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

const { bgImage, updateColorsFromImageElement } = useTheme()

const container = ref<HTMLElement>()
const selectedPlaylist = ref<Playlist>()
const selectedIndex = computed(() => data.value?.items.findIndex(item => item.id === selectedPlaylist.value?.id))

watch(selectedPlaylist, () => {
  bgImage.value = selectedPlaylist.value?.images?.at(0)?.url
})

const updateColor = (element: HTMLImageElement) => {
  updateColorsFromImageElement(element)
}

let startX = 0
const handleTouchEvent = (direction: 'left' | 'right') => {
  if (direction === 'left') {
    const index = Math.max(0, (selectedIndex.value || 0) - 1)
    selectedPlaylist.value = data.value?.items.at(index)
  } else {
    const index = Math.min(data.value?.items.length || 50, (selectedIndex.value || 0) + 1)
    selectedPlaylist.value = data.value?.items.at(index)
  }
}

onMounted(() => {
  container.value?.addEventListener('touchstart', (event) => {
    startX = event.touches[0]!.pageX
  })

  container.value?.addEventListener('touchmove', (event) => {
    event.preventDefault()
  })

  container.value?.addEventListener('touchend', (event) => {
    const touch = event.changedTouches.item(0)
    if (!touch) return

    const distance = touch.pageX - startX
    handleTouchEvent(distance > 0 ? 'left' : 'right')
  })
})

watchOnce(data, () => {
  if (selectedPlaylist.value) return
  selectedPlaylist.value = data.value?.items.at(0)
})
</script>

<template>
  <BaseSection
    title="My Playlists"
    remove-max-limit
  >
    <template #top>
      <UButton
        leading-icon="i-heroicons-arrow-path-16-solid"
        :loading="status === 'pending'"
        class="ml-auto"
        variant="soft"
        @click="refresh"
      >
        Refresh Playlists
      </UButton>
    </template>

    <div class="relative">
      <div class="absolute inset-0 inset-y-28 blur-[200px] bg-transition">
        <div
          class="h-full w-full bg-center bg-cover"
          :style="{
            backgroundImage: `url('${bgImage}')`,
          }"
        />
      </div>

      <BaseSwiper
        v-if="data"
        v-slot="{ item }"
        v-model="selectedPlaylist"
        :items="data.items"
      >
        <Playlist
          :playlist="item"
          :counts="counts"
          :selected="item.id === selectedPlaylist?.id"
          @update-color="updateColor"
        />
      </BaseSwiper>

      <!-- <div class="relative overflox-x-hidden w-screen">
        <ol
          v-if="data"
          ref="container"
          class="flex gap-4 w-screen transition-transform duration-300"
          :style="{ transform: `translateX(${offset}px)` }"
        >
          <li
            v-for="playlist in data.items"
            :key="playlist.id"
            class="shrink-0"
          >
            <Playlist
              :playlist="playlist"
              :counts="counts"
              :selected="playlist.id === selectedPlaylist?.id"
              @click="selectPlaylist(playlist)"
              @update-color="updateColor"
            />
          </li>
        </ol>
      </div> -->
    </div>
  </BaseSection>
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
