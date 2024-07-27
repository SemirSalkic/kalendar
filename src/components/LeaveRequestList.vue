<script setup lang="ts">
const props = defineProps<{
  leaveRequestStatus: TravelEntryStatus
}>()

const leaveRequestStore = useLeaveRequestStore()
const {
  getTravelEntryApprovedList,
  getTravelEntryPendingList,
  getTravelEntryRejectedList,
  getTravelEntrySentToBeCorrectedList
} = leaveRequestStore

const travelEntryList = computed(() => {
  switch (props.leaveRequestStatus) {
    case TravelEntryStatus.Pending:
      return getTravelEntryPendingList
    case TravelEntryStatus.Approved:
      return getTravelEntryApprovedList
    case TravelEntryStatus.Rejected:
      return getTravelEntryRejectedList
    case TravelEntryStatus.SentToBeCorrected:
      return getTravelEntrySentToBeCorrectedList
  }
})

function compareDatesAndFormat(
  startDate: string,
  endDate: string,
  endDateTwo: string
): string {
  const dates = [startDate, endDate, endDateTwo]
    .map((date) => new Date(date))
    .filter((date) => !isNaN(date.getTime()))
    .sort((a, b) => a.getTime() - b.getTime())

  if (dates.length < 2) {
    return 'Datum nije validan!'
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }

  return `${dates[0].toLocaleString(undefined, options)} - ${dates[dates.length - 1].toLocaleString(undefined, options)}`
}
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <div
      v-for="entry in travelEntryList"
      :key="entry.travelEntryId"
      class="flex flex-col gap-2 rounded-lg border p-6 shadow-md"
    >
      <span class="font-semibold">Broj naloga: {{ entry.travelEntryId }}</span>
      <span>
        Registrovan od:
        {{
          `${entry.employeeNames.registeredByFirstName} ${entry.employeeNames.registeredByLastName}`
        }}
      </span>
      <span>
        Registrovani:
        {{
          `${entry.employeeNames.registeredEmployeeFirstName} ${entry.employeeNames.registeredEmployeeLastName}`
        }}
      </span>
      <span>
        Datum:
        {{
          compareDatesAndFormat(
            entry.travelDetails.startDateAndTIme?.toLocaleString() || '',
            entry.travelDetails.endDateAndTime?.toLocaleString() || '',
            entry.travelDetails.endDAteAndTimeTwo?.toLocaleString() || ''
          )
        }}
      </span>
    </div>
  </div>
</template>
