import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCalendarStore = defineStore('calendar', () => {
  const calendarDays = ref<{ day: number; isWeekend: boolean; description: string }[]>([])

  function getDaysInMonth(year: number, month: number): Date[] {
    const days: Date[] = []
    const currentDate = new Date(year, month, 1)
    while (currentDate.getMonth() === month) {
      days.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    return days
  }

  function generateCalendarDays() {
    const today = new Date()
    const days = getDaysInMonth(today.getFullYear(), today.getMonth())

    calendarDays.value = days.map((day) => ({
      day: day.getDate(),
      isWeekend: day.getDay() === 0 || day.getDay() === 6,
      description: 'Godisnji odmor'
    }))
  }

  return { calendarDays, generateCalendarDays }
})
