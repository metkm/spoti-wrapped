<script setup lang="ts">
import type { Pagination } from '~/models/pagination'
import type { Parsed } from '~/models/parsed'
import type { Playlist } from '~/models/playlist'

defineProps<{
  counts: Parsed['counts']
}>()

const carousel = useTemplateRef('carousel')
const { bgImage, updateColorsFromImageElement } = useTheme()

const selectedPlaylistIndex = ref()

const { data, status, refresh } = await useSpotifyFetch<Pagination<Playlist>>('/me/playlists', {
  key: 'playlists',
  lazy: true,
})

onMounted(() => {
  console.log('mounted, carousel', carousel.value)
  if (!carousel.value) return

  carousel.value.emblaApi?.on('select', () => {
    const selectedIndex = carousel.value?.emblaApi?.selectedScrollSnap()
    if (selectedIndex === undefined) return

    selectedPlaylistIndex.value = selectedIndex

    const playlist = data.value?.items.at(selectedIndex)
    if (!playlist) return

    const playlistImage = playlist.images?.at(0)
    if (!playlistImage) return

    const image = new Image()
    image.src = playlistImage.url
    image.crossOrigin = 'anonymous'

    bgImage.value = playlistImage.url

    image.addEventListener('load', () => {
      updateColorsFromImageElement(image)
    }, {
      once: true,
    })
  })
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
        variant="ghost"
        @click="() => refresh()"
      >
        Refresh Playlists
      </UButton>
    </template>

    <div class="relative">
      <BaseImageLight
        v-if="bgImage"
        :src="bgImage"
      />

      <UCarousel
        ref="carousel"
        v-slot="{ item, index }"
        :items="data?.items || []"
        :ui="{ item: 'max-w-2xl' }"
        :contain-scroll="false"
      >
        <Playlist
          :playlist="item"
          :counts="counts"
          :selected="selectedPlaylistIndex === index"
          class="user-select"
        />
      </UCarousel>
    </div>
  </BaseSection>
</template>
