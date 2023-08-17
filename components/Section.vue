<script setup lang="ts">
defineProps<{
  title: string,
  desc?: string
}>();
</script>

<template>
  <section class="rounded-lg border shadow-log relative">
    <div class="text-center p-4">
      <h1 class="text-xl">{{ title }}</h1>
      <p v-if="desc" class="text-sm text-neutral-400">{{ desc }}</p>
    </div>
    
    <slot></slot>
  </section>
</template>
