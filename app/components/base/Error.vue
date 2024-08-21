<script setup lang="ts">
const error = ref<Error>()

function clearError() {
  error.value = undefined
}

onErrorCaptured((err) => {
  error.value = err
  return false
})

const route = useRoute()
watch(
  () => route.fullPath,
  () => {
    error.value = undefined
  },
)
</script>

<template>
  <Suspense v-if="!error">
    <slot v-if="!error" />

    <template #fallback>
      <slot name="loading">
        <div class="w-full h-full grid place-content-center">
          <p>loading...</p>
          <!-- <UIcon
            name="i-heroicons-arrow-path-20-solid"
            class="animate-spin text-4xl"
          /> -->
        </div>
      </slot>
    </template>
  </Suspense>

  <slot
    v-else
    name="error"
    :error="error"
    :clear-error="clearError"
  >
    <p>{{ error }}</p>
    <UButton @click="clearError">
      Clear
    </UButton>
  </slot>
</template>
