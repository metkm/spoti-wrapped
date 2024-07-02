<template>
  <div class="grid grid-cols-3 gap-4 grid-rows-3 size-[30rem]">
    <div
      v-for="i in 3 * 3"
      :key="i"
      class="animate-pulse bg-neutral-800/50 rounded-lg"
    />
  </div>
</template>
