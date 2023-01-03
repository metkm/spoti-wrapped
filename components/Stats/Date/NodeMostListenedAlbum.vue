<script setup lang="ts">
const { albums } = defineProps<{
  albums: string[]
}>();

let sorted = mostFrequentArray(albums).slice(0, 1);
</script>

<template>
  <div v-for="album in sorted">
    <p>{{ album }}</p>
  </div>
</template>
