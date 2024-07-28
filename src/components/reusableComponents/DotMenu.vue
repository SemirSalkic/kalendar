<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/24/solid'

export type DotListType = {
  text: string
  emphasize?: boolean
}

defineProps<{
  list: DotListType[]
}>()

const emit = defineEmits<{
  (e: 'itemClick', item: string): void
}>()
</script>
<template>
  <Menu>
    <div>
      <MenuButton
        class="inline-flex w-full justify-center rounded-md p-2 text-sm font-medium hover:bg-neutral-500 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 active:bg-opacity-20"
      >
        <EllipsisVerticalIcon
          class="prose dark:prose-invert h-6 w-6"
        ></EllipsisVerticalIcon>
      </MenuButton>
    </div>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute right-0 top-10 z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md border bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-900"
      >
        <div class="px-1 py-1">
          <template v-for="(item, index) in list" :key="index">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-neutral-500 text-white' : 'text-black',
                  item.emphasize ? 'hover:bg-red-500' : '',
                  'h-full w-full rounded-md p-2 active:bg-opacity-90 dark:text-white'
                ]"
                @click="emit('itemClick', item.text)"
              >
                {{ item.text }}
              </button>
            </MenuItem>
          </template>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
