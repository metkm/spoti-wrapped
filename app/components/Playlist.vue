<script setup lang="ts">
import type { Parsed } from '~/models/parsed'
import type { Playlist } from '~/models/playlist'

defineProps<{
  playlist: Playlist
  selected?: boolean
  counts: Parsed['counts']
}>()
</script>

<template>
  <div class="flex relative h-96 rounded-lg overflow-hidden">
    <img
      :src="playlist.images?.at(0)?.url"
      class="absolute inset-0 w-full h-full object-cover"
      crossorigin="anonymous"
    >

    <div class="absolute inset-0 bg-black/40" />

    <div class="flex flex-col gap-4 z-10 h-full w-full text-white">
      <Transition
        enter-active-class="transition-all duration-300"
        leave-active-class="transition-all duration-300"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
        mode="out-in"
      >
        <PlaylistTracks
          v-if="selected"
          :id="playlist.id"
          :counts
          class="backdrop-blur-[200px]"
        />

        <div
          v-else
          class="p-4"
        >
          <p class="font-semibold text-left text-2xl">
            {{ playlist.name }}
          </p>
        </div>
      </Transition>
    </div>
  </div>
</template>
