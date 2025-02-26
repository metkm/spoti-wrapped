<script setup lang="ts" generic="T extends { id: number | string }">
import { breakpointsTailwind } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    items: T[]
    fillSides?: boolean
    size?: 'sm' | 'md'
  }>(),
  {
    size: 'md',
  },
)

const modelValue = defineModel<T>()

const SIDE_ELEMENT_COUNT = 5
const GAP = 16

const isMounted = ref(false)
const containerElement = ref<HTMLElement>()

const windowSize = useWindowSize()
const breakpoints = useBreakpoints(breakpointsTailwind)

const isScreenSmOrEqual = breakpoints.smallerOrEqual('sm')

const itemSize = computed(() => {
  const isSm = props.size === 'sm' || isScreenSmOrEqual.value

  if (isSm) {
    return {
      width: 384,
      height: 288,
    }
  }

  return {
    width: 640,
    height: 384,
  }
})

const selectedIndex = computed(() => {
  const foundIndex = props.items.findIndex(
    item => item.id === modelValue.value?.id,
  )

  return foundIndex === -1 ? 0 : foundIndex
})

const offset = computed(() => {
  if (!isMounted.value) {
    return 0
  }

  const center = windowSize.width.value / 2
  const fillSidesOffset = props.fillSides ? (SIDE_ELEMENT_COUNT * itemSize.value.width + (SIDE_ELEMENT_COUNT * GAP)) : 0

  return (
    center
    - itemSize.value.width / 2
    - selectedIndex.value * itemSize.value.width
    - selectedIndex.value * 16
    - fillSidesOffset
  )
})

let startX = 0
let startY = 0
const handleTouchEvent = (direction: 'left' | 'right') => {
  if (direction === 'left') {
    const index = Math.max(0, (selectedIndex.value || 0) - 1)
    modelValue.value = props.items.at(index)
  } else {
    const index = Math.min(props.items.length || 50, (selectedIndex.value || 0) + 1)
    modelValue.value = props.items.at(index)
  }
}

onMounted(() => {
  isMounted.value = true

  containerElement.value?.addEventListener('touchstart', (event) => {
    startX = event.touches[0]!.pageX
    startY = event.touches[0]!.pageY
  })

  containerElement.value?.addEventListener('touchend', (event) => {
    const touch = event.changedTouches.item(0)
    if (!touch) return

    const distanceX = touch.pageX - startX
    const distanceY = touch.pageY - startY

    if (Math.abs(distanceX) > 40 && Math.abs(distanceY) < 20) {
      handleTouchEvent(distanceX > 0 ? 'left' : 'right')
    }
  })
})

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
</script>

<template>
  <div class="overflow-x-hidden w-full">
    <DefineTemplate v-slot="{ $slots }">
      <li
        class="shrink-0 bg-neutral-100 dark:bg-neutral-900 rounded list-none w-80"
        :style="{ width: `${itemSize.width}px`, height: `${itemSize.height}px` }"
      >
        <component :is="$slots.default" />
      </li>
    </DefineTemplate>

    <div
      ref="containerElement"
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
        <div
          v-for="item in items"
          :key="item.id"
        >
          <li
            class="shrink-0 bg-neutral-100 dark:bg-neutral-900 rounded list-none w-80"
            :style="{ width: `${itemSize.width}px`, height: `${itemSize.height}px` }"
          >
            <button
              class="w-full h-full"
              @click="modelValue = item"
            >
              <slot :item="item" />
            </button>
          </li>
        </div>
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
