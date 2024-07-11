import { ref } from 'vue'
import { defineStore } from 'pinia'
import { LeaveType, type Calendar } from './types'

export const useCalendarStore = defineStore('calendar', () => {
  const calendarDays = ref<Calendar[]>([])

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
      description: LeaveType.SICK_LEAVE
    }))
  }

  return { calendarDays, generateCalendarDays }
})
