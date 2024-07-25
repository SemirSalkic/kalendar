<script setup lang="ts">
defineProps<{
  day: number
  isWeekend: boolean
  description?: string
}>()
</script>

<template>
  <div
    class="h-24 w-24 truncate text-pretty rounded-xl border-2 p-1 lg:h-28 lg:w-32 xl:h-40 xl:w-40"
    :class="{ 'bg-gray-200 text-black': isWeekend }"
  >
    <div class="text-sm font-bold md:text-base lg:text-lg xl:text-xl">
      {{ day }}
    </div>
    <div class="text-xs lg:text-base xl:text-lg">{{ description }}</div>
  </div>
</template>
