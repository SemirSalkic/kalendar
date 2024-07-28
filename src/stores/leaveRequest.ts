import { type TravelEntry } from './types'
import { computed } from 'vue'
import { defineStore } from 'pinia'
import { formatDate } from '@/utils'
import exportFromJSON from 'export-from-json'

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

  function downloadCSVFile(travelEntryId: string): void {
    const travelEntry = travelEntryList.value.find(
      (entry) => entry.travelEntryId === travelEntryId
    )
    if (!travelEntry) return

    const flatTravelEntry = {
      idPutnogNaloga: travelEntry.travelEntryId,
      statusPutnogNaloga: travelEntry.travelEntryStatus,
      razlogKorekcije: travelEntry.correctionReason,
      zakljucano: travelEntry.locked,
      datumKreiranja: formatDate(travelEntry.dateCreated),
      datumiAzuriranja: travelEntry.datesUpdated?.map(formatDate).join(', '),
      imeRegistriranog: travelEntry.employeeNames.registeredByFirstName,
      prezimeRegistriranog: travelEntry.employeeNames.registeredByLastName,
      imeZaposlenog: travelEntry.employeeNames.registeredEmployeeFirstName,
      prezimeZaposlenog: travelEntry.employeeNames.registeredEmployeeLastName,
      svrha: travelEntry.travelDetails.purpose,
      pocetnaDrzava: travelEntry.travelDetails.startingCountry,
      pocetniGrad: travelEntry.travelDetails.startingCity,
      odredisnaDrzava: travelEntry.travelDetails.destinationCountry,
      odredisnaDrzavaDva: travelEntry.travelDetails.destinationCountryTwo,
      odredisniGrad: travelEntry.travelDetails.destinationCity,
      odredisniGradDva: travelEntry.travelDetails.destinationCityTwo,
      pocetniDatumIVrijeme: formatDate(
        travelEntry.travelDetails.startDateAndTIme
      ),
      zavrsniDatumIVrijeme: formatDate(
        travelEntry.travelDetails.endDateAndTime
      ),
      zavrsniDatumIVrijemeDva: formatDate(
        travelEntry.travelDetails.endDAteAndTimeTwo
      ),
      razlogPutovanja: travelEntry.travelDetails.travelPurpose,
      dodatneInformacije: travelEntry.travelDetails.additionalInformation,
      iznosAvansa: travelEntry.advancePayment.amount,
      valutaAvansa: travelEntry.advancePayment.currency,
      datumUplateAvansa: formatDate(travelEntry.advancePayment.paymentDate),
      metodaPlacanjaAvansa: travelEntry.advancePayment.paymentMethod,
      napomeneAvansa: travelEntry.advancePayment.notes,
      obrokOsiguran: travelEntry.travelExpense.isMealProvided
    }

    exportFromJSON({
      data: [flatTravelEntry],
      fileName: `${travelEntry.travelEntryId}-${travelEntry.employeeNames.registeredEmployeeFirstName}-${travelEntry.employeeNames.registeredEmployeeLastName}`,
      exportType: 'csv'
    })
  }

  return {
    travelEntryList,
    getTravelEntryListByStatus,
    addTravelEntry,
    updateTravelEntry,
    removeTravelEntry,
    updateTravelEntryStatus,
    lockOrUnlockTravelEntry,
    deleteTravelEntry,
    downloadCSVFile
  }
})
