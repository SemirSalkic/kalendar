import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { LeaveType, type Calendar } from './types'

export const useCalendarStore = defineStore('calendar', () => {
  const today = ref(new Date())
  const calendarDays = useLocalStorage<Calendar[]>('calendarDays', [])

  const getFirstDayOfMonth = () =>
    new Date(today.value.getFullYear(), today.value.getMonth(), 1)
  const getLastDayOfMonth = () =>
    new Date(today.value.getFullYear(), today.value.getMonth() + 1, 0)

  const firstDayOfMonth = computed(getFirstDayOfMonth)
  const lastDayOfMonth = computed(getLastDayOfMonth)

  const usedSickDays = computed(
    () =>
      calendarDays.value.filter(
        (day) => day.description === LeaveType.SICK_LEAVE
      ).length
  )

  const isTodayInCurrentMonth = computed(() =>
    calendarDays.value.some((day) => day.date === formatDate(today.value))
  )

  function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  function generateCalendarDays(): Calendar[] {
    const startDay = new Date(
      today.value.getFullYear(),
      today.value.getMonth(),
      1
    )
    const daysInMonth: Calendar[] = []

    while (startDay.getMonth() === today.value.getMonth()) {
      daysInMonth.push({
        day: startDay.getDate(),
        date: formatDate(startDay),
        isWeekend: [0, 6].includes(startDay.getDay())
      })
      startDay.setDate(startDay.getDate() + 1)
    }

    calendarDays.value = daysInMonth
    return daysInMonth
  }

  function addLeaveTypeToCalendar(dates: Date[], leaveType: LeaveType) {
    const [startDate, endDate] =
      dates.length === 1 ? [dates[0], dates[0]] : [dates[0], dates[1]]
    const start = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    )
    const end = endDate
      ? new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
      : start

    calendarDays.value = calendarDays.value.map((day) => {
      const dayDate = new Date(
        today.value.getFullYear(),
        today.value.getMonth(),
        day.day
      )
      if (dayDate >= start && dayDate <= end) {
        return {
          ...day,
          description: leaveType !== LeaveType.EMPTY ? leaveType : ''
        }
      }
      return day
    })
  }

  return {
    calendarDays,
    generateCalendarDays,
    today,
    firstDayOfMonth,
    lastDayOfMonth,
    usedSickDays,
    isTodayInCurrentMonth,
    addLeaveTypeToCalendar
  }
})
