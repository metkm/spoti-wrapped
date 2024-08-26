<script setup lang="ts" generic="T extends { id: number | string }">
import { breakpointsTailwind } from '@vueuse/core'
import { closest } from '~/utils/closest'

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

const container = ref<HTMLElement>()
const containerInner = ref<HTMLElement>()
const left = ref(0)

const windowSize = useWindowSize()
const breakpoints = useBreakpoints(breakpointsTailwind)

const SIDE_ELEMENT_COUNT = 5
const GAP = 16

let startOffset = 0

const itemPositions = computed(() => {
  const center = windowSize.width.value / 2
  const fillSidesOffset = props.fillSides
    ? SIDE_ELEMENT_COUNT * itemSize.value.width + SIDE_ELEMENT_COUNT * GAP
    : 0

  const itemPositions = Array.from({ length: props.items.length }, (_, i) => {
    return {
      index: i,
      x: center
      - itemSize.value.width / 2
      - i * itemSize.value.width
      - i * 16
      - fillSidesOffset,
    }
  })

  return itemPositions
})

const { distanceX, isSwiping } = usePointerSwipe(container, {
  disableTextSelect: true,
  onSwipe: () => {
    if (!containerInner.value) return

    const startAndEndPadding = windowSize.width.value / 2 - itemSize.value.width / 2

    const containerWidth = containerInner.value.clientWidth
    const maxOffsetLimit = containerWidth - windowSize.width.value + startAndEndPadding

    const result = -distanceX.value + startOffset

    left.value = Math.min(
      startAndEndPadding,
      Math.max(result, -maxOffsetLimit),
    )
  },
  onSwipeEnd: () => {
    const snapPosition = closest(itemPositions.value, left.value)
    if (!snapPosition) return

    startOffset = snapPosition.x
    left.value = snapPosition.x

    modelValue.value = props.items.at(snapPosition.index)
  },
})

const isScreenSmOrEqual = breakpoints.smallerOrEqual('sm')

const itemSize = computed(() => {
  const isSm = props.size === 'sm' || isScreenSmOrEqual.value

  if (isSm) {
    return {
      width: 320,
      height: 288,
    }
  }

  return {
    width: 640,
    height: 384,
  }
})

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
</script>

<template>
  <div class="overflow-x-hidden w-full">
    <DefineTemplate v-slot="{ $slots }">
      <li
        class="shrink-0 bg-neutral-100 dark:bg-neutral-900 rounded list-none w-80"
        :style="{
          width: `${itemSize.width}px`,
          height: `${itemSize.height}px`,
        }"
      >
        <component :is="$slots.default" />
      </li>
    </DefineTemplate>

    <div
      ref="container"
      class="flex gap-4"
      :style="{ transform: `translateX(${left}px)` }"
      :class="{ 'transition-all': !isSwiping }"
    >
      <template v-if="fillSides">
        <ReuseTemplate
          v-for="i in 5"
          :key="i"
        />
      </template>

      <ol
        ref="containerInner"
        class="flex gap-4"
      >
        <div
          v-for="item in items"
          :key="item.id"
        >
          <li
            class="shrink-0 bg-neutral-100 dark:bg-neutral-900 rounded list-none w-80"
            :style="{
              width: `${itemSize.width}px`,
              height: `${itemSize.height}px`,
            }"
          >
            <button
              class="w-full h-full"
            >
              <!-- @click="handleClick(item, index)" -->
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
