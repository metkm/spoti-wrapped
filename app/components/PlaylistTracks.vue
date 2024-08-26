<script setup lang="ts">
import type { Pagination } from '~/models/pagination'
import type { TrackItem } from '~/models/track'
import type { Parsed } from '~/models/parsed'

const props = defineProps<{
  id: string
  counts: Parsed['counts']
}>()

const query = ref('')
const queryDebounced = refDebounced(query, 1000)

const container = ref<HTMLElement>()
const trackItems = ref<TrackItem[]>([])
const page = ref(1)
const offset = ref(0)

const {
  data: trackList,
  status,
  refresh,
} = await useSpotifyFetch<Pagination<TrackItem>>(`https://api.spotify.com/v1/playlists/${props.id}/tracks`, {
  key: `playlist:${props.id}`,
  params: {
    offset: offset,
  },
  transform: (response: Pagination<TrackItem>) => {
    if (response) {
      for (let index = 0; index < response.items.length; index++) {
        const element = response.items[index]
        if (!element) continue

        const isFound = trackItems.value.some((trackItem) => {
          return trackItem.track.id === element.track.id
        })

        if (isFound) continue

        trackItems.value.push(element)
      }
    }

    return response
  },
  watch: [page],
})

useInfiniteScroll(
  container,
  () => {
    if (status.value === 'pending' || !trackList.value?.next) return

    offset.value += 20 * page.value
    page.value++
  },
  {
    distance: 20,
    canLoadMore: () => !!trackList.value?.next,
  },
)

let scrollTopOffset = 0
const { direction, posStart, posEnd } = usePointerSwipe(container, {
  threshold: 2,
  onSwipe: (event) => {
    const diff = posStart.y - posEnd.y

    if (direction.value === 'up' || direction.value === 'down') {
      container.value?.scrollTo({ top: diff + scrollTopOffset })
      event.stopPropagation()
    }
  },
  onSwipeEnd: () => {
    if (container.value) {
      scrollTopOffset = container.value.scrollTop
    }
  },
})

const items = computed(() =>
  trackItems.value?.filter(item =>
    item.track.name.toLowerCase().includes(queryDebounced.value.toLowerCase()),
  ),
)
</script>

<template>
  <div class="flex flex-col gap-2 overflow-hidden h-full p-2 rounded-lg">
    <div class="flex items-center gap-2 z-10">
      <UButton
        leading-icon="i-heroicons-arrow-path-16-solid"
        :loading="status === 'pending'"
        square
        variant="ghost"
        @click="refresh"
      />
      <UInput
        v-model="query"
        placeholder="Search"
        variant="none"
      />
    </div>

    <ul
      v-if="items.length > 0"
      ref="container"
      class="h-full overflow-y-auto overflow-x-hidden overflow-fade relative"
    >
      <li
        v-for="({ track }, index) in items"
        :key="track.id"
        class="flex items-center gap-2"
      >
        <p>{{ index + 1 }}</p>

        <div class="flex items-center gap-2 p-2">
          <img
            :src="track.album.images.at(0)?.url"
            class="size-14 rounded"
          >

          <div class="text-left">
            <p>
              {{ track.name }}
            </p>

            <ul
              class="flex items-center flex-wrap gap-6 gap-y-0 text-xs text-neutral-400 list-disc"
            >
              <li v-if="counts.skip[track.id] && counts.skip[track.id]! > 0">
                <p>Skip count {{ counts.skip[track.id] }}</p>
              </li>

              <li
                v-if="counts.listen[track.id] && counts.listen[track.id]! > 0"
              >
                <p>Listen count {{ counts.listen[track.id] }}</p>
              </li>

              <li
                v-if="counts.totalMsPlayed[track.id] && counts.totalMsPlayed[track.id]! > 0"
              >
                <p>
                  Average of
                  {{
                    Math.round(
                      counts.totalMsPlayed[track.id]!
                        / 1000
                        / counts.listen[track.id]!,
                    )
                  }}
                  seconds listened
                </p>
              </li>
            </ul>
          </div>
        </div>
      </li>

      <div
        v-if="status === 'pending'"
        class="flex justify-center w-full"
      >
        <UIcon
          name="i-heroicons-arrow-path-16-solid"
          class="animate-spin text-lg"
        />
      </div>
    </ul>
  </div>
</template>
