<script setup lang="ts">
defineProps<{
  title: string,
  desc?: string
}>();
</script>

<template>
  <section class="rounded-lg border shadow-log relative">
    <header class="p-4 text-center">
      <h1 class="text-xl">{{ title }}</h1>
      <p class="text-sm text-neutral-400">{{ desc }}</p>
    </header>
    
    <slot></slot>
  </section>
</template>
