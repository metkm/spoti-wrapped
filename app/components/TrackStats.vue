<script setup lang="ts">
import type { FilterOption, Parsed } from '~/models/parsed'
import type { ResponseTracks } from '~/models/track'

const props = defineProps<{
  dates: Parsed['dates']
  counts: Parsed['counts']
  historyByTrackId: Parsed['historyByTrackId']
}>()

const orderBy = ref<FilterOption>()
const query = ref('')
const queryDebounced = refDebounced(query, 1000)

const ids = computed(() => {
  if (queryDebounced.value.length > 2 || orderBy.value) {
    let filtered = Object.entries(props.dates).filter(([_, res]) => {
      const masterTrackName
        = res.history.master_metadata_track_name?.toLowerCase()
      return masterTrackName?.includes(queryDebounced.value.toLowerCase())
    })

    filtered = filtered.slice(0, 50)

    if (orderBy.value) {
      filtered.sort(([_, a], [__, b]) => {
        const aId = getSongId(a.history)
        const bId = getSongId(b.history)

        if (!aId || !bId) return 0
        return (
          (props.counts[orderBy.value!.value][bId] || 0)
          - (props.counts[orderBy.value!.value][aId] || 0)
        )
      })
    }

    return filtered.map(([id]) => id).join(',')
  }

  return Object.keys(props.dates).slice(0, 20)
})

const { data, status } = await useSpotifyFetch<ResponseTracks>('/tracks', {
  params: {
    ids,
  },
  lazy: true,
})

const options: FilterOption[] = [
  {
    value: 'totalMsPlayed',
    label: 'Most Listened',
  },
  {
    value: 'skip',
    label: 'Most Skipped',
  },
]

const exportCsv = () => {
  const arr = [['id', 'track', 'listen count', 'skip count']]

  const entries = Object.entries(props.counts.listen)
  for (let index = 0; index < entries.length; index++) {
    const [id, count] = entries[index]!
    const history = props.historyByTrackId[id]

    arr.push([
      id,
      history?.master_metadata_track_name || 'unknown',
      count.toString(),
      props.counts.skip[id]?.toString() || '0',
    ])
  }

  arrayToCsv(arr)
}
</script>

<template>
  <BaseSection
    title="The dates of when you've listened to a song for the first time"
  >
    <template #top>
      <div class="flex flex-wrap items-end gap-2">
        <UFormField label="Order by">
          <USelectMenu
            v-model="orderBy"
            placeholder="Order By"
            :options="options"
            class="w-48"
            variant="soft"
          />
        </UFormField>

        <UButton
          v-if="orderBy"
          icon="i-heroicons-x-mark-16-solid"
          variant="soft"
          @click="orderBy = undefined"
        />

        <UInput
          v-model="query"
          placeholder="Search"
          :loading="status === 'pending'"
          icon="i-heroicons-magnifying-glass-solid"
          variant="soft"
        />

        <UButton @click="exportCsv">
          Export
        </UButton>
      </div>
    </template>

    <ol class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <template v-if="data">
        <li
          v-for="track in data.tracks"
          :key="track.id"
          class="flex h-full w-full rounded-lg p-2 bg-center bg-cover aspect-square relative overflow-hidden"
          :style="{
            backgroundImage: `url('${track.album.images.at(1)?.url}')`,
          }"
        >
          <div class="flex flex-col justify-between max-w-full w-full z-10">
            <div class="flex flex-wrap gap-2">
              <UTooltip
                v-if="counts.skip[track.id] && counts.skip[track.id]! > 0"
                text="Count of how many you've skipped this track"
              >
                <UBadge class="space-x-1">
                  <UIcon
                    name="i-heroicons-chevron-double-right-16-solid"
                    class="text-base"
                  />
                  <p>{{ counts.skip[track.id] }}</p>
                </UBadge>
              </UTooltip>

              <UTooltip
                v-if="counts.totalMsPlayed[track.id] && counts.totalMsPlayed[track.id]! > 60_000"
                :text="`How much you've listened to this track. ${counts.listen[track.id]} times`"
              >
                <UBadge class="space-x-1">
                  <UIcon
                    name="i-heroicons-clock-16-solid"
                    class="text-base"
                  />
                  <p>
                    {{
                      Math.floor(counts.totalMsPlayed[track.id]! / 1000 / 60)
                    }}
                    min
                  </p>
                </UBadge>
              </UTooltip>
            </div>

            <div class="truncate text-white">
              <UTooltip text="First time you've listened to this track">
                <p
                  v-if="dates[track.id]"
                  class="font-semibold text-xl"
                >
                  {{ new Date(dates[track.id]!.date).toLocaleDateString() }}
                </p>
              </UTooltip>

              <UTooltip
                :text="track.name"
                class="block"
              >
                <p class="truncate">
                  {{ track.name }}
                </p>
              </UTooltip>
            </div>
          </div>

          <div class="absolute inset-0 bg-black/50" />
        </li>
      </template>
      <SkeletonTrackStats v-else />
    </ol>
  </BaseSection>
</template>
