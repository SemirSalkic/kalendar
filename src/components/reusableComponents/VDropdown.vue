<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/solid'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

defineOptions({
  inheritAttrs: false
})

export interface VDropdownProps {
  list: string[]
  label?: string
  placeholder?: string
  disabled?: boolean
  preSelect?: boolean
  selected?: string
}

const props = withDefaults(defineProps<VDropdownProps>(), {
  label: '',
  placeholder: '',
  disabled: false,
  preSelect: false,
  selected: ''
})

onMounted(() => {
  if (props.preSelect && props.list.length) {
    selectedRef.value = props.list[0]
    emit('selected', 0, props.list[0])
  }
})

const emit = defineEmits<{
  (e: 'selected', index: number, item: string): void
}>()

const selectedRef = ref('')

function itemClick(index: number, item: string) {
  selectedRef.value = item
  emit('selected', index, item)
}

onMounted(() => {
  if (props.selected) selectedRef.value = props.selected
})

watch(
  () => props.list,
  async (newList, oldList) => {
    if (newList !== oldList && !newList.indexOf(selectedRef.value)) {
      selectedRef.value = newList[0]
    }
  }
)
</script>

<template>
  <Menu v-slot="{ open }">
    <div class="relative">
      <MenuButton
        v-bind="$attrs"
        :disabled="disabled"
        class="flex items-center justify-between rounded-md border-2 dark:border-zinc-800 dark:text-white bg-white dark:bg-zinc-800 px-2 text-sm font-medium text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-opacity-75"
        :class="{ 'text-gray-400': disabled }"
      >
        <div v-if="!label">
          <p v-if="!selectedRef" class="text-gray-400">
            {{ placeholder }}
          </p>
          {{ selectedRef }}
        </div>
        <div v-else class="font-medium">
          {{ label }}
        </div>
        <ChevronDownIcon v-if="!open" class="ml-1 -mr-1 h-4 w-4" aria-hidden="true" />
        <ChevronUpIcon v-else class="ml-1 -mr-1 h-4 w-4" aria-hidden="true" />
      </MenuButton>
      <transition
        enter-active-class="transform transition duration-500 ease-custom"
        enter-from-class="-translate-y-1/2 scale-y-0 opacity-0"
        enter-to-class="translate-y-0 scale-y-100 opacity-100"
        leave-active-class="transform transition duration-300 ease-custom"
        leave-from-class="translate-y-0 scale-y-100 opacity-100"
        leave-to-class="scale-y-0 opacity-0"
      >
        <MenuItems
          v-show="open"
          class="absolute z-50 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md dark:bg-zinc-800 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div>
            <MenuItem
              v-for="(item, index) in list"
              :key="index"
              v-slot="{ active }"
              as="template"
              @click="itemClick(index, item)"
            >
              <button
                :class="[
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm ',
                  active ? 'bg-neutral-500 text-white' : 'text-black dark:text-white'
                ]"
              >
                <p>
                  {{ item }}
                </p>
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </div>
  </Menu>
</template>

<style scoped></style>
