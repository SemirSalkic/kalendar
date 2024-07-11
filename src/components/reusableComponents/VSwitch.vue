<script setup lang="ts">
import { Switch } from '@headlessui/vue'

export interface VSwitchProps {
  modelValue: boolean
}
const props = defineProps<VSwitchProps>()

const enabled = computed({
  get() {
    return props.modelValue
  },
  set(newValue: boolean) {
    emit('update:modelValue', newValue)
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<template>
  <Switch
    v-model="enabled"
    :class="enabled ? 'bg-teal-700' : 'bg-teal-900'"
    class="relative inline-flex h-6 w-11 items-center rounded-full"
  >
    <span
      :class="enabled ? 'translate-x-6' : 'translate-x-1'"
      class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
    />
  </Switch>
</template>
