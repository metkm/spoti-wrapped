<script setup lang="ts">
defineProps<{
  count: number,
  totalCount: number
}>();
</script>

<template>
  <div class="p-4">
    <div class="flex justify-between">
      <p>{{ count }}</p>
      <p>{{ totalCount }}</p>
    </div>
    <div class="relative h-10 rounded bg-neutral-200 overflow-hidden">
      <div
        class="absolute z-10 bg-green-500 inset-0"
        :style="{
          width: `${count / totalCount * 100}%`
        }"
      />
    </div>
  </div>
</template>
