<script setup lang="ts">
defineProps<{
  reasons: {
    [key: string]: number
  }
}>()
</script>

<template>
  <List :items="reasons" />
</template>
