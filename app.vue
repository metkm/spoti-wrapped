<script setup lang="ts">
const results = ref();
</script>

<template>
  <main class="flex justify-center p-4">
    <TheUpload v-model="results" />
  </main>
  <!-- <main class="flex justify-center p-4">
    <TheUpload />
  </main> -->
  <!-- <BaseButton>Deneme</BaseButton> -->
</template>
