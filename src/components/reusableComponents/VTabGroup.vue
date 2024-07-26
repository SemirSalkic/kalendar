<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

defineProps<{
  list: string[]
}>()
</script>

<template>
  <div class="w-full pt-2">
    <TabGroup>
      <TabList
        class="flex space-x-1 rounded-xl bg-gray-200 p-1 dark:bg-zinc-800"
      >
        <Tab
          v-for="(item, idx) in list"
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
            {{ item }}
          </button>
        </Tab>
      </TabList>

      <TabPanels class="mt-2">
        <TabPanel
          v-for="(item, idx) in list"
          :key="idx"
          :class="[
            'rounded-xl bg-white p-3 dark:bg-neutral-900',
            'focus:outline-none'
          ]"
        >
          <slot :name="item"></slot>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
