<script setup lang="ts">
defineProps<{
  day: number
  isWeekend: boolean
  description?: string
}>()
</script>

<template>
  <div
    class="md:h-22 sm:h-22 rounded-xl border-2 p-2 sm:w-16 md:w-24 lg:h-28 lg:w-32"
    :class="{ 'bg-gray-200 text-black': isWeekend }"
  >
    <div class="font-bold sm:text-sm md:text-base lg:text-lg">{{ day }}</div>
    <div class="text-xs sm:text-sm">{{ description }}</div>
  </div>
</template>
