import { type TravelEntry } from './types'
import { computed } from 'vue'
import { defineStore } from 'pinia'

export const useLeaveRequestStore = defineStore('leaveRequest', () => {
  const travelEntryList = useLocalStorage<TravelEntry[]>('travelEntryList', [])

  const getTravelEntryListByStatus = (status: TravelEntryStatus) =>
    computed(() =>
      travelEntryList.value.filter(
        (entry) => entry.travelEntryStatus === status
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

  function updateTravelEntryStatus(
    travelEntryId: string,
    status: TravelEntryStatus,
    travelEntry?: TravelEntry
  ): void {
    const index = travelEntryList.value.findIndex(
      (entry) => entry.travelEntryId === travelEntryId
    )
    if (index !== -1) {
      if (travelEntry) {
        travelEntryList.value[index] = travelEntry
      }
      travelEntryList.value[index].travelEntryStatus = status
    }
  }

  function lockOrUnlockTravelEntry(travelEntryId: string): void {
    const index = travelEntryList.value.findIndex(
      (entry) => entry.travelEntryId === travelEntryId
    )
    travelEntryList.value[index].locked = !travelEntryList.value[index].locked
  }

  function deleteTravelEntry(travelEntryId: string): void {
    const index = travelEntryList.value.findIndex(
      (entry) => entry.travelEntryId === travelEntryId
    )
    travelEntryList.value.splice(index, 1)
  }

  return {
    travelEntryList,
    getTravelEntryListByStatus,
    addTravelEntry,
    updateTravelEntry,
    removeTravelEntry,
    updateTravelEntryStatus,
    lockOrUnlockTravelEntry,
    deleteTravelEntry
  }
})
