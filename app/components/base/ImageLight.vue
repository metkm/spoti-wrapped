<script setup lang="ts">
defineProps<{
  src: string
}>()
</script>

<template>
  <div class="absolute inset-0 inset-y-28 blur-[200px]">
    <Transition
      enter-active-class="transition-all duration-500"
      leave-active-class="transition-all duration-500"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
      mode="out-in"
    >
      <img
        :key="src"
        :src="src"
        class="w-full h-full object-cover"
      >
    </Transition>
  </div>
</template>

<style>

</style>
