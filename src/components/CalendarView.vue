<script setup lang="ts">
import { TravelEntryStatus, type TravelEntry } from '@/stores/types'
import { storeToRefs } from 'pinia'

const calendarStore = useCalendarStore()
const { calendarDays, isTodayInCurrentMonth } = storeToRefs(calendarStore)
const leaveRequestStore = useLeaveRequestStore()

function checkIfBetweenDates(day?: Date): TravelEntry[] {
  if (!day || isNaN(new Date(day).getTime())) return []

  const normalizeDate = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate())

  const normalizedDay = normalizeDate(new Date(day))

  return leaveRequestStore
    .getTravelEntryListByStatus(TravelEntryStatus.APPROVED)
    .value.filter(
      ({
        travelDetails: { startDateAndTIme, endDateAndTime, endDAteAndTimeTwo }
      }) => {
        const [startDate, endDate, endDateTwo] = [
          startDateAndTIme,
          endDateAndTime,
          endDAteAndTimeTwo
        ].map((date) => (date ? normalizeDate(new Date(date)) : null))
        return (
          startDate &&
          endDate &&
          ((normalizedDay >= startDate && normalizedDay <= endDate) ||
            (endDateTwo &&
              normalizedDay >= startDate &&
              normalizedDay <= endDateTwo))
        )
      }
    )
}

onMounted(() => {
  console.log(isTodayInCurrentMonth.value)

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
      :travelEntryList="checkIfBetweenDates(day.date)"
    />
  </div>
</template>
