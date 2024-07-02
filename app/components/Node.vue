<script setup lang="ts">
import type { Node } from '~/models/node'
import type { Track } from '~/models/track'

const props = withDefaults(
  defineProps<{
    nodeList: Node[]
    width?: number
  }>(),
  {
    width: 3,
  },
)

const selectedNode = defineModel<Node>({ required: false })

const nodeMostListenedTrackIds = computed(() =>
  props.nodeList.map(node => getSongId(node.mostListenedSong)).join(','),
)

const { data: cache } = useNuxtData<{ tracks: Track[] } | undefined>(
  `tracks:${nodeMostListenedTrackIds.value}`,
)
const { data } = await useSpotifyFetch<{ tracks: Track[] } | undefined>({
  key: `tracks:${nodeMostListenedTrackIds.value}`,
  url: '/tracks',
  options: {
    params: {
      ids: nodeMostListenedTrackIds.value,
    },
  },
  optionsAsyncData: {
    getCachedData: () => cache.value,
  },
})

const trackCache = computed(() => {
  const obj: Record<string, Track> = {}

  for (let index = 0; index < (data.value?.tracks.length || 0); index++) {
    const track = data.value?.tracks[index]
    if (!track) continue

    obj[track.id] = track
  }

  return obj
})
</script>

<template>
  <BaseGridder
    v-slot="{ item, selected }"
    v-model="selectedNode"
    :items="nodeList"
    :width
  >
    <button
      class="flex items-end text-left p-3 bg-center bg-cover relative w-full h-full"
      :style="{ backgroundImage: `url('${trackCache[getSongId(item.mostListenedSong)!]?.album.images.at(1)?.url}')` }"
    >
      <div class="absolute inset-0 bg-black/60" />

      <div
        class="z-10 w-full h-full text-xs overflow-hidden"
        :class="{ 'group': !selected, 'flex flex-col gap-4': selected }"
      >
        <div class="flex flex-col justify-between h-full group-hover:lg:-translate-y-full transition-transform delay-500">
          <div>
            <p class="opacity-70">
              Minutes Listened
            </p>
            <p>{{ Math.round(item.totalMs / 1000 / 60) }}</p>
          </div>

          <div>
            <p class="opacity-70">
              Most Listened Album
            </p>
            <p class="truncate">
              {{ item.mostListenedAlbum?.master_metadata_album_album_name }}
            </p>
          </div>
        </div>

        <div
          class="group-hover:lg:-translate-y-full transition-transform delay-500"
          :class="{ 'translate-y-0 grow': selected }"
        >
          <p class="font-semibold text-lg">
            {{ item.label }} {{ item.id }}
          </p>
          <p class="truncate text-xs opacity-70">
            {{ item.mostListenedSong.master_metadata_track_name }}
          </p>
        </div>
      </div>
    </button>
  </BaseGridder>
</template>
