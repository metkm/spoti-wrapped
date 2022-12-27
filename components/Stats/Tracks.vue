<script setup lang="ts">
const { tracks } = defineProps<{
  tracks: { [key: string]: number }
}>();

let values = Object.entries(tracks);
values.sort(([_, a], [__, b]) => {
  return b - a
});

values = values.slice(0, 50);
</script>

<template>
  <div v-for="[key, value] in values" class="track">
    <p>{{ key }}</p>
    <p>{{ value }} <span>times</span></p>
  </div>
</template>