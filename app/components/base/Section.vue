<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  removeMaxLimit?: boolean
}>()
</script>

<template>
  <section
    class="flex flex-col gap-4 p-4 bg-neutral-100 dark:bg-black/20 rounded-lg mx-auto max-w-7xl"
    :class="{ '!max-w-none !bg-transparent !p-0': removeMaxLimit }"
  >
    <div
      v-if="title || description || $slots.top"
      class="flex flex-wrap gap-2 items-center justify-between"
      :class="{ 'max-w-7xl mx-auto w-full p-4': removeMaxLimit }"
    >
      <div
        v-if="title || description"
      >
        <h2
          v-if="title"
          class="font-bold text-xl"
        >
          {{ title }}
        </h2>

        <p
          v-if="description"
          class="opacity-50"
        >
          {{ description }}
        </p>
      </div>

      <slot name="top" />
    </div>

    <slot />
  </section>
</template>
