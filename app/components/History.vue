<script setup lang="ts">
import type { Node } from '~/models/node'

defineProps<{
  nodeList: Node[]
}>()

const selectedYear = ref<Node>()
const selectedMonth = ref<Node>()

watch(selectedYear, () => {
  selectedMonth.value = undefined
})
</script>

<template>
  <BaseSection
    title="Years with stats"
    remove-max-limit
  >
    <BaseError>
      <NodeList :node-list="nodeList" />
    </BaseError>
  </BaseSection>
</template>
