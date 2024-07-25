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
  <span class="font-bold text-black dark:text-white sm:text-lg md:text-3xl">{{
    title
  }}</span>
</template>
