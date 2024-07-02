<script setup lang="ts">
import type { Tokens } from '~/models/tokens'

const tokens = useTokens()
const route = useRoute()
const code = route.query.code

if (!code) {
  await navigateTo('/')
}

const { data } = await useFetch<Tokens>('/api/token', {
  query: {
    code,
  },
  server: false,
})

whenever(data, async (result) => {
  tokens.tokens.value = result
  await navigateTo('/')
})
</script>

<template>
  <div class="flex flex-col items-center gap-4 bg-neutral-100 max-w-7xl mx-auto dark:bg-neutral-900 p-4 rounded-lg">
    <UIcon
      name="i-heroicons-arrow-path-20-solid"
      class="text-7xl animate-spin"
    />

    <p>Authorizing.....</p>
  </div>
</template>
