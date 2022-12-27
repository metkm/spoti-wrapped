<script setup lang="ts">
import { Song } from '~~/models/Song';

defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const openFilePicker = () => {
  const inputElement = document.createElement("input");
  inputElement.type = "file";
  inputElement.setAttribute("multiple", "multiple");
  inputElement.click();

  return inputElement;
}

const readFileAsync = async (file: File): Promise<Song[]> => {
  return new Promise(resolve => {
    let fileReader = new FileReader();
  
    fileReader.addEventListener("load", () => {
      resolve(JSON.parse(fileReader.result as string));
    })
  
    fileReader.readAsText(file);
  });
}

const fileSelectHandler = async (event: Event) => {
  const element = event.target as HTMLInputElement;

  if (!element.files) {
    return;
  }

  let contents: Song[] = [];
  for (const file of element.files) {
    console.log("reading..")

    contents = [
      ...contents,
      ...(await readFileAsync(file))
    ]
  }

  emit("update:modelValue", contents);
}

const upload = () => {
  const element = openFilePicker();
  element.addEventListener("change", fileSelectHandler);
}
</script>

<template>
  <button 
    @click="upload"
    class="bg-green-500 p-2 shadow-lg text-white"
  >
    Upload
  </button>
</template>
