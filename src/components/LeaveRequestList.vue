<script setup lang="ts">
import type { TravelEntry } from '@/stores/types'
import type { DotListType } from './reusableComponents/DotMenu.vue'
import { storeToRefs } from 'pinia'
import { LockClosedIcon } from '@heroicons/vue/24/solid'
import { cloneDeep } from 'lodash'

enum AdminDotItemList {
  OPEN = 'Otvori',
  APPROVED = 'Odobri',
  REJECTED = 'Otkaži',
  PENDING = 'Pošalji na obradu',
  SENT_TO_BE_CORRECTED = 'Pošalji na korekciju',
  DATES_OF_UPDATES = 'Datumi izmjena',
  LOCK = 'Zaključaj',
  UNLOCK = 'Otključaj',
  DELETE = 'Izbriši'
}

const props = defineProps<{
  leaveRequestStatus: TravelEntryStatus
}>()

const leaveRequestStore = useLeaveRequestStore()
const authStore = useAuthStore()
const { isAdmin } = storeToRefs(authStore)

const travelEntryDialog = ref(false)
const sendTravelEntryToBeCorrectedDialog = ref(false)
const listOfUpdatesDialog = ref(false)
const deleteTravelEntryDialog = ref(false)
const selectedTravelEntry = ref<TravelEntry | null>(null)

const adminDotItemList: DotListType[] = [
  { text: AdminDotItemList.OPEN },
  { text: AdminDotItemList.APPROVED },
  { text: AdminDotItemList.REJECTED },
  { text: AdminDotItemList.PENDING },
  { text: AdminDotItemList.SENT_TO_BE_CORRECTED },
  { text: AdminDotItemList.DATES_OF_UPDATES },
  { text: AdminDotItemList.DELETE, emphasize: true }
]

const userDotItemList: DotListType[] = [
  { text: AdminDotItemList.OPEN },
  { text: AdminDotItemList.DATES_OF_UPDATES }
]

const statusToDotItemMap: { [key in TravelEntryStatus]: AdminDotItemList } = {
  [TravelEntryStatus.PENDING]: AdminDotItemList.PENDING,
  [TravelEntryStatus.REJECTED]: AdminDotItemList.REJECTED,
  [TravelEntryStatus.SENT_TO_BE_CORRECTED]:
    AdminDotItemList.SENT_TO_BE_CORRECTED,
  [TravelEntryStatus.APPROVED]: AdminDotItemList.APPROVED
}

const updatedAdminDotItemList = (isLocked: boolean) => {
  return computed(() => {
    const list = adminDotItemList.filter(
      (item) => item.text !== statusToDotItemMap[props.leaveRequestStatus]
    )
    list.splice(list.length - 1, 0, {
      text: isLocked ? AdminDotItemList.UNLOCK : AdminDotItemList.LOCK
    })
    return list
  })
}

