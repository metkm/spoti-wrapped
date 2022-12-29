<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { WrappedResult } from '~~/models/Song';

const emit = defineEmits(["update:modelValue"]);
defineProps<{
  modelValue: WrappedResult | undefined
}>();

const worker = useWorker();
const currentStatus = ref("");

type WorkerMessage = WrappedResult | string;

const onWorkerMessage = (event: MessageEvent<WorkerMessage>) => {
  if (typeof event.data === "string") {
    currentStatus.value = event.data;

    return;
  }

  emit("update:modelValue", event.data);
  currentStatus.value = "";
}

const fileSelectHandler = (event: Event) => {
  const element = event.target as HTMLInputElement;
  if (!element.files) return;
  
  emit("update:modelValue", undefined);
  worker.postMessage({
    job: "parseFiles",
    args: element.files
  });

  worker.addEventListener("message", onWorkerMessage);
}

const upload = () => {
  const inputElement = openFilePicker();
  inputElement.addEventListener("change", fileSelectHandler);
}
</script>

<template>
  <div class="flex flex-col">
    <button
      @click="upload"
      class="bg-green-500 p-2 shadow-lg text-white hover:bg-red-500" 
      v-bind="$attrs"
    >
      Upload
    </button>

    <p v-if="currentStatus" class="text-center mt-2">{{ currentStatus }}</p>
  </div>
</template>
