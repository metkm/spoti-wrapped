<script setup lang="ts">
import type { Node } from '~/models/node'
import type { ResponseTracks } from '~/models/track'

const props = defineProps<{
  nodeList: Node[]
}>()

const selectedNode = ref<Node>()

const trackIds = computed(() =>
  props.nodeList.map(node => getSongId(node.mostListenedSong)).join(','),
)

const key = `tracks:${trackIds.value}`
const { data: cache } = useNuxtData<ResponseTracks>(key)

await useSpotifyFetch<ResponseTracks | undefined>('/tracks', {
  key: key,
  params: {
    ids: trackIds,
  },
  getCachedData: () => cache.value,
})
</script>

<template>
  <div
    class="flex flex-col gap-0 transition-all"
    :class="{ 'gap-4': selectedNode }"
  >
    <ol class="flex gap-4 overflow-x-auto">
      <Node
        v-for="node in nodeList"
        :key="node.id"
        v-model="selectedNode"
        :node="node"
        :tracks-key="key"
        :selected="node.id === selectedNode?.id"
      />
    </ol>

    <BaseError
      v-if="selectedNode && selectedNode.nodes"
      :key="selectedNode.id"
    >
      <NodeList
        v-auto-height
        :node-list="selectedNode.nodes"
      />
    </BaseError>
  </div>
</template>
