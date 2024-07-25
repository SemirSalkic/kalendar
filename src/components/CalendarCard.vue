<script setup lang="ts">
defineProps<{
  day: number
  isWeekend: boolean
  description?: string
}>()
</script>

<template>
  <div
    class="h-20 w-20 truncate rounded-xl border-2 p-1 md:h-24 md:w-24 lg:h-28 lg:w-32 xl:h-40 xl:w-40"
    :class="{ 'bg-gray-200 text-black': isWeekend }"
  >
    <div class="text-sm font-bold md:text-base lg:text-lg">{{ day }}</div>
    <div class="text-xs md:text-sm">{{ description }}</div>
  </div>
</template>
