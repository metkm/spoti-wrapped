<script setup lang="ts">
import type { Node } from '~/models/node'

defineProps<{
  nodeList: Node[]
}>()
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
