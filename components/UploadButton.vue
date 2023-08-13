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
  <div>
    <BaseButton @click="upload">
      <template #icon>
        <IconsUpload class="fill-white" />
      </template>
      Upload your Spotify data
    </BaseButton>

    <p v-if="currentStatus" class="mt-2">{{ currentStatus }}</p>
  </div>
</template>
