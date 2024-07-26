<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

defineProps<{
  title: string
}>()
</script>

<template>
  <div class="mx-auto w-full rounded-md">
    <Disclosure v-slot="{ open }">
      <DisclosureButton class="flex w-full items-center justify-between">
        <TitleComponent
          :title="title"
          class="sm:text-base md:text-lg"
        ></TitleComponent>
        <ChevronDownIcon
          :class="open ? 'rotate-180 transform' : ''"
          class="h-5 w-5 text-black dark:text-white"
        />
      </DisclosureButton>
      <DisclosurePanel>
        <slot></slot>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>
