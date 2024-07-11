<script setup lang="ts">
import { storeToRefs } from 'pinia'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const isDark = useDark()
const calendarStore = useCalendarStore()
const { firstDayOfMonth, lastDayOfMonth, usedSickDays } = storeToRefs(calendarStore)
const dates = ref<Date[]>([])
const selectedLeaveType = ref()
const errorText = ref<string>('')
const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
const totalSickDays = 7

function calculateDiffDays(startDate: Date, endDate: Date): number {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
  return Math.ceil(diffTime / MILLISECONDS_PER_DAY) + 1
}

const includesWeekend = (startDate: Date, endDate: Date) => {
  let currentDate = new Date(startDate)
  while (currentDate <= endDate) {
    if ([0, 6].includes(currentDate.getDay())) return true
    currentDate.setDate(currentDate.getDate() + 1)
  }
  return false
}

function addLeaveType() {
  calendarStore.addLeaveTypeToCalendar(dates.value, selectedLeaveType.value)
}

watch(dates, (newDates) => {
  errorText.value = ''

  if (newDates.length >= 1 && newDates[0]) {
    const diffDays = newDates[1] ? calculateDiffDays(newDates[0], newDates[1]) : 1

    if (selectedLeaveType.value === LeaveType.SICK_LEAVE) {
      const usedDays = usedSickDays.value
      const remainingSickDays = totalSickDays - usedDays

      if ((usedDays >= totalSickDays && diffDays > 1) || diffDays > remainingSickDays) {
        errorText.value = ErrorType.SICK_ERROR
      }
    } else if (
      selectedLeaveType.value === LeaveType.ANNUAL_LEAVE &&
      newDates[1] &&
      includesWeekend(newDates[0], newDates[1])
    ) {
      errorText.value = ErrorType.ANNUAL_ERROR
    }
  }
})

watch(selectedLeaveType, (newValue) => {
  if (newValue) dates.value = []
})

const emit = defineEmits<{
  (e: 'cancel'): void
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center p-2 text-black dark:text-white gap-4">
    <TitleComponent title="Registrovanje odsustva"></TitleComponent>
    <div class="flex items-center gap-2">
      <label class="pl-1 text-left" for="leaveType"> Vrsta odsustva: </label>
      <VDropdown
        id="leaveType"
        name="leaveType"
        class="w-36"
        :list="[LeaveType.ANNUAL_LEAVE, LeaveType.SICK_LEAVE, LeaveType.EMPTY]"
        :pre-select="true"
        @selected="(_, type) => (selectedLeaveType = type)"
      ></VDropdown>
    </div>
    <div class="flex items-center gap-2">
      <label class="pl-1 text-left" for="date"> Date: </label>
      <div class="flex flex-col">
        <VueDatePicker
          id="date"
          name="date"
          v-model="dates"
          :enable-time-picker="false"
          :dark="isDark"
          :disabled-week-days="selectedLeaveType === LeaveType.ANNUAL_LEAVE ? [0, 6] : []"
          :min-date="firstDayOfMonth"
          :max-date="lastDayOfMonth"
          disable-month-year-select
          range
          @cleared="dates = []"
        ></VueDatePicker>
        <ErrorText v-if="errorText" :error-text="errorText"></ErrorText>
      </div>
    </div>
    <div class="flex gap-4">
      <VButton
        class="w-24 self-center rounded-md"
        color="success"
        label="Sačuvaj"
        :disabled="!dates.length || !!errorText"
        @click="addLeaveType()"
      ></VButton>
      <VButton
        class="w-24 self-center rounded-md"
        color="error"
        label="Zatvori"
        @click="emit('cancel')"
      ></VButton>
    </div>
  </div>
</template>
