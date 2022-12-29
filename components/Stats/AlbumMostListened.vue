<script setup lang="ts">
const { albums } = defineProps<{
  albums: string[]
}>();

let sorted = mostFrequentArray(albums).slice(0, 2);
</script>

<template>
  <div v-for="album in sorted" class="mt-2">
    <p>{{ album }}</p>
  </div>
</template>
