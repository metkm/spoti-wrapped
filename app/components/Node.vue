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
    class="flex bg-center shrink-0 grow bg-cover items-end relative rounded-lg w-full h-full p-4 overflow-hidden transition-all"
    :class="{ '!grow-[2]': selected }"
  >
    <div class="absolute inset-0 backdrop-blur-lg fade-blur" />

    <div class="z-10">
      <p class="font-semibold text-lg">
        {{ node.label }} {{ node.id }}
      </p>
    </div>
  </component>
</template>

<style>
.fade-blur {
  mask-image: linear-gradient(to bottom, transparent, black);
}
</style>
