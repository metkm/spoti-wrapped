<script setup lang="ts">
defineProps<{
  incognitoCount: number,
  totalRecordCount: number
}>();
</script>

<template>
  <div class="p-4">
    <div class="flex justify-between">
      <p>{{ incognitoCount }}</p>
      <p>{{ totalRecordCount }}</p>
    </div>
    <div class="relative h-10 rounded bg-neutral-200 overflow-hidden">
      <div
        class="absolute z-10 bg-green-500 inset-0"
        :style="{
          width: `${incognitoCount / totalRecordCount * 100}%`
        }"
      />
    </div>
  </div>
</template>