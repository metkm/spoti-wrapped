<script setup lang="ts" generic="T extends { id: number | string }">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'

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

const carousel = ref<{ slideTo: (index: number) => void } | null>(null)

const handleClick = (item: T) => {
  modelValue.value = item

  const index = props.items.findIndex(i => i.id === item.id)

  if (index !== -1) {
    carousel.value?.slideTo(index)
  }
}
</script>

<template>
  <Carousel
    ref="carousel"
    :items-to-show="1.1"
    :breakpoints="{
      1024: {
        itemsToShow: 2.2,
      },
      1280: {
        itemsToShow: 3.4,
      },
    }"
  >
    <Slide
      v-for="item in items"
      :key="item.id"
      class="h-96"
    >
      <button
        class="mx-1 lg:mx-4 w-full h-full"
        @click="handleClick(item)"
      >
        <slot :item="item" />
      </button>
    </Slide>
  </Carousel>
</template>
