<script setup lang="ts">
import { Categories } from './stores/types'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

const isDark = useDark()
const isDialogOpen = ref(false)
const categories = Object.values(Categories)
</script>

<template>
  <main
    class="flex h-full flex-col bg-white p-2 text-black dark:bg-black dark:text-white md:p-8"
  >
    <div class="flex items-center self-end p-2">
      <span class="mr-2">Dark mode:</span>
      <VSwitch v-model="isDark"></VSwitch>
    </div>
    <div class="flex h-full overflow-auto md:justify-center">
      <div class="min-w-[720px] self-center rounded-xl border-2 p-4">
        <div class="mb-4 flex w-full items-center justify-between">
          <TitleComponent title="Kalendar"></TitleComponent>
          <VButton
            class="self-center rounded-md"
            color="neutral"
            label="Registruj odsustvo"
            @click="isDialogOpen = true"
          ></VButton>
        </div>
        <CalendarView></CalendarView>
      </div>
    </div>
    <VDialog v-model="isDialogOpen" class="min-w-[720px] px-4 py-6">
      <div class="w-full pt-2">
        <TabGroup>
          <TabList
            class="flex space-x-1 rounded-xl bg-gray-200 p-1 dark:bg-zinc-800"
          >
            <Tab
              v-for="(category, idx) in categories"
              as="template"
              :key="idx"
              v-slot="{ selected }"
            >
              <button
                :class="[
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'focus:outline-none',
                  selected
                    ? 'bg-white text-zinc-900 shadow dark:bg-zinc-900 dark:text-white'
                    : 'text-zinc-900 hover:bg-gray-300 hover:text-zinc-800 dark:text-white dark:hover:bg-zinc-700 dark:hover:text-white'
                ]"
              >
                {{ category }}
              </button>
            </Tab>
          </TabList>

          <TabPanels class="mt-2">
            <TabPanel
              v-for="(category, idx) in categories"
              :key="idx"
              :class="[
                'rounded-xl bg-white p-3 dark:bg-neutral-900',
                'focus:outline-none'
              ]"
            >
              <div v-if="category === Categories.LEAVE">
                <RegisterLeave @cancel="isDialogOpen = false"></RegisterLeave>
              </div>
              <div v-else>
                <TravelLeave @cancel="isDialogOpen = false"></TravelLeave>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </VDialog>
  </main>
</template>

<style scoped></style>
