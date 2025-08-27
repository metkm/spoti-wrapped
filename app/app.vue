<template>
  <UApp>
    <div class="relative min-h-screen flex flex-col gap-4 py-4 mx-auto text-sm">
      <BaseError>
        <NuxtPage class="z-10" />

        <template #error="{ error, clearError }">
          <p>{{ error }}</p>

          <UButton @click="clearError">
            Retry
          </UButton>
        </template>
      </BaseError>
    </div>
  </UApp>
</template>
