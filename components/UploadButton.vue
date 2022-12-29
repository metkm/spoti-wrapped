<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { WrappedResult } from '~~/models/Song';

type Status = "waiting" | "progressing" | "done";

const emit = defineEmits(["update:modelValue"]);
defineProps<{
  modelValue: WrappedResult | undefined
}>();

const worker = useWorker();
const currentStatus = ref<Status>("waiting");

const onWorkerMessage = (event: MessageEvent<WrappedResult>) => {
  console.log(event.data);

  emit("update:modelValue", event.data);
}

const fileSelectHandler = (event: Event) => {
  const element = event.target as HTMLInputElement;
  if (!element.files) return;

  currentStatus.value = "progressing";
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

    <p>{{ currentStatus }}</p>
  </div>
</template>
