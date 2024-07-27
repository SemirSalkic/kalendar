import { type TravelEntry } from './types'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLeaveRequestStore = defineStore('leaveRequest', () => {
  const travelEntryList = useLocalStorage<TravelEntry[]>('travelEntryList', [])

  const getTravelEntryPendingList = computed(() =>
    travelEntryList.value.filter(
      (entry) => entry.travelEntryStatus === TravelEntryStatus.Pending
    )
  )

  const getTravelEntryApprovedList = computed(() =>
    travelEntryList.value.filter(
      (entry) => entry.travelEntryStatus === TravelEntryStatus.Approved
    )
  )

  const getTravelEntryRejectedList = computed(() =>
    travelEntryList.value.filter(
      (entry) => entry.travelEntryStatus === TravelEntryStatus.Rejected
    )
  )

  const getTravelEntrySentToBeCorrectedList = computed(() =>
    travelEntryList.value.filter(
      (entry) => entry.travelEntryStatus === TravelEntryStatus.SentToBeCorrected
    )
  )

  function addTravelEntry(travelEntry: TravelEntry): void {
    travelEntryList.value.push(travelEntry)
  }

  function updateTravelEntry(travelEntry: TravelEntry): void {
    const index = travelEntryList.value.findIndex(
      (entry) => entry.travelEntryId === travelEntry.travelEntryId
    )
    travelEntryList.value[index] = travelEntry
  }

  function removeTravelEntry(travelEntryId: string): void {
    const index = travelEntryList.value.findIndex(
      (entry) => entry.travelEntryId === travelEntryId
    )
    travelEntryList.value.splice(index, 1)
  }

  return {
    travelEntryList,
    getTravelEntryPendingList,
    getTravelEntryApprovedList,
    getTravelEntryRejectedList,
    getTravelEntrySentToBeCorrectedList,
    addTravelEntry,
    updateTravelEntry,
    removeTravelEntry
  }
})
