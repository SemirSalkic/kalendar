<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})

export interface VInputProps {
  type?: InputType
  modelValue?: string | number
  name?: string
  placeholder?: string
  error?: boolean
  errorText?: string
  disabled?: boolean
}

export type InputType = 'text' | 'number' | 'date'

const props = withDefaults(defineProps<VInputProps>(), {
  type: 'text',
  name: 'input',
  placeholder: 'Input',
  modelValue: '',
  error: false,
  errorText: '',
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | undefined): void
}>()

function updateInput(event: Event) {
  const target = event.target as HTMLInputElement
  let val
  if (props.type === 'number') {
    val = parseInt(target.value)
    if (isNaN(val)) val = undefined
  } else {
    val = target.value
  }

  emit('update:modelValue', val)
}
</script>

<template>
  <div class="relative grid">
    <input
      v-bind="$attrs"
      :value="modelValue"
      :type="type"
      :name="name"
      :disabled="disabled"
      class="h-8 rounded-md bg-white px-2 text-black shadow-md focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-100"
      :class="{
        'mb-0 border-red-600 focus-visible:ring-red-600': error
      }"
      :placeholder="placeholder"
      @input="updateInput"
      @keypress="updateInput"
    />
    <ErrorText
      v-if="error"
      class="ml-1 text-left"
      :error-name="name + 'Error'"
      :error-text="errorText"
    />
  </div>
</template>

<style scoped></style>
