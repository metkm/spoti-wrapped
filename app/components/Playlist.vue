<script setup lang="ts">
import type { Parsed } from '~/models/parsed'
import type { Playlist } from '~/models/playlist'

const props = defineProps<{
  playlist: Playlist
  selected?: boolean
  counts: Parsed['counts']
}>()

const emit = defineEmits<{
  updateColor: [element: HTMLImageElement]
}>()

const element = ref<HTMLImageElement>()

const updateColor = () => {
  if (!element.value) return

  emit('updateColor', element.value)
}

whenever(
  () => props.selected,
  () => {
    if (!element.value?.complete) {
      element.value?.addEventListener('load', updateColor, {
        once: true,
      })

      return
    }

    updateColor()
  },
)
</script>

<template>
  <div
    class="flex relative shrink-0 w-full h-full rounded-lg shadow-md shadow-black/30 overflow-hidden transition-all first:snap-center"
  >
    <img
      ref="element"
      :src="playlist.images?.at(0)?.url"
      class="absolute inset-0 w-full h-full object-cover"
      crossorigin="anonymous"
    >

    <div class="absolute inset-0 bg-black/40" />

    <div class="flex flex-col gap-4 z-10 h-full w-full text-white">
      <div
        v-if="!selected"
        class="p-4"
      >
        <p class="font-semibold text-left text-2xl">
          {{ playlist.name }}
        </p>
      </div>

      <BaseError v-if="selected">
        <Transition
          name="fade"
          appear
        >
          <PlaylistTracks
            :id="playlist.id"
            :counts
            class="backdrop-blur-[200px]"
          />
        </Transition>
      </BaseError>
    </div>
  </div>
</template>
