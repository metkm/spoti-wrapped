<script setup lang="ts">
import { hexFromArgb } from '@material/material-color-utilities'
import type { Parsed } from '~/models/parsed'

defineProps<{
  counts: Parsed['counts']
}>()

const { scheme } = useTheme()
const bgHex = computed(() => hexFromArgb(scheme.value.primaryContainer))

const [DefineTemplate, ReuseTemplate] = createReusableTemplate<{ title: string, count: string | number }>()
</script>

<template>
  <DefineTemplate v-slot="{ title, count }">
    <div
      class="px-4 py-2 rounded"
      :style="{ background: bgHex }"
    >
      <p class="opacity-50">
        {{ title }}
      </p>
      <p>{{ count }}</p>
    </div>
  </DefineTemplate>

  <BaseSection
    title="Other Stats"
    description="Stats of how many times you've left incognito, shuffle and offline"
  >
    <div class="flex items-center justify-between">
      <div class="flex gap-4">
        <ReuseTemplate
          title="Incognito Count"
          :count="counts.incognito"
        />
        <ReuseTemplate
          title="Shuffle Count"
          :count="counts.shuffle"
        />
        <ReuseTemplate
          title="Offline Count"
          :count="counts.offline"
        />
      </div>

      <ReuseTemplate
        title="Total Count"
        :count="counts.total"
      />
    </div>
  </BaseSection>
</template>
