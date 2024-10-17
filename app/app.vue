<template>
  <div class="relative min-h-screen flex flex-col gap-4 py-4 mx-auto text-sm">
    <BaseError>
      <TooltipProvider>
        <NuxtPage class="z-10" />
      </TooltipProvider>

      <template #error="{ error, clearError }">
        <p>{{ error }}</p>

        <UButton @click="clearError">
          Retry
        </UButton>
      </template>
    </BaseError>
  </div>
</template>

<style>
@import "tailwindcss";
@import "@nuxt/ui";
</style>
