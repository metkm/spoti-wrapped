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
      <p>Year - {{ key }} 
        <span class="text-xs">total playtime of this year {{ year.totalMsPlayed }}</span>

        <div 
          class="h-0.5 bg-green-500"
          :style="{
            width: `${year.totalMsPlayed / dates.totalMsPlayed * 100}%`
          }"
        />
      </p>

      <div class="p-4 rounded border">
        <div v-for="[key, month] in Object.entries(year.months)">
          <p>Month - {{ key }}
            <span class="text-xs">total playtime of this month {{ month.totalMsPlayed }}</span>
          </p>

          <div class="p-4 rounded border">
            <p v-for="[key, totalPlayed] in Object.entries(month.days)">
              {{ key }}
              <span class="text-xs">total playtime of this day {{ totalPlayed }}</span>

              <div 
                class="h-0.5 bg-green-500"
                :style="{
                  width: `${totalPlayed / month.totalMsPlayed}%`
                }"
              />
            </p>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