const travelEntryList = computed(() => {
  switch (props.leaveRequestStatus) {
    case TravelEntryStatus.PENDING:
      return leaveRequestStore.getTravelEntryListByStatus(
        TravelEntryStatus.PENDING
      ).value
    case TravelEntryStatus.APPROVED:
      return leaveRequestStore.getTravelEntryListByStatus(
        TravelEntryStatus.APPROVED
      ).value
    case TravelEntryStatus.REJECTED:
      return leaveRequestStore.getTravelEntryListByStatus(
        TravelEntryStatus.REJECTED
      ).value
    case TravelEntryStatus.SENT_TO_BE_CORRECTED:
      return leaveRequestStore.getTravelEntryListByStatus(
        TravelEntryStatus.SENT_TO_BE_CORRECTED
      ).value
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

  return `${formatDate(dates[0])} - ${formatDate(dates[dates.length - 1])}`
}

function formatDate(date?: Date | string): string {
  const parsedDate = date ? new Date(date) : null
  if (!parsedDate || isNaN(parsedDate.getTime())) return 'Datum nije validan'

  return parsedDate.toLocaleString(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

function adminDotMenuItemClicked(item: string, travelEntryId?: string): void {
  if (!travelEntryId) return

  switch (item) {
    case AdminDotItemList.OPEN:
      openDialog(travelEntryId, AdminDotItemList.OPEN)
      break
    case AdminDotItemList.APPROVED:
      leaveRequestStore.updateTravelEntryStatus(
        travelEntryId,
        TravelEntryStatus.APPROVED
      )
      break
    case AdminDotItemList.PENDING:
      leaveRequestStore.updateTravelEntryStatus(
        travelEntryId,
        TravelEntryStatus.PENDING
      )
      break
    case AdminDotItemList.REJECTED:
      leaveRequestStore.updateTravelEntryStatus(
        travelEntryId,
        TravelEntryStatus.REJECTED
      )
      break
    case AdminDotItemList.SENT_TO_BE_CORRECTED:
      openDialog(travelEntryId, AdminDotItemList.SENT_TO_BE_CORRECTED)
      break
    case AdminDotItemList.DATES_OF_UPDATES:
      openDialog(travelEntryId, AdminDotItemList.DATES_OF_UPDATES)
      break
    case AdminDotItemList.LOCK:
      leaveRequestStore.lockOrUnlockTravelEntry(travelEntryId)
      break
    case AdminDotItemList.UNLOCK:
      leaveRequestStore.lockOrUnlockTravelEntry(travelEntryId)
      break
    case AdminDotItemList.DELETE:
      openDialog(travelEntryId, AdminDotItemList.DELETE)
      break
  }
}

function openDialog(travelEntryId: string, dialogType: AdminDotItemList): void {
  selectedTravelEntry.value =
    cloneDeep(
      travelEntryList.value.find(
        (entry) => entry.travelEntryId === travelEntryId
      )
    ) || null

  switch (dialogType) {
    case AdminDotItemList.OPEN:
      travelEntryDialog.value = true
      break
    case AdminDotItemList.SENT_TO_BE_CORRECTED:
      sendTravelEntryToBeCorrectedDialog.value = true
      break
    case AdminDotItemList.DATES_OF_UPDATES:
      listOfUpdatesDialog.value = true
      break
    case AdminDotItemList.DELETE:
      deleteTravelEntryDialog.value = true
      break
  }
}

function sendToBeCorrected(travelEntryId: string): void {
  leaveRequestStore.updateTravelEntryStatus(
    travelEntryId,
    TravelEntryStatus.SENT_TO_BE_CORRECTED,
    selectedTravelEntry.value || undefined
  )
  sendTravelEntryToBeCorrectedDialog.value = false
}

function cancelSendToBeCorrected(): void {
  if (selectedTravelEntry.value) selectedTravelEntry.value.correctionReason = ''
  sendTravelEntryToBeCorrectedDialog.value = false
}

function deleteTravelEntry(travelEntryId: string): void {
  leaveRequestStore.deleteTravelEntry(travelEntryId)
  deleteTravelEntryDialog.value = false
}
</script>

<template>
  <div v-if="travelEntryList.length" class="flex flex-col gap-4">
    <div
      v-for="entry in travelEntryList"
      :key="entry.travelEntryId"
      class="relative flex flex-col gap-2 rounded-lg border p-6 shadow-md"
    >
      <div class="absolute right-2 top-2 flex">
        <LockClosedIcon
          v-if="entry.locked"
          class="z-40 mr-2 mt-2 h-6 w-6"
        ></LockClosedIcon>
        <DotMenu
          v-if="!entry.locked || isAdmin"
          :list="
            isAdmin
              ? updatedAdminDotItemList(entry.locked || false).value
              : userDotItemList
          "
          @item-click="adminDotMenuItemClicked($event, entry.travelEntryId)"
        ></DotMenu>
      </div>
      <span class="font-semibold">Broj naloga: {{ entry.travelEntryId }}</span>
      <span>Datum prijave: {{ formatDate(entry.dateCreated) }}</span>
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
        Period trajanja:
        {{
          compareDatesAndFormat(
            entry.travelDetails.startDateAndTIme?.toLocaleString() || '',
            entry.travelDetails.endDateAndTime?.toLocaleString() || '',
            entry.travelDetails.endDAteAndTimeTwo?.toLocaleString() || ''
          )
        }}
      </span>
      <span
        v-if="leaveRequestStatus === TravelEntryStatus.SENT_TO_BE_CORRECTED"
        class="text-red-500"
      >
        Napomena: {{ entry.correctionReason }}
      </span>
    </div>
  </div>
  <div v-else>
    <span class="font-semibold text-black dark:text-white"
      >Nema zahtjeva za službeno putovanje!</span
    >
  </div>
  <VDialog v-model="travelEntryDialog" class="min-w-[720px] px-4 py-6">
    <div class="w-full pt-2">
      <TravelLeave
        :travel-entry-id="selectedTravelEntry?.travelEntryId"
        :disabled="
          leaveRequestStatus !== TravelEntryStatus.SENT_TO_BE_CORRECTED
        "
        @cancel="travelEntryDialog = false"
      ></TravelLeave>
    </div>
  </VDialog>

  <ConfirmationDialog
    v-if="selectedTravelEntry?.travelEntryId"
    v-model="sendTravelEntryToBeCorrectedDialog"
    title="Pošalji na ispravku"
    confirm-text="Pošalji"
    cancel-text="Otkaži"
    :disabled-confirm="!selectedTravelEntry.correctionReason"
    @confirm="sendToBeCorrected(selectedTravelEntry.travelEntryId)"
    @cancel="cancelSendToBeCorrected"
  >
    <div class="flex w-full flex-col">
      <label class="text-black dark:text-white" for="correctionReason"
        >Napomena:</label
      >
      <textarea
        id="correctionReason"
        name="correctionReason"
        v-model="selectedTravelEntry.correctionReason"
        class="h-20 rounded-md border-2 bg-white px-2 text-black hover:ring-1 hover:ring-gray-400 focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 dark:border-zinc-800 dark:bg-zinc-800 dark:text-white"
        placeholder="Unesite napomenu"
      ></textarea>
    </div>
  </ConfirmationDialog>

  <ConfirmationDialog
    v-if="selectedTravelEntry?.travelEntryId"
    v-model="deleteTravelEntryDialog"
    title="Izbriši nalog"
    confirm-text="Izbriši"
    cancel-text="Otkaži"
    @confirm="deleteTravelEntry(selectedTravelEntry.travelEntryId)"
    @cancel="deleteTravelEntryDialog = false"
  >
    <div class="flex w-full flex-col">
      <span class="text-black dark:text-white"
        >Da li ste sigurni da želite da obrišete nalog?</span
      >
      <span class="text-black dark:text-white"
        >Broj naloga: {{ selectedTravelEntry.travelEntryId }}</span
      >
      <span class="text-red-500 dark:text-red-500"
        >Ova akcija je nepovratna!</span
      >
    </div>
  </ConfirmationDialog>

  <VDialog
    v-if="selectedTravelEntry"
    v-model="listOfUpdatesDialog"
    class="flex flex-col gap-4 px-4 py-6"
  >
    <TitleComponent title="Datumi izmjena"></TitleComponent>
    <div
      class="flex flex-col items-center gap-2 rounded-lg border p-6 shadow-md"
    >
      <div v-if="selectedTravelEntry?.datesUpdated?.length">
        <div
          v-for="(date, index) in selectedTravelEntry.datesUpdated"
          :key="index"
        >
          <span class="font-semibold text-black dark:text-white">{{
            `${index + 1}: ${formatDate(date)}`
          }}</span>
        </div>
      </div>
      <div v-else>
        <span class="font-semibold text-black dark:text-white"
          >Nema izmjena</span
        >
      </div>
    </div>
  </VDialog>
</template>
