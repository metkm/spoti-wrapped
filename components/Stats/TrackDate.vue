<script setup lang="ts">
import { MsPlayedByYears } from '~~/models/Song';

defineProps<{
  dates: MsPlayedByYears
}>();
</script>

<template>
  <div class="flex flex-col gap-5">
    <p>total play time {{ dates.totalMsPlayed }}</p>
    
    <div class="rounded" v-for="[key, year] in Object.entries(dates.years)">
      <p>{{ key }} 
        <span class="text-xs">total playtime of this year {{ year.totalMsPlayed }}</span>
      </p>

      <div class="flex flex-col gap-5 p-4 rounded border">
        <div v-for="[key, month] in Object.entries(year.months)">
          <p>{{ key }}
            <span class="text-xs">total playtime of this month {{ month.totalMsPlayed }}</span>
          </p>

          <div class="p-4 rounded border">
            <p v-for="[key, totalPlayed] in Object.entries(month.days)">
              {{ key }}
              <span class="text-xs">total playtime of this day {{ totalPlayed }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
