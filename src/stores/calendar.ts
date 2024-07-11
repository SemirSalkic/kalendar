import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Calendar } from './types'

export const useCalendarStore = defineStore('calendar', () => {
  const today = ref(new Date())
  const calendarDays = ref<Calendar[]>([])

  const firstDayOfMonth = computed(
    () => new Date(today.value.getFullYear(), today.value.getMonth(), 1)
  )
  const lastDayOfMonth = computed(
    () => new Date(today.value.getFullYear(), today.value.getMonth() + 1, 0)
  )

  const generateCalendarDays = () => {
    const startDay = new Date(today.value.getFullYear(), today.value.getMonth(), 1)
    const daysInMonth: Calendar[] = []

    while (startDay.getMonth() === today.value.getMonth()) {
      daysInMonth.push({
        day: startDay.getDate(),
        isWeekend: [0, 6].includes(startDay.getDay())
      })
      startDay.setDate(startDay.getDate() + 1)
    }

    calendarDays.value = daysInMonth
  }

  return { calendarDays, generateCalendarDays, today, firstDayOfMonth, lastDayOfMonth }
})
