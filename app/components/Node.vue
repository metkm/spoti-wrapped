<script setup lang="ts">
import type { StyleValue } from 'vue'
import type { Node } from '~/models/node'
import type { ResponseTracks } from '~/models/track'

const props = defineProps<{
  node: Node
  tracksKey: string
  selected?: boolean
}>()

const modelValue = defineModel<Node>()

const { data: cache } = useNuxtData<ResponseTracks>(props.tracksKey)

const style = computed<StyleValue>(() => {
  const songId = getSongId(props.node.mostListenedSong)
  if (!songId) return

  const track = cache.value?.tracks.find(track => track.id === songId)
  if (!track) return

  const image = track.album.images.at(1)
  if (!image) return

  return {
    backgroundImage: `url(${image.url})`,
  }
})

const containsNodes = computed(() => props.node.nodes.length > 0)

const Element = h(containsNodes.value ? 'button' : 'div', {
  onClick: containsNodes.value
    ? () => {
        modelValue.value = props.node.id === modelValue.value?.id ? undefined : props.node
      }
    : undefined,
})
</script>

<template>
  <component
    :is="Element"
    :style="style"
    class="flex w-full h-full bg-cover p-4 relative text-left text-white rounded-lg overflow-hidden"
  >
    <div class="absolute inset-0 backdrop-blur-lg fade-blur" />

    <div class="flex flex-col h-full justify-between z-10">
      <div>
        <p class="font-semibold text-lg">
          {{ node.label }} {{ node.id }}
        </p>
        <p class="opacity-70">
          {{ node.mostListenedSong.master_metadata_track_name }} - {{ node.mostListenedSong.master_metadata_album_artist_name }}
        </p>
      </div>

      <div class="flex flex-col gap-4">
        <div>
          <p class="opacity-70">
            Most Listened Album
          </p>
          <p class="truncate">
            {{ node.mostListenedAlbum?.master_metadata_album_album_name }}
          </p>
        </div>

        <div>
          <p class="opacity-70">
            Minutes Listened
          </p>
          <p>
            {{ Math.round(node.totalMs / 1000 / 60) }}
          </p>
        </div>
      </div>
    </div>
  </component>
</template>

<style>
.fade-blur {
  mask-image: linear-gradient(to bottom, transparent, black);
}
</style>
