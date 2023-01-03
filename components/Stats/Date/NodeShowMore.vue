<script setup lang="ts">
import { MsPlayedByYears } from '~~/models/Song';

defineProps<{
  nodes: MsPlayedByYears,
  modelValue: any
}>();
const emit = defineEmits(["update:modelValue"]);
const isClosed = ref(true);

const clickHandler = () => {
  isClosed.value = !isClosed.value;
  emit("update:modelValue", !isClosed.value);
}
</script>

<template>
  <button @click="clickHandler" class="p-2 border rounded transition"
    :class="{ '!bg-green-500 text-white': !isClosed }">
    {{ isClosed ? "Show More" : "Show less" }}
  </button>

  <div class="grid-row-animation" :class="{ '!grid-rows-[1fr] p-2': !isClosed }">
    <StatsDateNode v-show="!isClosed" :dateNodes="nodes" />
  </div>
</template>

