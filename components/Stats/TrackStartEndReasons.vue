<script setup lang="ts">
defineProps<{
  reasons: {
    [key: string]: number
  }
}>()
</script>
<template>
  <div v-for="[key, value] in Object.entries(reasons)" class="flex item">
    <p>{{ key }}</p>
    <p class="ml-auto">{{ value }}</p>
  </div>
</template>