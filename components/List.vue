<script setup lang="ts">
const { items, sort } = defineProps<{
  items: {
    [key: string]: any
  },
  sort: (first: any, second: any) => number,
}>();

let values = Object.entries(items);
values.sort(sort);

values = values.slice(0, 20);
</script>

<template>
  <div class="divide-y">
    <div 
      v-for="[key, value] in values"
      class="grid grid-cols-2 items-center hover:bg-neutral-100 p-2"
    >
      <slot :key="key" :value="value"></slot>
    </div>
  </div>
</template>
