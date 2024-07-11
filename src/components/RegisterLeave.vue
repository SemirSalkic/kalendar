<script setup lang="ts">
import { storeToRefs } from 'pinia'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ErrorType } from '@/stores/types'

const isDark = useDark()
const { firstDayOfMonth, lastDayOfMonth } = storeToRefs(useCalendarStore())
const dates = ref<Date[]>([])
const selectedLeaveType = ref()
const errorText = ref<string>('')
const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24

function calculateDiffDays(startDate: Date, endDate: Date): number {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
  return Math.ceil(diffTime / MILLISECONDS_PER_DAY) + 1
}

function includesWeekend(startDate: Date, endDate: Date): boolean {
  if (startDate > endDate) {
    return false
  }
  if (startDate.getDay() === 0 || startDate.getDay() === 6) {
    return true
  }
  const nextDay = new Date(startDate)
  nextDay.setDate(startDate.getDate() + 1)
  return includesWeekend(nextDay, endDate)
}

watch(dates, (newDates) => {
  errorText.value = ''

  if (newDates.length === 2 && newDates[0] && newDates[1]) {
    const diffDays = calculateDiffDays(newDates[0], newDates[1])

    if (selectedLeaveType.value === LeaveType.SICK_LEAVE && diffDays > 7) {
      errorText.value = ErrorType.SICK_ERROR
    } else if (
      selectedLeaveType.value === LeaveType.ANNUAL_LEAVE &&
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
        :list="[LeaveType.ANNUAL_LEAVE, LeaveType.SICK_LEAVE]"
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
