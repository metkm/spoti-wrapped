<script setup lang="ts" generic="T extends any">
const { items, sort } = defineProps<{
  items: Record<string, T>,
  sort?: (first: any, second: any) => number,
}>();

let values = Object.entries(items);
values.sort(sort);

values = values.slice(0, 20);
</script>

<template>
  <ul class="divide-y">
    <li 
      v-for="[key, value] in values"
      class="grid grid-cols-2 items-center hover:bg-neutral-100 p-2"
      aria-label="Track"
    >
      <slot :key="key" :value="value">
        <p>{{ key }}</p>
        <p class="text-end">{{ value }}</p>
      </slot>
    </li>
  </ul>
</template>
