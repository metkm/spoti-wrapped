<script setup lang="ts" generic="T extends { id: number | string }">
const props = defineProps<{
  items: T[]
  width: number
  unSelectable?: boolean
}>()

const modelValue = defineModel<T>({ required: false })

const HEIGHT = Math.ceil(props.items.length / props.width)
const WIDTH = Math.min(props.width, props.items.length)

const column = ref(WIDTH)
const row = ref(HEIGHT)

const grids = computed(() => {
  let columnsText = ''
  let rowsText = ''

  for (let index = 0; index < WIDTH; index++) {
    if (index === column.value) {
      columnsText += '2fr '
    } else {
      columnsText += modelValue.value ? '0fr ' : '1fr '
    }
  }

  if (HEIGHT > 1) {
    for (let index = 0; index < HEIGHT; index++) {
      if (index === row.value) {
        rowsText += '2fr '
      } else {
        rowsText += modelValue.value ? '0fr ' : '1fr '
      }
    }
  }

  return {
    gridTemplateColumns: columnsText,
    gridTemplateRows: rowsText,
  }
})

const select = (item: T, index: number) => {
  if (props.unSelectable) return

  if (item.id === modelValue.value?.id) {
    modelValue.value = undefined
    column.value = WIDTH
    row.value = HEIGHT
    return
  }

  row.value = Math.floor(index / WIDTH)
  column.value = index - row.value * WIDTH

  modelValue.value = item
}
</script>

<template>
  <div
    class="lg:grid gap-4 w-[30rem] lg:h-[55rem] justify-center transition-all"
    :style="grids"
    :class="{ '!gap-0 lg:!w-60': !!modelValue }"
  >
    <div
      v-for="(item, index) in items"
      :key="item.id"
      class="w-full h-full lg:rounded-lg overflow-hidden"
      @click="select(item, index)"
    >
      <slot
        :item="item"
        :index="index"
        :selected="item.id === modelValue?.id"
      />
    </div>
  </div>
</template>
