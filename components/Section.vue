<script setup lang="ts">
defineProps<{
  title: string,
  desc?: string
}>();
</script>

<template>
  <div class="rounded-lg border shadow-log relative">
    <div class="p-4 text-center">
      <p class="text-xl">{{ title }}</p>
      <p class="text-sm text-neutral-400">{{ desc }}</p>
    </div>
    
    <slot></slot>
  </div>
</template>
