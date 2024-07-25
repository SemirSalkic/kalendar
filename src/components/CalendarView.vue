<script setup lang="ts">
import CalendarCard from './CalendarCard.vue'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCalendarStore } from '@/stores/calendar'

const calendarStore = useCalendarStore()
const { calendarDays, isTodayInCurrentMonth } = storeToRefs(calendarStore)

onMounted(() => {
  if (calendarDays.value.length === 0 || !isTodayInCurrentMonth.value) {
    calendarStore.generateCalendarDays()
  }
})
</script>

<template>
  <div class="grid grid-cols-7 gap-2 md:gap-4">
    <CalendarCard
      v-for="day in calendarDays"
      :key="day.day"
      :day="day.day"
      :description="day.description"
      :isWeekend="day.isWeekend"
    />
  </div>
</template>
