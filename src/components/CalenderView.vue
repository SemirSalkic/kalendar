<template>
  <div class="grid grid-cols-7 gap-4 py-4">
    <CalendarCard
      v-for="day in calendarDays"
      :key="day.day"
      :day="day.day"
      :description="day.description"
      :isWeekend="day.isWeekend"
    />
  </div>
</template>

<script setup lang="ts">
import CalendarCard from './CalendarCard.vue'
import { ref, onMounted } from 'vue'

const calendarDays = ref<{ day: number; isWeekend: boolean; description: string }[]>([])

const getDaysInMonth = (year: number, month: number) => {
  const date = new Date(year, month, 1)
  const days = []
  while (date.getMonth() === month) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  return days
}

const generateCalendarDays = () => {
  const today = new Date()
  const days = getDaysInMonth(today.getFullYear(), today.getMonth())

  calendarDays.value = days.map((day) => ({
    day: day.getDate(),
    isWeekend: day.getDay() === 0 || day.getDay() === 6,
    description: 'Godisnji odmor'
  }))
}

onMounted(() => {
  generateCalendarDays()
})
</script>
