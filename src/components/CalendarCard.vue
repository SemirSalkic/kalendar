<script setup lang="ts">
import type { TravelEntry } from '@/stores/types'
import { LockClosedIcon } from '@heroicons/vue/24/solid'

defineProps<{
  day: number | undefined
  isWeekend: boolean
  date?: Date
  description?: string
  travelEntryList?: TravelEntry[]
}>()

const travelEntryDialog = ref(false)
const selectedTravelEntry = ref<TravelEntry | null>(null)

function travelEntryClick(travelEntry: TravelEntry) {
  selectedTravelEntry.value = travelEntry
  travelEntryDialog.value = true
}
</script>

<template>
  <div
    class="h-24 w-24 overflow-auto text-pretty rounded-xl border-2 p-1 lg:h-28 lg:w-32 xl:h-40 xl:w-40"
    :class="{ 'bg-gray-200 text-black': isWeekend }"
  >
    <div class="text-sm font-bold md:text-base lg:text-lg xl:text-xl">
      {{ day }}
    </div>
    <div class="flex flex-col gap-2">
      <div
        v-if="description"
        class="rounded-md bg-blue-700 p-2 text-xs text-white"
      >
        {{ description }}
      </div>
      <div
        v-for="(travelEntry, index) in travelEntryList"
        :key="index"
        class="flex items-center gap-2 rounded-md bg-green-700 p-2 text-xs text-white"
        :class="{
          'hover:cursor-pointer hover:bg-opacity-70 active:bg-opacity-80':
            !travelEntry.locked
        }"
        @click="travelEntry.locked ?? travelEntryClick(travelEntry)"
      >
        <span>{{
          `${travelEntry.travelDetails.purpose} - ${travelEntry.employeeNames.registeredEmployeeFirstName} ${travelEntry.employeeNames.registeredEmployeeLastName}`
        }}</span>
        <LockClosedIcon
          v-if="travelEntry.locked"
          class="h-6 w-6"
        ></LockClosedIcon>
      </div>
    </div>
  </div>

  <VDialog v-model="travelEntryDialog" class="min-w-[720px] px-4 py-6">
    <div class="w-full pt-2">
      <TravelLeave
        :travel-entry-id="selectedTravelEntry?.travelEntryId"
        disabled
        @cancel="travelEntryDialog = false"
      ></TravelLeave>
    </div>
  </VDialog>
</template>
