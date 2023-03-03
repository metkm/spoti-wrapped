<script setup lang="ts">
defineProps<{
  reasons: Record<string, number>
}>()
</script>

<template>
  <List :items="reasons" aria-label="Start and end reasons" />
</template>
