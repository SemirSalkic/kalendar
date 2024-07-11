<script setup lang="ts">
export interface ErrorTextProps {
  errorText?: string
  errorName?: string
}

withDefaults(defineProps<ErrorTextProps>(), {
  errorText: '',
  errorName: 'error'
})
</script>

<template>
  <span :name="errorName" class="text-sm text-red-500">
    {{ errorText }}
  </span>
</template>
<style scoped></style>
