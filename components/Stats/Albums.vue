<script setup lang="ts">
const { albums } = defineProps<{
  albums: {
    [key: string]: number
  }
}>();

let values = Object.entries(albums);

values.sort(([_, val], [__, val1]) => {
  return val1 - val
})

values = values.slice(0, 20);
</script>

<template>
  <div class="divide-y">
    <div v-for="[key, value] in values" class="item">
      <p>{{ key }}--</p>
      <p><span>Listened</span> {{ value }} <span>times</span></p>
    </div>
  </div>
</template>
