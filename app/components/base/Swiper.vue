<script setup lang="ts" generic="T extends { id: number | string }">
import { breakpointsTailwind } from '@vueuse/core'

const props = defineProps<{
  items: T[]
  fillSides?: boolean
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
  const foundIndex = props.items.findIndex(
    item => item.id === modelValue.value?.id,
  )

  return foundIndex === -1 ? 0 : foundIndex
})

const isMounted = ref(false)
const SIDE_ELEMENT_COUNT = 5
const GAP = 16

const offset = computed(() => {
  if (!isMounted.value) {
    return 0
  }

  const center = windowSize.width.value / 2
  return (
    center
    - itemWidth.value / 2
    - selectedIndex.value * itemWidth.value
    - selectedIndex.value * 16
    - (props.fillSides ? (SIDE_ELEMENT_COUNT * itemWidth.value + (SIDE_ELEMENT_COUNT * GAP)) : 0)
  )
})

onMounted(() => {
  isMounted.value = true
})

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
</script>

<template>
  <div class="overflow-x-hidden w-full">
    <DefineTemplate v-slot="{ $slots }">
      <li class="h-96 w-[40rem] shrink-0 dark:bg-neutral-900 rounded list-none">
        <component :is="$slots.default" />
      </li>
    </DefineTemplate>

    <div
      class="flex gap-4 transition-all duration-300"
      :style="{ transform: `translateX(${offset}px)` }"
    >
      <template v-if="fillSides">
        <ReuseTemplate
          v-for="i in 5"
          :key="i"
        />
      </template>

      <ol class="flex gap-4">
        <ReuseTemplate
          v-for="item in items"
          :key="item.id"
          :class="{ width: `${itemWidth}px` }"
        >
          <button
            class="w-full h-full"
            @click="modelValue = item"
          >
            <slot :item="item" />
          </button>
        </ReuseTemplate>
      </ol>

      <template v-if="fillSides">
        <ReuseTemplate
          v-for="i in 5"
          :key="i"
        />
      </template>
    </div>
  </div>
</template>
