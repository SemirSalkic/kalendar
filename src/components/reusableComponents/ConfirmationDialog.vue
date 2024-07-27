<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title: string
    confirmText?: string
    cancelText?: string
    disabledConfirm?: boolean
  }>(),
  {
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    disabledConfirm: false
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const showDialog = computed({
  get() {
    return props.modelValue
  },
  set(newValue: boolean) {
    emit('update:modelValue', newValue)
  }
})
</script>

<template>
  <VDialog v-model="showDialog" :static="true">
    <div class="grid gap-4">
      <TitleComponent :title="title"></TitleComponent>
      <slot></slot>
      <div class="flex justify-center gap-2">
        <VButton
          class="self-center rounded-md"
          color="success"
          :label="confirmText"
          :disabled="disabledConfirm"
          @click="emit('confirm')"
        ></VButton>
        <VButton
          class="self-center rounded-md"
          color="error"
          :label="cancelText"
          @click="emit('cancel')"
        ></VButton>
      </div>
    </div>
  </VDialog>
</template>
