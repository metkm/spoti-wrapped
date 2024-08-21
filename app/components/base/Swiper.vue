<script setup lang="ts" generic="T extends { id: number | string }">
import { breakpointsTailwind } from '@vueuse/core'

const props = defineProps<{
  items: T[]
}>()

const modelValue = defineModel<T>()

const WIDTH_DEFAULT = 340
const WIDTH_LG = 640

const windowSize = useWindowSize()
const breakpoints = useBreakpoints(breakpointsTailwind)

const itemWidth = computed(() => {
  return breakpoints.isGreater('lg') ? WIDTH_LG : WIDTH_DEFAULT
})

const selectedIndex = computed(() => {
  const foundIndex = props.items.findIndex(item => item.id === modelValue.value?.id)

  return foundIndex === -1 ? 0 : foundIndex
})

const isMounted = ref(false)
const offset = computed(() => {
  if (!isMounted.value) {
    return 0
  }

  const center = windowSize.width.value / 2
  return center - (itemWidth.value / 2) - (selectedIndex.value * itemWidth.value) - (selectedIndex.value * 16)
})

onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <div class="overflow-x-hidden w-full">
    <ol
      class="flex gap-4 transition-all duration-300"
      :style="{ transform: `translateX(${offset}px)` }"
    >
      <li
        v-for="item in items"
        :key="item.id"
        class="h-96 w-[40rem] shrink-0"
        :class="{ width: `${itemWidth}px` }"
      >
        <button
          class="w-full h-full"
          @click="modelValue = item"
        >
          <slot :item="item" />
        </button>
      </li>
    </ol>
  </div>
</template>
