<script setup lang="ts">
type Status = "waiting" | "progressing" | "done";

const worker = useWorker();
const currentStatus = ref<Status>("waiting");

const fileSelectHandler = (event: Event) => {
  const element = event.target as HTMLInputElement;
  if (!element.files) return;

  currentStatus.value = "progressing";
  worker.postMessage({
    job: "parseFiles",
    args: element.files
  });
}

const upload = () => {
  const inputElement = openFilePicker();
  inputElement.addEventListener("change", fileSelectHandler);
}

// const readFileAsync = async (file: File): Promise<string> => {
//   return new Promise(resolve => {
//     let fileReader = new FileReader();
  
//     fileReader.addEventListener("load", () => {
//       resolve(fileReader.result as string)
//     })
  
//     fileReader.readAsText(file);
//   });
// }

// const fileSelectHandler = async (event: Event) => {
//   const element = event.target as HTMLInputElement;

//   if (!element.files) {
//     return;
//   }

//   let contents: Song[] = [];
//   for (const file of element.files) {
//     console.log("test");
//     let content = await readFileAsync(file);
//     contents.push(...JSON.parse(content));
//   }

//   emit("update:modelValue", contents);
// }

// const upload = () => {
//   const element = openFilePicker();
//   element.addEventListener("change", fileSelectHandler);
// }
</script>

<template>
  <button
    @click="upload"
    class="bg-green-500 p-2 shadow-lg text-white hover:bg-red-500"
  >
    Upload
  </button>

  <p>{{ currentStatus }}</p>
</template>
