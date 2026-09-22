<script setup lang="ts">
import { useSlots } from 'vue'
import './Button.css'

export type ButtonVariant = 'primary' | 'accent' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

withDefaults(defineProps<{
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  fullWidth?: boolean
  disabled?: boolean
}>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  fullWidth: false,
  disabled: false
})

const slots = useSlots()
</script>

<template>
  <button
    :class="['btn', `btn--${variant}`, `btn--${size}`, fullWidth ? 'btn--full' : '', loading ? 'btn--loading' : '']"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="btn__spinner"></span>
    <span v-else-if="slots.icon" class="btn__icon btn__icon--left">
      <slot name="icon"></slot>
    </span>
    
    <span v-if="slots.default" class="btn__label">
      <slot></slot>
    </span>
    
    <span v-if="slots.iconRight && !loading" class="btn__icon btn__icon--right">
      <slot name="iconRight"></slot>
    </span>
  </button>
</template>
