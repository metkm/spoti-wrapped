<script setup lang="ts">
import { hexFromArgb } from '@material/material-color-utilities'
import type { Reasons } from '~/models/parsed'

defineProps<{
  reasons: Reasons
}>()

const { theme } = useTheme()
const bgHex = computed(() => hexFromArgb(theme.value.schemes.dark.primaryContainer))

const [DefineTemplate, ReuseTemplate] = createReusableTemplate<{ reason: Record<string, number> }>()
</script>

<template>
  <DefineTemplate v-slot="{ reason }">
    <ul class="flex flex-wrap gap-4">
      <li
        v-for="[key, value] in Object.entries(reason)"
        :key="key"
        class="py-2 px-4 bg-neutral-700 rounded-lg"
        :style="{ background: bgHex }"
      >
        <p class="capitalize opacity-50">
          {{ key }}
        </p>

        <p>{{ value }}</p>
      </li>
    </ul>
  </DefineTemplate>

  <BaseSection title="Count of Start & End Reasons of Tracks">
    <h1 class="bg-neutral-950 p-2 text-center -mx-4 opacity-50">
      Start
    </h1>
    <ReuseTemplate :reason="reasons.start" />
    <h1 class="bg-neutral-950 p-2 text-center -mx-4 opacity-50">
      End
    </h1>
    <ReuseTemplate :reason="reasons.end" />
  </BaseSection>
</template>
