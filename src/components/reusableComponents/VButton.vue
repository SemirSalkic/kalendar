<script setup lang="ts">
export interface VButtonProps {
  label?: string
  type?: ButtonType
  color?: 'success' | 'error' | 'info' | 'warning' | 'white' | 'neutral'
  disabled?: boolean
  loading?: boolean
}

export type ButtonType = 'button' | 'submit' | 'reset'

const props = withDefaults(defineProps<VButtonProps>(), {
  label: 'Continue',
  type: 'button',
  color: undefined,
  disabled: false,
  loading: false
})

const slots = useSlots()
const hasIcon = computed<boolean>(() => !!slots?.icon)

const success = computed(() => props.color === 'success')
const error = computed(() => props.color === 'error')
const warning = computed(() => props.color === 'warning')
const info = computed(() => props.color === 'info')
const white = computed(() => props.color === 'white')
const neutral = computed(() => props.color === 'neutral')
const basic = computed(() => !props.color)
</script>

<template>
  <button
    :type="type"
    class="inline-flex justify-center rounded-full px-4 py-2 font-medium shadow-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    :class="[
      {
        'border-green-700 bg-green-600 text-white hover:bg-green-500 active:bg-green-600': success
      },
      {
        'border-red-700 bg-red-600 text-white hover:bg-red-500 active:bg-red-600': error
      },
      {
        'border-blue-700 bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-600': warning
      },
      {
        'border-yellow-700 bg-yellow-600 text-white hover:bg-yellow-500 active:bg-yellow-600': info
      },
      {
        'border-slate-700 bg-white text-black hover:opacity-70 active:opacity-80': white
      },
      {
        'border-neutral-700 bg-neutral-600 text-white hover:bg-neutral-500 active:bg-neutral-600':
          neutral
      },
      {
        'border-indigo-900 bg-indigo-800 text-white hover:bg-indigo-700 active:bg-indigo-800': basic
      }
    ]"
    :disabled="disabled"
  >
    <template v-if="hasIcon">
      <slot name="icon"> </slot>
    </template>
    <svg
      v-if="loading"
      class="mr-2"
      width="20"
      height="20"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#fff"
    >
      <!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL -->
      <g fill="none" fill-rule="evenodd">
        <g transform="translate(1 1)" stroke-width="2">
          <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
    <span v-else class="">
      {{ label }}
    </span>
  </button>
</template>

<style scoped></style>
