<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
  }>(),
  {
    title: ''
  }
)
</script>

<template>
  <span class="text-black font-bold md:text-3xl sm:text-lg dark:text-white">{{ title }}</span>
</template>
