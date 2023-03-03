<script setup lang="ts">
import { TrackPlayCount, TrackPlayCounts } from "~/models/Song";
import { SortParam } from "~/models/list";

const { tracks } = defineProps<{
  tracks: TrackPlayCounts
}>();

const sort = ([_, first]: SortParam<TrackPlayCount>, [__, second]: SortParam<TrackPlayCount>): number => {
  return second.listenCount - first.listenCount;
}
</script>

<template>
  <List :items="tracks" :sort="sort" v-slot="{ value }" aria-label="Most listened tracks">
    <StatsTracksTrack :track="value" />
  </List>
</template>
