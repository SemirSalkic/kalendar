<script setup lang="ts">
defineProps<{
  day: number
  isWeekend: boolean
  description?: string
}>()
</script>

<template>
  <div
    class="p-2 border lg:w-32 lg:h-28 md:w-24 md:h-22 sm:w-16 sm:h-22 rounded-xl"
    :class="{ 'bg-gray-200 text-black': isWeekend }"
  >
    <div class="lg:text-lg md:text-base sm:text-sm font-bold">{{ day }}</div>
    <div class="sm:text-sm text-xs">{{ description }}</div>
  </div>
</template>
