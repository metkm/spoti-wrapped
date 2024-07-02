<script setup lang="ts">
import type { Node } from '~/models/node'

defineProps<{
  nodes: Node[]
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
    class="max-w-none"
  >
    <TransitionGroup
      name="list"
      tag="div"
      class="flex flex-wrap lg:flex-nowrap justify-center items-center w-full overflow-x-hidden gap-4"
      :duration="2000"
      @before-leave="handleBeforeLeave"
    >
      <Node
        key="year"
        v-model="selectedYear"
        :node-list="nodes"
      />

      <div
        v-if="selectedYear"
        key="month"
        class="w-full lg:w-auto"
      >
        <BaseError>
          <Node
            v-model="selectedMonth"
            :node-list="selectedYear.nodes"
          />

          <template #loading>
            <SkeletonHistory />
          </template>
        </BaseError>
      </div>

      <div
        v-if="selectedMonth"
        key="day"
        class="grow"
      >
        <BaseError>
          <Node
            :node-list="selectedMonth.nodes"
            :width="4"
            un-selectable
            class="w-full"
          />

          <template #loading>
            <SkeletonHistory />
          </template>
        </BaseError>
      </div>
    </TransitionGroup>
  </BaseSection>
</template>
