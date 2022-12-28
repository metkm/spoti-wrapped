<script setup lang="ts">
import { MsPlayedByYears } from '~~/models/Song';

const props = defineProps<{
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
  <div>
    <button
      @click="clickHandler" 
      class="shadow rounded-lg p-2 px-4 border bg-white absolute top-0 right-0"
      :class="{ '!bg-green-500 text-white': !isClosed }"
    >
      {{ isClosed ? "Show More" : "Show less" }}
    </button>
  
    <StatsTrackDate v-if="!isClosed" :dateNodes="nodes" />
  </div>
</template>
