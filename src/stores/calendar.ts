import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { LeaveType, type Calendar } from './types'

export const useCalendarStore = defineStore('calendar', () => {
  const today = ref(new Date())
  const calendarDays = useLocalStorage<Calendar[]>('calendarDays', [])

  const getFirstDayOfMonth = () =>
    new Date(today.value.getFullYear(), today.value.getMonth(), 1)
  const getLastDayOfMonth = () =>
    new Date(
      today.value.getFullYear(),
      today.value.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    )

  const firstDayOfMonth = computed(getFirstDayOfMonth)
  const lastDayOfMonth = computed(getLastDayOfMonth)

  const usedSickDays = computed(
    () =>
      calendarDays.value.filter(
        (day) => day.description === LeaveType.SICK_LEAVE
      ).length
  )

  const isTodayInCurrentMonth = computed(() =>
    calendarDays.value.some((day) => {
      const dayDate = day.date ? new Date(day.date).toDateString() : null
      const todayDate = today.value
        ? new Date(today.value).toDateString()
        : null
      return dayDate === todayDate
    })
  )

  function generateCalendarDays(): void {
    const currentYear = today.value.getUTCFullYear()
    const currentMonth = today.value.getUTCMonth()
    const startDay = new Date(Date.UTC(currentYear, currentMonth, 1))

    const daysInMonth: Calendar[] = []

    // Add padding for days before the first day of the month
    const firstDayOfWeek = (startDay.getUTCDay() + 6) % 7 // Adjust to make Monday the first day of the week

    daysInMonth.push(
      ...Array.from({ length: firstDayOfWeek }, () => ({
        day: undefined,
        date: undefined,
        isWeekend: false
      }))
    )

    while (startDay.getUTCMonth() === currentMonth) {
      daysInMonth.push({
        day: startDay.getUTCDate(),
        date: new Date(startDay),
        isWeekend: [0, 6].includes(startDay.getUTCDay())
      })
      startDay.setUTCDate(startDay.getUTCDate() + 1)
    }

    calendarDays.value = daysInMonth
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
