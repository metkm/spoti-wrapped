<script setup lang="ts">
import { TrackPlayCount, TrackPlayCounts } from "~/models/Song";
import { SortParam } from "~/models/list";

const { tracks } = defineProps<{
  tracks: TrackPlayCounts
}>();

const sort = ([_, first]: SortParam<TrackPlayCount>, [__, second]: SortParam<TrackPlayCount>): number => {
  return second.skipCount - first.skipCount;
}
</script>

<template>
  <List :items="tracks" :sort="sort" v-slot="{ value }">
    <StatsTracksTrack :track="value" />
  </List>
</template>