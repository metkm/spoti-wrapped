<script setup lang="ts">
import type { MostListened } from '~/models/parsed'

const props = defineProps<{
  mostListened: Record<string, MostListened>
}>()

const options: {
  label: string
  value: keyof MostListened
}[] = [
  {
    label: 'Count',
    value: 'count',
  },
  {
    label: 'Duration',
    value: 'length',
  },
]

const orderBy = ref(options[0]!)
const query = ref('')
const queryDebounced = refDebounced(query, 500)

const mostListened = computed(() => {
  const entries = Object.entries(props.mostListened)
    .filter(([key, _]) => key.toLowerCase().includes(queryDebounced.value.toLowerCase()))

  entries.sort((a, b) => b[1][orderBy.value.value] - a[1][orderBy.value.value])
  return entries.slice(0, 10)
})
</script>

<template>
  <BaseSection>
    <template #top>
      <div class="flex items-end gap-4">
        <UFormField label="Order by">
          <USelectMenu
            v-model="orderBy"
            :options="options"
            placeholder="Order By"
            class="w-48"
          />
        </UFormField>

        <UInput
          v-model="query"
          icon="i-heroicons-magnifying-glass-solid"
          placeholder="Search"
        />
      </div>
    </template>

    <ol class="divide-[rgb(var(--color-primary-800))]/50">
      <li
        v-for="[title, value] in mostListened"
        :key="title"
        class="flex justify-between p-2 hover:bg-[rgb(var(--color-primary-50))] dark:hover:bg-[rgb(var(--color-primary-800))]"
      >
        <p>{{ title }}</p>

        <div class="text-right">
          <p>{{ value.count }} Times</p>
          <p>{{ Math.round(value.length / 1000 / 60) }} Minutes</p>
        </div>
      </li>
    </ol>
  </BaseSection>
</template>
