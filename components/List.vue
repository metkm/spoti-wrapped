<script setup lang="ts" generic="T extends any">
const props = defineProps<{
  items: Record<string, T>,
  sort?: (first: any, second: any) => number,
}>();

let values = Object.entries(props.items);
values.sort(props.sort);

values = values.slice(0, 20);
</script>

<template>
  <ul class="divide-y">
    <li 
      v-for="[key, value] in values"
      :key="key"
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
