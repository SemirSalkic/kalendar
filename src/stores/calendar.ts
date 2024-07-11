import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { LeaveType, type Calendar } from './types'

export const useCalendarStore = defineStore('calendar', () => {
  const today = ref(new Date())
  const calendarDays = ref<Calendar[]>([])

  const firstDayOfMonth = computed(
    () => new Date(today.value.getFullYear(), today.value.getMonth(), 1)
  )
  const lastDayOfMonth = computed(
    () => new Date(today.value.getFullYear(), today.value.getMonth() + 1, 0)
  )

  const usedSickDays = computed(() => {
    return calendarDays.value.filter((day) => day.description === LeaveType.SICK_LEAVE).length
  })

  function generateCalendarDays(): Calendar[] {
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
    return daysInMonth
  }

  function addLeaveTypeToCalendar(dates: Date[], leaveType: LeaveType) {
    const startDate = dates[0]
    const endDate = dates.length > 1 ? dates[1] : dates[0]
    const days = calendarDays.value

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dayIndex = days.findIndex(
        (day) => day.day === d.getDate() && d.getMonth() === today.value.getMonth()
      )
      if (dayIndex !== -1) {
        days[dayIndex].description = leaveType === LeaveType.EMPTY ? '' : leaveType
      }
    }

    calendarDays.value = [...days]
  }

  return {
    calendarDays,
    generateCalendarDays,
    today,
    firstDayOfMonth,
    lastDayOfMonth,
    usedSickDays,
    addLeaveTypeToCalendar
  }
})
