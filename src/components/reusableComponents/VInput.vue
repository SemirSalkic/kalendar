<script setup lang="ts">
import { EyeIcon } from '@heroicons/vue/24/solid'
import { EyeSlashIcon } from '@heroicons/vue/24/solid'

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
  maxNumber?: number
  minNumber?: number
  maxLength?: number
  minLength?: number
}

export type InputType = 'text' | 'password' | 'number'

const props = withDefaults(defineProps<VInputProps>(), {
  type: 'text',
  name: 'input',
  placeholder: 'Input',
  modelValue: '',
  error: false,
  errorText: '',
  disabled: false,
  minNumber: undefined,
  maxNumber: undefined,
  minLength: undefined,
  maxLength: undefined
})

const state = reactive({
  show: false
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
      :type="type === 'password' ? (!state.show ? 'password' : 'text') : type"
      :name="name"
      :max="maxNumber"
      :min="minNumber"
      :maxlength="maxLength"
      :minlength="minLength"
      :disabled="disabled"
      class="h-10 rounded-md border-2 bg-white px-2 text-black hover:ring-1 hover:ring-gray-400 focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 dark:border-zinc-800 dark:bg-zinc-800 dark:text-white"
      :class="{
        'mb-0 border-red-600 focus-visible:ring-red-600': error
      }"
      :placeholder="placeholder"
      @input="updateInput"
      @keypress="updateInput"
    />
    <div
      v-if="type === 'password'"
      class="absolute right-2 mt-2.5 flex pr-2 text-sm leading-5"
    >
      <EyeIcon
        :class="{ hidden: !state.show, block: state.show }"
        class="ml-1 mr-1 h-5 w-5 rounded-full fill-gray-400 hover:cursor-pointer hover:bg-slate-400 hover:bg-opacity-50 active:bg-opacity-75"
        @click="state.show = !state.show"
      />
      <EyeSlashIcon
        :class="{ block: !state.show, hidden: state.show }"
        class="ml-1 mr-1 h-5 w-5 rounded-full fill-gray-400 hover:cursor-pointer hover:bg-slate-400 hover:bg-opacity-50 active:bg-opacity-75"
        @click="state.show = !state.show"
      />
    </div>
    <ErrorText
      v-if="error"
      class="ml-1 text-left"
      :error-name="name + 'Error'"
      :error-text="errorText"
    />
  </div>
</template>

<style scoped></style>
