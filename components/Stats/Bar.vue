<script setup lang="ts">
const { count, totalCount } = defineProps<{
  count: number,
  totalCount: number
}>();

const id = (totalCount / count).toString();
</script>

<template>
  <div class="flex flex-col p-4">
    <div class="flex justify-between">
      <label :for="id">{{ count }}</label>
      <label :for="id">{{ totalCount }}</label>
    </div>

    <progress
      :id="id"
      :value="count"
      :max="totalCount"
      class="w-full h-7 rounded overflow-hidden"
    ></progress>
  </div>
</template>
