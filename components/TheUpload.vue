<script setup lang="ts">
const modelValue = defineModel();

const process = (event: Event) => {
  const element = event.target as HTMLInputElement;
  if (!element.files) return;

  const worker = new Worker(new URL("~/worker.ts", import.meta.url), {
    type: "module",
  });

  worker.postMessage({
    type: "files",
    data: element.files
  });
};
</script>

<template>
  <section class="space-y-8 p-4 text-slate-800 bg-slate-100 rounded-xl">
    <h1 class="text-xl font-semibold text-center">How to use this thing?</h1>

    <div>
      <h2
        class="font-semibold text-slate-600 bg-slate-300 rounded-full p-1 px-4 w-fit"
      >
        If you have your data
      </h2>
      <p class="mt-2 ml-1">
        Unzip the files you've downloaded and press on upload Spotify data
        button. Select files that ends with .json extension.
      </p>

      <BaseInputFile multiple @change="process" class="mt-2" />

      <!-- <BaseButton @click="process" class="mt-2">
        <template #icon>
          <IconsUpload />
        </template>

        Upload Spotify data
      </BaseButton> -->
    </div>

    <div>
      <h2
        class="font-semibold text-slate-600 bg-slate-300 rounded-full p-1 px-4 w-fit"
      >
        If you don't have your data
      </h2>
      <p class="mt-2 ml-1">
        First, you should go to the
        <a
          href="https://www.spotify.com/us/account/privacy/"
          class="text-green-600"
          >Spotify Privacy</a
        >
        page and request your Extended Streaming History, wait for Spotify to
        send your data to your email.
      </p>
    </div>
  </section>
</template>
