<script setup lang="ts">
import { SortParam } from "~/models/list";

const { albums } = defineProps<{
  albums: {
    [key: string]: number
  }
}>();

const sortAlbums = ([_, first]: SortParam<number>, [__, second]: SortParam<number>) => {
  return second - first;
}
</script>

<template>
  <List :items="albums" :sort="sortAlbums" v-slot="{ key, value }" aria-label="Most listened albums">
    <p aria-label="Album name">{{ key }}</p>
    <p class="item-info">Listened {{ value }} times</p>
  </List>
</template>
